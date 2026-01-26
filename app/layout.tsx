import type React from "react"
import type { Metadata } from "next"
import { Cinzel, Poppins, Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { AuthProvider } from "./contexts/auth-context"
import { ErrorBoundary } from "../components/error-boundary"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
})

export const metadata: Metadata = {
  title: "Planora - Planificación de Eventos de Lujo",
  description: "Marketplace premium de planificación de eventos para experiencias de lujo",
  generator: "v0.app",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon Links */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="icon" href="/favicon/favicon.ico" />

        {/* Material Icons */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={`relative min-h-screen font-sans ${poppins.variable} ${inter.variable} ${playfair.variable} ${cinzel.variable}`}>
        {/* Global background */}
        <div className="absolute inset-0 -z-50">
          {/* Repeating pattern */}
          <div className="absolute inset-0 bg-[url('/luxury-event-planning-background-pattern.jpg')] bg-repeat [background-size:200px_200px] opacity-10" />
          {/* Color overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-secondary/40 to-accent/60 mix-blend-multiply" /> */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/60 via-pink-800/40 to-blue-800/60" />
        </div>

        <ErrorBoundary>
          <AuthProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </AuthProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}