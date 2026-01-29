import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        checkAdmin()
    }, [])

    const checkAdmin = async () => {
        // Check for Demo Mode
        const isDemo = localStorage.getItem('demo_mode') === 'true'
        if (isDemo) {
            setIsAdmin(true)
            setLoading(false)
            return
        }

        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                setLoading(false)
                return
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)

            // Check if profile exists and has admin role
            if (profile && profile.length > 0 && profile[0].role === 'admin') {
                setIsAdmin(true)
            }

            setLoading(false)
        } catch (error) {
            console.error('Auth check error:', error)
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" />
    }

    return <>{children}</>
}
