import { useState } from "react"
import {
  Bell,
  CalendarClock,
  CalendarCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Receipt,
  School,
  Search,
  Settings,
  SquarePen,
  User,
  UserCheck,
} from "lucide-react"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"

import { ScrollToTop } from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { useAuth } from "@/context/AuthContext"
import { asset, cn } from "@/lib/utils"

export const dashboardNav = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, end: true },
  { label: "Students", to: "/dashboard/students", icon: User },
  { label: "Teachers", to: "/dashboard/teachers", icon: UserCheck },
  { label: "Classes", to: "/dashboard/classes", icon: School },
  { label: "Attendance", to: "/dashboard/attendance", icon: CalendarCheck },
  { label: "Timetable", to: "/dashboard/timetable", icon: CalendarClock },
  { label: "Fees", to: "/dashboard/fees", icon: Receipt },
  { label: "Exams", to: "/dashboard/exams", icon: SquarePen },
  { label: "Reports", to: "/dashboard/reports", icon: FileText },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
]

export function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("")
}

function SidebarContent({ onNavigate }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col">
      <Link to="/" className="flex items-center gap-2.5 px-6 py-5" onClick={onNavigate}>
        <img src={asset("/images/logo.png")} alt="" className="h-8 w-auto" />
        <span className="text-[19px] font-bold text-navy">SchulFlow</span>
      </Link>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
        {dashboardNav.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex h-11 items-center gap-3.5 rounded-lg px-3.5 text-[14px] text-navy/80 transition-colors hover:bg-[#fff8dc] hover:text-navy",
                isActive && "bg-[#fdefb9] font-semibold text-navy"
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="m-4 rounded-xl bg-[#fffcf1] p-4">
        <p className="truncate text-[13px] font-semibold text-navy">{user?.school}</p>
        <p className="truncate text-[12px] text-navy/60">{user?.email}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          onClick={() => {
            logout()
            navigate("/login", { replace: true })
          }}
        >
          <LogOut /> Log out
        </Button>
      </div>
    </div>
  )
}

export default function DashboardLayout() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const current = dashboardNav.find((n) => (n.end ? pathname === n.to : pathname.startsWith(n.to)))

  return (
    <div className="min-h-screen bg-[#f8f9fc] print:bg-white">
      <ScrollToTop />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] print:!hidden border-r border-slate-100 bg-white lg:block">
        <SidebarContent />
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[270px] p-0">
          <SheetTitle className="sr-only">Dashboard menu</SheetTitle>
          <SidebarContent onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="lg:pl-[250px] print:!pl-0">
        <header className="sticky top-0 z-20 flex h-[68px] print:hidden items-center gap-3 border-b border-slate-100 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <Button variant="ghost" size="icon" className="-ml-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="!size-6" />
          </Button>
          <h1 className="text-[18px] font-semibold text-navy sm:text-[20px]">{current?.label ?? "Dashboard"}</h1>

          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
              <input
                type="search"
                placeholder="Search students, teachers…"
                className="h-10 w-64 rounded-full border border-slate-200 bg-[#f8f9fc] pl-9 pr-4 text-[13px] text-navy placeholder:text-navy/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-[#fff8dc]" aria-label="Notifications">
              <Bell className="h-5 w-5 text-navy" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white" />
            </button>
            <Link to="/dashboard/settings" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-[14px] font-bold text-navy">
                {initials(user?.name)}
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block text-[13px] font-semibold text-navy">{user?.name}</span>
                <span className="block text-[11px] text-navy/60">Administrator</span>
              </span>
            </Link>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
