import { useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"

import { initials } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"

export default function Settings() {
  const { user, updateProfile } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    setSaving(true)
    setSaved(false)
    await updateProfile({ name: f.name.trim(), phone: f.phone.trim(), school: f.school.trim() })
    setSaving(false)
    setSaved(true)
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-[22px] font-bold text-navy">
          {initials(user.name)}
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-[20px] font-bold text-navy">{user.name}</h2>
          <p className="truncate text-[13px] text-navy/60">
            Administrator · {user.school}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-[16px] font-semibold text-navy">Profile & School</h3>
        <p className="mt-1 text-[13px] text-navy/60">Update your personal and school details.</p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" required defaultValue={user.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" defaultValue={user.phone} placeholder="+91 00000 00000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="school">School name</Label>
            <Input id="school" name="school" required defaultValue={user.school} />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="animate-spin" />} Save Changes
          </Button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-[13px] text-[#1a7f37]">
              <CheckCircle2 className="h-4 w-4" /> Saved
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
