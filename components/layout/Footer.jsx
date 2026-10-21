"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import Link from "next/link"
import {
  Leaf,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  MessageCircle,
  Send,
  CheckCircle2,
} from "lucide-react"
import { settingsData } from "@/store/data/settingsData"

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function Footer() {
  const reduxSettings = useSelector(
    (state) => state.settings?.data || state.settings?.items || state.settings
  )

  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState("")

  const phone = reduxSettings?.phone || settingsData?.phone || "+971 4 123 4567"
  const whatsapp = reduxSettings?.whatsapp || settingsData?.whatsapp || "+971 50 123 4567"
  const emailAddr = reduxSettings?.email || settingsData?.email || "info@namlandscaping.ae"
  const address = reduxSettings?.address || settingsData?.address || "Al Quoz Industrial Area 3, Dubai, UAE"
  const workingHours = reduxSettings?.workingHours || settingsData?.workingHours || "Mon - Sat: 8:00 AM - 6:00 PM"
  const socials = {
    instagram: reduxSettings?.socials?.instagram || settingsData?.socials?.instagram || "https://instagram.com",
    facebook: reduxSettings?.socials?.facebook || settingsData?.socials?.facebook || "https://facebook.com",
    linkedin: reduxSettings?.socials?.linkedin || settingsData?.socials?.linkedin || "https://linkedin.com",
    whatsapp: reduxSettings?.socials?.whatsapp || settingsData?.socials?.whatsapp || `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`,
  }

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ]

  const serviceLinks = [
    { label: "Garden Design & Landscaping", href: "/services" },
    { label: "Swimming Pool Construction", href: "/services" },
    { label: "Smart Irrigation Systems", href: "/services" },
    { label: "Soft & Hard Landscaping", href: "/services" },
    { label: "Outdoor Lighting & Pergolas", href: "/services" },
    { label: "Landscape Maintenance", href: "/services" },
  ]

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className="relative bg-[#0a0f0c] text-white pt-20 pb-10 overflow-hidden border-t border-white/10 z-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.03)_1px,_transparent_0)] bg-[size:32px_32px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 cursor-pointer group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-bold tracking-tight text-white leading-none">
                  NAM
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-semibold mt-1">
                  Landscaping UAE
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              UAE&apos;s premier landscape architecture and outdoor living studio. Sculpting climate-adapted residential gardens, resort pools, and commercial sanctuaries across Dubai and Abu Dhabi.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all cursor-pointer hover:scale-110"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all cursor-pointer hover:scale-110"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all cursor-pointer hover:scale-110"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all cursor-pointer hover:scale-110"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading text-lg text-white font-semibold tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer group"
                  >
                    <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading text-lg text-white font-semibold tracking-wide">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer group"
                  >
                    <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-heading text-lg text-white font-semibold tracking-wide">
              Get In Touch
            </h4>
            <ul className="space-y-3.5 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-emerald-400 transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${emailAddr}`} className="hover:text-emerald-400 transition-colors">
                  {emailAddr}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{workingHours}</span>
              </li>
            </ul>

            <div className="pt-2">
              <form onSubmit={handleSubscribe} className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                  Subscribe to Newsletter
                </span>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full h-11 pl-4 pr-12 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center cursor-pointer transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {subscribed && (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Thank you for subscribing!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} NAM Landscaping Services UAE. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}