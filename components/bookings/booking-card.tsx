"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Booking {
  id: string
  vendorName: string
  vendorCategory: string
  eventName: string
  eventDate: string
  bookingDate: string
  status: "pending" | "confirmed" | "quote_requested" | "cancelled"
  amount: number
  deposit: number
  remaining: number
  services: string[]
  notes: string
  vendorImage: string
  contractSigned: boolean
  paymentStatus: "pending" | "partial" | "paid"
  nextPaymentDue: string | null
}

interface BookingCardProps {
  booking: Booking
  onViewDetails: () => void
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
  quote_requested: { label: "Quote Requested", color: "bg-blue-100 text-blue-800 border-blue-200", icon: AlertCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
}

const paymentStatusConfig = {
  pending: { label: "Payment Pending", color: "bg-red-100 text-red-800" },
  partial: { label: "Partially Paid", color: "bg-yellow-100 text-yellow-800" },
  paid: { label: "Fully Paid", color: "bg-green-100 text-green-800" },
}

export function BookingCard({ booking, onViewDetails }: BookingCardProps) {
  const status = statusConfig[booking.status]
  const StatusIcon = status.icon
  const paymentProgress = ((booking.amount - booking.remaining) / booking.amount) * 100

  return (
    <div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
        <div className="flex">
          {/* Vendor Image */}
          <div className="w-24 h-24 flex-shrink-0">
            <img
              src={booking.vendorImage || "/placeholder.svg"}
              alt={booking.vendorName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Booking Details */}
          <CardContent className="flex-1 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-heading font-semibold text-lg">{booking.vendorName}</h3>
                  <Badge variant="outline" className={status.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{booking.vendorCategory}</p>
                <p className="text-sm font-medium">{booking.eventName}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onViewDetails}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message Vendor
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="w-4 h-4 mr-2" />
                    View Contract
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{booking.eventDate}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span>${booking.amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className={paymentStatusConfig[booking.paymentStatus].color}>
                  {paymentStatusConfig[booking.paymentStatus].label}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant={booking.contractSigned ? "default" : "outline"}>
                  <FileText className="w-3 h-3 mr-1" />
                  {booking.contractSigned ? "Signed" : "Pending"}
                </Badge>
              </div>
            </div>

            {/* Services */}
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1">Services:</p>
              <div className="flex flex-wrap gap-1">
                {booking.services.slice(0, 3).map((service) => (
                  <Badge key={service} variant="secondary" className="text-xs">
                    {service}
                  </Badge>
                ))}
                {booking.services.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{booking.services.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Payment Progress */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Payment Progress</span>
                <span>
                  ${(booking.amount - booking.remaining).toLocaleString()} / ${booking.amount.toLocaleString()}
                </span>
              </div>
              <Progress value={paymentProgress} className="h-2" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <MessageSquare className="w-4 h-4 mr-1" />
                Message
              </Button>
              <Button size="sm" onClick={onViewDetails} className="flex-1 gradient-royal text-white">
                <Eye className="w-4 h-4 mr-1" />
                Details
              </Button>
            </div>

            {/* Next Payment Due */}
            {booking.nextPaymentDue && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                <span className="text-yellow-800">Next payment due: {booking.nextPaymentDue}</span>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
