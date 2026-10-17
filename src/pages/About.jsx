import { Eye, HeartHandshake, Lightbulb, ShieldCheck, Target, Users } from "lucide-react"

import PageHero, { IconBox, SectionHeading } from "@/components/PageHero"
import CallToAction from "@/components/sections/CallToAction"
import Testimonials from "@/components/sections/Testimonials"
import { asset } from "@/lib/utils"

const stats = [
  { value: "2,500+", label: "Schools onboarded" },
  { value: "1.2M+", label: "Students managed" },
  { value: "60K+", label: "Teachers empowered" },
  { value: "99.9%", label: "Platform uptime" },
]

const values = [
  { icon: Lightbulb, title: "Simplicity First", text: "Powerful tools that anyone at school can use from day one, without training." },
  { icon: ShieldCheck, title: "Trust & Security", text: "We protect every student record as if it were our own." },
  { icon: HeartHandshake, title: "Partnership", text: "We grow with our schools and listen to their feedback every day." },
  { icon: Users, title: "People Matter", text: "Technology should free educators to focus on students, not paperwork." },
]

const timeline = [
  { year: "2019", title: "The idea", text: "Founded by educators frustrated with registers, spreadsheets and paperwork." },
  { year: "2021", title: "First 100 schools", text: "Launched attendance, fees and exams modules with our earliest partner schools." },
  { year: "2023", title: "Mobile apps", text: "Released parent, teacher and student apps on Android and iOS." },
  { year: "2026", title: "2,500+ schools", text: "Trusted by schools across the world, from small academies to multi-campus groups." },
]

const team = [
  { name: "Arjun Kapoor", role: "Co-founder & CEO" },
  { name: "Ananya Iyer", role: "Co-founder & CTO" },
  { name: "Vikram Rao", role: "Head of Customer Success" },
]

export default function About() {
  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="Our story"
        title="Helping Schools Focus on"
        highlight="What Matters"
        description="SchulFlow was built by educators and engineers with one goal: to give every school simple, reliable tools so teachers can spend more time teaching."
      />

      {/* Story */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <img src={asset("/images/classroom.png")} alt="Teacher with students" className="mx-auto w-full max-w-[560px]" />
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who we are"
              title="Better Learning Starts with Better Management"
              description="We saw teachers spending hours on registers, fee receipts and report cards. SchulFlow brings all of it into one easy platform, so schools run smoothly and parents stay informed."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#fffcf1] p-5">
                <IconBox icon={Target} />
                <h3 className="mt-3 text-[15px] font-semibold text-navy">Our Mission</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-navy/65">
                  Make school administration effortless for every institution, big or small.
                </p>
              </div>
              <div className="rounded-2xl bg-[#fffcf1] p-5">
                <IconBox icon={Eye} />
                <h3 className="mt-3 text-[15px] font-semibold text-navy">Our Vision</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-navy/65">
                  A world where educators spend their time on students, not paperwork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy-800 py-12 sm:py-14">
        <div className="container grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-[32px] font-bold text-primary sm:text-[40px]">{s.value}</p>
              <p className="mt-1 text-[13px] text-white/75 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Our values" title="What We Stand For" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_6px_24px_-14px_rgba(17,35,61,0.2)]">
                <IconBox icon={icon} />
                <h3 className="mt-4 text-[15px] font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-navy/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Our journey" title="From One Idea to Thousands of Schools" />
          <ol className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
            <div className="absolute left-[11px] top-0 h-full w-0.5 bg-primary/30 md:left-0 md:top-[11px] md:h-0.5 md:w-full" />
            {timeline.map((t) => (
              <li key={t.year} className="relative pl-10 md:pl-0 md:pt-10">
                <span className="absolute left-0 top-0 grid h-6 w-6 place-items-center rounded-full bg-primary ring-4 ring-[#fff3cf]">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <p className="text-[13px] font-bold text-[#eba800]">{t.year}</p>
                <h3 className="mt-1 text-[16px] font-semibold text-navy">{t.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-navy/65">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="container">
          <SectionHeading eyebrow="Our team" title="The People Behind SchulFlow" />
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="rounded-2xl bg-white p-6 text-center shadow-[0_6px_24px_-14px_rgba(17,35,61,0.2)]">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-2xl font-bold text-navy ring-4 ring-[#fff3cf]">
                  {m.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <h3 className="mt-4 text-[16px] font-semibold text-navy">{m.name}</h3>
                <p className="mt-1 text-[13px] text-navy/60">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CallToAction />
    </>
  )
}
