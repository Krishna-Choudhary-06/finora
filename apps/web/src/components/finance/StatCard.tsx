import * as React from "react"
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
}