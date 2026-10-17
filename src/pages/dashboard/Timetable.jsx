import { Fragment, useMemo, useState } from "react"
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Coffee,
  Download,
  Plus,
  Printer,
  RefreshCw,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react"

import { ModuleHeader, Panel, Segmented } from "@/components/dashboard/ui"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { classes, teachers } from "@/data/school"
import { FREE, generateTimetable, periodTimes, swapClash } from "@/lib/timetable"
import { cn } from "@/lib/utils"

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const SECTIONS = classes.flatMap((c) => c.sections.map((s) => `${c.name} - ${s}`))

const DEFAULT_SUBJECTS = [
  { name: "English", teacher: "Sunita Rao", perWeek: 6 },
  { name: "Mathematics", teacher: "Neha Verma", perWeek: 7 },
  { name: "Science", teacher: "Rahul Mehta", perWeek: 6 },
  { name: "Social Studies", teacher: "Vikram Das", perWeek: 5 },
  { name: "Hindi", teacher: "Fatima Sheikh", perWeek: 5 },
  { name: "Computer Science", teacher: "Karan Malhotra", perWeek: 3 },
  { name: "Physical Education", teacher: "", perWeek: 2 },
]

// Soft tints by subject order (identity only; text stays navy).
const TINTS = [
  "bg-[#e8f0ff] border-[#2f6bff]",
  "bg-[#e8f8ed] border-[#22a447]",
  "bg-[#fff4d6] border-[#f5a300]",
  "bg-[#f1ebff] border-[#7c4dff]",
  "bg-[#ffe9ef] border-[#e5487b]",
  "bg-[#e3f7f6] border-[#13a3a0]",
  "bg-[#ffeedd] border-[#f2711c]",
  "bg-[#eef1f5] border-[#64748b]",
]

const selectClass =
  "flex h-11 w-full rounded-lg border border-input bg-white px-3 text-sm text-navy shadow-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"

function downloadCSV(filename, rows) {
  const csv = rows.map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n")
  const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }))
  Object.assign(document.createElement("a"), { href: url, download: filename }).click()
  URL.revokeObjectURL(url)
}

export default function Timetable() {
  // settings
  const [days, setDays] = useState(ALL_DAYS)
  const [periods, setPeriods] = useState(7)
  const [start, setStart] = useState("08:30")
  const [length, setLength] = useState(40)
  const [breakAfter, setBreakAfter] = useState(4)
  const [breakLength, setBreakLength] = useState(30)
  const [sections, setSections] = useState(["Class 8 - A", "Class 8 - B", "Class 9 - A"])
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS)

  // output
  const [result, setResult] = useState(null)
  const [view, setView] = useState("Class view")
  const [activeSection, setActiveSection] = useState(null)
  const [activeTeacher, setActiveTeacher] = useState(teachers[0].name)
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState(null)

  const slots = days.length * periods
  const required = subjects.reduce((s, x) => s + (Number(x.perWeek) || 0), 0)
  const teacherLoad = useMemo(() => {
    const load = {}
    subjects.forEach((s) => s.teacher && (load[s.teacher] = (load[s.teacher] ?? 0) + (Number(s.perWeek) || 0) * sections.length))
    return load
  }, [subjects, sections])
  const overloaded = Object.entries(teacherLoad).filter(([, n]) => n > slots)

  const errors = []
  if (!days.length) errors.push("Choose at least one working day.")
  if (!sections.length) errors.push("Choose at least one class section.")
  if (required > slots) errors.push(`Subjects need ${required} periods but only ${slots} are available per week.`)
  overloaded.forEach(([t, n]) => errors.push(`${t} would teach ${n} periods but only ${slots} exist. Assign another teacher.`))
  if (subjects.some((s) => !s.name.trim())) errors.push("Every subject needs a name.")

  const times = periodTimes({ start, length, periods: result?.periods ?? periods, breakAfter, breakLength })
  const colorOf = (name) => {
    const i = (result?.subjects ?? subjects).findIndex((s) => s.name === name)
    return i < 0 ? "bg-white border-slate-200" : TINTS[i % TINTS.length]
  }

  function generate() {
    const cleaned = subjects
      .map((s) => ({ ...s, name: s.name.trim(), perWeek: Number(s.perWeek) || 0 }))
      .filter((s) => s.perWeek > 0)
    const res = generateTimetable({ sections, days: days.length, periods, subjects: cleaned })
    setResult({ ...res, days: [...days], periods, sections: [...sections], subjects: cleaned })
    setActiveSection(sections[0])
    setSelected(null)
    setMessage(
      res.unplaced.length
        ? { tone: "warn", text: `${res.unplaced.length} lessons could not be placed without a teacher clash. Try reducing periods or adding teachers.` }
        : { tone: "ok", text: `Generated ${sections.length} timetables with no teacher clashes.` }
    )
  }

  function clickCell(d, p) {
    if (!selected) return setSelected({ d, p })
    if (selected.d === d && selected.p === p) return setSelected(null)
    const clash = swapClash(result.grids, activeSection, selected, { d, p })
    if (clash) {
      setMessage({ tone: "warn", text: `Can't swap: ${clash} is already teaching another class in that period.` })
    } else {
      const grid = result.grids[activeSection].map((row) => [...row])
      ;[grid[selected.d][selected.p], grid[d][p]] = [grid[d][p], grid[selected.d][selected.p]]
      setResult((r) => ({ ...r, grids: { ...r.grids, [activeSection]: grid } }))
      setMessage({ tone: "ok", text: "Periods swapped." })
    }
    setSelected(null)
  }

  function exportCSV() {
    const header = ["Section", "Day", ...times.map((t, i) => `P${i + 1} (${t.from})`)]
    const rows = result.sections.flatMap((s) =>
      result.days.map((day, d) => [s, day, ...result.grids[s][d].map((c) => (c.teacher ? `${c.name} - ${c.teacher}` : c.name))])
    )
    downloadCSV("timetable.csv", [header, ...rows])
  }

  const updateSubject = (i, key, value) => setSubjects((list) => list.map((s, j) => (j === i ? { ...s, [key]: value } : s)))
  const toggle = (list, setList, value) => setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  // teacher view: where is the teacher in each slot?
  const teacherGrid = result
    ? result.days.map((_, d) =>
        Array.from({ length: result.periods }, (_, p) => {
          const hit = result.sections.find((s) => result.grids[s][d][p].teacher === activeTeacher)
          return hit ? { section: hit, name: result.grids[hit][d][p].name } : null
        })
      )
    : null
  const teacherPeriods = teacherGrid?.flat().filter(Boolean).length ?? 0

  return (
    <div className="space-y-6">
      <ModuleHeader title="Timetable Generator" subtitle="Build clash-free weekly timetables for multiple sections at once" />

      <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr] print:hidden">
        {/* Settings */}
        <Panel title="1. School day" subtitle="Working days, periods and timings">
          <Label>Working days</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {ALL_DAYS.map((d) => (
              <button
                key={d}
                onClick={() => toggle(days, (v) => setDays(ALL_DAYS.filter((x) => v.includes(x))), d)}
                className={cn(
                  "h-9 rounded-lg border px-3.5 text-[13px] font-medium transition-colors",
                  days.includes(d) ? "border-primary bg-primary text-navy" : "border-slate-200 text-navy/60 hover:border-primary"
                )}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="tt-periods">Periods / day</Label>
              <Input id="tt-periods" type="number" min={3} max={10} value={periods} onChange={(e) => setPeriods(Math.min(10, Math.max(3, Number(e.target.value) || 3)))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tt-start">Day starts</Label>
              <Input id="tt-start" type="time" value={start} onChange={(e) => setStart(e.target.value || "08:30")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tt-length">Period (min)</Label>
              <Input id="tt-length" type="number" min={20} max={90} value={length} onChange={(e) => setLength(Number(e.target.value) || 40)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tt-break">Break after</Label>
              <select id="tt-break" value={breakAfter} onChange={(e) => setBreakAfter(Number(e.target.value))} className={selectClass}>
                <option value={0}>No break</option>
                {Array.from({ length: periods - 1 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    Period {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tt-breaklen">Break (min)</Label>
              <Input id="tt-breaklen" type="number" min={5} max={90} value={breakLength} onChange={(e) => setBreakLength(Number(e.target.value) || 30)} />
            </div>
          </div>

          <div className="mt-5">
            <Label>Class sections ({sections.length})</Label>
            <div className="mt-2 flex max-h-40 flex-wrap gap-1.5 overflow-y-auto">
              {SECTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => toggle(sections, (v) => setSections(SECTIONS.filter((x) => v.includes(x))), s)}
                  className={cn(
                    "h-8 rounded-lg border px-2.5 text-[12px] font-medium transition-colors",
                    sections.includes(s) ? "border-navy bg-navy text-white" : "border-slate-200 text-navy/60 hover:border-navy/40"
                  )}
                >
                  {s.replace("Class ", "")}
                </button>
              ))}
            </div>
          </div>
        </Panel>

        {/* Subjects */}
        <Panel
          title="2. Subjects & teachers"
          subtitle="Periods per week for each section"
          action={
            <span className={cn("rounded-full px-2.5 py-1 text-[12px] font-semibold", required > slots ? "bg-red-50 text-red-700" : "bg-[#e8f8ed] text-[#1a7f37]")}>
              {required} / {slots} periods
            </span>
          }
        >
          <div className="space-y-2.5">
            <div className="hidden grid-cols-[1.2fr_1.2fr_80px_36px] gap-2 text-[11px] font-semibold uppercase tracking-wide text-navy/50 sm:grid">
              <span>Subject</span>
              <span>Teacher</span>
              <span>Per week</span>
              <span />
            </div>
            {subjects.map((s, i) => (
              <div key={i} className="grid grid-cols-[1fr_80px_36px] gap-2 rounded-xl border border-slate-100 p-2 sm:grid-cols-[1.2fr_1.2fr_80px_36px] sm:border-0 sm:p-0">
                <Input aria-label="Subject" value={s.name} onChange={(e) => updateSubject(i, "name", e.target.value)} placeholder="Subject" className="col-span-3 sm:col-span-1" />
                <select aria-label="Teacher" value={s.teacher} onChange={(e) => updateSubject(i, "teacher", e.target.value)} className={cn(selectClass, "col-span-1")}>
                  <option value="">No teacher / shared</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.subject})
                    </option>
                  ))}
                </select>
                <Input aria-label="Periods per week" type="number" min={0} max={20} value={s.perWeek} onChange={(e) => updateSubject(i, "perWeek", e.target.value)} />
                <button
                  onClick={() => setSubjects((list) => list.filter((_, j) => j !== i))}
                  className="grid h-11 w-9 place-items-center rounded-lg text-navy/40 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Remove ${s.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-3" onClick={() => setSubjects((l) => [...l, { name: "", teacher: "", perWeek: 1 }])}>
            <Plus /> Add subject
          </Button>
          <p className="mt-2 text-[12px] text-navy/55">
            Unused slots become <span className="font-semibold">Free</span> periods (library / self-study).
          </p>
        </Panel>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-[#fddc5a] via-[#fed84a] to-[#ffd43c] p-5 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <p className="flex items-center gap-2 text-[16px] font-bold text-navy">
            <Sparkles className="h-5 w-5" /> 3. Generate
          </p>
          {errors.length ? (
            <ul className="mt-1 space-y-0.5 text-[13px] text-red-800">
              {errors.map((e) => (
                <li key={e}>• {e}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-[13px] text-navy/75">
              {sections.length} sections · {days.length} days · {periods} periods a day · teachers are never double-booked
            </p>
          )}
        </div>
        <Button variant="secondary" size="lg" disabled={errors.length > 0} onClick={generate}>
          {result ? <RefreshCw /> : <Wand2 />} {result ? "Regenerate" : "Generate Timetable"}
        </Button>
      </div>

      {result && (
        <>
          {message && (
            <p
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-3 text-[13px] print:hidden",
                message.tone === "ok" ? "bg-[#e8f8ed] text-[#1a7f37]" : "bg-[#fff4d6] text-[#9a6700]"
              )}
            >
              {message.tone === "ok" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertTriangle className="h-4 w-4 shrink-0" />}
              {message.text}
            </p>
          )}

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between print:hidden">
            <Segmented options={["Class view", "Teacher view"]} value={view} onChange={setView} />
            <div className="flex gap-2">
              <Button variant="outline-brand" size="sm" onClick={() => window.print()}>
                <Printer /> Print
              </Button>
              <Button variant="outline-brand" size="sm" onClick={exportCSV}>
                <Download /> Export CSV
              </Button>
            </div>
          </div>

          <Panel>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {view === "Class view" ? (
                <div className="flex flex-wrap gap-1.5 print:hidden">
                  {result.sections.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setActiveSection(s)
                        setSelected(null)
                      }}
                      className={cn(
                        "h-9 rounded-lg px-3.5 text-[13px] font-medium transition-colors",
                        activeSection === s ? "bg-navy text-white" : "bg-slate-100 text-navy/70 hover:bg-slate-200"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3 print:hidden">
                  <select value={activeTeacher} onChange={(e) => setActiveTeacher(e.target.value)} className={cn(selectClass, "w-64")}>
                    {teachers.map((t) => (
                      <option key={t.id}>{t.name}</option>
                    ))}
                  </select>
                  <span className="text-[13px] text-navy/60">{teacherPeriods} periods / week</span>
                </div>
              )}
              <h3 className="flex items-center gap-2 text-[16px] font-semibold text-navy">
                <CalendarClock className="h-5 w-5 text-[#d99a00]" />
                {view === "Class view" ? activeSection : activeTeacher}
              </h3>
            </div>

            <div className="-mx-5 overflow-x-auto px-5 sm:-mx-6 sm:px-6">
              <table className="w-full min-w-[760px] border-separate border-spacing-1.5 text-left">
                <thead>
                  <tr>
                    <th className="w-16" />
                    {times.map((t, p) => (
                      <Fragment key={p}>
                        <th className="rounded-lg bg-[#fffcf1] px-2 py-2 text-center">
                          <span className="block text-[12px] font-semibold text-navy">Period {p + 1}</span>
                          <span className="block text-[10px] font-normal text-navy/50">
                            {t.from} – {t.to}
                          </span>
                        </th>
                        {p + 1 === breakAfter && p + 1 < times.length && (
                          <th className="w-10 rounded-lg bg-slate-100 px-1 text-center text-[10px] font-semibold text-navy/50">
                            <Coffee className="mx-auto h-3.5 w-3.5" />
                          </th>
                        )}
                      </Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.days.map((day, d) => (
                    <tr key={day}>
                      <th className="rounded-lg bg-[#fffcf1] px-2 text-center text-[13px] font-semibold text-navy">{day}</th>
                      {Array.from({ length: result.periods }, (_, p) => {
                        const cell = view === "Class view" ? result.grids[activeSection][d][p] : teacherGrid[d][p]
                        const isSel = selected?.d === d && selected?.p === p
                        return (
                          <Fragment key={p}>
                            {view === "Class view" ? (
                              <td>
                                <button
                                  onClick={() => clickCell(d, p)}
                                  className={cn(
                                    "flex h-[60px] w-full flex-col justify-center rounded-lg border-l-4 px-2.5 text-left transition-shadow hover:shadow-md",
                                    cell.name === FREE ? "border-slate-200 bg-slate-50" : colorOf(cell.name),
                                    isSel && "ring-2 ring-navy ring-offset-1"
                                  )}
                                >
                                  <span className={cn("truncate text-[12px] font-semibold", cell.name === FREE ? "text-navy/40" : "text-navy")}>{cell.name}</span>
                                  {cell.teacher && <span className="truncate text-[10.5px] text-navy/60">{cell.teacher}</span>}
                                </button>
                              </td>
                            ) : (
                              <td>
                                <div
                                  className={cn(
                                    "flex h-[60px] flex-col justify-center rounded-lg border-l-4 px-2.5",
                                    cell ? colorOf(cell.name) : "border-slate-200 bg-slate-50"
                                  )}
                                >
                                  {cell ? (
                                    <>
                                      <span className="truncate text-[12px] font-semibold text-navy">{cell.section.replace("Class ", "")}</span>
                                      <span className="truncate text-[10.5px] text-navy/60">{cell.name}</span>
                                    </>
                                  ) : (
                                    <span className="text-[12px] text-navy/35">—</span>
                                  )}
                                </div>
                              </td>
                            )}
                            {p + 1 === breakAfter && p + 1 < result.periods && d === 0 && (
                              <td rowSpan={result.days.length} className="rounded-lg bg-slate-100 align-middle">
                                <span className="block text-center text-[10px] font-semibold uppercase tracking-widest text-navy/45 [writing-mode:vertical-rl]">
                                  Break
                                </span>
                              </td>
                            )}
                          </Fragment>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {view === "Class view" && (
              <p className="mt-3 text-[12px] text-navy/55 print:hidden">
                Tip: click two periods to swap them. Swaps that would double-book a teacher are blocked.
              </p>
            )}
          </Panel>
        </>
      )}
    </div>
  )
}
