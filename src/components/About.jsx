import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="about-grid">
                    <div className="col-left">
                        <span className="mono-tag">01 / BIO</span>
                    </div>
                    <div className="col-right">
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
