import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="about-grid">
                    <motion.div
                        className="col-left"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="mono-tag">01 / BIO</span>
                    </motion.div>
                    <motion.div
                        className="col-right"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    >
                        <div className="about-content">
                            <div className="bio-details">
                                <p>
                                    My name is Tharunn Nagarajan. I am a Full Stack Developer specializing in the MERN stack.
                                    My work is defined by a refusal to settle for "static". Every pixel should serve a purpose,
                                    and every interaction should feel alive.
                                </p>

                                <a href="/resume.pdf" download className="btn-text-only">
                                    DOWNLOAD RESUME <FaArrowDown className="icon-arrow" />
                                </a>
                            </div>

                            <div className="profile-block">
                                <div className="profile-frame">
                                    <img
                                        src="/assets/profile.jpeg"
                                        alt="Tharunn Nagarajan"
                                        className="profile-img"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
