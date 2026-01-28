

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-700">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
            </div>

            {/* Decorative wave overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>

            <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-12 text-center">
                <div className="animate-fade-in">
                    <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <span className="text-cyan-200 text-sm font-medium tracking-wide">Discover Indonesia's Hidden Paradise</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Swim with
                        <span className="block mt-2 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                            Whale Sharks
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-cyan-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                        Experience the gentle giants of Teluk Saleh. Immerse yourself in pristine waters, vibrant coral reefs, and sustainable marine tourism.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-4 bg-white text-blue-900 text-lg font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            Explore Experiences
                        </button>
                        <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                        <div className="w-1.5 h-2 bg-white/70 rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
