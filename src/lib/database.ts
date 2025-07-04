import { supabase, Listing, Message } from './supabase'

// Listings Service
export const listingsService = {
  // Get all listings
  async getAll(): Promise<Listing[]> {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching listings:', error)
      return []
    }
    
    return data || []
  },

  // Get listings by category
  async getByCategory(category: string): Promise<Listing[]> {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching listings by category:', error)
      return []
    }
    
    return data || []
  },

  // Search listings
  async search(query: string): Promise<Listing[]> {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error searching listings:', error)
      return []
    }
    
    return data || []
  },

  // Get single listing by ID
  async getById(id: string): Promise<Listing | null> {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching listing:', error)
      return null
    }
    
    return data
  },

  // Create new listing
  async create(listing: Omit<Listing, 'id' | 'created_at' | 'updated_at'>): Promise<Listing | null> {
    const { data, error } = await supabase
      .from('listings')
      .insert([listing])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating listing:', error)
      return null
    }
    
    return data
  },

  // Update listing
  async update(id: string, updates: Partial<Listing>): Promise<Listing | null> {
    const { data, error } = await supabase
      .from('listings')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating listing:', error)
      return null
    }
    
    return data
  },

  // Delete listing
  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting listing:', error)
      return false
    }
    
    return true
  }
}

// Messages Service
export const messagesService = {
  // Get messages for a listing
  async getByListing(listingId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('listing_id', listingId)
      .order('created_at', { ascending: true })
    
    if (error) {
      console.error('Error fetching messages:', error)
      return []
    }
    
    return data || []
  },

  // Send message
  async create(message: Omit<Message, 'id' | 'created_at'>): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single()
    
    if (error) {
      console.error('Error sending message:', error)
      return null
    }
    
    return data
  }
}

// Storage Service for image uploads
export const storageService = {
  // Upload image to Supabase storage
  async uploadImage(file: File, fileName: string): Promise<string | null> {
    try {
      console.log('Starting image upload:', fileName, 'Size:', file.size, 'Type:', file.type)
      
      // Validate file
      if (!file.type.startsWith('image/')) {
        console.error('Invalid file type:', file.type)
        return null
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        console.error('File too large:', file.size)
        return null
      }

      const { data, error } = await supabase.storage
        .from('listing-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })
      
      if (error) {
        console.error('Error uploading image:', error)
        return null
      }

      console.log('Upload successful, data:', data)
      
      // Get public URL
      const { data: publicData } = supabase.storage
        .from('listing-images')
        .getPublicUrl(data.path)
      
      console.log('Public URL generated:', publicData.publicUrl)
      
      return publicData.publicUrl
    } catch (error) {
      console.error('Exception during image upload:', error)
      return null
    }
  },

  // Delete image from storage
  async deleteImage(filePath: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from('listing-images')
        .remove([filePath])
      
      if (error) {
        console.error('Error deleting image:', error)
        return false
      }
      
      return true
    } catch (error) {
      console.error('Exception during image deletion:', error)
      return false
    }
  },

  // Get public URL for existing image
  getPublicUrl(filePath: string): string {
    const { data } = supabase.storage
      .from('listing-images')
      .getPublicUrl(filePath)
    
    return data.publicUrl
  }
}

// Utility functions
export const dbUtils = {
  // Format price for display
  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  },

  // Format date for display
  formatDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    
    // Convert to different time units
    const diffMinutes = Math.floor(diffTime / (1000 * 60))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffMinutes < 1) {
      return 'Just now'
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`
    } else {
      const months = Math.floor(diffDays / 30)
      return `${months} month${months > 1 ? 's' : ''} ago`
    }
  },

  // Generate unique filename for image uploads
  generateImageFileName(originalFileName: string): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    const extension = originalFileName.split('.').pop()
    return `${timestamp}_${random}.${extension}`
  },

  // Test if image URL is accessible
  async testImageUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok
    } catch (error) {
      console.error('Image URL test failed:', error)
      return false
    }
  },

  // Validate image URL
  isValidImageUrl(url: string | null): boolean {
    if (!url) return false
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }
} 