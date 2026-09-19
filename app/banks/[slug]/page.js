import { redirect } from 'next/navigation'
import ConverterApp from '../../../components/converter-app'
import { getBank, bankSlugs } from '../../../lib/banks'

export function generateStaticParams() {
  return bankSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params
    const bank = getBank(slug)
    if (!bank) {
      return {
        title: 'Bank Statement Converter',
        description: 'Convert bank statement PDFs into clean Excel spreadsheets in your browser.',
      }
    }
    return {
      title: `Convert ${bank.name} Statement PDF to Excel Online`,
      description: `Convert your ${bank.name} statement PDF to an Excel spreadsheet online with ApexDoc. Private, browser-first processing with no document uploads.`,
      robots: { index: true, follow: true },
    }
  } catch {
    return {
      title: 'Bank Statement Converter',
      description: 'Convert bank statement PDFs into clean Excel spreadsheets in your browser.',
    }
  }
}

export default async function BankPage({ params }) {
  try {
    const { slug } = await params
    const bank = getBank(slug)
    if (!bank) redirect('/')
    return <ConverterApp bank={bank} />
  } catch {
    redirect('/')
  }
}
