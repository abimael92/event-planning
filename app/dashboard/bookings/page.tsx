"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle, Clock, AlertCircle, DollarSign, Users, MapPin, MoreVertical } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { DashboardLayout } from "app/dashboard/_components/dashboard-layout"

const mockBookings = [
  {
    id: "1",
    event: "Boda de Kathya y Erick",
    vendor: "Salón Los Arcos",
    service: "Locación",
    date: "2026-06-15",
    time: "4:00 PM",
    amount: 15000,
    status: "confirmed",
    deposit: 5000,
    balance: 10000,
    vendorContact: "+52 614 890 1234"
  },
  {
    id: "2",
    event: "Navidad Improving 2025",
    vendor: "Banquetes La Casona",
    service: "Catering",
    date: "2025-12-20",
    time: "7:00 PM",
    amount: 25000,
    status: "pending",
    deposit: 0,
    balance: 25000,
    vendorContact: "+52 614 678 9012"
  },
  {
    id: "3",
    event: "Quinceañera de Eunice",
    vendor: "Mariachi Los Chihuahuenses",
    service: "Música",
    date: "2027-08-10",
    time: "6:00 PM",
    amount: 8000,
    status: "confirmed",
    deposit: 3000,
    balance: 5000,
    vendorContact: "+52 614 123 4567"
  },
  {
    id: "4",
    event: "Baby Shower de Suleidy",
    vendor: "Decoraciones Elegantes",
    service: "Decoración",
    date: "2026-01-20",
    time: "2:00 PM",
    amount: 12000,
    status: "cancelled",
    deposit: 0,
    balance: 12000,
    vendorContact: "+52 614 456 7890"
  }
]

export default function BookingsPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("all")

  const filteredBookings = activeTab === "all"
    ? mockBookings
    : mockBookings.filter(booking => booking.status === activeTab)

  const stats = {
    total: mockBookings.length,
    confirmed: mockBookings.filter(b => b.status === "confirmed").length,
    pending: mockBookings.filter(b => b.status === "pending").length,
    cancelled: mockBookings.filter(b => b.status === "cancelled").length,
    totalAmount: mockBookings.reduce((sum, b) => sum + b.amount, 0)
  }

  return (
      <div className="w-full space-y-6 p-4 md:p-6 overflow-x-hidden">
        {/* Header */}
        <div className="relative overflow-hidden rounded-lg md:rounded-xl p-4 md:p-6 lg:p-8 w-full animate-gradient-shift">
          <div className="relative z-10 text-white w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className=" gap-2">
                <h1 className="text-2xl md:text-3xl font-heading font-bold">{t('dashboard.navigation.bookings')}</h1>
                <p className="text-purple-50">Gestiona todas tus reservas con proveedores</p>
              </div>

              {/* Event Countdown */}
              <div className="flex gap-2">
                <Button className="gradient-royal hover:glow-primary transition-all duration-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  Nueva Reserva
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Reservas", value: stats.total, icon: Calendar, color: "from-blue-500 to-cyan-500", change: "+2" },
            { label: "Confirmadas", value: stats.confirmed, icon: CheckCircle, color: "from-green-500 to-emerald-500", change: "+1" },
            { label: "Pendientes", value: stats.pending, icon: Clock, color: "from-amber-500 to-orange-500", change: "0" },
            { label: "Monto Total", value: `$${(stats.totalAmount / 1000).toFixed(0)}k`, icon: DollarSign, color: "from-purple-500 to-pink-500", change: "+15%" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <Badge variant="secondary" className="mt-1">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className={`p-3 rounded-full bg-gradient-to-br ${stat.color}`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{booking.event}</h3>
                            <p className="text-muted-foreground">{booking.service} • {booking.vendor}</p>
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
                          <Button className="gradient-royal hover:glow-primary transition-all duration-300">
                            Confirmar
                          </Button>
                        )}
                        <Button variant="outline">
                          Ver contrato
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
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
