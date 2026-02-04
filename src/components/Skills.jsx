import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const stack = [
    { cat: "CORE", tech: "HTML5 / CSS3 / JAVASCRIPT (ES6+)" },
    { cat: "FRONTEND", tech: "REACT.JS / VITE" },
    { cat: "BACKEND", tech: "NODE.JS / EXPRESS / JAVA" },
    { cat: "DATABASE", tech: "MONGODB / SQL" },
    { cat: "TOOLS", tech: "GIT / DISCORD API / WEBPACK" }
];

const Skills = () => {
    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <div className="skills-header">
                    <span className="mono-tag">02 / STACK</span>
                </div>

                <div className="stack-list">
                    {stack.map((item, index) => (
                        <motion.div
                            key={index}
                            className="stack-row"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="stack-cat">{item.cat}</div>
                            <div className="stack-tech">{item.tech}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
