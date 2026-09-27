export const blogPosts = [
  {
    slug: 'convert-bank-statement-pdf-to-excel',
    title: 'How to Convert a Bank Statement PDF to Excel',
    description: 'A practical guide to turning a bank statement PDF into a clean Excel spreadsheet for accounting, bookkeeping, and review.',
    date: '2026-09-27',
    readTime: '5 min read',
    keywords: ['bank statement PDF to Excel', 'convert PDF to XLSX', 'bank transaction spreadsheet'],
    sections: [
      { heading: 'Why convert a bank statement to Excel?', body: 'Excel makes it easier to sort transactions, reconcile balances, categorize spending, and share records with an accountant. A structured spreadsheet is also more useful than a static PDF when you need to filter dates, descriptions, debits, credits, or balances.' },
      { heading: 'Download the original PDF first', body: 'Use your bank\'s official online banking portal or mobile app to download the statement. Keep the original file unchanged so you can compare the spreadsheet with the source after conversion.' },
      { heading: 'Convert the PDF and review the rows', body: 'Upload the statement to ApexDoc, review the extracted transaction rows, and check the opening balance, closing balance, dates, and amounts. Text-based PDFs usually produce the clearest results; scanned documents may need extra review.' },
      { heading: 'Keep financial data private', body: 'ApexDoc is designed for browser-first processing. Avoid sharing statements publicly, and always verify the downloaded workbook before using it for tax, lending, or accounting decisions.' },
    ],
  },
  {
    slug: 'pdf-bank-statement-data-extraction-guide',
    title: 'Bank Statement Data Extraction: Dates, Debits, Credits, and Balances',
    description: 'Learn which fields matter when extracting transaction data from a bank statement PDF and how to validate the result.',
    date: '2026-09-27',
    readTime: '4 min read',
    keywords: ['bank statement data extraction', 'PDF transaction extraction', 'debit credit balance columns'],
    sections: [
      { heading: 'The core transaction fields', body: 'A useful bank statement spreadsheet normally includes the transaction date, description, debit, credit, and running balance. Some statements also include a posted date, reference number, value date, or transaction type.' },
      { heading: 'Debit and credit checks', body: 'Do not assume every bank uses the same sign convention. Confirm whether money leaving the account appears in a debit column, a negative amount, or both. Compare several rows against the original statement.' },
      { heading: 'Balance reconciliation', body: 'Use the opening balance and closing balance as checkpoints. When possible, verify that each transaction changes the running balance correctly. This catches shifted columns, missing rows, and OCR mistakes.' },
      { heading: 'When a PDF needs extra review', body: 'Image-only scans, unusual tables, multi-column layouts, and bilingual statements can require manual checking. Treat automated extraction as a starting point and retain the original PDF for auditability.' },
    ],
  },
]

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPostingSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'ApexDoc' },
    publisher: { '@type': 'Organization', name: 'ApexDoc' },
    mainEntityOfPage: `https://apexwebdesign.online/blog/${post.slug}`,
  }
}

export function getBlogBreadcrumbSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://apexwebdesign.online/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://apexwebdesign.online/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://apexwebdesign.online/blog/${post.slug}` },
    ],
  }
}

export function getBlogIndexSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ApexDoc Bank Statement Conversion Guides',
    description: 'Practical guides for converting bank statement PDFs to Excel and validating extracted transaction data.',
    url: 'https://apexwebdesign.online/blog',
  }
}
