import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for marketplace items
const mockItems = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: "Lorem ipsum dolor sit",
  price: "$2,300",
  location: "Palo Alto, CA",
  image: "/api/placeholder/300/300", // Placeholder image
}))

export function ProductGrid() {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Today&apos;s picks</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {mockItems.map((item) => (
          <Link key={item.id} href={`/item/${item.id}`}>
            <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-0">
                {/* Placeholder image with crosshatch pattern */}
                <div className="aspect-square bg-facebook-blue-light relative overflow-hidden rounded-t-lg">
                  <div 
                    className="w-full h-full opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, #1877F2 25%, transparent 25%),
                        linear-gradient(-45deg, #1877F2 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #1877F2 75%),
                        linear-gradient(-45deg, transparent 75%, #1877F2 75%)
                      `,
                      backgroundSize: '10px 10px',
                      backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
                    }}
                  />
                </div>
                
                <div className="p-3">
                  <div className="font-semibold text-lg text-gray-900 mb-1">
                    {item.price}
                  </div>
                  <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 