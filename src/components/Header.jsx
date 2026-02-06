import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <header className={`header ${isOpen ? 'menu-open' : ''}`}>
            <div className="header-container">
                <a href="#" className="logo">TN.</a>

                <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                    <span className="menu-text">{isOpen ? 'CLOSE' : 'MENU'}</span>
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="menu-overlay"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <nav className="menu-nav" onMouseLeave={() => setHoveredItem(null)}>
                            {['Home', 'About', 'Work', 'Contact'].map((item, index) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className={`menu-link ${hoveredItem && hoveredItem !== item ? 'dimmed' : ''}`}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + (index * 0.05) }}
                                    onClick={() => setIsOpen(false)}
                                    onMouseEnter={() => setHoveredItem(item)}
                                >
                                    {item}
                                    {hoveredItem === item && (
                                        <motion.span
                                            className="menu-dot"
                                            layoutId="menuDot"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                        />
                                    )}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
