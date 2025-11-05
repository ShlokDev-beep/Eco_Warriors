import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';

export function SettingsMenu({ onClose }) {
  const settings = useGameStore((state) => state.settings);
  const updateSettings = useGameStore((state) => state.updateSettings);

  const [activeTab, setActiveTab] = useState('graphics');

  const handleSettingChange = (category, setting, value) => {
    updateSettings(category, setting, value);
  };

  const tabs = [
    { id: 'graphics', name: 'Graphics', icon: '🎨' },
    { id: 'audio', name: 'Audio', icon: '🔊' },
    { id: 'controls', name: 'Controls', icon: '🎮' }
  ];

  return (
    <div className="ui-panel max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-400">Settings</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Settings Tabs */}
      <div className="flex space-x-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="space-y-4">
        {activeTab === 'graphics' && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Graphics Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-white">Quality</label>
                <select
                  value={settings.graphics.quality}
                  onChange={(e) => handleSettingChange('graphics', 'quality', e.target.value)}
                  className="bg-gray-700 text-white px-3 py-2 rounded"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="ultra">Ultra</option>
                </select>
              </div>

              <div className="flex justify-between items-center">
                <label className="text-white">Shadows</label>
                <button
                  onClick={() => handleSettingChange('graphics', 'shadows', !settings.graphics.shadows)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    settings.graphics.shadows ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.graphics.shadows ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <label className="text-white">Anti-aliasing</label>
                <button
                  onClick={() => handleSettingChange('graphics', 'antialiasing', !settings.graphics.antialiasing)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    settings.graphics.antialiasing ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.graphics.antialiasing ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <label className="text-white">Particles</label>
                <button
                  onClick={() => handleSettingChange('graphics', 'particles', !settings.graphics.particles)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    settings.graphics.particles ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.graphics.particles ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audio' && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Audio Settings</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white">Master Volume</label>
                  <span className="text-gray-400">{Math.round(settings.audio.masterVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.audio.masterVolume}
                  onChange={(e) => handleSettingChange('audio', 'masterVolume', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white">Music Volume</label>
                  <span className="text-gray-400">{Math.round(settings.audio.musicVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.audio.musicVolume}
                  onChange={(e) => handleSettingChange('audio', 'musicVolume', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white">SFX Volume</label>
                  <span className="text-gray-400">{Math.round(settings.audio.sfxVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.audio.sfxVolume}
                  onChange={(e) => handleSettingChange('audio', 'sfxVolume', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white">Voice Volume</label>
                  <span className="text-gray-400">{Math.round(settings.audio.voiceVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.audio.voiceVolume}
                  onChange={(e) => handleSettingChange('audio', 'voiceVolume', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'controls' && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Control Settings</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white">Mouse Sensitivity</label>
                  <span className="text-gray-400">{settings.controls.mouseSensitivity.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={settings.controls.mouseSensitivity}
                  onChange={(e) => handleSettingChange('controls', 'mouseSensitivity', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="text-white">Invert Y-Axis</label>
                <button
                  onClick={() => handleSettingChange('controls', 'invertY', !settings.controls.invertY)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    settings.controls.invertY ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.controls.invertY ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Default Controls</h4>
                <div className="text-gray-400 text-sm space-y-1">
                  <div>W/A/S/D - Move</div>
                  <div>Mouse - Look Around</div>
                  <div>Space - Jump</div>
                  <div>Shift - Run</div>
                  <div>E - Interact</div>
                  <div>Tab - Quick Menu</div>
                  <div>I - Inventory</div>
                  <div>J - Quest Log</div>
                  <div>M - Map</div>
                  <div>ESC - Pause</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-600 flex justify-between">
        <button
          onClick={() => {
            // Reset to default settings
            console.log('Reset settings to default');
          }}
          className="btn btn-outline"
        >
          Reset to Default
        </button>
        <button
          onClick={onClose}
          className="btn btn-primary"
        >
          Apply & Close
        </button>
      </div>
    </div>
  );
}