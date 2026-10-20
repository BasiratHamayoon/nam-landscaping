"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet } from "@/components/ui/Sheet"
import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Leaf,
} from "lucide-react"

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

export default function MobileMenu({ isOpen, onClose, links, settings }) {
  const pathname = usePathname()
  const [expandedItem, setExpandedItem] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      const animateMenu = async () => {
        const { gsap } = await import("gsap")
        if (!menuRef.current) return

        const items = menuRef.current.querySelectorAll(".menu-item")
        gsap.fromTo(
          items,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power3.out", delay: 0.2 }
        )
      }
      animateMenu()
    }
  }, [isOpen])

  useEffect(() => {
    onClose()
  }, [pathname])

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <div ref={menuRef} className="flex flex-col h-full pt-16 pb-6 px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold font-heading">NAM</span>
            <span className="block text-[10px] tracking-[3px] uppercase text-primary-600 font-body -mt-1">
              Landscaping
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {links.map((link) => (
            <div key={link.name} className="menu-item">
              <div className="flex items-center">
                <Link
                  href={link.href}
                  onClick={!link.children ? onClose : undefined}
                  className={cn(
                    "flex-1 px-4 py-3 rounded-xl text-base font-medium font-body transition-all",
                    pathname === link.href
                      ? "text-primary-600 bg-primary-600/10"
                      : "text-foreground/70 hover:text-primary-600 hover:bg-primary-600/5"
                  )}
                >
                  {link.name}
                </Link>
                {link.children && (
                  <button
                    onClick={() =>
                      setExpandedItem(expandedItem === link.name ? null : link.name)
                    }
                    className="p-3 rounded-xl hover:bg-muted transition-colors"
                  >
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        expandedItem === link.name && "rotate-180"
                      )}
                    />
                  </button>
                )}
              </div>

              {link.children && expandedItem === link.name && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary-600/20 pl-4">
                  {link.children.map((child) => {
                    const Icon = child.icon
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary-600/5 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-primary-600" />
                        <span className="text-sm font-body text-foreground/70">
                          {child.name}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="menu-item border-t border-border pt-6 mt-4 space-y-3">
          <a
            href={`tel:${settings.phone}`}
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary-600 transition-colors font-body"
          >
            <Phone className="w-4 h-4" />
            {settings.phone}
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary-600 transition-colors font-body"
          >
            <Mail className="w-4 h-4" />
            {settings.email}
          </a>
          <p className="flex items-center gap-3 text-sm text-muted-foreground font-body">
            <MapPin className="w-4 h-4" />
            {settings.address}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={settings.socialLinks.instagram}
              className="w-10 h-10 rounded-xl bg-muted hover:bg-primary-600 hover:text-white flex items-center justify-center transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={settings.socialLinks.facebook}
              className="w-10 h-10 rounded-xl bg-muted hover:bg-primary-600 hover:text-white flex items-center justify-center transition-all"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href={settings.socialLinks.twitter}
              className="w-10 h-10 rounded-xl bg-muted hover:bg-primary-600 hover:text-white flex items-center justify-center transition-all"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
          </div>

          <Button variant="gradient" size="lg" className="w-full mt-4">
            <Phone className="w-4 h-4" />
            Get Free Quote
          </Button>
        </div>
      </div>
    </Sheet>
  )
}