import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky, Stars, Fog } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { ForestScene } from '../scenes/ForestScene';
import { OceanScene } from '../scenes/OceanScene';
import { MountainScene } from '../scenes/MountainScene';
import { UrbanScene } from '../scenes/UrbanScene';
import { PlayerController } from '../systems/PlayerController';
import { EnvironmentalSimulation } from '../systems/EnvironmentalSimulation';
import { AudioManager } from '../utils/AudioManager';
import { PerformanceOptimizer } from '../utils/PerformanceOptimizer';

export function GameEngine({ currentScene, onSceneChange }) {
  const { camera, gl, scene } = useThree();
  const gameEngineRef = useRef({
    lastTime: 0,
    deltaTime: 0,
    frameCount: 0,
    isInitialized: false
  });

  // Scene configuration
  const sceneConfigs = useMemo(() => ({
    forest: {
      component: ForestScene,
      fogColor: '#87CEEB',
      fogNear: 10,
      fogFar: 100,
      skyColor: '#87CEEB',
      sunColor: '#FFD700',
      ambientIntensity: 0.4
    },
    ocean: {
      component: OceanScene,
      fogColor: '#006994',
      fogNear: 5,
      fogFar: 50,
      skyColor: '#006994',
      sunColor: '#87CEEB',
      ambientIntensity: 0.6
    },
    mountain: {
      component: MountainScene,
      fogColor: '#B0C4DE',
      fogNear: 20,
      fogFar: 150,
      skyColor: '#B0C4DE',
      sunColor: '#FFA500',
      ambientIntensity: 0.5
    },
    urban: {
      component: UrbanScene,
      fogColor: '#696969',
      fogNear: 15,
      fogFar: 80,
      skyColor: '#696969',
      sunColor: '#F0E68C',
      ambientIntensity: 0.3
    }
  }), []);

  const currentSceneConfig = sceneConfigs[currentScene];

  // Initialize game engine
  useEffect(() => {
    if (!gameEngineRef.current.isInitialized) {
      console.log(`Initializing Game Engine for scene: ${currentScene}`);

      // Set up renderer
      gl.shadowMap.enabled = true;
      gl.shadowMap.type = THREE.PCFSoftShadowMap;
      gl.toneMapping = THREE.ACESFilmicToneMapping;
      gl.toneMappingExposure = 0.5;

      // Set up camera
      camera.position.set(0, 10, 20);
      camera.lookAt(0, 0, 0);

      // Initialize audio
      AudioManager.init();

      gameEngineRef.current.isInitialized = true;
    }
  }, [currentScene, gl, camera]);

  // Scene change handling
  useEffect(() => {
    console.log(`Changing scene to: ${currentScene}`);

    // Update scene-specific settings
    if (currentSceneConfig) {
      scene.fog = new THREE.Fog(
        currentSceneConfig.fogColor,
        currentSceneConfig.fogNear,
        currentSceneConfig.fogFar
      );
    }

    // Notify parent of scene change
    if (onSceneChange) {
      onSceneChange(currentScene);
    }
  }, [currentScene, currentSceneConfig, scene, onSceneChange]);

  // Game loop
  useFrame((state, delta) => {
    const engine = gameEngineRef.current;

    // Calculate delta time
    engine.deltaTime = delta;
    engine.frameCount++;
    engine.lastTime = state.clock.elapsedTime;

    // Performance monitoring
    PerformanceOptimizer.update(delta);

    // Update audio
    AudioManager.update(delta);

    // Environmental simulation updates
    EnvironmentalSimulation.update(delta, currentScene);
  });

  // Current scene component
  const SceneComponent = currentSceneConfig?.component || ForestScene;

  return (
    <>
      {/* Lighting */}
      <Sky
        distance={450000}
        sunPosition={[100, 20, 100]}
        inclination={0.6}
        azimuth={0.25}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
        rayleigh={0.5}
        turbidity={10}
      />

      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <ambientLight intensity={currentSceneConfig?.ambientIntensity || 0.4} />
      <directionalLight
        position={[50, 50, 25]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={500}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        color={currentSceneConfig?.sunColor || '#FFD700'}
      />

      {/* Scene-specific fog */}
      {currentSceneConfig && (
        <Fog
          attach="fog"
          args={[currentSceneConfig.fogColor, currentSceneConfig.fogNear, currentSceneConfig.fogFar]}
        />
      )}

      {/* Physics World */}
      <Physics
        gravity={[0, -9.81, 0]}
        allowSleep={true}
        defaultContactMaterial={{
          friction: 0.5,
          restitution: 0.3
        }}
      >
        {/* Current Scene */}
        <SceneComponent />

        {/* Player */}
        <PlayerController />
      </Physics>

      {/* Environment Effects */}
      <EnvironmentalSimulation currentScene={currentScene} />
    </>
  );
}