"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, MapPin, Phone, Mail, Globe, Music, Flower, Utensils, Home, Camera, Car, Cake, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/hooks/use-translation"

// Types for vendors with English keys
type VendorCategory =
    | "music"
    | "decoration"
    | "food"
    | "venues"
    | "photography"
    | "transportation"
    | "entertainment"
    | "all"

interface Vendor {
    id: string
    name: string
    category: VendorCategory
    subcategory: string
    description: string
    rating: number
    reviews: number
    location: string
    contact: {
        phone: string
        email: string
        website?: string
    }
    priceRange: string
    image: string
    featured?: boolean
    services: string[]
}

const chihuahuaVendors: Vendor[] = [
    // Music vendors
    {
        id: "1",
        name: "Mariachi Los Chihuahuenses",
        category: "music",
        subcategory: "Mariachi",
        description: "Mariachi tradicional de Chihuahua con más de 20 años de experiencia en eventos sociales.",
        rating: 4.8,
        reviews: 124,
        location: "Centro, Chihuahua",
        contact: {
            phone: "+52 614 123 4567",
            email: "mariachi@chihuahua.com",
            website: "www.mariachichihuahua.com"
        },
        priceRange: "$$",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
        featured: true,
        services: ["Música en vivo", "Serenatas", "Repertorio tradicional", "Grupo completo"]
    },
    {
        id: "2",
        name: "DJ Electro Norte",
        category: "music",
        subcategory: "DJ",
        description: "DJ especializado en eventos sociales con equipo de última generación y amplia biblioteca musical.",
        rating: 4.6,
        reviews: 89,
        location: "Zona Dorada, Chihuahua",
        contact: {
            phone: "+52 614 234 5678",
            email: "dj@electronorte.com",
            website: "www.electronorte.com"
        },
        priceRange: "$$",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop",
        services: ["Música electrónica", "Música popular", "Efectos de luz", "Karaoke"]
    },
    {
        id: "3",
        name: "Banda Los Norteños",
        category: "music",
        subcategory: "Banda",
        description: "Banda norteña con los mejores éxitos regionales para animar tu evento.",
        rating: 4.7,
        reviews: 156,
        location: "Campus UACH, Chihuahua",
        contact: {
            phone: "+52 614 345 6789",
            email: "contacto@bandanorteña.com"
        },
        priceRange: "$$$",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w-400&h=300&fit=crop",
        services: ["Música norteña", "Grupo completo", "Show en vivo", "Música para bodas"]
    },

    // Decoration vendors
    {
        id: "4",
        name: "Decoraciones Elegantes Chihuahua",
        category: "decoration",
        subcategory: "Decoración de Eventos",
        description: "Decoración profesional para todo tipo de eventos con diseños personalizados.",
        rating: 4.9,
        reviews: 203,
        location: "Zona Tecnológico, Chihuahua",
        contact: {
            phone: "+52 614 456 7890",
            email: "decoracion@elegantes.com",
            website: "www.decorelegantechihuahua.com"
        },
        priceRange: "$$$",
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
        featured: true,
        services: ["Decoración floral", "Centros de mesa", "Arcos decorativos", "Iluminación especial"]
    },
    {
        id: "5",
        name: "Flores del Desierto",
        category: "decoration",
        subcategory: "Florería",
        description: "Arreglos florales únicos con flores de temporada y diseños exclusivos.",
        rating: 4.7,
        reviews: 178,
        location: "Campo Bello, Chihuahua",
        contact: {
            phone: "+52 614 567 8901",
            email: "flores@desierto.com",
            website: "www.floresdeldesierto.com"
        },
        priceRange: "$$",
        image: "https://images.unsplash.com/photo-1560185007-cde436f5a827?w=400&h=300&fit=crop",
        services: ["Ramos de novia", "Centros de mesa", "Decoración floral", "Arreglos personalizados"]
    },

    // Food vendors
    {
        id: "6",
        name: "Banquetes La Casona",
        category: "food",
        subcategory: "Catering",
        description: "Servicio de catering gourmet especializado en cocina mexicana e internacional.",
        rating: 4.8,
        reviews: 245,
        location: "Centro Histórico, Chihuahua",
        contact: {
            phone: "+52 614 678 9012",
            email: "info@lacasona.com",
            website: "www.banqueteslacasona.com"
        },
        priceRange: "$$$",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        featured: true,
        services: ["Buffet", "Plato fuerte", "Postres", "Bebidas", "Meseros"]
    },
    {
        id: "7",
        name: "Tacos Don Chuy",
        category: "food",
        subcategory: "Food Truck",
        description: "Tacos norteños auténticos para eventos informales y celebraciones al aire libre.",
        rating: 4.5,
        reviews: 312,
        location: "Periférico de la Juventud, Chihuahua",
        contact: {
            phone: "+52 614 789 0123",
            email: "tacos@donchuy.com"
        },
        priceRange: "$",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
        services: ["Tacos", "Quesadillas", "Bebidas", "Salsas tradicionales"]
    },

    // Locations vendors
    {
        id: "8",
        name: "Salón Los Arcos",
        category: "venues",
        subcategory: "Salón de Eventos",
        description: "Salón elegante para bodas, quinceañeras y eventos corporativos con capacidad para 500 personas.",
        rating: 4.9,
        reviews: 189,
        location: "Zona Norte, Chihuahua",
        contact: {
            phone: "+52 614 890 1234",
            email: "reservaciones@salonlosarcos.com",
            website: "www.salonlosarcoschihuahua.com"
        },
        priceRange: "$$$$",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
        featured: true,
        services: ["Espacio completo", "Mobiliario", "Sonido básico", "Estacionamiento", "Coordinador de eventos"]
    },
    {
        id: "9",
        name: "Iglesia San Francisco",
        category: "venues",
        subcategory: "Iglesia",
        description: "Hermosa iglesia histórica para todo tipo de ceremonias religiosas.",
        rating: 4.7,
        reviews: 95,
        location: "Centro, Chihuahua",
        contact: {
            phone: "+52 614 901 2345",
            email: "iglesia@sanfranciscochihuahua.org"
        },
        priceRange: "$$",
        image: "https://images.unsplash.com/photo-1544830288-5a5297964c96?w=400&h=300&fit=crop",
        services: ["Ceremonias religiosas", "Capilla", "Coro", "Servicios adicionales"]
    },
    {
        id: "10",
        name: "Jardines del Parque",
        category: "venues",
        subcategory: "Jardines",
        description: "Jardines naturales para eventos al aire libre con vistas panorámicas.",
        rating: 4.6,
        reviews: 134,
        location: "Zona Poniente, Chihuahua",
        contact: {
            phone: "+52 614 012 3456",
            email: "eventos@jardinesdelparque.com"
        },
        priceRange: "$$$",
        image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=400&h=300&fit=crop",
        services: ["Espacio abierto", "Área de juegos", "Zona de alimentos", "Estacionamiento"]
    },

    // Photography vendors
    {
        id: "11",
        name: "Fotografía Memoria Viva",
        category: "photography",
        subcategory: "Fotografía",
        description: "Fotógrafos profesionales especializados en capturar los momentos más importantes de tu evento.",
        rating: 4.9,
        reviews: 287,
        location: "Zona Dorada, Chihuahua",
        contact: {
            phone: "+52 614 123 7890",
            email: "fotos@memoriaviva.com",
            website: "www.memoriavivafotos.com"
        },
        priceRange: "$$$",
        image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop",
        featured: true,
        services: ["Fotografía digital", "Álbumes", "Video profesional", "Sesiones previas", "Fotos instantáneas"]
    },

    // Transportation vendors
    {
        id: "12",
        name: "Transporte Elegante Chihuahua",
        category: "transportation",
        subcategory: "Transporte",
        description: "Flotilla de vehículos de lujo para transportar a los invitados de tu evento.",
        rating: 4.5,
        reviews: 167,
        location: "Aeropuerto, Chihuahua",
        contact: {
            phone: "+52 614 234 8901",
            email: "reservaciones@transporteelegante.com"
        },
        priceRange: "$$",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop",
        services: ["Limoninas", "Autobuses", "Chofer profesional", "Decoración de vehículos"]
    },

    // Entertainment vendors
    {
        id: "13",
        name: "Show de Magia Chihuahua",
        category: "entertainment",
        subcategory: "Espectáculos",
        description: "Magos profesionales para entretener a niños y adultos en tu evento.",
        rating: 4.8,
        reviews: 142,
        location: "Centro, Chihuahua",
        contact: {
            phone: "+52 614 345 9012",
            email: "magia@showchihuahua.com"
        },
        priceRange: "$$",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&h=300&fit=crop",
        services: ["Show de magia", "Interactivo", "Todas las edades", "Duración flexible"]
    },
    {
        id: "14",
        name: "Pastelería Dulce Sabor",
        category: "food",
        subcategory: "Repostería",
        description: "Pasteles personalizados para bodas, quinceañeras y eventos especiales.",
        rating: 4.9,
        reviews: 198,
        location: "Zona Tecnológico, Chihuahua",
        contact: {
            phone: "+52 614 456 0123",
            email: "pedidos@dulcesabor.com",
            website: "www.dulcesaborchihuahua.com"
        },
        priceRange: "$$",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop",
        services: ["Pasteles de boda", "Postres individuales", "Diseños personalizados", "Entrega a domicilio"]
    }
]

const categoryIcons: Record<VendorCategory, React.ReactNode> = {
    music: <Music className="h-5 w-5" />,
    decoration: <Flower className="h-5 w-5" />,
    food: <Utensils className="h-5 w-5" />,
    venues: <Home className="h-5 w-5" />,
    photography: <Camera className="h-5 w-5" />,
    transportation: <Car className="h-5 w-5" />,
    entertainment: <Music className="h-5 w-5" />,
    all: <Star className="h-5 w-5" />
}

export default function VendorsPage() {
    const { t } = useTranslation()
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<VendorCategory>("all")
    const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(chihuahuaVendors)

    useEffect(() => {
        let results = chihuahuaVendors

        // Filter by category
        if (selectedCategory !== "all") {
            results = results.filter(vendor => vendor.category === selectedCategory)
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            results = results.filter(vendor =>
                vendor.name.toLowerCase().includes(query) ||
                vendor.description.toLowerCase().includes(query) ||
                vendor.services.some(service => service.toLowerCase().includes(query)) ||
                vendor.subcategory.toLowerCase().includes(query)
            )
        }

        // Sort: featured first, then by rating
        results.sort((a, b) => {
            if (a.featured && !b.featured) return -1
            if (!a.featured && b.featured) return 1
            return b.rating - a.rating
        })

        setFilteredVendors(results)
    }, [searchQuery, selectedCategory])

    const categories: { id: VendorCategory; count: number; icon: React.ReactNode; description?: string }[] = [
        { id: "all", count: chihuahuaVendors.length, icon: categoryIcons.all },
        { id: "music", count: chihuahuaVendors.filter(v => v.category === "music").length, icon: categoryIcons.music },
        { id: "decoration", count: chihuahuaVendors.filter(v => v.category === "decoration").length, icon: categoryIcons.decoration },
        { id: "food", count: chihuahuaVendors.filter(v => v.category === "food").length, icon: categoryIcons.food },
        { id: "venues", count: chihuahuaVendors.filter(v => v.category === "venues").length, icon: categoryIcons.venues },
        { id: "photography", count: chihuahuaVendors.filter(v => v.category === "photography").length, icon: categoryIcons.photography },
        { id: "transportation", count: chihuahuaVendors.filter(v => v.category === "transportation").length, icon: categoryIcons.transportation },
        { id: "entertainment", count: chihuahuaVendors.filter(v => v.category === "entertainment").length, icon: categoryIcons.entertainment }
    ]

    return (
        <div className="w-full space-y-6 p-4 md:p-6 lg:p-8 overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-xl p-6 md:p-8 animate-gradient-shift">
                <div className="relative z-10 text-white">
                    <div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-3">
                            {t('providers.title')}
                        </h1>
                        <p className="text-white/80 text-base md:text-lg mb-6 max-w-2xl">
                            {t('providers.subtitle')}
                        </p>
                    </div>
                </div>

                {/* Background particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
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

            {/* Search Bar */}
            <div className="relative">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                        type="search"
                        placeholder={t('providers.searchPlaceholder')}
                        className="pl-10 pr-4 py-6 text-base rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Contenedor principal */}
            <div className="space-y-4">

                {/* Category Tabs */}
                <div className="w-full !my-8">
                    <Tabs
                        defaultValue="all"
                        className="w-full"
                        onValueChange={(value) => setSelectedCategory(value as VendorCategory)}
                    >
                        <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
                            {categories.map((category) => {
                                const isActive = category.id === selectedCategory;
                                return (
                                    <TabsTrigger
                                        key={category.id}
                                        value={category.id}
                                        className={`
                group flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive
                                                ? 'bg-primary text-white shadow-md'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                            }
                hover:shadow-sm active:scale-[0.98] min-w-fit
              `}
                                    >
                                        {/* Icono */}
                                        <div className={`
                p-1.5 rounded-md
                ${isActive ? 'bg-white/20' : 'bg-primary/10 text-primary'}
              `}>
                                            <span className="text-base">{category.icon}</span>
                                        </div>

                                        {/* Nombre */}
                                        <span className="font-medium text-sm whitespace-nowrap">
                                            {t(`providers.categories.${category.id}`)}
                                        </span>

                                        {/* Contador */}
                                        <div className={`
                px-2 py-0.5 rounded-full text-xs font-bold
                ${isActive
                                                ? 'bg-white/30 text-white'
                                                : 'bg-primary/10 text-primary'
                                            }
              `}>
                                            {category.count}
                                        </div>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </Tabs>
                </div>

                {/* Header de resultados */}
                <div className="flex justify-between items-center !my-16 bg-fuchsia-200/50 px-4 py-2 rounded-lg">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-1">
                            {t(`providers.categories.${selectedCategory}`)}
                        </h2>
                        <p className="text-gray-600 text-sm">
                            {filteredVendors.length} {filteredVendors.length === 1
                                ? t('providers.results.found_singular')
                                : t('providers.results.found')}
                            {selectedCategory !== 'all' && ` en ${t(`providers.categories.${selectedCategory}`)}`}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setSearchQuery("")
                            setSelectedCategory("all")
                        }}
                        className="whitespace-nowrap bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70 border-transparent hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <X className="h-3 w-3 mr-1.5" />
                        {t('providers.clearFilters')}
                    </Button>
                </div>

                {/* Vendors Grid */}
                {filteredVendors.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border">
                        <div className="text-gray-400 mb-3">
                            <Search className="h-10 w-10 mx-auto" />
                        </div>
                        <h3 className="text-base font-semibold mb-1">{t('providers.results.none')}</h3>
                        <p className="text-gray-500 text-sm">{t('providers.results.noneDescription')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredVendors.map((vendor, index) => (
                            <div
                                key={vendor.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className={`h-full overflow-hidden hover:shadow-md transition-shadow ${vendor.featured ? 'border-primary border' : ''}`}>
                                    {vendor.featured && (
                                        <div className="absolute top-2 right-2 z-10">
                                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                                                {t('providers.vendorCard.featured')}
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Vendor Image */}
                                    <div
                                        className="h-40 w-full bg-cover bg-center relative"
                                        style={{ backgroundImage: `url(${vendor.image})` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        <div className="absolute bottom-3 left-3">
                                            <Badge className="bg-white/90 text-gray-800 text-xs">
                                                {vendor.subcategory}
                                            </Badge>
                                        </div>
                                    </div>

                                    <CardHeader >
                                        <div className="grid grid-cols-[1fr_auto] items-start gap-3">
                                            {/* Left section - will never push right section */}
                                            <div className="min-w-0 relative group">
                                                <CardTitle className="text-base font-semibold truncate text-gray-900">
                                                    {vendor.name}
                                                </CardTitle>

                                                {/* Hover overlay */}
                                                <CardTitle className="absolute left-0 top-0 z-50 whitespace-nowrap bg-white hidden group-hover:block px-0 m-0">
                                                    {vendor.name}
                                                </CardTitle>

                                                <CardDescription className="mt-2">
                                                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg max-w-full cursor-pointer">
                                                        <MapPin className="h-3 w-3 text-blue-600 shrink-0 flex-shrink-0" />
                                                        <span className="text-xs font-medium text-blue-800 truncate max-w-[180px]">
                                                            {vendor.location}
                                                        </span>
                                                    </div>
                                                </CardDescription>
                                            </div>

                                            {/* Right section - fixed width */}
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center gap-1 px-3 py-2 border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg whitespace-nowrap cursor-pointer">
                                                    <Star className="h-3 w-3 fill-amber-500 text-amber-500 flex-shrink-0" />
                                                    <span className="font-bold text-sm text-amber-800">{vendor.rating}</span>
                                                    <span className="text-amber-600 text-xs">({vendor.reviews})</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>


                                    <CardContent >

                                        {/* Description */}
                                        <p className="text-gray-600 text-md line-clamp-3 mb-2">{vendor.description}</p>

                                        {/* Services */}
                                        <div className="mt-3">
                                            <p className="text-md font-bold text-gray-800 mb-1">{t('providers.vendorCard.services')}</p>

                                            <div className="flex flex-wrap gap-2 overflow-x-auto p-1 mb-2">
                                                {vendor.services.slice(0, 3).map((service, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="secondary"
                                                        className={`
          text-sm px-2 py-1 rounded-lg bg-indigo-200/20 text-indigo-800 border-indigo-800
          transition-all duration-150 cursor-pointer
          hover:scale-105 hover:bg-indigo-50
        `}
                                                    >
                                                        {service}
                                                    </Badge>
                                                ))}
                                                {vendor.services.length > 3 && (
                                                    <Badge variant="secondary" className="text-sm px-2 py-1 rounded-lg bg-indigo-200/20 text-indigo-800 border-indigo-800 cursor-pointer">
                                                        +{vendor.services.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {/* Price Range */}
                                        <div className="flex items-center justify-between mb-3 px-3 py-0.5 bg-gradient-to-r from-indigo-50/60 to-pink-50/60 rounded-xl border border-indigo-100 cursor-pointer">
                                            <span className="text-sm font-semibold text-indigo-700">
                                                {t('providers.vendorCard.priceRange')}
                                            </span>
                                            <div className="flex flex-col items-end">
                                                <div className={`
            text-xs font-medium px-3 py-0.5 rounded-full text-center
            ${vendor.priceRange === "$" ? "bg-emerald-100 text-emerald-800" : ""}
            ${vendor.priceRange === "$$" ? "bg-blue-100 text-blue-800" : ""}
            ${vendor.priceRange === "$$$" ? "bg-purple-100 text-purple-800" : ""}
            ${vendor.priceRange === "$$$$" ? "bg-amber-100 text-amber-800" : ""}
        `}>
                                                    <div>
                                                        {vendor.priceRange === "$" && "Económico"}
                                                        {vendor.priceRange === "$$" && "Moderado"}
                                                        {vendor.priceRange === "$$$" && "Premium"}
                                                        {vendor.priceRange === "$$$$" && "Lujo"}
                                                    </div>
                                                    <div className={`
                text-xs font-bold
                ${vendor.priceRange === "$" ? "text-emerald-700" : ""}
                ${vendor.priceRange === "$$" ? "text-blue-700" : ""}
                ${vendor.priceRange === "$$$" ? "text-purple-700" : ""}
                ${vendor.priceRange === "$$$$" ? "text-amber-700" : ""}
            `}>
                                                        {vendor.priceRange}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </CardContent>

                                    <CardFooter className="pt-2 border-t flex flex-col gap-2">
                                        {/* <div className="flex items-center gap-2 text-xs text-gray-600 w-full">
                                            <Phone className="h-3 w-3" />
                                            <span className="truncate">{vendor.contact.phone}</span>
                                        </div> */}

                                        <div className="flex gap-2 w-full">
                                            <Button
                                                size="sm"
                                                className="flex-1 text-sm h-8"
                                                onClick={() => window.open(`tel:${vendor.contact.phone}`)}
                                            >
                                                {t('providers.vendorCard.call')}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex-1 text-sm h-8"
                                                onClick={() => window.open(`mailto:${vendor.contact.email}`)}
                                            >
                                                <Mail className="h-3 w-3 mr-1" />
                                                {t('providers.vendorCard.email')}
                                            </Button>
                                            {vendor.contact.website && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => window.open(vendor.contact.website, '_blank')}
                                                >
                                                    <Globe className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Statistics Section */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg font-heading">{t('providers.statistics')}</CardTitle>
                    <CardDescription>{t('providers.statisticsDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.slice(1).map((category) => (
                            <div key={category.id} className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                                    <div className="text-primary">
                                        {category.icon}
                                    </div>
                                </div>
                                <p className="text-lg font-bold">{category.count}</p>
                                <p className="text-sm text-gray-600">{t(`providers.categories.${category.id}`)}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Call to Action */}
            {/* <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-heading font-bold mb-2">{t('providers.joinPrompt')}</h3>
                    <p className="text-gray-600 mb-4">
                        {t('providers.joinDescription')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button className="gradient-royal hover:glow-primary transition-all duration-300">
                            {t('providers.registerBusiness')}
                        </Button>
                        <Button variant="outline">
                            {t('providers.moreInfo')}
                        </Button>
                    </div>
                </CardContent>
            </Card> */}
        </div>
    )
}