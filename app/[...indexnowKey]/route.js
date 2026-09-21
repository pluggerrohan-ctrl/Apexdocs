export async function GET(_request, { params }) {
  const { indexnowKey: keyParts = [] } = await params
  const indexnowKey = keyParts.at(-1)
  const configuredKey = (process.env.INDEXNOW_API_KEY ?? process.env.key)?.trim()

  if (!configuredKey || !indexnowKey?.endsWith('.txt') || indexnowKey.slice(0, -4) !== configuredKey) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(configuredKey, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
