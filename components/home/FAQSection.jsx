"use client"
import { useSelector, useDispatch } from "react-redux"
import { toggleFaq } from "@/store/slices/faqSlice"
import SectionHeading from "../shared/SectionHeading"
import FadeIn from "../animations/FadeIn"
import { ChevronDown, MessageCircle } from "lucide-react"
import Button from "../ui/Button"
import { cn } from "@/lib/utils"
import { useRef, useEffect } from "react"

export default function FAQSection() {
  const dispatch = useDispatch()
  const { items, openIndex } = useSelector((state) => state.faq)

  return (
    <section id="faq" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="container-custom relative">
        <SectionHeading
          badge="FAQs"
          title="Frequently Asked Questions"
          subtitle="Find answers to commonly asked questions about our landscaping services."
        />

        <div className="max-w-3xl mx-auto">
          {items.map((faq, index) => (
            <FadeIn key={faq.id} delay={index * 0.08}>
              <div
                className={cn(
                  "mb-4 rounded-2xl border transition-all duration-300",
                  openIndex === index
                    ? "border-primary/30 bg-primary/5 shadow-lg shadow-primary/5"
                    : "border-border bg-card hover:border-primary/20"
                )}
              >
                <button
                  onClick={() => dispatch(toggleFaq(index))}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base font-semibold font-heading pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                      openIndex === index
                        ? "bg-primary text-white rotate-180"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index ? "max-h-96" : "max-h-0"
                  )}
                >
                  <p className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed font-body">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}

          <FadeIn className="text-center mt-10 p-8 rounded-2xl bg-muted/50 border border-border">
            <p className="text-muted-foreground mb-4 font-body">
              Still have questions? We&apos;re here to help!
            </p>
            <Button variant="gradient" size="lg" className="group">
              <MessageCircle className="w-4 h-4" />
              Contact Us
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}