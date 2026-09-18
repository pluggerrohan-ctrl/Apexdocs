import Link from 'next/link'

export const metadata = {
  title: 'Payment successful | ApexDoc',
  description: 'Your ApexDoc license activation details.',
}

export default async function PaymentSuccessPage({ searchParams }) {
  const params = await searchParams
  const licenseKey = typeof params?.license_key === 'string' ? params.license_key : ''
  const email = typeof params?.email === 'string' ? params.email : ''
  const paymentId = typeof params?.payment_id === 'string' ? params.payment_id : ''

  return (
    <main className="payment-success-page">
      <section className="payment-success-card" aria-labelledby="payment-success-title">
        <p className="eyebrow">PAYMENT CONFIRMED</p>
        <h1 id="payment-success-title">Your ApexDoc credits are ready.</h1>
        <p>
          Your payment was received. Save the license key below and use it in the converter&apos;s
          Restore Balance section to activate your credits on any browser.
        </p>
        <div className="license-box">
          <span>License Key</span>
          <strong>{licenseKey || 'Your license key will arrive by email.'}</strong>
        </div>
        {email ? <p className="activation-note">Activation details were sent to {email}.</p> : null}
        {paymentId ? <p className="payment-reference">Payment reference: {paymentId}</p> : null}
        <p className="activation-message">
          Thank you for choosing ApexDoc. Your license unlocks private PDF-to-Excel conversions.
          Files are processed locally in your browser and are not stored on our servers. If you
          experience a parsing glitch, contact namanbilthariya@gmail.com for an instant full refund.
        </p>
        <Link className="payment-success-link" href="/pdfconverter">Open PDF Converter</Link>
      </section>
    </main>
  )
}
