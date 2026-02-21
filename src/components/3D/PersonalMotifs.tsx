import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, Text3D } from '@react-three/drei';
import * as THREE from 'three';

// A collection of stylized 3D icons representing the User's unique interests.
// We avoid importing heavy external GLTF models and instead construct recognizable,
// highly-stylized geometric representations (Awwwards 3D minimalism trend).

function CameraCartridge({ position }: { position: [number, number, number] }) {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
            <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                {/* Camera Body */}
                <mesh>
                    <boxGeometry args={[1.5, 1, 0.8]} />
                    <meshStandardMaterial color="#333" roughness={0.7} metalness={0.2} />
                </mesh>
                {/* Lens */}
                <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                    <meshStandardMaterial color="#fce883" metalness={0.8} roughness={0.1} />
                </mesh>
                {/* Flash/Button */}
                <mesh position={[0.5, 0.6, 0]}>
                    <boxGeometry args={[0.3, 0.2, 0.3]} />
                    <meshStandardMaterial color="#e63946" />
                </mesh>
            </group>
        </Float>
    );
}

function RetroGamepad({ position }: { position: [number, number, number] }) {
    return (
        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2} position={position}>
            <group rotation={[-Math.PI / 6, Math.PI / 6, 0]}>
                {/* Pad Body */}
                <mesh>
                    <boxGeometry args={[2, 0.8, 0.3]} />
                    <meshStandardMaterial color="#e63946" roughness={0.4} /> // Pencil Red
                </mesh>
                {/* D-Pad Hint */}
                <mesh position={[-0.6, 0, 0.16]}>
                    <boxGeometry args={[0.4, 0.4, 0.1]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                {/* A/B Buttons */}
                <mesh position={[0.5, 0.1, 0.16]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
                    <meshStandardMaterial color="#fce883" />
                </mesh>
                <mesh position={[0.8, -0.1, 0.16]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
                    <meshStandardMaterial color="#fce883" />
                </mesh>
            </group>
        </Float>
    );
}

function ArchitecturalPillar({ position }: { position: [number, number, number] }) {
    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={position}>
            <group rotation={[Math.PI / 8, -Math.PI / 4, 0]}>
                <mesh>
                    {/* A wireframe architectural classical column */}
                    <cylinderGeometry args={[0.3, 0.3, 3, 8]} />
                    <meshStandardMaterial color="#ffffff" wireframe={true} transparent opacity={0.5} />
                </mesh>
                <mesh position={[0, 1.6, 0]}>
                    <boxGeometry args={[0.6, 0.2, 0.6]} />
                    <meshStandardMaterial color="#ffffff" wireframe={true} transparent opacity={0.5} />
                </mesh>
                <mesh position={[0, -1.6, 0]}>
                    <boxGeometry args={[0.6, 0.2, 0.6]} />
                    <meshStandardMaterial color="#ffffff" wireframe={true} transparent opacity={0.5} />
                </mesh>
            </group>
        </Float>
    );
}

function CodeBrackets({ position }: { position: [number, number, number] }) {
    // Note: We use basic geometric grouping to simulate { } since Text3D requires a loaded json font, 
    // and geometric primitives are much faster/safer for this abstract skill representation.
    return (
        <Float speed={3} rotationIntensity={2} floatIntensity={3} position={position}>
            <group>
                <mesh position={[-0.5, 0, 0]} rotation={[0, 0, 0]}>
                    <torusGeometry args={[0.5, 0.1, 16, 32, Math.PI]} />
                    <meshStandardMaterial color="#fce883" metalness={0.5} roughness={0.2} />
                </mesh>
                <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI]}>
                    <torusGeometry args={[0.5, 0.1, 16, 32, Math.PI]} />
                    <meshStandardMaterial color="#e63946" metalness={0.5} roughness={0.2} />
                </mesh>
            </group>
        </Float>
    );
}

function FluteInstrument({ position }: { position: [number, number, number] }) {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
            <group rotation={[0, 0, Math.PI / 4]}>
                <mesh>
                    <cylinderGeometry args={[0.08, 0.08, 3, 16]} />
                    <meshStandardMaterial color="#ddb892" roughness={0.9} /> // Bamboo wood color
                </mesh>
                {/* Finger Holes */}
                {[0.5, 0.8, 1.1, 1.4, -0.2, -0.6].map((y, i) => (
                    <mesh key={i} position={[0, y, 0.08]}>
                        <circleGeometry args={[0.04, 16]} />
                        <meshBasicMaterial color="#222" />
                    </mesh>
                ))}
            </group>
        </Float>
    );
}

export default function PersonalMotifs() {
    const groupRef = useRef<THREE.Group>(null);

    // Parallax to Mouse (Whole group orbits slightly)
    useFrame((state, delta) => {
        if (!groupRef.current) return;
        const targetX = (state.pointer.x * Math.PI) / 12;
        const targetY = (state.pointer.y * Math.PI) / 12;
        groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetX, 4, delta);
        groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -targetY, 4, delta);
    });

    return (
        <group ref={groupRef}>

            {/* Distribute the personal icons around the center */}
            <CameraCartridge position={[-4, 2, -2]} />
            <RetroGamepad position={[4, -1.5, 1]} />
            <ArchitecturalPillar position={[-3, -2, -3]} />
            <CodeBrackets position={[3, 2.5, -2]} />
            <FluteInstrument position={[0, 3, -4]} />

            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
        </group>
    );
}
