import { useMemo, useState } from "react"
import { Award, CalendarDays, ClipboardCheck, Clock, MapPin, Plus, Trophy } from "lucide-react"

import { initials } from "@/components/dashboard/DashboardLayout"
import { Badge, formatDate, ModuleHeader, Panel, Segmented, StatTile } from "@/components/dashboard/ui"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { exams as seed, examSchedule, results, subjects } from "@/data/school"

const statusTone = { Upcoming: "amber", Scheduled: "blue", Completed: "green" }

function grade(pct) {
  if (pct >= 90) return { g: "A+", tone: "green" }
  if (pct >= 80) return { g: "A", tone: "green" }
  if (pct >= 70) return { g: "B", tone: "blue" }
  if (pct >= 60) return { g: "C", tone: "amber" }
  return { g: "D", tone: "red" }
}

export default function Exams() {
  const [tab, setTab] = useState("Exams")
  const [exams, setExams] = useState(seed)
  const [open, setOpen] = useState(false)

  const ranked = useMemo(
    () =>
      results
        .map((r) => {
          const total = r.marks.reduce((s, m) => s + m, 0)
          const pct = (total / (r.marks.length * 100)) * 100
          return { ...r, total, pct, ...grade(pct) }
        })
        .sort((a, b) => b.total - a.total),
    []
  )
  const classAvg = ranked.reduce((s, r) => s + r.pct, 0) / ranked.length
  const subjectAvg = subjects.map((_, i) => results.reduce((s, r) => s + r.marks[i], 0) / results.length)

  function handleCreate(e) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    setExams((list) => [
      { id: `E${Date.now()}`, name: f.name.trim(), classes: f.classes.trim(), start: f.start, end: f.end || f.start, status: "Scheduled" },
      ...list,
    ])
    setOpen(false)
    setTab("Exams")
  }

  return (
    <div className="space-y-6">
      <ModuleHeader title="Exams & Results" subtitle="Plan exams, publish schedules and track results">
        <Button onClick={() => setOpen(true)}>
          <Plus /> Create Exam
        </Button>
      </ModuleHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Upcoming exams" value={exams.filter((e) => e.status !== "Completed").length} icon={CalendarDays} tone="amber" />
        <StatTile label="Completed" value={exams.filter((e) => e.status === "Completed").length} icon={ClipboardCheck} tone="green" />
        <StatTile label="Class 8-A average" value={`${classAvg.toFixed(1)}%`} hint="Unit Test 2" icon={Award} tone="blue" />
        <StatTile label="Top scorer" value={ranked[0].student} hint={`${ranked[0].pct.toFixed(1)}%`} icon={Trophy} tone="indigo" />
      </div>

      <Segmented options={["Exams", "Schedule", "Results"]} value={tab} onChange={setTab} />

      {tab === "Exams" && (
        <div className="grid gap-4 md:grid-cols-2">
          {exams.map((e) => (
            <div key={e.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[16px] font-semibold text-navy">{e.name}</h3>
                  <p className="mt-0.5 text-[13px] text-navy/60">{e.classes}</p>
                </div>
                <Badge tone={statusTone[e.status]}>{e.status}</Badge>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#fffcf1] px-3 py-2.5 text-[13px] text-navy/80">
                <CalendarDays className="h-4 w-4 text-[#d99a00]" />
                {formatDate(e.start)} {e.end !== e.start && <>– {formatDate(e.end)}</>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Schedule" && (
        <Panel title="Half-yearly Examination" subtitle="Date sheet for Classes 6–10">
          <ol className="space-y-3">
            {examSchedule.map((s) => {
              const d = new Date(s.date + "T00:00:00")
              return (
                <li key={s.date} className="flex items-center gap-4 rounded-xl border border-slate-100 p-3.5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#fff1b8] text-center leading-none">
                    <span>
                      <span className="block text-[18px] font-bold text-navy">{d.getDate()}</span>
                      <span className="block text-[10px] font-semibold uppercase text-[#9a6700]">
                        {d.toLocaleDateString("en-IN", { month: "short" })}
                      </span>
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold text-navy">{s.subject}</p>
                    <p className="mt-0.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-navy/60">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {s.day}, {s.time}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {s.room}
                      </span>
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </Panel>
      )}

      {tab === "Results" && (
        <Panel title="Class 8 - A · Unit Test 2" subtitle="Marks out of 100 per subject, ranked by total">
          <div className="-mx-5 overflow-x-auto sm:-mx-6">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-[#fffcf1] text-[12px] uppercase tracking-wide text-navy/60">
                <tr>
                  <th className="px-5 py-3 font-semibold sm:px-6">Rank</th>
                  <th className="px-3 py-3 font-semibold">Student</th>
                  {subjects.map((s) => (
                    <th key={s} className="px-3 py-3 text-center font-semibold">
                      {s}
                    </th>
                  ))}
                  <th className="px-3 py-3 text-center font-semibold">Total</th>
                  <th className="px-5 py-3 text-center font-semibold sm:px-6">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[14px]">
                {ranked.map((r, i) => (
                  <tr key={r.student} className="hover:bg-[#fffdf5]">
                    <td className="px-5 py-3 font-semibold text-navy/70 sm:px-6">#{i + 1}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e8f0ff] text-[11px] font-bold text-[#2f6bff]">
                          {initials(r.student)}
                        </span>
                        <span className="font-medium text-navy">{r.student}</span>
                      </div>
                    </td>
                    {r.marks.map((m, j) => (
                      <td key={j} className={m < 60 ? "px-3 py-3 text-center font-semibold text-red-600" : "px-3 py-3 text-center text-navy/80"}>
                        {m}
                      </td>
                    ))}
                    <td className="px-3 py-3 text-center font-semibold text-navy">
                      {r.total}
                      <span className="block text-[11px] font-normal text-navy/50">{r.pct.toFixed(1)}%</span>
                    </td>
                    <td className="px-5 py-3 text-center sm:px-6">
                      <Badge tone={r.tone}>{r.g}</Badge>
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50 text-[13px]">
                  <td className="px-5 py-3 sm:px-6" />
                  <td className="px-3 py-3 font-semibold text-navy/70">Subject average</td>
                  {subjectAvg.map((a, i) => (
                    <td key={i} className="px-3 py-3 text-center font-semibold text-navy/70">
                      {a.toFixed(1)}
                    </td>
                  ))}
                  <td className="px-3 py-3 text-center font-semibold text-navy/70">{classAvg.toFixed(1)}%</td>
                  <td className="px-5 py-3 sm:px-6" />
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[12px] text-navy/55">Marks below 60 are highlighted in red.</p>
        </Panel>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-navy">Create Exam</SheetTitle>
            <SheetDescription>Schedule a new examination.</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleCreate} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="e-name">Exam name</Label>
              <Input id="e-name" name="name" required placeholder="e.g. Annual Examination" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="e-classes">Classes</Label>
              <Input id="e-classes" name="classes" required placeholder="e.g. Classes 1–10" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="e-start">Start date</Label>
                <Input id="e-start" name="start" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="e-end">End date</Label>
                <Input id="e-end" name="end" type="date" />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Save Exam
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
