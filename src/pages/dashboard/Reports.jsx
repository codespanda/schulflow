import { useState } from "react"
import { CalendarCheck, Download, FileSpreadsheet, GraduationCap, Receipt, Users } from "lucide-react"

import BarChart from "@/components/dashboard/BarChart"
import { ModuleHeader, Panel } from "@/components/dashboard/ui"
import { Button } from "@/components/ui/button"
import { classAttendance, classes, invoices, monthlyFees, results, students, subjects, teachers } from "@/data/school"

function downloadCSV(filename, rows) {
  const escape = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`
  const csv = rows.map((r) => r.map(escape).join(",")).join("\n")
  // BOM so Excel reads UTF-8 (₹, –) correctly
  const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }))
  const a = Object.assign(document.createElement("a"), { href: url, download: filename })
  a.click()
  URL.revokeObjectURL(url)
}

const reports = [
  {
    title: "Student Directory",
    text: "All enrolled students with class, guardian and contact details.",
    icon: Users,
    file: "students.csv",
    rows: () => [
      ["ID", "Name", "Class", "Guardian", "Phone", "Attendance %", "Fees"],
      ...students.map((s) => [s.id, s.name, s.className, s.guardian, s.phone, s.attendance, s.fees]),
    ],
  },
  {
    title: "Fee Collection",
    text: "Invoices for the current term with amounts, due dates and status.",
    icon: Receipt,
    file: "fee-collection.csv",
    rows: () => [
      ["Invoice", "Student", "Class", "Term", "Amount (INR)", "Due", "Status", "Paid on"],
      ...invoices.map((i) => [i.id, i.student, i.className, i.term, i.amount, i.due, i.status, i.paidOn]),
    ],
  },
  {
    title: "Attendance Summary",
    text: "Average attendance by class for the current month.",
    icon: CalendarCheck,
    file: "attendance-summary.csv",
    rows: () => [["Class", "Attendance %"], ...classAttendance.map((c) => [c.label, c.value])],
  },
  {
    title: "Exam Results",
    text: "Subject-wise marks and totals for Class 8 - A, Unit Test 2.",
    icon: GraduationCap,
    file: "exam-results.csv",
    rows: () => [
      ["Student", ...subjects, "Total"],
      ...results.map((r) => [r.student, ...r.marks, r.marks.reduce((s, m) => s + m, 0)]),
    ],
  },
  {
    title: "Staff Report",
    text: "Teaching staff with subjects, classes and experience.",
    icon: FileSpreadsheet,
    file: "staff.csv",
    rows: () => [
      ["ID", "Name", "Subject", "Classes", "Experience", "Status"],
      ...teachers.map((t) => [t.id, t.name, t.subject, t.classes, t.experience, t.status]),
    ],
  },
  {
    title: "Class Strength",
    text: "Students enrolled per class against room capacity.",
    icon: Users,
    file: "class-strength.csv",
    rows: () => [
      ["Class", "Sections", "Class teacher", "Students", "Capacity"],
      ...classes.map((c) => [c.name, c.sections.join(" "), c.teacher, c.students, c.capacity]),
    ],
  },
]

/** Horizontal bars for a ranked list of classes (single series, zero baseline). */
function ClassAttendanceBars() {
  const [hover, setHover] = useState(null)
  const sorted = [...classAttendance].sort((a, b) => b.value - a.value)
  return (
    <ul className="space-y-2.5">
      {sorted.map((c) => (
        <li
          key={c.label}
          className="grid grid-cols-[64px_1fr_48px] items-center gap-3"
          onMouseEnter={() => setHover(c.label)}
          onMouseLeave={() => setHover(null)}
        >
          <span className="text-[12px] text-navy/70">{c.label}</span>
          <div className="h-3 rounded-full bg-slate-100">
            <div
              className="h-full rounded-r-[4px] rounded-l-full bg-[#3a5bd9] transition-opacity"
              style={{ width: `${c.value}%`, opacity: hover && hover !== c.label ? 0.4 : 1 }}
            />
          </div>
          <span className="text-right text-[12px] font-semibold text-navy">{c.value}%</span>
        </li>
      ))}
    </ul>
  )
}

export default function Reports() {
  const total = monthlyFees.reduce((s, m) => s + m.value, 0)

  return (
    <div className="space-y-6">
      <ModuleHeader title="Reports & Analytics" subtitle="Insights across your school, ready to download" />

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel
          title="Monthly Fee Collection"
          subtitle="₹ lakh collected per month"
          action={
            <div className="text-right">
              <p className="text-[22px] font-bold leading-none text-navy">₹{total.toFixed(1)}L</p>
              <p className="mt-1 text-[12px] text-navy/60">last 6 months</p>
            </div>
          }
        >
          <BarChart
            data={monthlyFees}
            max={25}
            ticks={[0, 5, 10, 15, 20, 25]}
            format={(v) => `₹${v}L`}
            tooltip={(d) => (
              <>
                <span className="font-semibold">₹{d.value} lakh</span> · {d.label}
              </>
            )}
          />
        </Panel>

        <Panel title="Attendance by Class" subtitle="Average % present this month, highest first">
          <ClassAttendanceBars />
        </Panel>
      </div>

      <Panel title="Download Reports" subtitle="Export data as CSV files that open in Excel or Google Sheets">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {reports.map(({ title, text, icon: Icon, file, rows }) => (
            <div key={title} className="flex flex-col rounded-xl border border-slate-100 p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#fff1b8] text-[#d99a00]">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <div>
                  <h4 className="text-[14px] font-semibold text-navy">{title}</h4>
                  <p className="mt-1 text-[12px] leading-relaxed text-navy/60">{text}</p>
                </div>
              </div>
              <Button variant="outline-brand" size="sm" className="mt-4 self-start" onClick={() => downloadCSV(file, rows())}>
                <Download /> Download CSV
              </Button>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
