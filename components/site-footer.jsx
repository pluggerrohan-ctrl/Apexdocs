import Link from 'next/link'

export default function SiteFooter() {
  return <footer className="global-footer"><div><strong>Apex<span>WebDesign</span></strong><p>Naman Bilthariya · Solo Agency Owner</p><p>Fast, focused websites for businesses ready to look credible and convert more enquiries.</p></div><div><h2>Helpful reading</h2><Link href="/blog/why-a-website-matters-for-business">Why a Website Matters for Business</Link><Link href="/blog">All business guides</Link><Link href="/portfolio">Portfolio</Link></div><div><h2>Start here</h2><Link href="/services">Services directory</Link><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-of-use">Terms of Use</Link><a href="mailto:namanbilthariya@gmail.com">namanbilthariya@gmail.com</a></div></footer>
}
