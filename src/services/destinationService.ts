import { supabase } from './supabaseClient'
import type { Destination, DestinationInsert, DestinationUpdate } from '../types/database'

const TABLE_NAME = 'destinations'

export const destinationService = {
    // Get all destinations
    async getAll(): Promise<Destination[]> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    },

    // Get destinations by category
    async getByCategory(category: Destination['category']): Promise<Destination[]> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('category', category)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    },

    // Get single destination by ID (uuid)
    async getById(id: string): Promise<Destination | null> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    // Create new destination
    async create(destination: DestinationInsert): Promise<Destination> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert(destination)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Update destination
    async update(id: string, updates: DestinationUpdate): Promise<Destination> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Delete destination
    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from(TABLE_NAME)
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
