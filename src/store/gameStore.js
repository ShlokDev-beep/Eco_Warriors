import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Game store for managing global game state
export const useGameStore = create(
  persist(
    (set, get) => ({
      // Game State
      gameState: 'menu', // menu, playing, paused, loading
      currentScene: 'forest', // forest, ocean, mountain, urban
      playerPosition: [0, 0, 0],
      playerRotation: [0, 0, 0],

      // Environmental Data
      ecosystemHealth: {
        forest: 75,
        ocean: 60,
        mountain: 80,
        urban: 45
      },

      pollutionLevels: {
        forest: 25,
        ocean: 40,
        mountain: 20,
        urban: 55
      },

      // Player Progress
      playerLevel: 1,
      experience: 0,
      skillPoints: 0,
      completedQuests: [],
      activeQuests: [],
      unlockedRecipes: [],

      // Inventory
      inventory: {
        materials: {},
        tools: [],
        items: []
      },

      // Player Stats
      playerStats: {
        totalCleaned: 0,
        treesPlanted: 0,
        speciesSaved: 0,
        areasRestored: 0,
        playTime: 0
      },

      // Settings
      settings: {
        graphics: {
          quality: 'high', // low, medium, high, ultra
          shadows: true,
          antialiasing: true,
          particles: true
        },
        audio: {
          masterVolume: 0.8,
          musicVolume: 0.6,
          sfxVolume: 0.8,
          voiceVolume: 0.7
        },
        controls: {
          mouseSensitivity: 1.0,
          invertY: false,
          keyBindings: {}
        }
      },

      // Actions
      initializeGame: () => {
        console.log('Initializing game systems...');
        set((state) => ({
          gameState: 'menu',
          currentScene: 'forest',
          playerPosition: [0, 5, 0],
          playerRotation: [0, 0, 0]
        }));
      },

      setGameState: (newState) => set({ gameState: newState }),

      setCurrentScene: (scene) => set({ currentScene: scene }),

      updatePlayerPosition: (position) => set({ playerPosition: position }),

      updatePlayerRotation: (rotation) => set({ playerRotation: rotation }),

      updateEcosystemHealth: (ecosystem, health) => {
        set((state) => ({
          ecosystemHealth: {
            ...state.ecosystemHealth,
            [ecosystem]: Math.max(0, Math.min(100, health))
          }
        }));
      },

      updatePollutionLevel: (ecosystem, pollution) => {
        set((state) => ({
          pollutionLevels: {
            ...state.pollutionLevels,
            [ecosystem]: Math.max(0, Math.min(100, pollution))
          }
        }));
      },

      addExperience: (amount) => {
        set((state) => {
          const newExperience = state.experience + amount;
          const newLevel = Math.floor(newExperience / 100) + 1;
          const newSkillPoints = newLevel > state.playerLevel ?
            state.skillPoints + (newLevel - state.playerLevel) :
            state.skillPoints;

          return {
            experience: newExperience,
            playerLevel: newLevel,
            skillPoints: newSkillPoints
          };
        });
      },

      completeQuest: (questId) => {
        set((state) => ({
          completedQuests: [...state.completedQuests, questId],
          activeQuests: state.activeQuests.filter(id => id !== questId)
        }));
      },

      startQuest: (questId) => {
        set((state) => {
          if (!state.activeQuests.includes(questId) && !state.completedQuests.includes(questId)) {
            return { activeQuests: [...state.activeQuests, questId] };
          }
          return state;
        });
      },

      addToInventory: (type, item, quantity = 1) => {
        set((state) => ({
          inventory: {
            ...state.inventory,
            [type]: {
              ...state.inventory[type],
              [item]: (state.inventory[type][item] || 0) + quantity
            }
          }
        }));
      },

      removeFromInventory: (type, item, quantity = 1) => {
        set((state) => {
          const currentQuantity = state.inventory[type][item] || 0;
          if (currentQuantity <= quantity) {
            const newInventory = { ...state.inventory[type] };
            delete newInventory[item];
            return {
              inventory: {
                ...state.inventory,
                [type]: newInventory
              }
            };
          } else {
            return {
              inventory: {
                ...state.inventory,
                [type]: {
                  ...state.inventory[type],
                  [item]: currentQuantity - quantity
                }
              }
            };
          }
        });
      },

      updatePlayerStats: (stat, value) => {
        set((state) => ({
          playerStats: {
            ...state.playerStats,
            [stat]: state.playerStats[stat] + value
          }
        }));
      },

      updateSettings: (category, setting, value) => {
        set((state) => ({
          settings: {
            ...state.settings,
            [category]: {
              ...state.settings[category],
              [setting]: value
            }
          }
        }));
      },

      // Reset game progress (for new game)
      resetGame: () => {
        set({
          gameState: 'menu',
          currentScene: 'forest',
          playerPosition: [0, 5, 0],
          playerRotation: [0, 0, 0],
          playerLevel: 1,
          experience: 0,
          skillPoints: 0,
          completedQuests: [],
          activeQuests: [],
          unlockedRecipes: [],
          inventory: {
            materials: {},
            tools: [],
            items: []
          },
          playerStats: {
            totalCleaned: 0,
            treesPlanted: 0,
            speciesSaved: 0,
            areasRestored: 0,
            playTime: 0
          }
        });
      }
    }),
    {
      name: 'eco-warriors-save',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these parts of the state
        playerLevel: state.playerLevel,
        experience: state.experience,
        skillPoints: state.skillPoints,
        completedQuests: state.completedQuests,
        activeQuests: state.activeQuests,
        unlockedRecipes: state.unlockedRecipes,
        inventory: state.inventory,
        playerStats: state.playerStats,
        settings: state.settings,
        ecosystemHealth: state.ecosystemHealth,
        pollutionLevels: state.pollutionLevels
      })
    }
  )
);

// Player-specific store for character data
export const usePlayerStore = create((set, get) => ({
  playerName: 'Eco Warrior',
  playerAvatar: {
    gender: 'neutral',
    skinTone: 'medium',
    hairStyle: 'short',
    hairColor: 'brown',
    outfit: 'default'
  },
  equippedItems: {
    tool: 'basic-cleaner',
    suit: 'basic-protection',
    gadget: 'scanner'
  },
  skills: {
    cleaning: 1,
    restoration: 1,
    research: 1,
    communication: 1
  },

  setPlayerName: (name) => set({ playerName: name }),

  updateAvatar: (avatarPart, value) => {
    set((state) => ({
      playerAvatar: {
        ...state.playerAvatar,
        [avatarPart]: value
      }
    }));
  },

  equipItem: (slot, item) => {
    set((state) => ({
      equippedItems: {
        ...state.equippedItems,
        [slot]: item
      }
    }));
  },

  upgradeSkill: (skill) => {
    set((state) => {
      const currentLevel = state.skills[skill];
      if (currentLevel < 5) { // Max level 5
        return {
          skills: {
            ...state.skills,
            [skill]: currentLevel + 1
          }
        };
      }
      return state;
    });
  }
}));

// UI store for managing interface state
export const useUIStore = create((set) => ({
  showInventory: false,
  showQuestLog: false,
  showMap: false,
  showSettings: false,
  showEducationalContent: null,
  notifications: [],

  toggleInventory: () => set((state) => ({ showInventory: !state.showInventory })),
  toggleQuestLog: () => set((state) => ({ showQuestLog: !state.showQuestLog })),
  toggleMap: () => set((state) => ({ showMap: !state.showMap })),
  toggleSettings: () => set((state) => ({ showSettings: !state.showSettings })),

  showEducationalPopup: (content) => set({ showEducationalContent: content }),
  hideEducationalContent: () => set({ showEducationalContent: null }),

  addNotification: (notification) => {
    const id = Date.now() + Math.random();
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }]
    }));
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }));
  },

  clearNotifications: () => set({ notifications: [] })
}));