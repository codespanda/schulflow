import { useState } from "react"
import { AlertCircle, ArrowRight, Info, Loader2 } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import AuthLayout, { PasswordInput } from "@/components/AuthLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { DEMO_ACCOUNT } from "@/lib/auth"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setError("")
    setLoading(true)
    try {
      await login({ email: form.get("email"), password: form.get("password") })
      navigate(location.state?.from || "/dashboard", { replace: true })
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back 👋" subtitle="Log in to your SchulFlow account to manage your school.">
      <div className="mb-6 flex gap-2.5 rounded-lg border border-primary/40 bg-[#fffbea] px-3.5 py-3 text-[12.5px] text-navy/80">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#d99a00]" />
        <p>
          Demo account: <span className="font-semibold text-navy">{DEMO_ACCOUNT.email}</span> /{" "}
          <span className="font-semibold text-navy">{DEMO_ACCOUNT.password}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div role="alert" className="flex items-center gap-2 rounded-lg bg-red-50 px-3.5 py-3 text-[13px] text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" name="email" type="email" required placeholder="you@school.com" autoComplete="email" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-[12px] font-medium text-[#d99a00] hover:underline">
              Forgot password?
            </a>
          </div>
          <PasswordInput
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>
        <label className="flex items-center gap-2.5 text-[13px] text-navy/75">
          <input type="checkbox" name="remember" className="h-4 w-4 rounded accent-[#f9c41f]" />
          Remember me for 30 days
        </label>
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Logging in…
            </>
          ) : (
            <>
              Log In <ArrowRight />
            </>
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-[13px] text-navy/65">
        New to SchulFlow?{" "}
        <Link to="/signup" className="font-semibold text-navy underline decoration-primary decoration-2 underline-offset-4">
          Create a free account
        </Link>
      </p>
    </AuthLayout>
  )
}
