import React, { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
    const { progress, total } = useProgress();
    const [displayProgress, setDisplayProgress] = useState(0);
    const preloaderRef = useRef(null);
    const textRef = useRef(null);

    // Smooth out the progress counter or fake it if no assets need loading
    useEffect(() => {
        let targetProgress = progress;
        let duration = 0.5;

        // If the 3D scene is so lightweight it has no external assets to load,
        // we fake a smooth 1.5s cinematic load to 100%
        if (total === 0) {
            targetProgress = 100;
            duration = 1.5;
        }

        let ctx = gsap.context(() => {
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
    }, [progress, total]);

    useEffect(() => {
        // When completely loaded or faked load reaches 99%
        if ((progress === 100 || total === 0) && displayProgress >= 99) {
            // Give a tiny delay before sliding up to let the user see 100%
            const timer = setTimeout(() => {
                const ctx = gsap.context(() => {
                    const tl = gsap.timeline({
                        onComplete: () => {
                            if(onComplete) onComplete();
                        }
                    });

                    tl.to(textRef.current, {
                        opacity: 0,
                        y: -20,
                        duration: 0.5,
                        ease: "power2.inOut"
                    })
                    .to(preloaderRef.current, {
                        yPercent: -100,
                        duration: 1,
                        ease: "power4.inOut"
                    });
                }, preloaderRef);

                return () => ctx.revert();
            }, 500);
            
            return () => clearTimeout(timer);
        }
    }, [progress, displayProgress, total, onComplete]);

    return (
        <div className="preloader" ref={preloaderRef}>
            <div className="preloader-content" ref={textRef}>
                <div className="loading-logo">TN.</div>
                <div className="loading-text">INITIALIZING WORKSPACE...</div>
                <div className="loading-percentage">{displayProgress}%</div>
            </div>
        </div>
    );
};

export default Preloader;
