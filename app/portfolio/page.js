import Link from 'next/link'

export const metadata = {
  title: 'Website Portfolio | Real Estate, Restaurant, Dental & Business Websites',
  description: 'Explore ApexWebDesign portfolio concepts for real estate, restaurants, cafes, packers and movers, dentists, and growing businesses.',
  keywords: ['website portfolio', 'real estate website design', 'restaurant website design', 'dental website agency'],
  alternates: { canonical: 'https://apexwebdesign.online/portfolio' },
  robots: { index: true, follow: true },
}

const projects = [
  ['01', 'Gurgaon Properties', 'Real estate preview for property discovery, location-led landing pages, enquiry capture, and agent trust signals.', 'linear-gradient(135deg,#1f3b5c,#8a6f45)', 'https://gurgaonpropertiess.in/'],
  ['02', 'The Coffee Concept India', 'Restaurant and cafe preview with menu-first browsing, reservations, local search structure, and event promotion.', 'linear-gradient(135deg,#5b241a,#d49a55)', 'https://thecoffeeconceptindia.com/'],
  ['03', 'Real Safe Movers', 'Packers and movers preview built around service areas, moving checklists, quote requests, and relocation trust.', 'linear-gradient(135deg,#173f4d,#6ec4c7)', 'https://realsafemovers.com/'],
  ['04', 'Nemmadi Home Inspection', 'Real estate services preview for inspection education, local landing pages, homeowner trust, and enquiry pathways.', 'linear-gradient(135deg,#234b3b,#b4945a)', 'https://nemmadi.in/affordable-home-inspection/bangalore/'],
  ['04', 'Dental clinic website', 'Calm patient journeys, treatment education, appointment pathways, and location pages designed for trust.', 'linear-gradient(135deg,#184d55,#91e4ce)'],
  ['05', 'Professional services website', 'A credible digital front door for consultants, legal teams, and local operators who need qualified enquiries.', 'linear-gradient(135deg,#28254b,#8d77da)'],
  ['06', 'E-commerce storefront', 'A focused commerce system with product storytelling, conversion paths, and a frictionless mobile buying experience.', 'linear-gradient(135deg,#321b54,#d15cd5)'],
]

export default function PortfolioPage() {
  return <main className="portfolio-page"><nav className="portfolio-nav"><Link href="/" className="portfolio-brand">Apex<span>WebDesign</span></Link><div><Link href="/services">Services</Link><Link href="/blog">Blog</Link><Link href="/" className="portfolio-cta">Start a project</Link></div></nav><header className="portfolio-hero"><p className="eyebrow">Selected work · ApexWebDesign</p><h1>Digital storefronts for businesses people already trust.</h1><p>These portfolio directions show how we shape a website around the real decision a customer needs to make: book, enquire, visit, compare, or buy.</p></header><section className="portfolio-grid" aria-label="Portfolio concepts">{projects.map(([number, title, text, background, url]) => <article className="portfolio-card" key={title}><div className="portfolio-preview" style={{ background }}><span>{number}</span><div className="preview-window"><i /><i /><i /><strong>{title}</strong><em>Preview concept · {title}</em></div></div><div className="portfolio-copy"><p className="eyebrow">Website concept</p><h2>{title}</h2><p>{text}</p>{url ? <Link href={url} target="_blank" rel="noopener noreferrer">View reference website →</Link> : null}<Link href="mailto:namanbilthariya@gmail.com?subject=Portfolio%20project%20request">Discuss a similar project →</Link></div></article>)}</section><section className="portfolio-note"><p className="eyebrow">Why websites matter</p><h2>A useful website turns attention into a next step.</h2><p>Websites give businesses an owned destination for their services, proof, location, contact options, and customer journeys. This portfolio section is informed by public reference material about websites and digital marketing from Wikipedia, while the copy and layouts are original to ApexWebDesign.</p><p><Link href="https://en.wikipedia.org/wiki/Website">Website source</Link> · <Link href="https://en.wikipedia.org/wiki/Digital_marketing">Digital marketing source</Link></p></section></main>
}
