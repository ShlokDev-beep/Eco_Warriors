import React, { useMemo } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function OceanScene() {
  // Ocean floor geometry
  const oceanFloorGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(200, 200, 32, 32);

    // Add underwater terrain variation
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const z = vertices[i + 1];

      // Create underwater trenches and formations
      const trench = Math.sin(x * 0.05) * 3;
      const formation = Math.cos(z * 0.03) * 2;
      const noise = (Math.sin(x * 0.1) + Math.cos(z * 0.1)) * 0.5;

      vertices[i + 2] = trench + formation + noise - 5;
    }

    geometry.computeVertexNormals();
    return geometry;
  }, []);

  return (
    <group>
      {/* Ocean water surface */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200, 64, 64]} />
        <meshStandardMaterial
          color="#006994"
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Ocean floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -10, 0]}
        receiveShadow
      >
        <primitive object={oceanFloorGeometry} />
        <meshStandardMaterial
          color="#4682B4"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Coral reefs */}
      {Array.from({ length: 15 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 15;
        const radius = 20 + Math.random() * 60;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const scale = 0.5 + Math.random() * 1;

        return (
          <group key={`coral-${i}`} position={[x, -5, z]} scale={[scale, scale, scale]}>
            <mesh castShadow receiveShadow>
              <coneGeometry args={[1, 2, 8]} />
              <meshStandardMaterial color="#FF7F50" roughness={0.7} />
            </mesh>
            <mesh position={[0.5, 0.5, 0]} castShadow>
              <sphereGeometry args={[0.3]} />
              <meshStandardMaterial color="#FFA500" roughness={0.6} />
            </mesh>
          </group>
        );
      })}

      {/* Fish */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Float key={`fish-${i}`} speed={2 + Math.random() * 3}>
          <mesh position={[
            (Math.random() - 0.5) * 100,
            -3 - Math.random() * 4,
            (Math.random() - 0.5) * 100
          ]}>
            <cylinderGeometry args={[0.1, 0.2, 1, 8]} />
            <meshStandardMaterial
              color={["#FFD700", "#FF6347", "#00CED1"][i % 3]}
              roughness={0.5}
            />
          </mesh>
        </Float>
      ))}

      {/* Pollution indicator */}
      <group position={[30, -3, 20]}>
        <Float speed={2} rotationIntensity={0.5}>
          <mesh>
            <octahedronGeometry args={[2]} />
            <meshStandardMaterial
              color="#8B4513"
              transparent
              opacity={0.7}
              emissive="#8B4513"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      </group>
    </group>
  );
}