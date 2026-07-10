import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedin, FaInstagram, FaDiscord, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Contact.css';

const Contact = () => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const detailsRef = useRef(null);

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = React.useState(''); // '', 'sending', 'success', 'error'

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(formRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%"
                    }
                }
            );

            gsap.fromTo(detailsRef.current.children,
                { x: 50, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

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
        <section id="contact" className="contact-section" ref={sectionRef}>
            <div className="container">
                <div className="contact-layout centered">
                    <div className="section-header centered">
                        <h2 className="section-title massive">LET'S<br/>CONNECT</h2>
                        <p className="section-subtitle">Have a project in mind? Let's build something extraordinary.</p>
                    </div>

                    <div className="form-container">
                        <form className="glass-form" onSubmit={handleSubmit} ref={formRef}>
                            <div className="input-group glass">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="input-group glass">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className="input-group glass">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn pill" disabled={status === 'sending'}>
                                {status === 'sending' ? 'SENDING...' : status === 'success' ? 'SENT!' : 'SEND MESSAGE'}
                            </button>
                            {status === 'success' && <p className="status-msg success">Message sent successfully!</p>}
                            {status === 'error' && <p className="status-msg error">Failed to send message. Please try again.</p>}
                        </form>
                    </div>

                    <div className="social-icons-row" ref={detailsRef}>
                        <a href="mailto:tharunnn75@gmail.com" className="social-icon-btn" aria-label="Email">
                            <FaEnvelope />
                        </a>
                        <a href="https://github.com/Tharunn75" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/tharunn-n-3014a4237" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a href="https://x.com/NTharunn" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="X (Twitter)">
                            <FaXTwitter />
                        </a>
                        <a href="https://www.instagram.com/tharunnn75_?igsh=MTZqdHU5YWtmenRoYw==" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="https://discord.com/users/832993644755288095" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Discord">
                            <FaDiscord />
                        </a>
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
