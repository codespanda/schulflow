import { useMemo, useState } from "react"
import { AlertTriangle, BellRing, CheckCircle2, Clock, IndianRupee, Plus, Search, Wallet } from "lucide-react"

import { Badge, formatDate, formatINR, ModuleHeader, Panel, Segmented, StatTile } from "@/components/dashboard/ui"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { invoices as seed } from "@/data/school"

const statusTone = { Paid: "green", Pending: "amber", Overdue: "red" }
const today = new Date().toLocaleDateString("en-CA")

export default function Fees() {
  const [invoices, setInvoices] = useState(seed)
  const [filter, setFilter] = useState("All")
  const [query, setQuery] = useState("")
  const [paying, setPaying] = useState(null)
  const [reminded, setReminded] = useState(false)
  const [creating, setCreating] = useState(false)

  const totals = useMemo(() => {
    const sum = (status) => invoices.filter((i) => !status || i.status === status).reduce((s, i) => s + i.amount, 0)
    return { all: sum(), paid: sum("Paid"), pending: sum("Pending"), overdue: sum("Overdue") }
  }, [invoices])
  const collectedPct = totals.all ? Math.round((totals.paid / totals.all) * 100) : 0

  const q = query.trim().toLowerCase()
  const filtered = invoices.filter(
    (i) =>
      (filter === "All" || i.status === filter) &&
      (!q || i.student.toLowerCase().includes(q) || i.id.toLowerCase().includes(q))
  )
  const unpaid = invoices.filter((i) => i.status !== "Paid").length

  function recordPayment(e) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    setInvoices((list) =>
      list.map((i) => (i.id === paying.id ? { ...i, status: "Paid", paidOn: f.date, method: f.method } : i))
    )
    setPaying(null)
  }

  function createInvoice(e) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    const next = Math.max(...invoices.map((i) => Number(i.id.split("-")[1]))) + 1
    setInvoices((list) => [
      {
        id: `INV-${next}`,
        student: f.student.trim(),
        className: f.className.trim(),
        term: f.term,
        amount: Number(f.amount),
        due: f.due,
        status: f.due < today ? "Overdue" : "Pending",
      },
      ...list,
    ])
    setCreating(false)
  }

  return (
    <div className="space-y-6">
      <ModuleHeader title="Fee Management" subtitle="Term 2 · 2026–27">
        <Button variant="outline-brand" onClick={() => setReminded(true)} disabled={!unpaid}>
          <BellRing /> Send reminders
        </Button>
        <Button onClick={() => setCreating(true)}>
          <Plus /> New Invoice
        </Button>
      </ModuleHeader>

      {reminded && (
        <p className="flex items-center gap-2 rounded-xl bg-[#e8f8ed] px-4 py-3 text-[13px] text-[#1a7f37]">
          <CheckCircle2 className="h-4 w-4" /> Reminders sent to parents of {unpaid} students with unpaid fees (demo — nothing was actually sent).
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Total Billed" value={formatINR(totals.all)} hint={`${invoices.length} invoices`} icon={Wallet} tone="blue" />
        <StatTile label="Collected" value={formatINR(totals.paid)} hint={`${collectedPct}% of billed`} icon={IndianRupee} tone="green" />
        <StatTile label="Pending" value={formatINR(totals.pending)} hint="Not yet due" icon={Clock} tone="amber" />
        <StatTile label="Overdue" value={formatINR(totals.overdue)} hint="Past due date" icon={AlertTriangle} tone="red" />
      </div>

      <Panel title="Collection progress" subtitle={`${formatINR(totals.paid)} of ${formatINR(totals.all)} collected this term`}>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-[#22a447] transition-all" style={{ width: `${collectedPct}%` }} />
        </div>
        <p className="mt-2 text-right text-[13px] font-semibold text-navy">{collectedPct}%</p>
      </Panel>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Segmented options={["All", "Paid", "Pending", "Overdue"]} value={filter} onChange={setFilter} />
        <div className="relative lg:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search student or invoice" className="pl-9" />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-[#fffcf1] text-[12px] uppercase tracking-wide text-navy/60">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Invoice</th>
              <th className="px-5 py-3.5 font-semibold">Student</th>
              <th className="px-5 py-3.5 font-semibold">Amount</th>
              <th className="px-5 py-3.5 font-semibold">Due date</th>
              <th className="px-5 py-3.5 font-semibold">Status</th>
              <th className="px-5 py-3.5 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[14px]">
            {filtered.map((i) => (
              <tr key={i.id} className="hover:bg-[#fffdf5]">
                <td className="px-5 py-3.5">
                  <p className="font-medium text-navy">{i.id}</p>
                  <p className="text-[12px] text-navy/50">{i.term}</p>
                </td>
                <td className="px-5 py-3.5">
                  <p className="text-navy">{i.student}</p>
                  <p className="text-[12px] text-navy/50">{i.className}</p>
                </td>
                <td className="px-5 py-3.5 font-semibold text-navy">{formatINR(i.amount)}</td>
                <td className="px-5 py-3.5 text-navy/75">
                  {formatDate(i.due)}
                  {i.paidOn && <p className="text-[12px] text-navy/50">Paid {formatDate(i.paidOn)}</p>}
                </td>
                <td className="px-5 py-3.5">
                  <Badge tone={statusTone[i.status]}>{i.status}</Badge>
                </td>
                <td className="px-5 py-3.5 text-right">
                  {i.status === "Paid" ? (
                    <span className="text-[12px] text-navy/50">{i.method ?? "Settled"}</span>
                  ) : (
                    <Button size="sm" onClick={() => setPaying(i)}>
                      Record payment
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-navy/55">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Sheet open={!!paying} onOpenChange={(o) => !o && setPaying(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-navy">Record Payment</SheetTitle>
            <SheetDescription>Mark this invoice as paid.</SheetDescription>
          </SheetHeader>
          {paying && (
            <form onSubmit={recordPayment} className="mt-6 space-y-4">
              <div className="rounded-xl bg-[#fffcf1] p-4">
                <p className="text-[13px] text-navy/60">{paying.id} · {paying.term}</p>
                <p className="mt-1 text-[16px] font-semibold text-navy">{paying.student}</p>
                <p className="mt-2 text-[24px] font-bold text-navy">{formatINR(paying.amount)}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-method">Payment method</Label>
                <select
                  id="p-method"
                  name="method"
                  className="flex h-11 w-full rounded-lg border border-input bg-white px-3 text-sm text-navy shadow-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  <option>UPI</option>
                  <option>Cash</option>
                  <option>Bank transfer</option>
                  <option>Cheque</option>
                  <option>Card</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-date">Payment date</Label>
                <Input id="p-date" name="date" type="date" defaultValue={today} max={today} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-ref">Reference / transaction ID</Label>
                <Input id="p-ref" name="reference" placeholder="Optional" />
              </div>
              <Button type="submit" className="w-full">
                <CheckCircle2 /> Confirm Payment
              </Button>
            </form>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={creating} onOpenChange={setCreating}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-navy">New Invoice</SheetTitle>
            <SheetDescription>Bill a student for fees.</SheetDescription>
          </SheetHeader>
          <form onSubmit={createInvoice} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="n-student">Student name</Label>
              <Input id="n-student" name="student" required placeholder="Full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="n-class">Class & section</Label>
              <Input id="n-class" name="className" required placeholder="e.g. Class 5 - A" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="n-term">Term</Label>
              <select
                id="n-term"
                name="term"
                defaultValue="Term 2"
                className="flex h-11 w-full rounded-lg border border-input bg-white px-3 text-sm text-navy shadow-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <option>Term 1</option>
                <option>Term 2</option>
                <option>Term 3</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="n-amount">Amount (₹)</Label>
                <Input id="n-amount" name="amount" type="number" min="1" required placeholder="18000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="n-due">Due date</Label>
                <Input id="n-due" name="due" type="date" required defaultValue={today} />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create Invoice
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
