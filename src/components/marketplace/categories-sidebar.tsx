"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Car, 
  Home, 
  Shirt, 
  Smartphone, 
  Gamepad2, 
  Dumbbell, 
  Baby, 
  Gift, 
  Flower, 
  Users 
} from "lucide-react"

interface Category {
  name: string
  slug: string
  icon: React.ReactNode
}

const categories: Category[] = [
  { name: "Vehicles", slug: "vehicles", icon: <Car className="w-5 h-5" /> },
  { name: "Property Rentals", slug: "property-rentals", icon: <Home className="w-5 h-5" /> },
  { name: "Apparel", slug: "apparel", icon: <Shirt className="w-5 h-5" /> },
  { name: "Classifieds", slug: "classifieds", icon: <Users className="w-5 h-5" /> },
  { name: "Electronics", slug: "electronics", icon: <Smartphone className="w-5 h-5" /> },
  { name: "Entertainment", slug: "entertainment", icon: <Gamepad2 className="w-5 h-5" /> },
  { name: "Family", slug: "family", icon: <Baby className="w-5 h-5" /> },
  { name: "Free Stuff", slug: "free-stuff", icon: <Gift className="w-5 h-5" /> },
  { name: "Garden & Outdoor", slug: "garden-outdoor", icon: <Flower className="w-5 h-5" /> },
  { name: "Hobbies", slug: "hobbies", icon: <Gamepad2 className="w-5 h-5" /> },
  { name: "Home Goods", slug: "home-goods", icon: <Home className="w-5 h-5" /> },
  { name: "Home Improvement", slug: "home-improvement", icon: <Home className="w-5 h-5" /> },
  { name: "Home Sales", slug: "home-sales", icon: <Home className="w-5 h-5" /> },
  { name: "Musical Instruments", slug: "musical-instruments", icon: <Gamepad2 className="w-5 h-5" /> },
  { name: "Office Supplies", slug: "office-supplies", icon: <Smartphone className="w-5 h-5" /> },
  { name: "Pet Supplies", slug: "pet-supplies", icon: <Baby className="w-5 h-5" /> },
  { name: "Sporting Goods", slug: "sporting-goods", icon: <Dumbbell className="w-5 h-5" /> },
  { name: "Toys & Games", slug: "toys-games", icon: <Gamepad2 className="w-5 h-5" /> },
  { name: "Buy and sell groups", slug: "groups", icon: <Users className="w-5 h-5" /> }
]

export function CategoriesSidebar() {
  const pathname = usePathname()

  const isActiveCategory = (slug: string) => {
    return pathname === `/category/${slug}`
  }

  return (
    <div className="w-72 bg-white border-r border-gray-200 p-4 h-screen overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Browse all</h2>
        <p className="text-sm text-gray-600">in Marketplace</p>
      </div>
      
      <nav className="space-y-1">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
              isActiveCategory(category.slug)
                ? "bg-facebook-blue-light text-facebook-blue font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category.icon}
            <span className="text-sm">{category.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
} 