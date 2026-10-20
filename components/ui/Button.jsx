"use client"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const buttonVariants = {
  default: "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40",
  secondary: "bg-primary-50 text-primary-800 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-200 dark:hover:bg-primary-900/50",
  outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white",
  ghost: "hover:bg-primary-600/10 text-foreground",
  gold: "bg-gradient-to-r from-gold-dark via-gold to-gold-light text-white shadow-lg hover:shadow-xl",
  gradient: "bg-gradient-to-r from-primary-600 via-emerald-600 to-primary-700 text-white shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50",
  white: "bg-white text-primary-800 hover:bg-gray-50 shadow-lg",
}

const buttonSizes = {
  sm: "h-9 px-4 text-sm rounded-lg",
  md: "h-11 px-6 text-sm rounded-xl",
  lg: "h-12 px-8 text-base rounded-xl",
  xl: "h-14 px-10 text-lg rounded-2xl",
  icon: "h-10 w-10 rounded-xl",
}

const Button = forwardRef(({ className, variant = "default", size = "md", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50 font-body cursor-pointer",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"
export default Button