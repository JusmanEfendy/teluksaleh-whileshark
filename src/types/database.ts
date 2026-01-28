// Database table types for Supabase

export interface Destination {
    id: string  // uuid
    name: string
    description: string
    image: string
    latitude: number
    longitude: number
    category: 'pulau' | 'laut' | 'hiu_paus'
    created_at: string
}

export interface Article {
    id: number
    title: string
    content: string
    thumbnail: string
    created_at: string
}

export interface WhaleSharkSpot {
    id: number
    name: string
    latitude: number
    longitude: number
    season: string
    note: string | null
}

// Insert types (without id and auto-generated fields)
export type DestinationInsert = Omit<Destination, 'id' | 'created_at'>
export type ArticleInsert = Omit<Article, 'id' | 'created_at'>
export type WhaleSharkSpotInsert = Omit<WhaleSharkSpot, 'id'>

// Update types (all fields optional)
export type DestinationUpdate = Partial<DestinationInsert>
export type ArticleUpdate = Partial<ArticleInsert>
export type WhaleSharkSpotUpdate = Partial<WhaleSharkSpotInsert>
