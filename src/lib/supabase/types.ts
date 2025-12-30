/**
 * Supabase Database Types for Vibes Table
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            vibes: {
                Row: {
                    id: string
                    title: string
                    description: string
                    live_url: string
                    tags: string[]
                    votes: number
                    tool: string
                    country: string | null
                    creator_name: string | null
                    creator_avatar: string | null
                    is_verified: boolean
                    plan: 'free' | 'paid'
                    status: 'pending' | 'approved' | 'rejected'
                    created_at: string
                    updated_at: string
                    logo_url: string | null
                    key_features: string[] | null
                    user_id: string | null
                }
                Insert: {
                    id?: string
                    title: string
                    description: string
                    live_url: string
                    tags?: string[]
                    votes?: number
                    tool: string
                    country?: string | null
                    creator_name?: string | null
                    creator_avatar?: string | null
                    is_verified?: boolean
                    plan?: 'free' | 'paid'
                    status?: 'pending' | 'approved' | 'rejected'
                    created_at?: string
                    updated_at?: string
                    logo_url?: string | null
                    key_features?: string[] | null
                    user_id?: string | null
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string
                    live_url?: string
                    tags?: string[]
                    votes?: number
                    tool?: string
                    country?: string | null
                    creator_name?: string | null
                    creator_avatar?: string | null
                    is_verified?: boolean
                    plan?: 'free' | 'paid'
                    status?: 'pending' | 'approved' | 'rejected'
                    created_at?: string
                    updated_at?: string
                    logo_url?: string | null
                    key_features?: string[] | null
                    user_id?: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

// Type helpers
export type Vibe = Database['public']['Tables']['vibes']['Row'];
export type VibeInsert = Database['public']['Tables']['vibes']['Insert'];
export type VibeUpdate = Database['public']['Tables']['vibes']['Update'];
