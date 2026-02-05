import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Let's Connect</h2>
                    <p className="section-subtitle">Have a project in mind? Let's build something extraordinary.</p>
                </div>

                <div className="contact-layout">
                    <form className="kinetic-form">
                        <div className="input-group">
                            <label>01 / NAME</label>
                            <input type="text" placeholder="Enter your name" />
                        </div>
                        <div className="input-group">
                            <label>02 / EMAIL</label>
                            <input type="email" placeholder="Enter your email" />
                        </div>
                        <div className="input-group">
                            <label>03 / MESSAGE</label>
                            <textarea placeholder="Tell me about your project" rows="1"></textarea>
                        </div>

                        <button type="submit" className="submit-btn big">
                            SEND MESSAGE
                        </button>
                    </form>

                    <div className="contact-details">
                        <div className="detail-block">
                            <span className="mono-tag">EMAIL</span>
                            <a href="mailto:hello@example.com" className="detail-link">hello@example.com</a>
                        </div>
                        <div className="detail-block">
                            <span className="mono-tag">SOCIALS</span>
                            <div className="social-row">
                                <a href="#" aria-label="Twitter"><FaTwitter /></a>
                                <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                                <a href="#" aria-label="Discord"><FaDiscord /></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span className="copyright-text">© {new Date().getFullYear()} THARUNN NAGARAJAN. ALL RIGHTS RESERVED.</span>
                </div>
            </div>
        </section>
    );
};

export default Contact;
