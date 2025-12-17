import { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';

export default function Home() {

    useEffect(() => {
        // Handle hash links scrolling (because React Router might interfere or initial load)
        if (window.location.hash) {
            const element = document.querySelector(window.location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Add smooth scrolling to all anchor links
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;

            if (anchor && anchor.hash) {
                e.preventDefault();
                const element = document.querySelector(anchor.hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Update URL without jumping
                    window.history.pushState(null, '', anchor.hash);
                }
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="bg-white text-slate-800">
            <Header />
            <Hero />
            <Services />
            <About />
            <BookingForm />
            <Testimonials />
            <Footer />
        </div>
    );
}
