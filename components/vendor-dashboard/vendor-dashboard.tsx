"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Calendar, DollarSign, Users, TrendingUp, CheckCircle,
    Mail, FileText, Clock, Target, Star, TrendingDown,
    Package, Image, Video, MessageSquare, Settings,
    ChevronRight, MoreVertical, Download, Share2,
    BellRing, CalendarDays, Gift, Trophy, Sparkles,
    BarChart3, PieChart, Filter, RefreshCw, Eye
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

export function VendorDashboard() {
    const [vendorName] = useState("Sorpresas")
    const [activeTab, setActiveTab] = useState("overview")
    const [events, setEvents] = useState<Event[]>([])
    const [payments, setPayments] = useState<Payment[]>([])
    const [loading, setLoading] = useState(true)
    const [notifications, setNotifications] = useState(3)
    const { t } = useTranslation()

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            setEvents([
                { id: '1', title: 'Corporate Gala Dinner', client: 'TechCorp Inc.', date: '2024-12-20', time: '19:00', status: 'confirmed', revenue: 8500, type: 'corporate', progress: 75 },
                { id: '2', title: 'Wedding Reception', client: 'Sarah & Michael', date: '2024-12-22', time: '16:30', status: 'pending', revenue: 12500, type: 'wedding', progress: 40 },
                { id: '3', title: 'Birthday Celebration', client: 'Emma Wilson', date: '2024-12-18', time: '14:00', status: 'confirmed', revenue: 3200, type: 'birthday', progress: 90 },
                { id: '4', title: 'Charity Fundraiser', client: 'Hope Foundation', date: '2024-12-25', time: '18:00', status: 'pending', revenue: 9500, type: 'charity', progress: 20 },
            ])

            setPayments([
                { id: '1', amount: 4200, client: 'Emma Wilson', date: '2024-12-15', status: 'paid', method: 'Credit Card' },
                { id: '2', amount: 6250, client: 'TechCorp Inc.', date: '2024-12-14', status: 'pending', method: 'Bank Transfer' },
                { id: '3', amount: 2500, client: 'Sarah & Michael', date: '2024-12-10', status: 'paid', method: 'PayPal' },
                { id: '4', amount: 3800, client: 'Hope Foundation', date: '2024-12-05', status: 'overdue', method: 'Bank Transfer' },
            ])

            setLoading(false)
        }, 1000)
    }, [])

    const stats = {
        activeBookings: 5,
        totalRevenue: 32400,
        upcomingEvents: 3,
        satisfactionRate: 96,
        monthlyGrowth: 24,
        completionRate: 87,
    }

    const performanceMetrics: PerformanceMetric[] = [
        { label: t('vendorDashboard.metrics.bookingRate'), value: 85, change: 12, target: 90, color: 'from-purple-500 to-pink-500' },
        { label: t('vendorDashboard.metrics.revenueGrowth'), value: 76, change: 24, target: 80, color: 'from-blue-500 to-cyan-500' },
        { label: t('vendorDashboard.metrics.clientSatisfaction'), value: 96, change: 5, target: 95, color: 'from-green-500 to-emerald-500' },
        { label: t('vendorDashboard.metrics.responseTime'), value: 92, change: -3, target: 95, color: 'from-amber-500 to-orange-500' },
    ]

    const quickLinks: QuickLink[] = [
        { label: t('vendorDashboard.quickLinks.createPackage'), icon: Package, href: '/vendor/packages/create', color: 'from-purple-500 to-pink-500', description: t('vendorDashboard.quickLinks.createPackageDesc') },
        { label: t('vendorDashboard.quickLinks.uploadPortfolio'), icon: Image, href: '/vendor/portfolio', color: 'from-blue-500 to-cyan-500', description: t('vendorDashboard.quickLinks.uploadPortfolioDesc') },
        { label: t('vendorDashboard.quickLinks.manageCalendar'), icon: CalendarDays, href: '/vendor/calendar', color: 'from-green-500 to-emerald-500', description: t('vendorDashboard.quickLinks.manageCalendarDesc') },
        { label: t('vendorDashboard.quickLinks.clientFeedback'), icon: MessageSquare, href: '/vendor/feedback', color: 'from-amber-500 to-orange-500', description: t('vendorDashboard.quickLinks.clientFeedbackDesc') },
    ]

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(amount)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800 border-green-200'
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
            default: return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-800'
            case 'pending': return 'bg-yellow-100 text-yellow-800'
            case 'overdue': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const handleRefreshData = () => {
        setLoading(true)
        setTimeout(() => {
            toast.success("Dashboard data refreshed successfully")
            setLoading(false)
        }, 800)
    }

    const handleExportReport = () => {
        toast.info("Exporting monthly report...")
    }

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
                            <TooltipContent>Refresh Dashboard</TooltipContent>
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

                        <Button className="rounded-full gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg">
                            <Calendar className="w-4 h-4" />
                            {t('vendorDashboard.actions.createEvent')}
                        </Button>
                    </div>
                </motion.div>

                {/* Stats Cards with Animations */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {[
                        {
                            title: t('vendorDashboard.stats.activeBookings'),
                            value: stats.activeBookings.toString(),
                            icon: Calendar,
                            change: "+2",
                            color: "from-purple-500 to-pink-500",
                            trend: "up"
                        },
                        {
                            title: t('vendorDashboard.stats.totalRevenue'),
                            value: formatCurrency(stats.totalRevenue),
                            icon: DollarSign,
                            change: `+${stats.monthlyGrowth}%`,
                            color: "from-blue-500 to-cyan-500",
                            trend: "up"
                        },
                        {
                            title: t('vendorDashboard.stats.upcomingEvents'),
                            value: stats.upcomingEvents.toString(),
                            icon: Users,
                            change: "+1",
                            color: "from-green-500 to-emerald-500",
                            trend: "up"
                        },
                        {
                            title: t('vendorDashboard.stats.satisfactionRate'),
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

                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" />
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
                                            Upcoming Events
                                        </CardTitle>
                                        <CardDescription>
                                            Your scheduled events and their progress
                                        </CardDescription>
                                    </div>
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        View All
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <AnimatePresence>
                                        <div className="space-y-4">
                                            {events.map((event, index) => (
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
                                                                    <span>Preparation Progress</span>
                                                                    <span>{event.progress}%</span>
                                                                </div>
                                                                <Progress value={event.progress} className="h-2" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end ml-4">
                                                        <p className="font-bold text-lg">{formatCurrency(event.revenue)}</p>
                                                        <p className="text-xs text-muted-foreground capitalize">{event.type}</p>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <MoreVertical className="w-4 h-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>
                                                                    <Eye className="w-4 h-4 mr-2" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Mail className="w-4 h-4 mr-2" />
                                                                    Message Client
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="text-red-600">
                                                                    <Calendar className="w-4 h-4 mr-2" />
                                                                    Reschedule
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
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <Sparkles className="w-5 h-5" />
                                            Quick Actions
                                        </CardTitle>
                                        <CardDescription>
                                            Manage your business efficiently
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-3">
                                            {quickLinks.map((link, index) => (
                                                <motion.div
                                                    key={index}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        className="h-auto p-4 flex flex-col items-center justify-center gap-3 rounded-xl border-2 hover:border-primary/30 transition-all w-full"
                                                    >
                                                        <div className={`p-3 rounded-lg bg-gradient-to-br ${link.color}`}>
                                                            <link.icon className="w-6 h-6 text-white" />
                                                        </div>
                                                        <span className="font-semibold text-sm">{link.label}</span>
                                                        <p className="text-xs text-muted-foreground text-center">
                                                            {link.description}
                                                        </p>
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
                                            Performance Metrics
                                        </CardTitle>
                                        <CardDescription>
                                            Track your key performance indicators
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
                                            Manage and track all your scheduled events
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <Filter className="w-4 h-4 mr-2" />
                                            Filter
                                        </Button>
                                        <Button>
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Add New Event
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Events table/calendar view would go here */}
                                <div className="rounded-lg border p-8 text-center">
                                    <CalendarDays className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Events Calendar View</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Interactive calendar with drag & drop scheduling
                                    </p>
                                    <Button>Open Calendar</Button>
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
                                        <CardTitle className="text-2xl">Payment History</CardTitle>
                                        <CardDescription>
                                            Track invoices, payments, and revenue
                                        </CardDescription>
                                    </div>
                                    <Button variant="outline">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Statements
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {payments.map((payment, index) => (
                                        <motion.div
                                            key={payment.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-lg ${getPaymentStatusColor(payment.status)}`}>
                                                    <DollarSign className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{formatCurrency(payment.amount)}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {payment.client} • {payment.date}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline">{payment.method}</Badge>
                                                        <Badge className={getPaymentStatusColor(payment.status)}>
                                                            {payment.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                View Invoice
                                            </Button>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="border-t pt-6">
                                <div className="w-full flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Revenue This Month</p>
                                        <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                                    </div>
                                    <Button className="gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share Financial Report
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
                                        Revenue Analytics
                                    </CardTitle>
                                    <CardDescription>
                                        Monthly revenue trends and projections
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* Chart would go here */}
                                    <div className="h-64 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/5 to-purple-100 border">
                                        <div className="text-center">
                                            <BarChart3 className="w-12 h-12 mx-auto text-primary mb-4" />
                                            <p className="text-muted-foreground">Revenue chart visualization</p>
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
                                        Ratings and feedback from clients
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
                    {notifications > 0 && (
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
                                        <Badge>{notifications} new</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                                        <Gift className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium">New Booking Request</p>
                                            <p className="text-sm text-muted-foreground">
                                                Corporate event for 200 guests
                                            </p>
                                            <p className="text-xs text-primary mt-1">2 hours ago</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-center"
                                        onClick={() => setNotifications(0)}
                                    >
                                        Mark all as read
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </TooltipProvider>
    )
}