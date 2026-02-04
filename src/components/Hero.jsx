import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section" id="home">
            <div className="container fluid-height">
                <div className="hero-top-bar">
                    <span className="mono-tag">Portfolio 2026</span>
                    <span className="mono-tag">Available for work</span>
                </div>

                <div className="kinetic-wrapper">
                    <motion.div
                        initial={{ x: '-10%' }}
                        animate={{ x: '-5%' }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                        className="row"
                    >
                        <h1 className="kinetic-header outline">THARUNN</h1>
                    </motion.div>

                    <motion.div
                        initial={{ x: '0%' }}
                        animate={{ x: '-15%' }}
                        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                        className="row"
                    >
                        <h1 className="kinetic-header solid">NAGARAJAN</h1>
                    </motion.div>
                </div>

                <div className="hero-footer">
                    <div className="role-block">
                        <span className="mono-tag label">Role</span>
                        <span className="value">Full Stack Developer</span>
                    </div>
                    <div className="stack-block">
                        <span className="mono-tag label">Specialty</span>
                        <span className="value">MERN / Java</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
