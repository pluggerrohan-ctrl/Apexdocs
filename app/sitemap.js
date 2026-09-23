import { bankSlugs } from '../lib/banks'
import banks from '../data/banks.json'

const siteUrl = 'https://apexwebdesign.online'

export default function sitemap() {
  const routes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/pdfconverter', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/all-banks', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/banks/country/usa', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/banks/country/uk', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/banks/country/uae', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/payment/success', priority: 0.3, changeFrequency: 'monthly' },
  ]

  const bankRoutes = banks.map((bank) => ({
    url: `${siteUrl}/banks/${bank.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    ...routes.map(({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...bankRoutes,
  ]
}
