// src/components/ComicPanel/ComicPanel.tsx
import { useScroll, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

// Extend the Window interface to include the 'group' property
declare global {
  interface Window {
    group: THREE.Group;
  }
}

export default function ComicPanel() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  useEffect(() => {
    if (groupRef.current) {
      window.group = groupRef.current; // Attach to the global window object for debugging
    }
  }, []);

  useFrame(() => {
    if (
      groupRef.current &&
      typeof groupRef.current.updateWorldMatrix === "function"
    ) {
      groupRef.current.updateWorldMatrix(true, true); // Ensure this is only called on a valid THREE.Group
      groupRef.current.rotation.y += 0.01; // Rotate the group
    }
  });
  return (
    <>
    <group ref={groupRef} position={[0, 0, -5]}>
      {/* Comic panel frame */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[8, 10]} />
        <meshBasicMaterial color="#ffeb3b" />
      </mesh>

      {/* Comic content */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[7.5, 9.5]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Add your comic content here */}
      <Text
        position={[0, 2, 0.2]}
        fontSize={0.5}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        font="/assets/comic-font.woff"
      >
        MY STORY
      </Text>
    </group>
    </>
  );
}
