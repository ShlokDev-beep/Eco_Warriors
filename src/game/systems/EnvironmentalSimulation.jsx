import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../../store/gameStore';
import * as THREE from 'three';

export function EnvironmentalSimulation({ currentScene }) {
  const simulationRef = useRef({
    lastUpdate: 0,
    updateInterval: 1.0, // Update every second
    pollutionSpreadRate: 0.1,
    restorationRate: 0.05,
    time: 0
  });

  const ecosystemHealth = useGameStore((state) => state.ecosystemHealth[currentScene]);
  const pollutionLevel = useGameStore((state) => state.pollutionLevels[currentScene]);
  const updateEcosystemHealth = useGameStore((state) => state.updateEcosystemHealth);
  const updatePollutionLevel = useGameStore((state) => state.updatePollutionLevel);

  // Pollution particles for visualization
  const pollutionParticles = useMemo(() => {
    const particles = [];
    const particleCount = Math.floor(pollutionLevel * 2);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          Math.random() * 20,
          (Math.random() - 0.5) * 100
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          Math.random() * 0.2,
          (Math.random() - 0.5) * 0.5
        ),
        size: 0.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.4
      });
    }

    return particles;
  }, [pollutionLevel]);

  // Environmental effects based on ecosystem health
  useFrame((state, delta) => {
    const simulation = simulationRef.current;
    simulation.time += delta;

    // Update simulation at intervals
    if (simulation.time - simulation.lastUpdate > simulation.updateInterval) {
      updateEnvironmentalState();
      simulation.lastUpdate = simulation.time;
    }

    // Update particle positions
    pollutionParticles.forEach(particle => {
      particle.position.add(particle.velocity.clone().multiplyScalar(delta));
      particle.position.y += Math.sin(state.clock.elapsedTime + particle.position.x) * 0.01;

      // Wrap particles around bounds
      if (Math.abs(particle.position.x) > 50) particle.position.x *= -0.9;
      if (Math.abs(particle.position.z) > 50) particle.position.z *= -0.9;
      if (particle.position.y > 25) particle.position.y = 0;
      if (particle.position.y < 0) particle.position.y = 25;
    });
  });

  // Update environmental state based on pollution and restoration
  const updateEnvironmentalState = () => {
    // Pollution spread simulation (cellular automata inspired)
    let newPollutionLevel = pollutionLevel;
    let newEcosystemHealth = ecosystemHealth;

    // Pollution naturally spreads and degrades
    newPollutionLevel += simulationRef.current.pollutionSpreadRate * (pollutionLevel / 100);

    // Ecosystem health decreases with pollution
    if (pollutionLevel > 50) {
      newEcosystemHealth -= 0.5;
    } else if (pollutionLevel > 30) {
      newEcosystemHealth -= 0.2;
    }

    // Natural restoration (very slow)
    if (pollutionLevel < 20) {
      newEcosystemHealth += simulationRef.current.restorationRate;
      newPollutionLevel -= simulationRef.current.restorationRate;
    }

    // Apply bounds
    newPollutionLevel = Math.max(0, Math.min(100, newPollutionLevel));
    newEcosystemHealth = Math.max(0, Math.min(100, newEcosystemHealth));

    // Update store
    updatePollutionLevel(currentScene, newPollutionLevel);
    updateEcosystemHealth(currentScene, newEcosystemHealth);
  };

  // Get sky color based on ecosystem health
  const getSkyColor = () => {
    if (ecosystemHealth > 80) return '#87CEEB'; // Healthy sky blue
    if (ecosystemHealth > 60) return '#9ACD32'; // Light green
    if (ecosystemHealth > 40) return '#DAA520'; // Golden yellow
    if (ecosystemHealth > 20) return '#FF8C00'; // Dark orange
    return '#696969'; // Smoggy gray
  };

  // Get fog color based on pollution
  const getFogColor = () => {
    if (pollutionLevel < 20) return '#E0F2F1'; // Clear
    if (pollutionLevel < 40) return '#B2DFDB'; // Light haze
    if (pollutionLevel < 60) return '#80CBC4'; // Moderate haze
    if (pollutionLevel < 80) return '#4DB6AC'; // Heavy haze
    return '#26A69A'; // Severe pollution
  };

  return (
    <group>
      {/* Environmental fog effect */}
      <fog attach="fog" args={[getFogColor(), 10, 100 - pollutionLevel * 0.5]} />

      {/* Pollution particles */}
      {pollutionParticles.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <sphereGeometry args={[particle.size]} />
          <meshStandardMaterial
            color={pollutionLevel > 60 ? "#8B4513" : "#A9A9A9"}
            transparent
            opacity={particle.opacity}
            emissive={pollutionLevel > 80 ? "#FF0000" : "none"}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}

      {/* Ground pollution indicators */}
      {pollutionLevel > 30 && Array.from({ length: Math.floor(pollutionLevel / 10) }).map((_, i) => (
        <group
          key={`ground-pollution-${i}`}
          position={[
            (Math.random() - 0.5) * 80,
            -1.8,
            (Math.random() - 0.5) * 80
          ]}
        >
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1, 3, 8]} />
            <meshStandardMaterial
              color="#8B4513"
              transparent
              opacity={0.3}
              emissive="#8B4513"
              emissiveIntensity={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Environmental restoration indicators */}
      {ecosystemHealth > 70 && Array.from({ length: Math.floor(ecosystemHealth / 20) }).map((_, i) => (
        <group
          key={`restoration-${i}`}
          position={[
            (Math.random() - 0.5) * 60,
            -1.5,
            (Math.random() - 0.5) * 60
          ]}
        >
          <mesh>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial
              color="#00FF00"
              transparent
              opacity={0.6}
              emissive="#00FF00"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Dynamic lighting based on ecosystem health */}
      <directionalLight
        position={[50, 50, 25]}
        intensity={0.5 + (ecosystemHealth / 200)}
        color={getSkyColor()}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Ambient light affected by pollution */}
      <ambientLight
        intensity={0.2 + (ecosystemHealth / 200) - (pollutionLevel / 300)}
        color={pollutionLevel > 50 ? "#8B4513" : "#FFFFFF"}
      />

      {/* Scene-specific environmental effects */}
      {currentScene === 'forest' && <ForestEnvironmentalEffects />}
      {currentScene === 'ocean' && <OceanEnvironmentalEffects />}
      {currentScene === 'mountain' && <MountainEnvironmentalEffects />}
      {currentScene === 'urban' && <UrbanEnvironmentalEffects />}
    </group>
  );
}

// Forest-specific environmental effects
function ForestEnvironmentalEffects() {
  return (
    <group>
      {/* Falling leaves */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={`leaf-${i}`}
          position={[
            (Math.random() - 0.5) * 100,
            10 + Math.random() * 20,
            (Math.random() - 0.5) * 100
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
        >
          <planeGeometry args={[0.5, 0.8]} />
          <meshStandardMaterial color="#228B22" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Ocean-specific environmental effects
function OceanEnvironmentalEffects() {
  return (
    <group>
      {/* Water bubbles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh
          key={`bubble-${i}`}
          position={[
            (Math.random() - 0.5) * 80,
            -5 - Math.random() * 10,
            (Math.random() - 0.5) * 80
          ]}
        >
          <sphereGeometry args={[0.2 + Math.random() * 0.3]} />
          <meshStandardMaterial
            color="#87CEEB"
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Mountain-specific environmental effects
function MountainEnvironmentalEffects() {
  return (
    <group>
      {/* Falling snow */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={`snow-${i}`}
          position={[
            (Math.random() - 0.5) * 120,
            20 + Math.random() * 30,
            (Math.random() - 0.5) * 120
          ]}
        >
          <sphereGeometry args={[0.1 + Math.random() * 0.2]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      ))}
    </group>
  );
}

// Urban-specific environmental effects
function UrbanEnvironmentalEffects() {
  return (
    <group>
      {/* Smog/pollution clouds */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={`smog-${i}`}
          position={[
            (Math.random() - 0.5) * 100,
            15 + Math.random() * 25,
            (Math.random() - 0.5) * 100
          ]}
        >
          <sphereGeometry args={[3 + Math.random() * 5]} />
          <meshStandardMaterial
            color="#696969"
            transparent
            opacity={0.2 + Math.random() * 0.2}
          />
        </mesh>
      ))}
    </group>
  );
}