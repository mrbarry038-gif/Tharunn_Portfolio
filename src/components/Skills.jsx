import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

const stack = [
    { cat: "CORE", tech: "HTML5 / CSS3 / JAVASCRIPT (ES6+)" },
    { cat: "FRONTEND", tech: "REACT.JS / VITE" },
    { cat: "BACKEND", tech: "JAVA" },
    { cat: "DATABASE", tech: "SQL" },
    { cat: "TOOLS", tech: "GIT / DISCORD API / WEBPACK" }
];

const Skills = () => {
    const sectionRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const rows = listRef.current.children;
            
            gsap.fromTo(rows, 
                { x: -50, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" className="skills-section" ref={sectionRef}>
            <div className="container skills-container-grid">
                <div className="skills-header-col">
                    <div className="skills-header">
                        <span className="mono-tag">02 / STACK</span>
                    </div>
                </div>

                <div className="stack-list" ref={listRef}>
                    {stack.map((item, index) => (
                        <div key={index} className="stack-row">
                            <div className="stack-cat">{item.cat}</div>
                            <div className="stack-tech">{item.tech}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
