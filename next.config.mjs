const nextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ['3000-' + process.env.BASE44_PUBLIC_HOST_SUFFIX],
  async headers() {
    return [{ source: '/(.*)', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ] }]
  },
}
export default nextConfig
