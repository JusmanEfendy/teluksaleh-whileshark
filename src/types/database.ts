// Database table types for Supabase

export interface Destination {
    id: number
    name: string
    description: string
    image: string
    latitude: number
    longitude: number
}

export interface Article {
    id: number
    title: string
    content: string
    created_at: string
}

export interface WhaleSharkSpot {
    id: number
    name: string
    lat: number
    lng: number
    season: string
}

// Insert types (without id, as it's auto-generated)
export type DestinationInsert = Omit<Destination, 'id'>
export type ArticleInsert = Omit<Article, 'id' | 'created_at'>
export type WhaleSharkSpotInsert = Omit<WhaleSharkSpot, 'id'>

// Update types (all fields optional)
export type DestinationUpdate = Partial<DestinationInsert>
export type ArticleUpdate = Partial<ArticleInsert>
export type WhaleSharkSpotUpdate = Partial<WhaleSharkSpotInsert>
