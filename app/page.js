import ConverterApp from '../components/converter-app'

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

export default function HomePage() {
  return <ConverterApp bank={{ slug: 'bank', country: 'Global', name: 'Bank statement' }} showTrustMetrics />
}
