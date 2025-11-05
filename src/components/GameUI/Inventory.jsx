import React from 'react';
import { useGameStore } from '../../store/gameStore';

export function Inventory({ onClose }) {
  const inventory = useGameStore((state) => state.inventory);
  const removeFromInventory = useGameStore((state) => state.removeFromInventory);

  const categories = [
    { id: 'materials', name: 'Materials', icon: '🪨' },
    { id: 'tools', name: 'Tools', icon: '🔧' },
    { id: 'items', name: 'Items', icon: '📦' }
  ];

  return (
    <div className="ui-panel max-w-4xl max-h-[80vh] overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-400">Inventory</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </h3>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {Object.entries(inventory[category.id] || {}).length === 0 ? (
                <p className="text-gray-500 text-sm">No items</p>
              ) : (
                Object.entries(inventory[category.id] || {}).map(([item, quantity]) => (
                  <div
                    key={item}
                    className="flex justify-between items-center p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-white capitalize">{item.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 font-semibold">×{quantity}</span>
                      <button
                        onClick={() => removeFromInventory(category.id, item)}
                        className="text-red-400 hover:text-red-300"
                        title="Remove one"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-600">
        <div className="flex justify-between items-center">
          <p className="text-gray-400 text-sm">
            Total Items: {Object.values(inventory).reduce((total, category) =>
              total + Object.values(category).reduce((sum, quantity) => sum + quantity, 0), 0
            )}
          </p>
          <button
            onClick={onClose}
            className="btn btn-primary"
          >
            Close Inventory
          </button>
        </div>
      </div>
    </div>
  );
}