import { useState } from "react"
import { DoorOpen, Layers, Plus, School, Search, UserCheck, Users } from "lucide-react"

import { ModuleHeader, StatTile } from "@/components/dashboard/ui"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { classes as seed, teachers } from "@/data/school"
import { cn } from "@/lib/utils"

export default function Classes() {
  const [classes, setClasses] = useState(seed)
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const q = query.trim().toLowerCase()
  const filtered = classes.filter((c) => !q || c.name.toLowerCase().includes(q) || c.teacher.toLowerCase().includes(q))
  const totalStudents = classes.reduce((s, c) => s + c.students, 0)
  const totalSections = classes.reduce((s, c) => s + c.sections.length, 0)

  function handleAdd(e) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    const sections = f.sections
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean)
    setClasses((list) => [
      ...list,
      {
        id: `C${Date.now()}`,
        name: f.name.trim(),
        sections: sections.length ? sections : ["A"],
        teacher: f.teacher,
        students: 0,
        capacity: Number(f.capacity) || 35,
        room: f.room.trim() || "—",
      },
    ])
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <ModuleHeader title="Classes & Sections" subtitle={`${classes.length} classes · ${totalSections} sections`}>
        <Button onClick={() => setOpen(true)}>
          <Plus /> Add Class
        </Button>
      </ModuleHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Classes" value={classes.length} icon={School} tone="blue" />
        <StatTile label="Sections" value={totalSections} icon={Layers} tone="indigo" />
        <StatTile label="Students" value={totalStudents.toLocaleString("en-IN")} icon={Users} tone="green" />
        <StatTile label="Class Teachers" value={new Set(classes.map((c) => c.teacher)).size} icon={UserCheck} tone="amber" />
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search class or teacher" className="pl-9" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => {
          const fill = c.capacity ? Math.round((c.students / c.capacity) * 100) : 0
          return (
            <div key={c.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[17px] font-bold text-navy">{c.name}</h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-navy/55">
                    <DoorOpen className="h-3.5 w-3.5" /> Room {c.room}
                  </p>
                </div>
                <div className="flex gap-1">
                  {c.sections.map((s) => (
                    <span key={s} className="grid h-7 w-7 place-items-center rounded-lg bg-[#fff1b8] text-[12px] font-bold text-navy">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-[#fffcf1] px-3 py-2.5">
                <UserCheck className="h-4 w-4 text-[#d99a00]" />
                <span className="text-[13px] text-navy/60">Class teacher</span>
                <span className="ml-auto truncate text-[13px] font-medium text-navy">{c.teacher}</span>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-[12px]">
                  <span className="text-navy/60">Capacity</span>
                  <span className="font-medium text-navy">
                    {c.students} / {c.capacity} students
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={cn("h-full rounded-full", fill >= 95 ? "bg-[#f5a300]" : "bg-[#3a5bd9]")}
                    style={{ width: `${Math.min(fill, 100)}%` }}
                  />
                </div>
                {fill >= 95 && <p className="mt-1.5 text-[11px] font-medium text-[#9a6700]">Almost full</p>}
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && <p className="text-navy/55">No classes match your search.</p>}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-navy">Add Class</SheetTitle>
            <SheetDescription>Create a new class with its sections.</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleAdd} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="c-name">Class name</Label>
              <Input id="c-name" name="name" required placeholder="e.g. Class 11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-sections">Sections</Label>
              <Input id="c-sections" name="sections" placeholder="A, B, C" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-teacher">Class teacher</Label>
              <select
                id="c-teacher"
                name="teacher"
                required
                className="flex h-11 w-full rounded-lg border border-input bg-white px-3 text-sm text-navy shadow-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                {teachers.map((t) => (
                  <option key={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="c-capacity">Capacity</Label>
                <Input id="c-capacity" name="capacity" type="number" min="1" placeholder="70" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-room">Room</Label>
                <Input id="c-room" name="room" placeholder="e.g. 304" />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Save Class
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
