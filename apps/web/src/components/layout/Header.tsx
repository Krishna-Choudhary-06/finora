import * as React from "react"
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
}