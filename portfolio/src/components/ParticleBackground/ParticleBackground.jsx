import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const Starfield = ({ starColor }) => {
  const starsRef = useRef();
  const direction = new THREE.Vector3(1, -1, 0).normalize();
  const trailPositions = useRef(new Map());

  const { positions, originalPositions, phaseOffsets, twinkleFactors, colors } =
    useMemo(() => {
      const positionsArray = [];
      const colorsArray = [];
      const phaseOffsets = [];
      const twinkleFactors = [];

      for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 1000;
        const y = (Math.random() - 0.5) * 1000;
        const z = (Math.random() - 0.5) * 1000;
        positionsArray.push(x, y, z);
        colorsArray.push(1, 1, 1);
        phaseOffsets.push(Math.random() * Math.PI * 2);
        twinkleFactors.push(0.5 + Math.random() * 1.5);
      }

      return {
        positions: new THREE.Float32BufferAttribute(positionsArray, 3),
        originalPositions: new Float32Array(positionsArray),
        colors: new THREE.Float32BufferAttribute(colorsArray, 3),
        phaseOffsets,
        twinkleFactors,
      };
    }, []);

  const originalPositionsRef = useRef(originalPositions);
  const shootStartTimesRef = useRef(new Float32Array(1000));
  const lastWaveTimeRef = useRef(0);

  useFrame((state) => {
    if (starsRef.current) {
      const time = state.clock.getElapsedTime();
      const delta = state.clock.getDelta();
      const opacityArray = starsRef.current.geometry.attributes.opacity.array;
      const positionsArray =
        starsRef.current.geometry.attributes.position.array;
      const colorsArray = starsRef.current.geometry.attributes.color.array;
      const originalPositions = originalPositionsRef.current;
      const shootStartTimes = shootStartTimesRef.current;

      // Trigger new wave every 3 seconds
      if (time - lastWaveTimeRef.current > 3) {
        const availableIndices = [];
        for (let i = 0; i < 1000; i++) {
          if (shootStartTimes[i] === 0) availableIndices.push(i);
        }

        const starCount = Math.min(20, availableIndices.length);
        for (let i = 0; i < starCount; i++) {
          const idx =
            availableIndices[
              Math.floor(Math.random() * availableIndices.length)
            ];
          shootStartTimes[idx] = time;
          trailPositions.current.set(idx, []);
        }
        lastWaveTimeRef.current = time;
      }

      // Update shooting stars
      for (let i = 0; i < 1000; i++) {
        const i3 = i * 3;
        if (shootStartTimes[i] > 0) {
          const elapsed = time - shootStartTimes[i];
          const duration = 2.5;

          if (elapsed >= duration) {
            // Reset to original position
            positionsArray[i3] = originalPositions[i3];
            positionsArray[i3 + 1] = originalPositions[i3 + 1];
            positionsArray[i3 + 2] = originalPositions[i3 + 2];
            shootStartTimes[i] = 0;
            trailPositions.current.delete(i);

            // Reset appearance
            colorsArray[i3] = 1;
            colorsArray[i3 + 1] = 1;
            colorsArray[i3 + 2] = 1;
            opacityArray[i] = 0.6;
          } else {
            // Store previous positions for trails
            const trails = trailPositions.current.get(i) || [];
            trails.push(
              new THREE.Vector3(
                positionsArray[i3],
                positionsArray[i3 + 1],
                positionsArray[i3 + 2]
              )
            );
            if (trails.length > 10) trails.shift();
            trailPositions.current.set(i, trails);

            // Calculate movement
            const velocity =
              600 * (1 + Math.sin((elapsed / duration) * Math.PI));
            const movement = direction
              .clone()
              .multiplyScalar(velocity * delta)
              .add(
                new THREE.Vector3(
                  Math.random() * 20, // Add slight randomness
                  0,
                  Math.random() * 5
                )
              );

            // Update position
            positionsArray[i3] += movement.x;
            positionsArray[i3 + 1] += movement.y;
            positionsArray[i3 + 2] += movement.z;

            // Color intensity
            const intensity = 1 + Math.sin((elapsed / duration) * Math.PI) * 3;
            colorsArray[i3] = intensity;
            colorsArray[i3 + 1] = intensity * 0.8;
            colorsArray[i3 + 2] = intensity * 0.5;

            // Opacity fade
            opacityArray[i] = Math.min(1.5 - elapsed / duration, 1);
          }
        } else {
          // Normal twinkle effect
          opacityArray[i] =
            0.4 + Math.sin(time * twinkleFactors[i] + phaseOffsets[i]) * 0.4;
        }
      }

      // Update attributes
      starsRef.current.geometry.attributes.opacity.needsUpdate = true;
      starsRef.current.geometry.attributes.position.needsUpdate = true;
      starsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" {...positions} />
        <bufferAttribute
          attach="attributes-opacity"
          array={new Float32Array(1000).fill(0.6)}
          itemSize={1}
        />
        <bufferAttribute attach="attributes-color" {...colors} />
      </bufferGeometry>
      <pointsMaterial
        size={2.5}
        color={starColor}
        transparent
        vertexColors={true}
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={false}
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
        camera={{
          position: [0, 0, 500],
          fov: 75,
          near: 0.1,
          far: 2000,
        }}
      >
        <Starfield starColor={starColor} />
      </Canvas>
    </div>
  );
};
