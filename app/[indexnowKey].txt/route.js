export async function GET(_request, { params }) {
  const { indexnowKey } = await params

  if (!process.env.INDEXNOW_API_KEY || indexnowKey !== process.env.INDEXNOW_API_KEY) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(process.env.INDEXNOW_API_KEY, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
