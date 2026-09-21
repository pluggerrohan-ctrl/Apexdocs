import Script from 'next/script'
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
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-476R2P8M27"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-476R2P8M27');`}
        </Script>
      </body>
    </html>
  )
}
