"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      e.target.reset()
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1500)
  }

  return (
    <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
      <h3 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h3>
      <p className="text-muted-foreground font-sans mb-8">
        Fill out the form below and we will get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-foreground">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors font-sans"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-foreground">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors font-sans"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold text-foreground">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              required
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors font-sans"
              placeholder="+971 50 123 4567"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="service" className="text-sm font-semibold text-foreground">
              Service of Interest
            </label>
            <select
              id="service"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors font-sans appearance-none"
            >
              <option value="">Select a service...</option>
              <option value="landscape-design">Landscape Design</option>
              <option value="hardscaping">Hardscaping & Paving</option>
              <option value="pool-design">Pool & Water Features</option>
              <option value="maintenance">Garden Maintenance</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-semibold text-foreground">
            Your Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors font-sans resize-none"
            placeholder="Tell us about your project..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full py-4 text-base cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Sending...</span>
          ) : isSuccess ? (
            <span>Message Sent Successfully!</span>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}