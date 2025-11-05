import React from 'react';
import { useGameStore } from '../../store/gameStore';

export function QuestPanel({ onClose }) {
  const activeQuests = useGameStore((state) => state.activeQuests);
  const completedQuests = useGameStore((state) => state.completedQuests);
  const completeQuest = useGameStore((state) => state.completeQuest);

  // Sample quest data (in a real game, this would come from a quest database)
  const questDatabase = {
    'cleanup-forest-1': {
      title: 'Forest Cleanup',
      description: 'Remove pollution from the forest ecosystem to restore natural habitat.',
      objectives: ['Collect 10 pieces of trash', 'Plant 5 trees', 'Test soil quality'],
      rewards: ['+100 EXP', 'Forest Cleaner Badge', 'Unlock Advanced Tools'],
      ecosystem: 'forest'
    },
    'ocean-restoration-1': {
      title: 'Ocean Restoration',
      description: 'Help restore the coral reef ecosystem by removing pollutants and planting new coral.',
      objectives: ['Clean 3 pollution sources', 'Plant 10 coral fragments', 'Rescue 5 fish'],
      rewards: ['+150 EXP', 'Ocean Guardian Badge', 'Water Purification Kit'],
      ecosystem: 'ocean'
    },
    'mountain-conservation-1': {
      title: 'Mountain Conservation',
      description: 'Protect mountain wildlife habitats from mining pollution.',
      objectives: ['Remove mining waste', 'Install wildlife barriers', 'Monitor air quality'],
      rewards: ['+200 EXP', 'Mountain Protector Badge', 'Air Quality Monitor'],
      ecosystem: 'mountain'
    }
  };

  const activeQuestDetails = activeQuests.map(questId => ({
    id: questId,
    ...questDatabase[questId]
  })).filter(Boolean);

  const completedQuestDetails = completedQuests.map(questId => ({
    id: questId,
    ...questDatabase[questId]
  })).filter(Boolean);

  return (
    <div className="ui-panel max-w-3xl max-h-[80vh] overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-400">Quest Log</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Active Quests */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
          Active Quests ({activeQuests.length})
        </h3>

        <div className="space-y-4 max-h-64 overflow-y-auto">
          {activeQuestDetails.length === 0 ? (
            <p className="text-gray-500">No active quests. Visit NPCs to get new quests!</p>
          ) : (
            activeQuestDetails.map((quest) => (
              <div key={quest.id} className="bg-gray-800 rounded-lg p-4 border border-yellow-400 border-opacity-30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-semibold">{quest.title}</h4>
                  <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded capitalize">
                    {quest.ecosystem}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-3">{quest.description}</p>

                <div className="mb-3">
                  <h5 className="text-green-400 text-sm font-semibold mb-1">Objectives:</h5>
                  <ul className="text-gray-400 text-sm space-y-1">
                    {quest.objectives.map((objective, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-4 h-4 border border-gray-500 rounded mr-2"></span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="text-blue-400 text-sm font-semibold mb-1">Rewards:</h5>
                    <div className="text-gray-400 text-xs space-y-1">
                      {quest.rewards.map((reward, index) => (
                        <div key={index}>• {reward}</div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => completeQuest(quest.id)}
                    className="btn btn-sm bg-green-500 hover:bg-green-600"
                    disabled
                    title="Complete all objectives first"
                  >
                    Complete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Completed Quests */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
          Completed Quests ({completedQuests.length})
        </h3>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {completedQuestDetails.length === 0 ? (
            <p className="text-gray-500">No completed quests yet.</p>
          ) : (
            completedQuestDetails.map((quest) => (
              <div key={quest.id} className="bg-gray-800 rounded-lg p-3 opacity-75">
                <div className="flex justify-between items-center">
                  <h4 className="text-gray-400 font-medium">{quest.title}</h4>
                  <span className="text-green-400 text-sm">✓ Completed</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">{quest.description}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-600 flex justify-end">
        <button
          onClick={onClose}
          className="btn btn-primary"
        >
          Close Quest Log
        </button>
      </div>
    </div>
  );
}