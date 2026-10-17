import { Link } from "react-router-dom"

import { asset, cn } from "@/lib/utils"

export default function Logo({ variant = "light", className }) {
  const dark = variant === "dark"
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <img
        src={dark ? asset("/images/logo-footer.png") : asset("/images/logo.png")}
        alt=""
        className="h-9 w-auto sm:h-10"
      />
      <span className="leading-none">
        <span className={cn("block text-[21px] font-bold tracking-tight sm:text-[23px]", dark ? "text-white" : "text-navy")}>
          SchulFlow
        </span>
        <span className={cn("mt-1 block text-[10px] font-medium sm:text-[11px]", dark ? "text-white/80" : "text-navy/80")}>
          School Management System
        </span>
      </span>
    </Link>
  )
}
