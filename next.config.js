/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_HOST: "http://localhost:5000",
    // API_HOST: "http://3.113.24.159",
    STRIPE_KEY: "pk_test_51MBqwcCQO6T38kilxah5Ohj2C4kTH0wNAdQOsfdIbZG460IcQ7SQroUKKN3atjgRQ743ZhZG4C245Qq8ztny7Z8y00zmzMqxck",
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  rewrites: () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*"
      },
      {
        source: "/uploads/:path*",
        destination: "http://localhost:5000/uploads/:path*"
      },
    ]
  }
}

module.exports = nextConfig
