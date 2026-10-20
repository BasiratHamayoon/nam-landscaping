"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useSelector } from "react-redux"
import { X, Phone, Mail, MapPin, Leaf, ArrowRight } from "lucide-react"
import gsap from "gsap"
import { Button } from "@/components/ui/Button"

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function MobileLogo() {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-sm">
          <Leaf className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="font-heading text-lg font-bold tracking-wider leading-none text-foreground">
            NAM
          </span>
          <span className="text-[8px] uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 font-semibold mt-0.5">
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
      className="h-8 w-auto object-contain"
    />
  )
}

const defaultSettings = {
  phone: "+971 50 123 4567",
  email: "info@namlandscaping.ae",
  address: "Dubai, United Arab Emirates",
}

export function MobileMenu({ isOpen, onClose, links }) {
  const menuRef = useRef(null)
  const overlayRef = useRef(null)

  const reduxSettings = useSelector((state) => state.settings?.data || state.settings)
  const settings =
    reduxSettings && typeof reduxSettings === "object" && !Array.isArray(reduxSettings)
      ? { ...defaultSettings, ...reduxSettings }
      : defaultSettings

  useEffect(() => {
    if (!isOpen) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      gsap.fromTo(
        menuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" }
      )
      gsap.fromTo(
        menuRef.current?.querySelectorAll(".menu-link") || [],
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.2, ease: "power3.out" }
      )
    }, menuRef)

    return () => ctx.revert()
  }, [isOpen])

  const handleClose = () => {
    const ctx = gsap.context(() => {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power3.in",
        onComplete: onClose,
      })
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 })
    }, menuRef)
    return () => ctx.revert()
  }

  if (!isOpen) return null

  const phone = settings?.phone || defaultSettings.phone
  const email = settings?.email || defaultSettings.email
  const address = settings?.address || defaultSettings.address

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div
        ref={menuRef}
        className="absolute top-0 right-0 h-full w-[85vw] max-w-xs bg-white dark:bg-[#0a0f0c] shadow-2xl flex flex-col justify-between overflow-y-auto"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <MobileLogo />
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-6 py-6 gap-1">
          {links &&
            links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleClose}
                className="menu-link font-medium text-lg text-foreground hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2.5 border-b border-border/40 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </Link>
            ))}

          <div className="pt-4">
            <Link href="/contact" onClick={handleClose}>
              <Button className="w-full rounded-full py-3 text-sm font-semibold">
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </nav>

        <div className="p-6 border-t border-border bg-muted/30 dark:bg-black/20 space-y-3">
          <div className="space-y-2 text-xs text-muted-foreground">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2.5 hover:text-primary-600 transition-colors font-body"
            >
              <Phone className="w-3.5 h-3.5 text-primary-600 shrink-0" />
              <span>{phone}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2.5 hover:text-primary-600 transition-colors font-body truncate"
            >
              <Mail className="w-3.5 h-3.5 text-primary-600 shrink-0" />
              <span className="truncate">{email}</span>
            </a>
            <p className="flex items-center gap-2.5 font-body">
              <MapPin className="w-3.5 h-3.5 text-primary-600 shrink-0" />
              <span>{address}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 pt-1 border-t border-border/50">
            <a href="#" className="text-muted-foreground hover:text-primary-600 transition-colors">
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary-600 transition-colors">
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu