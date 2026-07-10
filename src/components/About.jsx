import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <motion.div 
                    className="about-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title">About Me</h2>
                    
                    <div className="about-text-container">
                        <p className="about-text">
                            My name is Tharunn Nagarajan. I am a Full Stack Developer specializing in React. My work is defined by a refusal to settle for "static". Every pixel should serve a purpose, and every interaction should feel alive.
                        </p>
                    </div>

                    <a href="/resume.pdf" download className="btn-primary resume-btn">
                        <span>Get Resume</span>
                        <FaArrowRight />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
