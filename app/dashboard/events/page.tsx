"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, DollarSign, MoreVertical, Filter, CalendarDays, TrendingUp } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { DashboardLayout } from "app/dashboard/_components/dashboard-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"

const mockEvents = [
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
    const { t } = useTranslation()
    const [filter, setFilter] = useState("all")

    const filteredEvents = filter === "all"
        ? mockEvents
        : mockEvents.filter(event => event.status === filter)

    const stats = {
        active: mockEvents.filter(e => e.status === "active").length,
        planning: mockEvents.filter(e => e.status === "planning").length,
        completed: mockEvents.filter(e => e.status === "completed").length,
        totalBudget: mockEvents.reduce((sum, e) => sum + e.budget, 0),
        totalSpent: mockEvents.reduce((sum, e) => sum + e.spent, 0)
    }



    return (
  
                    <div className="w-full space-y-6 p-4 md:p-6 overflow-x-hidden">

                    {/* Hero Section */}
                    <div className="relative overflow-hidden rounded-lg md:rounded-xl p-4 md:p-6 lg:p-8 w-full animate-gradient-shift">
                        <div className="relative z-10 text-white w-full">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className=" gap-2">
                                    <h1 className="text-2xl md:text-3xl font-heading font-bold">{t('dashboard.navigation.myEvents')}</h1>
                                    <p className="text-purple-50">Organiza y gestiona todos tus eventos</p>
                                </div>

                                {/* Event Countdown */}
                                <div className="flex gap-2">
                                    <Button className="gradient-royal hover:glow-primary transition-all duration-300">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Nuevo Evento
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {[
                                { label: "Activos", value: stats.active, icon: TrendingUp, color: "from-green-500 to-emerald-500" },
                                { label: "Planificación", value: stats.planning, icon: Clock, color: "from-blue-500 to-cyan-500" },
                                { label: "Completados", value: stats.completed, icon: Calendar, color: "from-purple-500 to-pink-500" },
                                { label: "Presupuesto", value: `$${(stats.totalBudget / 1000).toFixed(0)}k`, icon: DollarSign, color: "from-amber-500 to-orange-500" },
                                { label: "Gastado", value: `$${(stats.totalSpent / 1000).toFixed(0)}k`, icon: DollarSign, color: "from-red-500 to-pink-500" },
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

                        {/* Filters */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            <Button
                                variant={filter === "all" ? "default" : "outline"}
                                onClick={() => setFilter("all")}
                                className="gradient-royal hover:glow-primary transition-all duration-300"
                            >
                                Todos
                            </Button>
                            {["active", "planning", "completed"].map((status) => (
                                <Button
                                    key={status}
                                    variant={filter === status ? "default" : "outline"}
                                    onClick={() => setFilter(status)}
                                >
                                    {status === "active" ? "Activos" : status === "planning" ? "Planificación" : "Completados"}
                                </Button>
                            ))}
                            <Button variant="outline">
                                <Filter className="w-4 h-4 mr-2" />
                                Más filtros
                            </Button>
                        </div>

                        {/* Events Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="hover-lift h-full">
                                        <div className="relative h-32" style={{ background: event.cover }}>
                                            <div className="absolute inset-0 bg-black/20" />
                                            <div className="absolute top-4 left-4">
                                                <Badge className={`
                      ${event.status === 'active' ? 'bg-green-500' :
                                                        event.status === 'planning' ? 'bg-blue-500' : 'bg-purple-500'}
                      text-white
                    `}>
                                                    {event.status === 'active' ? 'Activo' :
                                                        event.status === 'planning' ? 'Planificación' : 'Completado'}
                                                </Badge>
                                            </div>
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <h3 className="text-lg font-bold">{event.title}</h3>
                                            </div>
                                        </div>

                                        <CardContent className="p-6">
                                            <div className="space-y-4">
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

                                                {/* Progress */}
                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>Progreso: {event.progress}%</span>
                                                        <span>{event.daysLeft > 0 ? `${event.daysLeft} días restantes` : 'Completado'}</span>
                                                    </div>
                                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full transition-all duration-500"
                                                            style={{
                                                                width: `${event.progress}%`,
                                                                background: event.cover
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Budget */}
                                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg">
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

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <Button variant="outline" className="flex-1">
                                                        Ver detalles
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
                        </div>
                    </div>
    )
}