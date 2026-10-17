import { useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Single-series vertical bar chart. Bars start at zero, one hue, per-bar hover tooltip.
 * data: [{ label, value }]
 */
export default function BarChart({ data, max, ticks, format = (v) => v, tooltip, height = "h-56" }) {
  const [hover, setHover] = useState(null)
  const top = max ?? Math.max(...data.map((d) => d.value))
  const scale = (v) => `${(v / top) * 100}%`
  const axisTicks = ticks ?? [0, top / 4, top / 2, (top * 3) / 4, top]

  return (
    <div>
      <div className={cn("relative mt-4 pl-11", height)}>
        {axisTicks.map((t) => (
          <div key={t} className="absolute left-11 right-0 border-t border-slate-100" style={{ bottom: scale(t) }}>
            <span className="absolute -left-11 -top-2 w-9 text-right text-[11px] text-navy/45">{format(t)}</span>
          </div>
        ))}
        <div className="relative flex h-full items-end gap-2 sm:gap-4">
          {data.map((d, i) => (
            <div
              key={d.label}
              className="relative flex h-full flex-1 cursor-default items-end justify-center"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <div
                className={cn(
                  "w-full max-w-[36px] rounded-t-[4px] bg-[#3a5bd9] transition-opacity",
                  hover !== null && hover !== i && "opacity-40"
                )}
                style={{ height: scale(d.value) }}
              />
              {hover === i && (
                <div
                  className="pointer-events-none absolute z-10 -translate-y-2 whitespace-nowrap rounded-lg bg-navy px-2.5 py-1.5 text-[12px] text-white shadow-lg"
                  style={{ bottom: scale(d.value) }}
                >
                  {tooltip ? tooltip(d) : (
                    <>
                      <span className="font-semibold">{format(d.value)}</span> · {d.label}
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex gap-2 pl-11 sm:gap-4">
        {data.map((d) => (
          <span key={d.label} className="flex-1 truncate text-center text-[12px] text-navy/60">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}
