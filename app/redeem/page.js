import RedeemApp from './redeem-app'

export const metadata = {
  title: 'Redeem Your AppSumo Code',
  description: 'Redeem your AppSumo code to activate 3 free bank statement-to-Excel conversions on ApexDoc.',
  robots: { index: true, follow: true },
}

export default function RedeemPage() {
  return <RedeemApp />
}
