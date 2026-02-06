import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = React.useState(''); // '', 'sending', 'success', 'error'

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        // REPLACE THIS WITH YOUR ACTUAL DISCORD WEBHOOK URL
        const WEBHOOK_URL = "https://discord.com/api/webhooks/1469339426088812728/3EQHe5cRdpKieLvNmEo-_y47f7sVA8MjcCpovuVI3-IzAhD049Q9tNO1Rh8AESEhvh8S"; 

        if (WEBHOOK_URL === "https://discord.com/api/webhooks/1469339426088812728/3EQHe5cRdpKieLvNmEo-_y47f7sVA8MjcCpovuVI3-IzAhD049Q9tNO1Rh8AESEhvh8Sz") {
             alert("Please set your Discord Webhook URL in Contact.jsx");
             setStatus('');
             return;
        }

        const payload = {
            embeds: [
                {
                    title: "New Portfolio Contact",
                    color: 5814783, // Purple-ish
                    fields: [
                        { name: "Name", value: formData.name || "N/A", inline: true },
                        { name: "Email", value: formData.email || "N/A", inline: true },
                        { name: "Message", value: formData.message || "N/A" }
                    ],
                    timestamp: new Date().toISOString()
                }
            ]
        };

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Error sending webhook:", error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Let's Connect</h2>
                    <p className="section-subtitle">Have a project in mind? Let's build something extraordinary.</p>
                </div>

                <div className="contact-layout">
                    <form className="kinetic-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>01 / NAME</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name" 
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>02 / EMAIL</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email" 
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>03 / MESSAGE</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project" 
                                rows="1"
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn big" disabled={status === 'sending'}>
                            {status === 'sending' ? 'SENDING...' : status === 'success' ? 'SENT!' : 'SEND MESSAGE'}
                        </button>
                        {status === 'success' && <p style={{ color: '#4ade80', marginTop: '1rem' }}>Message sent successfully!</p>}
                        {status === 'error' && <p style={{ color: '#ef4444', marginTop: '1rem' }}>Failed to send message. Please try again.</p>}
                    </form>

                    <div className="contact-details">
                        <div className="detail-block">
                            <span className="mono-tag">EMAIL</span>
                            <a href="mailto:tharunnn75@gmail.com" className="detail-link">tharunn@mail.com</a>
                        </div>
                        <div className="detail-block">
                            <span className="mono-tag">SOCIALS</span>
                            <div className="social-row">
                                <a href="https://x.com/NTharunn" aria-label="X" className="social-link" target="_blank" rel="noopener noreferrer">
                                    <FaXTwitter />
                                    <span className="tooltip">X</span>
                                </a>
                                <a href="https://www.linkedin.com/in/tharunn-n-3014a4237" aria-label="LinkedIn" className="social-link" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin />
                                    <span className="tooltip">LinkedIn</span>
                                </a>
                                <a href="https://www.instagram.com/tharunnn75_?igsh=MTZqdHU5YWtmenRoYw==" aria-label="Instagram" className="social-link" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram />
                                    <span className="tooltip">Instagram</span>
                                </a>
                                <a href="https://discord.com/users/832993644755288095" aria-label="Discord" className="social-link" target="_blank" rel="noopener noreferrer">
                                    <FaDiscord />
                                    <span className="tooltip">Discord</span>
                                </a>
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
