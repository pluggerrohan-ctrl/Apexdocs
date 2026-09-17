import { notFound } from 'next/navigation'
import ConverterApp from '../../../components/converter-app'
import { getBank, bankSlugs } from '../../../lib/banks'

export function generateStaticParams() {
  return bankSlugs.slice(0, 100).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const bank = getBank(slug)
  if (!bank) return { title: 'ApexDoc | Bank Statement Converter' }
  return {
    title: `${bank.name} Statement to Excel Converter | ApexDoc`,
    description: `Convert ${bank.name} PDF bank statements into clean Excel files securely in your browser.`,
  }
}

export default async function BankPage({ params }) {
  const { slug } = await params
  const bank = getBank(slug)
  if (!bank) notFound()
  return <ConverterApp bank={bank} />
}
