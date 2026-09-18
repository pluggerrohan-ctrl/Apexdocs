import { bankSlugs } from '../lib/banks'

const siteUrl = 'https://apexwebdesign.online'

export default function sitemap() {
  const routes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/pdfconverter', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/payment/success', priority: 0.3, changeFrequency: 'monthly' },
  ]

  const bankRoutes = bankSlugs.map((slug) => ({
    url: `${siteUrl}/banks/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
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
