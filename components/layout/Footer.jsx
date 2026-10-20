"use client"
import Link from "next/link"
import { useSelector } from "react-redux"
import { useRef, useEffect } from "react"
import {
  Leaf,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Heart,
  ChevronUp,
} from "lucide-react"

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const footerLinks = {
  services: [
    { name: "Landscaping Design", href: "/services#landscaping" },
    { name: "Garden Maintenance", href: "/services#maintenance" },
    { name: "Swimming Pools", href: "/services#pool" },
    { name: "Irrigation Systems", href: "/services#irrigation" },
    { name: "Pergolas", href: "/services#pergolas" },
    { name: "Outdoor Lighting", href: "/services#lighting" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Projects", href: "/projects" },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "FAQs", href: "/#faq" },
    { name: "Contact Us", href: "/contact" },
  ],
}

export default function Footer() {
  const settings = useSelector((state) => state.settings)
  const footerRef = useRef(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!footerRef.current) return

      const elements = footerRef.current.querySelectorAll(".footer-animate")
      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      )
    }

    loadGSAP()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer ref={footerRef} className="relative bg-primary-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-8xl">🌿</div>
        <div className="absolute top-40 right-20 text-6xl">🍃</div>
        <div className="absolute bottom-20 left-1/3 text-7xl">🌱</div>
      </div>

      <div className="container-custom pt-20 pb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="footer-animate lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-bold font-heading">NAM</span>
                <span className="block text-[10px] tracking-[3px] uppercase text-primary-400 font-body -mt-1">
                  Landscaping
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed font-body mb-6 max-w-xs">
              Transforming outdoor spaces into living masterpieces. We bring nature&apos;s beauty to your doorstep with expert craftsmanship and creative design.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: InstagramIcon, href: settings.socialLinks.instagram },
                { icon: FacebookIcon, href: settings.socialLinks.facebook },
                { icon: TwitterIcon, href: settings.socialLinks.twitter },
                { icon: LinkedinIcon, href: settings.socialLinks.linkedin },
              ].map((social, i) => {
                const Icon = social.icon
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary-600 hover:scale-110 flex items-center justify-center transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="footer-animate">
            <h3 className="text-lg font-bold font-heading mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 rounded-full bg-primary-600" />
              Our Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary-400 text-sm font-body flex items-center gap-2 group transition-colors"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-animate">
            <h3 className="text-lg font-bold font-heading mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 rounded-full bg-primary-600" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary-400 text-sm font-body flex items-center gap-2 group transition-colors"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-animate">
            <h3 className="text-lg font-bold font-heading mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 rounded-full bg-primary-600" />
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-start gap-3 text-white/60 hover:text-primary-400 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-primary-600/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-body block">{settings.phone}</span>
                    <span className="text-xs text-white/40">Call us anytime</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-3 text-white/60 hover:text-primary-400 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-primary-600/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-body block">{settings.email}</span>
                    <span className="text-xs text-white/40">Email us</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-body block">{settings.address}</span>
                  <span className="text-xs text-white/40">Visit us</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-body block">{settings.workingHours}</span>
                  <span className="text-xs text-white/40">Working hours</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-animate border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-body text-center md:text-left">
            © {new Date().getFullYear()} NAM Landscaping. All rights reserved. Made with{" "}
            <Heart className="w-3 h-3 inline text-red-500 fill-red-500" /> in UAE
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  )
}