import React, { useState, useEffect } from 'react';
import {
    Navbar,
    Hero,
    About,
    Destinations,
    WhaleShark,
    Gallery,
    CTA,
    Footer
} from '../components/landing';

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Gallery auto-rotate
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % 6);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-white'
            }`}>
            <Navbar
                scrolled={scrolled}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
            <Hero />
            <About darkMode={darkMode} />
            <Destinations darkMode={darkMode} />
            <WhaleShark />
            <Gallery
                darkMode={darkMode}
                activeImage={activeImage}
                setActiveImage={setActiveImage}
            />
            <CTA darkMode={darkMode} />
            <Footer darkMode={darkMode} />
        </div>
    );
}