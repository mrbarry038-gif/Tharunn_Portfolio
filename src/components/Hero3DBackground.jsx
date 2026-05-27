import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

const InteractiveGrid = () => {
    // Generate strict grid positions to match the "developer grid" aesthetic
    const spacing = 1.5;
    const { positions, colorObj } = useMemo(() => {
        const pos = [];
        // Cover a wide area to fill the screen
        for(let x = -35; x <= 35; x += spacing) {
            for(let y = -20; y <= 20; y += spacing) {
                pos.push(new THREE.Vector3(x, y, -3)); 
            }
        }
        return { positions: pos, colorObj: new THREE.Color() };
    }, []);

    const count = positions.length;
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Base color matches the subtle CSS grid lines, hover color is the primary neon accent
    const baseColor = new THREE.Color('#222222');
    const hoverColor = new THREE.Color('#00ff41');

    useFrame((state) => {
        if (!meshRef.current) return;

        // Get mouse position mapped to 3D world space
        const mouseX = (state.pointer.x * state.viewport.width) / 2;
        const mouseY = (state.pointer.y * state.viewport.height) / 2;
        
        // We add a slow global drift to the entire grid for a living feel
        const time = state.clock.elapsedTime * 0.2;
        
        for (let i = 0; i < count; i++) {
            const pos = positions[i];
            
            // Calculate distance from mouse to this grid node
            const dx = pos.x - mouseX;
            const dy = pos.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const hoverRadius = 6;
            let zOffset = 0;
            let scale = 1;
            
            // Wave effect and color lighting based on mouse proximity
            if (distance < hoverRadius) {
                // Normalized distance (1 at center, 0 at edge of radius)
                const factor = 1 - (distance / hoverRadius);
                
                // Nodes pop forward towards the camera
                zOffset = factor * 3; 
                
                // Nodes scale up
                scale = 1 + factor * 2; 
                
                // Interpolate color from grey to neon green
                colorObj.lerpColors(baseColor, hoverColor, factor);
            } else {
                // Add a very subtle, slow ambient sine wave to the whole grid
                zOffset = Math.sin(pos.x * 0.5 + time) * Math.cos(pos.y * 0.5 + time) * 0.5;
                colorObj.copy(baseColor);
            }

            // Apply transforms to dummy object
            dummy.position.set(pos.x, pos.y, pos.z + zOffset);
            
            // Optional: make the nodes point slightly towards mouse when repelled
            if (distance < hoverRadius) {
                dummy.lookAt(mouseX, mouseY, 10);
            } else {
                dummy.rotation.set(0, 0, 0);
            }
            
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            
            // Update the instance
            meshRef.current.setMatrixAt(i, dummy.matrix);
            meshRef.current.setColorAt(i, colorObj);
        }
        
        // Tell Three.js the buffers need updating
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            {/* Using a sphere creates a nice clean dot/bubble look */}
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
    );
};

const Hero3DBackground = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
                <InteractiveGrid />
            </Canvas>
        </div>
    );
};

export default Hero3DBackground;
