import { cn } from "@/lib/utils"

/** Page heading row used at the top of every dashboard module. */
export function ModuleHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-[20px] font-bold text-navy">{title}</h2>
        {subtitle && <p className="text-[13px] text-navy/60">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  )
}

const tones = {
  blue: { card: "bg-[#f4f8ff]", icon: "bg-[#2f6bff]" },
  indigo: { card: "bg-[#eef2ff]", icon: "bg-[#3a5bd9]" },
  green: { card: "bg-[#f0faf3]", icon: "bg-[#22a447]" },
  amber: { card: "bg-[#fff8e6]", icon: "bg-[#f5a300]" },
  red: { card: "bg-red-50", icon: "bg-red-500" },
}

export function StatTile({ label, value, hint, icon: Icon, tone = "blue" }) {
  return (
    <div className={cn("flex items-center gap-4 rounded-2xl p-5 shadow-sm", tones[tone].card)}>
      <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white", tones[tone].icon)}>
        <Icon className="h-6 w-6" strokeWidth={2.2} />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] text-navy/60">{label}</p>
        <p className="truncate text-[22px] font-bold leading-tight text-navy">{value}</p>
        {hint && <p className="truncate text-[12px] text-navy/55">{hint}</p>}
      </div>
    </div>
  )
}

const badgeStyles = {
  green: "bg-[#e8f8ed] text-[#1a7f37]",
  amber: "bg-[#fff4d6] text-[#9a6700]",
  red: "bg-red-50 text-red-700",
  blue: "bg-[#e8f0ff] text-[#2f6bff]",
  gray: "bg-slate-100 text-navy/70",
}

export function Badge({ tone = "gray", children, className }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[12px] font-semibold", badgeStyles[tone], className)}>
      {children}
    </span>
  )
}

/** Segmented button group used as tabs / filters. */
export function Segmented({ options, value, onChange, className }) {
  return (
    <div className={cn("inline-flex gap-1 overflow-x-auto rounded-xl bg-white p-1 shadow-sm", className)}>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "h-9 shrink-0 rounded-lg px-4 text-[13px] font-medium transition-colors",
            value === o ? "bg-primary text-navy" : "text-navy/65 hover:bg-[#fff8dc] hover:text-navy"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export function Panel({ title, subtitle, action, children, className }) {
  return (
    <section className={cn("rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-[16px] font-semibold text-navy">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-[12px] text-navy/60">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export const formatINR = (n) => "₹" + Math.round(n).toLocaleString("en-IN")

export const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
