import { useFrame, useThree } from '@react-three/fiber';
import { useUIStore } from '../../store/uiStore';
import * as THREE from 'three';

export const OrbitalCamera = () => {
    const { camera } = useThree();
    const scrollYProgress = useUIStore((state) => state.scrollYProgress);

    useFrame(() => {
        // 0 = Top of page (Hero). 1 = Bottom of page (Climax).
        // We want to orbit the camera downwards and around the core.

        // Base position
        const radius = 12;
        // Map scroll progress (0 to 1) to an angle (e.g., 0 to Math.PI * 1.5)
        const angle = scrollYProgress * Math.PI * 1.5;

        // We want the camera to look slightly down as well
        const height = THREE.MathUtils.lerp(2, -4, scrollYProgress);

        // Calculate new position using basic trigonometry
        const targetX = Math.sin(angle) * radius;
        const targetZ = Math.cos(angle) * radius;

        // Smoothly interpolate the camera position
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, height, 0.05);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

        // Always look at the center core
        camera.lookAt(0, 0, 0);
    });

    return null;
};
