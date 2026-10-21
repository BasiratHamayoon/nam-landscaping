"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function AboutCTA() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-primary-900/5 dark:bg-primary-900/10" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-heading text-foreground mb-6">
          Ready to Bring Your <span className="text-primary-600 dark:text-primary-400 italic">Vision</span> to Life?
        </h2>
        <p className="text-lg text-muted-foreground mb-10 font-sans max-w-2xl mx-auto">
          Partner with NAM Landscaping to create an outdoor sanctuary that reflects your lifestyle and enhances your property’s value.
        </p>
        <Link href="/contact">
          <Button className="rounded-full px-8 py-6 text-lg cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 flex items-center gap-3 mx-auto">
            Schedule a Consultation
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}