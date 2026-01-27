// "use client"

// import { DashboardLayout } from "@/components/layout/dashboard-layout"
// import { PaymentDashboard } from "@/features/payment-dashboard/payment-dashboard"
// import { ProtectedRoute } from "@/components/auth/protected-route"

// export default function PaymentsPage() {
//   return (
//     <ProtectedRoute>
//       <DashboardLayout>
//         <PaymentDashboard />
//       </DashboardLayout>
//     </ProtectedRoute>
//   )
// }


"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DollarSign, CreditCard, Calendar, CheckCircle, Clock, AlertCircle, Download, Filter } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { mockPayments } from "@/data/mock-data"

const payments = [
    {
        id: "1",
        event: "Boda de Kathya y Erick",
        vendor: "Salón Los Arcos",
        amount: 15000,
        date: "2026-06-01",
        type: "deposit",
        status: "paid",
        method: "Tarjeta de crédito",
        invoice: "#INV-001"
    },
    {
        id: "2",
        event: "Navidad Improving 2025",
        vendor: "Banquetes La Casona",
        amount: 25000,
        date: "2025-12-01",
        type: "deposit",
        status: "pending",
        method: "Transferencia",
        invoice: "#INV-002"
    },
    {
        id: "3",
        event: "Quinceañera de Eunice",
        vendor: "Mariachi Los Chihuahuenses",
        amount: 3000,
        date: "2027-07-01",
        type: "deposit",
        status: "paid",
        method: "Efectivo",
        invoice: "#INV-003"
    },
    {
        id: "4",
        event: "Boda de Kathya y Erick",
        vendor: "Decoraciones Elegantes",
        amount: 8000,
        date: "2026-05-15",
        type: "final",
        status: "overdue",
        method: "Transferencia",
        invoice: "#INV-004"
    }
]

export default function PaymentsPage() {
    const [activeTab, setActiveTab] = useState("all")

    const filteredPayments = activeTab === "all"
        ? payments
        : payments.filter(payment => payment.status === activeTab)

    const stats = {
        total: 63000,
        paid: 18000,
        pending: 25000,
        overdue: 8000,
        upcoming: 12000
    }

    return (
        <ProtectedRoute>
            <DashboardLayout>
            <div className="w-full space-y-6 p-4 md:p-6 overflow-x-hidden">
            
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Pagos</h1>
                        <p className="text-muted-foreground">Gestiona todos tus pagos y transacciones</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Exportar
                        </Button>
                        <Button>
                            <CreditCard className="w-4 h-4 mr-2" />
                            Nuevo Pago
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-bold">${(stats.paid / 1000).toFixed(0)}k</p>
                                    <p className="text-sm text-muted-foreground">Total Pagado</p>
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
                                    <p className="text-2xl font-bold">${(stats.pending / 1000).toFixed(0)}k</p>
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
                                    <p className="text-2xl font-bold">${(stats.overdue / 1000).toFixed(0)}k</p>
                                    <p className="text-sm text-muted-foreground">Vencidos</p>
                                </div>
                                <div className="p-3 rounded-full bg-red-100">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-bold">${(stats.upcoming / 1000).toFixed(0)}k</p>
                                    <p className="text-sm text-muted-foreground">Próximos</p>
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
                                    <p className="text-2xl font-bold">${(stats.total / 1000).toFixed(0)}k</p>
                                    <p className="text-sm text-muted-foreground">Total General</p>
                                </div>
                                <div className="p-3 rounded-full bg-purple-100">
                                    <DollarSign className="w-5 h-5 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Budget Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>Resumen de Presupuesto</CardTitle>
                        <CardDescription>Progreso de pagos vs presupuesto total</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Pagado: ${stats.paid.toLocaleString()}</span>
                                    <span>Total: ${stats.total.toLocaleString()}</span>
                                </div>
                                <Progress value={(stats.paid / stats.total) * 100} className="h-3" />
                            </div>
                            <div className="grid grid-cols-4 gap-4 text-center">
                                <div>
                                    <p className="text-lg font-bold text-green-600">28%</p>
                                    <p className="text-sm text-muted-foreground">Pagado</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-amber-600">40%</p>
                                    <p className="text-sm text-muted-foreground">Pendiente</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-red-600">13%</p>
                                    <p className="text-sm text-muted-foreground">Vencido</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-blue-600">19%</p>
                                    <p className="text-sm text-muted-foreground">Próximo</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex items-center justify-between mb-4">
                        <TabsList>
                            <TabsTrigger value="all">Todos</TabsTrigger>
                            <TabsTrigger value="paid">Pagados</TabsTrigger>
                            <TabsTrigger value="pending">Pendientes</TabsTrigger>
                            <TabsTrigger value="overdue">Vencidos</TabsTrigger>
                        </TabsList>
                        <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Filtrar
                        </Button>
                    </div>

                    <TabsContent value={activeTab} className="space-y-4">
                        {filteredPayments.map((payment) => (
                            <Card key={payment.id} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="space-y-2 flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-bold text-lg">{payment.event}</h3>
                                                        <p className="text-muted-foreground">{payment.vendor} • {payment.type === 'deposit' ? 'Anticipo' : 'Pago final'}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold">${payment.amount.toLocaleString()}</p>
                                                        <Badge className={`
                              ${payment.status === 'paid' ? 'bg-green-500' :
                                                                payment.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'}
                              text-white
                            `}>
                                                            {payment.status === 'paid' ? 'Pagado' :
                                                                payment.status === 'pending' ? 'Pendiente' : 'Vencido'}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                                        <span className="text-sm">{payment.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                                                        <span className="text-sm">{payment.method}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                                                        <span className="text-sm font-bold">{payment.invoice}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                                        <span className="text-sm">{payment.type === 'deposit' ? '30% anticipo' : '70% final'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                {payment.status === "pending" && (
                                                    <Button>
                                                        Pagar ahora
                                                    </Button>
                                                )}
                                                <Button variant="outline">
                                                    Ver recibo
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
        </DashboardLayout>
        </ProtectedRoute>
    )
}