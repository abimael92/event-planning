"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar, DollarSign, Users, TrendingUp, CheckCircle, Mail, FileText, Clock, Target } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export function VendorDashboard() {
    const [vendorName] = useState("Elite Catering Co.")
    const { t } = useTranslation()

    const stats = {
        activeBookings: 5,
        totalRevenue: 32000,
        upcomingEvents: 3,
        satisfactionRate: 96,
    }

    return (
        <div className="min-h-screen bg-background p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-full overflow-x-hidden">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                    {t('vendorDashboard.welcome')}
                </h1>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                    {t('vendorDashboard.overview')}
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        title: t('vendorDashboard.stats.activeBookings'),
                        value: stats.activeBookings,
                        icon: Calendar,
                        color: "text-primary",
                        bgColor: "bg-primary/10"
                    },
                    {
                        title: t('vendorDashboard.stats.totalRevenue'),
                        value: `$${stats.totalRevenue.toLocaleString()}`,
                        icon: DollarSign,
                        color: "text-secondary",
                        bgColor: "bg-secondary/10"
                    },
                    {
                        title: t('vendorDashboard.stats.upcomingEvents'),
                        value: stats.upcomingEvents,
                        icon: Users,
                        color: "text-accent",
                        bgColor: "bg-accent/10"
                    },
                    {
                        title: t('vendorDashboard.stats.satisfactionRate'),
                        value: `${stats.satisfactionRate}%`,
                        icon: TrendingUp,
                        color: "text-green-600",
                        bgColor: "bg-green-100"
                    },
                ].map((stat, index) => (
                    <Card key={index} className="p-4 sm:p-5 overflow-hidden">
                        <div className="flex items-center justify-between">
                            <div className="min-w-0">
                                <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">
                                    {stat.title}
                                </p>
                                <p className={`text-2xl sm:text-3xl font-bold mt-2 ${stat.color} truncate`}>
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`p-2 sm:p-3 rounded-full ${stat.bgColor} flex-shrink-0 ml-3`}>
                                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">
                            {t('vendorDashboard.recentActivity')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            {[
                                {
                                    icon: CheckCircle,
                                    title: t('vendorDashboard.activities.bookingConfirmed'),
                                    description: t('vendorDashboard.activities.corporateGala'),
                                    time: t('vendorDashboard.time.hoursAgo'),
                                    color: "text-green-600",
                                    bgColor: "bg-green-100"
                                },
                                {
                                    icon: DollarSign,
                                    title: t('vendorDashboard.activities.paymentReceived'),
                                    description: t('vendorDashboard.activities.paymentFrom'),
                                    time: t('vendorDashboard.time.daysAgo'),
                                    color: "text-secondary",
                                    bgColor: "bg-secondary/10"
                                },
                                {
                                    icon: Mail,
                                    title: t('vendorDashboard.activities.newMessage'),
                                    description: t('vendorDashboard.activities.fromPlanora'),
                                    time: t('vendorDashboard.time.daysAgo'),
                                    color: "text-primary",
                                    bgColor: "bg-primary/10"
                                },
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors w-full"
                                >
                                    <div className={`p-2 rounded-full ${activity.bgColor} flex-shrink-0`}>
                                        <activity.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${activity.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <h3 className="font-medium text-sm sm:text-base truncate">
                                                {activity.title}
                                            </h3>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {activity.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1 truncate">
                                            {activity.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </CardContent>
                </Card>

                {/* Sidebar Cards */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl">
                                {t('vendorDashboard.quickActions')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    {
                                        label: t('vendorDashboard.actions.addService'),
                                        icon: FileText,
                                        variant: "default" as const
                                    },
                                    {
                                        label: t('vendorDashboard.actions.viewCalendar'),
                                        icon: Calendar,
                                        variant: "outline" as const
                                    },
                                    {
                                        label: t('vendorDashboard.actions.generateReport'),
                                        icon: FileText,
                                        variant: "outline" as const
                                    },
                                    {
                                        label: t('vendorDashboard.actions.messageCenter'),
                                        icon: Mail,
                                        variant: "outline" as const
                                    },
                                ].map((action, index) => (
                                    <Button
                                        key={index}
                                        variant={action.variant}
                                        className="w-full justify-start gap-2 h-auto py-3 px-4 text-sm"
                                    >
                                        <action.icon className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{action.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Performance Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl">
                                {t('vendorDashboard.performanceSummary')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Target className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {t('vendorDashboard.metrics.monthlyTarget')}
                                        </span>
                                    </div>
                                    <span className="font-medium text-sm">85%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden w-full">
                                    <div className="h-full bg-primary w-4/5"></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {t('vendorDashboard.metrics.avgResponseTime')}
                                        </span>
                                    </div>
                                    <span className="font-medium text-sm text-green-600">
                                        {t('vendorDashboard.metrics.responseTimeValue')}
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden w-full">
                                    <div className="h-full bg-green-500 w-3/4"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}