import { CalendarDays, ChartColumnIncreasing, SquarePen, UserRoundCog, Users, Wallet } from "lucide-react"

const features = [
  { icon: Users, title: "Student Management", text: "Maintain complete student records with ease" },
  { icon: UserRoundCog, title: "Teacher Management", text: "Track teachers, subjects and performance" },
  { icon: CalendarDays, title: "Attendance", text: "Digital attendance for students & staff" },
  { icon: Wallet, title: "Fee Management", text: "Automate fee collection and reminders" },
  { icon: SquarePen, title: "Exams & Results", text: "Create exams, evaluate and publish results" },
  { icon: ChartColumnIncreasing, title: "Reports & Analytics", text: "Get insightful reports for better decisions" },
]

export default function Features() {
  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group flex flex-col items-center text-center">
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-[#fff1b8] text-[#f2b200] transition-transform group-hover:-translate-y-1 sm:h-[58px] sm:w-[58px]">
                <Icon className="h-7 w-7" strokeWidth={2.2} />
              </span>
              <h3 className="mt-4 text-[13px] font-semibold text-navy sm:text-[14px] xl:text-[15px]">{title}</h3>
              <p className="mt-1.5 max-w-[170px] text-[12px] leading-[1.6] text-navy/65 xl:text-[13px]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
