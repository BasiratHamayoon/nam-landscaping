import { cn } from "@/lib/utils"

export default function Badge({ className, variant = "default", children, ...props }) {
  const variants = {
    default: "bg-primary-600/10 text-primary-700 dark:text-primary-400 border-primary-600/20",
    secondary: "bg-primary-50 text-primary-800 border-primary-200 dark:bg-primary-900/30 dark:text-primary-300",
    outline: "border-2 text-foreground",
    gold: "bg-gold/10 text-gold-dark border-gold/20",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors font-body",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}