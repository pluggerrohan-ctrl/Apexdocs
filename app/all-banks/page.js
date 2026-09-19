import Link from 'next/link'
import banks from '../../data/banks.json'

export const metadata = {
  title: 'All Supported Banks | ApexDoc PDF Converter',
  description:
    'Browse every bank statement PDF to Excel converter supported by ApexDoc, grouped by country: USA, UK, and UAE.',
}

const COUNTRY_ORDER = ['USA', 'UK', 'UAE']

function groupByCountry(list) {
  const groups = new Map()
  for (const bank of list) {
    if (!groups.has(bank.country)) groups.set(bank.country, [])
    groups.get(bank.country).push(bank)
  }
  for (const group of groups.values()) group.sort((a, b) => a.name.localeCompare(b.name))
  return groups
}

export default function AllBanksPage() {
  const grouped = groupByCountry(banks)
  const countries = [...COUNTRY_ORDER, ...[...grouped.keys()].filter((country) => !COUNTRY_ORDER.includes(country))]

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 20px 80px' }}>
      <header style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', color: '#6b7280', textTransform: 'uppercase', margin: 0 }}>
          Supported Banks
        </p>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: '8px 0 12px', color: '#111827' }}>
          All Supported Banks
        </h1>
        <p style={{ fontSize: 15, color: '#4b5563', maxWidth: 640, lineHeight: 1.6 }}>
          Convert PDF bank statements to Excel for {banks.length}+ banks across the USA, UK, and UAE. Choose your
          bank below to start converting.
        </p>
        <Link href="/" style={{ display: 'inline-block', marginTop: 16, fontSize: 14, color: '#2563eb', fontWeight: 600 }}>
          ← Back to converter
        </Link>
      </header>

      {countries.map((country) => {
        const countryBanks = grouped.get(country)
        if (!countryBanks?.length) return null
        return (
          <section key={country} style={{ marginBottom: 40 }}>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#111827',
                borderBottom: '1px solid #e5e7eb',
                paddingBottom: 10,
                marginBottom: 16,
              }}
            >
              {country} <span style={{ fontWeight: 400, fontSize: 14, color: '#9ca3af' }}>({countryBanks.length} banks)</span>
            </h2>
            <ul
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '8px 16px',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {countryBanks.map((bank) => (
                <li key={bank.slug}>
                  <a
                    href={`/banks/${bank.slug}`}
                    style={{ fontSize: 14, color: '#374151', textDecoration: 'none', lineHeight: 1.5 }}
                  >
                    {bank.name} Statement PDF to Excel
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </main>
  )
}
