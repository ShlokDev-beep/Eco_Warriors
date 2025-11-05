import React, { useState, useEffect } from 'react';
import { useGameStore, usePlayerStore } from '../../store/gameStore';

export function HUD({ playerPosition, currentScene, onPause, onMenuToggle }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCrosshair, setShowCrosshair] = useState(true);

  // Player stats from stores
  const playerLevel = useGameStore((state) => state.playerLevel);
  const experience = useGameStore((state) => state.experience);
  const playerStats = useGameStore((state) => state.playerStats);
  const playerName = usePlayerStore((state) => state.playerName);
  const equippedTool = usePlayerStore((state) => state.equippedItems.tool);

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate level progress
  const currentLevelExp = (playerLevel - 1) * 100;
  const nextLevelExp = playerLevel * 100;
  const levelProgress = ((experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;

  // Format position display
  const formatPosition = (pos) => {
    return `${pos[0].toFixed(1)}, ${pos[1].toFixed(1)}, ${pos[2].toFixed(1)}`;
  };

  // Get tool icon based on equipped tool
  const getToolIcon = (tool) => {
    switch (tool) {
      case 'basic-cleaner':
        return '🧹';
      case 'advanced-cleaner':
        return '🧽';
      case 'water-purifier':
        return '💧';
      case 'soil-tester':
        return '🔬';
      case 'seed-planter':
        return '🌱';
      default:
        return '🔧';
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent p-4">
        <div className="flex justify-between items-start">
          {/* Player Info */}
          <div className="flex items-center space-x-4">
            <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {playerLevel}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold">{playerName}</p>
                  <p className="text-green-400 text-xs">Guardian Level {playerLevel}</p>
                </div>
              </div>
            </div>

            {/* Experience Bar */}
            <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <span className="text-yellow-400 text-sm">EXP</span>
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
                <span className="text-white text-xs">
                  {experience}/{nextLevelExp}
                </span>
              </div>
            </div>
          </div>

          {/* Location & Time */}
          <div className="flex items-center space-x-4">
            <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-right">
                <p className="text-white font-semibold capitalize">{currentScene}</p>
                <p className="text-gray-400 text-xs">
                  {formatPosition(playerPosition)}
                </p>
              </div>
            </div>

            <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-right">
                <p className="text-white font-semibold">
                  {currentTime.toLocaleTimeString()}
                </p>
                <p className="text-gray-400 text-xs">
                  {currentTime.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crosshair */}
      {showCrosshair && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-8 h-8 border-2 border-green-400 rounded-full opacity-75">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full" />
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <div className="flex justify-between items-end">
          {/* Quick Stats */}
          <div className="flex items-center space-x-4">
            <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌍</span>
                <div>
                  <p className="text-white text-sm font-semibold">Areas Restored</p>
                  <p className="text-green-400 font-bold">{playerStats.areasRestored}</p>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🧹</span>
                <div>
                  <p className="text-white text-sm font-semibold">Total Cleaned</p>
                  <p className="text-blue-400 font-bold">{playerStats.totalCleaned}</p>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌱</span>
                <div>
                  <p className="text-white text-sm font-semibold">Trees Planted</p>
                  <p className="text-green-400 font-bold">{playerStats.treesPlanted}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tool & Controls */}
          <div className="flex items-center space-x-4">
            {/* Equipped Tool */}
            <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getToolIcon(equippedTool)}</span>
                <div>
                  <p className="text-white text-sm">Equipped</p>
                  <p className="text-gray-400 text-xs capitalize">{equippedTool.replace('-', ' ')}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-2">
              <button
                onClick={onMenuToggle}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-lg p-3 backdrop-blur-sm transition-all"
                title="Quick Menu (Tab)"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <button
                onClick={onPause}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-lg p-3 backdrop-blur-sm transition-all"
                title="Pause (ESC)"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Hints */}
      <div className="absolute top-1/4 left-4 bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm max-w-xs">
        <div className="flex items-center space-x-2 text-green-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">Press E to interact with objects</span>
        </div>
      </div>

      {/* Minimap (placeholder) */}
      <div className="absolute top-20 right-4 bg-black bg-opacity-50 rounded-lg p-2 backdrop-blur-sm">
        <div className="w-32 h-32 border border-green-400 rounded-lg relative overflow-hidden">
          {/* Player position indicator */}
          <div
            className="absolute w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + (playerPosition[0] / 100) * 50}%`,
              top: `${50 - (playerPosition[2] / 100) * 50}%`
            }}
          />
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-green-400" />
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-1">Minimap</p>
      </div>
    </div>
  );
}