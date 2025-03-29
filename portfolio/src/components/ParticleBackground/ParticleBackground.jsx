import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const ParticleSystem = ({ mouse }) => {
  const particlesRef = useRef();

  // Generate particle positions and colors
  const particles = useMemo(() => {
    const positions = [];
    const colors = [];
    for (let i = 0; i < 500; i++) { // Increase particle count
      positions.push((Math.random() - 0.5) * 300); // X
      positions.push((Math.random() - 0.5) * 300); // Y
      positions.push((Math.random() - 0.5) * 300); // Z

      // Random colors (ensure correct length)
      colors.push(Math.random()); // R
      colors.push(Math.random()); // G
      colors.push(Math.random()); // B
    }

    console.log('Positions:', positions.length, 'Colors:', colors.length); // Debugging

    return {
      positions: new THREE.Float32BufferAttribute(positions, 3),
      colors: new THREE.Float32BufferAttribute(colors, 3),
    };
  }, []);

  // Rotate particles dynamically
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001; // Continuous rotation
      particlesRef.current.rotation.x = mouse.current.y * 0.001; // Rotate based on mouse Y
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" {...particles.positions} />
        <bufferAttribute attach="attributes-color" {...particles.colors} />
      </bufferGeometry>
      <pointsMaterial
        size={2.0} // Smaller particles
        vertexColors={true} // Enable per-particle colors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const ParticleBackground = () => {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    mouse.current.x = event.clientX - window.innerWidth / 1.7;
    mouse.current.y = event.clientY - window.innerHeight / 1.7;
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
        background: '#000', // Solid background for testing
      }}
      onMouseMove={handleMouseMove}
    >
      <Canvas className="w-full h-full" camera={{ position: [0, 0, 800], fov: 75 }}>
        <Stars
          radius={300}
          depth={100}
          count={1000}
          factor={7}
          saturation={0.5}
          fade
          speed={2}
        />
        <ParticleSystem mouse={mouse} />
      </Canvas>
    </div>
  );
};