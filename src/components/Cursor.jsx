import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch devices to disable cursor physics entirely
        if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
            setIsTouchDevice(true);
        }
    }, []);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Single sleek spring configuration for the aura
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (isTouchDevice) return;

        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseDown = () => setIsHovered(true);
        const handleMouseUp = () => setIsHovered(false);

        const handleLinkHover = () => setIsHovered(true);
        const handleLinkLeave = () => setIsHovered(false);

        const links = document.querySelectorAll('a, button, .project-row, .project-card, input, textarea');
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
    }, [isTouchDevice, cursorX, cursorY]);

    useEffect(() => {
        if (isTouchDevice) return;

        const handleLinkHover = () => setIsHovered(true);
        const handleLinkLeave = () => setIsHovered(false);

        const observer = new MutationObserver((mutations) => {
            const links = document.querySelectorAll('a, button, .project-row, .project-card, .modal-close, .modal-img-wrapper, .fullscreen-close');
            links.forEach(link => {
                link.addEventListener('mouseenter', handleLinkHover);
                link.addEventListener('mouseleave', handleLinkLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [isTouchDevice]);

    if (isTouchDevice) return null;

    return (
        <motion.div
            className={`cursor-aura ${isHovered ? 'hover' : ''}`}
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                x: "-50%",
                y: "-50%"
            }}
        />
    );
};

export default Cursor;
