"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Plus, Calendar, Clock, Music, UserPlus } from "lucide-react"
import { CreateEventModal } from "./create-event-modal"
import { GuestList } from "./guest-list"
import { useTranslation } from "@/hooks/use-translation"
import { mockGuestData } from "@/data/mock-data"
import { useRouter } from "next/navigation"

// Mock data with elegant event covers
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
  },
]

export function EnhancedEventDashboard() {
  const router = useRouter()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedEventForGuests, setSelectedEventForGuests] = useState<typeof upcomingEvents[0] | null>(null)
  const { t } = useTranslation()

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
  const sortedEvents = useMemo(() => {
    return upcomingEvents
      .map(event => ({
        ...event,
        daysLeft: calculateDaysLeft(event.date)
      }))
      .sort((a, b) => a.daysLeft - b.daysLeft)
  }, [])

  const nextEvent = sortedEvents[0]
  const totalBudget = sortedEvents.reduce((sum, event) => sum + event.budget, 0)
  const totalSpent = sortedEvents.reduce((sum, event) => sum + event.spent, 0)

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
    <div className="w-full space-y-6 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg md:rounded-xl p-4 md:p-6 lg:p-8 w-full animate-gradient-shift">
        <div className="relative z-10 text-white w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold mb-2">{t('dashboard.events.greeting')}</h1>
            <p className="text-white/80 text-sm md:text-base mb-4">
              {t('dashboard.events.nextEventIn').replace('{days}', nextEvent.daysLeft.toString())}
            </p>

            {/* Event Countdown */}
            <div className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 w-full">
              <Clock className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm md:text-base truncate">{nextEvent.title}</p>
                <p className="text-white/80 text-xs md:text-sm truncate">
                  {nextEvent.date} • {nextEvent.location}
                </p>
              </div>
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

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="w-full h-12 md:h-14 gradient-royal text-white hover:glow-primary transition-all duration-300 rounded-lg text-sm md:text-base"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            <span className="font-semibold truncate">{t('dashboard.events.createEvent')}</span>
          </Button>
        </motion.div>



        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" className="w-full h-12 md:h-14 border hover:bg-primary/5 rounded-lg bg-transparent text-sm md:text-base" onClick={() => router.push('/dashboard/providers')}>
            <Music className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            <span className="font-semibold truncate">{t('dashboard.events.vendors')}</span>
          </Button>
        </motion.div>
      </div>

      {/* Upcoming Events with individual guest list buttons */}
      <div className="space-y-4 w-full">
        <h2 className="text-lg md:text-xl font-heading font-semibold">{t('dashboard.events.upcomingEvents')}</h2>
        <div className="space-y-3 w-full">
          {sortedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-full"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border shadow-sm w-full hover-lift">
              <div className="flex flex-col w-full px-8 gap-2">
                  <div className="flex flex-col sm:flex-row w-full">
                  {/* Elegant event cover */}
                  <div
                      className="w-full sm:w-24 md:w-28 h-24 flex-shrink-0 relative rounded-lg"
                    style={{ background: event.cover }}
                  >
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Event details */}
                  <div className="flex-1 p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-heading font-semibold mb-1 truncate">{event.title}</h3>
                        <p className="text-muted-foreground text-xs md:text-sm truncate">
                          {new Date(event.date).toLocaleDateString('es-MX', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })} • {event.location}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                      
                        <p className="text-lg md:text-xl font-bold text-primary">{event.daysLeft}</p>
                        <p className="text-xs text-muted-foreground">{t('dashboard.events.daysLeft')}</p>
                
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 my-3">
                      <div className="text-center bg-violet-300/50 p-2 rounded-lg">
                        <p className="text-xl font-semibold">{event.progress}%</p>
                        <p className="text-lg text-muted-foreground truncate">{t('dashboard.events.complete')}</p>
                      </div>
                      <div className="text-center bg-violet-300/50 p-2 rounded-lg">
                        <p className="text-xl font-semibold">{event.vendors}</p>
                        <p className="text-lg text-muted-foreground truncate">{t('dashboard.events.vendors')}</p>
                      </div>
                      <div className="text-center bg-violet-300/50 p-2 rounded-lg">
                        <p className="text-xl font-semibold">${(event.spent / 1000).toFixed(0)}k</p>
                        <p className="text-lg text-muted-foreground truncate">{t('dashboard.events.spent')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                  <div className="flex flex-col sm:flex-row w-full">
                    <div className="space-y-3 mb-3 w-full pr-8">
                      {/* Dual Progress Bars */}
                      <div className="space-y-3 my-3">
                        {/* Event Planning Progress */}
                        <div className="w-full">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Planificación del evento</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={event.progress} className="h-4 flex-1" />
                            <span className="text-md font-bold text-violet-800 min-w-[2.5rem] text-right">{event.progress}%</span>
                          </div>
                        </div>

                        {/* Guest Confirmation Progress */}
                        <div className="w-full">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Invitados confirmados</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={calculateGuestConfirmationRate(event.id)}
                              className="h-4 flex-1"
                              indicatorClassName="bg-indigo-500"
                            />
                            <span className="text-md font-bold text-violet-800 min-w-[2.5rem] text-right">
                              {calculateGuestConfirmationRate(event.id)}%
                            </span>
                          </div>
                        </div>

                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedEventForGuests(event)}
                        className="flex items-center border hover:bg-primary/5 rounded-lg bg-transparent text-sm md:text-base gap-2"
                      >
                        <UserPlus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        <span className="font-semibold truncate">{t('dashboard.events.guestList')}</span>
                      </Button>
                    </div>
                  </div>
              </div>
                  
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Budget Overview */}
      <Card className="shadow-sm w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-base md:text-lg font-heading">{t('dashboard.events.budgetOverview')}</CardTitle>
          <CardDescription className="text-sm">{t('dashboard.events.budgetDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Budget stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                <p className="text-lg md:text-xl font-bold text-blue-600">${(totalBudget / 1000).toFixed(0)}k</p>
                <p className="text-xs text-blue-600/70">{t('dashboard.events.totalBudget')}</p>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <p className="text-lg md:text-xl font-bold text-green-600">${(totalSpent / 1000).toFixed(0)}k</p>
                <p className="text-xs text-green-600/70">{t('dashboard.events.spent')}</p>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                <p className="text-lg md:text-xl font-bold text-purple-600">${((totalBudget - totalSpent) / 1000).toFixed(0)}k</p>
                <p className="text-xs text-purple-600/70">{t('dashboard.events.remaining')}</p>
              </div>
            </div>

            {/* Progress visualization */}
            <div className="space-y-2">
              {sortedEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: event.cover }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="truncate">{event.title}</span>
                      <span className="flex-shrink-0 ml-2">
                        ${event.spent.toLocaleString()} / ${event.budget.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(event.spent / event.budget) * 100} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <CreateEventModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}