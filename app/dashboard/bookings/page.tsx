"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle, Clock, DollarSign, Users } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { mockBookings } from "@/data/mock-data-minimal"

const bookings = mockBookings

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredBookings = activeTab === "all"
    ? bookings
    : bookings.filter(booking => booking.status === activeTab)

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    pending: bookings.filter(b => b.status === "pending").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
    totalAmount: bookings.reduce((sum, b) => sum + b.amount, 0)
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
      <div className="w-full space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Reservas</h1>
            <p className="text-muted-foreground">Gestiona todas tus reservas con proveedores</p>
          </div>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Nueva Reserva
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Reservas</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.confirmed}</p>
                  <p className="text-sm text-muted-foreground">Confirmadas</p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                  <p className="text-sm text-muted-foreground">Pendientes</p>
                </div>
                <div className="p-3 rounded-full bg-amber-100">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">${(stats.totalAmount / 1000).toFixed(0)}k</p>
                  <p className="text-sm text-muted-foreground">Monto Total</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:w-auto">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmadas</TabsTrigger>
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{booking.eventTitle}</h3>
                            <p className="text-muted-foreground">{booking.service} • {booking.vendorName}</p>
                          </div>
                          <Badge className={`
                            ${booking.status === 'confirmed' ? 'bg-green-500' :
                              booking.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'}
                            text-white
                          `}>
                            {booking.status === 'confirmed' ? 'Confirmada' :
                              booking.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-bold">${booking.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{booking.vendorContact}</span>
                          </div>
                        </div>

                        {/* Payment Status */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-muted-foreground">Anticipo</p>
                              <p className="text-lg font-bold">${booking.deposit.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Saldo</p>
                              <p className="text-lg font-bold">${booking.balance.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Total</p>
                              <p className="text-lg font-bold">${booking.amount.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {booking.status === "pending" && (
                          <Button>
                            Confirmar
                          </Button>
                        )}
                        <Button variant="outline">
                          Ver contrato
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  )
}

// import { BookingManagement } from "@/features/bookings/booking-management"
// import { DashboardLayout } from "@/components/layout/dashboard-layout"
// import { ProtectedRoute } from "@/components/auth/protected-route"

// export default function BookingsPage() {
//   return (
//     <ProtectedRoute>
//       <DashboardLayout>
//         <BookingManagement />
//       </DashboardLayout>
//     </ProtectedRoute>
//   )
// }
