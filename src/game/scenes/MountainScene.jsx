import React, { useMemo } from 'react';
import * as THREE from 'three';

export function MountainScene() {
  // Mountain terrain geometry
  const mountainGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(200, 200, 64, 64);

    // Create mountain peaks and valleys
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const z = vertices[i + 1];

      // Mountain peaks
      const peak1 = Math.max(0, 20 - Math.sqrt(x * x + z * z) * 0.2);
      const peak2 = Math.max(0, 15 - Math.sqrt((x - 30) * (x - 30) + (z - 20) * (z - 20)) * 0.15);
      const peak3 = Math.max(0, 18 - Math.sqrt((x + 25) * (x + 25) + (z + 15) * (z + 15)) * 0.18);

      // Add some noise for realistic terrain
      const noise = (Math.sin(x * 0.1) + Math.cos(z * 0.1)) * 1;

      vertices[i + 2] = peak1 + peak2 + peak3 + noise;
    }

    geometry.computeVertexNormals();
    return geometry;
  }, []);

  return (
    <group>
      {/* Mountain terrain */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -10, 0]}
        receiveShadow
        castShadow
      >
        <primitive object={mountainGeometry} />
        <meshStandardMaterial
          color="#8B7355"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Snow caps on peaks */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -8, 0]}
      >
        <planeGeometry args={[200, 200, 32, 32]} />
        <meshStandardMaterial
          color="#FFFFFF"
          transparent
          opacity={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Pine trees */}
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 30 + Math.random() * 60;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const height = 5 + Math.random() * 10;

        return (
          <group key={`pine-${i}`} position={[x, height / 2 - 5, z]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.3, 0.5, height, 8]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
            <mesh position={[0, height / 2, 0]} castShadow>
              <coneGeometry args={[3, height, 8]} />
              <meshStandardMaterial color="#0F5132" roughness={0.7} />
            </mesh>
          </group>
        );
      })}

      {/* Mountain wildlife */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh
          key={`eagle-${i}`}
          position={[
            (Math.random() - 0.5) * 150,
            10 + Math.random() * 20,
            (Math.random() - 0.5) * 150
          ]}
        >
          <boxGeometry args={[1, 0.2, 2]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} />
        </mesh>
      ))}

      {/* Mining pollution area */}
      <group position={[40, 5, 30]}>
        <mesh>
          <boxGeometry args={[10, 2, 10]} />
          <meshStandardMaterial
            color="#696969"
            roughness={0.8}
            metalness={0.4}
          />
        </mesh>
        {/* Pollution particles */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh
            key={`particle-${i}`}
            position={[
              (Math.random() - 0.5) * 15,
              2 + Math.random() * 10,
              (Math.random() - 0.5) * 15
            ]}
          >
            <sphereGeometry args={[0.2]} />
            <meshStandardMaterial
              color="#808080"
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}