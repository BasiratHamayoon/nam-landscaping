import Navbar from "@/components/layout/Navbar"
import "./globals.css"
import Providers from "./providers"
import Footer from "@/components/layout/Footer"


export const metadata = {
  title: "NAM Landscaping | Premium Garden & Landscape Services in UAE",
  description:
    "Transform your outdoor spaces into living masterpieces. Professional landscaping, garden design, swimming pools, irrigation systems, and more across UAE.",
  keywords:
    "landscaping, garden design, swimming pool, irrigation, artificial grass, pergolas, outdoor lighting, UAE, Dubai, Abu Dhabi",
  authors: [{ name: "NAM Landscaping" }],
  openGraph: {
    title: "NAM Landscaping | Premium Garden & Landscape Services",
    description:
      "Transform your outdoor spaces into living masterpieces with NAM Landscaping.",
    type: "website",
    locale: "en_US",
    url: "https://namlandscaping.ae",
    siteName: "NAM Landscaping",
  },
  twitter: {
    card: "summary_large_image",
    title: "NAM Landscaping | Premium Landscaping Services",
    description:
      "Transform your outdoor spaces into living masterpieces.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo.png" />
        <meta name="theme-color" content="#16a34a" />
      </head>
      <body className="antialiased noise-bg">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}