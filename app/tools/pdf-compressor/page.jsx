import PdfCompressor from '../../../components/pdf-compressor'

const compressorSchema = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ApexDoc PDF Compressor', applicationCategory: 'BusinessApplication', operatingSystem: 'Web Browser', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

export const metadata = {
  title: 'Free PDF Compressor | Compress PDFs Privately | ApexDoc',
  description: 'Compress PDF files locally in your browser. Your documents never leave your device.',
  alternates: { canonical: '/tools/pdf-compressor' },
}

export default function PdfCompressorPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compressorSchema) }} />
    <PdfCompressor />
  </>
}
