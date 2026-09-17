import ConverterApp from '../components/converter-app'

export const metadata = {
  title: 'ApexDoc PDF Converter | Convert Bank Statements to Excel',
  description: 'Convert text-based PDF bank statements to clean Excel spreadsheets privately in your browser.',
}

export default function HomePage() {
  return <ConverterApp bank={{ slug: 'bank', country: 'Global', name: 'Bank statement' }} />
}
