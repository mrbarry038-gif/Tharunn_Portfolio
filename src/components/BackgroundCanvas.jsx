import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

const AuroraOrbs = () => {
    const groupRef = useRef();
    const meshRef1 = useRef();
    const meshRef2 = useRef();

    useFrame((state, delta) => {
        // Soft floating rotation
        if (meshRef1.current) {
            meshRef1.current.rotation.x += delta * 0.1;
            meshRef1.current.rotation.y += delta * 0.15;
        }
        if (meshRef2.current) {
            meshRef2.current.rotation.x -= delta * 0.12;
            meshRef2.current.rotation.y -= delta * 0.08;
        }

        // Interactive subtle shift based on mouse position
        if (groupRef.current) {
            const targetX = (state.pointer.y * Math.PI) / 8;
            const targetY = (state.pointer.x * Math.PI) / 8;
            
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, delta);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, delta);
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* Primary Orb - Violet */}
                <Sphere ref={meshRef1} args={[2.5, 64, 64]} position={[-1, 1, -2]}>
                    <meshBasicMaterial color="#8B5CF6" transparent opacity={0.15} wireframe={false} />
                </Sphere>
                
                {/* Secondary Orb - Cyan */}
                <Sphere ref={meshRef2} args={[3.5, 64, 64]} position={[2, -1, -4]}>
                    <meshBasicMaterial color="#06B6D4" transparent opacity={0.1} wireframe={false} />
                </Sphere>
            </Float>
        </group>
    );
};

const BackgroundCanvas = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
            filter: 'blur(40px)', // Creates the soft glowing aurora effect
        }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <AuroraOrbs />
            </Canvas>
        </div>
    );
};

export default BackgroundCanvas;
