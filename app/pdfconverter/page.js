import ConverterApp from '../../components/converter-app'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'PDF Bank Statement Converter to Excel | ApexDoc',
  description: 'ApexDoc bank statement to Excel converter for structured XLSX exports through secure HTTPS processing.',
}

export default function PdfConverterPage() {
  return <ConverterApp bank={{ slug: 'bank', country: 'Global', name: 'Bank statement' }} />
}
