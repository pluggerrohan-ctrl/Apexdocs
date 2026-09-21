import { bankSlugs } from '../lib/banks'

const siteUrl = 'https://apexwebdesign.online'

export default function sitemap() {
  const routes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/pdfconverter', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/all-banks', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/payment/success', priority: 0.3, changeFrequency: 'monthly' },
  ]

  const liveDate = new Date()
  const bankRoutes = bankSlugs.map((slug) => ({
    url: `${siteUrl}/banks/${slug}`,
    lastModified: liveDate,
    changeFrequency: 'daily',
    priority: 1.0,
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
