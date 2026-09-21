export async function GET(_request, { params }) {
  const { indexnowKey } = await params
  const configuredKey = (process.env.INDEXNOW_API_KEY ?? process.env.key ?? '').trim()

  if (!configuredKey || !indexnowKey) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(configuredKey, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  })
}
