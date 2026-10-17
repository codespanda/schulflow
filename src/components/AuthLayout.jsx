import { useState } from "react"
import { ArrowLeft, Check, Eye, EyeOff, Star } from "lucide-react"
import { Link } from "react-router-dom"

import Logo from "@/components/Logo"
import { ScrollToTop } from "@/components/Layout"
import ScaledDashboard from "@/components/ScaledDashboard"
import { Input } from "@/components/ui/input"
import { asset } from "@/lib/utils"

const perks = ["14-day free trial", "No credit card required", "Free onboarding & data import"]

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      <ScrollToTop />
      <div className="flex flex-col px-4 py-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-navy/70 hover:text-navy">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center py-10">
          <h1 className="text-[28px] font-bold leading-tight text-navy sm:text-[32px]">{title}</h1>
          <p className="mt-2 text-[14px] text-navy/65">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>

        <p className="text-center text-[12px] text-navy/50">© 2026 SchulFlow. All rights reserved.</p>
      </div>

      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#fddc5a] via-[#fed84a] to-[#ffd43c] lg:flex lg:flex-col lg:justify-center lg:px-12 xl:px-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/25 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/20 blur-2xl" />

        <div className="relative">
          <h2 className="max-w-md text-[30px] font-bold leading-tight text-navy xl:text-[34px]">
            Complete School Management, Simplified.
          </h2>
          <ul className="mt-5 space-y-2.5">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[14px] font-medium text-navy/85">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-navy">
                  <Check className="h-3 w-3 text-primary" strokeWidth={3.5} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <ScaledDashboard className="mt-10 max-w-[560px]" />

          <figure className="mt-8 max-w-[560px] rounded-2xl bg-white/70 p-5 backdrop-blur">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-navy text-navy" />
              ))}
            </div>
            <blockquote className="mt-2 text-[14px] leading-relaxed text-navy/85">
              “SchulFlow has made our administrative work so much easier. We save hours every week.”
            </blockquote>
            <figcaption className="mt-3 flex items-center gap-3">
              <img src={asset("/images/avatar-priya.png")} alt="" className="h-9 w-9 rounded-full" />
              <span>
                <span className="block text-[13px] font-semibold text-navy">Priya Sharma</span>
                <span className="block text-[11px] text-navy/60">Principal, Green Valley School</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </aside>
    </div>
  )
}

export function PasswordInput(props) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input type={show ? "text" : "password"} className="pr-11" {...props} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/50 hover:text-navy"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}
