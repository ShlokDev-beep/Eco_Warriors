import React, { useState } from 'react';
import { useGameStore, usePlayerStore } from '../../store/gameStore';

export function MainMenu({ onStartGame, onSettings, onAbout }) {
  const [isLoading, setIsLoading] = useState(false);
  const playerName = usePlayerStore((state) => state.playerName);
  const playerLevel = useGameStore((state) => state.playerLevel);
  const completedQuests = useGameStore((state) => state.completedQuests.length);
  const ecosystemHealth = useGameStore((state) => state.ecosystemHealth);

  const handleStartGame = async () => {
    setIsLoading(true);

    // Simulate loading game assets
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    onStartGame();
  };

  const getEcosystemStatus = (health) => {
    if (health > 80) return { color: '#2ecc71', text: 'Thriving' };
    if (health > 60) return { color: '#27ae60', text: 'Healthy' };
    if (health > 40) return { color: '#f39c12', text: 'At Risk' };
    if (health > 20) return { color: '#e67e22', text: 'Endangered' };
    return { color: '#e74c3c', text: 'Critical' };
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-900 via-green-800 to-blue-900 flex items-center justify-center">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500 rounded-full opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500 rounded-full opacity-10 animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-500 rounded-full opacity-10 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-4">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Eco Warriors
          </h1>
          <h2 className="text-2xl text-green-200 mb-2">
            Rise of the Guardians
          </h2>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Protect ecosystems from pollution, invasive species, and climate change in this immersive 3D environmental adventure
          </p>
        </div>

        {/* Main Menu Options */}
        <div className="flex flex-col items-center space-y-4 mb-12">
          <button
            onClick={handleStartGame}
            disabled={isLoading}
            className={`btn text-lg px-8 py-4 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 ${
              isLoading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading Environmental Systems...
              </span>
            ) : (
              <span className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start Adventure
              </span>
            )}
          </button>

          <div className="flex space-x-4">
            <button
              onClick={onSettings}
              className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </span>
            </button>

            <button
              onClick={onAbout}
              className="btn bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About
              </span>
            </button>
          </div>
        </div>

        {/* Player Stats Panel */}
        <div className="ui-panel max-w-2xl mx-auto">
          <h3 className="ui-panel-header text-center mb-6">Environmental Guardian Profile</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Player Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">{playerName}</p>
                  <p className="text-green-400 text-sm">Level {playerLevel} Guardian</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-300">Quests Completed</span>
                <span className="text-green-400 font-bold">{completedQuests}</span>
              </div>
            </div>

            {/* Ecosystem Status */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold mb-3">Ecosystem Status</h4>

              {Object.entries(ecosystemHealth).map(([ecosystem, health]) => {
                const status = getEcosystemStatus(health);
                return (
                  <div key={ecosystem} className="flex justify-between items-center">
                    <span className="text-gray-300 capitalize">{ecosystem}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${health}%`,
                            backgroundColor: status.color
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: status.color }}
                      >
                        {status.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-gray-600">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-400">
                  {Math.round(Object.values(ecosystemHealth).reduce((a, b) => a + b, 0) / 4)}%
                </p>
                <p className="text-xs text-gray-400">Overall Health</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">4</p>
                <p className="text-xs text-gray-400">Ecosystems</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400">{playerLevel}</p>
                <p className="text-xs text-gray-400">Guardian Level</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-green-200 text-sm">
            An educational 3D adventure promoting environmental awareness
          </p>
          <p className="text-green-300 text-xs mt-2">
            Version 1.0.0 | Made with ❤️ for the planet
          </p>
        </div>
      </div>
    </div>
  );
}