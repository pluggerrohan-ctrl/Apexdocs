import Link from 'next/link'

const SERVICE_DIRECTORY = {
  niches: ['dentists', 'gyms', 'real-estate', 'jewelry', 'shopify'],
  cities: ['jabalpur', 'bareilly', 'bilaspur', 'muzaffarpur', 'alpharetta', 'wilmington', 'tullahoma', 'eastleigh'],
  citiesByRegion: {
    india: ['jabalpur', 'bareilly', 'bilaspur', 'muzaffarpur'],
    international: ['alpharetta', 'wilmington', 'tullahoma', 'eastleigh'],
  },
  cityProfiles: {
    jabalpur: { name: 'Jabalpur', region: 'India', currency: 'INR', symbol: '₹', startingPrice: '14,999' },
    bareilly: { name: 'Bareilly', region: 'India', currency: 'INR', symbol: '₹', startingPrice: '14,999' },
    bilaspur: { name: 'Bilaspur', region: 'India', currency: 'INR', symbol: '₹', startingPrice: '14,999' },
    muzaffarpur: { name: 'Muzaffarpur', region: 'India', currency: 'INR', symbol: '₹', startingPrice: '14,999' },
    alpharetta: { name: 'Alpharetta', region: 'United States', currency: 'USD', symbol: '$', startingPrice: '799' },
    wilmington: { name: 'Wilmington', region: 'United States', currency: 'USD', symbol: '$', startingPrice: '799' },
    tullahoma: { name: 'Tullahoma', region: 'United States', currency: 'USD', symbol: '$', startingPrice: '799' },
    eastleigh: { name: 'Eastleigh', region: 'United Kingdom', currency: 'GBP', symbol: '£', startingPrice: '799' },
  },
  nicheProfiles: {
    dentists: {
      label: 'Dentists',
      eyebrow: 'Healthcare web development',
      promise: 'Build patient trust before the first appointment.',
      description: 'A calm, credible digital experience for dental practices that need more qualified patient enquiries without compromising clinical trust.',
      features: ['Online Patient Appointment Scheduling', 'Before/After Treatment Smile Gallery', 'HIPAA-Compliant Intake Forms'],
      outcomes: ['Clear treatment pathways', 'Accessible clinical aesthetics', 'Fewer phone-tag enquiries'],
    },
    gyms: {
      label: 'Gyms',
      eyebrow: 'Fitness web development',
      promise: 'Turn local energy into memberships.',
      description: 'High-energy fitness branding paired with a practical sales journey for memberships, classes, and personal training.',
      features: ['Membership sales journeys', 'Live class timetable publishing', 'Trainer scheduling workflows'],
      outcomes: ['Faster trial sign-ups', 'Timetable visibility', 'Stronger trainer discovery'],
    },
    'real-estate': {
      label: 'Real Estate',
      eyebrow: 'Property technology',
      promise: 'Make every serious property enquiry easier to act on.',
      description: 'A high-ticket property platform that helps buyers explore listings, understand value, and request a conversation at the right moment.',
      features: ['High-ticket lead generation', 'Virtual tour embeds', 'Dynamic property listing filters'],
      outcomes: ['Better-qualified enquiries', 'Richer property discovery', 'Cleaner agent handoffs'],
    },
    jewelry: {
      label: 'Jewelry',
      eyebrow: 'Luxury commerce experience',
      promise: 'Give every piece the digital presentation it deserves.',
      description: 'Ultra-premium visual direction, considered security, and storytelling that lets a luxury jewelry brand sell confidence as well as craftsmanship.',
      features: ['Ultra-premium visual aesthetics', 'Secure commerce foundations', 'Interactive 3D product galleries'],
      outcomes: ['Stronger product desire', 'Confident high-value browsing', 'Distinct luxury brand storytelling'],
    },
    shopify: {
      label: 'Shopify',
      eyebrow: 'Commerce engineering',
      promise: 'Remove friction between product interest and checkout.',
      description: 'High-performance Shopify architecture for brands that want a faster store, a cleaner cart, and dependable operational data.',
      features: ['Cart conversion optimization', 'Fast checkout flows', 'Inventory syncing and sales architecture'],
      outcomes: ['Fewer abandoned carts', 'Quicker buying journeys', 'More dependable stock visibility'],
    },
  },
}

const titleCase = (value) => value.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join(' ')

export function generateStaticParams() {
  return SERVICE_DIRECTORY.niches.flatMap((niche) => SERVICE_DIRECTORY.cities.map((city) => ({ niche, city })))
}

export async function generateMetadata({ params }) {
  const { niche, city } = await params
  const nicheData = SERVICE_DIRECTORY.nicheProfiles[niche]
  const cityData = SERVICE_DIRECTORY.cityProfiles[city]
  const label = nicheData?.label || titleCase(niche)
  const location = cityData?.name || titleCase(city)
  return {
    title: `Premium Web Development for ${label} in ${location} | ApexWebDesign`,
    description: `Accelerate your ${label.toLowerCase()} platform in ${location} with a custom 1-second loading Next.js website. View technical benchmarks for ${label.toLowerCase()} systems.`,
    alternates: { canonical: `https://apexwebdesign.online/services/${niche}/${city}` },
    robots: { index: true, follow: true },
    openGraph: { title: `Premium Web Development for ${label} in ${location}`, description: nicheData?.description, url: `https://apexwebdesign.online/services/${niche}/${city}`, type: 'website' },
  }
}

export default async function ServiceLocationPage({ params }) {
  const { niche, city } = await params
  const nicheData = SERVICE_DIRECTORY.nicheProfiles[niche]
  const cityData = SERVICE_DIRECTORY.cityProfiles[city]

  if (!nicheData || !cityData) return <main style={{ padding: 40 }}><h1>Service page not found</h1><Link href="/">Return to ApexWebDesign</Link></main>

  const alternativeCities = SERVICE_DIRECTORY.cities.filter((item) => item !== city).slice(0, 4)
  const alternativeNiches = SERVICE_DIRECTORY.niches.filter((item) => item !== niche).slice(0, 4)
  const schema = { '@context': 'https://schema.org', '@type': 'Service', name: `${nicheData.label} web development in ${cityData.name}`, serviceType: `${nicheData.label} web development`, areaServed: { '@type': 'City', name: cityData.name }, provider: { '@type': 'ProfessionalService', name: 'ApexWebDesign', url: 'https://apexwebdesign.online' }, description: nicheData.description, offers: { '@type': 'Offer', priceCurrency: cityData.currency, price: cityData.startingPrice, availability: 'https://schema.org/InStock' } }

  return <main className="service-location-page" style={{ background: '#07111f', color: '#f5f7fb', minHeight: '100vh', fontFamily: 'DM Sans, system-ui, sans-serif' }}>
    <style>{`.service-location-page{overflow:hidden}.service-location-shell{width:min(1160px,100%);margin:0 auto;padding:28px 24px 76px}.service-location-nav{display:flex;justify-content:space-between;align-items:center;gap:20px}.service-location-nav a{color:#b7c6d9;text-decoration:none}.service-location-brand{color:#fff!important;font-size:20px;font-weight:800}.service-location-brand span{color:#66e3c4}.service-location-hero{max-width:870px;padding:105px 0 78px}.service-location-eyebrow{color:#66e3c4;font-size:12px;font-weight:800;letter-spacing:.15em;text-transform:uppercase}.service-location-hero h1{font-size:clamp(42px,7vw,82px);line-height:1.02;letter-spacing:-.06em;margin:18px 0}.service-location-hero p{max-width:720px;color:#adbed3;font-size:19px;line-height:1.75}.service-location-button{display:inline-block;margin-top:22px;padding:15px 20px;border-radius:999px;background:#66e3c4;color:#07111f;text-decoration:none;font-weight:800}.service-location-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.service-location-card{border:1px solid #29405c;border-radius:18px;padding:26px;background:#0d1a2c}.service-location-card h2{font-size:21px;line-height:1.2;margin:0 0 14px}.service-location-card p,.service-location-card li{color:#adbed3;line-height:1.7}.service-location-card ul{padding-left:18px}.service-location-price{margin:76px 0;padding:34px;border:1px solid #2d4968;border-radius:22px;background:linear-gradient(135deg,#10263b,#0c1929);display:flex;justify-content:space-between;gap:30px;align-items:center}.service-location-price h2{font-size:32px;margin:0 0 8px}.service-location-price p{color:#adbed3;margin:0;line-height:1.65}.service-location-price strong{font-size:34px;white-space:nowrap;color:#66e3c4}.service-location-links{padding-top:40px;border-top:1px solid #29405c}.service-location-links h2{font-size:30px}.service-location-links-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}.service-location-links a{display:block;color:#66e3c4;padding:9px 0;text-decoration:none}@media(max-width:700px){.service-location-shell{padding:20px 16px 56px}.service-location-nav{align-items:flex-start}.service-location-nav>a:not(.service-location-brand){display:none}.service-location-hero{padding:76px 0 58px}.service-location-hero h1{font-size:clamp(40px,13vw,60px)}.service-location-grid,.service-location-links-grid{grid-template-columns:1fr}.service-location-price{display:block;margin:54px 0;padding:24px}.service-location-price strong{display:block;margin-top:20px;font-size:30px;white-space:normal}}`}</style>
    <div className="service-location-shell">
      <nav className="service-location-nav" aria-label="Primary navigation"><Link className="service-location-brand" href="/">Apex<span>WebDesign</span></Link><div><Link href="/allbanks">Products</Link><Link href="/privacy-policy" style={{ marginLeft: 18 }}>Privacy</Link></div></nav>
      <header className="service-location-hero"><div className="service-location-eyebrow">{nicheData.eyebrow} · {cityData.name}, {cityData.region}</div><h1>{nicheData.promise} <span style={{ display: 'block' }}>{titleCase(niche)} websites for {cityData.name}.</span></h1><p>{nicheData.description} We pair thoughtful content with fast Next.js engineering, so your local market gets a useful experience rather than another interchangeable template.</p><Link className="service-location-button" href="/#contact">Request a technical consultation</Link></header>
      <section className="service-location-grid" aria-label={`${nicheData.label} capabilities`}>{nicheData.features.map((feature) => <article className="service-location-card" key={feature}><h2>{feature}</h2><p>Designed around the decisions your {nicheData.label.toLowerCase()} customers make in {cityData.name}, with clear ownership from first interaction to completed enquiry.</p></article>)}</section>
      <section className="service-location-price" aria-label="Starting price"><div><h2>Built for your market, not a template.</h2><p>Launch with a focused architecture, then extend the system as your pipeline grows. Pricing is shown in the currency used for this market.</p></div><strong>From {cityData.symbol}{cityData.startingPrice}</strong></section>
      <section className="service-location-links" aria-labelledby="related-pages"><h2 id="related-pages">Explore related ApexWebDesign pages</h2><div className="service-location-links-grid"><div><p>More {nicheData.label.toLowerCase()} work by city</p>{alternativeCities.map((item) => <Link key={item} href={`/services/${niche}/${item}`}>{nicheData.label} web development in {SERVICE_DIRECTORY.cityProfiles[item].name}</Link>)}</div><div><p>Other local specialisms in {cityData.name}</p>{alternativeNiches.map((item) => <Link key={item} href={`/services/${item}/${city}`}>{SERVICE_DIRECTORY.nicheProfiles[item].label} web development in {cityData.name}</Link>)}</div></div></section>
      <footer style={{ marginTop: 64, paddingTop: 26, borderTop: '1px solid #29405c', color: '#adbed3', fontSize: 14 }}><p>ApexWebDesign builds high-performance digital products and custom software for organizations worldwide.</p><nav aria-label="Legal links"><Link href="/privacy-policy" style={{ color: '#66e3c4', marginRight: 18 }}>Privacy Policy</Link><Link href="/terms-of-use" style={{ color: '#66e3c4', marginRight: 18 }}>Terms of Use</Link><Link href="/allbanks" style={{ color: '#66e3c4' }}>ApexDoc</Link></nav></footer>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>
}
