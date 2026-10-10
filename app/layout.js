import Script from 'next/script'
import '../index.css'
import '../auth.css'

export const metadata = {
  metadataBase: new URL('https://apexwebdesign.online'),
  title: {
    default: 'Bank Statement to Excel Converter | ApexDoc',
    template: '%s | ApexDoc',
  },
  description: 'Convert bank statement PDFs into clean Excel spreadsheets in your browser.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }) {
  const siteSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://apexwebdesign.online/#organization',
        name: 'ApexDoc',
        url: 'https://apexwebdesign.online',
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://apexwebdesign.online/#software',
        name: 'ApexDoc Bank Statement Converter',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web Browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        provider: { '@id': 'https://apexwebdesign.online/#organization' },
      },
    ],
  }

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
      </head>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-476R2P8M27"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-476R2P8M27');`}
        </Script>
      </body>
    </html>
  )
}
