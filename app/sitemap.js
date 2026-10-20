import { bankSlugs } from '../lib/banks'
import banks from '../data/banks.json'
import { keywordPages } from '../data/keyword-pages'
import { agencyKeywordPages } from '../data/agency-keywords'

const siteUrl = 'https://apexwebdesign.online'
const lastModified = '2026-10-20'

export default function sitemap() {
  const routes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/pdfconverter', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/allbanks', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/sectors/law-firm', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/sectors/healthcare', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/sectors/hotels', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/shopify', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/blog/nanonets-vs-apexdoc-comparison-guide', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/ultimate-guide-bank-statement-to-excel', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/banks/country/usa', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/banks/country/uk', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/banks/country/uae', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/payment/success', priority: 0.3, changeFrequency: 'monthly' },
    { path: '/tools/pdf-compressor', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/terms-of-use', priority: 0.4, changeFrequency: 'yearly' },
  ]

  const bankRoutes = banks.map((bank) => ({
    url: `${siteUrl}/banks/${bank.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))
  const serviceNiches = ['dentists', 'gyms', 'real-estate', 'jewelry', 'shopify']
  const serviceCities = ['jabalpur', 'bareilly', 'bilaspur', 'muzaffarpur', 'alpharetta', 'wilmington', 'tullahoma', 'eastleigh']
  const serviceRoutes = serviceNiches.flatMap((niche) => serviceCities.map((city) => ({
    url: `${siteUrl}/services/${niche}/${city}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  })))
  const keywordRoutes = keywordPages.map((page) => ({
    url: `${siteUrl}/convert/${page.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  const agencyKeywordRoutes = agencyKeywordPages.map((page) => ({
    url: `${siteUrl}/services/keyword/${page.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    ...routes.map(({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...bankRoutes,
    ...keywordRoutes,
    ...agencyKeywordRoutes,
    ...serviceRoutes,
  ]
}
