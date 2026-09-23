import Link from 'next/link'
import { notFound } from 'next/navigation'
import banks from '../../../../data/banks.json'
import { getCountryContent } from '../../../../lib/bank-content'

const VALID_COUNTRIES = ['usa', 'uk', 'uae']

export function generateStaticParams() {
  return VALID_COUNTRIES.map((country) => ({ country }))
}

export async function generateMetadata({ params }) {
  const { country } = await params
  const countryUpper = country.toUpperCase()
  const content = getCountryContent(countryUpper)
  if (!content) return { title: 'Bank Statement Converter' }

  return {
    title: `${countryUpper} Bank Statement PDF to Excel Converters | ApexDoc`,
    description: `Convert ${content.bankCount} ${countryUpper} bank statement PDFs to Excel with ApexDoc. Private, browser-first processing. Browse all ${countryUpper} bank converters.`,
    robots: { index: true, follow: true },
    alternates: { canonical: `https://apexwebdesign.online/banks/country/${country}` },
  }
}

export default async function CountryHubPage({ params }) {
  const { country } = await params
  const countryUpper = country.toUpperCase()
  const content = getCountryContent(countryUpper)
  if (!content) notFound()

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 20px 80px' }}>
      <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
        {' / '}
        <Link href="/all-banks" style={{ color: '#2563eb', textDecoration: 'none' }}>All Banks</Link>
        {' / '}
        <span style={{ color: '#374151' }}>{countryUpper}</span>
      </nav>

      <header style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', color: '#6b7280', textTransform: 'uppercase', margin: 0 }}>
          {countryUpper} Bank Converters
        </p>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: '8px 0 12px', color: '#111827' }}>
          {countryUpper} Bank Statement PDF to Excel Converters
        </h1>
        <p style={{ fontSize: 15, color: '#4b5563', maxWidth: 640, lineHeight: 1.6 }}>
          Convert {content.bankCount} {countryUpper} bank statement PDFs to clean Excel spreadsheets with ApexDoc.
          All processing happens in your browser — your financial data never leaves your device.
          Statements are in {content.currency} ({content.currencySymbol}).
        </p>
        <Link href="/" style={{ display: 'inline-block', marginTop: 16, fontSize: 14, color: '#2563eb', fontWeight: 600 }}>
          Start converting
        </Link>
      </header>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: 10, marginBottom: 16 }}>
          All {countryUpper} banks ({content.bankCount})
        </h2>
        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '8px 16px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {content.banks.map((bank) => (
            <li key={bank.slug}>
              <Link
                href={`/banks/${bank.slug}`}
                style={{ display: 'block', fontSize: 14, color: '#374151', textDecoration: 'none', lineHeight: 1.5 }}
              >
                <span style={{ display: 'block' }}>{bank.name} Statement PDF to Excel</span>
                <span style={{ display: 'block', marginTop: 2, fontSize: 12, color: '#6b7280' }}>
                  /banks/{bank.slug}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${countryUpper} Bank Statement PDF to Excel Converters`,
            description: `Browse all ${content.bankCount} ${countryUpper} bank statement PDF to Excel converters on ApexDoc.`,
            hasPart: content.banks.map((bank) => ({
              '@type': 'WebApplication',
              name: `${bank.name} Statement Converter`,
              url: `https://apexwebdesign.online/banks/${bank.slug}`,
            })),
          }),
        }}
      />
    </main>
  )
}
