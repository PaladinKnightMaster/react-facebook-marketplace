"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search } from "lucide-react"

// Mock search results data
const mockItems = [
  {
    id: "1",
    title: "MacBook Air M2 - Like New",
    price: 1200,
    location: "Palo Alto, CA",
    category: "Electronics",
    postedDate: "2 days ago",
    keywords: ["macbook", "laptop", "computer", "apple", "m2"]
  },
  {
    id: "2", 
    title: "iPhone 15 Pro Max",
    price: 999,
    location: "San Francisco, CA",
    category: "Electronics",
    postedDate: "1 day ago",
    keywords: ["iphone", "phone", "mobile", "apple", "smartphone"]
  },
  {
    id: "3",
    title: "Gaming Chair - Ergonomic",
    price: 250,
    location: "Mountain View, CA", 
    category: "Home Goods",
    postedDate: "3 days ago",
    keywords: ["chair", "gaming", "office", "furniture", "ergonomic"]
  },
  {
    id: "4",
    title: "Nike Air Jordan Sneakers",
    price: 180,
    location: "Redwood City, CA",
    category: "Apparel", 
    postedDate: "1 week ago",
    keywords: ["shoes", "sneakers", "nike", "jordan", "basketball"]
  },
  {
    id: "5",
    title: "PlayStation 5 Console",
    price: 450,
    location: "San Jose, CA",
    category: "Electronics",
    postedDate: "4 days ago", 
    keywords: ["playstation", "ps5", "gaming", "console", "sony"]
  },
  {
    id: "6",
    title: "Mountain Bike - Trek",
    price: 800,
    location: "Palo Alto, CA",
    category: "Sporting Goods",
    postedDate: "5 days ago",
    keywords: ["bike", "bicycle", "mountain", "trek", "cycling"]
  }
]

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  // Filter items based on search query
  const filteredItems = query 
    ? mockItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
      )
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-gray-500" />
            <h1 className="text-xl font-semibold text-gray-900">
              Search Results
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Query Display */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {query ? `Results for "${query}"` : "Enter a search term"}
          </h2>
          <p className="text-gray-600">
            {query && filteredItems.length > 0 
              ? `${filteredItems.length} item${filteredItems.length !== 1 ? 's' : ''} found`
              : query && filteredItems.length === 0 
                ? "No items found" 
                : "Use the search bar above to find items"}
          </p>
        </div>

        {/* Search Results */}
        {query ? (
          filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredItems.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/item/${item.id}`}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                >
                  <div className="aspect-square bg-facebook-blue-light relative overflow-hidden">
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
                      ${item.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.title}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {item.location}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {item.postedDate}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* No Results Found */
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No items found for "{query}"
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try different keywords or browse our categories to find what you're looking for.
              </p>
              <Link href="/">
                <Button className="bg-facebook-blue hover:bg-facebook-blue-dark text-white">
                  Browse All Items
                </Button>
              </Link>
            </div>
          )
        ) : (
          /* Empty Search State */
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start your search
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Use the search bar above to find specific items, or browse by category.
            </p>
            <Link href="/">
              <Button className="bg-facebook-blue hover:bg-facebook-blue-dark text-white">
                Browse Categories
              </Button>
            </Link>
          </div>
        )}

        {/* Search Suggestions */}
        {query && filteredItems.length === 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Electronics", "Vehicles", "Home Goods", "Apparel", "Sporting Goods"].map((category) => (
                <Link 
                  key={category}
                  href={`/category/${category.toLowerCase().replace(' ', '-')}`}
                >
                  <Badge variant="outline" className="hover:bg-facebook-blue-light cursor-pointer">
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Search className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-pulse" />
          <p className="text-gray-600">Loading search results...</p>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
} 