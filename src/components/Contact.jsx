import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <h2 className="kinetic-header outline">LET'S</h2>
                <h2 className="kinetic-header solid">TALK</h2>

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
                                <a href="#">LN</a>
                                <a href="#">GH</a>
                                <a href="#">TW</a>
                            </div>
                        </div>
                        <div className="detail-block">
                            <span className="mono-tag">COPYRIGHT</span>
                            <span className="copyright-text">© {new Date().getFullYear()} THARUNN NAGARAJAN</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
