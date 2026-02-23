import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- HIGH FIDELITY 3D MOTIFS ---
// Built entirely using advanced R3F groupings and primitives for an Awwwards-level look
// without relying on heavy external GLTF assets.

function RealisticCamera({ position }: { position: [number, number, number] }) {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={position}>
            <group rotation={[Math.PI / 4, -Math.PI / 6, 0]}>
                {/* Main Body (Premium Matte Black) */}
                <mesh>
                    <boxGeometry args={[2.2, 1.4, 0.8]} />
                    <meshStandardMaterial color="#111" roughness={0.8} metalness={0.2} />
                </mesh>

                {/* Top Viewfinder Plate (Brushed Metal) */}
                <mesh position={[0, 0.75, 0]}>
                    <boxGeometry args={[1.5, 0.3, 0.7]} />
                    <meshStandardMaterial color="#333" roughness={0.4} metalness={0.8} />
                </mesh>

                {/* Shutter Button (Red Accent) */}
                <mesh position={[0.8, 0.9, -0.1]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.2, 32]} />
                    <meshStandardMaterial color="#e63946" metalness={0.5} roughness={0.3} />
                </mesh>

                {/* Lens Mount (Metal Ring) */}
                <mesh position={[0, 0, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.65, 0.65, 0.1, 64]} />
                    <meshStandardMaterial color="#888" metalness={1} roughness={0.2} />
                </mesh>

                {/* Primary Lens Barrel */}
                <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.55, 0.6, 0.4, 64]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.5} />
                </mesh>

                {/* Front Lens Glass (Reflective) */}
                <mesh position={[0, 0, 0.91]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.45, 0.45, 0.05, 64]} />
                    <meshPhysicalMaterial
                        color="#223344"
                        metalness={0.9}
                        roughness={0.0}
                        transmission={0.9}
                        thickness={2}
                    />
                </mesh>

                {/* Lens Highlight Ring (Yellow Brand Color) */}
                <mesh position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.55, 0.02, 16, 64]} />
                    <meshStandardMaterial color="#fce883" />
                </mesh>
            </group>
        </Float>
    );
}

function PS5Controller({ position }: { position: [number, number, number] }) {
    return (
        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1} position={position}>
            <group rotation={[-Math.PI / 4, Math.PI / 5, Math.PI / 12]}>
                {/* Main Central Chassis (White) */}
                <mesh>
                    <boxGeometry args={[1.8, 1, 0.4]} />
                    <meshStandardMaterial color="#eee" roughness={0.3} metalness={0.1} />
                </mesh>

                {/* Left Curved Grip */}
                <mesh position={[-1.1, -0.6, 0]} rotation={[0, 0, -Math.PI / 6]}>
                    <capsuleGeometry args={[0.3, 1.2, 32, 32]} />
                    <meshStandardMaterial color="#eee" roughness={0.4} />
                </mesh>

                {/* Right Curved Grip */}
                <mesh position={[1.1, -0.6, 0]} rotation={[0, 0, Math.PI / 6]}>
                    <capsuleGeometry args={[0.3, 1.2, 32, 32]} />
                    <meshStandardMaterial color="#eee" roughness={0.4} />
                </mesh>

                {/* Inner Black Faceplate */}
                <mesh position={[0, -0.2, 0.21]}>
                    <boxGeometry args={[1.6, 0.8, 0.05]} />
                    <meshStandardMaterial color="#111" roughness={0.7} />
                </mesh>

                {/* Touchpad */}
                <mesh position={[0, 0.2, 0.22]}>
                    <boxGeometry args={[0.8, 0.5, 0.02]} />
                    <meshStandardMaterial color="#333" roughness={0.9} />
                </mesh>

                {/* LED Glow under Touchpad */}
                <mesh position={[0, 0.46, 0.21]}>
                    <boxGeometry args={[0.8, 0.02, 0.02]} />
                    <meshBasicMaterial color="#0055ff" /> {/* PS Blue Glow */}
                </mesh>

                {/* Directional Pad (Left) */}
                <group position={[-0.6, 0.2, 0.22]}>
                    <mesh><boxGeometry args={[0.3, 0.1, 0.05]} /><meshStandardMaterial color="#333" /></mesh>
                    <mesh><boxGeometry args={[0.1, 0.3, 0.05]} /><meshStandardMaterial color="#333" /></mesh>
                </group>

                {/* Action Buttons (Right) - Transparent Glassy Look */}
                {[[0.15, 0], [-0.15, 0], [0, 0.15], [0, -0.15]].map((pos, i) => (
                    <mesh key={i} position={[0.6 + pos[0], 0.2 + pos[1], 0.22]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
                        <meshPhysicalMaterial color="#fff" transmission={0.8} roughness={0.2} />
                    </mesh>
                ))}

                {/* Analog Sticks (Symmetrical Bottoms) */}
                <mesh position={[-0.4, -0.3, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.15, 0.18, 0.2, 32]} />
                    <meshStandardMaterial color="#222" roughness={0.9} />
                </mesh>
                <mesh position={[0.4, -0.3, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.15, 0.18, 0.2, 32]} />
                    <meshStandardMaterial color="#222" roughness={0.9} />
                </mesh>
            </group>
        </Float>
    );
}

function MidiKeyboard({ position }: { position: [number, number, number] }) {
    // A 25-key synth style layout
    const numKeys = 14;
    const keyWidth = 0.18;
    const keyboardWidth = numKeys * keyWidth;

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5} position={position}>
            <group rotation={[-Math.PI / 6, -Math.PI / 4, Math.PI / 12]}>
                {/* Main Base Chassis */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[keyboardWidth + 1, 0.3, 1.2]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.3} />
                </mesh>

                {/* Pitch / Mod Wheels Panel (Left side) */}
                <mesh position={[-keyboardWidth / 2 - 0.2, 0.1, 0.2]}>
                    <boxGeometry args={[0.4, 0.2, 0.6]} />
                    <meshStandardMaterial color="#222" />
                </mesh>

                {/* Pitch Wheel */}
                <mesh position={[-keyboardWidth / 2 - 0.3, 0.2, 0.2]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.08, 32]} />
                    <meshStandardMaterial color="#e63946" /> {/* Red Wheel */}
                </mesh>

                {/* Mod Wheel */}
                <mesh position={[-keyboardWidth / 2 - 0.1, 0.2, 0.2]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.08, 32]} />
                    <meshStandardMaterial color="#333" />
                </mesh>

                {/* Control Panel (Top edge) */}
                <mesh position={[0, 0.15, -0.4]}>
                    <boxGeometry args={[keyboardWidth + 0.8, 0.2, 0.3]} />
                    <meshStandardMaterial color="#111" />
                </mesh>

                {/* LED Screen */}
                <mesh position={[-0.5, 0.26, -0.4]}>
                    <boxGeometry args={[0.6, 0.02, 0.15]} />
                    <meshBasicMaterial color="#fce883" /> {/* Glowing Yellow Display */}
                </mesh>

                {/* Knobs */}
                {[0.2, 0.5, 0.8, 1.1].map((x, i) => (
                    <mesh key={i} position={[x, 0.25, -0.4]}>
                        <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
                        <meshStandardMaterial color="#e63946" />
                    </mesh>
                ))}

                {/* White Keys */}
                {Array.from({ length: numKeys }).map((_, i) => (
                    <mesh key={`white-${i}`} position={[(i * keyWidth) - (keyboardWidth / 2) + (keyWidth / 2), 0.1, 0.2]}>
                        <boxGeometry args={[keyWidth - 0.02, 0.2, 0.8]} />
                        <meshStandardMaterial color="#ffffff" roughness={0.1} />
                    </mesh>
                ))}

                {/* Black Keys (Pattern: 2, 3, 2, 3...) */}
                {Array.from({ length: numKeys - 1 }).map((_, i) => {
                    // Standard piano black key repeating pattern logic
                    const isBlack = [0, 1, 3, 4, 5].includes(i % 7);
                    if (!isBlack) return null;
                    return (
                        <mesh key={`black-${i}`} position={[(i * keyWidth) - (keyboardWidth / 2) + keyWidth, 0.2, 0.05]}>
                            <boxGeometry args={[keyWidth * 0.6, 0.2, 0.5]} />
                            <meshStandardMaterial color="#000000" roughness={0.5} />
                        </mesh>
                    )
                })}
            </group>
        </Float>
    );
}

function PhotorealCodeBrackets({ position }: { position: [number, number, number] }) {
    return (
        <Float speed={3} rotationIntensity={2} floatIntensity={2} position={position}>
            <group>
                {/* We upgrade the toruses to thick, metallic glassy objects representing { } */}
                <mesh position={[-0.6, 0, 0]} rotation={[0, 0, 0]}>
                    <torusGeometry args={[0.6, 0.15, 32, 64, Math.PI]} />
                    <meshPhysicalMaterial color="#fce883" metalness={0.8} roughness={0.1} clearcoat={1} transmission={0.5} />
                </mesh>
                <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI]}>
                    <torusGeometry args={[0.6, 0.15, 32, 64, Math.PI]} />
                    <meshPhysicalMaterial color="#e63946" metalness={0.8} roughness={0.1} clearcoat={1} transmission={0.5} />
                </mesh>
            </group>
        </Float>
    );
}

function DesignerPenVector({ position }: { position: [number, number, number] }) {
    return (
        <Float speed={4} rotationIntensity={2} floatIntensity={1} position={position}>
            <group rotation={[Math.PI / 4, 0, Math.PI / 4]}>
                {/* Apple Pencil / Stylus Body */}
                <mesh position={[0, 1, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 2, 32]} />
                    <meshStandardMaterial color="#fff" metalness={0.2} roughness={0.1} />
                </mesh>
                {/* Stylus Tip */}
                <mesh position={[0, 2.1, 0]}>
                    <coneGeometry args={[0.08, 0.2, 32]} />
                    <meshStandardMaterial color="#555" />
                </mesh>
                {/* Glowing Vector Control Point hovering near the tip */}
                <mesh position={[0, 2.4, 0]}>
                    <boxGeometry args={[0.15, 0.15, 0.15]} />
                    <meshBasicMaterial color="#fce883" />
                </mesh>
                <mesh position={[0, 2.3, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.2]} />
                    <meshBasicMaterial color="#fce883" />
                </mesh>
            </group>
        </Float>
    );
}


export default function PersonalMotifs() {
    const groupRef = useRef<THREE.Group>(null);

    // Smooth, subtle orbit mimicking the user's cursor
    useFrame((state, delta) => {
        if (!groupRef.current) return;
        const targetX = (state.pointer.x * Math.PI) / 8;
        const targetY = (state.pointer.y * Math.PI) / 8;
        groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetX, 3, delta);
        groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -targetY, 3, delta);
    });

    return (
        <group ref={groupRef}>
            {/* 
        High-Fidelity Models distributed organically.
        We scale them down to fit nicely within the viewport without overwhelming the text 
      */}
            <group scale={0.8}>
                <RealisticCamera position={[-3, 2, -1]} />
                <MidiKeyboard position={[0, -2.5, 1]} />
                <PS5Controller position={[3.5, 1.5, -2]} />
                <PhotorealCodeBrackets position={[-4, -1, -3]} />
                <DesignerPenVector position={[2, -1, 3]} />
            </group>

            {/* Cinematic Lighting Setup for the Realistic Materials */}
            <Environment preset="studio" />
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} intensity={2} angle={0.5} penumbra={1} color="#fce883" />
            <spotLight position={[-10, -10, -10]} intensity={1} angle={0.5} penumbra={1} color="#e63946" />
        </group>
    );
}
