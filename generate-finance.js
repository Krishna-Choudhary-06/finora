const fs = require('fs');
const path = require('path');

const financeDir = path.join(__dirname, 'apps/web/src/components/finance');
const layoutDir = path.join(__dirname, 'apps/web/src/components/layout');

const financeComponents = {
  'StatCard.tsx': `import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface StatCardProps {
  title: string
  value: string | number
  trend?: { value: number; label: string }
  icon?: React.ReactNode
  className?: string
}

export function StatCard({ title, value, trend, icon, className }: StatCardProps) {
  return (
    <Card className={cn("hover:shadow-card transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground/70">{title}</CardTitle>
        {icon && <div className="text-foreground/50">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono">{value}</div>
        {trend && (
          <p className={cn("text-xs mt-1", trend.value >= 0 ? "text-success" : "text-error")}>
            {trend.value >= 0 ? "+" : ""}{trend.value}%
            <span className="text-foreground/50 ml-1">{trend.label}</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}`,
  'TransactionRow.tsx': `import * as React from "react"
import { cn } from "@/lib/utils"

export interface TransactionRowProps {
  id: string
  date: string
  description: string
  category: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
}

export function TransactionRow({ date, description, category, amount, status }: TransactionRowProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border hover:bg-surface-muted transition-colors">
      <div className="flex flex-col gap-1">
        <span className="font-medium text-sm">{description}</span>
        <div className="flex items-center gap-2 text-xs text-foreground/60">
          <span>{date}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{category}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className={cn("font-mono font-medium", amount > 0 ? "text-success" : "text-foreground")}>
          {amount > 0 ? "+" : ""}{amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </span>
        <span className={cn(
          "text-[10px] uppercase tracking-wider font-semibold",
          status === 'completed' && "text-success",
          status === 'pending' && "text-warning",
          status === 'failed' && "text-error"
        )}>
          {status}
        </span>
      </div>
    </div>
  )
}`
};

const layoutComponents = {
  'AppShell.tsx': `import * as React from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar className="hidden md:flex w-64 flex-col border-r border-border bg-surface" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}`,
  'Sidebar.tsx': `import * as React from "react"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Wallet, ArrowLeftRight, PieChart, Target, Settings } from "lucide-react"

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#" },
  { label: "Accounts", icon: Wallet, href: "#" },
  { label: "Transactions", icon: ArrowLeftRight, href: "#" },
  { label: "Analytics", icon: PieChart, href: "#" },
  { label: "Goals", icon: Target, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
]

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("flex flex-col py-6", className)}>
      <div className="px-6 mb-8">
        <h1 className="text-xl font-bold tracking-tight text-primary">Finora</h1>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-primary hover:bg-surface-muted transition-colors"
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}`,
  'Header.tsx': `import * as React from "react"
import { Bell, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-4 border-b border-border bg-surface">
      <div className="flex items-center gap-4 md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="w-5 h-5" />
        </Button>
        <span className="font-bold text-lg text-primary">Finora</span>
      </div>
      <div className="hidden md:flex flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground/50" />
          <Input type="search" placeholder="Search..." className="pl-9 bg-surface-muted/50 border-none" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="w-5 h-5 text-foreground/70" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium text-sm ml-2">
          JD
        </div>
      </div>
    </header>
  )
}`
};

for (const [name, content] of Object.entries(financeComponents)) {
  fs.writeFileSync(path.join(financeDir, name), content);
}
for (const [name, content] of Object.entries(layoutComponents)) {
  fs.writeFileSync(path.join(layoutDir, name), content);
}
console.log('Done generating finance & layout components.');
