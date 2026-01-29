

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-20">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 transform origin-top-right z-0"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10 grid md:grid-cols-2 gap-12 items-center">

                {/* Left Column: Text & Search */}
                <div className="space-y-8 animate-fade-in text-left">
                    <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">
                        Explore the World
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
                        It's time <br />
                        to travel <span className="text-indigo-600">with</span> <br />
                        <span className="relative inline-block">
                            Teluk Saleh
                            <svg className="absolute -bottom-2 right-0 w-full h-3 text-indigo-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                        Discover the hidden paradise of Sumbawa. Swim with whale sharks, explore pristine coral reefs, and experience sustainable tourism.
                    </p>

                    {/* Floating Search Bar */}
                    <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 max-w-xl">
                        <div className="flex flex-col sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">

                            {/* Location Input */}
                            <div className="flex-1 p-4 w-full">
                                <label className="block text-xs font-bold text-slate-400 mb-1 ml-1">LOCATION</label>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center mr-3 text-indigo-600">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-800">Sumbawa</div>
                                        <div className="text-xs text-slate-500">Indonesia</div>
                                    </div>
                                    <svg className="w-4 h-4 text-slate-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>

                            {/* Date Input */}
                            <div className="flex-1 p-4 w-full">
                                <label className="block text-xs font-bold text-slate-400 mb-1 ml-1">DATE</label>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center mr-3 text-orange-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-800">Select Date</div>
                                        <div className="text-xs text-slate-500">Anytime</div>
                                    </div>
                                    <svg className="w-4 h-4 text-slate-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>

                            {/* Search Button */}
                            <div className="p-2">
                                <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95">
                                    Explore Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Twisted Arrow Decoration */}
                    <div className="absolute left-[30%] bottom-0 hidden lg:block text-indigo-400 transform translate-y-12 translate-x-12 rotate-12">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 10 Q 50 10 50 50 T 90 90" strokeDasharray="5,5" />
                            <path d="M85 80 L 90 90 L 80 95" />
                        </svg>
                    </div>
                </div>

                {/* Right Column: Image Composition */}
                <div className="relative h-[600px] hidden md:block">
                    {/* Circle 1: Top Right (Large) */}
                    <div className="absolute top-0 right-0 w-80 h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl z-20 hover:scale-105 transition-transform duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1582967788606-a171f1080ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Whale Shark"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Circle 2: Center Left (Medium) */}
                    <div className="absolute top-40 left-10 w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl z-30 hover:scale-105 transition-transform duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1544551763-46a42a457110?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Diving"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Circle 3: Bottom Right (Small) */}
                    <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl z-20 hover:scale-105 transition-transform duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Beach"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-indigo-100 rounded-full -z-10 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-indigo-50 rounded-full -z-10"></div>
                </div>
            </div>
        </section>
    );
}
