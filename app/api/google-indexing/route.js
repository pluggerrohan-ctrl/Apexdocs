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

function getCredentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not configured')

  let credentials
  try {
    credentials = JSON.parse(raw)
    if (typeof credentials === 'string') credentials = JSON.parse(credentials)
  } catch {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON must contain valid service-account JSON')
  }

  if (typeof credentials.private_key === 'string') {
    credentials.private_key = credentials.private_key.replace(/\\\\n/g, '\\n')
  }

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error('Service account JSON is missing client_email or private_key')
  }
  return credentials
}

export async function POST(request) {
  try {
    const expectedToken = process.env.GOOGLE_INDEXING_TOKEN
    if (expectedToken && request.headers.get('authorization') !== `Bearer ${expectedToken}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const credentials = getCredentials()
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    })
    const indexing = google.indexing({ version: 'v3', auth })
    // Google Indexing API requests are intentionally capped at 200 per run.
    const urls = getUrls().slice(0, 200)
    const results = []

    for (const url of urls) {
      try {
        const response = await indexing.urlNotifications.publish({
          requestBody: { url, type: 'URL_UPDATED' },
        })
        results.push({ url, ok: true, status: response.status })
      } catch (error) {
        results.push({
          url,
          ok: false,
          status: error?.code ?? 500,
          error: error?.response?.data?.error?.message ?? error.message,
        })
      }
    }

    const failed = results.filter((result) => !result.ok)
    return Response.json({
      submitted: results.length - failed.length,
      failed: failed.length,
      total: results.length,
      results,
    }, { status: failed.length ? 207 : 200 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
