import Link from 'next/link'
import { redirect } from 'next/navigation'
import ConverterApp from '../../../components/converter-app'
import banks from '../../../data/banks.json'
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

    const relatedBanks = banks
      .filter((candidate) => candidate.country === bank.country && candidate.slug !== bank.slug)
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 8)

    return (
      <>
        <ConverterApp bank={bank} />
        <section
          aria-labelledby="related-banks-heading"
          style={{ maxWidth: 960, margin: '0 auto', padding: '24px 20px 56px' }}
        >
          <h2 id="related-banks-heading" style={{ margin: '0 0 14px', fontSize: 20, color: '#111827' }}>
            More {bank.country} bank converters
          </h2>
          <nav aria-label={`More ${bank.country} bank converters`}>
            <ul
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 10,
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {relatedBanks.map((relatedBank) => (
                <li key={relatedBank.slug}>
                  <Link
                    href={`/banks/${relatedBank.slug}`}
                    style={{ color: '#2563eb', fontSize: 14, textDecoration: 'none' }}
                  >
                    Convert {relatedBank.name} statement PDF
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/all-banks" style={{ display: 'inline-block', marginTop: 20, color: '#2563eb', fontSize: 14 }}>
            Browse all supported banks
          </Link>
        </section>
      </>
    )
  } catch {
    redirect('/')
  }
}
