import React, { useState, useEffect } from 'react';
import { useGameStore, useUIStore } from '../../store/gameStore';
import { HUD } from './HUD';
import { Inventory } from './Inventory';
import { QuestPanel } from './QuestPanel';
import { EcoHealthBar } from './EcoHealthBar';
import { SettingsMenu } from '../Menus/SettingsMenu';
import { EducationalPopup } from '../Educational/EducationalPopup';

export function GameUI({ gameState, onSceneChange, onPause }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const showInventory = useUIStore((state) => state.showInventory);
  const showQuestLog = useUIStore((state) => state.showQuestLog);
  const showEducationalContent = useUIStore((state) => state.showEducationalContent);
  const notifications = useUIStore((state) => state.notifications);
  const removeNotification = useUIStore((state) => state.removeNotification);

  const currentScene = useGameStore((state) => state.currentScene);
  const playerPosition = useGameStore((state) => state.playerPosition);
  const ecosystemHealth = useGameStore((state) => state.ecosystemHealth[currentScene]);
  const pollutionLevel = useGameStore((state) => state.pollutionLevels[currentScene]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key.toLowerCase()) {
        case 'escape':
          if (gameState === 'playing') {
            onPause();
          } else if (gameState === 'paused') {
            onPause(); // Resume
          }
          break;
        case 'i':
          if (gameState === 'playing') {
            useUIStore.getState().toggleInventory();
          }
          break;
        case 'j':
          if (gameState === 'playing') {
            useUIStore.getState().toggleQuestLog();
          }
          break;
        case 'm':
          if (gameState === 'playing') {
            useUIStore.getState().toggleMap();
          }
          break;
        case 'tab':
          event.preventDefault();
          setIsMenuOpen(!isMenuOpen);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, isMenuOpen, onPause]);

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);

      return () => clearTimeout(timer);
    });
  }, [notifications, removeNotification]);

  if (gameState !== 'playing') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* HUD - Always visible */}
      <div className="pointer-events-auto">
        <HUD
          playerPosition={playerPosition}
          currentScene={currentScene}
          onPause={onPause}
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Ecosystem Health Bar */}
      <div className="pointer-events-auto">
        <EcoHealthBar
          ecosystemHealth={ecosystemHealth}
          pollutionLevel={pollutionLevel}
          ecosystem={currentScene}
        />
      </div>

      {/* Quick Menu */}
      {isMenuOpen && (
        <div className="pointer-events-auto absolute top-20 right-4">
          <div className="ui-panel">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  useUIStore.getState().toggleInventory();
                  setIsMenuOpen(false);
                }}
                className="btn btn-outline"
              >
                Inventory (I)
              </button>
              <button
                onClick={() => {
                  useUIStore.getState().toggleQuestLog();
                  setIsMenuOpen(false);
                }}
                className="btn btn-outline"
              >
                Quests (J)
              </button>
              <button
                onClick={() => {
                  useUIStore.getState().toggleMap();
                  setIsMenuOpen(false);
                }}
                className="btn btn-outline"
              >
                Map (M)
              </button>
              <button
                onClick={() => {
                  setShowSettings(true);
                  setIsMenuOpen(false);
                }}
                className="btn btn-outline"
              >
                Settings
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onPause();
                }}
                className="btn btn-secondary"
              >
                Pause (ESC)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scene Switcher */}
      <div className="pointer-events-auto absolute bottom-4 left-4">
        <div className="ui-panel">
          <h4 className="text-white font-semibold mb-3">Travel to Ecosystem</h4>
          <div className="grid grid-cols-2 gap-2">
            {['forest', 'ocean', 'mountain', 'urban'].map((scene) => (
              <button
                key={scene}
                onClick={() => onSceneChange(scene)}
                className={`btn px-3 py-2 text-sm capitalize ${
                  currentScene === scene
                    ? 'bg-green-500 text-white'
                    : 'btn-outline'
                }`}
              >
                {scene}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Modal */}
      {showInventory && (
        <div className="pointer-events-auto fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Inventory onClose={() => useUIStore.getState().toggleInventory()} />
        </div>
      )}

      {/* Quest Log Modal */}
      {showQuestLog && (
        <div className="pointer-events-auto fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <QuestPanel onClose={() => useUIStore.getState().toggleQuestLog()} />
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="pointer-events-auto fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <SettingsMenu onClose={() => setShowSettings(false)} />
        </div>
      )}

      {/* Educational Content Popup */}
      {showEducationalContent && (
        <div className="pointer-events-auto fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <EducationalPopup
            content={showEducationalContent}
            onClose={() => useUIStore.getState().hideEducationalContent()}
          />
        </div>
      )}

      {/* Notifications */}
      <div className="pointer-events-auto absolute top-20 left-1/2 transform -translate-x-1/2 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`ui-panel p-4 fade-in ${
              notification.type === 'error' ? 'border-red-500' :
              notification.type === 'warning' ? 'border-yellow-500' :
              notification.type === 'success' ? 'border-green-500' :
              'border-blue-500'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {notification.type === 'error' && (
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {notification.type === 'warning' && (
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
                {notification.type === 'success' && (
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {notification.type === 'info' && (
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">{notification.title}</p>
                <p className="text-gray-300 text-sm">{notification.message}</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Controls Help */}
      <div className="pointer-events-none absolute bottom-4 right-4">
        <div className="ui-panel pointer-events-auto opacity-75 hover:opacity-100 transition-opacity">
          <h4 className="text-white font-semibold mb-2">Quick Controls</h4>
          <div className="text-xs text-gray-300 space-y-1">
            <div>WASD/Arrows - Move</div>
            <div>Mouse - Look Around</div>
            <div>Space - Jump</div>
            <div>Shift - Run</div>
            <div>Tab - Quick Menu</div>
            <div>ESC - Pause</div>
          </div>
        </div>
      </div>
    </div>
  );
}