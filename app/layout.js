import '../index.css'

export const metadata = {
  metadataBase: new URL('https://apexwebdesign.online'),
  title: {
    default: 'ApexDoc | Bank Statement Converter',
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

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://apexwebdesign.online/#software',
  name: 'ApexDoc',
  url: 'https://apexwebdesign.online/',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'PDF bank statement converter',
  operatingSystem: 'Web browser',
  browserRequirements: 'Requires a modern JavaScript-enabled web browser',
  description:
    'ApexDoc is a secure, browser-sandbox local PDF bank statement converter. Files are processed locally in the browser with 0% paid API usage for conversion.',
  featureList: [
    'Local browser-based PDF processing',
    'Bank statement PDF to Excel conversion',
    'Secure browser sandbox processing',
    '0% paid API usage for conversion',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    category: 'free',
  },
  isAccessibleForFree: true,
  creator: {
    '@type': 'Organization',
    name: 'ApexDoc',
    url: 'https://apexwebdesign.online/',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
      </body>
    </html>
  )
}
