import GSAPProvider from "@/components/animations/GSAPProvider"
import AboutPreview from "@/components/home/AboutPreview"
import CTASection from "@/components/home/CTASection"
import FAQSection from "@/components/home/FAQSection"
import HeroSection from "@/components/home/HeroSection"
import ProjectsShowcase from "@/components/home/ProjectsShowcase"
import ServicesSection from "@/components/home/ServicesSection"
import StatsCounter from "@/components/home/StatsCounter"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import WhyChooseUs from "@/components/home/WhyChooseUs"

export default function HomePage() {
  return (
    <GSAPProvider>
      <HeroSection />
      <StatsCounter />
      <ServicesSection />
      <AboutPreview />
      <ProjectsShowcase />
      <WhyChooseUs />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </GSAPProvider>
  )
}