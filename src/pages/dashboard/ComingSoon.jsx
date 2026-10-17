import { Construction } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { dashboardNav } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"

export default function ComingSoon() {
  const { pathname } = useLocation()
  const page = dashboardNav.find((n) => n.to === pathname)

  return (
    <div className="grid min-h-[60vh] place-items-center rounded-2xl border border-dashed border-primary/50 bg-white p-8 text-center">
      <div>
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#fff1b8] text-[#d99a00]">
          <Construction className="h-8 w-8" />
        </span>
        <h2 className="mt-5 text-[22px] font-bold text-navy">{page?.label ?? "This"} module is coming soon</h2>
        <p className="mx-auto mt-2 max-w-md text-[14px] text-navy/60">
          We're building this section. Meanwhile, explore students, teachers and your dashboard overview.
        </p>
        <Button asChild className="mt-6">
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
