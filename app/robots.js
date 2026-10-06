const siteUrl = 'https://apexwebdesign.online'

export default function robots() {
  return {
    rules: [
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
