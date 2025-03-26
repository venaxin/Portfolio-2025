// src/components/Avatar/Avatar.tsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Avatar({ theme }: { theme: any }) {
  const avatarRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (avatarRef.current) {
      avatarRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.05;
      avatarRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.5) * 0.1;
    }
  });

  return (
    <group position={[-5, -1, 0]} ref={avatarRef}>
      <mesh position={[0, 0, 0.5]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={theme.secondary}
          emissive={theme.accent}
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.3, 0.1, 1.2]} scale={[0.2, 0.3, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.3, 0.1, 1.2]} scale={[0.2, 0.3, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* Mask */}
      <mesh position={[0, -0.3, 1]} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.2, 32]} />
        <meshStandardMaterial color={theme.primary} />
      </mesh>
    </group>
  );
}