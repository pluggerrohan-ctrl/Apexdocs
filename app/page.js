import ConverterApp from '../components/converter-app'

export const metadata = {
  title: 'Bank Statement to Excel Converter | ApexDoc',
  description: 'Convert a bank statement PDF to Excel with ApexDoc. Extract transactions into a clean spreadsheet privately, with browser-first processing and secure fallback support.',
}

export default function HomePage() {
  return <ConverterApp bank={{ slug: 'bank', country: 'Global', name: 'Bank statement' }} />
}
