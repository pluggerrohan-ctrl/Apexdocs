/**
 * Dynamic SEO content factory for individual bank converter pages.
 * Produces unique, keyword-dense copy to maximise prominence and readability.
 *
 * @param {string} bankName  - Full bank name (e.g. "JPMorgan Chase Bank")
 * @param {string} country   - Country code (e.g. "USA")
 * @param {string} currency  - ISO currency code (e.g. "USD")
 * @returns {{ h1Title: string, metaTitle: string, introText: string, layoutSpecs: string, securitySpecs: string, faqs: Array<{question: string, answer: string}> }}
 */
export function getUniqueBankSEO(bankName, country, currency) {
  const token = `${bankName.toLowerCase()} bank statement to excel sheet converter`

  return {
    h1Title: `Convert ${bankName} Bank Statement to Excel Online`,
    metaTitle: `Convert ${bankName} PDF to Excel Online | ApexDoc`,
    introText: `Use our ${token}. This ${token} works. It parses your PDF locally. No file leaves your browser. Get clean rows in seconds. Try it free.`,
    layoutSpecs: `Our tool reads PDFs fast. Try the ${token}. It maps dates and balances. Each column stays neat. You get one clean sheet. Export ready for audit.`,
    securitySpecs: `Your data stays private. Run the ${token}. No uploads or servers. We store nothing. Your files stay safe. Trust the sandbox model.`,
    faqs: [
      {
        question: `How does the ${token} work?`,
        answer: `Upload your PDF. The tool parses it in your browser. It extracts dates, descriptions, and balances into rows. Download your Excel file in seconds.`,
      },
      {
        question: `Is the ${token} safe to use?`,
        answer: `Yes. All parsing runs locally in your browser sandbox. No file uploads occur. Your financial data stays private on your device at all times.`,
      },
      {
        question: `What columns does the ${token} output?`,
        answer: `You get Date, Description, Debit, Credit, and Balance columns. Each transaction becomes one row. The file is audit-ready and clean.`,
      },
    ],
  }
}
