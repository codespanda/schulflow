import { ArrowRight, LayoutDashboard, Menu } from "lucide-react"
import { Link, NavLink } from "react-router-dom"

import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/context/AuthContext"
import { cn } from "@/lib/utils"

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
]

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.03] bg-white/95 backdrop-blur">
      <div className="container flex h-[68px] items-center justify-between gap-4 lg:h-[76px]">
        <Logo />

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative py-2 text-[15px] transition-colors hover:text-navy",
                  isActive
                    ? "font-semibold text-navy after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:rounded-full after:bg-primary"
                    : "text-navy/70"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <Button asChild className="h-11 px-6 text-[15px]">
              <Link to="/dashboard">
                <LayoutDashboard /> Go to Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="outline" className="h-11 px-7 text-[15px]">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="h-11 px-6 text-[15px]">
                <Link to="/signup">
                  Get Started Free <ArrowRight />
                </Link>
              </Button>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="!size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-[300px] flex-col">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Logo />
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.label}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "rounded-lg px-3 py-2.5 text-[15px] text-navy/80 hover:bg-accent",
                        isActive && "bg-accent font-semibold text-navy"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              {user ? (
                <SheetClose asChild>
                  <Button asChild className="h-11">
                    <Link to="/dashboard">
                      <LayoutDashboard /> Go to Dashboard
                    </Link>
                  </Button>
                </SheetClose>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button asChild variant="outline" className="h-11">
                      <Link to="/login">Login</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild className="h-11">
                      <Link to="/signup">
                        Get Started Free <ArrowRight />
                      </Link>
                    </Button>
                  </SheetClose>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
