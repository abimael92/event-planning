// Comprehensive Mock Data for Event Planning App
// Used by both User (Client) and Vendor dashboards

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
    vendors: ["1", "2", "3"]
  },
  {
    id: "2",
    title: "Navidad Improving 2025",
    date: "2025-12-20",
    time: "7:00 PM",
    location: "Centro de Convenciones del Centro",
    budget: 75000,
    spent: 25000,
    guests: 300,
    status: "active",
    progress: 40,
    daysLeft: 45,
    category: "holiday",
    clientId: "1",
    vendors: ["2", "4"]
  },
  {
    id: "3",
    title: "Quinceañera de Eunice",
    date: "2027-08-10",
    time: "6:00 PM",
    location: "Pabellón del Jardín",
    budget: 15000,
    spent: 8000,
    guests: 150,
    status: "planning",
    progress: 55,
    daysLeft: 66,
    category: "celebration",
    clientId: "1",
    vendors: ["3", "5"]
  },
  {
    id: "4",
    title: "Baby Shower de Suleidy",
    date: "2026-01-20",
    time: "2:00 PM",
    location: "Jardines de la Villa",
    budget: 8000,
    spent: 3000,
    guests: 50,
    status: "planning",
    progress: 38,
    daysLeft: 92,
    category: "baby",
    clientId: "1",
    vendors: ["4"]
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
    description: "Elegante salón de eventos con capacidad para 200 personas",
    rating: 4.8,
    reviews: 124,
    priceRange: "$$$",
    location: "Chihuahua, MX",
    avatar: "/placeholder-logo.png",
    verified: true,
    specialties: ["Weddings", "Corporate Events", "Quinceañeras"]
  },
  {
    id: "2",
    name: "Banquetes La Casona",
    category: "Catering",
    description: "Servicio de catering gourmet para eventos especiales",
    rating: 4.9,
    reviews: 89,
    priceRange: "$$$$",
    location: "Chihuahua, MX",
    avatar: "/placeholder-logo.png",
    verified: true,
    specialties: ["Fine Dining", "Buffet", "Custom Menus"]
  },
  {
    id: "3",
    name: "Mariachi Los Chihuahuenses",
    category: "Entertainment",
    description: "Grupo de mariachi profesional para eventos",
    rating: 4.7,
    reviews: 156,
    priceRange: "$$",
    location: "Chihuahua, MX",
    avatar: "/placeholder-logo.png",
    verified: true,
    specialties: ["Mariachi", "Live Music", "Traditional"]
  },
  {
    id: "4",
    name: "Decoraciones Elegantes",
    category: "Decoration",
    description: "Decoración floral y de eventos personalizada",
    rating: 4.6,
    reviews: 98,
    priceRange: "$$$",
    location: "Chihuahua, MX",
    avatar: "/placeholder-logo.png",
    verified: true,
    specialties: ["Floral Arrangements", "Event Design", "Setup"]
  },
  {
    id: "5",
    name: "Fotografía Premium",
    category: "Photography",
    description: "Servicios profesionales de fotografía y video",
    rating: 4.9,
    reviews: 203,
    priceRange: "$$$$",
    location: "Chihuahua, MX",
    avatar: "/placeholder-logo.png",
    verified: true,
    specialties: ["Wedding Photography", "Event Coverage", "Video Production"]
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
  },
  {
    id: "3",
    eventId: "3",
    eventTitle: "Quinceañera de Eunice",
    vendorId: "3",
    vendorName: "Mariachi Los Chihuahuenses",
    service: "Música",
    date: "2027-08-10",
    time: "6:00 PM",
    amount: 8000,
    status: "confirmed",
    deposit: 3000,
    balance: 5000,
    vendorContact: "+52 614 123 4567"
  },
  {
    id: "4",
    eventId: "4",
    eventTitle: "Baby Shower de Suleidy",
    vendorId: "4",
    vendorName: "Decoraciones Elegantes",
    service: "Decoración",
    date: "2026-01-20",
    time: "2:00 PM",
    amount: 12000,
    status: "cancelled",
    deposit: 0,
    balance: 12000,
    vendorContact: "+52 614 456 7890"
  }
]

// ============================================
// PAYMENTS DATA
// ============================================

export interface Payment {
  id: string
  eventId: string
  eventTitle: string
  vendorId: string
  vendorName: string
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
    eventTitle: "Boda de Kathya y Erick",
    vendorId: "1",
    vendorName: "Salón Los Arcos",
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
    eventTitle: "Navidad Improving 2025",
    vendorId: "2",
    vendorName: "Banquetes La Casona",
    amount: 25000,
    date: "2025-12-01",
    type: "deposit",
    status: "pending",
    method: "Transferencia",
    invoice: "#INV-002"
  },
  {
    id: "3",
    eventId: "3",
    eventTitle: "Quinceañera de Eunice",
    vendorId: "3",
    vendorName: "Mariachi Los Chihuahuenses",
    amount: 3000,
    date: "2027-07-01",
    type: "deposit",
    status: "paid",
    method: "Efectivo",
    invoice: "#INV-003"
  },
  {
    id: "4",
    eventId: "1",
    eventTitle: "Boda de Kathya y Erick",
    vendorId: "4",
    vendorName: "Decoraciones Elegantes",
    amount: 8000,
    date: "2026-05-15",
    type: "final",
    status: "overdue",
    method: "Transferencia",
    invoice: "#INV-004"
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
  },
  {
    id: "3",
    name: "Mariachi Los Chihuahuenses",
    avatar: "ML",
    lastMessage: "Repertorio actualizado enviado",
    time: "2 días",
    unread: 1,
    online: true,
    vendorId: "3"
  },
  {
    id: "4",
    name: "Decoraciones Elegantes",
    avatar: "DE",
    lastMessage: "Presupuesto de decoración floral",
    time: "3 días",
    unread: 0,
    online: false,
    vendorId: "4"
  }
]

export const mockMessages: Record<string, Message[]> = {
  "1": [
    { id: 1, sender: "them", text: "¡Hola! Confirmamos el horario para el 15 de junio a las 4:00 PM.", time: "10:30 AM" },
    { id: 2, sender: "me", text: "Perfecto, ¿todo listo con la disposición de mesas?", time: "10:32 AM" },
    { id: 3, sender: "them", text: "Sí, tenemos todo preparado según el plano que nos envió.", time: "10:35 AM" },
    { id: 4, sender: "me", text: "Excelente. ¿Pueden confirmar el número exacto de sillas?", time: "10:37 AM" },
    { id: 5, sender: "them", text: "Tenemos 200 sillas listas. ¿Necesita más?", time: "10:40 AM" },
  ],
  "2": [
    { id: 1, sender: "them", text: "Hemos preparado el menú personalizado según sus especificaciones.", time: "9:00 AM" },
    { id: 2, sender: "me", text: "Perfecto, ¿pueden enviar el presupuesto final?", time: "9:15 AM" },
  ],
  "3": [
    { id: 1, sender: "them", text: "Hemos actualizado nuestro repertorio. ¿Le gustaría revisarlo?", time: "11:00 AM" },
    { id: 2, sender: "me", text: "Sí, por favor envíenlo.", time: "11:05 AM" },
  ],
  "4": [
    { id: 1, sender: "them", text: "Aquí está el presupuesto de decoración floral para su evento.", time: "2:00 PM" },
  ]
}

// ============================================
// GUEST DATA (from existing file)
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
		},
		{
			id: '4',
			name: 'Carlos López',
			email: 'carlos@example.com',
			phone: '+1 234 567 8904',
			status: 'declined' as const,
			plusOne: false,
			dietaryRestrictions: '',
			notes: 'Invitado especial',
		},
	],
	'3': [
		{
			id: '5',
			name: 'Sofía Hernández',
			email: 'sofia@example.com',
			phone: '+1 234 567 8905',
			status: 'confirmed' as const,
			plusOne: true,
			dietaryRestrictions: 'Vegano',
			notes: 'Familia',
		},
		{
			id: '6',
			name: 'Diego Pérez',
			email: 'diego@example.com',
			phone: '+1 234 567 8906',
			status: 'invited' as const,
			plusOne: false,
			dietaryRestrictions: '',
			notes: 'Amigo de la familia',
		},
	],
	'4': [
		{
			id: '7',
			name: 'Laura Torres',
			email: 'laura@example.com',
			phone: '+1 234 567 8907',
			status: 'confirmed' as const,
			plusOne: false,
			dietaryRestrictions: 'Sin lácteos',
			notes: 'Amiga cercana',
		},
		{
			id: '8',
			name: 'Miguel Sánchez',
			email: 'miguel@example.com',
			phone: '+1 234 567 8908',
			status: 'pending' as const,
			plusOne: true,
			dietaryRestrictions: '',
			notes: 'Vecino',
		},
	],
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
  },
  {
    id: "3",
    title: "Quinceañera de Eunice",
    client: "Abimael Garcia",
    date: "2027-08-10",
    time: "6:00 PM",
    status: "confirmed",
    revenue: 8000,
    type: "Entertainment",
    progress: 55
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
  },
  {
    id: "3",
    amount: 3000,
    client: "Abimael Garcia",
    date: "2027-07-01",
    status: "paid",
    method: "Efectivo"
  }
]
