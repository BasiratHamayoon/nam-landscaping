import { cn } from "@/lib/utils"

export default function Badge({ className, variant = "default", children, ...props }) {
  const variants = {
    default: "bg-primary-600/8 text-primary-700 dark:text-primary-400 border-primary-600/15",
    secondary: "bg-cream-dark text-foreground/70 border-cream-dark dark:bg-muted dark:text-muted-foreground",
    outline: "border text-foreground/60",
    gold: "bg-gold/10 text-gold-dark border-gold/20",
    pill: "bg-foreground text-background border-foreground",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-1.5 text-[11px] font-accent font-medium uppercase tracking-[0.15em] transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}