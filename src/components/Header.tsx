import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md' : 'bg-white/90 backdrop-blur-md shadow-sm'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <img src={logo} alt="شعار عيادة باريس" className="h-20 w-auto" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="/#services" className="text-slate-600 hover:text-primary font-medium transition-colors">الخدمات</a>
                    <a href="/#about" className="text-slate-600 hover:text-primary font-medium transition-colors">من نحن</a>
                    <a href="/#testimonials" className="text-slate-600 hover:text-primary font-medium transition-colors">آراء العملاء</a>
                    <a href="/#contact"
                        className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-accent-active transition-colors shadow-lg shadow-primary/30">
                        احجز موعد
                    </a>
                    <Link to="/login" id="login-btn"
                        className="text-slate-600 hover:text-primary font-medium transition-colors flex items-center gap-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                            </path>
                        </svg>
                        تسجيل دخول
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    id="mobile-menu-btn"
                    className="md:hidden text-slate-600 hover:text-primary"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div id="mobile-menu" className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-slate-100 absolute w-full`}>
                <div className="flex flex-col p-4 gap-4">
                    <a href="#services" className="text-slate-600 hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>الخدمات</a>
                    <a href="#about" className="text-slate-600 hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>من نحن</a>
                    <a href="#testimonials" className="text-slate-600 hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>آراء العملاء</a>
                    <a href="#contact" className="text-primary font-medium" onClick={() => setIsMenuOpen(false)}>احجز موعد</a>
                    <Link to="/login" className="text-slate-600 hover:text-primary font-medium" onClick={() => setIsMenuOpen(false)}>تسجيل دخول</Link>
                </div>
            </div>
        </header>
    );
}
