import Link from 'next/link'
import ConverterApp from '../../../components/converter-app'
import { getKeywordPage, keywordPages } from '../../../data/keyword-pages'

const siteUrl = 'https://apexwebdesign.online'

export function generateStaticParams() {
  return keywordPages.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = getKeywordPage(slug)
  if (!page) return { title: 'Bank Statement Converter' }
  return {
    title: `${page.title} | ApexDoc`,
    description: `${page.intro} Private browser-first processing with Excel download.`,
    keywords: [page.title, page.focus, 'ApexDoc'],
    alternates: { canonical: `${siteUrl}/convert/${page.slug}` },
    robots: { index: true, follow: true },
  }
}

function PageBody({ page }) {
  const converterBank = { name: 'ApexDoc Statement', country: 'GLOBAL', slug: page.slug }
  const url = `${siteUrl}/convert/${page.slug}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: page.title,
    url,
    description: page.intro,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  return (
    <>
      <ConverterApp bank={converterBank} showTrustMetrics />
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '28px 20px 60px' }}>
        <nav aria-label="Breadcrumb" style={{ color: '#64748b', fontSize: 13, marginBottom: 22 }}>
          <Link href="/" style={{ color: '#2563eb' }}>Home</Link> / <span>{page.title}</span>
        </nav>
        <article>
          <p style={{ color: '#2563eb', fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{page.focus}</p>
          <h1 style={{ color: '#0f172a', fontSize: 'clamp(30px, 5vw, 48px)', lineHeight: 1.08, margin: '10px 0 16px' }}>{page.title}</h1>
          <p style={{ color: '#475569', fontSize: 18, lineHeight: 1.65, maxWidth: 760 }}>{page.intro} This page is built for {page.audience} who need a clear next step.</p>
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 14, margin: '28px 0 38px' }} aria-label="Conversion benefits">
            {[['Local-first flow', 'Your PDF stays in the browser while the tool reads supported transaction rows.'], ['Useful workbook', 'Download a structured file for filters, checks, and financial follow-up.'], ['Clear review step', page.proof]].map(([heading, text]) => <div key={heading} style={{ border: '1px solid #dbe7f2', borderRadius: 16, padding: 18, background: '#fff' }}><h2 style={{ color: '#0f172a', fontSize: 17, margin: '0 0 8px' }}>{heading}</h2><p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{text}</p></div>)}
          </section>
          <h2 style={{ color: '#0f172a', fontSize: 24 }}>How this workflow works</h2>
          <ol style={{ color: '#475569', lineHeight: 1.75, paddingLeft: 22 }}>
            {page.steps.map((step) => <li key={step} style={{ marginBottom: 10 }}>{step}</li>)}
          </ol>
          <h2 style={{ color: '#0f172a', fontSize: 24, marginTop: 36 }}>Questions before you convert</h2>
          <div style={{ display: 'grid', gap: 20 }}>
            {page.faq.map(([question, answer]) => <section key={question}><h3 style={{ color: '#0f172a', fontSize: 17, marginBottom: 6 }}>{question}</h3><p style={{ color: '#64748b', lineHeight: 1.7, margin: 0 }}>{answer}</p></section>)}
          </div>
          <div style={{ background: 'linear-gradient(135deg,#eff6ff,#f8fafc)', borderRadius: 18, padding: 20, marginTop: 34 }}><strong style={{ color: '#0f172a' }}>Need more conversions?</strong><p style={{ color: '#475569', margin: '8px 0 14px', lineHeight: 1.6 }}>Use the secure payment options above to add credits after signing in. Your selected plan is handled through the checkout flow.</p><Link href="#pricing" style={{ color: '#2563eb', fontWeight: 700 }}>View credit plans</Link></div>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  )
}

export default async function KeywordPage({ params }) {
  const { slug } = await params
  const page = getKeywordPage(slug)
  if (!page) return null
  return <PageBody page={page} />
}
