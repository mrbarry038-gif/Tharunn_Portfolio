import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section className="hero-section" id="home" ref={heroRef}>
            <motion.div className="container hero-container" style={{ opacity: opacityHero }}>
                
                <motion.div className="hero-content" style={{ y: yText }}>
                    <motion.span 
                        className="hero-greeting mono-tag"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Hello, I'm
                    </motion.span>
                    
                    <motion.h1 
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    >
                        Tharunn Nagarajan <br/>
                        <span className="accent-text hero-subtitle">Fullstack Developer</span>
                    </motion.h1>



                    <motion.p 
                        className="hero-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    >
                        Engineering cinematic, high-performance web experiences. 
                        Bridging the gap between beautiful design and robust architecture.
                    </motion.p>

                    <motion.div 
                        className="hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        <a href="#projects" className="btn-primary">View Work</a>
                        <a href="#contact" className="btn-secondary">Let's Talk</a>
                    </motion.div>
                </motion.div>

                <motion.div className="hero-visuals" style={{ y: yImage }}>
                    <motion.div 
                        className="hero-image-wrapper"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <img src="/assets/profile_main.png" alt="Tharunn Nagarajan" className="hero-image" />
                    </motion.div>
                </motion.div>

            </motion.div>

            <motion.div 
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
            >
                <span className="scroll-text-horizontal">SCROLL</span>
                <motion.div 
                    className="scroll-arrow-wrapper"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FaArrowDown className="scroll-arrow" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
