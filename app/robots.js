const siteUrl = 'https://apexwebdesign.online'

export default function robots() {
  return {
    rules: [
      { userAgent: 'Googlebot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Bingbot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
