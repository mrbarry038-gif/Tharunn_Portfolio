import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
    const [isHovered, setIsHovered] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 120 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseDown = () => setIsHovered(true);
        const handleMouseUp = () => setIsHovered(false);

        // Add hover effect listeners for interactive elements
        const handleLinkHover = () => setIsHovered(true);
        const handleLinkLeave = () => setIsHovered(false);

        const links = document.querySelectorAll('a, button, .project-row, input, textarea');
        links.forEach(link => {
            link.addEventListener('mouseenter', handleLinkHover);
            link.addEventListener('mouseleave', handleLinkLeave);
        });

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            links.forEach(link => {
                link.removeEventListener('mouseenter', handleLinkHover);
                link.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, []);

    // Re-attach listeners on DOM mutations (simple approach for dynamic content like modals)
    useEffect(() => {
        const handleLinkHover = () => setIsHovered(true);
        const handleLinkLeave = () => setIsHovered(false);

        const observer = new MutationObserver((mutations) => {
            const links = document.querySelectorAll('a, button, .project-row, .modal-close');
            links.forEach(link => {
                link.addEventListener('mouseenter', handleLinkHover);
                link.addEventListener('mouseleave', handleLinkLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <motion.div
                className={`cursor-dot ${isHovered ? 'hover' : ''}`}
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    x: "-50%",
                    y: "-50%"
                }}
            />
            <motion.div
                className={`cursor-follower ${isHovered ? 'hover' : ''}`}
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: "-50%",
                    y: "-50%"
                }}
            />
        </>
    );
};

export default Cursor;
