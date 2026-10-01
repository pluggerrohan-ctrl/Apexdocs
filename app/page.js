import ConverterApp from '../components/converter-app'
import banks from '../data/banks.json'

export const metadata = {
  title: 'Bank Statement PDF to Excel Converter | ApexDoc',
  description: 'Convert bank statement PDFs to Excel online with ApexDoc. Extract dates, descriptions, debits, credits, and balances using private browser-first processing.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://apexwebdesign.online/' },
  openGraph: {
    title: 'Bank Statement PDF to Excel Converter | ApexDoc',
    description: 'Convert bank statement PDFs into clean Excel spreadsheets with private, browser-first processing.',
    url: 'https://apexwebdesign.online/',
    siteName: 'ApexDoc',
    type: 'website',
  },
}

const COUNTRY_ORDER = ['USA', 'UK', 'UAE']
const COUNTRY_NAMES = { USA: 'United States', UK: 'United Kingdom', UAE: 'United Arab Emirates' }

const bankLinkStyles = `
  .bank-link {
    display: block;
    padding: 10px 14px;
    border-radius: 8px;
    background: #f8f9fc;
    border: 1px solid #edf0f5;
    color: #374151;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    line-height: 1.4;
    transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
  }
  .bank-link:hover {
    background: #e9f2ff;
    border-color: #b9c9df;
    transform: translateY(-1px);
    color: #1769d5;
  }
  @media (prefers-color-scheme: dark) {
    .bank-link {
      background: #172337;
      border-color: #30415a;
      color: #c5d9f0;
    }
    .bank-link:hover {
      background: #1a2d4a;
      border-color: #3a5278;
      color: #5b9bf5;
    }
  }
`

function groupByCountry(list) {
  const groups = new Map()
  for (const bank of list) {
    if (!groups.has(bank.country)) groups.set(bank.country, [])
    groups.get(bank.country).push(bank)
  }
  for (const group of groups.values()) group.sort((a, b) => a.name.localeCompare(b.name))
  return groups
}

export default function HomePage() {
  const grouped = groupByCountry(banks)
  const countries = [...COUNTRY_ORDER, ...[...grouped.keys()].filter((c) => !COUNTRY_ORDER.includes(c))]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: bankLinkStyles }} />
      <ConverterApp bank={{ slug: 'bank', country: 'Global', name: 'Bank statement' }} />
      <section aria-labelledby="supported-banks-heading" style={{ maxWidth: 1176, margin: '0 auto', padding: '48px 24px 64px' }}>
        <h2 id="supported-banks-heading" style={{ fontSize: 24, fontWeight: 700, color: '#101827', margin: '0 0 8px' }}>
          Supported Banks ({banks.length}+)
        </h2>
        <p style={{ fontSize: 14, color: '#687386', margin: '0 0 32px' }}>
          Convert your bank statement PDF to Excel privately in your browser. Select your bank below.
        </p>
        {countries.map((country) => {
          const countryBanks = grouped.get(country)
          if (!countryBanks?.length) return null
          return (
            <div key={country} style={{ marginBottom: 40 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#101827', margin: '0 0 16px' }}>
                {COUNTRY_NAMES[country] || country} ({countryBanks.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '8px 12px' }}>
                {countryBanks.map((bank) => (
                  <a key={bank.slug} href={`/banks/${bank.slug}`} className="bank-link">
                    Convert {bank.name} Statement PDF to Excel
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}
