

interface NavbarProps {
    scrolled: boolean;
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (value: boolean) => void;
}

export default function Navbar({
    scrolled,
    darkMode,
    setDarkMode,
    mobileMenuOpen,
    setMobileMenuOpen
}: NavbarProps) {
    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? darkMode
                ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-cyan-500/10'
                : 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                            </svg>
                        </div>
                        <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled
                            ? darkMode ? 'text-white' : 'text-slate-900'
                            : 'text-white'
                            }`}>
                            Teluk Saleh
                        </span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a
                            href="#about"
                            className={`text-sm font-medium transition-colors ${scrolled
                                    ? darkMode
                                        ? 'text-slate-300 hover:text-cyan-400'
                                        : 'text-slate-700 hover:text-cyan-600'
                                    : 'text-white hover:text-cyan-300'
                                }`}
                        >
                            About
                        </a>
                        <a
                            href="#destinations"
                            className={`text-sm font-medium transition-colors ${scrolled
                                    ? darkMode
                                        ? 'text-slate-300 hover:text-cyan-400'
                                        : 'text-slate-700 hover:text-cyan-600'
                                    : 'text-white hover:text-cyan-300'
                                }`}
                        >
                            Destinations
                        </a>
                        <a
                            href="#whale-sharks"
                            className={`text-sm font-medium transition-colors ${scrolled
                                    ? darkMode
                                        ? 'text-slate-300 hover:text-cyan-400'
                                        : 'text-slate-700 hover:text-cyan-600'
                                    : 'text-white hover:text-cyan-300'
                                }`}
                        >
                            Whale Sharks
                        </a>
                        <a
                            href="#gallery"
                            className={`text-sm font-medium transition-colors ${scrolled
                                    ? darkMode
                                        ? 'text-slate-300 hover:text-cyan-400'
                                        : 'text-slate-700 hover:text-cyan-600'
                                    : 'text-white hover:text-cyan-300'
                                }`}
                        >
                            Gallery
                        </a>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-2 rounded-full transition-all duration-300 ${scrolled
                                ? darkMode
                                    ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                : 'bg-white/20 text-white hover:bg-white/30'
                                }`}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>

                        <a href="/admin/login" className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Login
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center space-x-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-2 rounded-full transition-all duration-300 ${scrolled
                                ? darkMode
                                    ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                : 'bg-white/20 text-white hover:bg-white/30'
                                }`}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`p-2 rounded-lg transition-colors ${scrolled
                                ? darkMode ? 'text-white hover:bg-slate-800' : 'text-slate-900 hover:bg-slate-100'
                                : 'text-white hover:bg-white/10'
                                }`}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className={`md:hidden mt-4 pb-4 space-y-3 transition-colors ${darkMode ? 'bg-slate-800/95' : 'bg-white/95'
                        } backdrop-blur-md rounded-2xl p-6 shadow-xl`}>
                        <a
                            href="#about"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block text-base font-medium transition-colors hover:text-white ${darkMode ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-700 hover:text-cyan-600'
                                }`}
                        >
                            About
                        </a>
                        <a
                            href="#destinations"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block text-base font-medium transition-colors hover:text-white ${darkMode ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-700 hover:text-cyan-600'
                                }`}
                        >
                            Destinations
                        </a>
                        <a
                            href="#whale-sharks"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block text-base font-medium transition-colors hover:text-white ${darkMode ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-700 hover:text-cyan-600'
                                }`}
                        >
                            Whale Sharks
                        </a>
                        <a
                            href="#gallery"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block text-base font-medium transition-colors hover:text-white ${darkMode ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-700 hover:text-cyan-600'
                                }`}
                        >
                            Gallery
                        </a>
                        <a
                            href="/admin/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-base font-semibold rounded-full hover:shadow-xl transition-all duration-300 text-center"
                        >
                            Login
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
}
