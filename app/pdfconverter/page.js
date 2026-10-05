import ConverterApp from '../../components/converter-app'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'PDF Bank Statement Converter to Excel | ApexDoc',
  description: 'Convert text-based PDF bank statements to clean Excel spreadsheets privately in your browser.',
}

export default function PdfConverterPage() {
  return <ConverterApp bank={{ slug: 'bank', country: 'Global', name: 'Bank statement' }} />
}
