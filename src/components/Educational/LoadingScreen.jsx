import React from 'react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 flex items-center justify-center z-50">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <svg className="w-16 h-16 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Eco Warriors</h1>
          <p className="text-green-200 text-lg mb-8">
            Loading Environmental Systems...
          </p>
        </div>

        <div className="w-64 mx-auto mb-8">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 animate-pulse" />
          </div>
          <p className="text-green-300 text-sm mt-2">Initializing ecosystems...</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="bg-black bg-opacity-30 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold mb-2">🌲 Forest Ecosystem</h3>
            <p className="text-green-200 text-sm">Restoring natural habitats</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded-lg p-4">
            <h3 className="text-blue-400 font-semibold mb-2">🌊 Ocean Ecosystem</h3>
            <p className="text-blue-200 text-sm">Protecting marine life</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded-lg p-4">
            <h3 className="text-gray-400 font-semibold mb-2">⛰️ Mountain Ecosystem</h3>
            <p className="text-gray-200 text-sm">Conserving high-altitude environments</p>
          </div>
          <div className="bg-black bg-opacity-30 rounded-lg p-4">
            <h3 className="text-yellow-400 font-semibold mb-2">🏙️ Urban Ecosystem</h3>
            <p className="text-yellow-200 text-sm">Creating sustainable cities</p>
          </div>
        </div>

        <div className="mt-8 text-green-300 text-sm">
          <p>Preparing your environmental adventure...</p>
        </div>
      </div>
    </div>
  );
}