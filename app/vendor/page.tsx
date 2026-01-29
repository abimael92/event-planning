"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, DollarSign, Users, TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { VendorLayout } from "@/components/layout/vendor-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { mockVendorEvents, mockVendorPayments } from "@/data/mock-data"

export default function VendorPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = {
    totalEvents: mockVendorEvents.length,
    confirmed: mockVendorEvents.filter(e => e.status === "confirmed").length,
    pendingEvents: mockVendorEvents.filter(e => e.status === "pending").length,
    totalRevenue: mockVendorEvents.reduce((sum, e) => sum + e.revenue, 0),
    paid: mockVendorPayments.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0),
    pendingPayments: mockVendorPayments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)
  }

  return (
    <ProtectedRoute>
      <VendorLayout>
        <div className="w-full space-y-6 p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Panel de Proveedor</h1>
              <p className="text-muted-foreground">Gestiona tus eventos y reservas</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stats.totalEvents}</p>
                    <p className="text-sm text-muted-foreground">Total Eventos</p>
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
                    <p className="text-sm text-muted-foreground">Confirmados</p>
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
                    <p className="text-2xl font-bold">${(stats.totalRevenue / 1000).toFixed(0)}k</p>
                    <p className="text-sm text-muted-foreground">Ingresos Totales</p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">${(stats.paid / 1000).toFixed(0)}k</p>
                    <p className="text-sm text-muted-foreground">Pagado</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
              <TabsTrigger value="payments">Pagos</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Events */}
                <Card>
                  <CardHeader>
                    <CardTitle>Eventos Recientes</CardTitle>
                    <CardDescription>Últimos eventos asignados</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockVendorEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.client}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{event.date}</span>
                          </div>
                        </div>
                        <Badge
                          className={
                            event.status === 'confirmed' ? 'bg-green-500' :
                            event.status === 'pending' ? 'bg-amber-500' :
                            event.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                          }
                        >
                          {event.status === 'confirmed' ? 'Confirmado' :
                           event.status === 'pending' ? 'Pendiente' :
                           event.status === 'completed' ? 'Completado' : 'Cancelado'}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Payments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pagos Recientes</CardTitle>
                    <CardDescription>Últimas transacciones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockVendorPayments.slice(0, 3).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold">${payment.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{payment.client}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{payment.date}</span>
                          </div>
                        </div>
                        <Badge
                          className={
                            payment.status === 'paid' ? 'bg-green-500' :
                            payment.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                          }
                        >
                          {payment.status === 'paid' ? 'Pagado' :
                           payment.status === 'pending' ? 'Pendiente' : 'Vencido'}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              {mockVendorEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{event.title}</h3>
                            <p className="text-muted-foreground">{event.client} • {event.type}</p>
                          </div>
                          <Badge
                            className={
                              event.status === 'confirmed' ? 'bg-green-500' :
                              event.status === 'pending' ? 'bg-amber-500' :
                              event.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                            }
                          >
                            {event.status === 'confirmed' ? 'Confirmado' :
                             event.status === 'pending' ? 'Pendiente' :
                             event.status === 'completed' ? 'Completado' : 'Cancelado'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-bold">${event.revenue.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{event.progress}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">Ver detalles</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="payments" className="space-y-4">
              {mockVendorPayments.map((payment) => (
                <Card key={payment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg">${payment.amount.toLocaleString()}</h3>
                            <p className="text-muted-foreground">{payment.client}</p>
                          </div>
                          <Badge
                            className={
                              payment.status === 'paid' ? 'bg-green-500' :
                              payment.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                            }
                          >
                            {payment.status === 'paid' ? 'Pagado' :
                             payment.status === 'pending' ? 'Pendiente' : 'Vencido'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{payment.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{payment.method}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </VendorLayout>
    </ProtectedRoute>
  )
}
