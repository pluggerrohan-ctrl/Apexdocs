import ConverterApp from '../../../../../components/converter-app'
import banks from '../../../../../data/banks.json'

const siteUrl = 'https://apexwebdesign.online'

export function generateStaticParams() {
  return banks
    .filter((bank) => bank.slug.startsWith('india/'))
    .map((bank) => {
      const [, state, ...slugParts] = bank.slug.split('/')
      return { state, slug: slugParts.join('/') }
    })
}

export async function generateMetadata({ params }) {
  const { state, slug } = await params
  const bank = banks.find((candidate) => candidate.slug === `india/${state}/${slug}`)
  if (!bank) return { title: 'Bank Statement Converter' }

  const title = `Convert ${bank.name} PDF Statement to Excel Online`
  const canonical = `${siteUrl}/banks/${bank.slug}`
  return {
    title,
    description: `${title} with private browser-based PDF processing and instant Excel export.`,
    alternates: { canonical },
    openGraph: { title, description: `${title} with private browser-based PDF processing.` },
  }
}

export default async function IndianBankPage({ params }) {
  const { state, slug } = await params
  const bank = banks.find((candidate) => candidate.slug === `india/${state}/${slug}`)
  if (!bank) return null

  return <ConverterApp bank={bank} statementTitle />
}

export const revalidate = 86400
