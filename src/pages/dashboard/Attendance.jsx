import { useMemo, useState } from "react"
import { CheckCheck, CheckCircle2, Clock, Save, UserCheck, UserX, Plane } from "lucide-react"

import { initials } from "@/components/dashboard/DashboardLayout"
import { ModuleHeader, Panel, StatTile } from "@/components/dashboard/ui"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { classes } from "@/data/school"
import { cn } from "@/lib/utils"

const FIRST = ["Aarav", "Riya", "Ishaan", "Ananya", "Kabir", "Saanvi", "Vivaan", "Diya", "Arjun", "Myra", "Reyansh", "Kiara", "Advik", "Anika", "Dhruv", "Meera"]
const LAST = ["Sharma", "Singh", "Gupta", "Iyer", "Khan", "Reddy", "Patel", "Nair", "Mehta", "Joshi", "Verma", "Das"]

/** Deterministic sample roster for a class section. */
function rosterFor(section) {
  let seed = [...section].reduce((s, ch) => s + ch.charCodeAt(0), 0)
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280
  return Array.from({ length: 14 }, (_, i) => ({
    roll: i + 1,
    name: `${FIRST[Math.floor(rand() * FIRST.length)]} ${LAST[Math.floor(rand() * LAST.length)]}`,
  }))
}

const STATUSES = [
  { key: "P", label: "Present", active: "bg-[#22a447] text-white border-[#22a447]" },
  { key: "A", label: "Absent", active: "bg-red-500 text-white border-red-500" },
  { key: "L", label: "Late", active: "bg-[#f5a300] text-white border-[#f5a300]" },
  { key: "O", label: "Leave", active: "bg-[#3a5bd9] text-white border-[#3a5bd9]" },
]

const sectionOptions = classes.flatMap((c) => c.sections.map((s) => `${c.name} - ${s}`))
const today = new Date().toLocaleDateString("en-CA") // local YYYY-MM-DD

export default function Attendance() {
  const [section, setSection] = useState(sectionOptions[0])
  const [date, setDate] = useState(today)
  const [marks, setMarks] = useState({})
  const [savedAt, setSavedAt] = useState(null)

  const roster = useMemo(() => rosterFor(section), [section])
  const key = `${section}|${date}`
  const current = marks[key] ?? {}

  const counts = STATUSES.reduce((acc, s) => ({ ...acc, [s.key]: roster.filter((r) => current[r.roll] === s.key).length }), {})
  const unmarked = roster.length - Object.keys(current).length

  function setStatus(roll, status) {
    setSavedAt(null)
    setMarks((m) => ({ ...m, [key]: { ...m[key], [roll]: status } }))
  }

  function markAll() {
    setSavedAt(null)
    setMarks((m) => ({ ...m, [key]: Object.fromEntries(roster.map((r) => [r.roll, "P"])) }))
  }

  return (
    <div className="space-y-6">
      <ModuleHeader title="Attendance" subtitle="Mark daily attendance for each class section">
        <Button variant="outline-brand" onClick={markAll}>
          <CheckCheck /> Mark all present
        </Button>
      </ModuleHeader>

      <Panel>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
          <div className="space-y-2">
            <Label htmlFor="a-class">Class & section</Label>
            <select
              id="a-class"
              value={section}
              onChange={(e) => {
                setSection(e.target.value)
                setSavedAt(null)
              }}
              className="flex h-11 w-full rounded-lg border border-input bg-white px-3 text-sm text-navy shadow-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              {sectionOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="a-date">Date</Label>
            <Input
              id="a-date"
              type="date"
              value={date}
              max={today}
              onChange={(e) => {
                setDate(e.target.value)
                setSavedAt(null)
              }}
            />
          </div>
          <p className="text-[13px] text-navy/60 lg:pb-3">
            {roster.length} students · <span className="font-medium text-navy">{unmarked} unmarked</span>
          </p>
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatTile label="Present" value={counts.P} icon={UserCheck} tone="green" />
        <StatTile label="Absent" value={counts.A} icon={UserX} tone="red" />
        <StatTile label="Late" value={counts.L} icon={Clock} tone="amber" />
        <StatTile label="On leave" value={counts.O} icon={Plane} tone="indigo" />
      </div>

      <Panel title={`${section} — roster`} subtitle="Tap a status for each student">
        <ul className="divide-y divide-slate-100">
          {roster.map((r) => (
            <li key={r.roll} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-3">
                <span className="w-6 text-[12px] font-medium text-navy/45">{String(r.roll).padStart(2, "0")}</span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e8f0ff] text-[12px] font-bold text-[#2f6bff]">
                  {initials(r.name)}
                </span>
                <span className="text-[14px] font-medium text-navy">{r.name}</span>
              </div>
              <div className="flex gap-1.5 pl-9 sm:pl-0">
                {STATUSES.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setStatus(r.roll, s.key)}
                    aria-pressed={current[r.roll] === s.key}
                    className={cn(
                      "h-8 rounded-lg border px-3 text-[12px] font-semibold transition-colors",
                      current[r.roll] === s.key ? s.active : "border-slate-200 text-navy/60 hover:border-navy/30"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          {savedAt ? (
            <p className="inline-flex items-center gap-1.5 text-[13px] text-[#1a7f37]">
              <CheckCircle2 className="h-4 w-4" /> Attendance saved at {savedAt}
            </p>
          ) : (
            <p className="text-[13px] text-navy/55">
              {unmarked ? `${unmarked} students still need a status.` : "All students marked."}
            </p>
          )}
          <Button
            disabled={unmarked > 0}
            onClick={() => setSavedAt(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }))}
          >
            <Save /> Save Attendance
          </Button>
        </div>
      </Panel>
    </div>
  )
}
