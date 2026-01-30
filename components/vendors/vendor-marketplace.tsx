"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Grid, List } from "lucide-react"
import { VendorCard } from "./vendor-card"
import { VendorFilters } from "./vendor-filters"
import { VendorProfileModal } from "./vendor-profile-modal"

// Mock vendor data
const vendors = [
  {
    id: "1",
    name: "Elite Catering Co.",
    category: "Catering",
    location: "New York, NY",
    rating: 4.9,
    reviewCount: 127,
    priceRange: "$$$",
    image: "/luxury-catering-service.jpg",
    description: "Premium catering services for luxury events",
    specialties: ["Fine Dining", "Wine Pairing", "Custom Menus"],
    verified: true,
    featured: true,
    startingPrice: 150,
    portfolio: ["/catering-portfolio-1.jpg", "/catering-portfolio-2.jpg", "/catering-portfolio-3.jpg"],
  },
  {
    id: "2",
    name: "Harmony DJ Services",
    category: "DJ & Music",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviewCount: 89,
    priceRange: "$$",
    image: "/professional-dj-service.jpg",
    description: "Professional DJ services with premium sound systems",
    specialties: ["Wedding Music", "Corporate Events", "Live Mixing"],
    verified: true,
    featured: false,
    startingPrice: 800,
    portfolio: ["/dj-portfolio-1.jpg", "/dj-portfolio-2.jpg"],
  },
  {
    id: "3",
    name: "The Grand Ballroom",
    category: "Venue",
    location: "Chicago, IL",
    rating: 4.9,
    reviewCount: 203,
    priceRange: "$$$$",
    image: "/grand-ballroom-venue.jpg",
    description: "Elegant ballroom venue for sophisticated events",
    specialties: ["Weddings", "Corporate Galas", "Award Ceremonies"],
    verified: true,
    featured: true,
    startingPrice: 5000,
    portfolio: ["/venue-portfolio-1.jpg", "/venue-portfolio-2.jpg", "/venue-portfolio-3.jpg", "/venue-portfolio-4.jpg"],
  },
  {
    id: "4",
    name: "Bloom & Blossom Florists",
    category: "Florist",
    location: "Miami, FL",
    rating: 4.7,
    reviewCount: 156,
    priceRange: "$$$",
    image: "/luxury-florist-service.jpg",
    description: "Exquisite floral arrangements for luxury events",
    specialties: ["Bridal Bouquets", "Centerpieces", "Event Decor"],
    verified: true,
    featured: false,
    startingPrice: 300,
    portfolio: ["/florist-portfolio-1.jpg", "/florist-portfolio-2.jpg", "/florist-portfolio-3.jpg"],
  },
  {
    id: "5",
    name: "Lens & Light Photography",
    category: "Photography",
    location: "San Francisco, CA",
    rating: 4.9,
    reviewCount: 94,
    priceRange: "$$$",
    image: "/professional-photographer.jpg",
    description: "Award-winning event photography with artistic vision",
    specialties: ["Wedding Photography", "Corporate Events", "Portrait Sessions"],
    verified: true,
    featured: true,
    startingPrice: 2500,
    portfolio: ["/photo-portfolio-1.jpg", "/photo-portfolio-2.jpg", "/photo-portfolio-3.jpg", "/photo-portfolio-4.jpg"],
  },
  {
    id: "6",
    name: "Platinum Transportation",
    category: "Transportation",
    location: "Las Vegas, NV",
    rating: 4.6,
    reviewCount: 78,
    priceRange: "$$",
    image: "/luxury-transportation.jpg",
    description: "Premium transportation services for special events",
    specialties: ["Luxury Cars", "Party Buses", "Wedding Transport"],
    verified: true,
    featured: false,
    startingPrice: 200,
    portfolio: ["/transport-portfolio-1.jpg", "/transport-portfolio-2.jpg"],
  },
]

const categories = [
  "All Categories",
  "Catering",
  "DJ & Music",
  "Venue",
  "Photography",
  "Videography",
  "Florist",
  "Transportation",
  "Entertainment",
  "Lighting & AV",
]

export function VendorMarketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedVendor, setSelectedVendor] = useState<(typeof vendors)[0] | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || vendor.category === selectedCategory
    const matchesLocation = !selectedLocation || vendor.location.toLowerCase().includes(selectedLocation.toLowerCase())
    const matchesPrice = !priceRange || vendor.priceRange === priceRange

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice
  })

  const toggleFavorite = (vendorId: string) => {
    setFavorites((prev) => (prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-balance">Vendor Marketplace</h1>
          <p className="text-muted-foreground mt-2">Discover premium vendors for your luxury events</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors, services, or specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="pl-10 w-[150px]"
              />
            </div>

            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <VendorFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onClose={() => setShowFilters(false)}
            />
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">{filteredVendors.length} vendors found</p>
          {(searchQuery || selectedCategory !== "All Categories" || selectedLocation || priceRange) && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-destructive">
                    ×
                  </button>
                </Badge>
              )}
              {selectedCategory !== "All Categories" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All Categories")} className="ml-1 hover:text-destructive">
                    ×
                  </button>
                </Badge>
              )}
              {selectedLocation && (
                <Badge variant="secondary" className="gap-1">
                  {selectedLocation}
                  <button onClick={() => setSelectedLocation("")} className="ml-1 hover:text-destructive">
                    ×
                  </button>
                </Badge>
              )}
              {priceRange && (
                <Badge variant="secondary" className="gap-1">
                  {priceRange}
                  <button onClick={() => setPriceRange("")} className="ml-1 hover:text-destructive">
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        <Select defaultValue="featured">
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="reviews">Most Reviews</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vendor Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredVendors.map((vendor, index) => (
          <div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <VendorCard
              vendor={vendor}
              viewMode={viewMode}
              isFavorite={favorites.includes(vendor.id)}
              onToggleFavorite={() => toggleFavorite(vendor.id)}
              onViewProfile={() => setSelectedVendor(vendor)}
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVendors.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No vendors found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search criteria or browse all categories</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All Categories")
              setSelectedLocation("")
              setPriceRange("")
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Vendor Profile Modal */}
      {selectedVendor && (
        <VendorProfileModal
          vendor={selectedVendor}
          open={!!selectedVendor}
          onOpenChange={() => setSelectedVendor(null)}
          isFavorite={favorites.includes(selectedVendor.id)}
          onToggleFavorite={() => toggleFavorite(selectedVendor.id)}
        />
      )}
    </div>
  )
}
