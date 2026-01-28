import { supabase } from './supabaseClient'
import type { Destination, DestinationInsert, DestinationUpdate } from '../types/database'

const TABLE_NAME = 'destinations'

export const destinationService = {
    // Get all destinations
    async getAll(): Promise<Destination[]> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .order('id', { ascending: true })

        if (error) throw error
        return data || []
    },

    // Get single destination by ID
    async getById(id: number): Promise<Destination | null> {
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
    async update(id: number, updates: DestinationUpdate): Promise<Destination> {
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
    async delete(id: number): Promise<void> {
        const { error } = await supabase
            .from(TABLE_NAME)
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
