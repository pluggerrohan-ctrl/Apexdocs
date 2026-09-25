import { google } from 'googleapis'
import { bankSlugs } from '../../../lib/banks'

export const runtime = 'nodejs'
export const maxDuration = 300

const siteUrl = 'https://apexwebdesign.online'

function getUrls() {
  return [
    `${siteUrl}/`,
    `${siteUrl}/pdfconverter`,
    `${siteUrl}/all-banks`,
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
    { name: 'GOOGLE_SERVICE_ACCOUNT', raw: process.env.GOOGLE_SERVICE_ACCOUNT },
    { name: 'GOOGLE_SERVICE_ACCOUNT_2', raw: process.env.GOOGLE_SERVICE_ACCOUNT_2 },
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

// Google Indexing API requests are capped at 200 per service account per run.
const BATCH_SIZE_PER_ACCOUNT = 200

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
    const expectedToken = process.env.GOOGLE_INDEXING_TOKEN
    if (!expectedToken || request.headers.get('authorization') !== `Bearer ${expectedToken}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let startIndex = 0
    try {
      const body = await request.json()
      if (typeof body?.startIndex === 'number' && body.startIndex >= 0) startIndex = Math.floor(body.startIndex)
    } catch { /* no body or not JSON — start from 0 */ }

    const { sets: credentialSets, skipped } = getCredentialSets()
    const allUrls = getUrls()
    const offset = Math.min(startIndex, allUrls.length)
    const urlsToSubmit = allUrls.slice(offset)
    const results = []

    for (let i = 0; i < credentialSets.length; i++) {
      const start = i * BATCH_SIZE_PER_ACCOUNT
      const batch = urlsToSubmit.slice(start, start + BATCH_SIZE_PER_ACCOUNT)
      if (batch.length === 0) break

      const { name, credentials } = credentialSets[i]
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/indexing'],
      })
      const indexing = google.indexing({ version: 'v3', auth })

      for (const url of batch) {
        try {
          const response = await indexing.urlNotifications.publish({
            requestBody: { url, type: 'URL_UPDATED' },
          })
          results.push({ url, ok: true, status: response.status, account: name })
        } catch (error) {
          results.push({
            url,
            ok: false,
            status: error?.code ?? 500,
            error: error?.response?.data?.error?.message ?? error.message,
            account: name,
          })
        }
      }
    }

    const failed = results.filter((result) => !result.ok)
    const submittedCount = results.length - failed.length
    const nextStart = offset + results.length
    const remaining = Math.max(0, allUrls.length - nextStart)
    return Response.json({
      submitted: submittedCount,
      failed: failed.length,
      total: results.length,
      startIndex: offset,
      nextStartIndex: nextStart,
      remainingUrls: remaining,
      totalUrls: allUrls.length,
      skippedCredentials: skipped,
      results,
    }, { status: failed.length ? 207 : 200 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
