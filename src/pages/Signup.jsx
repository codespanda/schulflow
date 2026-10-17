import { useState } from "react"
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import AuthLayout, { PasswordInput } from "@/components/AuthLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(e.currentTarget))
    setError("")
    setLoading(true)
    try {
      await signup({
        name: form.name.trim(),
        phone: form.phone.trim(),
        school: form.school.trim(),
        students: form.students,
        email: form.email,
        password: form.password,
      })
      navigate("/dashboard", { replace: true })
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Start your free trial" subtitle="Set up SchulFlow for your school in under 5 minutes.">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div role="alert" className="flex items-center gap-2 rounded-lg bg-red-50 px-3.5 py-3 text-[13px] text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" required placeholder="Your name" autoComplete="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+91 00000 00000" autoComplete="tel" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="school">School name</Label>
          <Input id="school" name="school" required placeholder="e.g. Green Valley School" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="students">Number of students</Label>
          <select
            id="students"
            name="students"
            defaultValue=""
            required
            className="flex h-11 w-full rounded-lg border border-input bg-white px-3 text-sm text-navy shadow-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <option value="" disabled>
              Select range
            </option>
            <option>Less than 300</option>
            <option>300 – 1,000</option>
            <option>1,000 – 3,000</option>
            <option>More than 3,000</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@school.com" autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            name="password"
            required
            minLength={8}
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
        </div>
        <label className="flex items-start gap-2.5 text-[13px] text-navy/75">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded accent-[#f9c41f]" />
          <span>
            I agree to the{" "}
            <a href="#" className="font-medium text-navy underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium text-navy underline">
              Privacy Policy
            </a>
          </span>
        </label>
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Creating account…
            </>
          ) : (
            <>
              Create Account <ArrowRight />
            </>
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-[13px] text-navy/65">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-navy underline decoration-primary decoration-2 underline-offset-4">
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}
