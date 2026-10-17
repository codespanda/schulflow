import { Cloud, Headphones, Settings, ShieldCheck, SlidersHorizontal, ChartNoAxesColumnIncreasing } from "lucide-react"

const reasons = [
  { icon: ShieldCheck, title: "Secure & Reliable", text: "Your data is always protected with advanced security." },
  { icon: Cloud, title: "Cloud Based", text: "Access from any device, anytime, anywhere." },
  { icon: Settings, title: "Easy to Use", text: "Simple and intuitive interface for everyone." },
  { icon: Headphones, title: "Dedicated Support", text: "We're here whenever you need us." },
  { icon: SlidersHorizontal, title: "Fully Customizable", text: "Tailor it to your school's unique needs." },
  { icon: ChartNoAxesColumnIncreasing, title: "Affordable Pricing", text: "Great features at competitive rates." },
]

export default function WhyChoose() {
  return (
    <section className="bg-gradient-to-b from-[#fef9eb] to-[#fefaf0] py-12 sm:py-14">
      <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.6fr] lg:gap-12">
        <div className="pt-1">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#eba800] sm:text-[13px]">
            Why choose us
          </p>
          <h2 className="mt-2 text-[26px] font-bold leading-tight text-navy sm:text-[30px] xl:text-[32px]">
            Built for Modern Schools
          </h2>
          <p className="mt-4 max-w-[400px] text-[14px] leading-relaxed text-navy/80 sm:text-[15px]">
            Everything you need to manage your school efficiently, safely and with confidence.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#fff1b8] text-[#f2b200]">
                <Icon className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <h3 className="mt-3 text-[14px] font-semibold text-navy sm:text-[15px]">{title}</h3>
              <p className="mt-1.5 max-w-[190px] text-[12.5px] leading-[1.6] text-navy/65 sm:text-[13px]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
