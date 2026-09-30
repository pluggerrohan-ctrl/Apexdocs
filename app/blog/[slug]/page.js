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
    alternates: { canonical: post.comparison ? 'https://apexwebdesign.online' : `https://apexwebdesign.online/blog/${post.slug}` },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const comparisonRows = [
    ['Price', '$499 / month', '$39 lifetime deal Pro Plan'],
    ['Data security', 'Uploaded to cloud servers', '100% client-side browser sandbox — data never leaves your PC'],
    ['Speed', 'Queued server processing', 'Instant local browser engine'],
    ['Free trial', 'Credit card required / locked', '3 free credits instantly — no signup required'],
  ]

  if (post.comparison) {
    return (
      <main style={{ minHeight: '100vh', background: '#070b14', color: '#e5e7eb', padding: '28px 20px 96px' }}>
        <article style={{ maxWidth: 1080, margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ color: '#94a3b8', fontSize: 14, marginBottom: 72 }}>
            <Link href="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>{' / '}<Link href="/blog" style={{ color: '#93c5fd', textDecoration: 'none' }}>Blog</Link>{' / '}<span>{post.title}</span>
          </nav>
          <header style={{ maxWidth: 850, marginBottom: 64 }}>
            <p style={{ color: '#60a5fa', fontSize: 13, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>CPA privacy playbook · {post.readTime}</p>
            <h1 style={{ color: '#f8fafc', fontSize: 'clamp(38px, 7vw, 76px)', lineHeight: 1.02, letterSpacing: '-0.045em', margin: '18px 0 24px' }}>Nanonets vs ApexDoc: Ultimate PDF to Excel Converter Comparison</h1>
            <p style={{ color: '#cbd5e1', fontSize: 21, lineHeight: 1.65, margin: 0 }}>Why accounting firms are moving sensitive statement conversion out of cloud queues and into a 100% local browser sandbox.</p>
          </header>
          <section aria-labelledby="privacy-first" style={{ background: 'linear-gradient(135deg, #172554, #0f172a 70%)', border: '1px solid #1d4ed8', borderRadius: 24, padding: '32px clamp(24px, 5vw, 56px)', marginBottom: 72 }}>
            <p style={{ color: '#93c5fd', fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 14px' }}>The strategic difference</p>
            <h2 id="privacy-first" style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.1, margin: '0 0 16px' }}>Your client&apos;s PDF stays on their computer.</h2>
            <p style={{ color: '#bfdbfe', fontSize: 18, lineHeight: 1.7, maxWidth: 760, margin: 0 }}>Nanonets processes uploaded documents on cloud servers. ApexDoc&apos;s local conversion engine processes the statement in the browser sandbox, so the original financial document does not need to leave the PC.</p>
          </section>
          <section aria-labelledby="comparison-matrix" style={{ marginBottom: 72 }}>
            <h2 id="comparison-matrix" style={{ color: '#f8fafc', fontSize: 32, margin: '0 0 20px' }}>At-a-glance comparison</h2>
            <div style={{ overflowX: 'auto', border: '1px solid #273449', borderRadius: 18 }}>
              <table style={{ width: '100%', minWidth: 720, borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead><tr style={{ background: '#111827' }}><th style={{ padding: 20, color: '#94a3b8' }}>Capability</th><th style={{ padding: 20, color: '#cbd5e1' }}>Nanonets</th><th style={{ padding: 20, color: '#93c5fd' }}>ApexDoc</th></tr></thead>
                <tbody>{comparisonRows.map(([label, nanonets, apexdoc]) => <tr key={label} style={{ borderTop: '1px solid #273449' }}><th scope="row" style={{ padding: 20, color: '#f8fafc', width: '22%' }}>{label}</th><td style={{ padding: 20, color: '#94a3b8' }}>{nanonets}</td><td style={{ padding: 20, color: '#bfdbfe', fontWeight: 700 }}>{apexdoc}</td></tr>)}</tbody>
              </table>
            </div>
          </section>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 820 }}>
            {post.sections.map((section) => <section key={section.heading}><h2 style={{ color: '#f8fafc', fontSize: 30, margin: '0 0 12px' }}>{section.heading}</h2><p style={{ color: '#cbd5e1', fontSize: 18, lineHeight: 1.8, margin: 0 }}>{section.body}</p></section>)}
          </div>
          <section style={{ background: '#f8fafc', borderRadius: 22, padding: '32px clamp(24px, 5vw, 48px)', marginTop: 72, color: '#0f172a' }}>
            <p style={{ color: '#2563eb', fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 12px' }}>Start local conversion</p>
            <h2 style={{ fontSize: 32, lineHeight: 1.1, margin: '0 0 12px' }}>Switch to a private workflow today.</h2>
            <p style={{ color: '#475569', fontSize: 17, lineHeight: 1.6, margin: '0 0 22px' }}>Try three conversions instantly with no signup, then choose ApexDoc Pro when your firm is ready for unlimited local processing.</p>
            <Link href="/#converter" style={{ display: 'inline-flex', background: '#2563eb', color: '#fff', borderRadius: 999, padding: '14px 22px', fontWeight: 800, textDecoration: 'none' }}>Switch to ApexDoc Pro Now</Link>
          </section>
        </article>
        <Link href="/#converter" style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 10, background: '#2563eb', color: '#fff', borderRadius: 999, padding: '14px 20px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 12px 30px #0008' }}>Switch to ApexDoc Pro Now</Link>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogPostingSchema(post)) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogBreadcrumbSchema(post)) }} />
      </main>
    )
  }

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
            <section key={section.heading}><h2 style={{ color: '#111827', fontSize: 25, margin: '0 0 10px' }}>{section.heading}</h2><p style={{ color: '#374151', fontSize: 17, lineHeight: 1.8, margin: 0 }}>{section.body}</p></section>
          ))}
        </div>
        <div style={{ background: '#eff6ff', borderRadius: 12, padding: 22, marginTop: 40 }}><h2 style={{ color: '#1e3a8a', fontSize: 20, margin: '0 0 8px' }}>Ready to convert a statement?</h2><p style={{ color: '#1e40af', lineHeight: 1.6, margin: '0 0 14px' }}>Use ApexDoc to turn a bank statement PDF into a downloadable Excel workbook.</p><Link href="/" style={{ color: '#1d4ed8', fontWeight: 700, textDecoration: 'none' }}>Open the PDF converter →</Link></div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogPostingSchema(post)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogBreadcrumbSchema(post)) }} />
    </main>
  )
}
