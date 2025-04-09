import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const Starfield = ({ starColor }) => {
  const starsRef = useRef();

  const { positions, phaseOffsets, twinkleFactors } = useMemo(() => {
    const positions = [];
    const phaseOffsets = [];
    const twinkleFactors = [];
    for (let i = 0; i < 1000; i++) {
      positions.push((Math.random() - 0.5) * 800); // X
      positions.push((Math.random() - 0.5) * 800); // Y
      positions.push((Math.random() - 0.5) * 800); // Z
      phaseOffsets.push(Math.random() * Math.PI * 2); // Random phase offset
      twinkleFactors.push(0.5 + Math.random() * 1.5); // Random twinkle amplitude
    }
    return {
      positions: new THREE.Float32BufferAttribute(positions, 3),
      phaseOffsets,
      twinkleFactors,
    };
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      const time = Date.now() * 0.001;
      const opacityArray = starsRef.current.geometry.attributes.opacity.array;

      for (let i = 0; i < phaseOffsets.length; i++) {
        opacityArray[i] =
          0.5 + Math.sin(time * twinkleFactors[i] + phaseOffsets[i]) * 0.5;
      }

      starsRef.current.geometry.attributes.opacity.needsUpdate = true;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" {...positions} />
        <bufferAttribute
          attach="attributes-opacity"
          array={new Float32Array(positions.count).fill(0.8)}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.5}
        color={starColor}
        transparent
        vertexColors={false}
        opacity={1.0}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const ParticleBackground = ({ isInverted }) => {
  const backgroundColor = isInverted ? "#ccc" : "#111";
  const starColor = isInverted ? "#000" : "#fff";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        background: backgroundColor,
      }}
    >
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 800], fov: 75 }}
      >
        <Starfield starColor={starColor} />
      </Canvas>
    </div>
  );
};