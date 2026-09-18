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
      title: `Convert ${bank.name} PDF Bank Statement to Excel | ApexDoc`,
      description: `Convert ${bank.name} PDF bank statements to Excel with a secure, browser-first workflow.`,
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
