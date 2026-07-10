import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight, FaGithub, FaExternalLinkAlt, FaTimes, FaExpand } from 'react-icons/fa';
import './Projects.css';

const projects = [
    {
        id: "05",
        title: "Agrisentrix",
        category: "Web Design / Static",
        description: "Business presentation portfolio with a NASA color-themed webpage.",
        details: "A static business presentation portfolio website featuring a unique NASA color-themed design. Built to showcase corporate profiles and services with a dynamic visual approach.",
        image: "/assets/Agrisentrix.jpg",
        liveLink: "#",
        githubLink: "#",
        status: "Completed"
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
    },
    {
        id: "01",
        title: "Wraffle Ecommerce",
        category: "Full Stack / React / Node",
        description: "A secure, dynamic ecommerce platform for modern retail.",
        details: "Wraffle is a comprehensive ecommerce solution built with the MERN stack. It features real-time inventory tracking, secure payment gateways, and a dynamic dashboard for admins. The architecture ensures high scalability and performance.",
        image: "/assets/uncon.jpg",
        liveLink: "#",
        githubLink: "#",
        status: "Ongoing"
    },
    /* {
        id: "04",
        title: "FiveM - QB UI Designs",
        category: "Interface Design",
        description: "Advanced UI designs for QB-Framework.",
        details: "A comprehensive collection of advanced UI components built using React and Vanilla JS, specifically designed for the FiveM QB-Framework.",
        image: "/assets/f-mob.png",
        liveLink: "#",
        githubLink: "#",
        status: "Ongoing"
    }, */

    /* {
        id: "06",
        title: "Flipzone",
        category: "E-commerce Web Application",
        description: "Full-stack e-commerce application with Admin and Customer modules.",
        details: "Developed a full-stack e-commerce application with two modules – Admin and Customer. Implemented product management (add/edit/delete) for admin, and user registration with email verification for customers. Enabled product browsing with search, filter, and pagination. Integrated Cloudinary for image storage and Razorpay for secure online payments. Features include cart management and real-time user experience.",
        image: "/assets/hero-bg.jpg",
        liveLink: "#",
        githubLink: "https://github.com/Tharunn75/Flipzone-A5",
        status: "Completed"
    } */

];

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.status === filter);

    const listRef = useRef(null);

    useEffect(() => {
        if (!listRef.current) return;

        const ctx = gsap.context(() => {
            const rows = gsap.utils.toArray('.project-card');

            gsap.set(rows, { opacity: 0, y: 50 });

            ScrollTrigger.batch(rows, {
                start: "top 85%",
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    overwrite: true
                })
            });

            // Refresh ScrollTrigger after DOM update
            ScrollTrigger.refresh();
        }, listRef);

        return () => ctx.revert();
    }, [filteredProjects]);

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Featured Projects</h2>
                    <div className="title-line"></div>

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

                <div className="project-list" ref={listRef}>
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`project-card glass-panel`}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="project-image-preview">
                                <img src={project.image} alt={project.title} />
                                <div className="project-overlay-glow"></div>
                            </div>
                            <div className="project-card-content">
                                <div className="project-card-header">
                                    <h3>{project.title}</h3>
                                    <div className="project-action">
                                        <button className="circle-btn" aria-label="View Project Details">
                                            <FaArrowRight />
                                        </button>
                                    </div>
                                </div>
                                <span className="project-cat">{project.category}</span>
                                <div className="project-desc">
                                    <p>{project.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {createPortal(
                <AnimatePresence>
                    {selectedProject && (
                        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
                            <motion.div
                                className="modal-content glass-panel"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                onClick={(e) => e.stopPropagation()}
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
                                            {selectedProject.liveLink && selectedProject.liveLink !== "#" ? (
                                                <a href={selectedProject.liveLink} target="_blank" rel="noreferrer" className="btn-primary">
                                                    Live Demo <FaExternalLinkAlt />
                                                </a>
                                            ) : null}
                                            {selectedProject.githubLink && selectedProject.githubLink !== "#" ? (
                                                <a href={selectedProject.githubLink} target="_blank" rel="noreferrer" className="btn-secondary">
                                                    GitHub <FaGithub />
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {createPortal(
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
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};

export default Projects;
