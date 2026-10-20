"use client"
import { useState, useEffect, useRef } from "react"
import { MessageCircle, X } from "lucide-react"
import { useSelector } from "react-redux"

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const buttonRef = useRef(null)
  const settings = useSelector((state) => state.settings)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const animateButton = async () => {
      if (!isVisible || !buttonRef.current) return
      const { gsap } = await import("gsap")

      gsap.fromTo(
        buttonRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" }
      )

      gsap.to(buttonRef.current, {
        y: -5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1,
      })
    }

    animateButton()
  }, [isVisible])

  if (!isVisible) return null

  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=Hello! I'm interested in your landscaping services.`

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  🌿
                </div>
                <div>
                  <h4 className="font-semibold text-sm font-heading">NAM Landscaping</h4>
                  <p className="text-xs text-white/80 font-body">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="bg-[#e5ddd5] dark:bg-gray-800 p-4">
            <div className="bg-white dark:bg-gray-700 rounded-xl p-3 shadow-sm max-w-[85%]">
              <p className="text-sm text-gray-700 dark:text-gray-200 font-body">
                Hello! 👋 Welcome to NAM Landscaping. How can we help transform your outdoor space today?
              </p>
              <span className="text-[10px] text-gray-400 mt-1 block text-right">
                Just now
              </span>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-green-500 hover:bg-green-600 text-white text-center rounded-xl text-sm font-medium transition-colors font-body"
            >
              Start Chat 💬
            </a>
          </div>
        </div>
      )}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 flex items-center justify-center transition-colors relative"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white animate-pulse">
          1
        </span>
      </button>
    </div>
  )
}