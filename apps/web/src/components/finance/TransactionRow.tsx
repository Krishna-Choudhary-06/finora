import * as React from "react"
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
}