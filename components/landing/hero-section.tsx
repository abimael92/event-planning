"use client"

import { useState } from "react"
import { Button } from "../ui/button"
// import { CreateEventModal } from "../events/create-event-modal"
import { useRouter } from "next/navigation"
import { useAuth } from "../../app/contexts/auth-context"
import { ArrowRight, Sparkles, Languages } from "lucide-react"

export function HeroSection() {
  const [createEventOpen, setCreateEventOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [language, setLanguage] = useState<"es" | "en">("es") // Spanish as default

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setCreateEventOpen(true)
    } else {
      router.push("/login")
    }
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === "es" ? "en" : "es")
  }

  // Translations
  const translations = {
    es: {
      eventPlanning: "Planificación de Eventos",
      heroTitle: "Tu Planificador de Eventos Personal",
      heroDescription: "Conecta con proveedores premium, gestiona eventos y crea experiencias inolvidables con nuestro mercado curado.",
      startPlanning: "Comenzar",
      browseVendors: "Ver Proveedores",
      features: [
        { title: "Proveedores Seleccionados", desc: "DJs premium, lugares, catering y más" },
        { title: "Planificación Inteligente", desc: "Seguimiento de presupuesto y gestión de cronogramas" },
        { title: "Pagos Seguros", desc: "Protección de depósito en garantía y contratos fáciles" }
      ]
    },
    en: {
      eventPlanning: "Event Planning",
      heroTitle: "Your Personal Event Planner",
      heroDescription: "Connect with premium vendors, manage events, and create unforgettable experiences with our curated marketplace.",
      startPlanning: "Start Planning",
      browseVendors: "Browse Vendors",
      features: [
        { title: "Curated Vendors", desc: "Premium DJs, venues, catering & more" },
        { title: "Smart Planning", desc: "Budget tracking & timeline management" },
        { title: "Secure Payments", desc: "Escrow protection & easy contracts" }
      ]
    }
  }

  const t = translations[language]

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent px-4 sm:px-6 lg:px-8">
        {/* Language Toggle Button */}
        <button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          onClick={toggleLanguage}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 text-white font-medium text-sm sm:text-base"
        >
          <Languages className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-800" />
          <span className="text-indigo-800">{language === "es" ? "ES" : "EN"}</span>
        </button>

        <div className="container mx-auto text-center relative z-10 w-full">
          <div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Logo/Brand */}
            <div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8 sm:mb-10"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl -m-3 sm:-m-4" />
                <h1 className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-luxury font-bold text-transparent [-webkit-text-stroke:2px_white] sm:[-webkit-text-stroke:3px_white] absolute inset-0">
                  Planora
                </h1>
                {/* Gradient fill layer */}
                <h1 className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-luxury font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent relative [text-shadow:0_0_25px_rgba(255,255,255,0.5)] sm:[text-shadow:0_0_30px_rgba(255,255,255,0.5)]">
                  Planora
                </h1>
                <Sparkles className="absolute -top-2 -right-2 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-6 sm:h-6 text-pink-800 animate-pulse" />
                <Sparkles className="absolute -bottom-2 -left-2 sm:-bottom-2 sm:-left-2 w-6 h-6 sm:w-6 sm:h-6 text-purple-800 animate-pulse delay-1000" />
              </div>

              <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8 lg:mt-10">
                <p className="text-xl sm:text-2xl lg:text-3xl font-cinzel text-purple-800 font-medium">{t.eventPlanning}</p>
              </div>
            </div>

            {/* Hero Text */}
            <div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8 sm:mb-10 lg:mb-12"
            >
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-balance mb-4 sm:mb-6 px-2">
                {t.heroTitle.split(" ").map((word, index, array) =>
                  word === "Personal" || word === "Personal" ? (
                    <span key={index} className="bg-gradient-to-r from-primary to-blue-800/60 bg-clip-text text-transparent">
                      {word}
                    </span>
                  ) : (
                    <span key={index}>{word}</span>
                  )
                ).reduce((acc, element, index) =>
                  index === 0 ? [element] : [...acc, " ", element], [] as React.ReactNode[]
                )}
              </h2>
              <p className="text-lg sm:text-lg md:text-xl lg:text-2xl text-purple-800 text-balance max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
                {t.heroDescription}
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 lg:mb-16"
            >
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="gradient-royal text-white hover:glow-primary transition-all duration-300 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold group w-full sm:w-auto"
              >
                {t.startPlanning}
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Features Preview */}
            <div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-2 sm:px-4 "
            >
              {t.features.map((feature, index) => (
                <div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  className="text-center p-4 sm:p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300 group hover:scale-105 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
                >
                  <div className="mb-2 h-14 sm:mb-3">
                    <h3 className="font-semibold text-xl sm:text-xl mb-2 font-luxury text-violet-950 group-hover:text-primary/80 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    {/* Elegant gradient divider that grows on hover */}
                    <div className="relative h-0.5 w-20 mx-auto transition-all duration-500 group-hover:w-32 group-hover:h-1">
                      {/* Static line */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full" />

                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/40 via-primary/80 to-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
                    </div>
                  </div>

                  <p className="text-base text-sky-950 sm:text-lg group-hover:text-sky-900 transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section >

      {/* Create Event Modal */}
      {/* <CreateEventModal open={createEventOpen} onOpenChange={setCreateEventOpen} /> */}
    </>
  )
}