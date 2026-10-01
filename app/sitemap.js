import banks from '../data/banks.json'

const siteUrl = 'https://apexwebdesign.online'
const now = new Date()

export default function sitemap() {
  const staticRoutes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/pdfconverter', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/allbanks', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/blog/nanonets-vs-apexdoc-comparison-guide', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/banks/country/usa', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/banks/country/uk', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/banks/country/uae', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/payment/success', priority: 0.3, changeFrequency: 'monthly' },
  ]

  const staticEntries = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const bankEntries = banks
    .filter((bank) => bank.slug)
    .map((bank) => ({
      url: `${siteUrl}/banks/${bank.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  return [...staticEntries, ...bankEntries]
}
