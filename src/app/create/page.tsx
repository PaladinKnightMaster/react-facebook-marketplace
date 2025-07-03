import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Tag } from "lucide-react"

const listingTypes = [
  {
    id: "item-for-sale",
    title: "Item for sale",
    description: "Lorem ipsum dolor sit",
    icon: "🏷️",
    href: "/create/item"
  },
  {
    id: "multiple-listings",
    title: "Create multiple listings",
    description: "Lorem ipsum dolor sit",
    icon: "📋",
    href: "/create/multiple"
  },
  {
    id: "vehicle-for-sale",
    title: "Vehicle for sale",
    description: "Lorem ipsum dolor sit",
    icon: "🚗",
    href: "/create/vehicle"
  },
  {
    id: "home-for-sale",
    title: "Home for sale or rent",
    description: "Lorem ipsum dolor sit",
    icon: "🏠",
    href: "/create/home"
  }
]

export default function CreateListingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <X className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Create new listing</h1>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex">
        <div className="w-80 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <div className="p-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3 px-3 py-2 bg-gray-100 rounded-lg">
                <Tag className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Choose listing type</span>
              </div>
              <div className="flex items-center space-x-3 px-3 py-2 text-gray-400">
                <Tag className="w-5 h-5" />
                <span className="text-sm">Your listings</span>
              </div>
              <div className="flex items-center space-x-3 px-3 py-2 text-gray-400">
                <Tag className="w-5 h-5" />
                <span className="text-sm">Seller help</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Choose listing type</h2>
            
            {/* Updated grid layout for equal card sizes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center">
              {listingTypes.map((type) => (
                <Link key={type.id} href={type.href} className="w-full max-w-[280px]">
                  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md h-full">
                    <CardContent className="p-8 text-center h-full flex flex-col justify-between min-h-[240px]">
                      {/* Icon container with fixed size */}
                      <div className="flex flex-col items-center flex-1">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-facebook-blue-light group-hover:scale-110 transition-all duration-300 border-2 border-gray-100 group-hover:border-facebook-blue">
                          <span className="text-4xl">{type.icon}</span>
                        </div>
                        
                        {/* Text content with consistent spacing */}
                        <div className="space-y-3">
                          <h3 className="font-bold text-lg text-gray-900 leading-tight min-h-[3.5rem] flex items-center justify-center">
                            {type.title}
                          </h3>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 