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

function getIntroParagraph(bank) {
  const info = getCountryInfo(bank.country)
  const displayName = getBankDisplayName(bank)
  const format = info.statementFormats[bank.slug.charCodeAt(0) % info.statementFormats.length]

  return `Convert your ${bank.name} statement PDF to Excel with ApexDoc. ${bank.name} is a ${bank.country === 'USA' ? 'US-based' : bank.country === 'UK' ? 'UK-based' : 'UAE-based'} bank, and its statements typically use the ${format}. Our converter extracts every transaction into a clean spreadsheet with Date, Description, Debit, Credit, and Balance columns — all processed privately in your browser with no file uploads.`
}

function getHowToSteps(bank) {
  return STEPS.map((step) => ({
    title: step.title,
    body: step.body,
  }))
}

function getFAQs(bank) {
  return FAQ_TEMPLATES.map((faq) => ({
    question: faq.question.replace(/\{bank\}/g, getBankDisplayName(bank)),
    answer: faq.answer.replace(/\{bank\}/g, getBankDisplayName(bank)),
  }))
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
      { '@type': 'ListItem', position: 2, name: 'All Banks', item: 'https://apexwebdesign.online/all-banks' },
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
