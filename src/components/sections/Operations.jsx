import { Link } from "react-router-dom"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { asset } from "@/lib/utils"

const points = [
  "Access from anywhere, anytime",
  "Secure cloud-based platform",
  "Customizable for schools of all sizes",
]

export default function Operations() {
  return (
    <section className="relative overflow-hidden bg-cream py-10 sm:py-14 lg:py-4">
      <div className="container grid items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <img
          src={asset("/images/classroom.png")}
          alt="Teacher helping students on a laptop"
          className="mx-auto w-full max-w-[560px] lg:-ml-4"
        />

        <div className="relative">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#eba800] sm:text-[13px]">
            For a smarter school
          </p>
          <h2 className="mt-2 text-[26px] font-bold leading-tight text-navy sm:text-[30px] xl:text-[32px]">
            Simplify Daily Operations,
            <br className="hidden sm:block" /> Focus on What Matters
          </h2>
          <p className="mt-4 max-w-[480px] text-[14px] leading-relaxed text-navy/80 sm:text-[15px]">
            Our School Management System helps educational institutions save time, reduce manual work and provide a
            better learning experience for students, parents and staff.
          </p>

          <ul className="mt-5 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-[14px] text-navy/85">
                <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-primary">
                  <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <Button asChild className="mt-7 h-11 px-6">
            <Link to="/about">
              Learn More <ArrowRight />
            </Link>
          </Button>

          <svg
            viewBox="0 0 150 150"
            fill="none"
            className="pointer-events-none absolute -right-4 top-[38%] hidden w-[140px] text-primary md:block xl:-right-12"
          >
            <path
              d="M70 30 L140 8 L110 70 L96 46 Z M96 46 L140 8 M96 46 L92 62 L104 56"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M96 70 C 100 90, 104 100, 88 108 C 70 116, 62 96, 78 92 C 94 88, 92 120, 70 132 C 56 140, 40 142, 20 140"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="6 7"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
