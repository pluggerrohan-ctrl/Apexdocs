import Link from 'next/link'
import { blogPosts, getBlogIndexSchema } from '../../lib/blog-content'

export const metadata = {
  title: 'Bank Statement PDF to Excel Guides',
  description: 'Practical ApexDoc guides for converting bank statement PDFs to Excel and checking extracted transaction data.',
  keywords: [
    'bank statement PDF to Excel guide',
    'how to convert bank statement PDF to Excel',
    'bank statement data extraction tips',
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://apexwebdesign.online/blog' },
}

export default function BlogPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '44px 20px 72px' }}>
      <nav aria-label="Breadcrumb" style={{ fontSize: 14, marginBottom: 32 }}>
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
        {' / '}<span>Blog</span>
      </nav>
      <header style={{ maxWidth: 720, marginBottom: 42 }}>
        <p style={{ color: '#2563eb', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>ApexDoc guides</p>
        <h1 style={{ color: '#111827', fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.08, margin: '0 0 16px' }}>Bank statement PDF to Excel resources</h1>
        <p style={{ color: '#4b5563', fontSize: 18, lineHeight: 1.65, margin: 0 }}>Clear, practical advice for converting bank statements, reviewing transaction data, and keeping financial documents organized.</p>
      </header>
      <section aria-labelledby="guides-heading" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
        <h2 id="guides-heading" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)' }}>Latest guides</h2>
        {blogPosts.map((post) => (
          <article key={post.slug} style={{ border: '1px solid #e5e7eb', borderRadius: 14, padding: 24, background: '#fff' }}>
            <p style={{ color: '#6b7280', fontSize: 13, margin: '0 0 14px' }}>{post.date} · {post.readTime}</p>
            <h2 style={{ color: '#111827', fontSize: 23, lineHeight: 1.25, margin: '0 0 12px' }}><Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{post.title}</Link></h2>
            <p style={{ color: '#4b5563', lineHeight: 1.65, margin: '0 0 20px' }}>{post.description}</p>
            <Link href={`/blog/${post.slug}`} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Read guide →</Link>
          </article>
        ))}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogIndexSchema()) }} />
    </main>
  )
}
