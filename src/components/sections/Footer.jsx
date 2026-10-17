import { Link } from "react-router-dom"
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react"

import Logo from "@/components/Logo"
import { navLinks } from "@/components/sections/Header"

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
]

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      <div className="container flex flex-col items-center gap-6 py-8 text-center lg:flex-row lg:justify-between lg:py-6 lg:text-left">
        <Logo variant="dark" />

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} className="text-[13px] text-white/85 transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-10">
          <div className="flex gap-2">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-[22px] w-[22px] place-items-center rounded-md bg-white/10 text-white transition-colors hover:bg-primary hover:text-navy"
              >
                <Icon className="h-3.5 w-3.5" fill={label === "LinkedIn" ? "none" : "currentColor"} strokeWidth={label === "LinkedIn" ? 2 : 0} />
              </a>
            ))}
          </div>
          <p className="text-[12px] text-white/80">© 2026 SchulFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
