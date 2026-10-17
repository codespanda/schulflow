import { useMemo, useState } from "react"
import { Plus, Search } from "lucide-react"

import { initials } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { students as seed } from "@/data/school"
import { cn } from "@/lib/utils"

const feeStyle = {
  Paid: "bg-[#e8f8ed] text-[#1a7f37]",
  Pending: "bg-[#fff4d6] text-[#9a6700]",
  Overdue: "bg-red-50 text-red-700",
}

export default function Students() {
  const [students, setStudents] = useState(seed)
  const [query, setQuery] = useState("")
  const [fee, setFee] = useState("All")
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return students.filter(
      (s) =>
        (fee === "All" || s.fees === fee) &&
        (!q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.className.toLowerCase().includes(q))
    )
  }, [students, query, fee])

  function handleAdd(e) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    const id = `S${1001 + students.length}`
    setStudents((list) => [{ id, attendance: 100, fees: "Pending", ...f }, ...list])
    setOpen(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-navy">All Students</h2>
          <p className="text-[13px] text-navy/60">{students.length} students enrolled</p>
        </div>
        <Button onClick={() => setOpen(true)} className="self-start sm:self-auto">
          <Plus /> Add Student
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, ID or class" className="pl-9" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {["All", "Paid", "Pending", "Overdue"].map((f) => (
            <button
              key={f}
              onClick={() => setFee(f)}
              className={cn(
                "h-11 shrink-0 rounded-lg border px-4 text-[13px] font-medium transition-colors",
                fee === f ? "border-primary bg-primary text-navy" : "border-slate-200 bg-white text-navy/70 hover:border-primary"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left">
          <thead className="bg-[#fffcf1] text-[12px] uppercase tracking-wide text-navy/60">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Student</th>
              <th className="px-5 py-3.5 font-semibold">Class</th>
              <th className="px-5 py-3.5 font-semibold">Guardian</th>
              <th className="px-5 py-3.5 font-semibold">Attendance</th>
              <th className="px-5 py-3.5 font-semibold">Fees</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[14px]">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-[#fffdf5]">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e8f0ff] text-[12px] font-bold text-[#2f6bff]">
                      {initials(s.name)}
                    </span>
                    <div>
                      <p className="font-medium text-navy">{s.name}</p>
                      <p className="text-[12px] text-navy/50">{s.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-navy/80">{s.className}</td>
                <td className="px-5 py-3.5">
                  <p className="text-navy/80">{s.guardian}</p>
                  <p className="text-[12px] text-navy/50">{s.phone}</p>
                </td>
                <td className="px-5 py-3.5 text-navy/80">{s.attendance}%</td>
                <td className="px-5 py-3.5">
                  <span className={cn("rounded-full px-2.5 py-1 text-[12px] font-semibold", feeStyle[s.fees])}>{s.fees}</span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-navy/55">
                  No students match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-navy">Add Student</SheetTitle>
            <SheetDescription>Enter the student's details to enroll them.</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleAdd} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="s-name">Student name</Label>
              <Input id="s-name" name="name" required placeholder="Full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-class">Class & section</Label>
              <Input id="s-class" name="className" required placeholder="e.g. Class 5 - A" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-guardian">Guardian name</Label>
              <Input id="s-guardian" name="guardian" required placeholder="Parent or guardian" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-phone">Guardian phone</Label>
              <Input id="s-phone" name="phone" type="tel" placeholder="+91 00000 00000" />
            </div>
            <Button type="submit" className="w-full">
              Save Student
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
