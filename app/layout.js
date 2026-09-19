import '../index.css'

export const metadata = {
  metadataBase: new URL('https://apexwebdesign.online'),
  title: {
    default: 'ApexDoc | Bank Statement Converter',
    template: '%s | ApexDoc',
  },
  description: 'Convert bank statement PDFs into clean Excel spreadsheets in your browser.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>
}
