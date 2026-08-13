import * as React from "react"
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
}