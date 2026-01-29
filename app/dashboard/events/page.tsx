"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, MapPin, Users, DollarSign, Filter } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { mockEvents } from "@/data/mock-data"

const events = [
    {
        id: "1",
        title: "Boda de Kathya y Erick",
        date: "2026-06-15",
        time: "4:00 PM",
        location: "El Gran Salón de Baile",
        budget: 50000,
        spent: 35000,
        guests: 200,
        status: "active",
        progress: 70,
        daysLeft: 12,
        cover: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: "2",
        title: "Navidad Improving 2025",
        date: "2025-12-20",
        time: "7:00 PM",
        location: "Centro de Convenciones",
        budget: 75000,
        spent: 25000,
        guests: 300,
        status: "active",
        progress: 40,
        daysLeft: 45,
        cover: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        id: "3",
        title: "Quinceañera de Eunice",
        date: "2027-08-10",
        time: "6:00 PM",
        location: "Pabellón del Jardín",
        budget: 15000,
        spent: 8000,
        guests: 150,
        status: "planning",
        progress: 55,
        daysLeft: 66,
        cover: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: "4",
        title: "Conferencia Tech 2024",
        date: "2024-12-05",
        time: "9:00 AM",
        location: "Centro Tecnológico",
        budget: 30000,
        spent: 30000,
        guests: 500,
        status: "completed",
        progress: 100,
        daysLeft: -5,
        cover: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
        id: "5",
        title: "Baby Shower de Suleidy",
        date: "2026-01-20",
        time: "2:00 PM",
        location: "Jardines de la Villa",
        budget: 8000,
        spent: 3000,
        guests: 50,
        status: "planning",
        progress: 38,
        daysLeft: 92,
        cover: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    }
]

export default function EventsPage() {
    const [filter, setFilter] = useState("all")

    const filteredEvents = filter === "all"
        ? events
        : events.filter(event => event.status === filter)

    const stats = {
        active: events.filter(e => e.status === "active").length,
        planning: events.filter(e => e.status === "planning").length,
        completed: events.filter(e => e.status === "completed").length,
        totalBudget: events.reduce((sum, e) => sum + e.budget, 0),
        totalSpent: events.reduce((sum, e) => sum + e.spent, 0)
    }



    return (
        <ProtectedRoute>
                <DashboardLayout>
                    <div className="w-full space-y-6 p-4 md:p-6 overflow-x-hidden">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">Mis Eventos</h1>
                            <p className="text-muted-foreground">Organiza y gestiona todos tus eventos</p>
                        </div>
                        <Button>
                            <Calendar className="w-4 h-4 mr-2" />
                            Nuevo Evento
                        </Button>
                    </div>


                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-2xl font-bold">{stats.active}</p>
                                            <p className="text-sm text-muted-foreground">Activos</p>
                                        </div>
                                        <div className="p-3 rounded-full bg-green-100">
                                            <Calendar className="w-5 h-5 text-green-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-2xl font-bold">{stats.planning}</p>
                                            <p className="text-sm text-muted-foreground">Planificación</p>
                                        </div>
                                        <div className="p-3 rounded-full bg-blue-100">
                                            <Clock className="w-5 h-5 text-blue-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-2xl font-bold">{stats.completed}</p>
                                            <p className="text-sm text-muted-foreground">Completados</p>
                                        </div>
                                        <div className="p-3 rounded-full bg-purple-100">
                                            <Calendar className="w-5 h-5 text-purple-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-2xl font-bold">${(stats.totalBudget / 1000).toFixed(0)}k</p>
                                            <p className="text-sm text-muted-foreground">Presupuesto</p>
                                        </div>
                                        <div className="p-3 rounded-full bg-amber-100">
                                            <DollarSign className="w-5 h-5 text-amber-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-2xl font-bold">${(stats.totalSpent / 1000).toFixed(0)}k</p>
                                            <p className="text-sm text-muted-foreground">Gastado</p>
                                        </div>
                                        <div className="p-3 rounded-full bg-red-100">
                                            <DollarSign className="w-5 h-5 text-red-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            <Button
                                variant={filter === "all" ? "default" : "outline"}
                                onClick={() => setFilter("all")}
                            >
                                Todos
                            </Button>
                            <Button
                                variant={filter === "active" ? "default" : "outline"}
                                onClick={() => setFilter("active")}
                            >
                                Activos
                            </Button>
                            <Button
                                variant={filter === "planning" ? "default" : "outline"}
                                onClick={() => setFilter("planning")}
                            >
                                Planificación
                            </Button>
                            <Button
                                variant={filter === "completed" ? "default" : "outline"}
                                onClick={() => setFilter("completed")}
                            >
                                Completados
                            </Button>
                        </div>

                        {/* Events Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredEvents.map((event) => (
                                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="text-xl">{event.title}</CardTitle>
                                                <CardDescription className="mt-1">{event.location}</CardDescription>
                                            </div>
                                            <Badge
                                                className={
                                                    event.status === 'active' ? 'bg-green-500' :
                                                    event.status === 'planning' ? 'bg-blue-500' :
                                                    event.status === 'completed' ? 'bg-purple-500' : 'bg-gray-500'
                                                }
                                            >
                                                {event.status === 'active' ? 'Activo' :
                                                 event.status === 'planning' ? 'Planificación' :
                                                 event.status === 'completed' ? 'Completado' : 'Cancelado'}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm">{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm">{event.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm truncate">{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm">{event.guests} invitados</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Progreso: {event.progress}%</span>
                                                <span>{event.daysLeft > 0 ? `${event.daysLeft} días restantes` : 'Completado'}</span>
                                            </div>
                                            <Progress value={event.progress} className="h-2" />
                                        </div>
                                        <div className="bg-muted p-3 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Presupuesto</p>
                                                    <p className="text-lg font-bold">${event.budget.toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Gastado</p>
                                                    <p className="text-lg font-bold">${event.spent.toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Restante</p>
                                                    <p className="text-lg font-bold text-green-600">
                                                        ${(event.budget - event.spent).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="w-full">
                                            Ver detalles
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </DashboardLayout>
        </ProtectedRoute>
    )
}