import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabaseClient'
import whaleSharkImg from '../../assets/whaleshark.jpg'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
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
                navigate('/admin')
            }
        } catch { }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) throw error

            if (data.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', data.user.id)

                if (profile && profile[0] && profile[0].role === 'admin') {
                    navigate('/admin')
                } else {
                    throw new Error('Akses ditolak. Bukan akun admin.')
                }
            }
        } catch (err: any) {
            setError(err.message || 'Terjadi kesalahan saat login.')
            if (err.message && err.message.includes('Akses ditolak')) {
                await supabase.auth.signOut()
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center font-sans">
            {/* Full Screen Transition Overlay */}
            {loading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-900/90 backdrop-blur-md transition-all duration-500 animate-in fade-in">
                    {/* Animated Whale Shark Icon Container */}
                    <div className="relative w-32 h-32 mb-8">
                        {/* Pulse Ring */}
                        <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping"></div>
                        <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-pulse"></div>

                        {/* Central Logo Circle */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-cyan-600 to-blue-800 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.4)] overflow-hidden border border-white/20">
                            {/* Wave Effect filling the circle */}
                            <div className="absolute bottom-0 left-0 w-[200%] h-[200%] bg-cyan-400/30 rounded-[40%] animate-wave" style={{
                                transformOrigin: '50% 50%',
                                marginLeft: '-50%',
                                marginBottom: '-50%'
                            }}></div>

                            {/* Whale Shark Icon */}
                            <svg className="w-16 h-16 text-white relative z-10 drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                                {/* Simple stylized whale/fish representation or just diving mask/bubbles */}
                            </svg>
                        </div>
                    </div>

                    {/* Text */}
                    <h3 className="text-2xl font-bold text-white tracking-widest uppercase animate-pulse mb-2">
                        Diving In...
                    </h3>
                    <p className="text-cyan-200/60 text-sm font-light tracking-wide">
                        Preparing your dashboard
                    </p>

                    {/* Rising Bubbles Effect */}
                    <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                        <div className="absolute bottom-[-10px] left-[10%] w-4 h-4 bg-white/10 rounded-full animate-bubble decoration-slice" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
                        <div className="absolute bottom-[-10px] left-[20%] w-6 h-6 bg-white/5 rounded-full animate-bubble" style={{ animationDelay: '1s', animationDuration: '6s' }}></div>
                        <div className="absolute bottom-[-10px] left-[50%] w-3 h-3 bg-white/20 rounded-full animate-bubble" style={{ animationDelay: '2s', animationDuration: '3s' }}></div>
                        <div className="absolute bottom-[-10px] left-[80%] w-5 h-5 bg-white/10 rounded-full animate-bubble" style={{ animationDelay: '0.5s', animationDuration: '5s' }}></div>
                    </div>
                </div>
            )}

            {/* Background Image Matching Description: Underwater, Whale Shark, Sun Rays */}
            <div className="absolute inset-0 z-0">
                <img
                    src={whaleSharkImg}
                    alt="Deep Ocean Whale Shark"
                    className="w-full h-full object-cover animate-pulse-slow scale-105"
                    style={{ animationDuration: '30s', animationDirection: 'alternate' }}
                />
                {/* Deep Blue Overlay */}
                <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
            </div>

            {/* Glassmorphism Card Container */}
            <div className={`
                relative z-10 w-full max-w-[480px] mx-4
                transition-all duration-1000 ease-out transform
                ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}>
                <div className="relative backdrop-blur-md bg-white/10 border border-white/30 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">

                    {/* Decorative Top Glow */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-cyan-400/30 rounded-full blur-3xl"></div>

                    {/* Logo & Header */}
                    <div className="flex flex-col items-center mb-8 text-center">
                        <div className="mb-3">
                            {/* Stylized Whale/Wave Icon */}
                            <svg className="w-12 h-12 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12h5.5a2.5 2.5 0 0 0 2.2-1.4l.6-1.2h2.4l.6 1.2a2.5 2.5 0 0 0 2.2 1.4H22"></path>
                                <path d="M2 17h4.5a2.5 2.5 0 0 0 2.2-1.4l.6-1.2h4.4l.6 1.2a2.5 2.5 0 0 0 2.2 1.4H22"></path>
                                <path d="M2 7h6.5a2.5 2.5 0 0 0 2.2-1.4l.6-1.2h1.4l.6 1.2a2.5 2.5 0 0 0 2.2 1.4H22"></path>
                            </svg>
                        </div>
                        <h2 className="text-white text-lg font-bold tracking-widest uppercase text-shadow-sm">TELUK SALEH <span className="font-light">INFO</span></h2>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-bold text-white drop-shadow-md">Portal Informasi Login</h1>
                    </div>

                    {error && (
                        <div className="mb-6 px-4 py-2 bg-red-500/30 border border-red-400/50 rounded-lg text-white text-sm text-center backdrop-blur-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Field */}
                        <div className="group relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-white/70 group-focus-within:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="block w-full pl-12 pr-4 py-3.5 bg-transparent border border-white/40 rounded-xl text-white placeholder-white/60 
                                         focus:outline-none focus:border-white focus:bg-white/5 focus:ring-1 focus:ring-white/20
                                         transition-all duration-300"
                                placeholder="Email Address"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="group relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-white/70 group-focus-within:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="block w-full pl-12 pr-4 py-3.5 bg-transparent border border-white/40 rounded-xl text-white placeholder-white/60 
                                         focus:outline-none focus:border-white focus:bg-white/5 focus:ring-1 focus:ring-white/20
                                         transition-all duration-300"
                                placeholder="Password"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 py-3.5 relative overflow-hidden group rounded-xl shadow-lg border-0 transition-transform active:scale-95"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-500 transition-all duration-300 group-hover:from-cyan-300 group-hover:to-teal-400"></div>
                            {/* Subtle Wave Pattern CSS Overlay */}
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

                            <span className="relative z-10 text-white font-bold tracking-wider uppercase flex items-center justify-center gap-2">
                                {loading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        {/* Sea Bubble Animation */}
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-white rounded-full animate-[bounce_1s_infinite_0ms] shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                                            <div className="w-2 h-2 bg-white rounded-full animate-[bounce_1s_infinite_200ms] shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                                            <div className="w-2 h-2 bg-white rounded-full animate-[bounce_1s_infinite_400ms] shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                                        </div>
                                        <span className="tracking-widest font-semibold text-sm animate-pulse">DIVING IN...</span>
                                    </div>
                                ) : 'LOGIN'}
                            </span>
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 flex justify-between items-center text-sm font-medium">
                        <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 hover:underline">
                            Forgot Password?
                        </a>
                        <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 hover:underline">
                            Register Account
                        </a>
                    </div>
                </div>
            </div>

            {/* Global Styles for Animations/Shadows */}
            <style>{`
                .text-shadow-sm {
                   text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                }
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1.05); }
                    50% { transform: scale(1.10); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 25s ease-in-out infinite alternate;
                }
                @keyframes wave {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .animate-wave {
                    animation: wave 4s linear infinite;
                }
                @keyframes bubble {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(-100vh); opacity: 0; }
                }
                .animate-bubble {
                    animation: bubble linear infinite;
                }
            `}</style>
        </div>
    )
}