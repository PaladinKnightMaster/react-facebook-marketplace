import { 
  ApiResponse, 
  CreateListingRequest, 
  CreateMessageRequest 
} from './api-types'
import { Listing, Message } from './supabase'

// Base API client with error handling
class ApiClient {
  private baseUrl: string

  constructor() {
    // Handle server-side rendering
    this.baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}/api${endpoint}`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        console.error(`API Error ${response.status}:`, data)
        return {
          success: false,
          error: data.error || 'Request failed',
          message: data.message
        }
      }

      return data
    } catch (error) {
      console.error('Network error:', error)
      return {
        success: false,
        error: 'Network error',
        message: 'Failed to connect to server'
      }
    }
  }

  private async uploadRequest(
    endpoint: string, 
    formData: FormData
  ): Promise<ApiResponse<{ url: string }>> {
    try {
      const url = `${this.baseUrl}/api${endpoint}`
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        console.error(`Upload Error ${response.status}:`, data)
        return {
          success: false,
          error: data.error || 'Upload failed',
          message: data.message
        }
      }

      return data
    } catch (error) {
      console.error('Upload network error:', error)
      return {
        success: false,
        error: 'Network error',
        message: 'Failed to upload file'
      }
    }
  }

  // Listings API
  async getListings(params?: {
    category?: string
    search?: string
  }): Promise<Listing[]> {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.set('category', params.category)
    if (params?.search) searchParams.set('search', params.search)
    
    const query = searchParams.toString()
    const endpoint = `/listings${query ? `?${query}` : ''}`
    
    const response = await this.request<Listing[]>(endpoint)
    
    if (response.success) {
      return response.data || []
    } else {
      console.error('Failed to fetch listings:', response.error)
      return []
    }
  }

  async getListing(id: string): Promise<Listing | null> {
    const response = await this.request<Listing>(`/listings/${id}`)
    
    if (response.success) {
      return response.data || null
    } else {
      console.error('Failed to fetch listing:', response.error)
      return null
    }
  }

  async createListing(data: CreateListingRequest): Promise<Listing | null> {
    const response = await this.request<Listing>('/listings', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    
    if (response.success) {
      return response.data || null
    } else {
      console.error('Failed to create listing:', response.error)
      throw new Error(response.error || 'Failed to create listing')
    }
  }

  async updateListing(id: string, data: Partial<Listing>): Promise<Listing | null> {
    const response = await this.request<Listing>(`/listings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    
    if (response.success) {
      return response.data || null
    } else {
      console.error('Failed to update listing:', response.error)
      throw new Error(response.error || 'Failed to update listing')
    }
  }

  async deleteListing(id: string): Promise<boolean> {
    const response = await this.request(`/listings/${id}`, {
      method: 'DELETE',
    })
    
    if (response.success) {
      return true
    } else {
      console.error('Failed to delete listing:', response.error)
      throw new Error(response.error || 'Failed to delete listing')
    }
  }

  // Messages API
  async getMessages(listingId: string): Promise<Message[]> {
    const response = await this.request<Message[]>(`/messages?listing_id=${listingId}`)
    
    if (response.success) {
      return response.data || []
    } else {
      console.error('Failed to fetch messages:', response.error)
      return []
    }
  }

  async sendMessage(data: CreateMessageRequest): Promise<Message | null> {
    const response = await this.request<Message>('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    
    if (response.success) {
      return response.data || null
    } else {
      console.error('Failed to send message:', response.error)
      throw new Error(response.error || 'Failed to send message')
    }
  }

  // Upload API
  async uploadImage(file: File): Promise<string | null> {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await this.uploadRequest('/upload', formData)
    
    if (response.success) {
      return response.data?.url || null
    } else {
      console.error('Failed to upload image:', response.error)
      throw new Error(response.error || 'Failed to upload image')
    }
  }

  // Utility methods
  async searchListings(query: string): Promise<Listing[]> {
    return this.getListings({ search: query })
  }

  async getListingsByCategory(category: string): Promise<Listing[]> {
    return this.getListings({ category })
  }
}

// Create singleton instance
export const apiClient = new ApiClient()

// Export individual methods for easier use (bound to maintain 'this' context)
export const getListings = apiClient.getListings.bind(apiClient)
export const getListing = apiClient.getListing.bind(apiClient)
export const createListing = apiClient.createListing.bind(apiClient)
export const updateListing = apiClient.updateListing.bind(apiClient)
export const deleteListing = apiClient.deleteListing.bind(apiClient)
export const getMessages = apiClient.getMessages.bind(apiClient)
export const sendMessage = apiClient.sendMessage.bind(apiClient)
export const uploadImage = apiClient.uploadImage.bind(apiClient)
export const searchListings = apiClient.searchListings.bind(apiClient)
export const getListingsByCategory = apiClient.getListingsByCategory.bind(apiClient)

// Export the class for advanced usage
export { ApiClient } 