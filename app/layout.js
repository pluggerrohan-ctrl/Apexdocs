import '../index.css'

export const metadata = {
  title: 'ApexDoc | Bank Statement Converter',
  description: 'Convert bank statement PDFs into clean Excel spreadsheets in your browser.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>
}
