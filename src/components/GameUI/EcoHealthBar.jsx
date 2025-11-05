import React from 'react';

export function EcoHealthBar({ ecosystemHealth, pollutionLevel, ecosystem }) {
  const getHealthColor = (health) => {
    if (health > 80) return '#2ecc71';
    if (health > 60) return '#27ae60';
    if (health > 40) return '#f39c12';
    if (health > 20) return '#e67e22';
    return '#e74c3c';
  };

  const getPollutionColor = (pollution) => {
    if (pollution < 20) return '#3498db';
    if (pollution < 40) return '#9b59b6';
    if (pollution < 60) return '#e67e22';
    if (pollution < 80) return '#e74c3c';
    return '#8b0000';
  };

  const getHealthStatus = (health) => {
    if (health > 80) return 'Thriving';
    if (health > 60) return 'Healthy';
    if (health > 40) return 'At Risk';
    if (health > 20) return 'Endangered';
    return 'Critical';
  };

  const getPollutionStatus = (pollution) => {
    if (pollution < 20) return 'Clean';
    if (pollution < 40) return 'Light';
    if (pollution < 60) return 'Moderate';
    if (pollution < 80) return 'Heavy';
    return 'Severe';
  };

  const getEcosystemIcon = (ecosystem) => {
    switch (ecosystem) {
      case 'forest': return '🌲';
      case 'ocean': return '🌊';
      case 'mountain': return '⛰️';
      case 'urban': return '🏙️';
      default: return '🌍';
    }
  };

  return (
    <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-40">
      <div className="ui-panel">
        <div className="flex items-center space-x-4">
          {/* Ecosystem Icon */}
          <div className="text-3xl">{getEcosystemIcon(ecosystem)}</div>

          <div className="flex-1 space-y-3">
            {/* Ecosystem Name */}
            <div className="text-center">
              <h3 className="text-white font-bold text-lg capitalize">{ecosystem}</h3>
            </div>

            {/* Health Bar */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-green-400 text-sm font-semibold">Ecosystem Health</span>
                <span className="text-white text-sm font-bold">{ecosystemHealth}%</span>
              </div>
              <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500 relative"
                  style={{
                    width: `${ecosystemHealth}%`,
                    backgroundColor: getHealthColor(ecosystemHealth)
                  }}
                >
                  <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
                </div>
              </div>
              <div className="text-right">
                <span
                  className="text-xs font-semibold"
                  style={{ color: getHealthColor(ecosystemHealth) }}
                >
                  {getHealthStatus(ecosystemHealth)}
                </span>
              </div>
            </div>

            {/* Pollution Bar */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-orange-400 text-sm font-semibold">Pollution Level</span>
                <span className="text-white text-sm font-bold">{pollutionLevel}%</span>
              </div>
              <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500 relative"
                  style={{
                    width: `${pollutionLevel}%`,
                    backgroundColor: getPollutionColor(pollutionLevel)
                  }}
                >
                  {pollutionLevel > 50 && (
                    <div className="absolute inset-0 bg-red-500 opacity-30 animate-pulse" />
                  )}
                </div>
              </div>
              <div className="text-right">
                <span
                  className="text-xs font-semibold"
                  style={{ color: getPollutionColor(pollutionLevel) }}
                >
                  {getPollutionStatus(pollutionLevel)}
                </span>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500"
              style={{
                borderColor: ecosystemHealth > 50 ? getHealthColor(ecosystemHealth) : getPollutionColor(pollutionLevel),
                backgroundColor: ecosystemHealth > 50 ? `${getHealthColor(ecosystemHealth)}20` : `${getPollutionColor(pollutionLevel)}20`
              }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: ecosystemHealth > 50 ? getHealthColor(ecosystemHealth) : getPollutionColor(pollutionLevel) }}>
                  {ecosystemHealth > pollutionLevel ? '✓' : '⚠'}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <span className={`text-xs font-semibold ${ecosystemHealth > pollutionLevel ? 'text-green-400' : 'text-orange-400'}`}>
                {ecosystemHealth > pollutionLevel ? 'Stable' : 'Needs Help'}
              </span>
            </div>
          </div>
        </div>

        {/* Environmental Alert */}
        {pollutionLevel > 70 && (
          <div className="mt-4 p-2 bg-red-900 bg-opacity-50 border border-red-500 rounded-lg">
            <div className="flex items-center space-x-2 text-red-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm font-semibold">
                Critical pollution levels detected! Immediate action required.
              </span>
            </div>
          </div>
        )}

        {/* Positive Status */}
        {ecosystemHealth > 80 && pollutionLevel < 20 && (
          <div className="mt-4 p-2 bg-green-900 bg-opacity-50 border border-green-500 rounded-lg">
            <div className="flex items-center space-x-2 text-green-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold">
                Excellent ecosystem health! Keep up the great work!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}