const entries = [
  ['chase-bank', 'Chase Bank', 'USA'], ['bank-of-america', 'Bank of America', 'USA'], ['wells-fargo', 'Wells Fargo', 'USA'], ['citibank', 'Citibank', 'USA'], ['capital-one', 'Capital One', 'USA'], ['pnc-bank', 'PNC Bank', 'USA'], ['regions-bank', 'Regions Bank', 'USA'], ['fifth-third-bank', 'Fifth Third Bank', 'USA'], ['huntington-national-bank', 'Huntington National Bank', 'USA'], ['keybank', 'KeyBank', 'USA'], ['navy-federal-credit-union', 'Navy Federal Credit Union', 'USA'], ['schoolsfirst-fcu', 'SchoolsFirst FCU', 'USA'], ['pentagon-federal-credit-union', 'Pentagon Federal Credit Union', 'USA'], ['alliant-credit-union', 'Alliant Credit Union', 'USA'], ['suncoast-credit-union', 'Suncoast Credit Union', 'USA'],
  ['barclays', 'Barclays', 'United Kingdom'], ['hsbc-uk', 'HSBC UK', 'United Kingdom'], ['lloyds-bank', 'Lloyds Bank', 'United Kingdom'], ['natwest', 'NatWest', 'United Kingdom'], ['standard-chartered', 'Standard Chartered', 'United Kingdom'], ['monzo', 'Monzo', 'United Kingdom'], ['starling-bank', 'Starling Bank', 'United Kingdom'], ['revolut', 'Revolut', 'United Kingdom'], ['nationwide-building-society', 'Nationwide Building Society', 'United Kingdom'], ['metro-bank', 'Metro Bank', 'United Kingdom'],
  ['first-abu-dhabi-bank', 'First Abu Dhabi Bank', 'UAE'], ['emirates-nbd', 'Emirates NBD', 'UAE'], ['abu-dhabi-commercial-bank', 'Abu Dhabi Commercial Bank', 'UAE'], ['mashreq-bank', 'Mashreq Bank', 'UAE'], ['dubai-islamic-bank', 'Dubai Islamic Bank', 'UAE'], ['abu-dhabi-islamic-bank', 'Abu Dhabi Islamic Bank', 'UAE'], ['rakbank', 'RAKBANK', 'UAE'], ['liv-by-emirates-nbd', 'Liv. by Emirates NBD', 'UAE'], ['mashreq-neo', 'Mashreq Neo', 'UAE'], ['yap-uae', 'YAP UAE', 'UAE'],
]
export const bankSlugs = entries.map(([slug]) => slug)
export function getBank(slug) {
  const match = entries.find(([value]) => value === slug)
  return match ? { slug: match[0], name: match[1], country: match[2] } : null
}
