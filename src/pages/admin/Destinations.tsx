import { useEffect, useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../services/supabaseClient'
import { destinationService } from '../../services/destinationService'
import type { Destination } from '../../types/database'
import {
    LayoutDashboard, MapPin, Image, Users, BarChart3, LogOut, User,
    KeyRound, ChevronDown, Menu, X, Bell, Search, Settings,
    Plus, Edit2, Trash2, Eye, Filter, ChevronLeft
} from "lucide-react"

// Sidebar Navigation Items
const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin", active: false },
    { icon: MapPin, label: "Wisata", path: "/admin/destinations", active: true },
    { icon: Image, label: "Galeri", path: "/admin/gallery" },
    { icon: Users, label: "Pengunjung", path: "/admin/visitors" },
    { icon: BarChart3, label: "Laporan", path: "/admin/reports" },
]

// Category labels
const categoryLabels: Record<string, string> = {
    'pulau': 'Pulau',
    'laut': 'Laut',
    'hiu_paus': 'Hiu Paus'
}

// Category colors
const categoryColors: Record<string, string> = {
    'pulau': 'bg-green-100 text-green-700',
    'laut': 'bg-blue-100 text-blue-700',
    'hiu_paus': 'bg-cyan-100 text-cyan-700'
}

export default function Destinations() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [destinations, setDestinations] = useState<Destination[]>([])
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [userEmail, setUserEmail] = useState<string>('')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const profileMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        checkUser()
        fetchDestinations()
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setShowProfileMenu(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const checkUser = async () => {
        const isDemo = localStorage.getItem('demo_mode') === 'true'
        if (isDemo) {
            setUserEmail('Demo Admin')
            return
        }

        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            navigate('/admin/login')
        } else {
            setUserEmail(session.user.email || 'Admin')
        }
    }

    const fetchDestinations = async () => {
        try {
            const data = await destinationService.getAll()
            setDestinations(data)
        } catch (error) {
            console.error('Error fetching destinations:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await destinationService.delete(id)
            setDestinations(destinations.filter(d => d.id !== id))
            setDeleteConfirm(null)
        } catch (error) {
            console.error('Error deleting destination:', error)
        }
    }

    const handleLogout = async () => {
        localStorage.removeItem('demo_mode')
        await supabase.auth.signOut()
        navigate('/admin/login')
    }

    // Filter destinations
    const filteredDestinations = destinations.filter(d => {
        const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-600 font-medium">Memuat data wisata...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ========== SIDEBAR ========== */}
            <aside className={`
                fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
                ${sidebarOpen ? 'w-64' : 'w-20'}
                ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                    <Link to="/admin" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        {sidebarOpen && (
                            <span className="font-bold text-gray-800 text-lg whitespace-nowrap">Teluk Saleh</span>
                        )}
                    </Link>
                    <button
                        onClick={() => setMobileSidebarOpen(false)}
                        className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    <p className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 ${!sidebarOpen && 'text-center'}`}>
                        {sidebarOpen ? 'Menu' : '•••'}
                    </p>
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`
                                flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200
                                ${item.active
                                    ? 'bg-cyan-50 text-cyan-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }
                                ${!sidebarOpen && 'justify-center'}
                            `}
                        >
                            <div className={`
                                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                                ${item.active
                                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25'
                                    : 'bg-gray-100'
                                }
                            `}>
                                <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-gray-500'}`} />
                            </div>
                            {sidebarOpen && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Mobile Sidebar Backdrop */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* ========== MAIN CONTENT ========== */}
            <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                {/* ========== HEADER ========== */}
                <header className="sticky top-0 z-20 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
                    {/* Left Side */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileSidebarOpen(true)}
                            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Sidebar Toggle (Desktop) */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="hidden lg:flex items-center justify-center p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                            title={sidebarOpen ? 'Sembunyikan Sidebar' : 'Tampilkan Sidebar'}
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Breadcrumb */}
                        <div className="hidden md:flex items-center gap-2 text-sm">
                            <Link to="/admin" className="text-gray-400 hover:text-gray-600">Dashboard</Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-700 font-medium">Wisata</span>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        {/* Notification */}
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User Menu */}
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                    <span className="text-sm font-bold text-white">
                                        {userEmail ? userEmail.charAt(0).toUpperCase() : 'A'}
                                    </span>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {showProfileMenu && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-50">
                                    <div className="px-3 py-2 border-b border-gray-50 mb-2">
                                        <p className="text-xs font-semibold text-gray-400 uppercase">Akun Saya</p>
                                    </div>
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                                        <User className="w-4 h-4" />
                                        <span>Profile</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                                        <Settings className="w-4 h-4" />
                                        <span>Pengaturan</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                                        <KeyRound className="w-4 h-4" />
                                        <span>Ubah Password</span>
                                    </button>
                                    <div className="border-t border-gray-50 my-2"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Keluar</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* ========== PAGE CONTENT ========== */}
                <main className="p-4 lg:p-6 space-y-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Destinasi Wisata</h1>
                            <p className="text-gray-500 mt-1">Kelola semua destinasi wisata Teluk Saleh</p>
                        </div>
                        <button className="btn-ripple inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                            <Plus className="w-5 h-5" />
                            <span>Tambah Wisata</span>
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari destinasi..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm 
                                             focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="flex items-center gap-2">
                                <Filter className="w-5 h-5 text-gray-400" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm 
                                             focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                                >
                                    <option value="all">Semua Kategori</option>
                                    <option value="pulau">Pulau</option>
                                    <option value="laut">Laut</option>
                                    <option value="hiu_paus">Hiu Paus</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <p className="text-sm text-gray-500">Total Wisata</p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{destinations.length}</p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <p className="text-sm text-gray-500">Pulau</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">
                                {destinations.filter(d => d.category === 'pulau').length}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <p className="text-sm text-gray-500">Laut</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">
                                {destinations.filter(d => d.category === 'laut').length}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <p className="text-sm text-gray-500">Hiu Paus</p>
                            <p className="text-2xl font-bold text-cyan-600 mt-1">
                                {destinations.filter(d => d.category === 'hiu_paus').length}
                            </p>
                        </div>
                    </div>

                    {/* Destinations Grid */}
                    {filteredDestinations.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-700">Tidak ada destinasi</h3>
                            <p className="text-gray-500 mt-1">
                                {searchQuery || selectedCategory !== 'all'
                                    ? 'Tidak ada hasil yang cocok dengan filter Anda.'
                                    : 'Belum ada destinasi wisata yang ditambahkan.'
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredDestinations.map((destination, index) => (
                                <div
                                    key={destination.id}
                                    className="stagger-item bg-white rounded-2xl border border-gray-200 overflow-hidden card-hover group"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                        {destination.image ? (
                                            <img
                                                src={destination.image}
                                                alt={destination.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    // Hide broken image and show placeholder
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                    const placeholder = (e.target as HTMLImageElement).nextElementSibling;
                                                    if (placeholder) (placeholder as HTMLElement).style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        {/* Placeholder - shows when no image or image fails */}
                                        <div
                                            className={`absolute inset-0 flex flex-col items-center justify-center ${destination.image ? 'hidden' : 'flex'}`}
                                        >
                                            <MapPin className="w-12 h-12 text-gray-300" />
                                            <span className="text-xs text-gray-400 mt-2">No Image</span>
                                        </div>
                                        <div className="absolute top-3 left-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[destination.category]}`}>
                                                {categoryLabels[destination.category]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="font-semibold text-gray-800 text-lg mb-2">{destination.name}</h3>
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{destination.description}</p>

                                        {/* Coordinates */}
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{Number(destination.latitude).toFixed(4)}, {Number(destination.longitude).toFixed(4)}</span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                            <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                                <Eye className="w-4 h-4" />
                                                <span>Lihat</span>
                                            </button>
                                            <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(destination.id)}
                                                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span>Hapus</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">Hapus Destinasi?</h3>
                        <p className="text-gray-500 text-sm text-center mb-6">
                            Destinasi yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin menghapus?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
