import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Profile {
  id: string
  user_id: string
  display_name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface ChatConversation {
  id: string
  user_id: string
  title: string
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface MoodEntry {
  id: string
  user_id: string
  mood_value: number
  mood_label: string
  mood_emoji: string
  note?: string
  created_at: string
}

export interface WellnessPoint {
  id: string
  user_id: string
  points: number
  source: string
  description: string
  created_at: string
}