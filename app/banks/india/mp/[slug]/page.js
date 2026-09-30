import Link from 'next/link'
import { notFound } from 'next/navigation'
import ConverterApp from '../../../../../components/converter-app'
import banks from '../../../../../data/banks.json'
import { getBankContent } from '../../../../../lib/bank-content'

const siteUrl = 'https://apexwebdesign.online'
const supportedSlugs = [
  'central-bank-of-india-bareli',
  'central-madhya-pradesh-gramin-bank-bareli',
  'jila-sahkari-kendriya-bank-bareli',
]

function findBank(slug) {
  return banks.find((bank) => bank.slug === `india/mp/${slug}`) ?? null
}

export function generateStaticParams() {
  return supportedSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const bank = findBank(slug)
  if (!bank) return { title: 'Bank Statement Converter' }
  const title = `Convert ${bank.name} PDF Statement to Excel Online`
  return {
    title,
    description: `Convert ${bank.name} PDF bank statements to Excel online with private browser-based processing and three free credits.`,
    keywords: [`${bank.name} PDF to Excel`, `${bank.name} statement converter`, 'bank statement converter'],
    alternates: { canonical: `${siteUrl}/banks/india/mp/${slug}` },
    robots: { index: true, follow: true },
  }
}

export default async function IndianBankPage({ params }) {
  const { slug } = await params
  const bank = findBank(slug)
  if (!bank) notFound()
  const content = getBankContent(bank)

  return (
    <>
      <ConverterApp bank={bank} />
      <main className="content-width" style={{ padding: '24px 20px 56px' }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: 20, fontSize: 13 }}>
          <Link href="/" style={{ color: '#2563eb' }}>Home</Link>{' / '}
          <Link href="/allbanks" style={{ color: '#2563eb' }}>All Banks</Link>{' / '}
          <span>{bank.name}</span>
        </nav>
        <article>
          <h2>How to convert your {bank.name} statement to Excel</h2>
          <p>{content.intro}</p>
          <ol>
            {content.steps.map((step) => <li key={step.title}><strong>{step.title}.</strong> {step.body}</li>)}
          </ol>
          <h2>{bank.name} statement conversion FAQ</h2>
          {content.faqs.map((faq) => (
            <section key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </section>
          ))}
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(content.structuredData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(content.breadcrumbData) }} />
      </main>
    </>
  )
}

export const dynamicParams = false

export function generateViewport() {
  return { themeColor: '#0f172a' }
}
