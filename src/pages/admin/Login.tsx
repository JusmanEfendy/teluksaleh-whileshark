import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../services/supabaseClient'
import whaleSharkImg from '../../assets/whaleshark.jpg'
import { Eye, EyeOff, Mail, Lock, ChevronLeft } from 'lucide-react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const navigate = useNavigate()

    // Animation state for entrance
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
        checkCurrentUser()
    }, [])

    const checkCurrentUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            checkProfile(user.id)
        }
    }

    const checkProfile = async (userId: string) => {
        try {
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (profileError) return

            if (profile && profile.role === 'admin') {
                handleSuccessfulLogin()
            }
        } catch { }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // Attempt Supabase Login
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) throw error

            if (data.user) {
                // Check profile role
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', data.user.id)
                    .single()

                if (profile && profile.role === 'admin') {
                    handleSuccessfulLogin()
                } else {
                    // Fallback if profile doesn't exist or not admin
                    if (email === 'admin@teluksaleh.com') {
                        handleSuccessfulLogin()
                    } else {
                        throw new Error('Akses ditolak. Bukan akun admin.')
                    }
                }
            }
        } catch (err: any) {
            console.error("Login Error:", err)

            // Helpful error message
            let msg = err.message || 'Terjadi kesalahan saat login.'
            if (err.message === 'Failed to fetch') {
                msg = 'Gagal terhubung ke server. Periksa koneksi internet atau konfigurasi Supabase Anda.'
            } else if (err.message.includes('Invalid login credentials')) {
                msg = 'Email atau password salah.'
            }

            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    const handleSuccessfulLogin = () => {
        setIsTransitioning(true)
        setTimeout(() => {
            navigate('/admin')
        }, 600)
    }

    const handleDemoLogin = () => {
        localStorage.setItem('demo_mode', 'true')
        handleSuccessfulLogin()
    }

    return (
        <div className="relative flex min-h-screen bg-gray-900">
            {/* ===== PAGE TRANSITION OVERLAY ===== */}
            {isTransitioning && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-600 via-blue-700 to-blue-900">
                    {/* Animated circles */}
                    <div className="relative">
                        <div className="absolute inset-0 w-24 h-24 border-4 border-white/20 rounded-full animate-ping"></div>
                        <div className="absolute inset-0 w-24 h-24 border-4 border-cyan-300/40 rounded-full animate-pulse"></div>
                        <div className="w-24 h-24 border-4 border-white rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm">
                            <svg className="w-10 h-10 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h5.5a2.5 2.5 0 0 0 2.2-1.4l.6-1.2h2.4l.6 1.2a2.5 2.5 0 0 0 2.2 1.4H22" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2 17h4.5a2.5 2.5 0 0 0 2.2-1.4l.6-1.2h4.4l.6 1.2a2.5 2.5 0 0 0 2.2 1.4H22" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-6 text-white font-medium text-lg tracking-wide animate-pulse">
                        Memuat Dashboard...
                    </p>

                    {/* Decorative bubbles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute bottom-0 left-[10%] w-4 h-4 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
                        <div className="absolute bottom-0 left-[30%] w-6 h-6 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}></div>
                        <div className="absolute bottom-0 left-[50%] w-3 h-3 bg-white/15 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '1.8s' }}></div>
                        <div className="absolute bottom-0 left-[70%] w-5 h-5 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.2s' }}></div>
                        <div className="absolute bottom-0 left-[85%] w-4 h-4 bg-white/8 rounded-full animate-bounce" style={{ animationDelay: '0.7s', animationDuration: '2.3s' }}></div>
                    </div>
                </div>
            )}

            {/* Left Side - Form */}
            <div className={`
                relative z-10 flex flex-1 flex-col justify-center w-full max-w-md px-6 py-12 mx-auto lg:w-1/2
                transition-all duration-700 ease-out
                ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
                ${isTransitioning ? 'opacity-0 scale-95' : ''}
            `}>
                {/* Back Link */}
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-white"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Kembali ke beranda
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12h5.5a2.5 2.5 0 0 0 2.2-1.4l.6-1.2h2.4l.6 1.2a2.5 2.5 0 0 0 2.2 1.4H22" />
                                <path d="M2 17h4.5a2.5 2.5 0 0 0 2.2-1.4l.6-1.2h4.4l.6 1.2a2.5 2.5 0 0 0 2.2 1.4H22" />
                                <path d="M2 7h6.5a2.5 2.5 0 0 0 2.2-1.4l.6-1.2h1.4l.6 1.2a2.5 2.5 0 0 0 2.2 1.4H22" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-white tracking-wide">Teluk Saleh</span>
                    </div>
                    <h1 className="text-2xl font-semibold text-white mb-2">
                        Masuk ke Portal Admin
                    </h1>
                    <p className="text-gray-400">
                        Masukkan email dan password untuk mengakses dashboard
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-400 text-sm">{error}</p>
                        {error.includes('Gagal terhubung') && (
                            <button
                                onClick={handleDemoLogin}
                                className="mt-3 w-full py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors"
                            >
                                Masuk Mode Demo
                            </button>
                        )}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="w-5 h-5 text-gray-500" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="block w-full h-12 pl-12 pr-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 
                                         focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500
                                         transition-all duration-200 disabled:opacity-50"
                                placeholder="admin@teluksaleh.com"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="w-5 h-5 text-gray-500" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="block w-full h-12 pl-12 pr-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 
                                         focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500
                                         transition-all duration-200 disabled:opacity-50"
                                placeholder="Masukkan password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Keep me logged in & Forgot password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative w-5 h-5">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    className="w-5 h-5 appearance-none cursor-pointer border border-gray-600 rounded checked:border-transparent checked:bg-cyan-500 transition-colors"
                                />
                                {isChecked && (
                                    <svg
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </div>
                            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                Ingat saya
                            </span>
                        </label>
                        <Link
                            to="#"
                            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            Lupa password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 
                                 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/25
                                 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                                 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Memproses...</span>
                            </>
                        ) : (
                            'Masuk'
                        )}
                    </button>
                </form>

                {/* Demo Mode Button */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                    <button
                        onClick={handleDemoLogin}
                        className="w-full py-3 text-sm text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 
                                 border border-gray-700 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Mode Demo (Tanpa Backend)
                    </button>
                </div>
            </div>

            {/* Right Side - Background Image */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <img
                    src={whaleSharkImg}
                    alt="Teluk Saleh Whale Shark"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent"></div>
                <div className="absolute inset-0 bg-blue-900/20"></div>

                {/* Content */}
                <div className={`
                    absolute inset-0 flex flex-col items-center justify-center p-12 text-center
                    transition-all duration-1000 delay-300
                    ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}>
                    <div className="max-w-lg">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Wisata Teluk Saleh
                        </h2>
                        <p className="text-lg text-white/70 leading-relaxed">
                            Portal informasi destinasi wisata dan konservasi hiu paus di Teluk Saleh, Nusa Tenggara Barat
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}