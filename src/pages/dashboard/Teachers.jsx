import { useState } from "react"
import { BookOpen, Plus, Search } from "lucide-react"

import { initials } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { teachers as seed } from "@/data/school"
import { cn } from "@/lib/utils"

export default function Teachers() {
  const [teachers, setTeachers] = useState(seed)
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const q = query.trim().toLowerCase()
  const filtered = teachers.filter((t) => !q || t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q))

  function handleAdd(e) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    const next = Math.max(...teachers.map((t) => Number(t.id.slice(1)))) + 1
    const years = Number(f.experience)
    setTeachers((list) => [
      {
        id: `T${next}`,
        name: f.name.trim(),
        subject: f.subject.trim(),
        classes: f.classes.trim() || "Not assigned",
        experience: `${years} ${years === 1 ? "yr" : "yrs"}`,
        email: f.email.trim(),
        phone: f.phone.trim(),
        status: "Active",
      },
      ...list,
    ])
    setQuery("")
    setOpen(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-navy">Teaching Staff</h2>
          <p className="text-[13px] text-navy/60">{teachers.length} teachers</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or subject" className="pl-9" />
          </div>
          <Button onClick={() => setOpen(true)} className="self-start sm:self-auto">
            <Plus /> Add Teacher
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((t) => (
          <div key={t.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3.5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-[15px] font-bold text-navy">
                {initials(t.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-navy">{t.name}</p>
                <p className="text-[12px] text-navy/55">{t.id}</p>
              </div>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                  t.status === "Active" ? "bg-[#e8f8ed] text-[#1a7f37]" : "bg-[#fff4d6] text-[#9a6700]"
                )}
              >
                {t.status}
              </span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#fffcf1] p-3.5 text-[13px]">
              <div>
                <dt className="text-[11px] text-navy/55">Subject</dt>
                <dd className="mt-0.5 flex items-center gap-1.5 font-medium text-navy">
                  <BookOpen className="h-3.5 w-3.5 text-[#d99a00]" /> {t.subject}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] text-navy/55">Experience</dt>
                <dd className="mt-0.5 font-medium text-navy">{t.experience}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[11px] text-navy/55">Classes</dt>
                <dd className="mt-0.5 font-medium text-navy">{t.classes}</dd>
              </div>
            </dl>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-navy/55">No teachers match your search.</p>}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-navy">Add Teacher</SheetTitle>
            <SheetDescription>Add a new member to your teaching staff.</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleAdd} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="t-name">Full name</Label>
              <Input id="t-name" name="name" required placeholder="Teacher's name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="t-subject">Subject</Label>
              <Input id="t-subject" name="subject" required placeholder="e.g. Mathematics" list="t-subjects" />
              <datalist id="t-subjects">
                {[...new Set(seed.map((t) => t.subject))].map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>
            <div className="space-y-2">
              <Label htmlFor="t-classes">Classes</Label>
              <Input id="t-classes" name="classes" placeholder="e.g. 6A, 7B, 8A" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="t-exp">Experience (years)</Label>
                <Input id="t-exp" name="experience" type="number" min="0" max="50" required placeholder="5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="t-phone">Phone</Label>
                <Input id="t-phone" name="phone" type="tel" placeholder="+91 00000 00000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="t-email">Email</Label>
              <Input id="t-email" name="email" type="email" placeholder="teacher@school.com" />
            </div>
            <Button type="submit" className="w-full">
              Save Teacher
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
