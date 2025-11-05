import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import { GameEngine } from './game/core/GameEngine';
import { useGameStore } from './store/gameStore';
import { MainMenu } from './components/Menus/MainMenu';
import { GameUI } from './components/GameUI/GameUI';
import { LoadingScreen } from './components/Educational/LoadingScreen';

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, loading, playing, paused
  const [currentScene, setCurrentScene] = useState('forest');
  const initializeGame = useGameStore((state) => state.initializeGame);

  useEffect(() => {
    // Initialize game systems
    initializeGame();
  }, [initializeGame]);

  const handleStartGame = () => {
    setGameState('loading');
    // Simulate loading time
    setTimeout(() => {
      setGameState('playing');
    }, 2000);
  };

  const handleSceneChange = (sceneName) => {
    setCurrentScene(sceneName);
  };

  const renderGame = () => (
    <div className="w-full h-full relative">
      {/* Three.js Canvas */}
      <Canvas
        shadows
        camera={{
          position: [0, 10, 20],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        performance={{ min: 0.5, max: 1, debounce: 200 }}
      >
        <Suspense fallback={null}>
          <GameEngine
            currentScene={currentScene}
            onSceneChange={handleSceneChange}
          />

          {/* Development stats (remove in production) */}
          {import.meta.env.DEV && <Stats />}
        </Suspense>
      </Canvas>

      {/* Game UI Overlay */}
      {gameState === 'playing' && (
        <GameUI
          gameState={gameState}
          onSceneChange={handleSceneChange}
          onPause={() => setGameState('paused')}
        />
      )}

      {/* Loading Screen */}
      {gameState === 'loading' && <LoadingScreen />}
    </div>
  );

  return (
    <div className="w-full h-full bg-black">
      {gameState === 'menu' && (
        <MainMenu
          onStartGame={handleStartGame}
          onSettings={() => console.log('Settings clicked')}
          onAbout={() => console.log('About clicked')}
        />
      )}

      {(gameState === 'playing' || gameState === 'loading') && renderGame()}

      {gameState === 'paused' && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="ui-panel">
            <h2 className="ui-panel-header">Game Paused</h2>
            <div className="flex flex-col gap-4">
              <button
                className="btn"
                onClick={() => setGameState('playing')}
              >
                Resume Game
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setGameState('menu')}
              >
                Main Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;