"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Calendar,
  Clock,
  Music,
  UserPlus,
  ChevronRight,
  Users,
  DollarSign,
  TrendingUp,
  Sparkles,
  Heart,
  Gift,
  PartyPopper,
  Baby,
  Crown,
  Zap,
  CheckCircle2,
  Target,
  BarChart3
} from "lucide-react"
import { CreateEventModal } from "./create-event-modal"
import { GuestList } from "./guest-list"
import { useTranslation } from "@/hooks/use-translation"
import { mockGuestData } from "@/data/mock-data"
import { useRouter } from "next/navigation"

// Event icons mapping
const eventIcons = {
  wedding: Heart,
  holiday: Gift,
  celebration: Crown,
  baby: Baby,
  default: PartyPopper
}

// Enhanced mock data with vibrant event covers
const upcomingEvents = [
  {
    id: "1",
    title: "Boda de Kathya y Erick",
    date: "2026-06-15",
    time: "4:00 PM",
    location: "El Gran Salón de Baile",
    budget: 50000,
    spent: 35000,
    status: "planning" as const,
    progress: 70,
    vendors: 8,
    daysLeft: 12,
    cover: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    accentColor: "#764ba2",
    category: "wedding",
    gradient: "from-purple-500 via-violet-600 to-indigo-700"
  },
  {
    id: "2",
    title: "Navidad Improving 2025",
    date: "2025-12-20",
    time: "7:00 PM",
    location: "Centro de Convenciones del Centro",
    budget: 75000,
    spent: 25000,
    status: "planning" as const,
    progress: 40,
    vendors: 12,
    daysLeft: 45,
    cover: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    accentColor: "#f5576c",
    category: "holiday",
    gradient: "from-pink-500 via-rose-600 to-red-500"
  },
  {
    id: "3",
    title: "Quinceañera de Eunice",
    date: "2027-08-10",
    time: "6:00 PM",
    location: "Pabellón del Jardín",
    budget: 15000,
    spent: 8000,
    status: "planning" as const,
    progress: 55,
    vendors: 5,
    daysLeft: 66,
    cover: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    accentColor: "#00f2fe",
    category: "celebration",
    gradient: "from-cyan-500 via-blue-500 to-sky-600"
  },
  {
    id: "4",
    title: "Baby Shower de Suleidy",
    date: "2026-01-20",
    time: "2:00 PM",
    location: "Jardines de la Villa",
    budget: 8000,
    spent: 3000,
    status: "planning" as const,
    progress: 38,
    vendors: 4,
    daysLeft: 92,
    cover: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    accentColor: "#ff9a9e",
    category: "baby",
    gradient: "from-rose-400 via-pink-500 to-fuchsia-500"
  },
]

// Pulse animation for cards
const pulseVariants = {
  initial: { scale: 1 },
  pulse: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
}

// Glass morphism effect class
const glassEffect = "bg-white/10 backdrop-blur-md border border-white/20"
const glassEffectIntense = "bg-white/50 backdrop-blur-md border border-white/60"


export function EnhancedEventDashboard() {
  const router = useRouter()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedEventForGuests, setSelectedEventForGuests] = useState<typeof upcomingEvents[0] | null>(null)
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Helper function to calculate days between dates
  const calculateDaysLeft = (eventDate: string): number => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const event = new Date(eventDate)
    event.setHours(0, 0, 0, 0)

    const diffTime = event.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  const calculateGuestConfirmationRate = (eventId: string): number => {
    const eventGuests = mockGuestData[eventId as keyof typeof mockGuestData] || []
    if (eventGuests.length === 0) return 0

    const confirmedCount = eventGuests.filter((g: { status: string }) => g.status === 'confirmed').length
    return Math.round((confirmedCount / eventGuests.length) * 100)
  }

  // Sort events by date and find the next event
  // Sort events by date and find the next event - Shows all but sorts properly
  const sortedEvents = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return upcomingEvents
      .map(event => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)
        const diffTime = eventDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        return {
          ...event,
          daysLeft: diffDays,
          isPast: diffDays < 0,
          absoluteDays: Math.abs(diffDays)
        }
      })
      .sort((a, b) => {
        // Sort by: future events first (positive days), then by closest date
        if (a.daysLeft >= 0 && b.daysLeft >= 0) {
          return a.daysLeft - b.daysLeft
        } else if (a.daysLeft >= 0) {
          return -1 // a is future, b is past
        } else if (b.daysLeft >= 0) {
          return 1 // b is future, a is past
        } else {
          return b.absoluteDays - a.absoluteDays // both past, most recent first
        }
      })
  }, [])

  const nextEvent = sortedEvents.find(event => event.daysLeft >= 0) || sortedEvents[0]
  const totalBudget = sortedEvents.reduce((sum, event) => sum + event.budget, 0)
  const totalSpent = sortedEvents.reduce((sum, event) => sum + event.spent, 0)
  
  const ThreeDollarIcons = () => (
    <div className="flex scale-[0.7] -mx-3">
      <DollarSign className="text-cyan-400 -mr-1" />
      <DollarSign className="text-cyan-400 -mx-1" />
      <DollarSign className="text-cyan-400 -ml-1" />
    </div>
  )
  
  const NegativeDollarIcon = () => (
    <div className={`flex items-center scale-[0.8] m-0 p-0`}>
      <span className="text-red-200 -mr-1">-</span>
      <DollarSign className="text-red-200" />
    </div>
  )

  // If viewing guest list for a specific event
  if (selectedEventForGuests) {
    return (
      <GuestList
        event={{
          id: selectedEventForGuests.id,
          title: selectedEventForGuests.title,
          date: selectedEventForGuests.date,
          location: selectedEventForGuests.location
        }}
        onBack={() => setSelectedEventForGuests(null)}
      />
    )
  }

  return (
    <div className="w-full space-y-4 rounded-lg border-2 sm:space-y-6 md:space-y-8 p-3 sm:p-4 md:p-6 bg-gradient-to-b from-indigo-200/50 via-indigo-300/60 to-indigo-400/5  shadow-lg sm:shadow-xl relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-5 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full bg-gradient-to-r from-violet-600/80 via-purple-600/80 to-pink-600/80 shadow-lg sm:shadow-xl"
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-gradient-x"></div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 15 - 7.5, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-100">
                  {t('dashboard.events.greeting')}
                </h1>
              </div>
              <div className="hidden sm:block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-gradient-to-r from-yellow-400/80 to-orange-500/80 hover:from-yellow-500/80 hover:to-orange-600/80 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="font-semibold text-sm sm:text-base">{t('dashboard.events.createEvent')}</span>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Next Event Card - Responsive */}
            <div className="space-y-4">

              {/* The Card Itself */}
              <motion.div
                className={`${glassEffectIntense} rounded-lg border-2 sm:rounded-xl p-3 sm:p-4 md:p-6 w-full shadow-lg hover:shadow-xl transition-all duration-300`}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={sortedEvents[currentEventIndex].id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
                          style={{ background: sortedEvents[currentEventIndex].cover }}
                        >
                          {(() => {
                            const Icon = eventIcons[sortedEvents[currentEventIndex].category as keyof typeof eventIcons] || eventIcons.default
                            return <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-200" />
                          })()}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-base text-pink-700 sm:text-lg md:text-xl mb-1 truncate">
                              {sortedEvents[currentEventIndex].title}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-gray-700 text-xs sm:text-sm">
                              <span className="flex items-center gap-1 truncate">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                {new Date(sortedEvents[currentEventIndex].date).toLocaleDateString('es-MX', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className="hidden sm:block text-gray-700">•</span>
                              <span className="flex items-center gap-1 truncate">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                {sortedEvents[currentEventIndex].time}
                              </span>
                            </div>
                          </div>

                          <motion.div
                            className="flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mt-2 sm:mt-0 w-fit"
                            animate={pulseVariants.pulse}
                            style={{ background: sortedEvents[currentEventIndex].cover }}
                          >
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            <div className="text-right">
                              <div className="flex flex-col items-center text-center">
                                <p className="text-lg sm:text-xl md:text-2xl font-bold">
                                  {sortedEvents[currentEventIndex].daysLeft}
                                </p>
                              </div>
                              <p className="text-xs">{t('dashboard.events.daysLeft')}</p>
                            </div>
                          </motion.div>
                        </div>

                        <div className="mt-3 sm:mt-4">
                          <div className="flex justify-between text-gray-700 text-xs sm:text-sm mb-1">
                            <span>Progreso del evento</span>
                            <span className="font-semibold">{sortedEvents[currentEventIndex].progress}%</span>
                          </div>
                          <div className="h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${sortedEvents[currentEventIndex].progress}%` }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Carousel Navigation */}
              <div className="flex justify-between items-center">
               

                  {/* Navigation arrows */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        const prevIndex = currentEventIndex > 0 ? currentEventIndex - 1 : sortedEvents.length - 1
                        setCurrentEventIndex(prevIndex)
                      }}
                      className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180 text-gray-600" />
                    </button>
                    <button
                      onClick={() => {
                        const nextIndex = currentEventIndex < sortedEvents.length - 1 ? currentEventIndex + 1 : 0
                        setCurrentEventIndex(nextIndex)
                      }}
                      className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Page indicator */}
                  <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {currentEventIndex + 1} / {sortedEvents.length}
                  </div>
                </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Create Event Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="sm:hidden"
      >
        <Button
          onClick={() => setShowCreateModal(true)}
          className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="font-semibold">{t('dashboard.events.createEvent')}</span>
        </Button>
      </motion.div>

      {/* Action Buttons with enhanced effects - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full"
      >
        {[
          {
            icon: Users,
            label: "Ver Invitados",
            onClick: () => setSelectedEventForGuests(sortedEvents[0]),
            gradient: "from-blue-500 via-cyan-500 to-teal-500",
            glow: "hover:shadow-blue-500/30",
          },
          {
            icon: Music,
            label: t('dashboard.events.vendors'),
            onClick: () => router.push('/dashboard/providers'),
            gradient: "from-green-500 via-emerald-500 to-lime-500",
            glow: "hover:shadow-green-500/30",
          },
          {
            icon: BarChart3,
            label: "Análisis",
            onClick: () => router.push('/dashboard/analytics'),
            gradient: "from-orange-500 via-amber-500 to-yellow-500",
            glow: "hover:shadow-orange-500/30",
          },
        ].map((action, index) => {
          const MotionButton = motion(Button);

          return (
            <MotionButton
              key={index}
              onClick={action.onClick}
              className={`w-full h-12 sm:h-14 bg-gradient-to-r ${action.gradient} opacity-80 text-white border-0 shadow-md ${action.glow} transition-all duration-300 rounded-lg hover:shadow-lg group relative overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <action.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-xs sm:text-sm md:text-base truncate">{action.label}</span>
              </div>
            </MotionButton>
          )
        })}
      </motion.div>

      {/* Upcoming Events Section - Responsive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="space-y-4 sm:space-y-6 w-full"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 sm:h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('dashboard.events.upcomingEvents')}
            </h2>
          </div>
          <span className="text-xs sm:text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded-full">
            {sortedEvents.length} eventos
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 w-full">
          <AnimatePresence>
            {sortedEvents.map((event, index) => {
              const EventIcon = eventIcons[event.category as keyof typeof eventIcons] || eventIcons.default
              const guestConfirmationRate = calculateGuestConfirmationRate(event.id)

              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                  className="relative w-full"
                >
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${event.gradient} rounded-xl sm:rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Main Card */}
                  <Card className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm w-full">
                    {/* Card Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${event.gradient} opacity-10 group-hover:opacity-10 transition-opacity duration-300`} />

                    {/* Animated border on hover */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-gray-200/50 rounded-xl sm:rounded-2xl transition-colors duration-300" />

                    <CardContent className="relative p-4 sm:p-6">
                      <div className="flex flex-col gap-3 sm:gap-4">
                        {/* Event header - Responsive */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                              style={{ background: event.cover }}
                            >
                              <EventIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-sm sm:text-base md:text-lg truncate">{event.title}</h3>
                              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 truncate">
                                <Calendar className="w-3 h-3 flex-shrink-0" />
                                {new Date(event.date).toLocaleDateString('es-MX', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                                <span className="hidden sm:inline ml-1">• {event.location}</span>
                              </p>
                            </div>
                          </div>

                          {/* Days left indicator */}
                          <motion.div
                            className="text-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-sm flex-shrink-0"
                            style={{
                              backgroundColor: `${event.accentColor}15`,
                              color: event.accentColor
                            }}
                            animate={hoveredEvent === event.id ? { rotate: [0, 3, -3, 0] } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-lg sm:text-xl font-bold">{event.daysLeft}</p>
                            <p className="text-xs font-medium">días</p>
                          </motion.div>
                        </div>

                        {/* Mobile location */}
                        <div className="sm:hidden text-xs text-muted-foreground flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {event.location}
                        </div>

                        {/* Stats grid - Responsive */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          {[
                            {
                              value: `${event.progress}%`,
                              label: 'Progreso',
                              icon: TrendingUp,
                              color: '#ff56cc',
                              bgColor: '#ffccf0'
                            },
                            {
                              value: event.vendors,
                              label: 'Proveedores',
                              icon: Users,
                              color: '#6366f1',
                              bgColor: '#a5a7f0'
                            },
                            {
                              value: `$${(event.spent / 1000).toFixed(0)}k`,
                              label: 'Gastado',
                              icon: DollarSign,
                              color: '#10b981',
                              bgColor: '#d5fff0'
                            },
                          ].map((stat, i) => (
                            <motion.div
                              key={i}
                              className="text-center p-2 sm:p-3 rounded-lg sm:rounded-xl backdrop-blur-sm border border-gray-100/50"
                              style={{ backgroundColor: stat.bgColor }}
                              whileHover={{ scale: 1.03 }}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-1 mb-1">
                                <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 mx-auto sm:mx-0" style={{ color: stat.color }} />
                                <p className="text-base sm:text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
                              </div>
                              <p className="text-xs text-muted-foreground">{stat.label}</p>
                            </motion.div>
                          ))}
                        </div>

                        {/* Progress bars - Responsive */}
                        <div className="space-y-3 sm:space-y-4">
                          {/* Event progress */}
                          <div>
                            <div className="flex justify-between text-xs sm:text-sm mb-1">
                              <span className="flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                Planificación
                              </span>
                              <span className="font-semibold">{event.progress}%</span>
                            </div>
                            <div className="h-1.5 sm:h-2 bg-gray-200/50 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: event.cover }}
                                initial={{ width: 0 }}
                                animate={{ width: `${event.progress}%` }}
                                transition={{ duration: 1.5, delay: index * 0.2 }}
                              />
                            </div>
                          </div>

                          {/* Guest confirmation progress */}
                          <div>
                            <div className="flex justify-between text-xs sm:text-sm mb-1">
                              <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Invitados confirmados
                              </span>
                              <span className="font-semibold">{guestConfirmationRate}%</span>
                            </div>
                            <div className="h-1.5 sm:h-2 bg-gray-200/50 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${guestConfirmationRate}%` }}
                                transition={{ duration: 1.5, delay: index * 0.2 + 0.3 }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Action button */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedEventForGuests(event)}
                            className="w-full border hover:border-primary/50 rounded-lg sm:rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300"
                          >
                            <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            <span className="font-semibold text-xs sm:text-sm">{t('dashboard.events.guestList')}</span>
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-auto" />
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Budget Overview - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="w-full"
      >
        <Card className="shadow-lg sm:shadow-xl border-0 bg-gradient-to-br from-white via-gray-50/50 to-white overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50/20 to-transparent animate-gradient-x opacity-30" />

          <CardHeader className="relative z-10 pb-4 sm:pb-6">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              <CardTitle className="text-lg sm:text-xl font-heading bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t('dashboard.events.budgetOverview')}
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">{t('dashboard.events.budgetDescription')}</CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="space-y-4 sm:space-y-6">
              {/* Budget stats with enhanced visuals - Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  {
                    value: `$${(totalBudget / 1000).toFixed(0)}k`,
                    label: t('dashboard.events.totalBudget'),
                    icon: ThreeDollarIcons,
                    gradient: "from-blue-500 to-blue-500",
                    borderColor: "border-blue-200",
                  },
                  {
                    value: `$${(totalSpent / 1000).toFixed(0)}k`,
                    label: t('dashboard.events.spent'),
                    icon: NegativeDollarIcon,
                    gradient: "from-red-500 to-red-600",
                    borderColor: "border-red-200",
                  },
                  {
                    value: `$${((totalBudget - totalSpent) / 1000).toFixed(0)}k`,
                    label: t('dashboard.events.remaining'),
                    icon: DollarSign,
                    gradient: "from-purple-400 to-purple-500",
                    borderColor: "border-purple-200",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className={`relative p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-sm border ${stat.borderColor} overflow-hidden group`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

                    {/* Animated border */}
                    <div className={`absolute inset-0 border-2 border-transparent group-hover:${stat.borderColor.replace('200', '300')} rounded-xl sm:rounded-2xl transition-colors duration-300`} />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${stat.gradient} bg-opacity-10`}>
                          <stat.icon className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5"
                            style={{
                              color: stat.gradient.includes('blue') ? '#3b82f6' :
                                stat.gradient.includes('green') ? '#10b981' :
                                  '#ff83e6'
                            }}
                          />
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${index === 0 ? 'bg-blue-100 text-blue-600' :
                            index === 1 ? 'bg-red-100 text-red-600' :
                              'bg-purple-100 text-purple-600'
                          }`}>
                          {index === 0 ? 'Total' : index === 1 ? 'Gastado' : 'Restante'}
                        </span>
                      </div>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold mb-1">{stat.value}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Progress visualization - Responsive */}
              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-semibold text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  Desglose por evento
                </h4>
                {sortedEvents.map((event, index) => {
                  const spentPercentage = (event.spent / event.budget) * 100
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50/50 transition-colors duration-200"
                    >
                      <div
                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 shadow-sm"
                        style={{ background: event.cover }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm mb-1 gap-1">
                          <span className="font-medium truncate">{event.title}</span>
                          <span className="flex-shrink-0 font-semibold text-gray-600">
                            ${(event.spent / 1000).toFixed(0)}k / ${(event.budget / 1000).toFixed(0)}k
                          </span>
                        </div>
                        <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: event.cover }}
                            initial={{ width: 0 }}
                            animate={{ width: `${spentPercentage}%` }}
                            transition={{ duration: 1.5, delay: 1.2 + index * 0.1 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <CreateEventModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}