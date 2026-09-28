import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogBreadcrumbSchema, getBlogPost, getBlogPostingSchema } from '../../../lib/blog-content'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: 'Guide not found' }
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    robots: { index: true, follow: true },
    alternates: { canonical: `https://apexwebdesign.online/blog/${post.slug}` },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <main style={{ maxWidth: 820, margin: '0 auto', padding: '44px 20px 72px' }}>
      <nav aria-label="Breadcrumb" style={{ fontSize: 14, marginBottom: 36 }}>
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
        {' / '}<Link href="/blog" style={{ color: '#2563eb', textDecoration: 'none' }}>Blog</Link>
        {' / '}<span>{post.title}</span>
      </nav>
      <article>
        <header style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 28, marginBottom: 34 }}>
          <p style={{ color: '#6b7280', fontSize: 13, margin: '0 0 14px' }}>{post.date} · {post.readTime}</p>
          <h1 style={{ color: '#111827', fontSize: 'clamp(32px, 5vw, 50px)', lineHeight: 1.1, margin: '0 0 16px' }}>{post.title}</h1>
          <p style={{ color: '#4b5563', fontSize: 19, lineHeight: 1.6, margin: 0 }}>{post.description}</p>
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 style={{ color: '#111827', fontSize: 25, margin: '0 0 10px' }}>{section.heading}</h2>
              <p style={{ color: '#374151', fontSize: 17, lineHeight: 1.8, margin: 0 }}>{section.body}</p>
            </section>
          ))}
        </div>
        {post.relatedBanks?.length ? (
          <section aria-labelledby="related-bank-pages" style={{ marginTop: 40 }}>
            <h2 id="related-bank-pages" style={{ color: '#111827', fontSize: 25, margin: '0 0 14px' }}>Top bank statement converter pages</h2>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, padding: 0, margin: 0, listStyle: 'none' }}>
              {post.relatedBanks.map((bank) => (
                <li key={bank.slug}><Link href={`/banks/${bank.slug}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{bank.name} statement to Excel</Link></li>
              ))}
            </ul>
          </section>
        ) : null}
        <div style={{ background: '#eff6ff', borderRadius: 12, padding: 22, marginTop: 40 }}>
          <h2 style={{ color: '#1e3a8a', fontSize: 20, margin: '0 0 8px' }}>Ready to convert a statement?</h2>
          <p style={{ color: '#1e40af', lineHeight: 1.6, margin: '0 0 14px' }}>Use ApexDoc to turn a bank statement PDF into a downloadable Excel workbook.</p>
          <Link href="/" style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'none' }}>Open the PDF converter →</Link>
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogPostingSchema(post)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogBreadcrumbSchema(post)) }} />
    </main>
  )
}
