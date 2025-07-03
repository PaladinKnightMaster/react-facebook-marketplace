import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function CreateMultipleListingsPage() {
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
            <h1 className="text-xl font-semibold text-gray-900">Create Multiple Listings</h1>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
        <div className="text-center p-8">
          <div className="text-6xl mb-6">📋</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Multiple Listings</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Create multiple listings at once. This feature is coming soon to help you list multiple items quickly and efficiently.
          </p>
          <div className="space-y-3">
            <Link href="/create/item">
              <Button className="w-full bg-facebook-blue hover:bg-facebook-blue-dark text-white">
                Create Single Item Instead
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