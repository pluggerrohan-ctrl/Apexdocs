import ConverterApp from '../components/converter-app'

export const metadata = {
  title: 'Bank Statement PDF to Excel Converter | ApexDoc',
  description: 'Apex document converter for bank statement PDFs. Extract dates, descriptions, debits, credits, and balances through disclosed HTTPS cloud processing.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://apexwebdesign.online/' },
  openGraph: {
    title: 'Bank Statement PDF to Excel Converter | ApexDoc',
    description: 'Apex document converter for bank statement PDFs, with structured Excel exports through disclosed HTTPS cloud processing.',
    url: 'https://apexwebdesign.online/',
    siteName: 'ApexDoc',
    type: 'website',
  },
}

export default function HomePage() {
  return <ConverterApp bank={{ slug: 'bank', country: 'Global', name: 'Bank statement' }} showTrustMetrics />
}
