"use client"

import { useState } from "react"
import { Quote, Star, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function TestimonialCard({ testimonial, isActive = false, className }) {
  const [avatarError, setImgError] = useState(false)

  if (!testimonial) return null

  const {
    name = "Valued Client",
    role = "Homeowner",
    location = "Dubai, UAE",
    content = "NAM Landscaping transformed our outdoor space beyond our expectations. The attention to detail and craftsmanship were outstanding.",
    rating = 5,
    avatar = "/images/16.jpg",
    projectType = "Villa Landscaping",
  } = testimonial

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between h-full p-8 lg:p-9 rounded-3xl transition-all duration-500 border backdrop-blur-xl group overflow-hidden",
        isActive
          ? "bg-white/[0.08] border-primary-500/40 shadow-2xl shadow-primary-950/50"
          : "bg-white/[0.03] border-white/10 hover:border-white/20",
        className
      )}
    >
      {/* Subtle Background Glow Accent for Active Card */}
      {isActive && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
      )}

      <div>
        {/* Top Meta: Stars & Project Badge */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary-400 bg-primary-950/80 border border-primary-500/30 px-3 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" />
            {projectType}
          </span>
        </div>

        {/* Decorative Quote Icon */}
        <Quote className="w-10 h-10 text-primary-500/20 mb-4 group-hover:text-primary-500/30 transition-colors" />

        {/* Content Body */}
        <p className="font-body text-white/90 text-sm lg:text-base leading-relaxed mb-8 italic">
          "{content}"
        </p>
      </div>

      {/* Author Details Footer */}
      <div className="flex items-center gap-4 pt-6 border-t border-white/10 mt-auto">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary-500/30 shrink-0 bg-primary-950">
          {!avatarError ? (
            <img
              src={avatar}
              alt={name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary-800 text-white font-bold flex items-center justify-center text-base">
              {name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <h4 className="font-heading text-lg text-white font-semibold truncate leading-tight">
            {name}
          </h4>
          <p className="text-xs text-white/60 font-body truncate mt-0.5">
            {role} • <span className="text-primary-400">{location}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard