'use client'

import Link from 'next/link'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, OrbitControls, Sphere } from '@react-three/drei'
import { useRef } from 'react'

const services = [
  ['01', 'Product Engineering', 'High-performance digital products with durable Next.js architecture and calm, considered interfaces.', 'wide'],
  ['02', 'Interface Systems', 'A visual language for complex software: responsive, accessible, and built to make decisions feel effortless.', ''],
  ['03', 'Systems & APIs', 'The connective tissue behind ambitious teams—integrations, automation, and data flows that scale with the business.', ''],
]

function Orb() {
  const group = useRef(null)
  const { viewport, pointer } = useThree()
  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.16
    group.current.rotation.x += (pointer.y * 0.32 - group.current.rotation.x) * 0.04
    group.current.position.x += (pointer.x * viewport.width * 0.08 - group.current.position.x) * 0.04
  })
  return <group ref={group} scale={viewport.width < 5 ? 1.1 : 1.45}><Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.55}><Sphere args={[1, 96, 96]}><MeshTransmissionMaterial backside backsideThickness={0.5} thickness={0.7} chromaticAberration={0.12} anisotropy={0.25} distortion={0.18} distortionScale={0.35} temporalDistortion={0.08} transmission={1} roughness={0.08} color="#83aaff" /></Sphere></Float><pointLight color="#4c6fff" intensity={3} distance={4} /><pointLight position={[-2, 1, 1]} color="#b166ff" intensity={2} distance={4} /></group>
}

function OrbScene() {
  return <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}><ambientLight intensity={0.5} /><Orb /><OrbitControls enableZoom={false} enablePan={false} enableRotate={false} /></Canvas>
}

function TiltCard({ item }) {
  return <article className={`studio-card ${item[3]}`}><span>{item[0]}</span><div><h3>{item[1]}</h3><p>{item[2]}</p></div><i aria-hidden="true">↗</i></article>
}

export default function StudioHome() {
  return <main className="studio-shell"><nav className="studio-nav"><Link href="/" className="studio-brand"><span className="brand-dot" />Apex<span>WebDesign</span></Link><div className="studio-nav-links"><a href="#capabilities">Capabilities</a><a href="#work">Our work</a><a href="mailto:namanbilthariya@gmail.com">Contact</a></div><a className="studio-nav-cta" href="mailto:namanbilthariya@gmail.com?subject=Digital%20engineering%20brief">Start a brief <span>↗</span></a></nav>
    <section className="studio-hero"><div className="hero-copy"><p className="eyebrow"><span /> Independent digital engineering studio · 2026</p><h1>Software should feel <em>inevitable.</em></h1><p className="hero-lede">We build fast, focused web applications and digital systems for companies doing meaningful work.</p><div className="hero-actions"><a className="primary-cta" href="mailto:namanbilthariya@gmail.com?subject=Digital%20engineering%20brief">Talk to the studio <span>↗</span></a><a className="text-cta" href="#capabilities">Explore capabilities <span>↓</span></a></div></div><div className="orb-stage"><div className="orb-glow" /><OrbScene /><p className="orb-caption">Interactive spatial study <span>Move your cursor</span></p></div></section>
    <section className="studio-proof"><p>Built for teams who care about</p><div><span>Speed</span><span>Clarity</span><span>Craft</span><span>Momentum</span></div></section>
    <section id="capabilities" className="studio-section"><div className="section-intro"><p className="eyebrow"><span /> What we do</p><h2>Quietly excellent<br /><em>by design.</em></h2><p>From the first interaction to the last API call, every detail has a job.</p></div><div className="bento-grid">{services.map((item) => <TiltCard key={item[1]} item={item} />)}</div></section>
    <section id="work" className="studio-work"><div><p className="eyebrow"><span /> Selected work</p><h2>Tools that make<br /><em>work lighter.</em></h2></div><div className="work-panel"><div><p>01 / Financial workflow</p><h3>ApexDoc</h3><span>Statement-to-Excel software for clearer financial reporting and professional review.</span></div><Link href="/pdfconverter">Open product <span>↗</span></Link></div></section>
    <footer className="studio-footer"><div><Link href="/" className="studio-brand"><span className="brand-dot" />Apex<span>WebDesign</span></Link><p>A digital engineering studio for ambitious products and the people behind them.</p></div><div className="footer-links"><a href="mailto:namanbilthariya@gmail.com">namanbilthariya@gmail.com</a><Link href="/privacy-policy">Privacy</Link><Link href="/terms-of-use">Terms</Link></div><small>© 2026 ApexWebDesign · Built with intent.</small></footer>
  </main>
}
