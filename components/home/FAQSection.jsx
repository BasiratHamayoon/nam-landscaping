"use client"
import { useSelector, useDispatch } from "react-redux"
import { toggleFaq } from "@/store/slices/faqSlice"
import { faqData } from "@/store/data/faqData"
import SectionHeading from "@/components/shared/SectionHeading"
import FadeIn from "@/components/animations/FadeIn"
import { Plus, Minus, MessageCircle } from "lucide-react"
import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export default function FAQSection() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.faq?.items || faqData)
  const openIndex = useSelector((state) => state.faq?.openIndex ?? null)

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionHeading
              badge="FAQ"
              title="Common Questions"
              subtitle="Everything you need to know about our landscaping services."
              center={false}
            />
            <div className="p-8 rounded-3xl bg-card border border-border">
              <p className="text-muted-foreground text-sm font-body mb-5 leading-relaxed">
                Can&apos;t find what you&apos;re looking for? Our team is always ready to help.
              </p>
              <Button variant="dark" size="md" className="group">
                <MessageCircle className="w-4 h-4" />
                Contact Us
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((faq, index) => (
              <FadeIn key={faq.id} delay={index * 0.05}>
                <div
                  className={cn(
                    "rounded-2xl border transition-all duration-500 overflow-hidden",
                    openIndex === index
                      ? "border-primary-600/20 bg-card shadow-lg shadow-primary-600/5"
                      : "border-border bg-card hover:border-border/80"
                  )}
                >
                  <button
                    onClick={() => dispatch(toggleFaq(index))}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-[15px] font-accent font-medium pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500",
                        openIndex === index
                          ? "bg-primary-600 text-white"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {openIndex === index ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                  <div
                    className={cn(
                      "transition-all duration-500",
                      openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="px-5 pb-5 text-muted-foreground text-sm leading-[1.8] font-body">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}