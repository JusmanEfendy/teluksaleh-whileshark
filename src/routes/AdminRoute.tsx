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
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">⏳ Loading...</div>
            </div>
        )
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" />
    }

    return <>{children}</>
}
