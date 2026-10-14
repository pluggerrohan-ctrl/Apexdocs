import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'ApexWebDesign | Digital Engineering & Web Development Agency',
  description: 'ApexWebDesign engineers fast, production-ready web applications, websites, and software products with Next.js, React, and modern API architecture.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://apexwebdesign.online/' },
  openGraph: {
    title: 'ApexWebDesign | Digital Engineering & Web Development Agency',
    description: 'Digital engineering, web applications, and software products built for speed and scale.',
    url: 'https://apexwebdesign.online/',
    siteName: 'ApexWebDesign',
    type: 'website',
  },
}

const services = [
  ['01', 'Custom Enterprise Web Applications', 'Next.js, React, Node.js, and dependable backend architecture for products that need to move quickly without cutting corners.'],
  ['02', 'Advanced UI/UX Architecture', 'Clear interaction systems, accessible interfaces, and design decisions that help people finish important tasks with less friction.'],
  ['03', 'Software Engineering & Integrations', 'Proprietary tools, API integrations, automation, and data workflows that connect the parts of your business that should already work together.'],
]

const plans = [
  { name: 'Starter', detail: 'Starts at $1,499 (Single Payment)', features: ['Conversion-led landing page', 'Responsive Next.js build', 'Technical SEO foundation', 'Performance review'] },
  { name: 'Professional', detail: 'Starts at $2,999 (Most Popular Tier)', features: ['Multi-page product or site', 'Custom UI system', 'CMS and API integrations', 'Analytics and launch support'], featured: true },
  { name: 'Enterprise', detail: 'Custom Architecture (Book a Discovery Call)', features: ['Web application architecture', 'Security and access planning', 'Custom data workflows', 'Ongoing engineering partnership'] },
]

const sectors = [
  ['01', 'Roofing & Construction Companies', 'High-converting platforms built to capture commercial and residential roofing contracts, with custom automated quote-estimation modules.'],
  ['02', 'HVAC, Electrical & Plumbing Enterprises', 'Fast emergency-booking architecture connected to cloud CRM systems such as ServiceTitan and Housecall Pro for live scheduling pipelines.'],
  ['03', 'Solar & Renewable Energy Installers', 'Data-rich digital platforms with proprietary geolocation APIs for high-intent solar lead-generation workflows.'],
]

const agencySchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Apex Web Development Agency',
  url: 'https://apexwebdesign.online',
  logo: 'https://apexwebdesign.online',
  description: 'Global digital engineering studio specializing in under 1-second loading web applications and custom automation tools.',
  areaServed: 'Worldwide',
  email: 'namanbilthariya@gmail.com',
  contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: 'namanbilthariya@gmail.com', availableLanguage: ['English', 'Hindi'] },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Enterprise Web Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'High-Ticket Trade Contractor Platforms (Roofing & Solar)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Software Engineering and API Integrations' } },
    ],
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Apex Verified Work Portfolio',
    numberOfItems: 2,
    itemListElement: [
      { '@type': 'ListItem', position: 1, item: { '@type': 'CreativeWork', name: 'Advanced Technical School Portal' } },
      { '@type': 'ListItem', position: 2, item: { '@type': 'CreativeWork', name: 'ApexDoc - Secure Financial Automation Tool' } },
    ],
  },
}

export default function HomePage() {
  return (
    <main style={{ background: '#08111f', color: '#f5f7fb', minHeight: '100vh', fontFamily: 'DM Sans, system-ui, sans-serif' }}>
      <style>{`* { box-sizing: border-box; } @media (max-width: 700px) { main { overflow-x: hidden; } main > nav { padding: 18px 16px !important; } main > nav > div { display: none !important; } main > section:nth-of-type(1) { display: block !important; padding: 64px 16px !important; } main > section:nth-of-type(1) h1 { font-size: clamp(40px, 13vw, 58px) !important; overflow-wrap: anywhere; } main > section:nth-of-type(1) > div + div { margin-top: 36px; } main .mobile-stack-grid { grid-template-columns: 1fr !important; } main .mobile-stack-flex { flex-direction: column !important; align-items: stretch !important; } main > section:nth-of-type(3), main > section:nth-of-type(5), main > section#sectors { padding: 64px 16px !important; } main > section:nth-of-type(4) { padding: 16px !important; } main > section:nth-of-type(4) a { white-space: normal !important; } main > footer { padding: 48px 16px 28px !important; } main > footer > div > div { grid-template-columns: 1fr !important; } main > footer > div { display: block !important; } main > footer a { overflow-wrap: anywhere; } }`}</style>
      <nav style={{ maxWidth: 1180, margin: '0 auto', padding: '22px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1c2a3d' }}>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: 20, letterSpacing: '-.04em' }}>Apex<span style={{ color: '#66e3c4' }}>WebDesign</span></Link>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', fontSize: 14, color: '#aab8ca' }}><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a><a href="#sectors" style={{ color: 'inherit', textDecoration: 'none' }}>Sectors</a><a href="#apexdoc" style={{ color: 'inherit', textDecoration: 'none' }}>ApexDoc</a><a href="#contact" style={{ color: '#08111f', background: '#66e3c4', padding: '10px 15px', borderRadius: 999, fontWeight: 700, textDecoration: 'none' }}>Start a conversation</a></div>
      </nav>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '100px 24px 86px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(300px, .9fr)', gap: 60, alignItems: 'center' }}>
        <div><p style={{ color: '#66e3c4', fontSize: 13, fontWeight: 800, letterSpacing: '.16em', textTransform: 'uppercase' }}>Digital engineering studio · India / global</p><h1 style={{ fontSize: 'clamp(46px, 7vw, 86px)', lineHeight: .98, letterSpacing: '-.065em', maxWidth: 800, margin: '20px 0 26px' }}>We Engineering Web Applications and Websites That Load in Under 1 Second.</h1><p style={{ color: '#aab8ca', fontSize: 19, lineHeight: 1.65, maxWidth: 650, marginBottom: 32 }}>Optimize your digital presence. Get a certified 99+ Core Web Vitals score, built with production-ready Next.js and React architecture.</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}><a href="mailto:namanbilthariya@gmail.com?subject=Request%20a%20Digital%20Audit" style={{ background: '#66e3c4', color: '#08111f', padding: '14px 20px', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>Request a Digital Audit</a><a href="#products" style={{ border: '1px solid #3b4e67', color: '#fff', padding: '14px 20px', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>Explore Our Products</a></div></div>
        <div style={{ border: '1px solid #24364e', borderRadius: 22, padding: 22, background: 'linear-gradient(145deg,#122239,#0d192b)', boxShadow: '0 24px 80px rgba(0,0,0,.25)' }}><div style={{ display: 'flex', justifyContent: 'space-between', color: '#8091a8', fontSize: 12, marginBottom: 42 }}><span>APEX ENGINEERING SYSTEM</span><span style={{ color: '#66e3c4' }}>● LIVE</span></div><div style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-.07em' }}>99<span style={{ color: '#66e3c4' }}>+</span></div><p style={{ color: '#d5deea', margin: '4px 0 34px' }}>Performance target across the systems we ship.</p><div style={{ height: 8, background: '#22354d', borderRadius: 99 }}><div style={{ width: '94%', height: '100%', background: '#66e3c4', borderRadius: 99 }} /></div><div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, color: '#8091a8', fontSize: 12 }}><span>Architecture</span><span>Optimized</span></div></div>
      </section>

      <section style={{ background: '#f4f7fb', color: '#102033', padding: '72px 24px' }}><div style={{ maxWidth: 1180, margin: '0 auto' }}><p style={{ color: '#2d8e78', fontWeight: 800, fontSize: 12, letterSpacing: '.15em', textTransform: 'uppercase' }}>Measured delivery</p><h2 style={{ fontSize: 'clamp(34px, 5vw, 58px)', letterSpacing: '-.055em', margin: '12px 0 34px', maxWidth: 650 }}>Fast is a feature. Clean is a business advantage.</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#d9e1eb' }}>{[['Performance:', '100/100'], ['SEO:', '100/100'], ['Speed Index:', '0.6s']].map(([label, value]) => <div key={label} style={{ background: '#f4f7fb', padding: '26px 22px' }}><p style={{ margin: 0, color: '#77869a', fontSize: 14 }}>{label}</p><strong style={{ display: 'block', fontSize: 36, letterSpacing: '-.05em', marginTop: 8 }}>{value}</strong><span style={{ color: '#58687c', fontSize: 13 }}>Optimized delivery benchmark</span></div>)}</div><p style={{ color: '#58687c', marginTop: 22 }}>Our core framework is engineered for maximum speed, accessibility, and clean code standards.</p></div></section>

      <section id="services" style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 24px' }}><p style={{ color: '#66e3c4', fontWeight: 800, fontSize: 12, letterSpacing: '.15em', textTransform: 'uppercase' }}>What we build</p><h2 style={{ fontSize: 'clamp(36px, 5vw, 62px)', letterSpacing: '-.06em', margin: '12px 0 42px', maxWidth: 700 }}>Engineering that respects the user and the roadmap.</h2><div className="mobile-stack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>{services.map(([number, title, text]) => <article key={title} style={{ border: '1px solid #24364e', borderRadius: 16, padding: 24, minHeight: 250 }}><span style={{ color: '#66e3c4', fontSize: 13 }}>{number}</span><h3 style={{ fontSize: 22, letterSpacing: '-.03em', margin: '48px 0 12px' }}>{title}</h3><p style={{ color: '#aab8ca', lineHeight: 1.7, margin: 0 }}>{text}</p></article>)}</div></section>

      <section id="sectors" style={{ background: '#101d30', padding: '86px 24px' }}><div style={{ maxWidth: 1180, margin: '0 auto' }}><p style={{ color: '#66e3c4', fontWeight: 800, fontSize: 12, letterSpacing: '.15em', textTransform: 'uppercase' }}>Sectors we serve</p><h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-.06em', margin: '12px 0 40px', maxWidth: 760 }}>Digital systems for businesses where speed becomes revenue.</h2><h3 style={{ color: '#d6e0eb', fontSize: 20, margin: '0 0 22px' }}>Premium Trade Contractors &amp; Field Services</h3><div className="mobile-stack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>{sectors.map(([number, title, text]) => <article key={title} style={{ border: '1px solid #2b405a', borderRadius: 16, padding: 24, background: '#0d192b' }}><span style={{ color: '#66e3c4', fontSize: 13 }}>{number}</span><h4 style={{ fontSize: 20, margin: '38px 0 12px', lineHeight: 1.2 }}>{title}</h4><p style={{ color: '#aab8ca', lineHeight: 1.7, margin: 0 }}>{text}</p></article>)}</div></div></section>

      <section id="apexdoc" style={{ maxWidth: 1180, margin: '0 auto', padding: '16px 24px 96px' }}><div className="mobile-stack-grid" style={{ borderRadius: 22, background: '#d9f5ed', color: '#0b241f', padding: 'clamp(28px, 6vw, 72px)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 36, alignItems: 'end' }}><div><p style={{ color: '#2d8e78', fontWeight: 800, fontSize: 12, letterSpacing: '.15em', textTransform: 'uppercase' }}>Featured case study & product</p><h2 style={{ fontSize: 'clamp(32px, 5vw, 58px)', letterSpacing: '-.06em', margin: '12px 0 18px' }}>Enterprise Software Case Study: ApexDoc</h2><p style={{ maxWidth: 720, lineHeight: 1.75, fontSize: 17 }}>We designed, developed, and deployed ApexDoc—a highly secure, AI-powered document data extraction software. It processes encrypted banking formats via secure HTTPS for financial reporting and professional auditing workflows globally.</p></div><Link href="/pdfconverter" style={{ background: '#0b241f', color: '#fff', padding: '14px 20px', borderRadius: 8, whiteSpace: 'nowrap', textDecoration: 'none', fontWeight: 800 }}>Launch ApexDoc Application</Link></div></section>

      <section id="products" style={{ background: '#0d192b', padding: '86px 24px' }}><div style={{ maxWidth: 1180, margin: '0 auto' }}><p style={{ color: '#66e3c4', fontWeight: 800, fontSize: 12, letterSpacing: '.15em', textTransform: 'uppercase' }}>Services & pricing</p><h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-.06em', margin: '12px 0 40px' }}>A clear starting point for every ambition.</h2><div className="mobile-stack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>{plans.map((plan) => <article key={plan.name} style={{ border: `1px solid ${plan.featured ? '#66e3c4' : '#2b405a'}`, borderRadius: 16, padding: 26, background: plan.featured ? '#122a36' : '#101f32' }}><h3 style={{ margin: 0, fontSize: 24 }}>{plan.name}</h3><p style={{ color: '#9dafc3', margin: '8px 0 25px' }}>{plan.detail}</p><ul style={{ padding: 0, margin: 0, listStyle: 'none', color: '#d6e0eb', lineHeight: 2.1 }}>{plan.features.map((feature) => <li key={feature}>— {feature}</li>)}</ul><a href="mailto:namanbilthariya@gmail.com?subject=Custom%20quote%20request" style={{ display: 'inline-block', marginTop: 24, color: '#66e3c4', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>Contact for more · Get a custom quote →</a></article>)}</div></div></section>

      <footer id="contact" style={{ maxWidth: 1180, margin: '0 auto', padding: '54px 24px 32px', color: '#9dafc3' }}><div style={{ paddingBottom: 32, borderBottom: '1px solid #24364e' }}><div style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>Apex<span style={{ color: '#66e3c4' }}>WebDesign</span></div><h2 style={{ color: '#f5f7fb', fontSize: 'clamp(24px, 4vw, 38px)', letterSpacing: '-.04em', margin: '30px 0 22px' }}>ApexWebDesign Studio Group · Global Operations</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 28 }}><div><h3 style={{ color: '#d6e0eb', fontSize: 15 }}>Operational Regions</h3><p style={{ lineHeight: 1.8, margin: 0 }}>North America Region: Distributed Technical Architecture Teams (Austin / New York)</p><p style={{ lineHeight: 1.8, margin: '8px 0 0' }}>Asia-Pacific Region: High-Performance Global Delivery Infrastructure (India Tech Hub)</p></div><div><h3 style={{ color: '#d6e0eb', fontSize: 15 }}>Compliance &amp; Governance Standards</h3><p style={{ lineHeight: 1.8, margin: 0 }}>Strict Non-Disclosure Agreement (NDA) Enforcement Protocol</p><p style={{ lineHeight: 1.8, margin: '8px 0 0' }}>100% Intellectual Property (IP) &amp; Source Code Transfer on Milestone Release</p><p style={{ lineHeight: 1.8, margin: '8px 0 0' }}>Enterprise-Grade 256-Bit Data Pipeline Encryption</p></div></div><h3 style={{ color: '#d6e0eb', fontSize: 15, margin: '30px 0 8px' }}>Our Work</h3><p style={{ maxWidth: 700, lineHeight: 1.7, marginTop: 0 }}>We built software tools for real business workflows, including ApexDoc, our statement-to-Excel document converter for financial reporting and professional review.</p><p style={{ maxWidth: 700, lineHeight: 1.7 }}>ApexWebDesign is a global digital engineering and custom software development firm.</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'flex-start', fontSize: 14 }}><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-of-use">Terms of Use</Link><Link href="/allbanks">ApexDoc bank converters</Link><a href="mailto:namanbilthariya@gmail.com">namanbilthariya@gmail.com</a></div></div><p style={{ fontSize: 13, marginBottom: 0 }}>© 2026 ApexWebDesign. Built for ambitious digital products.</p></footer>
      <a href="https://wa.me/916266982259?text=Hello%20ApexWebDesign%2C%20I%27d%20like%20to%20discuss%20a%20web%20project." target="_blank" rel="noopener noreferrer" aria-label="Contact ApexWebDesign on WhatsApp" style={{ position: 'fixed', bottom: 22, right: 22, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 58, height: 58, borderRadius: '50%', background: '#25d366', color: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,.28)', textDecoration: 'none' }}><svg aria-hidden="true" width="31" height="31" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.55 0 .23 5.32.23 11.85c0 2.09.55 4.13 1.59 5.93L.13 24l6.37-1.67a11.84 11.84 0 0 0 5.57 1.42h.01c6.53 0 11.85-5.32 11.85-11.85a11.8 11.8 0 0 0-3.41-8.42ZM12.08 21.7h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.78.99 1.01-3.68-.23-.38a9.83 9.83 0 1 1 8.39 4.65Zm5.4-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" /></svg></a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(agencySchema) }} />
    </main>
  )
}
