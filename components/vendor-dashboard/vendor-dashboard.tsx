"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Calendar, DollarSign, Users, TrendingUp, CheckCircle,
    Mail, FileText, Clock, Target, Star, TrendingDown,
    Package, Image, Video, MessageSquare, Settings,
    ChevronRight, MoreVertical, Download, Share2,
    BellRing, CalendarDays, Gift, Trophy, Sparkles,
    BarChart3, PieChart, Filter, RefreshCw, Eye,
    X, Check, Edit, Trash2, Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card, CardHeader, CardTitle, CardDescription,
    CardContent, CardFooter
} from "@/components/ui/card"
import {
    Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "@/hooks/use-translation"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock data types
interface Event {
    id: string
    title: string
    client: string
    date: string
    time: string
    status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
    revenue: number
    type: string
    progress: number
}

interface Payment {
    id: string
    amount: number
    client: string
    date: string
    status: 'paid' | 'pending' | 'overdue'
    method: string
}

interface PerformanceMetric {
    label: string
    value: number
    change: number
    target: number
    color: string
}

interface QuickLink {
    label: string
    icon: React.ElementType
    href: string
    color: string
    description: string
}

interface Notification {
    id: string
    title: string
    description: string
    time: string
    type: 'success' | 'info' | 'warning' | 'error'
    read: boolean
}

export function VendorDashboard() {
    const [vendorName] = useState("Sorpresas")
    const [activeTab, setActiveTab] = useState("overview")
    const [events, setEvents] = useState<Event[]>([])
    const [payments, setPayments] = useState<Payment[]>([])
    const [loading, setLoading] = useState(true)
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: 'Booking Confirmed',
            description: 'Corporate Gala has been confirmed by the client',
            time: '2 hours ago',
            type: 'success',
            read: false
        },
        {
            id: '2',
            title: 'Payment Received',
            description: 'Payment of $9,200 has been processed',
            time: '1 day ago',
            type: 'success',
            read: false
        },
        {
            id: '3',
            title: 'Review Submitted',
            description: 'Client left a 5-star review for your service',
            time: '2 days ago',
            type: 'info',
            read: false
        }
    ])

    const [showNotifications, setShowNotifications] = useState(false)
    const [showCreateEvent, setShowCreateEvent] = useState(false)
    const [newEvent, setNewEvent] = useState({
        title: '',
        client: '',
        date: '',
        time: '',
        type: 'corporate',
        revenue: 0
    })

    const { t } = useTranslation()

    // Load mock data
    useEffect(() => {
        const loadMockData = () => {
            setEvents([
                {
                    id: '1',
                    title: 'Gala Corporativa Soles de Chihuahua',
                    client: 'Grupo Industrial Chihuahua S.A.',
                    date: '2024-12-20',
                    time: '19:00',
                    status: 'confirmed',
                    revenue: 18500,
                    type: 'corporate',
                    progress: 75
                },
                {
                    id: '2',
                    title: 'Boda Tradicional Chihuahuense',
                    client: 'Familia Rodríguez-González',
                    date: '2024-12-22',
                    time: '16:30',
                    status: 'pending',
                    revenue: 32500,
                    type: 'wedding',
                    progress: 40
                },
                {
                    id: '3',
                    title: 'XV Años de Valeria',
                    client: 'Familia Martínez',
                    date: '2024-12-18',
                    time: '14:00',
                    status: 'confirmed',
                    revenue: 18200,
                    type: 'quinceañera',
                    progress: 90
                },
                {
                    id: '4',
                    title: 'Posada Empresarial Navideña',
                    client: 'Cámara de Comercio de Chihuahua',
                    date: '2024-12-25',
                    time: '18:00',
                    status: 'pending',
                    revenue: 29500,
                    type: 'corporate',
                    progress: 20
                },
                {
                    id: '5',
                    title: 'Graduación ITCH II',
                    client: 'Instituto Tecnológico de Chihuahua II',
                    date: '2024-12-28',
                    time: '17:00',
                    status: 'confirmed',
                    revenue: 12500,
                    type: 'graduation',
                    progress: 60
                },
                {
                    id: '6',
                    title: 'Boda en Hacienda San Marcos',
                    client: 'Carlos y Fernanda',
                    date: '2024-12-30',
                    time: '15:00',
                    status: 'pending',
                    revenue: 42800,
                    type: 'wedding',
                    progress: 30
                },
            ])

            setPayments([
                {
                    id: '1',
                    amount: 9200,
                    client: 'Familia Martínez',
                    date: '2024-12-15',
                    status: 'paid',
                    method: 'Transferencia Bancaria'
                },
                {
                    id: '2',
                    amount: 16250,
                    client: 'Grupo Industrial Chihuahua S.A.',
                    date: '2024-12-14',
                    status: 'pending',
                    method: 'Transferencia Bancaria'
                },
                {
                    id: '3',
                    amount: 8500,
                    client: 'Familia Rodríguez-González',
                    date: '2024-12-10',
                    status: 'paid',
                    method: 'Tarjeta de Crédito'
                },
                {
                    id: '4',
                    amount: 13800,
                    client: 'Cámara de Comercio de Chihuahua',
                    date: '2024-12-05',
                    status: 'overdue',
                    method: 'Transferencia Bancaria'
                },
                {
                    id: '5',
                    amount: 6250,
                    client: 'Instituto Tecnológico de Chihuahua II',
                    date: '2024-12-03',
                    status: 'paid',
                    method: 'Depósito en Efectivo'
                },
                {
                    id: '6',
                    amount: 21400,
                    client: 'Carlos y Fernanda',
                    date: '2024-11-28',
                    status: 'paid',
                    method: 'Tarjeta de Crédito'
                },
            ])

            setLoading(false)
        }

        setTimeout(loadMockData, 1000)
    }, [])

    // Calculate stats dynamically
    const stats = {
        activeBookings: events.filter(e => e.status === 'confirmed' || e.status === 'pending').length,
        totalRevenue: events.reduce((sum, event) => sum + event.revenue, 0),
        upcomingEvents: events.filter(e => e.status === 'confirmed' || e.status === 'pending').length,
        satisfactionRate: 98,
        monthlyGrowth: 32,
        completionRate: 92,
    }

    const performanceMetrics: PerformanceMetric[] = [
        {
            label: t('vendorDashboard.metrics.bookingRate'),
            value: 92,
            change: 18,
            target: 95,
            color: 'from-purple-500 to-pink-500'
        },
        {
            label: t('vendorDashboard.metrics.revenueGrowth'),
            value: 88,
            change: 32,
            target: 85,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            label: t('vendorDashboard.metrics.clientSatisfaction'),
            value: 98,
            change: 7,
            target: 96,
            color: 'from-green-500 to-emerald-500'
        },
        {
            label: t('vendorDashboard.metrics.responseTime'),
            value: 94,
            change: -1,
            target: 95,
            color: 'from-amber-500 to-orange-500'
        },
    ]

    const quickLinks: QuickLink[] = [
        {
            label: t('vendorDashboard.quickLinks.createPackage'),
            icon: Package,
            href: '/vendor/packages/create',
            color: 'from-purple-500 to-pink-500',
            description: t('vendorDashboard.quickLinks.createPackageDesc')
        },
        {
            label: t('vendorDashboard.quickLinks.uploadPortfolio'),
            icon: Image,
            href: '/vendor/portfolio',
            color: 'from-blue-500 to-cyan-500',
            description: t('vendorDashboard.quickLinks.uploadPortfolioDesc')
        },
        {
            label: t('vendorDashboard.quickLinks.manageCalendar'),
            icon: CalendarDays,
            href: '/vendor/calendar',
            color: 'from-green-500 to-emerald-500',
            description: t('vendorDashboard.quickLinks.manageCalendarDesc')
        },
        {
            label: t('vendorDashboard.quickLinks.clientFeedback'),
            icon: MessageSquare,
            href: '/vendor/feedback',
            color: 'from-amber-500 to-orange-500',
            description: t('vendorDashboard.quickLinks.clientFeedbackDesc')
        },
    ]

    // Helper functions
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
        }).format(amount)
    }

    const getEventTypeDisplay = (type: string) => {
        const eventTypes: Record<string, string> = {
            'corporate': 'Corporativo',
            'wedding': 'Boda',
            'quinceañera': 'XV Años',
            'graduation': 'Graduación',
            'charity': 'Benéfico',
            'birthday': 'Cumpleaños',
            'anniversary': 'Aniversario',
            'baby': 'Baby Shower'
        }
        return eventTypes[type] || type
    }

    const getStatusColor = (status: string) => {
        const statusColors = {
            'confirmed': 'bg-green-100 text-green-800 border-green-200',
            'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'completed': 'bg-blue-100 text-blue-800 border-blue-200',
            'cancelled': 'bg-red-100 text-red-800 border-red-200',
            'paid': 'bg-green-100 text-green-800',
            'overdue': 'bg-red-100 text-red-800'
        }
        return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-200'
    }

    const getStatusText = (status: string) => {
        return t(`common.status.${status}`) || status
    }

    // Event handlers
    const handleRefreshData = () => {
        setLoading(true)
        setTimeout(() => {
            toast.success(t('common.success'), {
                description: "Dashboard data refreshed successfully"
            })
            setLoading(false)
        }, 800)
    }

    const handleExportReport = () => {
        toast.info(t('common.info'), {
            description: "Exporting monthly report...",
            duration: 3000,
            action: {
                label: "Download",
                onClick: () => console.log("Downloading report...")
            }
        })
    }

    const handleCreateEvent = () => {
        if (!newEvent.title || !newEvent.client || !newEvent.date || !newEvent.time) {
            toast.error("Please fill in all required fields")
            return
        }

        const event: Event = {
            id: Date.now().toString(),
            title: newEvent.title,
            client: newEvent.client,
            date: newEvent.date,
            time: newEvent.time,
            status: 'pending',
            revenue: newEvent.revenue,
            type: newEvent.type,
            progress: 10
        }

        setEvents(prev => [event, ...prev])
        setShowCreateEvent(false)
        setNewEvent({
            title: '',
            client: '',
            date: '',
            time: '',
            type: 'corporate',
            revenue: 0
        })

        toast.success("Event created successfully!", {
            description: `${newEvent.title} has been added to your events`
        })
    }

    const handleUpdateEventStatus = (eventId: string, newStatus: Event['status']) => {
        setEvents(prev => prev.map(event =>
            event.id === eventId ? { ...event, status: newStatus } : event
        ))

        toast.info("Event status updated", {
            description: `Event status changed to ${newStatus}`
        })
    }

    const handleDeleteEvent = (eventId: string) => {
        setEvents(prev => prev.filter(event => event.id !== eventId))
        toast.warning("Event deleted", {
            description: "Event has been removed from your list"
        })
    }

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(notification => ({
            ...notification,
            read: true
        })))
        toast.info("All notifications marked as read")
    }

    const handleProcessPayment = (paymentId: string) => {
        setPayments(prev => prev.map(payment =>
            payment.id === paymentId ? { ...payment, status: 'paid' } : payment
        ))
        toast.success("Payment processed", {
            description: "Payment status updated to paid"
        })
    }

    const unreadNotifications = notifications.filter(n => !n.read).length

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64 mt-2" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-32 rounded-xl" />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Skeleton className="h-96 rounded-xl lg:col-span-2" />
                    <Skeleton className="h-96 rounded-xl" />
                </div>
            </div>
        )
    }

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10 p-4 sm:p-6 space-y-6 sm:space-y-8">
                {/* Header with Actions */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {t('vendorDashboard.welcome')}<span className="font-extrabold">{vendorName}</span>
                        </h1>
                        <p className="text-muted-foreground mt-2 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            {t('vendorDashboard.overview')}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleRefreshData}
                                    className="rounded-full hover:bg-primary/10"
                                >
                                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Refresh Data</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleExportReport}
                                    className="rounded-full hover:bg-primary/10"
                                >
                                    <Download className="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Export Report</TooltipContent>
                        </Tooltip>

                        <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
                            <DialogTrigger asChild>
                                <Button className="rounded-full gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg">
                                    <Calendar className="w-4 h-4" />
                                    Create Event
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create New Event</DialogTitle>
                                    <DialogDescription>
                                        Add a new event to your schedule.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Event Title</Label>
                                        <Input
                                            id="title"
                                            value={newEvent.title}
                                            onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                                            placeholder="Enter event title"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="client">Client Name</Label>
                                        <Input
                                            id="client"
                                            value={newEvent.client}
                                            onChange={(e) => setNewEvent(prev => ({ ...prev, client: e.target.value }))}
                                            placeholder="Enter client name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="date">Date</Label>
                                            <Input
                                                id="date"
                                                type="date"
                                                value={newEvent.date}
                                                onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="time">Time</Label>
                                            <Input
                                                id="time"
                                                type="time"
                                                value={newEvent.time}
                                                onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="type">Event Type</Label>
                                        <Select
                                            value={newEvent.type}
                                            onValueChange={(value) => setNewEvent(prev => ({ ...prev, type: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select event type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="corporate">Corporate</SelectItem>
                                                <SelectItem value="wedding">Wedding</SelectItem>
                                                <SelectItem value="quinceañera">XV Años</SelectItem>
                                                <SelectItem value="graduation">Graduation</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="revenue">Estimated Revenue (MXN)</Label>
                                        <Input
                                            id="revenue"
                                            type="number"
                                            value={newEvent.revenue}
                                            onChange={(e) => setNewEvent(prev => ({ ...prev, revenue: Number(e.target.value) }))}
                                            placeholder="Enter estimated revenue"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setShowCreateEvent(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleCreateEvent}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Event
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {[
                        {
                            title: 'Active Bookings',
                            value: stats.activeBookings.toString(),
                            icon: Calendar,
                            change: "+2",
                            color: "from-purple-500 to-pink-500",
                            trend: "up"
                        },
                        {
                            title: 'Total Revenue',
                            value: formatCurrency(stats.totalRevenue),
                            icon: DollarSign,
                            change: `+${stats.monthlyGrowth}%`,
                            color: "from-blue-500 to-cyan-500",
                            trend: "up"
                        },
                        {
                            title: 'Upcoming Events',
                            value: stats.upcomingEvents.toString(),
                            icon: Users,
                            change: "+1",
                            color: "from-green-500 to-emerald-500",
                            trend: "up"
                        },
                        {
                            title: 'Satisfaction Rate',
                            value: `${stats.satisfactionRate}%`,
                            icon: Star,
                            change: "+5%",
                            color: "from-amber-500 to-orange-500",
                            trend: "up"
                        },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="relative overflow-hidden group"
                        >
                            <Card className="border-0 bg-gradient-to-br from-white to-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-muted-foreground">
                                                {stat.title}
                                            </p>
                                            <p className="text-3xl font-bold">
                                                {stat.value}
                                            </p>
                                            <div className="flex items-center gap-1">
                                                {stat.trend === "up" ? (
                                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                                )}
                                                <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                                                    {stat.change}
                                                </span>
                                                <span className="text-xs text-muted-foreground">this month</span>
                                            </div>
                                        </div>
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-md`}>
                                            <stat.icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Content with Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:w-auto bg-muted/50 p-1 rounded-xl">
                        <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="events" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Events
                        </TabsTrigger>
                        <TabsTrigger value="payments" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <DollarSign className="w-4 h-4 mr-2" />
                            Payments
                        </TabsTrigger>
                        <TabsTrigger value="performance" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Trophy className="w-4 h-4 mr-2" />
                            Performance
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Events */}
                            <Card className="lg:col-span-2">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <Calendar className="w-5 h-5" />
                                            Recent Events
                                        </CardTitle>
                                        <CardDescription>
                                            Your upcoming and recent events
                                        </CardDescription>
                                    </div>
                                    <Button variant="ghost" size="sm" className="gap-2" onClick={() => setActiveTab('events')}>
                                        View All
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <AnimatePresence>
                                        <div className="space-y-4">
                                            {events.slice(0, 3).map((event, index) => (
                                                <motion.div
                                                    key={event.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    whileHover={{ x: 4 }}
                                                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
                                                >
                                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-purple-100 flex items-center justify-center">
                                                                <Calendar className="w-6 h-6 text-primary" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className="font-semibold truncate">{event.title}</h3>
                                                                <Badge variant="secondary" className={getStatusColor(event.status)}>
                                                                    {event.status}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground truncate">
                                                                {event.client} • {event.date} at {event.time}
                                                            </p>
                                                            <div className="mt-2">
                                                                <div className="flex items-center justify-between text-xs mb-1">
                                                                    <span>Progress</span>
                                                                    <span>{event.progress}%</span>
                                                                </div>
                                                                <Progress value={event.progress} className="h-2" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end ml-4">
                                                        <p className="font-bold text-lg">{formatCurrency(event.revenue)}</p>
                                                        <p className="text-xs text-muted-foreground capitalize">
                                                            {getEventTypeDisplay(event.type)}
                                                        </p>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <MoreVertical className="w-4 h-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem onClick={() => handleUpdateEventStatus(event.id, 'confirmed')}>
                                                                    <Check className="w-4 h-4 mr-2" />
                                                                    Confirm Event
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleUpdateEventStatus(event.id, 'completed')}>
                                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                                    Mark Complete
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleUpdateEventStatus(event.id, 'cancelled')}>
                                                                    <X className="w-4 h-4 mr-2" />
                                                                    Cancel Event
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteEvent(event.id)}>
                                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </AnimatePresence>
                                </CardContent>
                            </Card>

                            {/* Quick Links & Performance */}
                            <div className="space-y-6">
                                {/* Quick Links */}
                                <Card className="overflow-hidden">
                                    <CardHeader className="pb-3 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-purple-100">
                                                <Sparkles className="w-5 h-5 text-primary" />
                                            </div>
                                            <CardTitle className="text-lg font-semibold truncate">
                                                Quick Actions
                                            </CardTitle>
                                        </div>
                                        <CardDescription className="text-sm line-clamp-2 text-muted-foreground/80">
                                            Common tasks and actions
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-3">
                                            {quickLinks.map((link, index) => (
                                                <motion.div
                                                    key={index}
                                                    whileHover={{ y: -2 }}
                                                    className="group"
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        className="h-full p-3 flex flex-col items-center justify-center gap-2 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all w-full min-h-[110px] group-hover:shadow-sm"
                                                        onClick={() => toast.info(`Navigating to ${link.label}`)}
                                                    >
                                                        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${link.color} group-hover:scale-105 transition-transform`}>
                                                            <link.icon className="w-4.5 h-4.5 text-white" />
                                                        </div>
                                                        <div className="space-y-1 w-full text-center">
                                                            <span className="font-semibold text-xs sm:text-sm truncate block w-full px-1">
                                                                {link.label}
                                                            </span>
                                                            <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight h-8 overflow-hidden w-full px-0.5">
                                                                {link.description}
                                                            </p>
                                                        </div>
                                                    </Button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Performance Metrics */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <Target className="w-5 h-5" />
                                            Performance Summary
                                        </CardTitle>
                                        <CardDescription>
                                            Your key performance indicators
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {performanceMetrics.map((metric, index) => (
                                            <div key={index} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium">{metric.label}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold">{metric.value}%</span>
                                                        <Badge variant={metric.change >= 0 ? "default" : "destructive"} className="text-xs">
                                                            {metric.change >= 0 ? '+' : ''}{metric.change}%
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="relative">
                                                    <Progress value={metric.value} className="h-2" />
                                                    <div className="absolute top-0 left-0 w-full h-full flex">
                                                        <div
                                                            className="h-full border-r border-white/50"
                                                            style={{ width: `${metric.target}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between text-xs text-muted-foreground">
                                                    <span>Current: {metric.value}%</span>
                                                    <span>Target: {metric.target}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Events Tab */}
                    <TabsContent value="events">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">All Events</CardTitle>
                                        <CardDescription>
                                            Manage your upcoming and past events
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" onClick={() => toast.info("Filter functionality coming soon")}>
                                            <Filter className="w-4 h-4 mr-2" />
                                            Filter
                                        </Button>
                                        <Button onClick={() => setShowCreateEvent(true)}>
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Create Event
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {events.map((event) => (
                                        <div key={event.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-purple-100 flex items-center justify-center">
                                                    <Calendar className="w-8 h-8 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{event.title}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {event.client} • {event.date} at {event.time}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Badge className={getStatusColor(event.status)}>
                                                            {event.status}
                                                        </Badge>
                                                        <Badge variant="outline">
                                                            {getEventTypeDisplay(event.type)}
                                                        </Badge>
                                                        <span className="font-bold">{formatCurrency(event.revenue)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Progress value={event.progress} className="w-24" />
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleUpdateEventStatus(event.id, 'confirmed')}>
                                                            <Check className="w-4 h-4 mr-2" />
                                                            Confirm
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleUpdateEventStatus(event.id, 'completed')}>
                                                            <CheckCircle className="w-4 h-4 mr-2" />
                                                            Complete
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleUpdateEventStatus(event.id, 'cancelled')}>
                                                            <X className="w-4 h-4 mr-2" />
                                                            Cancel
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteEvent(event.id)}>
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Payments Tab */}
                    <TabsContent value="payments">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">Payments</CardTitle>
                                        <CardDescription>
                                            Track and manage your payments
                                        </CardDescription>
                                    </div>
                                    <Button variant="outline" onClick={handleExportReport}>
                                        <Download className="w-4 h-4 mr-2" />
                                        Export
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {payments.map((payment) => (
                                        <motion.div
                                            key={payment.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-lg ${getStatusColor(payment.status)}`}>
                                                    <DollarSign className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{formatCurrency(payment.amount)}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {payment.client} • {payment.date}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline">{payment.method}</Badge>
                                                        <Badge className={getStatusColor(payment.status)}>
                                                            {payment.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {payment.status === 'pending' && (
                                                    <Button size="sm" onClick={() => handleProcessPayment(payment.id)}>
                                                        Process
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="sm" onClick={() => toast.info(`Viewing payment ${payment.id}`)}>
                                                    View
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="border-t pt-6">
                                <div className="w-full flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">This Month</p>
                                        <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                                    </div>
                                    <Button className="gap-2" onClick={() => toast.info("Share functionality coming soon")}>
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Performance Tab */}
                    <TabsContent value="performance">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5" />
                                        Revenue Growth
                                    </CardTitle>
                                    <CardDescription>
                                        Your revenue growth over time
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/5 to-purple-100 border">
                                        <div className="text-center">
                                            <BarChart3 className="w-12 h-12 mx-auto text-primary mb-4" />
                                            <p className="text-muted-foreground">Chart visualization coming soon</p>
                                            <Button variant="outline" className="mt-4" onClick={() => toast.info("Detailed analytics coming soon")}>
                                                View Detailed Analytics
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        Client Satisfaction
                                    </CardTitle>
                                    <CardDescription>
                                        Your client satisfaction ratings
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                                                <span className="text-3xl font-bold">4.8</span>
                                                <span className="text-muted-foreground">/ 5.0</span>
                                            </div>
                                            <Badge variant="outline" className="bg-green-50 text-green-700">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                +12% this month
                                            </Badge>
                                        </div>
                                        <div className="space-y-2">
                                            {[5, 4, 3, 2, 1].map((stars) => (
                                                <div key={stars} className="flex items-center gap-2">
                                                    <span className="text-sm w-8">{stars}★</span>
                                                    <Progress value={stars * 20} className="flex-1 h-2" />
                                                    <span className="text-sm text-muted-foreground w-8">85%</span>
                                                </div>
                                            ))}
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Total Reviews</span>
                                            <span className="font-semibold">142 reviews</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Notifications Panel */}
                <AnimatePresence>
                    {unreadNotifications > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="fixed bottom-6 right-6 z-50"
                        >
                            <Card className="shadow-2xl border-primary/20 w-80">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <BellRing className="w-5 h-5 text-primary" />
                                            <CardTitle className="text-lg">Notifications</CardTitle>
                                        </div>
                                        <Badge>{unreadNotifications} new</Badge>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => setShowNotifications(false)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {notifications.slice(0, 2).map((notification) => (
                                        <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                                            {notification.type === 'success' && (
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            )}
                                            {notification.type === 'info' && (
                                                <BellRing className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                            )}
                                            {notification.type === 'warning' && (
                                                <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                            )}
                                            {notification.type === 'error' && (
                                                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                            )}
                                            <div>
                                                <p className="font-medium">{notification.title}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {notification.description}
                                                </p>
                                                <p className="text-xs text-primary mt-1">{notification.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-center"
                                        onClick={handleMarkAllAsRead}
                                    >
                                        Mark All as Read
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Notification Bell */}
                <Button
                    variant="outline"
                    size="icon"
                    className="fixed bottom-6 left-6 rounded-full shadow-lg"
                    onClick={() => setShowNotifications(!showNotifications)}
                >
                    <BellRing className="w-5 h-5" />
                    {unreadNotifications > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {unreadNotifications}
                        </span>
                    )}
                </Button>
            </div>
        </TooltipProvider>
    )
}