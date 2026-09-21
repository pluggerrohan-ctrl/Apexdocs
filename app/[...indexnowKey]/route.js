export async function GET(_request, { params }) {
  const { indexnowKey: keyParts = [] } = await params
  const indexnowKey = keyParts.at(-1)
  const configuredKey = (process.env.INDEXNOW_API_KEY ?? process.env.key)?.trim()

  const requestedName = decodeURIComponent(indexnowKey ?? '')
  const isConfiguredKeyFile = requestedName === `${configuredKey}.txt`
  const isLegacyPlaceholderFile = requestedName === 'process.env.keytxt'

  if (!configuredKey || (!isConfiguredKeyFile && !isLegacyPlaceholderFile)) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(configuredKey, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
