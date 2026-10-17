import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

/** Cream banner used at the top of every inner page. */
export default function PageHero({ eyebrow, title, highlight, description, crumb, children, className }) {
  return (
    <section className={cn("relative overflow-hidden bg-[#fffcf1]", className)}>
      {/* decorative blobs, echoing the home hero */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <svg
        className="pointer-events-none absolute right-[8%] top-10 hidden h-10 w-12 text-primary lg:block"
        viewBox="0 0 48 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M8 30 L2 22 M20 22 L18 8 M34 26 L44 14" />
      </svg>

      <div className="container relative py-12 text-center sm:py-16 lg:py-20">
        {crumb && (
          <nav className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#fff3cf] px-4 py-1.5 text-[12px] font-medium text-navy/70 sm:text-[13px]">
            <Link to="/" className="hover:text-navy">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-navy">{crumb}</span>
          </nav>
        )}
        {eyebrow && (
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#eba800] sm:text-[13px]">{eyebrow}</p>
        )}
        <h1 className="mx-auto mt-2 max-w-3xl text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[42px] lg:text-[48px]">
          {title} {highlight && <span className="text-primary">{highlight}</span>}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy/75 sm:text-base">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, description, align = "center", className }) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && (
        <p className="text-[12px] font-semibold uppercase tracking-wide text-[#eba800] sm:text-[13px]">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-[26px] font-bold leading-tight text-navy sm:text-[30px] xl:text-[32px]">{title}</h2>
      {description && <p className="mt-3 text-[14px] leading-relaxed text-navy/75 sm:text-[15px]">{description}</p>}
    </div>
  )
}

export function IconBox({ icon: Icon, className, iconClassName }) {
  return (
    <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#fff1b8] text-[#f2b200]", className)}>
      <Icon className={cn("h-6 w-6", iconClassName)} strokeWidth={2.2} />
    </span>
  )
}
