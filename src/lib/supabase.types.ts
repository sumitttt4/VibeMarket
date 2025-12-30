/**
 * Supabase Database Types
 * 
 * This file contains TypeScript type definitions for your Supabase database tables.
 * Update these types to match your actual database schema.
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
            projects: {
                Row: {
                    id: string
                    name: string
                    tagline: string
                    description: string | null
                    thumbnail: string | null
                    tool: string
                    countries: string[]
                    use_case: string | null
                    categories: string[]
                    tech_stack: string[]
                    demo_url: string | null
                    github_url: string | null
                    creator_name: string | null
                    creator_avatar: string | null
                    creator_twitter: string | null
                    creator_github: string | null
                    upvotes: number
                    is_verified: boolean
                    verified_at: string | null
                    submitted_at: string
                    listed_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    tagline: string
                    description?: string | null
                    thumbnail?: string | null
                    tool: string
                    countries?: string[]
                    use_case?: string | null
                    categories?: string[]
                    tech_stack?: string[]
                    demo_url?: string | null
                    github_url?: string | null
                    creator_name?: string | null
                    creator_avatar?: string | null
                    creator_twitter?: string | null
                    creator_github?: string | null
                    upvotes?: number
                    is_verified?: boolean
                    verified_at?: string | null
                    submitted_at?: string
                    listed_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    tagline?: string
                    description?: string | null
                    thumbnail?: string | null
                    tool?: string
                    countries?: string[]
                    use_case?: string | null
                    categories?: string[]
                    tech_stack?: string[]
                    demo_url?: string | null
                    github_url?: string | null
                    creator_name?: string | null
                    creator_avatar?: string | null
                    creator_twitter?: string | null
                    creator_github?: string | null
                    upvotes?: number
                    is_verified?: boolean
                    verified_at?: string | null
                    submitted_at?: string
                    listed_at?: string | null
                    created_at?: string
                    updated_at?: string
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
