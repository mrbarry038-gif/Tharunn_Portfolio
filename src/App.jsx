import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import SmoothScroll from './components/SmoothScroll';
import Preloader from './components/Preloader';
import BackgroundCanvas from './components/BackgroundCanvas';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [isLoading, setIsLoading] = useState(true);

    // Lock scrolling while loading
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            // Important: refresh GSAP after preloader disappears
            // to ensure ScrollTrigger calculates the right positions
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        }
    }, [isLoading]);

    return (
        <SmoothScroll>
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            
            <div className="app">
                <BackgroundCanvas />
                <Cursor />
                <Header />
                <main>
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Contact />
                </main>
            </div>
        </SmoothScroll>
    );
}

export default App;
