"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Phone, Mail, MapPin, Leaf } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { MobileMenu } from "@/components/layout/MobileMenu"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

function BrandLogo({ scrolled }) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div className="flex items-center gap-2.5 group">
        <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-md shadow-primary-600/30 group-hover:scale-105 transition-transform">
          <Leaf className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span
            className={`font-heading text-xl font-bold tracking-wider leading-none transition-colors duration-300 ${
              scrolled ? "text-gray-900 dark:text-white" : "text-white"
            }`}
          >
            NAM
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400 font-semibold mt-0.5">
            Landscaping
          </span>
        </div>
      </div>
    )
  }

  return (
    <img
      src="/images/logo.png"
      alt="NAM Landscaping"
      onError={() => setImgError(true)}
      className="h-10 w-auto object-contain drop-shadow-md"
    />
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${
          scrolled
            ? "bg-white text-gray-900 border-b border-gray-200 dark:bg-[#0a0f0c] dark:text-white dark:border-white/10 shadow-lg shadow-black/5"
            : "bg-transparent text-white"
        }`}
      >
        {/* Top Info Bar - Hides on scroll */}
        <div
          className={`hidden lg:grid transition-all duration-500 ease-out overflow-hidden ${
            scrolled
              ? "grid-rows-[0fr] opacity-0 border-transparent"
              : "grid-rows-[1fr] opacity-100 border-b border-white/15"
          }`}
        >
          <div className="min-h-0">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-2.5 flex items-center justify-between text-xs text-white/90">
              <div className="flex items-center gap-6">
                <a
                  href="tel:+971501234567"
                  className="flex items-center gap-1.5 hover:text-primary-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +971 50 123 4567
                </a>
                <a
                  href="mailto:info@namlandscaping.ae"
                  className="flex items-center gap-1.5 hover:text-primary-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  info@namlandscaping.ae
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Dubai, UAE
                </span>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle scrolled={false} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Row */}
        <nav
          className={`max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between transition-all duration-500 ${
            scrolled ? "py-3.5" : "py-5"
          }`}
        >
          <Link href="/" className="relative z-10 block shrink-0">
            <BrandLogo scrolled={scrolled} />
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-800 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
                    : "text-white hover:text-primary-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {scrolled && <ThemeToggle scrolled={true} />}
            <Link href="/contact">
              <Button className="rounded-full px-6">Get a Quote</Button>
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle scrolled={scrolled} />
            <button
              onClick={() => setMobileOpen(true)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                scrolled
                  ? "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  )
}

export default Navbar