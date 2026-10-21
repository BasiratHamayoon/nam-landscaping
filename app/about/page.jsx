import { AboutHero } from "@/components/about/AboutHero"
import { AboutStory } from "@/components/about/AboutStory"
import { AboutStats } from "@/components/about/AboutStats"
import { AboutValues } from "@/components/about/AboutValues"
import { AboutCTA } from "@/components/about/AboutCTA"

export const metadata = {
  title: "About Us | NAM Landscaping",
  description: "Learn about NAM Landscaping's history, mission, and the core values that drive our exceptional landscape designs in the UAE.",
}

export default function AboutPage() {
  return (
    <main className="w-full overflow-hidden">
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutValues />
      <AboutCTA />
    </main>
  )
}