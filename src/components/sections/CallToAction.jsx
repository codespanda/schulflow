import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { asset } from "@/lib/utils"

export default function CallToAction({
  title = "Get Started with SchulFlow Today",
  subtitle = "Join thousands of schools already using our platform.",
}) {
  return (
    <section className="bg-white pb-4 pt-8 sm:pt-6">
      <div className="container">
        <div className="relative flex flex-col items-center gap-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#fddc5a] via-[#fed84a] to-[#ffd43c] px-6 py-8 text-center md:flex-row md:gap-6 md:px-6 md:py-4 md:text-left lg:rounded-xl">
          <img
            src={asset("/images/cta-books.png")}
            alt=""
            className="w-[140px] md:w-[160px] lg:w-[170px]"
          />
          <div className="flex-1 md:text-center">
            <h2 className="text-[22px] font-bold leading-tight text-navy sm:text-[26px] xl:text-[28px]">
              {title}
            </h2>
            <p className="mt-2 text-[13px] text-navy/80 sm:text-[14px]">{subtitle}</p>
          </div>
          <Button asChild variant="secondary" size="lg" className="px-7 md:mr-4">
            <Link to="/signup">
              Get Started Free <ArrowRight />
            </Link>
          </Button>

          <svg
            className="pointer-events-none absolute right-5 top-3 hidden h-6 w-8 text-navy/40 md:block"
            viewBox="0 0 32 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M2 10 L30 2 L22 22 L16 13 Z M16 13 L30 2" strokeLinejoin="round" />
          </svg>
          <svg
            className="pointer-events-none absolute bottom-2 right-8 hidden h-8 w-8 text-white/60 md:block"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="16" cy="16" r="10" />
          </svg>
        </div>
      </div>
    </section>
  )
}
