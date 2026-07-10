import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const stack = [
    { cat: "FRONTEND", tech: ["HTML", "CSS", "JavaScript", "React JS"] },
    { cat: "BACKEND & DATABASE", tech: ["Java", "SQL"] },
    { cat: "TOOLS", tech: ["Eclipse", "VS Code", "Antigravity", "Blender"] }
];

const Skills = () => {
    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <h2 className="section-title">Skills</h2>

                <div className="stack-grid">
                    {stack.map((item, index) => (
                        <motion.div
                            key={index}
                            className="stack-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h3 className="stack-cat">{item.cat}</h3>
                            <div className="stack-tech-pills">
                                {item.tech.map((skill, i) => (
                                    <span key={i} className="glass-pill">{skill}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
