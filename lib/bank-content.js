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

const CONTENT_VARIANTS = [
  {
    angle: 'reconciliation',
    intro: 'For reconciliation work, the useful detail is not just the total balance but the sequence of posted entries. Export the statement to a spreadsheet, then compare each row with your ledger before closing the period.',
    section: 'Reconciliation notes',
    body: 'Use the converted sheet to filter the statement period, match deposits and withdrawals, and isolate entries that need a receipt or explanation. Keep the source PDF beside the workbook when preparing an audit trail.',
    faq: 'Which fields should I check during reconciliation?',
    answer: 'Compare the statement period, posting dates, descriptions, debit or credit direction, and closing balance. If a line looks unusual, verify it against the original PDF rather than relying on the extracted cell alone.',
  },
  {
    angle: 'bookkeeping',
    intro: 'A spreadsheet is helpful when a statement has to be sorted, tagged, or handed to a bookkeeper. This page is set up for turning a readable statement from this institution into rows that are easier to review.',
    section: 'Bookkeeping workflow',
    body: 'After conversion, add your own category or notes columns instead of changing the extracted values. Sorting by date and filtering the description column can make recurring costs and incoming payments easier to review.',
    faq: 'Can I add accounting categories after conversion?',
    answer: 'Yes. The downloaded XLSX contains editable transaction rows. Add category, project, or review columns after checking the extracted data against the PDF.',
  },
  {
    angle: 'document-review',
    intro: 'Statement PDFs are designed for reading, while Excel is better for searching and comparison. Converting this bank\'s document gives you a practical way to inspect transaction descriptions and balances without retyping every line.',
    section: 'What to review in the document',
    body: 'Start with the account period and opening balance, then check whether the final balance agrees with the statement. Pay attention to wrapped descriptions, dates near page breaks, and entries printed in more than one currency.',
    faq: 'What should I verify after the PDF is converted?',
    answer: 'Verify the first and last transaction, the number of rows around page breaks, debit and credit signs, and the closing balance. OCR output from scanned pages deserves an especially careful visual check.',
  },
  {
    angle: 'expense-analysis',
    intro: 'When the goal is to understand spending, a searchable worksheet is more useful than a static statement. Convert the PDF, then use Excel filters to group descriptions, dates, and outgoing amounts.',
    section: 'Using the worksheet for analysis',
    body: 'Create a copy of the downloaded sheet before adding formulas. You can group recurring descriptions, review large debits, and compare monthly periods while preserving the original extracted transaction columns.',
    faq: 'Is the converted file suitable for financial analysis?',
    answer: 'It is a starting point for analysis, not a replacement for the original statement. Check the extracted rows first, then add formulas or categories to the XLSX copy for your own review.',
  },
]

const STEP_VARIANTS = [
  ['Find the statement document', 'Open the bank portal or app and locate the statement period you need. Download the original PDF rather than a screenshot so text and page structure have the best chance of being read.', 'Upload and inspect the rows', 'Drop the PDF into ApexDoc. Once extraction finishes, use the on-page preview to scan dates, descriptions, amounts, and balances before downloading.', 'Save the spreadsheet', 'Download the XLSX and retain the original PDF with it. The spreadsheet is ready for your own sorting, reconciliation, or bookkeeping notes.'],
  ['Choose the correct period', 'Check the account name, statement dates, and currency before downloading from your bank. Selecting the right period first helps avoid mixing two reporting periods.', 'Convert privately in the browser', 'Upload the PDF through the converter. Browser-first processing keeps the document on your device during the normal extraction path.', 'Check totals before using the file', 'Compare the opening and closing figures with the source statement, then download the Excel workbook when the rows look correct.'],
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

function getVariant(bank) {
  const seed = [...bank.slug].reduce((total, character, index) => total + character.charCodeAt(0) * (index + 1), 0)
  return CONTENT_VARIANTS[seed % CONTENT_VARIANTS.length]
}

function getUniqueProfile(bank) {
  const words = bank.name.replace(/[^a-zA-Z0-9 ]/g, '').split(/\s+/).filter(Boolean)
  const seed = [...bank.slug].reduce((total, character, index) => total + character.charCodeAt(0) * (index + 3), 0)
  const focusAreas = ['monthly reconciliation', 'income verification', 'expense review', 'tax preparation', 'cash-flow tracking', 'audit preparation', 'vendor payment review', 'accounting handoff']
  const checks = ['opening and closing balances', 'posting dates and page breaks', 'debit and credit columns', 'recurring descriptions', 'currency labels and totals', 'transaction references', 'statement period and account name', 'OCR rows against the PDF']
  const formats = ['a ledger-ready worksheet', 'a searchable transaction table', 'a review copy for your accounts', 'a clean workbook for sorting', 'a practical reconciliation sheet', 'an editable finance workbook']
  return {
    focus: focusAreas[seed % focusAreas.length],
    check: checks[(seed + words.length) % checks.length],
    format: formats[(seed + bank.country.length) % formats.length],
    signature: `${words.slice(0, 3).join(' ')} · ${bank.country} · ${seed % 997}`,
  }
}

function getIntroParagraph(bank) {
  const info = getCountryInfo(bank.country)
  const displayName = getBankDisplayName(bank)
  const variant = getVariant(bank)
  const profile = getUniqueProfile(bank)
  const format = info.statementFormats[bank.slug.charCodeAt(0) % info.statementFormats.length]
  const market = bank.country === 'USA' ? 'the United States' : bank.country === 'UK' ? 'the United Kingdom' : bank.country

  return `${displayName} customers in ${market} may receive statements in a ${format}. This page is useful when your immediate goal is ${profile.focus}: ${variant.intro} For this document, use the converter preview to create ${profile.format}, then compare ${profile.check} with the source PDF. ApexDoc extracts visible transaction rows into Date, Description, Debit, Credit, and Balance columns while processing the file in your browser. Reference: ${profile.signature}.`
}

function getHowToSteps(bank) {
  const steps = STEP_VARIANTS[bank.slug.length % STEP_VARIANTS.length]
  const profile = getUniqueProfile(bank)
  return [0, 1, 2].map((index) => ({
    title: steps[index * 2],
    body: `${steps[index * 2 + 1]} ${index === 1 ? `For this ${bank.country} statement, pay particular attention to ${profile.check}.` : ''}`.trim(),
  }))
}

function getFAQs(bank) {
  const info = getCountryInfo(bank.country)
  const displayName = getBankDisplayName(bank)
  const variant = getVariant(bank)
  const profile = getUniqueProfile(bank)
  const questions = [
    { question: `How can I turn a ${displayName} PDF statement into Excel for ${profile.focus}?`, answer: `Upload the original ${displayName} statement, inspect the preview for ${profile.check}, then download the XLSX after checking the extracted rows.` },
    { question: `Does the converter keep my ${displayName} document private?`, answer: 'The normal browser conversion path processes the document locally. Keep the original PDF private and review the preview before saving the spreadsheet.' },
    { question: variant.faq, answer: variant.answer },
    { question: `Will a scanned ${displayName} statement convert perfectly?`, answer: 'Scanned PDFs may require OCR and can contain recognition errors. Compare dates, amounts, and balances with the source document before using the workbook.' },
    { question: `What currency may appear on a ${displayName} statement?`, answer: `${info.currency} is the country-level currency reference used on this page, but the actual statement may contain another currency or multiple currencies. Confirm the currency printed on your document.` },
  ]
  return questions
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
  const variant = getVariant(bank)
  return {
    intro: getIntroParagraph(bank),
    uniqueSection: {
      heading: variant.section,
      body: variant.body,
    },
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
