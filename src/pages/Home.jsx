import CallToAction from "@/components/sections/CallToAction"
import Features from "@/components/sections/Features"
import Hero from "@/components/sections/Hero"
import Operations from "@/components/sections/Operations"
import Testimonials from "@/components/sections/Testimonials"
import WhyChoose from "@/components/sections/WhyChoose"

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Operations />
      <WhyChoose />
      <Testimonials />
      <CallToAction />
    </>
  )
}
