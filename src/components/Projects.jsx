import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaGithub, FaExternalLinkAlt, FaTimes, FaExpand } from 'react-icons/fa';
import './Projects.css';

const projects = [
    {
        id: "01",
        title: "Wraffle Ecommerce",
        category: "Full Stack / React / Node",
        description: "A secure, dynamic ecommerce platform for modern retail.",
        details: "Wraffle is a comprehensive ecommerce solution built with the MERN stack. It features real-time inventory tracking, secure payment gateways, and a dynamic dashboard for admins. The architecture ensures high scalability and performance.",
        image: "/assets/project1.jpg",
        liveLink: "#",
        githubLink: "#",
        status: "Ongoing"
    },
    {
        id: "02",
        title: "Jai Granites",
        category: "Web Design / Automation",
        description: "Product showcase with custom engraving algorithms and Discord integration.",
        details: "A bespoke website for a granite manufacturing firm. Includes an automated quote system that references current stock prices and sends lead details directly to a Discord channel for the sales team.",
        image: "/assets/jai-granites.png",
        liveLink: "#",
        githubLink: "#",
        status: "Ongoing"
    },
    {
        id: "03",
        title: "Mobile Shop UI",
        category: "Interface Design",
        description: "Conceptual interface for mobile commerce applications.",
        details: "An experimental UI design focused on kinetic interactions and gesture-based navigation. Using Framer Motion, this project explores how animation can enhance user retention in e-commerce apps.",
        image: "/assets/f-mob.png",
        liveLink: "#",
        githubLink: "#",
        status: "Completed"
    }
];

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

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
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
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
                                <button
                                    className="circle-btn"
                                    onClick={() => setSelectedProject(project)}
                                    aria-label="View Project Details"
                                >
                                    <FaArrowRight />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
                        <motion.div
                            className="modal-content"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()} // Prevent close on content click
                        >
                            <button className="modal-close" onClick={() => setSelectedProject(null)}>
                                <FaTimes />
                            </button>

                            <div className="modal-grid">
                                <div className="modal-left">
                                    <div className="modal-img-wrapper" onClick={() => setIsFullScreen(true)}>
                                        <img src={selectedProject.image} alt={selectedProject.title} />
                                        <div className="img-overlay-icon">
                                            <FaExpand />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-right">
                                    <h3 className="modal-title">{selectedProject.title}</h3>
                                    <span className="modal-cat">{selectedProject.category}</span>

                                    <p className="modal-desc">{selectedProject.details || selectedProject.description}</p>

                                    <div className="modal-links">
                                        <a href={selectedProject.liveLink} target="_blank" rel="noreferrer" className="modal-link-btn">
                                            LIVE DEMO <FaExternalLinkAlt />
                                        </a>
                                        <a href={selectedProject.githubLink} target="_blank" rel="noreferrer" className="modal-link-btn outline">
                                            GITHUB <FaGithub />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isFullScreen && selectedProject && (
                    <motion.div
                        className="fullscreen-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsFullScreen(false)}
                    >
                        <button className="fullscreen-close" onClick={() => setIsFullScreen(false)}>
                            <FaTimes />
                        </button>
                        <motion.img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="fullscreen-image"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
