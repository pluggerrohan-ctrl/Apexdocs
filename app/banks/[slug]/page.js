import { redirect } from 'next/navigation'
import ConverterApp from '../../../components/converter-app'
import { getBank, bankSlugs } from '../../../lib/banks'

export function generateStaticParams() {
  return bankSlugs.slice(0, 100).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params
    const bank = getBank(slug)
    if (!bank) return { title: 'ApexDoc | Bank Statement Converter' }
    return {
      title: `${bank.name} PDF to Excel Converter | ApexDoc`,
      description: `Turn a ${bank.name} statement PDF into an audit-ready Excel spreadsheet with ApexDoc's private, browser-first converter.`,
    }
  } catch {
    return { title: 'ApexDoc | Bank Statement Converter' }
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
