/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  experimental: {
    isrMemoryCacheSize: 0 // forces ISR to use disk
  }
}
