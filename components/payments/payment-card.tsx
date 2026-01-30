"use client"

import { DollarSign, Clock, CheckCircle, AlertCircle, MoreVertical } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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

interface PaymentCardProps {
  payment: Payment
  index: number
}

export function PaymentCard({ payment, index }: PaymentCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={`/placeholder-icon.png?height=48&width=48&text=${payment.vendorName[0]}`} />
                <AvatarFallback>{payment.vendorName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{payment.vendorName}</h3>
                <p className="text-sm text-gray-600">{payment.eventName}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {payment.type}
                  </Badge>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">Due {payment.dueDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-lg font-bold text-gray-900">${payment.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusIcon(payment.status)}
                  <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                </div>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2">
                  <div className="space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Download Receipt
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Contact Vendor
                    </Button>
                    {payment.status === "pending" && (
                      <Button variant="ghost" size="sm" className="w-full justify-start text-green-600">
                        Pay Now
                      </Button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {payment.escrowStatus === "held" && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm text-blue-800 font-medium">Payment held in escrow until event completion</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
