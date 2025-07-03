import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function CreateVehicleListingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/create">
              <Button variant="ghost" size="icon">
                <X className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Create Vehicle Listing</h1>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
        <div className="text-center p-8">
          <div className="text-6xl mb-6">🚗</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Listing</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Specialized vehicle listing form with fields for make, model, year, mileage, and vehicle-specific details is coming soon.
          </p>
          <div className="space-y-3">
            <Link href="/create/item">
              <Button className="w-full bg-facebook-blue hover:bg-facebook-blue-dark text-white">
                Create General Item Instead
              </Button>
            </Link>
            <Link href="/create">
              <Button variant="outline" className="w-full">
                Back to Listing Types
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 