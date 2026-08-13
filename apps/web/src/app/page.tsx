import { AppShell } from "@/components/layout/AppShell"
import { StatCard } from "@/components/finance/StatCard"
import { TransactionRow } from "@/components/finance/TransactionRow"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, DollarSign, CreditCard, Activity } from "lucide-react"

export default function Home() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <div className="flex gap-2">
            <Button variant="outline">Download Report</Button>
            <Button variant="success">Add Funds</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Balance"
            value="$45,231.89"
            trend={{ value: 20.1, label: "from last month" }}
            icon={<DollarSign className="w-4 h-4 text-foreground/50" />}
          />
          <StatCard
            title="Monthly Spending"
            value="$3,456.00"
            trend={{ value: -4.5, label: "from last month" }}
            icon={<CreditCard className="w-4 h-4 text-foreground/50" />}
          />
          <StatCard
            title="Investment Value"
            value="$12,345.67"
            trend={{ value: 12.3, label: "from last month" }}
            icon={<Activity className="w-4 h-4 text-foreground/50" />}
          />
          <StatCard
            title="Active Goals"
            value="4"
            icon={<ArrowUpRight className="w-4 h-4 text-foreground/50" />}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Cash Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-surface-muted rounded-md text-foreground/50">
                Chart Placeholder
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-3 flex flex-col">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-0">
              <div className="flex flex-col">
                <TransactionRow
                  id="1"
                  date="Today, 2:34 PM"
                  description="Apple Store"
                  category="Electronics"
                  amount={-999.00}
                  status="completed"
                />
                <TransactionRow
                  id="2"
                  date="Today, 9:00 AM"
                  description="Starbucks"
                  category="Food & Drink"
                  amount={-5.40}
                  status="completed"
                />
                <TransactionRow
                  id="3"
                  date="Yesterday"
                  description="Salary Deposit"
                  category="Income"
                  amount={4500.00}
                  status="completed"
                />
                <TransactionRow
                  id="4"
                  date="Yesterday"
                  description="Uber"
                  category="Transportation"
                  amount={-24.50}
                  status="pending"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
