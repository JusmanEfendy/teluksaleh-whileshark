interface NavbarProps {
    scrolled: boolean;
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (value: boolean) => void;
}

const MENU_ITEMS = ['About', 'Destinations', 'Whale Sharks', 'Gallery'];

export default function Navbar({
    scrolled,
    darkMode,
    setDarkMode,
    mobileMenuOpen,
    setMobileMenuOpen
}: NavbarProps) {

    /* ================== CLASS HELPERS ================== */

    // ✅ GLASSMORPHISM YANG BENAR (BLUR + TINT)
    const navClass = `
    fixed top-0 left-0 right-0 z-50
    transition-all duration-300
    backdrop-blur-md
    ${scrolled
            ? 'bg-white/40 dark:bg-slate-900/60'
            : 'bg-transparent'}
  `;

    const logoTextClass = `
    text-xl font-bold tracking-tight transition-colors
    ${scrolled
            ? darkMode ? 'text-white' : 'text-slate-900'
            : darkMode ? 'text-white' : 'text-slate-900'}
  `;

    const linkClass = `
    text-sm font-semibold transition-colors
    ${scrolled
            ? darkMode
                ? 'text-slate-200 hover:text-white'
                : 'text-slate-700 hover:text-slate-900'
            : darkMode
                ? 'text-slate-200 hover:text-white'
                : 'text-slate-700 hover:text-indigo-600'}
  `;

    // ✅ DARK MODE CLEAN (TIDAK DOMINAN)
    const darkModeButtonClass = `
    p-2 rounded-full
    transition-all duration-300
    hover:bg-black/10 dark:hover:bg-white/10
    active:scale-95
  `;

    // ✅ GROUP ACTION (BIAR TIDAK NYASAR)
    const actionGroupClass = `
    flex items-center space-x-3
    px-3 py-1.5 rounded-full
    backdrop-blur-md
    ${scrolled
            ? 'bg-white/60 dark:bg-slate-800/60'
            : 'bg-white/30'}
  `;

    const loginButtonClass = `
    px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 shadow-md shadow-cyan-500/20
    bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-0.5
  `;

    /* ================== JSX ================== */

    return (
        <nav className={navClass}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className={logoTextClass}>Teluk Saleh</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        {MENU_ITEMS.map(item => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                className={linkClass}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center">
                        <div className={actionGroupClass}>

                            {/* Dark mode */}
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={darkModeButtonClass}
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? '🌙' : '☀️'}
                            </button>

                            {/* Login */}
                            <a href="/admin/login" className={loginButtonClass}>
                                Login
                            </a>
                        </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex md:hidden items-center space-x-3">

                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={darkModeButtonClass}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '🌙' : '☀️'}
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-white hover:bg-slate-800' : 'text-slate-900 hover:bg-black/5'
                                }`}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>

                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className={`md:hidden mt-4 p-6 rounded-2xl backdrop-blur-md shadow-xl ${darkMode ? 'bg-slate-900/70' : 'bg-white/80'
                        }`}>
                        {MENU_ITEMS.map(item => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block py-2 text-base font-medium transition-colors ${darkMode
                                    ? 'text-slate-200 hover:text-white'
                                    : 'text-slate-800 hover:text-black'
                                    }`}
                            >
                                {item}
                            </a>
                        ))}

                        <a
                            href="/admin/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full text-center"
                        >
                            Login
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
}
