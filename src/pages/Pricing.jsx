import { useState } from "react"
import { ArrowRight, Check, Minus, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

import PageHero, { SectionHeading } from "@/components/PageHero"
import CallToAction from "@/components/sections/CallToAction"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    tagline: "For small schools getting started",
    monthly: 2999,
    students: "Up to 300 students",
    features: ["Student & teacher management", "Attendance tracking", "Fee management", "Parent mobile app", "Email support"],
  },
  {
    name: "Standard",
    tagline: "Everything a growing school needs",
    monthly: 5999,
    popular: true,
    students: "Up to 1,000 students",
    features: [
      "Everything in Starter",
      "Exams & report cards",
      "Timetable & homework",
      "SMS & in-app notifications",
      "Reports & analytics",
      "Priority support",
    ],
  },
  {
    name: "Premium",
    tagline: "For large schools and groups",
    monthly: 9999,
    students: "Unlimited students",
    features: [
      "Everything in Standard",
      "Library & transport",
      "Multi-branch management",
      "Custom branding & domain",
      "API access",
      "Dedicated account manager",
    ],
  },
]

const comparison = [
  { feature: "Students", values: ["300", "1,000", "Unlimited"] },
  { feature: "Admin users", values: ["3", "10", "Unlimited"] },
  { feature: "Attendance & fees", values: [true, true, true] },
  { feature: "Parent & student app", values: [true, true, true] },
  { feature: "Exams & report cards", values: [false, true, true] },
  { feature: "Timetable & homework", values: [false, true, true] },
  { feature: "SMS notifications", values: [false, true, true] },
  { feature: "Library & transport", values: [false, false, true] },
  { feature: "Multi-branch", values: [false, false, true] },
  { feature: "Support", values: ["Email", "Priority", "Dedicated"] },
]

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes. Every plan comes with a 14-day free trial with full access to all features. No credit card is required to get started.",
  },
  {
    q: "Can I change my plan later?",
    a: "Absolutely. You can upgrade or downgrade at any time from your account settings, and we will adjust your billing automatically.",
  },
  {
    q: "Do you help with data migration?",
    a: "Our onboarding team will import your existing student, staff and fee records from spreadsheets or your previous software at no extra cost.",
  },
  {
    q: "Is our school data secure?",
    a: "Your data is encrypted in transit and at rest, backed up daily, and hosted on secure cloud infrastructure with role-based access controls.",
  },
  {
    q: "Do you offer discounts for multiple branches?",
    a: "Yes. Contact our sales team for special pricing for school groups, trusts and institutions with multiple campuses.",
  },
]

const formatINR = (n) => "₹" + n.toLocaleString("en-IN")

function Cell({ value }) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-[#22a447]" strokeWidth={3} />
  if (value === false) return <Minus className="mx-auto h-5 w-5 text-navy/25" />
  return <span className="text-[13px] font-medium text-navy">{value}</span>
}

export default function Pricing() {
  const [yearly, setYearly] = useState(true)

  return (
    <>
      <PageHero
        crumb="Pricing"
        eyebrow="Simple, transparent pricing"
        title="Plans That Grow"
        highlight="With Your School"
        description="Choose the plan that fits your school today. Every plan includes a 14-day free trial, free onboarding and free updates."
      >
        <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-soft">
          <span className={cn("text-sm font-medium", !yearly ? "text-navy" : "text-navy/50")}>Monthly</span>
          <Switch checked={yearly} onCheckedChange={setYearly} aria-label="Toggle yearly billing" />
          <span className={cn("text-sm font-medium", yearly ? "text-navy" : "text-navy/50")}>Yearly</span>
          <span className="rounded-full bg-[#e8f8ed] px-2.5 py-0.5 text-[11px] font-semibold text-[#22a447]">Save 20%</span>
        </div>
      </PageHero>

      {/* Plans */}
      <section className="relative bg-white pb-14 sm:pb-20">
        <div className="absolute inset-x-0 top-0 h-24 bg-[#fffcf1]" />
        <div className="container relative grid gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan) => {
            const price = yearly ? Math.round(plan.monthly * 0.8) : plan.monthly
            return (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-white p-7 shadow-[0_10px_40px_-20px_rgba(17,35,61,0.25)] transition-transform hover:-translate-y-1",
                  plan.popular ? "border-2 border-primary md:-my-4 md:py-11" : "border-slate-100"
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-4 py-1 text-[12px] font-semibold text-navy shadow-brand">
                    <Sparkles className="h-3.5 w-3.5" /> Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-navy">{plan.name}</h3>
                <p className="mt-1 text-[13px] text-navy/60">{plan.tagline}</p>
                <p className="mt-6 flex items-end gap-1">
                  <span className="text-[40px] font-bold leading-none text-navy">{formatINR(price)}</span>
                  <span className="mb-1 text-sm text-navy/60">/month</span>
                </p>
                <p className="mt-2 text-[12px] text-navy/55">
                  {yearly ? `Billed yearly at ${formatINR(price * 12)}` : "Billed monthly"}
                </p>
                <p className="mt-5 rounded-lg bg-[#fff8dc] px-3 py-2 text-[13px] font-semibold text-navy">{plan.students}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[14px] text-navy/80">
                      <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-primary">
                        <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-8 h-11 w-full" variant={plan.popular ? "default" : "outline-brand"}>
                  <Link to="/signup">
                    Start Free Trial <ArrowRight />
                  </Link>
                </Button>
              </div>
            )
          })}
        </div>
        <p className="container relative mt-10 text-center text-[13px] text-navy/60">
          Need a custom plan for multiple campuses?{" "}
          <Link to="/contact" className="font-semibold text-navy underline decoration-primary decoration-2 underline-offset-4">
            Talk to sales
          </Link>
        </p>
      </section>

      {/* Comparison */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Compare plans" title="Find the Right Fit" />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-soft">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-[#fffcf1]">
                  <th className="px-5 py-4 text-[13px] font-semibold text-navy/70">Features</th>
                  {plans.map((p) => (
                    <th key={p.name} className="px-5 py-4 text-center text-[14px] font-semibold text-navy">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-slate-100 last:border-0">
                    <td className="px-5 py-3.5 text-[13px] text-navy/80">{row.feature}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className={cn("px-5 py-3.5 text-center", i === 1 && "bg-[#fffbea]")}>
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Can't find the answer you're looking for? Our team is happy to help."
          />
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-slate-100">
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CallToAction title="Start Your 14-Day Free Trial" subtitle="No credit card required. Cancel anytime." />
    </>
  )
}
