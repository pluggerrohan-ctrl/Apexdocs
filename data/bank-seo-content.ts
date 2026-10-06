export type BankSeoContent = {
  h1Title: string
  metaTitle: string
  introText: string
  layoutSpecs: string
  securitySpecs: string
  faqs: Array<{ question: string; answer: string }>
}

export function getUniqueBankSEO(bankName: string, country: string, currency: string): BankSeoContent {
  const token = `${bankName.toLowerCase()} bank statement to excel sheet converter`
  return {
    h1Title: `Convert ${bankName} statements to Excel`,
    metaTitle: `${bankName} Statement PDF to Excel Converter | ApexDoc`,
    introText: `Use our ${token} for clean spreadsheet exports. This ${token} supports ${country} statements in ${currency}. Upload a text PDF. Review extracted rows. Download your workbook.`,
    layoutSpecs: `The ${token} places the upload action first. It shows rows before export.`,
    securitySpecs: `The ${token} protects files during processing. We limit access and remove temporary data.`,
    faqs: [
      { question: `How do I convert a ${bankName} statement?`, answer: `Upload your PDF. Check the preview. Download the Excel workbook.` },
      { question: `Which ${bankName} files work best?`, answer: `Text-based PDFs produce the clearest results. Scanned files may need review.` },
      { question: `What currency does this page support?`, answer: `This page describes ${currency} statements from ${country}.` },
    ],
  }
}

export default getUniqueBankSEO
