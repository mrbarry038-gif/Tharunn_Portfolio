import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    // Scroll state for nav appearance
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for ScrollSpy
    useEffect(() => {
        const sections = ['home', ...navLinks.map(link => link.name.toLowerCase())];
        
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // Trigger when section is in middle of viewport
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <a href="#home" className="logo">TN.</a>

                <nav className="desktop-nav">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            className={`nav-link ${activeSection === link.name.toLowerCase() ? 'active' : ''}`}
                            onClick={() => setActiveSection(link.name.toLowerCase())}
                        >
                            <span className="nav-text">{link.name}</span>
                        </a>
                    ))}
                </nav>

                <a href="#contact" className="btn-secondary nav-cta">Let's Talk</a>

                <div className="mobile-controls">
                    <a href="#contact" className="mobile-msg-icon" onClick={() => setMobileMenuOpen(false)}>
                        <FaEnvelope />
                    </a>
                    <button 
                        className="mobile-menu-btn" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-nav">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            className={`mobile-nav-link ${activeSection === link.name.toLowerCase() ? 'active' : ''}`}
                            onClick={() => {
                                setActiveSection(link.name.toLowerCase());
                                setMobileMenuOpen(false);
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
