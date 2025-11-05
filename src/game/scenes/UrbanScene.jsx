import React, { useMemo } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function UrbanScene() {
  // City street grid
  const buildings = useMemo(() => {
    const buildingData = [];
    const gridSize = 5;
    const blockSize = 20;

    for (let x = -2; x <= 2; x++) {
      for (let z = -2; z <= 2; z++) {
        if (Math.random() > 0.3) { // 70% chance of building
          const height = 10 + Math.random() * 40;
          const width = 8 + Math.random() * 8;
          const depth = 8 + Math.random() * 8;

          buildingData.push({
            position: [x * blockSize, height / 2, z * blockSize],
            dimensions: [width, height, depth],
            color: ['#708090', '#778899', '#B0C4DE', '#696969'][Math.floor(Math.random() * 4)]
          });
        }
      }
    }

    return buildingData;
  }, []);

  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color="#2F4F4F"
          roughness={0.8}
        />
      </mesh>

      {/* Streets */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <planeGeometry args={[10, 200]} />
        <meshStandardMaterial color="#1C1C1C" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <planeGeometry args={[200, 10]} />
        <meshStandardMaterial color="#1C1C1C" roughness={0.9} />
      </mesh>

      {/* Buildings */}
      {buildings.map((building, index) => (
        <group key={index} position={building.position}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={building.dimensions} />
            <meshStandardMaterial
              color={building.color}
              roughness={0.7}
              metalness={0.2}
            />
          </mesh>

          {/* Windows */}
          {Array.from({ length: Math.floor(building.dimensions[1] / 5) }).map((_, floor) => (
            <group key={`floor-${floor}`} position={[0, -building.dimensions[1] / 2 + floor * 5 + 2, 0]}>
              {Array.from({ length: 3 }).map((_, window) => (
                <mesh
                  key={`window-${window}`}
                  position={[
                    -building.dimensions[0] / 3 + window * building.dimensions[0] / 3,
                    0,
                    building.dimensions[2] / 2 + 0.1
                  ]}
                >
                  <planeGeometry args={[1, 1]} />
                  <meshStandardMaterial
                    color={Math.random() > 0.3 ? "#FFFF00" : "#1C1C1C"}
                    emissive={Math.random() > 0.3 ? "#FFFF00" : "#000000"}
                    emissiveIntensity={0.2}
                  />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      ))}

      {/* Green roofs / gardens */}
      {Array.from({ length: 8 }).map((_, i) => {
        const building = buildings[i % buildings.length];
        return (
          <group
            key={`greenroof-${i}`}
            position={[building.position[0], building.dimensions[1] / 2 + 0.1, building.position[2]]}
          >
            <mesh>
              <planeGeometry args={[building.dimensions[0] * 0.8, building.dimensions[2] * 0.8]} />
              <meshStandardMaterial color="#228B22" roughness={0.8} />
            </mesh>
            {/* Plants on roof */}
            {Array.from({ length: 5 }).map((_, plant) => (
              <mesh
                key={`plant-${plant}`}
                position={[
                  (Math.random() - 0.5) * building.dimensions[0] * 0.6,
                  0.5,
                  (Math.random() - 0.5) * building.dimensions[2] * 0.6
                ]}
                castShadow
              >
                <cylinderGeometry args={[0.2, 0.3, 1, 6]} />
                <meshStandardMaterial color="#228B22" roughness={0.7} />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Air pollution particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={`pollution-${i}`} speed={0.5 + Math.random()}>
          <mesh
            position={[
              (Math.random() - 0.5) * 100,
              5 + Math.random() * 30,
              (Math.random() - 0.5) * 100
            ]}
          >
            <sphereGeometry args={[0.5 + Math.random()]} />
            <meshStandardMaterial
              color="#A9A9A9"
              transparent
              opacity={0.3}
              roughness={0.9}
            />
          </mesh>
        </Float>
      ))}

      {/* Vehicles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group
          key={`vehicle-${i}`}
          position={[
            (Math.random() - 0.5) * 80,
            0,
            (Math.random() - 0.5) * 80
          ]}
        >
          <mesh castShadow>
            <boxGeometry args={[2, 0.8, 4]} />
            <meshStandardMaterial
              color={["#FF0000", "#0000FF", "#FFFF00", "#00FF00"][i % 4]}
              roughness={0.6}
              metalness={0.4}
            />
          </mesh>
          <mesh position={[0.6, -0.2, 1.2]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.8} />
          </mesh>
          <mesh position={[-0.6, -0.2, 1.2]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.8} />
          </mesh>
          <mesh position={[0.6, -0.2, -1.2]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.8} />
          </mesh>
          <mesh position={[-0.6, -0.2, -1.2]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Waste bins */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={`bin-${i}`}
          position={[
            (Math.random() - 0.5) * 150,
            0,
            (Math.random() - 0.5) * 150
          ]}
          castShadow
        >
          <cylinderGeometry args={[0.5, 0.4, 1, 8]} />
          <meshStandardMaterial color="#228B22" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}