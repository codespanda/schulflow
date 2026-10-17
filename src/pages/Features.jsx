import {
  ArrowRight,
  Bell,
  BookOpen,
  Bus,
  CalendarDays,
  ChartColumnIncreasing,
  Check,
  GraduationCap,
  Library,
  MessageSquare,
  Smartphone,
  SquarePen,
  UserRoundCog,
  Users,
  Wallet,
} from "lucide-react"
import { Link } from "react-router-dom"

import PageHero, { IconBox, SectionHeading } from "@/components/PageHero"
import ScaledDashboard from "@/components/ScaledDashboard"
import CallToAction from "@/components/sections/CallToAction"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { asset } from "@/lib/utils"

const modules = [
  { icon: Users, title: "Student Management", text: "Admissions, profiles, documents, promotions and alumni records in one place." },
  { icon: UserRoundCog, title: "Teacher Management", text: "Staff profiles, subject allocation, workload and performance tracking." },
  { icon: CalendarDays, title: "Attendance", text: "Mark daily or period-wise attendance in seconds, with instant parent alerts." },
  { icon: Wallet, title: "Fee Management", text: "Fee structures, online payments, receipts, concessions and auto reminders." },
  { icon: SquarePen, title: "Exams & Results", text: "Schedule exams, enter marks, auto-grade and publish report cards." },
  { icon: ChartColumnIncreasing, title: "Reports & Analytics", text: "Live dashboards and exportable reports for smarter decisions." },
  { icon: BookOpen, title: "Timetable", text: "Clash-free timetables for classes, teachers and rooms with substitutions." },
  { icon: MessageSquare, title: "Communication", text: "Announcements, SMS, email and in-app messages to parents and staff." },
  { icon: Library, title: "Library", text: "Catalogue books, issue and return, track fines and inventory." },
  { icon: Bus, title: "Transport", text: "Routes, stops, vehicle assignments and transport fee collection." },
  { icon: GraduationCap, title: "Homework & LMS", text: "Assign homework, share study material and collect submissions online." },
  { icon: Smartphone, title: "Mobile App", text: "Dedicated apps for parents, teachers and students on Android and iOS." },
]

const spotlights = [
  {
    eyebrow: "All-in-one dashboard",
    title: "Your whole school at a glance",
    text: "See students, teachers, classes and pending fees the moment you log in. Recent activity keeps everyone on the same page.",
    points: ["Real-time stats and activity feed", "Role-based dashboards for every user", "Quick actions for daily tasks"],
    visual: "dashboard",
  },
  {
    eyebrow: "Built for classrooms",
    title: "Less paperwork, more teaching",
    text: "Teachers mark attendance, upload homework and enter marks from any device, so they spend their time where it matters most.",
    points: ["One-tap attendance with parent alerts", "Gradebook with automatic calculations", "Works on phone, tablet and desktop"],
    visual: "classroom",
  },
]

const roles = [
  { icon: UserRoundCog, title: "Administrators", text: "Control admissions, fees, staff and reports from a single dashboard." },
  { icon: BookOpen, title: "Teachers", text: "Manage classes, attendance, homework and marks without the paperwork." },
  { icon: Users, title: "Parents", text: "Track attendance, results, fees and announcements in real time." },
  { icon: GraduationCap, title: "Students", text: "Access timetables, homework, study material and results anytime." },
]

function AttendanceCard() {
  return (
    <div className="absolute -bottom-6 -left-2 hidden w-[220px] rounded-xl border border-slate-100 bg-white p-4 shadow-soft sm:block lg:-left-8">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-navy">Today's Attendance</p>
        <Bell className="h-4 w-4 text-primary" />
      </div>
      <p className="mt-2 text-[26px] font-bold text-navy">
        96.4<span className="text-base">%</span>
      </p>
      <div className="mt-2 flex h-14 items-end gap-1.5">
        {[60, 72, 55, 80, 90, 76, 96].map((h, i) => (
          <span key={i} className="flex-1 rounded-t bg-primary/80" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
}

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        crumb="Features"
        eyebrow="Everything in one platform"
        title="Powerful Features for"
        highlight="Smarter Schools"
        description="From admissions to report cards, SchulFlow brings every part of school administration together in one simple, secure platform."
      >
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/signup">
              Get Started Free <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline-brand">
            <Link to="/pricing">View Pricing</Link>
          </Button>
        </div>
      </PageHero>

      {/* Modules */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Core modules"
            title="12 Modules, One Simple System"
            description="Turn on what you need today and add more as your school grows."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modules.map(({ icon, title, text }) => (
              <Card
                key={title}
                className="group border-slate-100 shadow-[0_6px_24px_-14px_rgba(17,35,61,0.2)] transition-all hover:-translate-y-1 hover:border-primary/60"
              >
                <CardContent className="p-6">
                  <IconBox icon={icon} className="transition-colors group-hover:bg-primary group-hover:text-white" />
                  <h3 className="mt-4 text-[15px] font-semibold text-navy">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-navy/65">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlights */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="container space-y-16 lg:space-y-24">
          {spotlights.map((s, i) => (
            <div key={s.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={i % 2 ? "lg:order-2" : undefined}>
                {s.visual === "dashboard" ? (
                  <div className="relative mx-auto max-w-[560px]">
                    <div className="absolute -inset-2 -rotate-2 sm:-inset-4 rounded-[28px] bg-primary/30" />
                    <ScaledDashboard className="relative" />
                    <AttendanceCard />
                  </div>
                ) : (
                  <img src={asset("/images/classroom.png")} alt="Teacher with students" className="mx-auto w-full max-w-[560px]" />
                )}
              </div>
              <div>
                <SectionHeading align="left" eyebrow={s.eyebrow} title={s.title} description={s.text} />
                <ul className="mt-6 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[14px] text-navy/85">
                      <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-primary">
                        <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="For everyone"
            title="Made for Every Member of Your School"
            description="Each user gets a tailored experience with exactly the tools they need."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map(({ icon, title, text }) => (
              <div key={title} className="rounded-2xl bg-gradient-to-b from-[#fff8dc] to-[#fffcf1] p-6 text-center">
                <IconBox icon={icon} className="mx-auto h-14 w-14 bg-white shadow-sm" iconClassName="h-7 w-7" />
                <h3 className="mt-4 text-[16px] font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-navy/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction title="See SchulFlow in Action" subtitle="Start your free trial today. No credit card required." />
    </>
  )
}
