import React, { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
    const { progress, total } = useProgress();
    const [displayProgress, setDisplayProgress] = useState(0);
    const preloaderRef = useRef(null);
    const textRef = useRef(null);
    const filledTextRef = useRef(null);
    const progressBarRef = useRef(null);

    // Smooth out the progress counter or fake it if no assets need loading
    useEffect(() => {
        let targetProgress = progress;
        let duration = 0.5;

        // If the 3D scene is so lightweight it has no external assets to load,
        // we fake a smooth cinematic load to 100%
        if (total === 0) {
            targetProgress = 100;
            duration = 2.5; // Slower, more elegant cinematic timing
        }

        let ctx = gsap.context(() => {
            // 1. Directly animate DOM elements for buttery smooth 120fps (Bypassing React re-renders)
            gsap.to(filledTextRef.current, {
                clipPath: `inset(0 ${100 - targetProgress}% 0 0)`,
                duration: duration,
                ease: "power2.inOut"
            });

            gsap.to(progressBarRef.current, {
                width: `${targetProgress}%`,
                duration: duration,
                ease: "power2.inOut"
            });

            // 2. Animate the number counter
            gsap.to({ val: displayProgress }, {
                val: targetProgress,
                duration: duration,
                ease: "power2.inOut",
                onUpdate: function() {
                    setDisplayProgress(Math.floor(this.targets()[0].val));
                }
            });
        });
        return () => ctx.revert();
    }, [progress, total]); // Removed displayProgress dependency to prevent loop bugs

    useEffect(() => {
        if ((progress === 100 || total === 0) && displayProgress >= 99) {
            const timer = setTimeout(() => {
                const ctx = gsap.context(() => {
                    const tl = gsap.timeline({
                        onComplete: () => {
                            if(onComplete) onComplete();
                        }
                    });

                    // Scale and fade the text
                    tl.to(textRef.current, {
                        scale: 1.1,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.inOut"
                    })
                    // Fade out the entire preloader background smoothly
                    .to(preloaderRef.current, {
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.inOut"
                    }, "-=0.3");
                }, preloaderRef);

                return () => ctx.revert();
            }, 600); // slight delay at 100%
            
            return () => clearTimeout(timer);
        }
    }, [progress, displayProgress, total, onComplete]);

    return (
        <div className="preloader" ref={preloaderRef}>
            <div className="preloader-wrapper" ref={textRef}>
                
                <div className="loading-text-container">
                    {/* Outline Text */}
                    <div className="loading-title outline">THARUNN</div>
                    {/* Filled Text that reveals from left to right */}
                    <div 
                        ref={filledTextRef}
                        className="loading-title filled" 
                        style={{ clipPath: `inset(0 100% 0 0)` }}
                    >
                        THARUNN
                    </div>
                </div>
                
                <div className="loading-footer">
                    <span className="loading-status">Loading Experience...</span>
                    <span className="loading-number">{displayProgress}%</span>
                </div>
                
                <div className="progress-bar-container">
                    <div 
                        ref={progressBarRef}
                        className="progress-bar-fill" 
                        style={{ width: `0%` }}
                    />
                </div>

            </div>
        </div>
    );
};

export default Preloader;
