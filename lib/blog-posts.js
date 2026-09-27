const posts = [
  {
    slug: 'convert-bank-statement-pdf-to-excel',
    title: 'How to Convert a Bank Statement PDF to Excel',
    description: 'A practical guide to turning a bank statement PDF into a clean, reviewable Excel spreadsheet.',
    category: 'PDF conversion',
    publishedAt: '2026-09-26',
    readTime: '5 min read',
    intro: 'Bank statements are useful for bookkeeping, expense reviews, loan applications, and audits, but PDF tables are difficult to sort. This guide explains a simple way to convert a statement PDF into Excel while keeping the original document available for checking.',
    sections: [
      { heading: 'Why convert a bank statement to Excel?', paragraphs: ['Excel makes it easier to filter transactions, group spending, reconcile balances, and share selected rows with an accountant. A spreadsheet also gives you a consistent place to review dates, descriptions, debits, credits, and balances.'] },
      { heading: 'A simple conversion workflow', paragraphs: ['Download the statement from your bank as a PDF, open ApexDoc, and choose the file from your device. The browser-first converter extracts readable transaction rows and prepares an XLSX download. Keep the original PDF so you can compare totals before using the spreadsheet for financial decisions.'] },
      { heading: 'What to check after conversion', paragraphs: ['Review the opening and closing balances, transaction dates, negative amounts, and any wrapped descriptions. Scanned or image-only PDFs may need OCR and can require extra review. If a row looks unusual, compare it directly with the source statement.'] },
    ],
  },
  {
    slug: 'extract-transactions-from-bank-pdf',
    title: 'How to Extract Transactions from a Bank PDF',
    description: 'Learn what makes bank PDF extraction accurate and how to review transaction data before exporting it.',
    category: 'Bank statements',
    publishedAt: '2026-09-26',
    readTime: '4 min read',
    intro: 'Extracting transactions from a bank PDF is easiest when the file contains selectable text and a consistent table layout. A careful workflow helps you save time without losing confidence in the numbers.',
    sections: [
      { heading: 'Use the original bank download', paragraphs: ['Whenever possible, use the PDF downloaded from online banking instead of a screenshot. Original PDFs usually contain clearer text, statement dates, and table structure, which improves extraction quality.'] },
      { heading: 'Separate the review from the export', paragraphs: ['First inspect the extracted rows. Then download the Excel file. Check a few transactions from the beginning, middle, and end of the statement, including both credits and debits.'] },
      { heading: 'Protect financial information', paragraphs: ['Choose tools that clearly explain how files are handled. ApexDoc is designed for browser-first processing, so users can convert a statement without treating a private financial document as a general public upload.'] },
    ],
  },
  {
    slug: 'bank-statement-excel-for-bookkeeping',
    title: 'Using Bank Statement Excel Files for Bookkeeping',
    description: 'Organize converted bank statement transactions for monthly bookkeeping and reconciliation.',
    category: 'Bookkeeping',
    publishedAt: '2026-09-26',
    readTime: '4 min read',
    intro: 'A well-structured bank statement spreadsheet can make monthly bookkeeping faster. The key is to preserve the source data, use consistent columns, and reconcile the final balance before categorizing expenses.',
    sections: [
      { heading: 'Keep one source-of-truth file', paragraphs: ['Save the converted workbook with the statement period in its filename. Avoid overwriting the original export, and keep a copy of the bank PDF alongside it for audit and reconciliation checks.'] },
      { heading: 'Use consistent transaction columns', paragraphs: ['Date, description, debit, credit, and balance are useful core fields. Add bookkeeping categories in separate columns so the extracted values remain unchanged and can be reviewed later.'] },
      { heading: 'Reconcile before reporting', paragraphs: ['Compare the spreadsheet closing balance with the statement. Investigate missing pages, duplicate rows, unclear signs, or OCR mistakes before preparing reports or sharing the workbook.'] },
    ],
  },
];

export function getBlogPosts() { return posts; }
export function getBlogPost(slug) { return posts.find((post) => post.slug === slug); }
export const blogSlugs = posts.map((post) => post.slug);
export default posts;

export function BlogJsonLd({ post }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: { '@type': 'Organization', name: 'ApexDoc' },
      publisher: { '@type': 'Organization', name: 'ApexDoc' },
      mainEntityOfPage: `https://apexwebdesign.online/blog/${post.slug}`,
    }) }} />
  );
}

export function BlogStyles() {
  return <style>{`.blog-shell{min-height:100vh;background:linear-gradient(180deg,#f5f8fd 0%,#fff 42%);padding:64px 20px 88px}.blog-wrap{max-width:980px;margin:0 auto}.blog-eyebrow{color:#1769d5;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.blog-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(38px,7vw,68px);letter-spacing:-.055em;line-height:1.03;margin:14px 0 18px;color:#101827}.blog-lead{max-width:680px;color:#687386;font-size:18px;line-height:1.65;margin:0 0 44px}.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.blog-card{background:#fff;border:1px solid #e3e8f0;border-radius:18px;padding:24px;display:flex;flex-direction:column;min-height:270px;box-shadow:0 12px 30px rgba(16,24,39,.05)}.blog-card h2{font-family:'Space Grotesk',sans-serif;font-size:22px;line-height:1.16;margin:12px 0;color:#101827}.blog-card p{color:#687386;line-height:1.6;font-size:14px}.blog-card a{color:#1769d5;font-weight:700;text-decoration:none;margin-top:auto}.article{max-width:760px}.article h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(38px,6vw,64px);line-height:1.04;letter-spacing:-.05em;margin:14px 0 18px}.article-meta{color:#687386;font-size:14px;margin-bottom:34px}.article-intro{font-size:20px;line-height:1.7;color:#374151;border-left:3px solid #1769d5;padding-left:20px;margin-bottom:42px}.article section{margin:0 0 32px}.article h2{font-family:'Space Grotesk',sans-serif;font-size:28px;margin:0 0 10px}.article p{font-size:17px;line-height:1.75;color:#374151;margin:0 0 12px}.blog-back{display:inline-block;color:#1769d5;text-decoration:none;font-size:14px;font-weight:700;margin-bottom:28px}@media(max-width:780px){.blog-grid{grid-template-columns:1fr}.blog-shell{padding-top:40px}}`}</style>;
}
