import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

export function ForestScene() {
  const terrainRef = useRef();
  const treeGroupRef = useRef();

  // Generate terrain geometry
  const terrainGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(200, 200, 64, 64);

    // Add height variation for hills and valleys
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const z = vertices[i + 1];

      // Create hills using multiple sine waves
      const hill1 = Math.sin(x * 0.02) * 5;
      const hill2 = Math.cos(z * 0.03) * 3;
      const noise = (Math.sin(x * 0.1) + Math.cos(z * 0.1)) * 0.5;

      vertices[i + 2] = hill1 + hill2 + noise;
    }

    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Generate tree positions
  const treePositions = useMemo(() => {
    const positions = [];
    const treeCount = 100;

    for (let i = 0; i < treeCount; i++) {
      const angle = (Math.PI * 2 * i) / treeCount + Math.random() * 0.5;
      const radius = 10 + Math.random() * 80;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const scale = 0.8 + Math.random() * 0.6;

      positions.push({ x, z, scale });
    }

    return positions;
  }, []);

  // Tree component
  const Tree = ({ position, scale }) => {
    return (
      <group position={[position.x, 0, position.z]} scale={[scale, scale, scale]}>
        {/* Tree trunk */}
        <mesh position={[0, 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.5, 4, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>

        {/* Tree foliage (multiple layers) */}
        <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
          <coneGeometry args={[2, 3, 8]} />
          <meshStandardMaterial color="#228B22" roughness={0.7} />
        </mesh>

        <mesh position={[0, 6, 0]} castShadow receiveShadow>
          <coneGeometry args={[1.5, 2.5, 8]} />
          <meshStandardMaterial color="#2E7D32" roughness={0.7} />
        </mesh>
      </group>
    );
  };

  // Animated environmental elements
  useFrame((state) => {
    if (treeGroupRef.current) {
      // Gentle swaying animation for trees
      treeGroupRef.current.children.forEach((tree, index) => {
        if (tree.children[1]) {
          const swayAmount = Math.sin(state.clock.elapsedTime + index * 0.5) * 0.02;
          tree.rotation.z = swayAmount;
        }
      });
    }
  });

  return (
    <group>
      {/* Terrain */}
      <mesh
        ref={terrainRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        receiveShadow
      >
        <primitive object={terrainGeometry} />
        <meshStandardMaterial
          color="#3A5F0B"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Forest floor decoration */}
      <group position={[0, -1.9, 0]}>
        {/* Grass patches */}
        {Array.from({ length: 50 }).map((_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 90;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          return (
            <mesh key={`grass-${i}`} position={[x, 0, z]} castShadow>
              <planeGeometry args={[2, 2]} />
              <meshStandardMaterial
                color="#4CAF50"
                transparent
                opacity={0.7}
                roughness={1}
              />
            </mesh>
          );
        })}

        {/* Rocks */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 80;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const scale = 0.3 + Math.random() * 0.7;

          return (
            <mesh key={`rock-${i}`} position={[x, 0, z]} scale={[scale, scale * 0.5, scale]} castShadow>
              <dodecahedronGeometry args={[0.5]} />
              <meshStandardMaterial
                color="#808080"
                roughness={0.9}
                metalness={0.1}
              />
            </mesh>
          );
        })}
      </group>

      {/* Trees */}
      <group ref={treeGroupRef}>
        {treePositions.map((pos, index) => (
          <Tree key={index} position={pos} scale={pos.scale} />
        ))}
      </group>

      {/* Environmental Features */}

      {/* River */}
      <mesh position={[0, -1.5, -30]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 5]} />
        <meshStandardMaterial
          color="#4FC3F7"
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Pollution indicators (visible in polluted areas) */}
      <group position={[30, 2, 20]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh>
            <octahedronGeometry args={[1]} />
            <meshStandardMaterial
              color="#FF6B6B"
              transparent
              opacity={0.6}
              emissive="#FF6B6B"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
        <Text
          position={[0, 2, 0]}
          fontSize={0.5}
          color="#FF6B6B"
          anchorX="center"
          anchorY="middle"
        >
          Pollution Source
        </Text>
      </group>

      {/* Interactive Elements */}

      {/* Tree sapling for planting */}
      <group position={[-20, -1.5, 10]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.2, 1, 6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow>
          <coneGeometry args={[0.3, 0.8, 6]} />
          <meshStandardMaterial color="#66BB6A" roughness={0.7} />
        </mesh>
      </group>

      {/* Educational marker */}
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[15, 1, -15]}>
          <boxGeometry args={[1, 1, 0.1]} />
          <meshStandardMaterial
            color="#FFC107"
            emissive="#FFC107"
            emissiveIntensity={0.3}
          />
        </mesh>
        <Text
          position={[15, 1.5, -15]}
          fontSize={0.3}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          Educational Point
        </Text>
      </Float>

      {/* Ambient wildlife */}
      {Array.from({ length: 5 }).map((_, i) => {
        const time = Date.now() * 0.001;
        const x = Math.sin(time * 0.3 + i * 2) * 40;
        const z = Math.cos(time * 0.2 + i * 3) * 40;

        return (
          <Float key={`butterfly-${i}`} position={[x, 5 + Math.sin(time * 2 + i) * 2, z]} speed={5}>
            <mesh>
              <coneGeometry args={[0.1, 0.3, 3]} />
              <meshStandardMaterial
                color="#FFD700"
                transparent
                opacity={0.8}
                emissive="#FFD700"
                emissiveIntensity={0.1}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}