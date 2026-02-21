import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// A dynamic WebGL background shader that creates a subtle, gritty, slowly moving noise pattern
// This is heavily inspired by the Awwwards webgl_custom_shaders skill
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1; // Deep Black (#0f0f0f)
  uniform vec3 uColor2; // Red Pencil (#e63946)
  uniform vec3 uColor3; // Yellow Avatar (#fce883)
  
  varying vec2 vUv;

  // Generic 2D Perlin Noise Function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 p = vUv * 3.0; // scale
    
    // Slow swirling time
    float t = uTime * 0.1;
    
    // Generate noise layers
    float n1 = snoise(p + t);
    float n2 = snoise(p * 2.0 - t * 0.5);
    
    float noise = (n1 + n2) * 0.5;
    
    // Base color is black
    vec3 finalColor = uColor1;
    
    // Add very subtle, dark hints of the Red and Yellow brand colors where noise peaks
    float threshold = smoothstep(0.2, 0.8, noise);
    finalColor = mix(finalColor, uColor2 * 0.15, threshold);
    
    float threshold2 = smoothstep(0.4, 0.9, snoise(p*1.5 + t));
    finalColor = mix(finalColor, uColor3 * 0.1, threshold2);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function ShaderPlane() {
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#0c0c0c") }, // Very dark grey/black
        uColor2: { value: new THREE.Color("#e63946") }, // Pencil Red
        uColor3: { value: new THREE.Color("#fce883") }  // Sketch Yellow
    }), []);

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh ref={meshRef}>
            {/* 2 is full viewport size in Normalized Device Coordinates */}
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
}

export default function WebGLBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 1] }} // Ortho-like perspective
                gl={{ antialias: false, powerPreference: "high-performance" }} // Optimized config
            >
                <ShaderPlane />
            </Canvas>
        </div>
    );
}
