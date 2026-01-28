

interface CTAProps {
    darkMode: boolean;
}

export default function CTA({ darkMode }: CTAProps) {
    return (
        <section className={`py-24 lg:py-32 transition-colors duration-300 ${darkMode
            ? 'bg-gradient-to-br from-cyan-900 to-blue-950'
            : 'bg-gradient-to-br from-cyan-600 to-blue-700'
            }`}>
            <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center text-white">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Ready to Dive In?
                </h2>
                <p className="text-xl text-cyan-100 mb-10 leading-relaxed">
                    Join us for an unforgettable journey through Indonesia's most pristine marine sanctuary. Your adventure awaits.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto px-10 py-5 bg-white text-blue-900 text-lg font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        Plan Your Trip
                    </button>
                    <button className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300">
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    );
}
