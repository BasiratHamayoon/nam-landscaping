import { ContactHero } from "@/components/contact/ContactHero"
import { ContactLayout } from "@/components/contact/ContactLayout"

export const metadata = {
  title: "Contact Us | NAM Landscaping",
  description: "Get in touch with NAM Landscaping in Dubai. Request a consultation, ask for a quote, or speak to our landscaping experts directly.",
}

export default function ContactPage() {
  return (
    <main className="w-full overflow-hidden">
      <ContactHero />
      <ContactLayout />
    </main>
  )
}