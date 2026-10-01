import banks from '../data/banks.json'

const siteUrl = 'https://apexwebdesign.online'

// Injected fresh on every sitemap regeneration so Google sees an up-to-date
// <lastmod> timestamp for every URL.
const lastModified = () => new Date().toISOString()

export default function sitemap() {
  // Homepage and core tools get the maximum priority (1.0).
  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' },
    { path: '/pdfconverter', priority: 1.0, changeFrequency: 'daily' },
    { path: '/allbanks', priority: 1.0, changeFrequency: 'daily' },
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' },
    { path: '/banks/country/usa', priority: 0.8, changeFrequency: 'daily' },
    { path: '/banks/country/uk', priority: 0.8, changeFrequency: 'daily' },
    { path: '/banks/country/uae', priority: 0.8, changeFrequency: 'daily' },
    { path: '/payment/success', priority: 0.3, changeFrequency: 'monthly' },
  ]

  // Programmatic bank converter directories — dynamic bank pages.
  const bankRoutes = banks.map((bank) => ({
    url: `${siteUrl}/banks/${bank.slug}`,
    lastModified: lastModified(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [
    ...routes.map(({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}${path}`,
      lastModified: lastModified(),
      changeFrequency,
      priority,
    })),
    ...bankRoutes,
  ]
}
