"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Clock, DollarSign, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { BookingCard } from "./booking-card"
import { BookingDetailsModal } from "./booking-details-modal"
import { CreateBookingModal } from "./create-booking-modal"
import type { Booking } from "@/shared/types/booking" // Import shared type

// Mock booking data - use 'as const' for literal types
const bookings = [
  {
    id: "1",
    vendorName: "Elite Catering Co.",
    vendorCategory: "Catering",
    eventName: "Sarah & Michael's Wedding",
    eventDate: "2024-06-15",
    bookingDate: "2024-02-10",
    status: "confirmed" as const,
    amount: 8500,
    deposit: 2550,
    remaining: 5950,
    services: ["Premium Menu", "Wine Pairing", "Service Staff"],
    notes: "Dietary restrictions: 2 vegetarian, 1 gluten-free",
    vendorImage: "/luxury-catering-service.jpg",
    contractSigned: true,
    paymentStatus: "partial" as const,
    nextPaymentDue: "2024-05-15",
  },
  {
    id: "2",
    vendorName: "Harmony DJ Services",
    vendorCategory: "DJ & Music",
    eventName: "Corporate Gala 2024",
    eventDate: "2024-07-20",
    bookingDate: "2024-02-15",
    status: "pending" as const,
    amount: 1200,
    deposit: 360,
    remaining: 840,
    services: ["DJ Service", "Sound System", "Lighting"],
    notes: "Need microphone for speeches",
    vendorImage: "/professional-dj-service.jpg",
    contractSigned: false,
    paymentStatus: "pending" as const,
    nextPaymentDue: "2024-03-15",
  },
  {
    id: "3",
    vendorName: "The Grand Ballroom",
    vendorCategory: "Venue",
    eventName: "Emma's Sweet 16",
    eventDate: "2024-08-10",
    bookingDate: "2024-02-20",
    status: "confirmed" as const,
    amount: 6000,
    deposit: 1800,
    remaining: 4200,
    services: ["Venue Rental", "Tables & Chairs", "Decorations"],
    notes: "Pink and gold theme requested",
    vendorImage: "/grand-ballroom-venue.jpg",
    contractSigned: true,
    paymentStatus: "partial" as const,
    nextPaymentDue: "2024-07-10",
  },
  {
    id: "4",
    vendorName: "Lens & Light Photography",
    vendorCategory: "Photography",
    eventName: "Sarah & Michael's Wedding",
    eventDate: "2024-06-15",
    bookingDate: "2024-01-25",
    status: "confirmed" as const,
    amount: 3500,
    deposit: 1050,
    remaining: 2450,
    services: ["Wedding Photography", "Engagement Session", "Digital Gallery"],
    notes: "Include drone shots if weather permits",
    vendorImage: "/professional-photographer.jpg",
    contractSigned: true,
    paymentStatus: "partial" as const,
    nextPaymentDue: "2024-05-15",
  },
  {
    id: "5",
    vendorName: "Bloom & Blossom Florists",
    vendorCategory: "Florist",
    eventName: "Corporate Gala 2024",
    eventDate: "2024-07-20",
    bookingDate: "2024-02-25",
    status: "quote_requested" as const,
    amount: 2200,
    deposit: 0,
    remaining: 2200,
    services: ["Centerpieces", "Stage Decorations", "Welcome Arrangements"],
    notes: "Corporate colors: navy and gold",
    vendorImage: "/luxury-florist-service.jpg",
    contractSigned: false,
    paymentStatus: "pending" as const,
    nextPaymentDue: null,
  },
] satisfies Booking[] // Use 'satisfies' to check types without widening

// ... rest of your component remains the same