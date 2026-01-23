"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "../../app/shared/lib/utils"
import {
    LogOut,
    LayoutDashboard,
    Package,
    Calendar,
    Users,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    Bell,
    Search,
    Plus,
    TrendingUp,
    Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useAuth } from "../../app/contexts/auth-context" // Add this import



interface VendorLayoutProps {
    children: ReactNode
}

export function VendorLayout({ children }: VendorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { t } = useTranslation()


    const navItems = [
        { href: "/vendor", label: t('vendorLayout.navigation.overview'), icon: LayoutDashboard, badge: 3 },
        { href: "/vendor/events", label: t('vendorLayout.navigation.events'), icon: Calendar, badge: 12 },
        { href: "/vendor/orders", label: t('vendorLayout.navigation.orders'), icon: Package, badge: 8 },
        { href: "/vendor/reservations", label: t('vendorLayout.navigation.reservations'), icon: Users },
        { href: "/vendor/analytics", label: t('vendorLayout.navigation.analytics'), icon: BarChart3 },
        { href: "/vendor/settings", label: t('vendorLayout.navigation.settings'), icon: Settings },
    ]

    const stats = [
        {
            label: t('vendorLayout.stats.activeEvents'),
            value: "12",
            change: "+2",
            icon: Calendar
        },
        {
            label: t('vendorLayout.stats.pendingOrders'),
            value: "8",
            change: "+1",
            icon: Package
        },
        {
            label: t('vendorLayout.stats.thisMonth'),
            value: "$24.5k",
            change: "+12%",
            icon: TrendingUp
        },
    ]
    
      const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    setSidebarOpen(false)
  }
    

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50/30">
            {/* Mobile Overlay */}
             {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:static inset-y-0 left-0 z-50 bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-2xl lg:shadow-xl transition-all duration-300 ease-in-out flex flex-col",
               sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
                <div className="flex flex-col h-full !p-2 lg:p-6">
                    {/* Header */}
                    <div className={cn(
                        "flex items-center gap-3 mb-6 lg:mb-8 transition-all duration-300",
                        sidebarCollapsed && "justify-center"
                    )}>
                        <div className="flex items-center gap-3 flex-1">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg flex items-center justify-center flex-shrink-0">
                                <TrendingUp className={sidebarCollapsed ? "h-4 w-4 text-white" : "h-6 w-6 lg:h-7 lg:w-7 text-white"} />
                            </div>
                            {!sidebarCollapsed && (
                                <div className="flex-1 min-w-0 overflow-hidden">
                                    <h1 className="font-cinzel text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent truncate">
                                        {t('vendorLayout.platformName')}
                                    </h1>
                                    <p className="text-xs text-muted-foreground truncate">{t('vendorLayout.platformSubtitle')}</p>
                                </div>
                            )}
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="hidden lg:flex hover:bg-white/50 flex-shrink-0 h-8 w-8 lg:h-9 lg:w-9"
                        >
                            {sidebarCollapsed ? <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" /> : <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />}
                        </Button>


                    </div>

                    {/* Quick Stats */}
                    {!sidebarCollapsed ? (
                        // Expanded stats view
                        <div className="mb-6 lg:mb-8 space-y-3">
                            <h3 className="text-sm lg:text-base font-semibold text-muted-foreground">{t('vendorLayout.quickStats')}</h3>
                            <div className="grid grid-cols-3 gap-2 lg:gap-3">
                                {stats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    const colors = [
                                        "from-purple-500 to-blue-500",
                                        "from-blue-500 to-cyan-500",
                                        "from-green-500 to-emerald-500"
                                    ];
                                    const bgColors = [
                                        "bg-purple-50/80 border-purple-100",
                                        "bg-blue-50/80 border-blue-100",
                                        "bg-green-50/80 border-green-100"
                                    ];

                                    return (
                                        <div
                                            key={index}
                                            className={`${bgColors[index]} backdrop-blur-sm rounded-xl p-2 border shadow-sm hover:shadow-md transition-all duration-200 group min-h-[90px] flex flex-col items-center justify-between text-center`}
                                        >
                                            {/* Icon */}
                                            <div className={`p-2 rounded-lg bg-gradient-to-br ${colors[index]} shadow-sm`}>
                                                <Icon className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                                            </div>

                                            {/* Value */}
                                            <div className="text-sm font-bold text-gray-900 truncate max-w-full">
                                                {stat.value}
                                            </div>

                                            {/* Label */}
                                            <div className="text-[10px] text-gray-600 font-medium max-w-full line-clamp-2 leading-tight">
                                                {stat.label}
                                            </div>

                                            {/* Change Badge */}
                                            <Badge
                                                variant="secondary"
                                                className="text-[10px] h-4 px-1 bg-white/80 text-green-700 border border-green-200/60"
                                            >
                                                <span className="flex items-center gap-0.5">
                                                    <TrendingUp className="w-2.5 h-2.5" />
                                                    {stat.change}
                                                </span>
                                            </Badge>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        // Keep your existing collapsed stats view
                        <div className="mb-6 lg:mb-8">
                            <div className="flex flex-col items-center gap-3">
                                {stats.map((stat, index) => {
                                    const icons = [Calendar, Package, TrendingUp];
                                    const Icon = icons[index];
                                    const colors = [
                                        "from-purple-500 to-blue-500",
                                        "from-blue-500 to-cyan-500",
                                        "from-green-500 to-emerald-500"
                                    ];

                                    return (
                                        <div
                                            key={index}
                                            className="relative group"
                                            title={`${stat.label}: ${stat.value} (${stat.change})`}
                                        >
                                            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colors[index]} shadow-sm text-white hover:shadow-md transition-all duration-200`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border border-white shadow-xs flex items-center justify-center">
                                                <span className="text-[8px] font-bold text-green-700">{stat.change}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="space-y-1 flex-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname?.startsWith(item.href)

                            return (
                                <button
                                    key={item.href}
                                     onClick={() => handleNavigation(item.href)}
                                    className={cn(
                                        "group flex items-center relative overflow-hidden transition-all duration-200 w-full",
                                        sidebarCollapsed
                                            ? "justify-center p-2 rounded-xl"
                                            : "gap-3 rounded-xl px-3 py-2 lg:py-3",
                                        isActive
                                            ? "bg-white shadow-lg border border-white/60 text-primary"
                                            : "text-muted-foreground hover:text-foreground hover:bg-white/60 hover:shadow-md hover:border-white/50"
                                    )}
                                >
                                    {/* Keep all the same inner content */}
                                    <div className={cn(
                                        "flex items-center justify-center rounded-lg transition-all duration-200 relative",
                                        sidebarCollapsed ? "w-10 h-10" : "w-9 h-9 lg:w-10 lg:h-10",
                                        isActive
                                            ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-md"
                                            : "bg-white/50 group-hover:bg-white/80 text-muted-foreground group-hover:text-primary"
                                    )}>
                                        <Icon className={sidebarCollapsed ? "h-5 w-5" : "h-4 w-4 lg:h-5 lg:w-5"} />
                                    </div>

                                    {!sidebarCollapsed && (
                                        <>
                                            <span className="font-medium text-sm flex-1 truncate ml-2 text-left">{item.label}</span>
                                            {item.badge && (
                                                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs h-5 px-1.5 flex-shrink-0">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </>
                                    )}
                                </button>
                            )
                        })}
                    </nav>

                    {/* Create Event Button */}
                    <div className="mt-4">
                        {sidebarCollapsed ? (
                            <Button
                                size="icon"
                                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 group"
                                title={t('vendorLayout.actions.createEvent')}
                            >
                                <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            </Button>
                        ) : (
                            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 group">
                                <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                                {t('vendorLayout.actions.createEvent')}
                            </Button>
                        )}
                    </div>

                    {/* User Section */}
                    <div className={cn(
                        "flex items-center gap-3 pt-4 border-t border-white/40",
                        sidebarCollapsed && "justify-center flex-col gap-2"
                    )}>
                        <div className={cn(
                            "rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0",
                            sidebarCollapsed ? "w-8 h-8 text-xs" : "w-8 h-8 lg:w-9 lg:h-9 text-sm"
                        )}>
                            A
                        </div>
                        {!sidebarCollapsed && (
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <p className="text-xs lg:text-sm font-semibold truncate">{t('vendorLayout.user.name')}</p>
                                <p className="text-[10px] lg:text-xs text-muted-foreground truncate">{t('vendorLayout.user.plan')}</p>
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleLogout}
                            className={cn(
                                "hover:bg-white/50 flex-shrink-0",
                                sidebarCollapsed ? "h-8 w-8" : "h-8 w-8 lg:h-9 lg:w-9"
                            )}
                            title={t('vendorLayout.logout')}
                        >
                            <LogOut className="h-4 w-4 lg:h-5 lg:w-5" />
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white/60 backdrop-blur-xl border-b border-white/40 px-4 lg:px-6 py-3 lg:py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 lg:gap-4 flex-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden hover:bg-white/50 h-9 w-9"
                            >
                                <Menu className="h-4 w-4 lg:h-5 lg:w-5" />
                            </Button>

                            {/* Search Bar */}
                            <div className="relative max-w-md flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder={t('vendorLayout.search.placeholder')}
                                    className="w-full pl-9 lg:pl-10 pr-4 py-2 lg:py-2 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-200 text-sm lg:text-base"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 lg:gap-3">
                            <Button variant="ghost" size="icon" className="relative hover:bg-white/50 h-9 w-9 lg:h-10 lg:w-10">
                                <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full border border-white"></span>
                            </Button>

                            {/* Mobile User Dropdown with Logout */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="lg:hidden hover:bg-white/50 p-1"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                                            A
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <div className="flex items-center gap-3 p-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold">
                                            A
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold truncate">{t('vendorLayout.user.name')}</p>
                                            <p className="text-xs text-muted-foreground truncate">{t('vendorLayout.user.plan')}</p>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => router.push('/vendor/settings')}>
                                        <Settings className="h-4 w-4 mr-2" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.push('/vendor/profile')}>
                                        <Users className="h-4 w-4 mr-2" />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="text-red-600 focus:text-red-600"
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Log Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}