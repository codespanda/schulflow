import { Link } from "react-router-dom"
import { ArrowRight, Check, Play } from "lucide-react"

import DashboardPreview from "@/components/DashboardPreview"
import { Button } from "@/components/ui/button"
import { useElementWidth } from "@/hooks/use-element-width"
import { asset } from "@/lib/utils"

const highlights = ["Easy to Use", "Secure & Reliable", "24/7 Support"]

// Dashboard position inside hero-visual.png (1168x736), as fractions of the image.
const DASH = { left: 0.372, top: 0.228, width: 0.5796, designWidth: 677 }

function HeroVisual() {
  const [ref, width] = useElementWidth()
  const scale = (width * DASH.width) / DASH.designWidth

  return (
    <div ref={ref} className="relative w-full">
      {/* top of the photo fades and blurs into the banner background */}
      <img
        src={asset("/images/hero-visual.png")}
        alt="Smiling student holding books"
        className="block w-full select-none [mask-image:linear-gradient(to_bottom,transparent,black_38%)]"
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40%] backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      {width > 0 && (
        <DashboardPreview
          className="absolute z-10 origin-top-left"
          style={{
            left: `${DASH.left * 100}%`,
            top: `${DASH.top * 100}%`,
            transform: `scale(${scale})`,
          }}
        />
      )}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#fffcf1]">
      {/* Text and image share the page container, so the image ends in line with the header's "Get Started Free" button */}
      <div className="container flex flex-col lg:flex-row lg:items-center lg:gap-4">
        <div className="py-10 sm:py-14 lg:min-w-0 lg:flex-1 lg:py-12">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-[#fff3cf] px-4 py-1.5 text-[12px] font-medium text-navy sm:text-[13px]">
            <img src={asset("/images/logo.png")} alt="" className="h-4 w-auto" />
            Smarter Schools
            <span className="h-1 w-1 rounded-full bg-navy" />
            Better Tomorrow
          </div>

          <h1 className="mt-5 text-[34px] font-bold leading-[1.12] tracking-[-0.02em] text-navy sm:text-5xl lg:text-[40px] xl:text-[50px] 2xl:text-[54px]">
            Complete School
            <br />
            <span className="lg:whitespace-nowrap">Management <span className="text-primary">System</span></span>
          </h1>

          <p className="mt-5 max-w-[470px] text-[15px] leading-relaxed text-navy/80 sm:text-base xl:text-[17px]">
            Streamline your school operations with an all-in-one platform. Manage students, teachers, classes,
            attendance, fees, exams and more — all in one place.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
            <Button asChild size="lg" className="px-6 sm:min-w-[185px]">
              <Link to="/signup">
                Get Started Free <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline-brand" className="px-6 sm:min-w-[160px]">
              <Play className="fill-primary text-primary" /> Watch Demo
            </Button>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[13px] text-navy/80 sm:text-sm">
                <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full shrink-0 self-end lg:w-[54%] lg:pt-6">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
