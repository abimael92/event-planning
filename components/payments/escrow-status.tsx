"use client"

import { Shield, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Payment {
  id: string
  vendorName: string
  eventName: string
  amount: number
  status: "completed" | "pending" | "overdue"
  dueDate: string
  paidDate: string | null
  type: string
  escrowStatus: string
}

interface EscrowStatusProps {
  payments: Payment[]
}

export function EscrowStatus({ payments }: EscrowStatusProps) {
  const escrowPayments = payments.filter((p) => p.escrowStatus === "held" || p.escrowStatus === "pending")
  const totalEscrow = escrowPayments.reduce((sum, p) => sum + p.amount, 0)

  const getEscrowIcon = (status: string) => {
    switch (status) {
      case "held":
        return <Shield className="w-4 h-4 text-blue-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "released":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />
    }
  }

  const getEscrowColor = (status: string) => {
    switch (status) {
      case "held":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "released":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Escrow Overview */}
      <div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Escrow Protection</span>
            </CardTitle>
            <CardDescription>Your payments are held securely until event completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">${totalEscrow.toLocaleString()}</div>
                <div className="text-sm text-blue-800">Total in Escrow</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {payments.filter((p) => p.escrowStatus === "released").length}
                </div>
                <div className="text-sm text-green-800">Payments Released</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{escrowPayments.length}</div>
                <div className="text-sm text-yellow-800">Pending Release</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Escrow Timeline */}
      <div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>Escrow Timeline</CardTitle>
            <CardDescription>Track the status of your protected payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {payments.map((payment, index) => (
              <div key={payment.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0">{getEscrowIcon(payment.escrowStatus)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{payment.vendorName}</h4>
                    <Badge className={getEscrowColor(payment.escrowStatus)}>{payment.escrowStatus}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{payment.eventName}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">${payment.amount.toLocaleString()}</span>
                    {payment.escrowStatus === "held" && (
                      <div className="flex items-center space-x-2">
                        <Progress value={75} className="w-20" />
                        <span className="text-xs text-gray-500">Event in progress</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
