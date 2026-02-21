import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useUIStore } from '../../store/uiStore';
import * as THREE from 'three';
import { MeshDistortMaterial } from '@react-three/drei';

export const CoreSphere = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    const scrollYProgress = useUIStore((state) => state.scrollYProgress);

    useFrame((state) => {
        if (!meshRef.current || !materialRef.current) return;

        // Constant breathing/orbit animation
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;

        // The scroll dictates the "Rigid -> Organic" morph
        // At scroll=0, distortion is 0 (Rigid Engine). At scroll=1, distortion is high (Organic Sketchbook)
        const targetDistortion = THREE.MathUtils.lerp(0.0, 1.2, scrollYProgress);

        // Smoothly animate distortion towards the target
        materialRef.current.distort = THREE.MathUtils.lerp(
            materialRef.current.distort,
            targetDistortion,
            0.05
        );
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
            <icosahedronGeometry args={[1, 5]} />
            {/* Kodak Gold / Yellow (hsl: 45, 95%, 55%) for the wireframe structure */}
            <MeshDistortMaterial
                ref={materialRef}
                color="#fbc31b"
                wireframe={true}
                distort={0.0}
                speed={2}
                emissive="#fbc31b"
                emissiveIntensity={0.2}
            />
        </mesh>
    );
};
