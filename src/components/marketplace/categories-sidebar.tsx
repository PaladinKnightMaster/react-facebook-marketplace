"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, Home, Shirt, Tag, Zap, Music, Briefcase, PawPrint, Wrench, Building, House, Guitar, Coffee, Gamepad2, Baby, Bike } from "lucide-react"

const categories = [
  { name: "Vehicles", icon: Car, href: "/category/vehicles" },
  { name: "Property Rentals", icon: Building, href: "/category/property-rentals" },
  { name: "Apparel", icon: Shirt, href: "/category/apparel" },
  { name: "Classifieds", icon: Tag, href: "/category/classifieds" },
  { name: "Electronics", icon: Zap, href: "/category/electronics" },
  { name: "Entertainment", icon: Music, href: "/category/entertainment" },
  { name: "Family", icon: Baby, href: "/category/family" },
  { name: "Free Stuff", icon: Tag, href: "/category/free-stuff" },
  { name: "Garden & Outdoor", icon: Wrench, href: "/category/garden-outdoor" },
  { name: "Hobbies", icon: Gamepad2, href: "/category/hobbies" },
  { name: "Home Goods", icon: House, href: "/category/home-goods" },
  { name: "Home Improvement", icon: Wrench, href: "/category/home-improvement" },
  { name: "Home Sales", icon: Home, href: "/category/home-sales" },
  { name: "Musical Instruments", icon: Guitar, href: "/category/musical-instruments" },
  { name: "Office Supplies", icon: Briefcase, href: "/category/office-supplies" },
  { name: "Pet Supplies", icon: PawPrint, href: "/category/pet-supplies" },
  { name: "Sporting Goods", icon: Bike, href: "/category/sporting-goods" },
  { name: "Toys & Games", icon: Gamepad2, href: "/category/toys-games" },
  { name: "Buy and sell groups", icon: Tag, href: "/category/groups" },
]

export function CategoriesSidebar() {
  const pathname = usePathname()
  
  return (
    <div className="w-80 bg-white border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>
        <nav className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = pathname === category.href
            return (
              <Link
                key={category.name}
                href={category.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-facebook-blue-light text-facebook-blue border-l-4 border-facebook-blue"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                {category.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
} 