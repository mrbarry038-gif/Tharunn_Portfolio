import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowDown } from 'react-icons/fa';
import './About.css';

const About = () => {
    const sectionRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance Reveal
            gsap.fromTo(leftColRef.current, 
                { opacity: 0, x: -50 },
                { 
                    opacity: 1, x: 0, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            gsap.fromTo(rightColRef.current, 
                { opacity: 0, y: 50 },
                { 
                    opacity: 1, y: 0, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );

            // Cinematic Image Parallax (scrolling effect)
            gsap.fromTo(imgRef.current,
                { y: -30, scale: 1.15 },
                {
                    y: 30, scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1 // smooth scrubbing
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="about-section" ref={sectionRef}>
            <div className="container">
                <div className="about-grid">
                    <div className="col-left" ref={leftColRef}>
                        <span className="mono-tag">01 / BIO</span>
                    </div>
                    <div className="col-right" ref={rightColRef}>
                        <div className="about-content">
                            <div className="bio-details">
                                <p>
                                    My name is Tharunn Nagarajan. I am a Full Stack Developer specializing in React.
                                    My work is defined by a refusal to settle for "static". Every pixel should serve a purpose,
                                    and every interaction should feel alive.
                                </p>

                                <a href="/resume.pdf" download className="btn-text-only">
                                    DOWNLOAD RESUME <FaArrowDown className="icon-arrow" />
                                </a>
                            </div>

                            <div className="profile-block">
                                <div className="profile-frame" style={{ overflow: 'hidden' }}>
                                    <img
                                        ref={imgRef}
                                        src="/assets/profile.jpeg"
                                        alt="Tharunn Nagarajan"
                                        className="profile-img"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
