

interface AboutProps {
    darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
    return (
        <section id="about" className={`py-24 lg:py-32 transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-white'
            }`}>
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <div className="inline-block">
                            <span className="text-cyan-600 font-semibold text-sm uppercase tracking-widest">About Teluk Saleh</span>
                        </div>
                        <h2 className={`text-4xl lg:text-5xl font-bold leading-tight transition-colors ${darkMode ? 'text-white' : 'text-slate-900'
                            }`}>
                            Where Ocean
                            <span className="block text-cyan-600">Meets Wonder</span>
                        </h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                        <p className={`text-lg leading-relaxed transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'
                            }`}>
                            Nestled in the heart of Sumbawa, Teluk Saleh is a protected marine sanctuary where ancient traditions meet pristine natural beauty. Our waters are home to majestic whale sharks, vibrant coral gardens, and thriving marine ecosystems.
                        </p>
                        <p className={`text-lg leading-relaxed transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'
                            }`}>
                            We believe in tourism that protects and preserves. Every visit supports local communities and marine conservation efforts, ensuring these wonders remain for generations to come.
                        </p>
                        <div className="flex items-center space-x-8 pt-4">
                            <div>
                                <div className="text-3xl font-bold text-cyan-600">500+</div>
                                <div className={`text-sm font-medium transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-500'
                                    }`}>Marine Species</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-cyan-600">15+</div>
                                <div className={`text-sm font-medium transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-500'
                                    }`}>Island Destinations</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-cyan-600">100%</div>
                                <div className={`text-sm font-medium transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-500'
                                    }`}>Eco-Friendly</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className={`aspect-square rounded-3xl overflow-hidden transition-colors ${darkMode
                            ? 'bg-gradient-to-br from-slate-800 to-slate-700'
                            : 'bg-gradient-to-br from-cyan-100 to-blue-100'
                            }`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`w-full h-full flex items-center justify-center ${darkMode
                                    ? 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30'
                                    : 'bg-gradient-to-br from-cyan-400/20 to-blue-500/20'
                                    }`}>
                                    <svg className={`w-32 h-32 transition-colors ${darkMode ? 'text-cyan-500/20' : 'text-cyan-600/30'
                                        }`} fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* Floating card accent */}
                        <div className={`absolute -bottom-6 -right-6 p-6 rounded-2xl shadow-2xl transition-colors ${darkMode
                            ? 'bg-slate-800 border border-slate-700'
                            : 'bg-white border border-slate-100'
                            }`}>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <div className={`text-sm font-bold transition-colors ${darkMode ? 'text-white' : 'text-slate-900'
                                        }`}>Certified</div>
                                    <div className={`text-xs transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-500'
                                        }`}>Eco Tourism</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
