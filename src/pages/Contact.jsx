import { useState } from "react"
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react"

import PageHero, { IconBox, SectionHeading } from "@/components/PageHero"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const channels = [
  { icon: Phone, title: "Call Us", lines: ["+91 62803 47210"] },
  { icon: Mail, title: "Email Us", lines: ["hello@schulflow.com", "support@schulflow.com"] },
  { icon: MapPin, title: "Visit Us", lines: ["Noida, India"] },
  { icon: Clock, title: "Working Hours", lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Support: 24/7"] },
]

const faqs = [
  { q: "How quickly will I get a response?", a: "Our team replies to all enquiries within one business day, usually much sooner." },
  { q: "Can I book a live demo?", a: "Yes. Choose “Book a demo” in the form and we will schedule a 30-minute walkthrough at a time that suits you." },
  { q: "Do you provide on-site training?", a: "We offer free online training for all plans and on-site training for Premium customers." },
]

const topics = ["Book a demo", "Pricing & plans", "Technical support", "Partnership", "Other"]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [topic, setTopic] = useState(topics[0])

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: send the form data to your backend / email service
    setSent(true)
  }

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="We'd love to hear from you"
        title="Get in"
        highlight="Touch"
        description="Have a question, need a demo or want help choosing a plan? Send us a message and our team will get back to you shortly."
      />

      <section className="bg-white py-14 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12">
          {/* Contact channels */}
          <div className="space-y-4">
            {channels.map(({ icon, title, lines }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_6px_24px_-14px_rgba(17,35,61,0.2)]"
              >
                <IconBox icon={icon} />
                <div>
                  <h3 className="text-[15px] font-semibold text-navy">{title}</h3>
                  {lines.map((l) => (
                    <p key={l} className="mt-1 text-[13px] text-navy/70">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-slate-100 bg-[#fffcf1] p-6 shadow-soft sm:p-8">
            {sent ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-16 w-16 text-[#22a447]" />
                <h2 className="mt-4 text-2xl font-bold text-navy">Thank you!</h2>
                <p className="mt-2 max-w-sm text-sm text-navy/70">
                  Your message has been received. Our team will get back to you within one business day.
                </p>
                <Button variant="outline-brand" className="mt-6" onClick={() => setSent(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-[22px] font-bold text-navy sm:text-2xl">Send us a message</h2>
                <p className="mt-1 text-[13px] text-navy/60">Fields marked * are required.</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={
                        "rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors " +
                        (topic === t ? "border-primary bg-primary text-navy" : "border-navy/15 bg-white text-navy/70 hover:border-primary")
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name *</Label>
                    <Input id="name" required placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required placeholder="you@school.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+91 00000 00000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school">School name</Label>
                    <Input id="school" placeholder="Your school" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" required placeholder="Tell us how we can help..." />
                  </div>
                </div>

                <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
                  Send Message <Send />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="Quick answers" title="Before You Reach Out" />
          <Accordion type="single" collapsible className="mt-8 rounded-2xl bg-white px-6 shadow-soft">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f-${i}`} className="border-slate-100 last:border-0">
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  )
}
