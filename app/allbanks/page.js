import banks from '../../data/banks.json'

const SITE_URL = 'https://apexwebdesign.online'

export const metadata = {
  title: 'All Supported Banks Worldwide for PDF to Excel Conversion | ApexDoc',
  description:
    'ApexDoc supports 800+ financial institutions across the USA, UK, and UAE. Convert your bank statement PDF to Excel privately in your browser. Browse all supported banks by country.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/allbanks` },
}

const COUNTRY_ORDER = ['USA', 'UK', 'UAE']

const COUNTRY_NAMES = {
  USA: 'United States',
  UK: 'United Kingdom',
  UAE: 'United Arab Emirates',
}

const COUNTRY_FLAGS = {
  USA: '\u{1F1FA}\u{1F1F8}',
  UK: '\u{1F1EC}\u{1F1E7}',
  UAE: '\u{1F1E6}\u{1F1EA}',
}

function groupByCountry(list) {
  const groups = new Map()
  for (const bank of list) {
    if (!groups.has(bank.country)) groups.set(bank.country, [])
    groups.get(bank.country).push(bank)
  }
  for (const group of groups.values()) group.sort((a, b) => a.name.localeCompare(b.name))
  return groups
}

const sharedStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', system-ui, sans-serif; }
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

export default function AllBanksDirectoryPage() {
  const grouped = groupByCountry(banks)
  const countries = [...COUNTRY_ORDER, ...[...grouped.keys()].filter((c) => !COUNTRY_ORDER.includes(c))]
  const totalBanks = banks.length

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sharedStyles }} />

      {/* HEADER */}
      <header
        style={{
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 max(24px, calc((100vw - 1176px) / 2))',
          borderBottom: '1px solid #edf0f5',
          background: 'rgba(255,255,255,0.92)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(12px)',
        }}
      >
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 18,
            color: '#101827',
          }}
        >
          <span
            style={{
              display: 'grid',
              placeItems: 'center',
              width: 36,
              height: 36,
              color: 'white',
              background: '#1769d5',
              borderRadius: '50%',
              fontSize: 16,
            }}
          >
            {'\u2728'}
          </span>
          ApexDoc
        </a>
        <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <a href="/" style={{ fontSize: 13, color: '#69727d', textDecoration: 'none' }}>Home</a>
          <a href="/pdfconverter" style={{ fontSize: 13, color: '#69727d', textDecoration: 'none' }}>Converter</a>
          <a href="/all-banks" style={{ fontSize: 13, color: '#69727d', textDecoration: 'none' }}>All Banks</a>
          <a
            href="/"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'white',
              background: '#1769d5',
              padding: '8px 18px',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            Convert Now
          </a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #112d4e 50%, #0a1628 100%)',
          padding: '80px 24px 70px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#5b9bf5',
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            {'\u{1F30D} Global Bank Directory'}
          </p>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: '0 0 24px',
            }}
          >
            Supported Banks Worldwide for PDF to Excel Conversion
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: '#a3b8d4',
              maxWidth: 720,
              margin: '0 auto',
            }}
          >
            ApexDoc securely supports over {totalBanks}+ financial institutions globally. Our local-browser
            sandbox technology parses your bank statements privately on your device, ensuring zero data logs or
            server uploads. Select your region and bank below to convert your PDF statement into a clean,
            audit-ready Excel spreadsheet instantly.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 24,
              marginTop: 36,
              flexWrap: 'wrap',
            }}
          >
            {countries.map((country) => {
              const count = grouped.get(country)?.length || 0
              return (
                <a
                  key={country}
                  href={`#country-${country.toLowerCase()}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 20px',
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#c5d9f0',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: 18 }}>{COUNTRY_FLAGS[country]}</span>
                  {COUNTRY_NAMES[country] || country}
                  <span style={{ color: '#5b9bf5', fontSize: 13 }}>({count})</span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* COUNTRY SECTIONS */}
      <main
        style={{
          maxWidth: 1176,
          margin: '0 auto',
          padding: '56px 24px 64px',
        }}
      >
        {countries.map((country) => {
          const countryBanks = grouped.get(country)
          if (!countryBanks?.length) return null
          const countryName = COUNTRY_NAMES[country] || country
          const flag = COUNTRY_FLAGS[country] || ''

          return (
            <section
              key={country}
              id={`country-${country.toLowerCase()}`}
              style={{ marginBottom: 56, scrollMarginTop: 90 }}
            >
              {/* Country Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  paddingBottom: 16,
                  borderBottom: '2px solid #e3e8f0',
                  marginBottom: 28,
                }}
              >
                <span style={{ fontSize: 28 }}>{flag}</span>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#101827',
                    margin: 0,
                  }}
                >
                  {countryName}
                </h2>
                <span
                  style={{
                    fontSize: 14,
                    color: '#687386',
                    fontWeight: 500,
                  }}
                >
                  {countryBanks.length} banks
                </span>
                <a
                  href={`/banks/country/${country.toLowerCase()}`}
                  style={{
                    marginLeft: 'auto',
                    fontSize: 13,
                    color: '#1769d5',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  View all {countryName} banks {'\u2192'}
                </a>
              </div>

              {/* Bank Grid — 4 columns on desktop, 2 on tablet, 1 on mobile */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '10px 16px',
                }}
              >
                {countryBanks.map((bank) => (
                  <a
                    key={bank.slug}
                    href={`${SITE_URL}/banks/${bank.slug}`}
                    className="bank-link"
                  >
                    Convert {bank.name} Statement PDF to Excel
                  </a>
                ))}
              </div>
            </section>
          )
        })}
      </main>

      {/* FOOTER */}
      <footer
        style={{
          background: '#0a1628',
          padding: '48px 24px 32px',
          borderTop: '1px solid #1a2d4a',
        }}
      >
        <div
          style={{
            maxWidth: 1176,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 32,
          }}
        >
          <div>
            <a
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                textDecoration: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: '#ffffff',
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 32,
                  height: 32,
                  color: 'white',
                  background: '#1769d5',
                  borderRadius: '50%',
                  fontSize: 14,
                }}
              >
                {'\u2728'}
              </span>
              ApexDoc
            </a>
            <p style={{ color: '#6b7d96', fontSize: 13, lineHeight: 1.6, maxWidth: 320 }}>
              Convert bank statement PDFs to Excel privately in your browser. No uploads, no servers, no data logs.
            </p>
          </div>

          <nav style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#5b9bf5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                Product
              </p>
              <a href="/" style={{ color: '#a3b8d4', fontSize: 13, textDecoration: 'none' }}>Home</a>
              <a href="/pdfconverter" style={{ color: '#a3b8d4', fontSize: 13, textDecoration: 'none' }}>Converter</a>
              <a href="/allbanks" style={{ color: '#a3b8d4', fontSize: 13, textDecoration: 'none' }}>All Supported Banks ({totalBanks}+)</a>
              <a href="/all-banks" style={{ color: '#a3b8d4', fontSize: 13, textDecoration: 'none' }}>Browse Banks</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#5b9bf5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                Legal
              </p>
              <a href="/" style={{ color: '#a3b8d4', fontSize: 13, textDecoration: 'none' }}>Terms &amp; Conditions</a>
              <a href="/" style={{ color: '#a3b8d4', fontSize: 13, textDecoration: 'none' }}>Privacy Policy</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#5b9bf5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                Connect
              </p>
              <a href="https://x.com/namanbuildai" target="_blank" rel="noreferrer" style={{ color: '#a3b8d4', fontSize: 13, textDecoration: 'none' }}>@namanbuildai</a>
              <a href="mailto:namanbilthariya@gmail.com" style={{ color: '#a3b8d4', fontSize: 13, textDecoration: 'none' }}>Support Email</a>
            </div>
          </nav>
        </div>

        <div
          style={{
            maxWidth: 1176,
            margin: '32px auto 0',
            paddingTop: 24,
            borderTop: '1px solid #1a2d4a',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ color: '#4a5d7a', fontSize: 12 }}>
            {'\u00A9'} {new Date().getFullYear()} ApexDoc. All rights reserved.
          </p>
          <p style={{ color: '#4a5d7a', fontSize: 12 }}>
            All processing happens locally in your browser. No data is stored or uploaded.
          </p>
        </div>
      </footer>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'All Supported Banks Worldwide for PDF to Excel Conversion',
            description: `ApexDoc supports ${totalBanks}+ financial institutions across the USA, UK, and UAE. Convert your bank statement PDF to Excel privately in your browser.`,
            url: `${SITE_URL}/allbanks`,
            isPartOf: {
              '@type': 'WebSite',
              name: 'ApexDoc',
              url: SITE_URL,
            },
            hasPart: countries.map((country) => ({
              '@type': 'CollectionPage',
              name: `${COUNTRY_NAMES[country] || country} Bank Converters`,
              url: `${SITE_URL}/banks/country/${country.toLowerCase()}`,
            })),
          }),
        }}
      />
    </>
  )
}
