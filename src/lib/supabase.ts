import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Listing {
  id: string
  title: string
  description: string | null
  price: number
  category: string
  seller_email: string
  image_url: string | null
  location: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  listing_id: string
  buyer_email: string
  seller_email: string
  message: string
  created_at: string
} 