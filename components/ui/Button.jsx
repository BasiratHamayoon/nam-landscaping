import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-400 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: 
          "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40 hover:-translate-y-0.5 border border-primary-500/50",
        destructive: 
          "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        outline: 
          "border border-white/30 bg-transparent hover:bg-white/10 text-white backdrop-blur-sm",
        secondary: 
          "bg-muted text-foreground hover:bg-muted/80",
        ghost: 
          "hover:bg-muted text-foreground",
        link: 
          "text-primary-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export default Button