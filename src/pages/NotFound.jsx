import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { asset } from "@/lib/utils"

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-[#fffcf1]">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
      <div className="container relative flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <img src={asset("/images/logo.png")} alt="" className="h-16 w-auto" />
        <p className="mt-6 text-[96px] font-extrabold leading-none text-primary sm:text-[120px]">404</p>
        <h1 className="mt-2 text-[26px] font-bold text-navy sm:text-[32px]">Oops! Page not found</h1>
        <p className="mt-3 max-w-md text-[15px] text-navy/70">
          The page you are looking for may have been moved or no longer exists.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/">
            <ArrowLeft /> Back to Home
          </Link>
        </Button>
      </div>
    </section>
  )
}
