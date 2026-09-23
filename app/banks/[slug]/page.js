import Link from 'next/link'
import { redirect } from 'next/navigation'
import ConverterApp from '../../../components/converter-app'
import banks from '../../../data/banks.json'
import { getBank, bankSlugs } from '../../../lib/banks'
import { getBankContent } from '../../../lib/bank-content'

export function generateStaticParams() {
  return bankSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params
    const bank = getBank(slug)
    if (!bank) {
      return {
        title: 'Bank Statement Converter',
        description: 'Convert bank statement PDFs into clean Excel spreadsheets in your browser.',
      }
    }
    const content = getBankContent(bank)
    return {
      title: `Convert ${bank.name} Statement PDF to Excel Online`,
      description: content.intro.slice(0, 155),
      robots: { index: true, follow: true },
      alternates: { canonical: `https://apexwebdesign.online/banks/${bank.slug}` },
    }
  } catch {
    return {
      title: 'Bank Statement Converter',
      description: 'Convert bank statement PDFs into clean Excel spreadsheets in your browser.',
    }
  }
}

function BankContent({ bank }) {
  const content = getBankContent(bank)
  const info = content.infoBox

  return (
    <section style={{ maxWidth: 800, margin: '0 auto', padding: '24px 20px 48px' }}>
      <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
        {' / '}
        <Link href="/all-banks" style={{ color: '#2563eb', textDecoration: 'none' }}>All Banks</Link>
        {' / '}
        <Link href={`/banks/country/${bank.country.toLowerCase()}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{bank.country}</Link>
        {' / '}
        <span style={{ color: '#374151' }}>{bank.name}</span>
      </nav>

      <div style={{ background: '#f9fafb', borderRadius: 12, padding: '20px 24px', marginBottom: 32 }}>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#374151', margin: 0 }}>
          {content.intro}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 36 }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '14px 16px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', margin: '0 0 4px' }}>Bank</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#111827', margin: 0 }}>{bank.name}</p>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '14px 16px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', margin: '0 0 4px' }}>Country</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#111827', margin: 0 }}>{bank.country}</p>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '14px 16px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', margin: '0 0 4px' }}>Currency</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#111827', margin: 0 }}>{info.currency} ({info.currencySymbol})</p>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '14px 16px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', margin: '0 0 4px' }}>Regulator</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#111827', margin: 0 }}>{info.regulatoryBody}</p>
        </div>
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>
        How to convert your {content.displayName} statement to Excel
      </h2>
      <ol style={{ paddingLeft: 20, margin: '0 0 36px' }}>
        {content.steps.map((step, i) => (
          <li key={i} style={{ fontSize: 15, lineHeight: 1.7, color: '#374151', marginBottom: 12 }}>
            <strong style={{ color: '#111827' }}>{step.title}.</strong> {step.body}
          </li>
        ))}
      </ol>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>
        {content.displayName} statement conversion FAQ
      </h2>
      <div style={{ marginBottom: 36 }}>
        {content.faqs.map((faq, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', margin: '0 0 6px' }}>{faq.question}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#4b5563', margin: 0 }}>{faq.answer}</p>
          </div>
        ))}
      </div>

      <div style={{ background: '#eff6ff', borderRadius: 8, padding: '16px 20px', marginBottom: 32 }}>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: '#1e40af', margin: 0 }}>
          <strong>Tip:</strong> {info.pdfExportTip}
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(content.structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(content.breadcrumbData) }}
      />
    </section>
  )
}

export default async function BankPage({ params }) {
  try {
    const { slug } = await params
    const bank = getBank(slug)
    if (!bank) redirect('/')

    const relatedBanks = banks
      .filter((candidate) => candidate.country === bank.country && candidate.slug !== bank.slug)
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 12)

    return (
      <>
        <ConverterApp bank={bank} />
        <BankContent bank={bank} />
        <section
          aria-labelledby="related-banks-heading"
          style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px 56px' }}
        >
          <h2 id="related-banks-heading" style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: '0 0 14px' }}>
            More {bank.country} bank converters
          </h2>
          <nav aria-label={`More ${bank.country} bank converters`}>
            <ul
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 10,
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {relatedBanks.map((relatedBank) => (
                <li key={relatedBank.slug}>
                  <Link
                    href={`/banks/${relatedBank.slug}`}
                    style={{ color: '#2563eb', fontSize: 14, textDecoration: 'none' }}
                  >
                    Convert {relatedBank.name} statement PDF
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href={`/banks/country/${bank.country.toLowerCase()}`} style={{ display: 'inline-block', marginTop: 20, color: '#2563eb', fontSize: 14 }}>
            Browse all {bank.country} banks
          </Link>
        </section>
      </>
    )
  } catch {
    redirect('/')
  }
}
