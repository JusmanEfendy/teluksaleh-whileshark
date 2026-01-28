import { supabase } from './supabaseClient'
import type { WhaleSharkSpot, WhaleSharkSpotInsert, WhaleSharkSpotUpdate } from '../types/database'

const TABLE_NAME = 'whale_shark_spots'

export const whaleSharkSpotService = {
    // Get all whale shark spots
    async getAll(): Promise<WhaleSharkSpot[]> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .order('id', { ascending: true })

        if (error) throw error
        return data || []
    },

    // Get spots by season
    async getBySeason(season: string): Promise<WhaleSharkSpot[]> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('season', season)

        if (error) throw error
        return data || []
    },

    // Get single spot by ID
    async getById(id: number): Promise<WhaleSharkSpot | null> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    // Create new spot
    async create(spot: WhaleSharkSpotInsert): Promise<WhaleSharkSpot> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert(spot)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Update spot
    async update(id: number, updates: WhaleSharkSpotUpdate): Promise<WhaleSharkSpot> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Delete spot
    async delete(id: number): Promise<void> {
        const { error } = await supabase
            .from(TABLE_NAME)
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
