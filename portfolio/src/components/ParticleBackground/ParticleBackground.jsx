import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// Particle System Component
const ParticleSystem = ({ mouse }) => {
  const particlesRef = useRef();

  // Generate particle positions
  const particles = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 50; i++) {
      positions.push((Math.random() - 0.5) * 300); // X
      positions.push((Math.random() - 0.5) * 300); // Y
      positions.push((Math.random() - 0.5) * 300); // Z
    }
    return new THREE.Float32BufferAttribute(positions, 3);
  }, []);

  // Rotate particles based on mouse movement
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = mouse.current.x * 0.001; // Rotate based on X-axis
      particlesRef.current.rotation.x = mouse.current.y * 0.001; // Rotate based on Y-axis
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" {...particles} />
      </bufferGeometry>
      <pointsMaterial
        size={10.0}
        color="#ffffff"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main Component
export const ParticleBackground = () => {
  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse movement
  const handleMouseMove = (event) => {
    mouse.current.x = event.clientX - window.innerWidth / 2; // Center mouse X
    mouse.current.y = event.clientY - window.innerHeight / 2; // Center mouse Y
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: '#000',
      }}
      onMouseMove={handleMouseMove} // Track mouse movement
    >
      <Canvas className="w-full h-full" camera={{ position: [0, 0, 500] }}>
        {/* Stars */}
        <Stars radius={200} depth={80} count={1000} factor={4} saturation={0} fade speed={1} />

        {/* Particle System */}
        <ParticleSystem mouse={mouse} />
      </Canvas>
    </div>
  );
};