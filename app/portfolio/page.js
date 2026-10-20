import Link from 'next/link'

export const metadata = {
  title: 'Website Portfolio | Real Estate, Restaurant, Dental & Business Websites',
  description: 'Explore ApexWebDesign portfolio concepts for real estate, restaurants, cafes, packers and movers, dentists, and growing businesses.',
  keywords: ['website portfolio', 'real estate website design', 'restaurant website design', 'dental website agency'],
  alternates: { canonical: 'https://apexwebdesign.online/portfolio' },
  robots: { index: true, follow: true },
}

const projects = [
  ['01', 'Real estate platform', 'Property discovery, location-led landing pages, enquiry capture, and agent trust signals arranged for high-intent buyers.', 'linear-gradient(135deg,#1f3b5c,#8a6f45)'],
  ['02', 'Restaurant & cafe website', 'A menu-first experience with reservations, local search structure, event promotion, and a warm visual system.', 'linear-gradient(135deg,#5b241a,#d49a55)'],
  ['03', 'Packers & movers website', 'A quote-led logistics interface built around service areas, moving checklists, and fast request forms.', 'linear-gradient(135deg,#173f4d,#6ec4c7)'],
  ['04', 'Dental clinic website', 'Calm patient journeys, treatment education, appointment pathways, and location pages designed for trust.', 'linear-gradient(135deg,#184d55,#91e4ce)'],
  ['05', 'Professional services website', 'A credible digital front door for consultants, legal teams, and local operators who need qualified enquiries.', 'linear-gradient(135deg,#28254b,#8d77da)'],
  ['06', 'E-commerce storefront', 'A focused commerce system with product storytelling, conversion paths, and a frictionless mobile buying experience.', 'linear-gradient(135deg,#321b54,#d15cd5)'],
]

export default function PortfolioPage() {
  return <main className="portfolio-page"><nav className="portfolio-nav"><Link href="/" className="portfolio-brand">Apex<span>WebDesign</span></Link><div><Link href="/services">Services</Link><Link href="/blog">Blog</Link><Link href="/" className="portfolio-cta">Start a project</Link></div></nav><header className="portfolio-hero"><p className="eyebrow">Selected work · ApexWebDesign</p><h1>Digital storefronts for businesses people already trust.</h1><p>These portfolio directions show how we shape a website around the real decision a customer needs to make: book, enquire, visit, compare, or buy.</p></header><section className="portfolio-grid" aria-label="Portfolio concepts">{projects.map(([number, title, text, background]) => <article className="portfolio-card" key={title}><div className="portfolio-preview" style={{ background }}><span>{number}</span><div className="preview-window"><i /><i /><i /><strong>{title}</strong><em>Designed for clarity</em></div></div><div className="portfolio-copy"><p className="eyebrow">Website concept</p><h2>{title}</h2><p>{text}</p><Link href="mailto:namanbilthariya@gmail.com?subject=Portfolio%20project%20request">Discuss a similar project →</Link></div></article>)}</section><section className="portfolio-note"><p className="eyebrow">Why websites matter</p><h2>A useful website turns attention into a next step.</h2><p>Websites give businesses an owned destination for their services, proof, location, contact options, and customer journeys. This portfolio section is informed by public reference material about websites and digital marketing from Wikipedia, while the copy and layouts are original to ApexWebDesign.</p><p><Link href="https://en.wikipedia.org/wiki/Website">Website source</Link> · <Link href="https://en.wikipedia.org/wiki/Digital_marketing">Digital marketing source</Link></p></section></main>
}
