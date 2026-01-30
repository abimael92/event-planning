// Minimal Mock Data for Event Planning App
// Reduced dataset for faster builds and lower memory usage

// ============================================
// USER/CLIENT DATA
// ============================================

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  userType: "client" | "vendor"
  membershipTier: string
  avatar?: string
}

export const mockUsers: User[] = [
  {
    id: "1",
    firstName: "Abimael",
    lastName: "Garcia",
    email: "client@client.com",
    userType: "client",
    membershipTier: "Premium Member",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: "2",
    firstName: "Marcus",
    lastName: "Rodriguez",
    email: "vendor@vendor.com",
    userType: "vendor",
    membershipTier: "Verified Vendor",
    avatar: "/placeholder-user.jpg"
  }
]

// ============================================
// EVENTS DATA
// ============================================

export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  budget: number
  spent: number
  guests: number
  status: "planning" | "active" | "completed" | "cancelled"
  progress: number
  daysLeft: number
  category: "wedding" | "holiday" | "celebration" | "baby" | "corporate"
  clientId?: string
  vendors?: string[]
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Boda de Kathya y Erick",
    date: "2026-06-15",
    time: "4:00 PM",
    location: "El Gran Salón de Baile",
    budget: 50000,
    spent: 35000,
    guests: 200,
    status: "active",
    progress: 70,
    daysLeft: 12,
    category: "wedding",
    clientId: "1",
    vendors: ["1", "2"]
  },
  {
    id: "2",
    title: "Navidad Improving 2025",
    date: "2025-12-20",
    time: "7:00 PM",
    location: "Centro de Convenciones",
    budget: 75000,
    spent: 25000,
    guests: 300,
    status: "active",
    progress: 40,
    daysLeft: 45,
    category: "holiday",
    clientId: "1",
    vendors: ["2"]
  }
]

// ============================================
// VENDORS DATA
// ============================================

export interface Vendor {
  id: string
  name: string
  category: string
  description: string
  rating: number
  reviews: number
  priceRange: string
  location: string
  avatar?: string
  verified: boolean
  specialties: string[]
}

export const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "Salón Los Arcos",
    category: "Venue",
    description: "Elegante salón de eventos",
    rating: 4.8,
    reviews: 124,
    priceRange: "$$$",
    location: "Chihuahua, MX",
    avatar: "/placeholder-logo.png",
    verified: true,
    specialties: ["Weddings", "Corporate Events"]
  },
  {
    id: "2",
    name: "Banquetes La Casona",
    category: "Catering",
    description: "Servicio de catering gourmet",
    rating: 4.9,
    reviews: 89,
    priceRange: "$$$$",
    location: "Chihuahua, MX",
    avatar: "/placeholder-logo.png",
    verified: true,
    specialties: ["Fine Dining", "Buffet"]
  }
]

// ============================================
// BOOKINGS DATA
// ============================================

export interface Booking {
  id: string
  eventId: string
  eventTitle: string
  vendorId: string
  vendorName: string
  service: string
  date: string
  time: string
  amount: number
  status: "confirmed" | "pending" | "cancelled"
  deposit: number
  balance: number
  vendorContact: string
}

export const mockBookings: Booking[] = [
  {
    id: "1",
    eventId: "1",
    eventTitle: "Boda de Kathya y Erick",
    vendorId: "1",
    vendorName: "Salón Los Arcos",
    service: "Locación",
    date: "2026-06-15",
    time: "4:00 PM",
    amount: 15000,
    status: "confirmed",
    deposit: 5000,
    balance: 10000,
    vendorContact: "+52 614 890 1234"
  },
  {
    id: "2",
    eventId: "2",
    eventTitle: "Navidad Improving 2025",
    vendorId: "2",
    vendorName: "Banquetes La Casona",
    service: "Catering",
    date: "2025-12-20",
    time: "7:00 PM",
    amount: 25000,
    status: "pending",
    deposit: 0,
    balance: 25000,
    vendorContact: "+52 614 678 9012"
  }
]

// ============================================
// PAYMENTS DATA
// ============================================

export interface Payment {
  id: string
  eventId: string
  event: string
  vendorId: string
  vendor: string
  amount: number
  date: string
  type: "deposit" | "final"
  status: "paid" | "pending" | "overdue"
  method: string
  invoice: string
}

export const mockPayments: Payment[] = [
  {
    id: "1",
    eventId: "1",
    event: "Boda de Kathya y Erick",
    vendorId: "1",
    vendor: "Salón Los Arcos",
    amount: 15000,
    date: "2026-06-01",
    type: "deposit",
    status: "paid",
    method: "Tarjeta de crédito",
    invoice: "#INV-001"
  },
  {
    id: "2",
    eventId: "2",
    event: "Navidad Improving 2025",
    vendorId: "2",
    vendor: "Banquetes La Casona",
    amount: 25000,
    date: "2025-12-01",
    type: "deposit",
    status: "pending",
    method: "Transferencia",
    invoice: "#INV-002"
  }
]

// ============================================
// MESSAGES/CONVERSATIONS DATA
// ============================================

export interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  vendorId?: string
  clientId?: string
}

export interface Message {
  id: number
  sender: "me" | "them"
  text: string
  time: string
}

export const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Salón Los Arcos",
    avatar: "SA",
    lastMessage: "Confirmado el horario para el 15 de junio",
    time: "10:30 AM",
    unread: 2,
    online: true,
    vendorId: "1"
  },
  {
    id: "2",
    name: "Banquetes La Casona",
    avatar: "BC",
    lastMessage: "Menú personalizado listo para revisión",
    time: "Ayer",
    unread: 0,
    online: false,
    vendorId: "2"
  }
]

export const mockMessages: Record<string, Message[]> = {
  "1": [
    { id: 1, sender: "them", text: "¡Hola! Confirmamos el horario para el 15 de junio a las 4:00 PM.", time: "10:30 AM" },
    { id: 2, sender: "me", text: "Perfecto, ¿todo listo con la disposición de mesas?", time: "10:32 AM" },
  ],
  "2": [
    { id: 1, sender: "them", text: "Hemos preparado el menú personalizado según sus especificaciones.", time: "9:00 AM" },
    { id: 2, sender: "me", text: "Perfecto, ¿pueden enviar el presupuesto final?", time: "9:15 AM" },
  ]
}

// ============================================
// GUEST DATA
// ============================================

export const mockGuestData = {
  '1': [
    {
      id: '1',
      name: 'María García',
      email: 'maria@example.com',
      phone: '+1 234 567 8901',
      status: 'confirmed' as const,
      plusOne: true,
      dietaryRestrictions: 'Vegetariano',
      notes: 'Tío de la novia',
    },
    {
      id: '2',
      name: 'Juan Rodríguez',
      email: 'juan@example.com',
      phone: '+1 234 567 8902',
      status: 'invited' as const,
      plusOne: false,
      dietaryRestrictions: '',
      notes: 'Amigo del colegio',
    },
  ],
  '2': [
    {
      id: '3',
      name: 'Ana Martínez',
      email: 'ana@example.com',
      phone: '+1 234 567 8903',
      status: 'confirmed' as const,
      plusOne: true,
      dietaryRestrictions: 'Sin gluten',
      notes: 'Colaboradora',
    }
  ]
}

// ============================================
// VENDOR DASHBOARD DATA
// ============================================

export interface VendorEvent {
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

export const mockVendorEvents: VendorEvent[] = [
  {
    id: "1",
    title: "Boda de Kathya y Erick",
    client: "Abimael Garcia",
    date: "2026-06-15",
    time: "4:00 PM",
    status: "confirmed",
    revenue: 15000,
    type: "Venue",
    progress: 70
  },
  {
    id: "2",
    title: "Navidad Improving 2025",
    client: "Abimael Garcia",
    date: "2025-12-20",
    time: "7:00 PM",
    status: "pending",
    revenue: 25000,
    type: "Catering",
    progress: 40
  }
]

export interface VendorPayment {
  id: string
  amount: number
  client: string
  date: string
  status: 'paid' | 'pending' | 'overdue'
  method: string
}

export const mockVendorPayments: VendorPayment[] = [
  {
    id: "1",
    amount: 15000,
    client: "Abimael Garcia",
    date: "2026-06-01",
    status: "paid",
    method: "Tarjeta de crédito"
  },
  {
    id: "2",
    amount: 25000,
    client: "Abimael Garcia",
    date: "2025-12-01",
    status: "pending",
    method: "Transferencia"
  }
]
