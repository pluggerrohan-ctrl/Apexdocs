export async function GET(_request, { params }) {
  const { indexnowKey: keyParts = [] } = await params
  const indexnowKey = keyParts.at(-1)
  const configuredKey = (process.env.INDEXNOW_API_KEY ?? process.env.key)?.trim()

  const requestedName = decodeURIComponent(indexnowKey ?? '')
  const publicKey = '22fc07ee50984fb0ae2dd990452ee74b'
  const isPublicKeyFile = requestedName === `${publicKey}.txt`
  const isConfiguredKeyFile = Boolean(configuredKey) && requestedName === `${configuredKey}.txt`
  const isLegacyPlaceholderFile = requestedName === 'process.env.keytxt'

  if (!isPublicKeyFile && !isConfiguredKeyFile && !isLegacyPlaceholderFile) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(isPublicKeyFile ? publicKey : configuredKey ?? publicKey, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
