import banks from '../data/banks.json'

export const bankSlugs = banks.map(({ slug }) => slug)

export function getBank(slug) {
  return banks.find((bank) => bank.slug === slug) ?? null
}
