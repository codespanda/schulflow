import { Link } from "react-router-dom"
import { ArrowRight, Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { asset } from "@/lib/utils"

const testimonials = [
  {
    quote: "SchulFlow has made our administrative work so much easier. We save hours every week and our staff loves the system.",
    name: "Priya Sharma",
    role: "Principal, Green Valley School",
    avatar: asset("/images/avatar-priya.png"),
  },
  {
    quote: "The attendance and fee management features are fantastic. It's user-friendly and very reliable.",
    name: "Rahul Mehta",
    role: "Administrator, Sunrise Public School",
    avatar: asset("/images/avatar-rahul.png"),
  },
  {
    quote: "A complete solution for all our school needs. The support team is also very responsive and helpful.",
    name: "Neha Verma",
    role: "Director, Bright Future School",
    avatar: asset("/images/avatar-neha.png"),
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-white py-12 lg:py-8">
      <div className="container grid gap-8 lg:grid-cols-[0.95fr_2.4fr] lg:gap-8">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#eba800] sm:text-[13px]">
            What our clients say
          </p>
          <h2 className="mt-2 text-[26px] font-bold leading-tight text-navy sm:text-[30px] xl:text-[32px]">
            Trusted by Schools
            <br className="hidden lg:block" /> Across the World
          </h2>
          <p className="mt-3 max-w-[300px] text-[13px] leading-relaxed text-navy/80 xl:text-[14px]">
            See how SchulFlow is making a difference in schools and educational institutions.
          </p>
          <Button asChild variant="outline-brand" className="mt-5 h-10 px-5 text-[13px]">
            <Link to="/about#testimonials">
              View All Testimonials <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {testimonials.map(({ quote, name, role, avatar }) => (
            <Card
              key={name}
              className="border-slate-100 shadow-[0_6px_24px_-10px_rgba(17,35,61,0.18)] transition-transform hover:-translate-y-1"
            >
              <CardContent className="flex h-full flex-col p-5 xl:p-6">
                <p className="text-[13px] leading-relaxed text-navy/85">“{quote}”</p>
                <div className="mt-auto flex items-center gap-3 pt-5">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[13px] font-semibold text-navy">{name}</p>
                    <p className="text-[11px] text-navy/60">{role}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
