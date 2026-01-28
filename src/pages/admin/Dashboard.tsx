import { useEffect, useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useNavigate } from 'react-router-dom'
import type { Destination } from '../../types/database'

export default function Dashboard() {
    const [destinations, setDestinations] = useState<Destination[]>([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        // Load destinations
        const { data } = await supabase.from('destinations').select('*')
        setDestinations(data || [])
        setLoading(false)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/admin/login')
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Yakin ingin menghapus?')) return

        await supabase.from('destinations').delete().eq('id', id)
        setDestinations(prev => prev.filter(d => d.id !== id))
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {/* Header */}
            <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">🏝️ Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-slate-400 text-sm">{user?.email}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-800 rounded-xl p-6">
                        <h3 className="text-slate-400 text-sm">Total Destinations</h3>
                        <p className="text-3xl font-bold text-blue-400">{destinations.length}</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-6">
                        <h3 className="text-slate-400 text-sm">Articles</h3>
                        <p className="text-3xl font-bold text-green-400">-</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-6">
                        <h3 className="text-slate-400 text-sm">Whale Shark Spots</h3>
                        <p className="text-3xl font-bold text-purple-400">-</p>
                    </div>
                </div>

                {/* Destinations Table */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">📍 Destinations</h2>
                        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm">
                            + Tambah Destinasi
                        </button>
                    </div>

                    {destinations.length === 0 ? (
                        <p className="text-slate-400 text-center py-8">Belum ada data destinasi</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                                        <th className="pb-3">Nama</th>
                                        <th className="pb-3">Kategori</th>
                                        <th className="pb-3">Koordinat</th>
                                        <th className="pb-3 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {destinations.map(dest => (
                                        <tr key={dest.id} className="border-b border-slate-700/50">
                                            <td className="py-3">{dest.name}</td>
                                            <td className="py-3">
                                                <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs">
                                                    {dest.category}
                                                </span>
                                            </td>
                                            <td className="py-3 text-slate-400 text-sm">
                                                {dest.latitude}, {dest.longitude}
                                            </td>
                                            <td className="py-3 text-right space-x-2">
                                                <button className="text-blue-400 hover:text-blue-300 text-sm">
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(dest.id)}
                                                    className="text-red-400 hover:text-red-300 text-sm"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
