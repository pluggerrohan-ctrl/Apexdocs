import { google } from 'googleapis'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { bankSlugs } from '../../../lib/banks'

export const runtime = 'nodejs'
export const maxDuration = 300

const siteUrl = 'https://apexwebdesign.online'

function getUrls() {
  return [
    `${siteUrl}/`,
    `${siteUrl}/pdfconverter`,
    `${siteUrl}/allbanks`,
    `${siteUrl}/banks/country/usa`,
    `${siteUrl}/banks/country/uk`,
    `${siteUrl}/banks/country/uae`,
    `${siteUrl}/payment/success`,
    ...bankSlugs.map((slug) => `${siteUrl}/banks/${slug}`),
  ]
}

function parseCredentials(raw) {
  if (!raw) return { credentials: null, error: 'not set' }

  let credentials
  try {
    credentials = JSON.parse(raw)
    if (typeof credentials === 'string') credentials = JSON.parse(credentials)
  } catch {
    return { credentials: null, error: 'not valid JSON (still holds a plain key string?)' }
  }

  if (typeof credentials.private_key === 'string') {
    credentials.private_key = credentials.private_key.replace(/\\\\n/g, '\\n')
  }

  if (!credentials.client_email || !credentials.private_key) {
    return { credentials: null, error: 'missing client_email or private_key' }
  }
  return { credentials, error: null }
}

function getCredentialSets() {
  const candidates = [
    { name: 'GOOGLE_SERVICE_ACCOUNT_JSON', raw: process.env.GOOGLE_SERVICE_ACCOUNT_JSON },
    { name: 'GOOGLE_SERVICE_ACCOUNT_JSON_2', raw: process.env.GOOGLE_SERVICE_ACCOUNT_JSON_2 },
    { name: 'GOOGLE_SERVICE_ACCOUNT_JSON_3', raw: process.env.GOOGLE_SERVICE_ACCOUNT_JSON_3 },
  ]

  const sets = []
  const skipped = []
  for (const { name, raw } of candidates) {
    const { credentials, error } = parseCredentials(raw)
    if (credentials) {
      sets.push({ name, credentials })
    } else {
      skipped.push({ name, error })
    }
  }

  if (sets.length === 0) {
    throw new Error(
      `No usable service-account credentials found. ${skipped
        .map((s) => `${s.name}: ${s.error}`)
        .join('; ')}`,
    )
  }
  return { sets, skipped }
}

// Keep each service account well below Google's daily quota and rotate predictably.
const BATCH_SIZE_PER_ACCOUNT = 100
const MAX_ACCOUNTS = 3
const REQUEST_DELAY_MS = 1500
const STATUS_FILE = path.join(process.cwd(), 'indexing_status.json')

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

async function readStatus() {
  try {
    const raw = await fs.readFile(STATUS_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : { days: {} }
  } catch {
    return { days: {} }
  }
}

async function writeStatus(status) {
  const temporaryFile = `${STATUS_FILE}.tmp`
  await fs.writeFile(temporaryFile, JSON.stringify(status, null, 2), 'utf8')
  await fs.rename(temporaryFile, STATUS_FILE)
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function getConfiguredIndexedUrls() {
  try {
    const urls = JSON.parse(process.env.GOOGLE_INDEXED_URLS_JSON || '[]')
    return new Set(Array.isArray(urls) ? urls.filter((url) => typeof url === 'string') : [])
  } catch {
    return new Set()
  }
}

export async function GET() {
  const allUrls = getUrls()
  let credInfo = { sets: 0, skipped: [] }
  try {
    const { sets, skipped } = getCredentialSets()
    credInfo = { sets: sets.length, skipped }
  } catch (error) {
    credInfo = { sets: 0, skipped: [{ error: error.message }] }
  }
  return Response.json({
    totalUrls: allUrls.length,
    credentialsAvailable: credInfo.sets,
    skippedCredentials: credInfo.skipped,
    batchSizePerAccount: BATCH_SIZE_PER_ACCOUNT,
    dailyCapacity: credInfo.sets * BATCH_SIZE_PER_ACCOUNT,
  })
}

export async function POST(request) {
  try {
    const authorization = request.headers.get('authorization')
    const configuredTokens = [process.env.GOOGLE_INDEXING_TOKEN, process.env.CRON_SECRET].filter(Boolean)
    if (configuredTokens.length > 0 && !configuredTokens.some((token) => authorization === `Bearer ${token}`)) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let startIndex = 0
    try {
      const body = await request.json()
      if (typeof body?.startIndex === 'number' && body.startIndex >= 0) startIndex = Math.floor(body.startIndex)
    } catch { /* no body or not JSON — start from 0 */ }

    const { sets: credentialSets, skipped } = getCredentialSets()
    const allUrls = getUrls()
    const status = await readStatus()
    const day = todayKey()
    const today = status.days?.[day] || { successfulUrls: [], attempts: 0 }
    const successfulUrls = new Set(today.successfulUrls)
    const configuredIndexedUrls = getConfiguredIndexedUrls()
    const indexedUrls = new Set([...successfulUrls, ...configuredIndexedUrls])
    const offset = Math.min(startIndex, allUrls.length)
    const urlsToSubmit = allUrls
      .slice(offset)
      .filter((url) => !indexedUrls.has(url))
    const results = []
    const accounts = credentialSets.slice(0, MAX_ACCOUNTS)
    const dailyRemaining = Math.max(0, MAX_ACCOUNTS * BATCH_SIZE_PER_ACCOUNT - today.attempts)
    const submitLimit = Math.min(dailyRemaining, accounts.length * BATCH_SIZE_PER_ACCOUNT)

    for (let i = 0; i < accounts.length; i++) {
      const start = i * BATCH_SIZE_PER_ACCOUNT
      const batch = urlsToSubmit.slice(start, start + Math.min(BATCH_SIZE_PER_ACCOUNT, submitLimit - start))
      if (batch.length === 0) break

      const { name, credentials } = accounts[i]
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/indexing'],
      })
      const indexing = google.indexing({ version: 'v3', auth })

      console.log(`[google-indexing] account ${name} started: ${batch.length} URLs`)

      for (const [batchIndex, url] of batch.entries()) {
        try {
          const response = await indexing.urlNotifications.publish({
            requestBody: { url, type: 'URL_UPDATED' },
          })
          results.push({ url, ok: true, status: response.status, account: name })
          console.log(`[google-indexing] ${results.length}/${urlsToSubmit.length} successfully pushed: ${url} via ${name}`)
        } catch (error) {
          results.push({
            url,
            ok: false,
            status: error?.code ?? 500,
            error: error?.response?.data?.error?.message ?? error.message,
            account: name,
          })
          console.error(`[google-indexing] failed: ${url} via ${name}`, error?.message ?? error)
        }

        if (batchIndex < batch.length - 1) await wait(REQUEST_DELAY_MS)
      }

      console.log(`[google-indexing] account ${name} finished: ${batch.length} URLs`)
      if (i < accounts.length - 1 && urlsToSubmit.length > (i + 1) * BATCH_SIZE_PER_ACCOUNT) {
        console.log(`[google-indexing] rotating from ${name} to ${accounts[i + 1].name}`)
      }
    }

    const failed = results.filter((result) => !result.ok)
    const successful = results.filter((result) => result.ok)
    successful.forEach((result) => successfulUrls.add(result.url))
    const updatedToday = {
      successfulUrls: [...successfulUrls],
      attempts: today.attempts + results.length,
      updatedAt: new Date().toISOString(),
    }
    await writeStatus({
      ...status,
      days: { ...(status.days || {}), [day]: updatedToday },
    })

    const submittedCount = successful.length
    const remaining = allUrls.filter((url) => !successfulUrls.has(url) && !configuredIndexedUrls.has(url)).length
    return Response.json({
      submitted: submittedCount,
      failed: failed.length,
      skippedAlreadyIndexed: allUrls.length - urlsToSubmit.length,
      total: results.length,
      startIndex: offset,
      nextStartIndex: offset + results.length,
      remainingUrls: remaining,
      totalUrls: allUrls.length,
      dailyAttempts: updatedToday.attempts,
      dailyLimit: MAX_ACCOUNTS * BATCH_SIZE_PER_ACCOUNT,
      skippedCredentials: skipped,
      results,
    }, { status: failed.length ? 207 : 200 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
