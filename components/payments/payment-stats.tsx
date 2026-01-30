"use client"

import { DollarSign, TrendingUp, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentStatsProps {
  totalPaid: number
  totalPending: number
  totalOverdue: number
}

export function PaymentStats({ totalPaid, totalPending, totalOverdue }: PaymentStatsProps) {
  const stats = [
    {
      title: "Total Paid",
      value: `$${totalPaid.toLocaleString()}`,
      description: "Completed payments",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+12%",
    },
    {
      title: "Pending",
      value: `$${totalPending.toLocaleString()}`,
      description: "Awaiting payment",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      change: "+5%",
    },
    {
      title: "Overdue",
      value: `$${totalOverdue.toLocaleString()}`,
      description: "Past due date",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      change: "-2%",
    },
    {
      title: "Total Budget",
      value: `$${(totalPaid + totalPending + totalOverdue).toLocaleString()}`,
      description: "Across all events",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "+8%",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <span className={`text-xs font-medium ${stat.color}`}>{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
