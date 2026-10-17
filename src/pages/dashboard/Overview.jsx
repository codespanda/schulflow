import {
  BookOpen,
  CalendarCheck,
  ClipboardList,
  Plus,
  Receipt,
  SquarePen,
  TrendingUp,
  User,
  UserCheck,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react"
import { Link } from "react-router-dom"

import BarChart from "@/components/dashboard/BarChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import { activities, upcomingEvents, weeklyAttendance } from "@/data/school"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Total Students", value: "1,248", change: "+24 this month", icon: Users, tone: "bg-[#2f6bff]", card: "bg-[#f4f8ff]" },
  { label: "Teachers", value: "86", change: "+2 this month", icon: User, tone: "bg-[#3a5bd9]", card: "bg-[#eef2ff]" },
  { label: "Classes", value: "32", change: "12 sections", icon: BookOpen, tone: "bg-[#22a447]", card: "bg-[#f0faf3]" },
  { label: "Pending Fees", value: "12", change: "₹1.8L outstanding", icon: Wallet, tone: "bg-[#f5a300]", card: "bg-[#fff8e6]" },
]

const activityIcon = { student: User, attendance: ClipboardList, fee: Receipt, exam: SquarePen, teacher: UserCheck }

const quickActions = [
  { label: "Add Student", icon: UserPlus, to: "/dashboard/students" },
  { label: "Mark Attendance", icon: CalendarCheck, to: "/dashboard/attendance" },
  { label: "Collect Fee", icon: Receipt, to: "/dashboard/fees" },
  { label: "Create Exam", icon: SquarePen, to: "/dashboard/exams" },
]

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"
}

/** Single-series bar chart: weekly attendance %, with per-bar hover tooltip. */
function AttendanceChart() {
  const avg = (weeklyAttendance.reduce((s, d) => s + d.value, 0) / weeklyAttendance.length).toFixed(1)

  return (
    <Card className="border-slate-100 shadow-sm">
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-[16px] text-navy">Weekly Attendance</CardTitle>
          <p className="mt-1 text-[12px] text-navy/60">Students present, % of enrolled</p>
        </div>
        <div className="text-right">
          <p className="text-[24px] font-bold leading-none text-navy">{avg}%</p>
          <p className="mt-1 inline-flex items-center gap-1 text-[12px] text-navy/60">
            <TrendingUp className="h-3.5 w-3.5 text-[#22a447]" /> week average
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <BarChart
          data={weeklyAttendance.map((d) => ({ label: d.day, value: d.value }))}
          max={100}
          ticks={[0, 25, 50, 75, 100]}
          format={(v) => `${v}%`}
          tooltip={(d) => (
            <>
              <span className="font-semibold">{d.value}%</span> present · {d.label}
            </>
          )}
        />
      </CardContent>
    </Card>
  )
}

export default function Overview() {
  const { user } = useAuth()
  const firstName = user?.name?.split(" ")[0] ?? "there"

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-[#fddc5a] via-[#fed84a] to-[#ffd43c] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-navy sm:text-[26px]">
            {greeting()}, {firstName} 👋
          </h2>
          <p className="mt-1 text-[14px] text-navy/75">Here's what's happening at {user?.school} today.</p>
        </div>
        <Link
          to="/dashboard/students"
          className="inline-flex h-11 items-center gap-2 self-start rounded-full bg-navy px-5 text-[14px] font-semibold text-white shadow-soft hover:bg-navy-800 sm:self-auto"
        >
          <Plus className="h-4 w-4" /> Add Student
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, change, icon: Icon, tone, card }) => (
          <div key={label} className={cn("flex items-center gap-4 rounded-2xl p-5 shadow-sm", card)}>
            <span className={cn("grid h-12 w-12 place-items-center rounded-xl text-white", tone)}>
              <Icon className="h-6 w-6" strokeWidth={2.2} />
            </span>
            <div>
              <p className="text-[13px] text-navy/60">{label}</p>
              <p className="text-[24px] font-bold leading-tight text-navy">{value}</p>
              <p className="text-[12px] text-navy/55">{change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <AttendanceChart />

        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-[16px] text-navy">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-slate-100">
              {activities.map(({ title, sub, time, type }) => {
                const Icon = activityIcon[type]
                return (
                  <li key={title + time} className="flex items-center gap-3.5 py-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#e8f0ff] text-[#2f6bff]">
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium text-navy">{title}</p>
                      <p className="truncate text-[12px] text-navy/55">{sub}</p>
                    </div>
                    <span className="shrink-0 text-[12px] text-navy/55">{time}</span>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-[16px] text-navy">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {quickActions.map(({ label, icon: Icon, to }) => (
              <Link
                key={label}
                to={to}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 p-4 text-center transition-colors hover:border-primary hover:bg-[#fffbea]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#fff1b8] text-[#d99a00]">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <span className="text-[13px] font-medium text-navy">{label}</span>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-[16px] text-navy">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {upcomingEvents.map((e) => (
                <li key={e.title} className="flex items-center gap-4 rounded-xl bg-[#fffcf1] p-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-white text-center leading-none shadow-sm">
                    <span>
                      <span className="block text-[16px] font-bold text-navy">{e.date}</span>
                      <span className="block text-[10px] font-medium uppercase text-[#d99a00]">{e.month}</span>
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-medium text-navy">{e.title}</p>
                    <p className="truncate text-[12px] text-navy/55">{e.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
