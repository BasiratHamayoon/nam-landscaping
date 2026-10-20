"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import { settingsData } from "@/store/data/settingsData"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/layout/ThemeToggle"
import MobileMenu from "@/components/layout/MobileMenu"
import Button from "@/components/ui/Button"
import MagneticButton from "@/components/animations/MagneticButton"
import {
  Menu,
  Phone,
  ChevronDown,
  Trees,
  Scissors,
  Waves,
  Droplets,
  Home,
  Sun,
  Leaf,
} from "lucide-react"

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "Landscaping & Garden Design", href: "/services#landscaping", icon: Trees },
      { name: "Garden Maintenance", href: "/services#maintenance", icon: Scissors },
      { name: "Swimming Pool Services", href: "/services#pool", icon: Waves },
      { name: "Irrigation & Artificial Grass", href: "/services#irrigation", icon: Droplets },
      { name: "Pergolas & Structures", href: "/services#pergolas", icon: Home },
      { name: "Outdoor Lighting", href: "/services#lighting", icon: Sun },
    ],
  },
  { name: "Projects", href: "/projects" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const navRef = useRef(null)
  const settings = useSelector((state) => state.settings || settingsData)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible || !navRef.current) return

    const animateNav = async () => {
      const { gsap } = await import("gsap")
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
    }
    animateNav()
  }, [isVisible])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
          !isVisible && "opacity-0 -translate-y-full",
          isScrolled
            ? "glass shadow-lg shadow-black/5 py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                  isScrolled
                    ? "bg-primary-600 text-white"
                    : "bg-white/10 backdrop-blur-sm text-white border border-white/20"
                )}
              >
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span
                  className={cn(
                    "text-xl font-bold font-heading tracking-tight transition-colors",
                    isScrolled ? "text-foreground" : "text-white"
                  )}
                >
                  NAM
                </span>
                <span
                  className={cn(
                    "block text-[10px] tracking-[3px] uppercase font-body transition-colors -mt-1",
                    isScrolled ? "text-primary-600" : "text-white/70"
                  )}
                >
                  Landscaping
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => link.children && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium font-body transition-all duration-300 flex items-center gap-1",
                      pathname === link.href
                        ? isScrolled
                          ? "text-primary-600 bg-primary-600/10"
                          : "text-white bg-white/15"
                        : isScrolled
                        ? "text-foreground/70 hover:text-primary-600 hover:bg-primary-600/5"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {link.name}
                    {link.children && (
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-300",
                          activeDropdown === link.name && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {link.children && (
                    <div
                      className={cn(
                        "absolute top-full left-0 mt-2 w-72 rounded-2xl glass-card p-2 transition-all duration-300 origin-top",
                        activeDropdown === link.name
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      )}
                    >
                      {link.children.map((child) => {
                        const Icon = child.icon
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-600/10 transition-colors group/item"
                          >
                            <div className="w-9 h-9 rounded-lg bg-primary-600/10 flex items-center justify-center text-primary-600 group-hover/item:bg-primary-600 group-hover/item:text-white transition-all duration-300">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-body text-foreground/80 group-hover/item:text-primary-600 transition-colors">
                              {child.name}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <a href={`tel:${settings.phone}`}>
                <MagneticButton>
                  <Button
                    variant={isScrolled ? "default" : "white"}
                    size="md"
                    className="gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Free Quote
                  </Button>
                </MagneticButton>
              </a>
            </div>

            <div className="flex lg:hidden items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileOpen(true)}
                className={cn(
                  "p-2 rounded-xl transition-colors",
                  isScrolled
                    ? "hover:bg-muted text-foreground"
                    : "hover:bg-white/10 text-white"
                )}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        links={navLinks}
        settings={settings}
      />
    </>
  )
}