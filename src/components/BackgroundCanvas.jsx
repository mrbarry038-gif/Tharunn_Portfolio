import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

const WireframeGlobe = () => {
    const groupRef = useRef();
    const meshRef = useRef();
    const secondaryMeshRef = useRef();

    useFrame((state, delta) => {
        // Continuous spin (Earth rotates on its Y axis)
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
        }
        if (secondaryMeshRef.current) {
            secondaryMeshRef.current.rotation.y -= delta * 0.1;
        }

        // Interactive tilt based on mouse position
        if (groupRef.current) {
            // Map pointer (-1 to 1) to rotation (-pi/4 to pi/4)
            const targetX = (state.pointer.y * Math.PI) / 4;
            const targetY = (state.pointer.x * Math.PI) / 4;
            
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, delta * 2);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, delta * 2);
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
                {/* Primary Globe - Teal. Sized down and uses classic 36x18 Earth-like lat/long segments, with 23.5deg tilt (0.41 rad) */}
                <Sphere ref={meshRef} args={[1.8, 36, 18]} position={[0, 0, 0]} rotation={[0.41, 0, 0]}>
                    <meshBasicMaterial color="#4FD1C5" wireframe transparent opacity={0.25} />
                </Sphere>
                
                {/* Secondary Background Globe - Coral. Sized down to match nicely */}
                <Sphere ref={secondaryMeshRef} args={[2.4, 24, 12]} position={[0, 0, -1]}>
                    <meshBasicMaterial color="#FF8A65" wireframe transparent opacity={0.08} />
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
            pointerEvents: 'none'
        }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <WireframeGlobe />
            </Canvas>
        </div>
    );
};

export default BackgroundCanvas;
