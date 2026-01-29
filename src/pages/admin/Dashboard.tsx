import { useEffect, useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../services/supabaseClient'
import {
    LayoutDashboard, MapPin, Image, Users, BarChart3, LogOut, User,
    KeyRound, ChevronDown, Menu, X, Bell, Search, Settings,
    TrendingUp, TrendingDown, Calendar
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const visitData = [
    { name: "Jan", value: 120 },
    { name: "Feb", value: 210 },
    { name: "Mar", value: 180 },
    { name: "Apr", value: 260 },
    { name: "Mei", value: 300 },
    { name: "Jun", value: 420 }
];

// Sidebar Navigation Items
const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin", active: true },
    { icon: MapPin, label: "Wisata", path: "/admin/destinations" },
    { icon: Image, label: "Galeri", path: "/admin/gallery" },
    { icon: Users, label: "Pengunjung", path: "/admin/visitors" },
    { icon: BarChart3, label: "Laporan", path: "/admin/reports" },
]

export default function DashboardLayout() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const profileMenuRef = useRef<HTMLDivElement>(null)
    const [stats, setStats] = useState([
        { label: "Total Wisata", value: 0, icon: MapPin, trend: 12.5, trendUp: true },
        { label: "Pengunjung", value: 0, icon: Users, trend: 8.2, trendUp: true },
        { label: "Galeri", value: 0, icon: Image, trend: 5.1, trendUp: false },
        { label: "Laporan", value: 0, icon: BarChart3, trend: 15.3, trendUp: true }
    ])
    const [userEmail, setUserEmail] = useState<string>('')

    useEffect(() => {
        checkUser()
        fetchStats()
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

    const fetchStats = async () => {
        const isDemo = localStorage.getItem('demo_mode') === 'true'

        try {
            if (isDemo) {
                setStats([
                    { label: "Total Wisata", value: 12, icon: MapPin, trend: 12.5, trendUp: true },
                    { label: "Pengunjung", value: 1340, icon: Users, trend: 8.2, trendUp: true },
                    { label: "Galeri", value: 320, icon: Image, trend: 5.1, trendUp: false },
                    { label: "Laporan", value: 5, icon: BarChart3, trend: 15.3, trendUp: true }
                ])
                setLoading(false)
                return
            }

            const { count: destCount } = await supabase
                .from('destinations')
                .select('*', { count: 'exact', head: true })

            setStats([
                { label: "Total Wisata", value: destCount || 0, icon: MapPin, trend: 12.5, trendUp: true },
                { label: "Pengunjung", value: 1340, icon: Users, trend: 8.2, trendUp: true },
                { label: "Galeri", value: 320, icon: Image, trend: 5.1, trendUp: false },
                { label: "Laporan", value: 12, icon: BarChart3, trend: 15.3, trendUp: true }
            ])
        } catch (error) {
            console.error('Error fetching stats:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        localStorage.removeItem('demo_mode')
        await supabase.auth.signOut()
        navigate('/admin/login')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-600 font-medium">Memuat dashboard...</p>
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

                        {/* Search (Desktop) */}
                        <div className="hidden md:block relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari..."
                                className="h-10 w-64 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm 
                                         focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        {/* Date */}
                        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>

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
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-medium text-gray-700">{userEmail}</p>
                                    <p className="text-xs text-gray-400">Administrator</p>
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
                    {/* Page Title */}
                    <div className="stagger-item">
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-gray-500 mt-1">Selamat datang! Berikut ringkasan wisata Teluk Saleh</p>
                    </div>

                    {/* ========== STATS CARDS ========== */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((item, index) => (
                            <div
                                key={item.label}
                                className="stagger-item bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 card-hover"
                            >
                                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4">
                                    <item.icon className="w-6 h-6 text-gray-700" />
                                </div>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">{item.label}</p>
                                        <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                            {item.value.toLocaleString()}
                                        </h3>
                                    </div>
                                    <div className={`
                                        flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                                        ${item.trendUp
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-red-50 text-red-600'
                                        }
                                    `}>
                                        {item.trendUp ? (
                                            <TrendingUp className="w-3 h-3" />
                                        ) : (
                                            <TrendingDown className="w-3 h-3" />
                                        )}
                                        {item.trend}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ========== CHARTS SECTION ========== */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* Main Chart */}
                        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">Statistik Kunjungan</h2>
                                    <p className="text-sm text-gray-500 mt-1">Tren pengunjung 6 bulan terakhir</p>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600"></div>
                                    <span className="text-gray-600 font-medium">Pengunjung</span>
                                </div>
                            </div>

                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={visitData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0891b2" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 12 }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 12 }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '12px',
                                                border: 'none',
                                                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
                                                padding: '12px 16px',
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#0891b2"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorValue)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-6">Ringkasan Cepat</h2>

                            <div className="space-y-4">
                                <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Destinasi Terpopuler</p>
                                            <p className="font-semibold text-gray-800">Pantai Labuan Aji</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                            <Users className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Pengunjung Hari Ini</p>
                                            <p className="font-semibold text-gray-800">156 orang</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                                            <Image className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Foto Baru Minggu Ini</p>
                                            <p className="font-semibold text-gray-800">24 foto</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                                            <BarChart3 className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Rating Rata-rata</p>
                                            <p className="font-semibold text-gray-800">4.8 / 5.0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">Aktivitas Terbaru</h2>
                        <div className="space-y-4">
                            {[
                                { action: "Foto baru diunggah", target: "Pantai Labuan Aji", time: "5 menit lalu", color: "cyan" },
                                { action: "Pengunjung baru terdaftar", target: "John Doe", time: "15 menit lalu", color: "green" },
                                { action: "Review baru diterima", target: "Pulau Moyo", time: "1 jam lalu", color: "amber" },
                                { action: "Destinasi diperbarui", target: "Whale Shark Point", time: "2 jam lalu", color: "purple" },
                            ].map((activity, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className={`w-2 h-2 rounded-full bg-${activity.color}-500`}></div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium text-gray-800">{activity.action}</span>
                                            {' - '}{activity.target}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}