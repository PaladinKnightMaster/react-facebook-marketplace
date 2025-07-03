"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, Mail, Search, User, Plus } from "lucide-react"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e as any)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left side - Facebook logo and search */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-facebook-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">f</span>
            </div>
          </Link>
          <div className="hidden md:block w-0.5 h-6 bg-gray-300 mx-2"></div>
          <Link href="/" className="text-2xl font-bold text-gray-900 hidden md:block">
            Marketplace
          </Link>
        </div>

        {/* Center - Search bar (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Marketplace"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 ring-facebook-blue"
            />
          </form>
        </div>

        {/* Right side - Navigation icons */}
        <div className="flex items-center space-x-2">
          <Link href="/create">
            <Button variant="ghost" className="hidden md:flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create new listing</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Mail className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="w-5 h-5" />
          </Button>
          <Avatar className="w-8 h-8">
            <AvatarFallback>
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
} 