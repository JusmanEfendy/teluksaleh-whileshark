import { supabase } from './supabaseClient'
import type { Article, ArticleInsert, ArticleUpdate } from '../types/database'

const TABLE_NAME = 'articles'

export const articleService = {
    // Get all articles
    async getAll(): Promise<Article[]> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    },

    // Get single article by ID
    async getById(id: number): Promise<Article | null> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    // Create new article
    async create(article: ArticleInsert): Promise<Article> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert(article)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Update article
    async update(id: number, updates: ArticleUpdate): Promise<Article> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Delete article
    async delete(id: number): Promise<void> {
        const { error } = await supabase
            .from(TABLE_NAME)
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
