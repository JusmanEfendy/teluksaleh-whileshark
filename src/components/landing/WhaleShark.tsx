

export default function WhaleShark() {
    return (
        <section id="whale-sharks" className="py-24 lg:py-32 bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-800 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-cyan-400/30 to-blue-500/30 backdrop-blur-sm border border-white/20 overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <svg className="w-32 h-32 text-white/40 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                    </svg>
                                    <span className="text-white/60 text-sm font-medium">Whale Shark Image</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 text-white space-y-6">
                        <div className="inline-block">
                            <span className="text-cyan-300 font-semibold text-sm uppercase tracking-widest">The Gentle Giants</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                            Swim with
                            <span className="block text-cyan-300">Hiu Paus</span>
                        </h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                        <p className="text-xl text-cyan-100 leading-relaxed">
                            Witness the majesty of whale sharks in their natural habitat. These peaceful giants, known locally as "Hiu Paus," migrate through our protected waters, offering unforgettable encounters.
                        </p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Responsible Tourism</h4>
                                    <p className="text-cyan-200 text-sm leading-relaxed">Strict guidelines ensure minimal impact on whale sharks and their ecosystem.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Expert Guides</h4>
                                    <p className="text-cyan-200 text-sm leading-relaxed">Local marine biologists and experienced guides lead every expedition.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Best Season</h4>
                                    <p className="text-cyan-200 text-sm leading-relaxed">November to April offers peak whale shark encounters and calm seas.</p>
                                </div>
                            </div>
                        </div>

                        <button className="mt-8 px-8 py-4 bg-white text-blue-900 text-lg font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            Book Your Adventure
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
