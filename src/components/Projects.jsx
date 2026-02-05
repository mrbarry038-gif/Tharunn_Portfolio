import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import './Projects.css';

const projects = [
    {
        id: "01",
        title: "Wraffle Ecommerce",
        category: "Full Stack / React / Node",
        description: "A secure, dynamic ecommerce platform for modern retail.",
        link: "#",
        status: "Completed"
    },
    {
        id: "02",
        title: "Jai Granites",
        category: "Web Design / Automation",
        description: "Product showcase with custom engraving algorithms and Discord integration.",
        link: "#",
        status: "Ongoing"
    },
    {
        id: "03",
        title: "Mobile UI Kit",
        category: "Interface Design",
        description: "Conceptual kinetic interface for mobile commerce applications.",
        link: "#",
        status: "Completed"
    }
];

const Projects = () => {
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.status === filter);

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="kinetic-header outline small">SELECTED</h2>
                    <h2 className="kinetic-header solid small">WORKS</h2>

                    <div className="filter-buttons">
                        {['All', 'Ongoing', 'Completed'].map((status) => (
                            <button
                                key={status}
                                className={`filter-btn ${filter === status ? 'active' : ''}`}
                                onClick={() => setFilter(status)}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="project-list">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-row"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="project-index">({project.id})</div>
                            <div className="project-info">
                                <h3>
                                    {project.title}
                                    <span className={`status-dot ${project.status.toLowerCase()}`}></span>
                                </h3>
                                <span className="project-cat">{project.category}</span>
                            </div>
                            <div className="project-desc">
                                <p>{project.description}</p>
                            </div>
                            <div className="project-action">
                                <a href={project.link} className="circle-btn">
                                    <FaArrowRight />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
