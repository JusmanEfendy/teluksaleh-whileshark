

interface DestinationsProps {
    darkMode: boolean;
}

const destinations = [
    {
        title: "Pulau Moyo",
        description: "Pristine coral reefs and crystal-clear waters perfect for snorkeling and diving adventures."
    },
    {
        title: "Pulau Rakit",
        description: "Traditional floating villages where local communities live in harmony with the sea."
    },
    {
        title: "Teluk Saleh Bay",
        description: "Protected marine sanctuary home to whale sharks, dolphins, and diverse marine life."
    }
];

export default function Destinations({ darkMode }: DestinationsProps) {
    return (
        <section id="destinations" className={`py-24 lg:py-32 transition-colors duration-300 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'
            }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <span className="text-cyan-600 font-semibold text-sm uppercase tracking-widest">Explore</span>
                    <h2 className={`text-4xl lg:text-5xl font-bold mt-4 mb-6 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'
                        }`}>Featured Destinations</h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((destination, index) => (
                        <div
                            key={index}
                            className={`group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${darkMode ? 'bg-slate-900' : 'bg-white'
                                }`}
                        >
                            <div className="relative h-64 bg-gradient-to-br from-cyan-200 to-blue-300 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-24 h-24 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className={`text-2xl font-bold mb-3 group-hover:text-cyan-600 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'
                                    }`}>
                                    {destination.title}
                                </h3>
                                <p className={`leading-relaxed mb-6 transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'
                                    }`}>
                                    {destination.description}
                                </p>
                                <button className="text-cyan-600 font-semibold text-sm flex items-center space-x-2 group-hover:space-x-3 transition-all">
                                    <span>Discover More</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
