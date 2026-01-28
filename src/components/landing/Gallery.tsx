

interface GalleryProps {
    darkMode: boolean;
    activeImage: number;
    setActiveImage: (index: number) => void;
}

export default function Gallery({ darkMode, activeImage, setActiveImage }: GalleryProps) {
    return (
        <section id="gallery" className={`py-24 lg:py-32 transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-white'
            }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <span className="text-cyan-600 font-semibold text-sm uppercase tracking-widest">Moments</span>
                    <h2 className={`text-4xl lg:text-5xl font-bold mt-4 mb-6 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'
                        }`}>Captured Memories</h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto"></div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden rounded-3xl group cursor-pointer transition-all duration-500 hover:scale-105 ${index === 0 ? 'col-span-2 row-span-2' : ''
                                } ${activeImage === index ? 'ring-4 ring-cyan-500' : ''}`}
                            onClick={() => setActiveImage(index)}
                        >
                            <div className={`bg-gradient-to-br from-cyan-200 to-blue-300 ${index === 0 ? 'aspect-square' : 'aspect-square'
                                }`}>
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <div className="text-white">
                                    <h4 className="font-bold text-lg mb-1">Gallery Image {item}</h4>
                                    <p className="text-sm text-white/80">Teluk Saleh Marine Life</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
