"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { VendorRegisterForm } from "./vendor-register-form"
import { ForgotPasswordForm } from "./forgot-password-form"
import { useTranslation } from "@/hooks/use-translation"
import { ArrowLeft, Languages, User, Building, Sparkles, ChevronDown, Sun, Moon, Clock } from "lucide-react"
import { useAuth } from "../../app/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function AuthSection() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [currentView, setCurrentView] = useState<"welcome" | "login" | "register" | "client-register" | "vendor-register" | "forgot-password">("welcome")
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('afternoon')

  const { t, language, toggleLanguage } = useTranslation()

  // ============================================
  // DYNAMIC THEME CONFIGURATION
  // ============================================
  // Time-based gradients
  const timeGradients = {
    morning: {
      // bg: 'from-amber-100 via-orange-50 to-yellow-100',
      card: 'from-amber-50/90 to-orange-50/90',
      accent: 'from-amber-500 to-orange-500',
      text: 'text-amber-900'
    },
    afternoon: {
      // bg: 'from-blue-50 via-cyan-50 to-sky-100',
      card: 'from-blue-50/90 to-cyan-50/90',
      accent: 'from-blue-500 to-cyan-500',
      text: 'text-blue-900'
    },
    evening: {
      // bg: 'from-purple-50 via-violet-50 to-indigo-100',
      card: 'from-purple-50/90 to-violet-50/90',
      accent: 'from-purple-500 to-violet-500',
      text: 'text-purple-900'
    },
    night: {
      // bg: 'from-gray-900 via-slate-800 to-gray-950',
      card: 'from-gray-800/90 to-slate-800/90',
      accent: 'from-indigo-500 to-purple-500',
      text: 'text-gray-100'
    }
  }

  // Dark mode overrides
  const theme = isDarkMode ? {
    bg: 'from-gray-900 via-slate-800 to-gray-950',
    card: 'from-gray-800/90 to-slate-800/90',
    accent: 'from-indigo-500 to-purple-500',
    text: 'text-gray-100',
    border: 'border-gray-700'
  } : timeGradients[timeOfDay]

  // ============================================
  // EFFECTS & INITIALIZATION
  // ============================================
  useEffect(() => {
    setMounted(true)

    // Determine time of day for dynamic theme
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay('morning')
    else if (hour < 17) setTimeOfDay('afternoon')
    else if (hour < 21) setTimeOfDay('evening')
    else setTimeOfDay('night')

    // Check system dark mode preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    setIsDarkMode(darkModeMediaQuery.matches)

    // Listen for system theme changes
    darkModeMediaQuery.addEventListener('change', (e) => setIsDarkMode(e.matches))
  }, [])

  // ============================================
  // VIEW RENDERER
  // ============================================
  const renderView = () => {
    switch (currentView) {
      case "login":
        return <LoginForm
          onForgotPassword={() => setCurrentView("forgot-password")}
          onBack={() => setCurrentView("welcome")}
        />
      case "register":
        return (
          <div className="space-y-6">
            {/* ACCOUNT TYPE SELECTION HEADER */}
            <div className="text-center">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg md:text-xl font-semibold"
              >
                {t('auth.register.chooseAccountType')}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm md:text-base text-muted-foreground mt-1"
              >
                {t('auth.register.selectRole')}
              </motion.p>
            </div>

            {/* ACCOUNT TYPE CARDS */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              {/* CLIENT CARD */}
              <div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <div className="relative group">
                  {/* GLOW EFFECT */}
                  <div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0, 0.2, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                  <Button
                    variant="outline"
                    className="relative h-24 md:h-32 w-full flex-col gap-2 md:gap-4 border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 p-4 md:p-6 bg-white/50 backdrop-blur-sm"
                    onClick={() => setCurrentView("client-register")}
                  >
                    {/* ANIMATED ICON */}
                    <div
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <User className="h-8 w-8 md:h-12 md:w-12" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm md:text-lg font-semibold">{t('auth.tabs.client')}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">{t('auth.tabs.clientDescription')}</div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* VENDOR CARD */}
              <div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <div className="relative group">
                  {/* GLOW EFFECT */}
                  <div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0, 0.2, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.5
                    }}
                  />
                  <Button
                    variant="outline"
                    className="relative h-24 md:h-32 w-full flex-col gap-2 md:gap-4 border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 p-4 md:p-6 bg-white/50 backdrop-blur-sm"
                    onClick={() => setCurrentView("vendor-register")}
                  >
                    {/* ANIMATED ICON */}
                    <div
                      animate={{ rotate: [0, -5, 0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    >
                      <Building className="h-8 w-8 md:h-12 md:w-12" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm md:text-lg font-semibold">{t('auth.tabs.vendor')}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">{t('auth.tabs.vendorDescription')}</div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            {/* BACK BUTTON */}
            <div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="ghost"
                onClick={() => setCurrentView("welcome")}
                className="w-full hover:scale-[1.02] transition-transform"
              >
                {t('auth.back')}
              </Button>
            </div>
          </div>
        )
      case "client-register":
        return <RegisterForm onBack={() => setCurrentView("register")} />
      case "vendor-register":
        return <VendorRegisterForm onBack={() => setCurrentView("register")} />
      case "forgot-password":
        return <ForgotPasswordForm onBack={() => setCurrentView("login")} />
      default:
        // WELCOME VIEW
        return (
          <div className="space-y-6">
            {/* WELCOME HEADER WITH ANIMATION */}
            <div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              {/* ANIMATED SPARKLES */}
              <div className="relative">
                <div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <Sparkles className="h-12 w-12 md:h-16 md:w-16 text-primary mx-auto opacity-30" />
                </div>
                <Sparkles className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-2 relative z-10" />
              </div>

              <h2 className="text-xl md:text-2xl font-heading font-bold">{t('auth.welcome')}</h2>
              <p className="text-sm md:text-base text-muted-foreground">{t('auth.welcomeSubtitle')}</p>

              {/* TIME OF DAY INDICATOR */}
              <div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
              >
                <Clock className="w-3 h-3" />
                {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} Mode
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3">
              {/* LOGIN BUTTON WITH GRADIENT ANIMATION */}
              <div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
                <Button
                  onClick={() => setCurrentView("login")}
                  className="relative w-full h-10 md:h-12 gradient-royal text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 text-sm md:text-base"
                >
                  <span className="relative z-10">{t('auth.tabs.login')}</span>
                </Button>
              </div>

              {/* REGISTER BUTTON WITH HOVER EFFECT */}
              <div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  onClick={() => setCurrentView("register")}
                  className="w-full h-10 md:h-12 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md transition-all duration-300 text-sm md:text-base group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {t('auth.tabs.register')}
                  </span>
                </Button>
              </div>
            </div>

            {/* DEMO DROPDOWN */}
            <DemoDropdown theme={theme} />
          </div>
        )
    }
  }

  if (!mounted) {
    // LOADING SKELETON
    return (
      <div className="w-full max-w-md mx-auto my-8 px-4">
        <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl" />
      </div>
    )
  }

  return (
    // ============================================
    // MAIN CONTAINER WITH ANIMATED BACKGROUND
    // ============================================
    <div className={`min-h-screen bg-gradient-to-br transition-all duration-1000`}>
      {/* ANIMATED PARTICLES */}
      <ParticleBackground />

      <div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto py-8 px-4"
      >
        {/* ============================================
            TOP CONTROLS BAR
        ============================================ */}
        <div className="flex justify-between items-center mb-6">
          {/* THEME TOGGLE */}
          <button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 text-white font-medium text-sm"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
            <span>{isDarkMode ? ' Light ' : ' Dark '}</span>
          </button>

          {/* LANGUAGE TOGGLE */}
          <button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 text-white font-medium text-sm"
          >
            <Languages className="w-4 h-4" />
            <span
              key={language}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {language === "es" ? "ES" : "EN"}
            </span>
          </button>
        </div>

        {/* ============================================
            MAIN AUTH CARD
        ============================================ */}
        <Card className={`relative backdrop-blur-xl bg-gradient-to-b ${theme.card} border-white/20 shadow-2xl w-full p-4 md:p-6 lg:p-8 transition-all duration-300`}>
          {/* ANIMATED BORDER */}
          <div
            className="absolute inset-0 rounded-xl border-2 border-transparent"
            animate={{
              borderColor: ['#3b82f680', '#8b5cf680', '#ec489980', '#3b82f680'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          {/* CARD HEADER */}
          <CardHeader className="text-center pb-4 relative z-10">
            {/* BACK BUTTON */}
            {currentView !== "welcome" && (
              <div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-start mb-2"
              >
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setCurrentView(currentView === "vendor-register" || currentView === "client-register" ? "register" : "welcome")}
                  className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 hover:gap-2 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('auth.back')}
                </Button>
              </div>
            )}

            {/* TITLE */}
            <CardTitle className={`text-xl md:text-2xl font-heading ${theme.text}`}>
              {currentView === "login" ? t('auth.login.title') :
                currentView === "register" ? t('auth.register.title') :
                  currentView === "client-register" ? t('auth.register.title') :
                    currentView === "vendor-register" ? t('auth.vendor.title') :
                      currentView === "forgot-password" ? t('auth.forgotPassword.title') : ''}
              {/* /* t('auth.welcome')  */}
            </CardTitle>

            {/* DESCRIPTION */}
            <CardDescription className="text-sm md:text-base">
              {currentView === "login" ? t('auth.login.description') :
                currentView === "register" ? t('auth.register.description') :
                  currentView === "client-register" ? t('auth.register.description') :
                    currentView === "vendor-register" ? t('auth.vendor.description') :
                      currentView === "forgot-password" ? t('auth.forgotPassword.description') : ''}
              {/* t('auth.welcomeSubtitle')} */}
            </CardDescription>
          </CardHeader>

          {/* ============================================
              CONTENT AREA WITH PAGE TRANSITIONS
          ============================================ */}
          <CardContent className="pt-0 pb-4 md:pb-8 relative z-10">
            <AnimatePresence mode="wait">
              <div
                key={currentView}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: -20,
                  transition: {
                    duration: 0.2
                  }
                }}
                className="relative"
              >
                {renderView()}

                {/* DECORATIVE ELEMENTS */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-purple-500/10 rounded-full blur-xl" />
              </div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ============================================
// PARTICLE BACKGROUND COMPONENT
// ============================================
function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// DEMO DROPDOWN COMPONENT
// ============================================
function DemoDropdown({ theme }: { theme: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const { t } = useTranslation()

  const handleDemoLogin = async (email: string, type: string) => {
    try {
      const user = await login(email, "123456")
      toast({
        title: t('auth.login.demoSuccess'),
        description: `${t('auth.login.loggedInAs')} ${type}`,
      })
      router.push(user?.userType === "vendor" ? "/vendor" : "/dashboard")
    } catch (error) {
      toast({
        title: t('auth.login.demoFailed'),
        variant: "destructive",
      })
    }
  }

  return (
    <div className="relative">
      {/* DEMO BUTTON */}
      <div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full border-dashed border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 text-sm md:text-base group"
        >
          {/* ANIMATED SPARKLES */}
          <div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="mr-2 h-4 w-4" />
          </div>
          {t('auth.demo.tryDemo')}
          {/* ANIMATED CHEVRON */}
          <div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-2"
          >
            <ChevronDown className="h-4 w-4" />
          </div>
        </Button>
      </div>

      {/* DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-4 bg-background border border-border rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {/* DROPDOWN CONTENT */}
            <div className="p-2 space-y-1">
              {/* CLIENT DEMO BUTTON */}
              <div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => handleDemoLogin("client@client.com", "Client")}
                  className="w-full justify-start text-sm hover:bg-primary/5 group"
                >
                  <User className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  {t('auth.demo.client')}
                </Button>
              </div>

              {/* VENDOR DEMO BUTTON */}
              <div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => handleDemoLogin("vendor@vendor.com", "Vendor")}
                  className="w-full justify-start text-sm hover:bg-primary/5 group"
                >
                  <Building className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  {t('auth.demo.vendor')}
                </Button>
              </div>
            </div>

            {/* DROPDOWN DECORATION */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}