import {
  Bell,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Receipt,
  School,
  Settings,
  SquarePen,
  User,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react"

import { asset, cn } from "@/lib/utils"

const menu = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Students", icon: User },
  { label: "Teachers", icon: UserCheck },
  { label: "Classes", icon: School },
  { label: "Attendance", icon: CalendarCheck },
  { label: "Fees", icon: Receipt },
  { label: "Exams", icon: SquarePen },
  { label: "Reports", icon: FileText },
  { label: "Settings", icon: Settings },
]

const stats = [
  { label: "Total Students", value: "1,248", icon: Users, tone: "blue", badge: 2 },
  { label: "Teachers", value: "86", icon: User, tone: "indigo", badge: 2 },
  { label: "Classes", value: "32", icon: BookOpen, tone: "green", badge: 2 },
  { label: "Pending Fees", value: "12", icon: Wallet, tone: "amber", badge: 3 },
]

const tones = {
  blue: { card: "bg-[#f4f8ff]", icon: "bg-[#2f6bff]", chip: "text-[#2f6bff]" },
  indigo: { card: "bg-[#eef2ff]", icon: "bg-[#3a5bd9]", chip: "text-[#3a5bd9]" },
  green: { card: "bg-[#f0faf3]", icon: "bg-[#22a447]", chip: "text-[#22a447]" },
  amber: { card: "bg-[#fff8e6]", icon: "bg-[#f5a300]", chip: "text-[#f5a300]" },
}

const activities = [
  { title: "New student enrolled", sub: "Riya Sharma - Class 5", time: "10:24 AM", icon: User },
  { title: "Attendance marked", sub: "Class 8 - Science", time: "09:45 AM", icon: ClipboardList },
  { title: "Fee received", sub: "Aarav Singh - Class 3", time: "08:20 AM", icon: Receipt },
]

/** Rendered at a fixed 677x537 design size; the parent scales it to fit. */
export default function DashboardPreview({ className, style }) {
  return (
    <div
      className={cn(
        "h-[537px] w-[677px] overflow-hidden rounded-[18px] border-[3px] border-primary bg-white shadow-[0_20px_50px_-20px_rgba(17,35,61,0.35)]",
        className
      )}
      style={style}
    >
      <div className="flex h-[60px] items-center justify-between border-b border-slate-100 px-6">
        <div className="flex items-center gap-2.5">
          <img src={asset("/images/logo.png")} alt="" className="h-7 w-auto" />
          <span className="text-[17px] font-semibold text-navy">SchulFlow</span>
        </div>
        <div className="relative">
          <Bell className="h-6 w-6 fill-navy text-navy" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary" />
        </div>
      </div>

      <div className="flex h-[471px]">
        <aside className="w-[192px] shrink-0 border-r border-slate-100 px-3.5 pt-4">
          <ul className="space-y-[7px]">
            {menu.map(({ label, icon: Icon, active }) => (
              <li
                key={label}
                className={cn(
                  "flex h-9 items-center gap-3.5 rounded-lg px-3 text-[14px] text-navy",
                  active && "bg-[#fdefb9] font-medium"
                )}
              >
                <Icon className="h-[17px] w-[17px]" strokeWidth={2.2} />
                {label}
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1 px-5 pt-[14px]">
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ label, value, icon: Icon, tone, badge }) => (
              <div
                key={label}
                className={cn(
                  "flex h-[80px] items-center gap-3 rounded-xl px-3.5 shadow-[0_2px_8px_-2px_rgba(17,35,61,0.08)]",
                  tones[tone].card
                )}
              >
                <span className={cn("grid h-[42px] w-[42px] place-items-center rounded-lg text-white", tones[tone].icon)}>
                  <Icon className="h-5 w-5" strokeWidth={2.4} />
                </span>
                <div className="flex-1">
                  <p className="whitespace-nowrap text-[12px] text-slate-500">{label}</p>
                  <p className="text-[19px] font-semibold leading-tight text-navy">{value}</p>
                </div>
                <span
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-full bg-white text-[11px] font-semibold shadow-sm",
                    tones[tone].chip
                  )}
                >
                  {badge}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-[26px] text-[17px] font-semibold text-navy">Recent Activities</p>
          <ul className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(17,35,61,0.1)]">
            {activities.map(({ title, sub, time, icon: Icon }) => (
              <li key={title} className="flex h-[70px] items-center gap-4 px-4">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#e8f0ff] text-[#2f6bff]">
                  <Icon className="h-5 w-5" strokeWidth={2.4} />
                </span>
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-navy">{title}</p>
                  <p className="text-[12.5px] text-slate-500">{sub}</p>
                </div>
                <span className="text-[13px] text-slate-500">{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
