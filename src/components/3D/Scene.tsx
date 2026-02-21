import { Canvas } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { CoreSphere } from './CoreSphere';
import { OrbitalCamera } from './OrbitalCamera';
import { Suspense, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';

// We wrap the canvas in a full-screen fixed container
export default function Scene() {
    const setScrollYProgress = useUIStore((state) => state.setScrollYProgress);
    const { scrollYProgress } = useScroll();

    // Sync Framer Motion scroll hook into Zustand so R3F can read it quickly
    useEffect(() => {
        const unsub = scrollYProgress.on("change", (latest) => {
            setScrollYProgress(latest);
        });
        return () => unsub();
    }, [scrollYProgress, setScrollYProgress]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={45} />
                <OrbitalCamera />

                {/* Soft, cinematic lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#fbc31b" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#27858c" /> {/* Faded teal kick */}

                <Suspense fallback={null}>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        <CoreSphere />
                    </Float>
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </div>
    );
}
