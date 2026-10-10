import banks from '../data/banks.json'

const COUNTRY_INFO = {
  USA: {
    currency: 'USD',
    currencySymbol: '$',
    statementFormats: ['standard US format with transaction dates, descriptions, and running balances', 'monthly statement format with debit and credit columns', 'online banking export format with posted dates and transaction types'],
    commonBanks: ['Chase', 'Bank of America', 'Wells Fargo', 'Citibank'],
    regulatoryBody: 'FDIC',
    pdfExportTip: 'Most US banks let you download statements as PDF from their online banking portal or mobile app.',
    faqSpecific: 'US bank statements typically show transaction dates, posted dates, descriptions, amounts, and running balances. Our converter extracts all of these into separate Excel columns.',
  },
  UK: {
    currency: 'GBP',
    currencySymbol: '£',
    statementFormats: ['standard UK format with sort codes and account numbers', 'monthly statement with paid-out and paid-in columns', 'online banking PDF export with balance carried forward'],
    commonBanks: ['Barclays', 'HSBC', 'Lloyds', 'NatWest'],
    regulatoryBody: 'FCA',
    pdfExportTip: 'UK bank statements are usually available as PDF downloads from your bank\'s online banking or mobile app.',
    faqSpecific: 'UK bank statements typically show transaction dates, descriptions, paid-out amounts, paid-in amounts, and running balances. Our converter maps these to Debit, Credit, and Balance columns.',
  },
  UAE: {
    currency: 'AED',
    currencySymbol: 'AED',
    statementFormats: ['standard UAE format with bilingual Arabic and English text', 'monthly statement with debit and credit columns in AED', 'online banking export with transaction dates and reference numbers'],
    commonBanks: ['Emirates NBD', 'ADCB', 'FAB', 'HSBC UAE'],
    regulatoryBody: 'Central Bank of the UAE',
    pdfExportTip: 'UAE bank statements are available as PDF from your bank\'s online banking portal. Some banks offer both Arabic and English versions.',
    faqSpecific: 'UAE bank statements may include bilingual text (Arabic and English). Our converter focuses on the English transaction rows and extracts dates, descriptions, amounts, and balances.',
  },
}

const STEPS = [
  {
    title: 'Download your statement as PDF',
    body: 'Log in to your bank\'s online banking portal or mobile app and export your statement as a PDF file. Most banks offer this option under statements or documents.',
  },
  {
    title: 'Upload the PDF to ApexDoc',
    body: 'Drag and drop your PDF file onto the upload area above, or click "Choose PDF" to select it. The file is processed entirely in your browser — it never gets uploaded to any server.',
  },
  {
    title: 'Review the extracted transactions',
    body: 'ApexDoc automatically extracts transaction dates, descriptions, debit amounts, credit amounts, and running balances from your statement. The preview shows exactly what will be in your Excel file.',
  },
  {
    title: 'Download your Excel file',
    body: 'Click the download button to save your converted spreadsheet. You get a clean XLSX file with one row per transaction, ready for accounting, auditing, or further analysis.',
  },
]

const FAQ_TEMPLATES = [
  {
    question: 'How do I convert my {bank} statement to Excel?',
    answer: 'Upload your {bank} PDF statement using the upload area above. ApexDoc processes it in your browser and gives you a downloadable Excel file with all transactions extracted into rows.',
  },
  {
    question: 'Is it safe to convert my {bank} statement online?',
    answer: 'Yes. Your {bank} statement never leaves your device. All processing happens locally in your browser — no file is uploaded to any server. Your financial data stays private.',
  },
  {
    question: 'What format does the Excel file use?',
    answer: 'The output is a standard .xlsx file with columns for Date, Description, Debit, Credit, and Balance. Each transaction from your {bank} statement becomes one row in the spreadsheet.',
  },
  {
    question: 'Does ApexDoc work with scanned {bank} statements?',
    answer: 'Text-based PDFs work best. If your {bank} statement is a scanned image PDF, ApexDoc can attempt OCR extraction, but results may be less accurate. Always compare the output with your original statement.',
  },
  {
    question: 'How many {bank} statements can I convert?',
    answer: 'You get 3 free conversions to start. For more, you can buy credits — 50 conversions for $10 or 250 conversions for $39. Each credit lets you convert one PDF statement.',
  },
]

function getCountryInfo(country) {
  return COUNTRY_INFO[country] || COUNTRY_INFO.USA
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getBankDisplayName(bank) {
  return bank.name.replace(/\s+(Bank|Plc|P\.J\.S\.C\.|Limited|Ltd|Group|Inc|Corporation|Corp|NA|N\.A\.)$/i, '').trim() || bank.name
}

const INTRO_ANGLES = [
  'Use this page when your bookkeeping starts with a downloaded statement.',
  'This workflow suits monthly reviews, tax preparation, and account reconciliation.',
  'It helps turn a familiar banking export into a practical spreadsheet.',
  'The layout is designed for quick checks before financial reporting.',
  'It gives finance teams a simpler path from PDF records to rows.',
]

function getIntroParagraph(bank) {
  const info = getCountryInfo(bank.country)
  const displayName = getBankDisplayName(bank)
  const format = info.statementFormats[getBankSeed(bank) % info.statementFormats.length]
  const angle = INTRO_ANGLES[getBankSeed(bank) % INTRO_ANGLES.length]
  const scope = bank.country === 'USA' ? 'US-based' : bank.country === 'UK' ? 'UK-based' : 'UAE-based'

  return `Convert your ${bank.name} statement PDF to Excel with ApexDoc. ${angle} ${bank.name} is a ${scope} bank. Its PDFs commonly use the ${format}. ApexDoc maps transactions into Date, Description, Debit, Credit, and Balance columns. Browser-first processing keeps the original file on your device.`
}

function getBankSeed(bank) {
  return [...bank.slug].reduce((total, character) => total + character.charCodeAt(0), 0)
}

const STEP_VARIANTS = [
  ['Export the source PDF', 'Open online banking, choose the statement period, and save the official PDF to your device.'],
  ['Load the statement locally', 'Select the downloaded file in ApexDoc. The browser reads the document without sending it to a remote server.'],
  ['Check the transaction preview', 'Review the detected dates, descriptions, money in, money out, and balance values before exporting.'],
  ['Save the workbook', 'Download the generated XLSX file and continue with reconciliation, bookkeeping, or financial review.'],
]

const STEP_VARIANT_GROUPS = [
  STEP_VARIANTS,
  STEP_VARIANTS.map(([title, body]) => [title.replace('source PDF', 'bank PDF'), body.replace('official PDF', 'original statement PDF')]),
  STEP_VARIANTS.map(([title, body]) => [title.replace('locally', 'in your browser'), body.replace('remote server', 'cloud service')]),
]

function getHowToSteps(bank) {
  const group = STEP_VARIANT_GROUPS[getBankSeed(bank) % STEP_VARIANT_GROUPS.length]
  return group.map(([title, body], index) => ({
    title: index === 0 ? `${title} for ${getBankDisplayName(bank)}` : title,
    body: `${body} ${index === 0 ? `For ${getBankDisplayName(bank)} customers, keep the statement date range visible.` : `This keeps the ${getBankDisplayName(bank)} workflow easy to audit.`}`,
  }))
}

const FAQ_VARIANTS = [
  ['Which ${bank} PDF works best?', 'A native ${bank} PDF with selectable text gives the clearest result. Download the statement directly from online banking when possible.'],
  ['Can I check ${bank} rows before Excel export?', 'Yes. ApexDoc shows extracted rows before download, so you can compare totals with the original ${bank} statement.'],
  ['Which columns will ${bank} data use?', 'The workbook separates dates, descriptions, debits, credits, and balances. It keeps ${bank} transactions ready for sorting and review.'],
  ['Does this support an image-based ${bank} PDF?', 'Text PDFs are more reliable. Image-only documents may need OCR, so compare every ${bank} row before using the workbook.'],
  ['Can I convert several ${bank} periods?', 'The free allowance covers three conversions. Paid credits support additional statement periods when your ${bank} records need wider coverage.'],
]

function getFAQs(bank) {
  const displayName = getBankDisplayName(bank)
  const offset = getBankSeed(bank) % FAQ_VARIANTS.length
  return FAQ_VARIANTS.map((faq, index) => {
    const variant = FAQ_VARIANTS[(index + offset) % FAQ_VARIANTS.length]
    return {
      question: variant[0].replace(/\$\{bank\}/g, displayName),
      answer: variant[1].replace(/\$\{bank\}/g, displayName),
    }
  })
}

function getInfoBox(bank) {
  const info = getCountryInfo(bank.country)
  return {
    bank: bank.name,
    country: bank.country,
    currency: info.currency,
    currencySymbol: info.currencySymbol,
    regulatoryBody: info.regulatoryBody,
    pdfExportTip: info.pdfExportTip,
    statementFormat: info.statementFormats[bank.slug.charCodeAt(0) % info.statementFormats.length],
  }
}

function getStructuredData(bank) {
  const info = getCountryInfo(bank.country)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${bank.name} Statement PDF to Excel Converter`,
    description: `Convert ${bank.name} PDF bank statements to Excel spreadsheets. Private, browser-first processing with no file uploads.`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any (web-based)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: info.currency,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ApexDoc',
    },
  }
}

function getBreadcrumbData(bank) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://apexwebdesign.online/' },
      { '@type': 'ListItem', position: 2, name: 'All Banks', item: 'https://apexwebdesign.online/allbanks' },
      { '@type': 'ListItem', position: 3, name: bank.country, item: `https://apexwebdesign.online/banks/country/${bank.country.toLowerCase()}` },
      { '@type': 'ListItem', position: 4, name: bank.name, item: `https://apexwebdesign.online/banks/${bank.slug}` },
    ],
  }
}

export function getBankContent(bank) {
  return {
    intro: getIntroParagraph(bank),
    steps: getHowToSteps(bank),
    faqs: getFAQs(bank),
    infoBox: getInfoBox(bank),
    structuredData: getStructuredData(bank),
    breadcrumbData: getBreadcrumbData(bank),
    displayName: getBankDisplayName(bank),
  }
}

export function getCountryContent(country) {
  const info = COUNTRY_INFO[country]
  if (!info) return null
  const countryBanks = banks.filter((b) => b.country === country)
  return {
    country,
    currency: info.currency,
    currencySymbol: info.currencySymbol,
    regulatoryBody: info.regulatoryBody,
    bankCount: countryBanks.length,
    banks: countryBanks,
  }
}

export { COUNTRY_INFO }
