# Eco Warriors: Rise of the Guardians

A 3D environmental game where players protect ecosystems from pollution, invasive species, and climate change through exploration, quests, crafting, and multiplayer collaboration, incorporating real-world environmental education.

## 🌍 Game Overview

Players take on the role of eco-warriors in a vibrant, open-world environment representing various ecosystems (forests, oceans, mountains, and urban areas). The objective is to protect these environments from environmental threats through engaging gameplay and educational content.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Modern web browser with WebGL support

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

The game will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 🎮 Features Implemented

### ✅ Core Systems
- **Three.js 3D Engine** with React integration
- **Player Controller** with physics-based movement (WASD + Mouse)
- **4 Distinct Ecosystems**: Forest, Ocean, Mountain, Urban
- **Environmental Simulation** with pollution spread and ecosystem health
- **Game State Management** using Zustand with persistence
- **Performance Optimization** with adaptive quality settings

### ✅ User Interface
- **Main Menu** with player stats and ecosystem status
- **In-Game HUD** with real-time metrics and minimap
- **Inventory System** with materials, tools, and items
- **Quest System** with active and completed quests
- **Settings Menu** for graphics, audio, and controls
- **Educational Popups** for environmental content

### ✅ Technical Features
- **Progressive Web App (PWA)** support
- **Responsive Design** for desktop and mobile
- **Real-time Audio Management** with procedural environmental sounds
- **Performance Monitoring** with automatic quality adjustment
- **Save System** using localStorage for game progress

## 🎯 Gameplay Elements

### Ecosystem Management
- **Forest**: Tree planting, pollution cleanup, wildlife protection
- **Ocean**: Coral restoration, water purification, marine conservation
- **Mountain**: Mining pollution cleanup, wildlife corridor protection
- **Urban**: Green roof installation, air quality improvement, waste management

### Environmental Mechanics
- **Pollution Spread**: Realistic cellular automata simulation
- **Ecosystem Health**: Dynamic health metrics affecting visuals
- **Restoration Activities**: Interactive cleanup and restoration tasks
- **Educational Content**: Real-world environmental facts and data

## 🏗️ Project Structure

```
src/
├── components/          # React UI components
│   ├── GameUI/         # In-game interface (HUD, Inventory, etc.)
│   ├── Menus/          # Main menu, settings
│   └── Educational/    # Educational content popups
├── game/               # Three.js game engine
│   ├── core/           # Game engine initialization
│   ├── scenes/         # Ecosystem scenes (Forest, Ocean, etc.)
│   ├── systems/        # Game logic (Player, Environment, etc.)
│   └── utils/          # Utility classes (Audio, Performance)
├── services/           # API and data services
├── store/              # State management (Zustand)
└── assets/             # 3D models, textures, sounds, data
```

## 🛠️ Technology Stack

- **Frontend**: React 19 + Three.js v0.181 + React Three Fiber v9.4
- **Physics**: React Three Rapier v2.2
- **Build Tool**: Vite v7.2 with optimized chunking
- **State Management**: Zustand v5.0.8 with persistence
- **Styling**: CSS with custom design system
- **Audio**: Web Audio API with procedural sound generation
- **Performance**: Adaptive quality optimization with LOD system
- **PWA**: Progressive Web App with offline caching

## 🎮 Controls

- **WASD/Arrow Keys**: Movement
- **Mouse**: Look around (click to lock pointer)
- **Space**: Jump
- **Shift**: Run
- **E**: Interact with objects
- **Tab**: Quick menu
- **I**: Inventory
- **J**: Quest log
- **M**: Map
- **ESC**: Pause game

## 🌱 Educational Content

The game incorporates real-world environmental facts and challenges:
- **Scientific Accuracy**: Partner-reviewed environmental data
- **Curriculum Alignment**: Educational standards compliance
- **Real-World Impact**: Connections to actual conservation efforts
- **Age-Appropriate**: Content suitable for all ages

## 🔧 Development Notes

### Performance Considerations
- Automatic quality adjustment based on device capabilities
- Level of Detail (LOD) system for 3D models
- Efficient asset loading and memory management
- Mobile-optimized rendering pipeline

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers with WebGL support

## 🚧 Future Development

This implementation represents Phase 1 of the development plan. Planned features include:

- **Multiplayer System**: Real-time collaborative gameplay
- **Advanced Crafting**: Tool upgrade trees and recipes
- **NPC System**: Characters with dialogue trees
- **Audio System**: Music and comprehensive sound effects
- **Educational Partnerships**: Integration with environmental organizations

## 🤝 Contributing

This is a demonstration implementation of the Eco Warriors concept. The codebase showcases:

- Modern React + Three.js architecture
- Performance optimization techniques
- Educational game design patterns
- Progressive web app development

## 📄 License

This project is created for educational and demonstration purposes.

## 📝 Changelog

### Version 0.1.1 - Latest Updates (2025-11-05)

#### 🚀 Major Dependency Updates
- **React**: Upgraded from 18.2.0 → 19.2.0
  - Removed `React.StrictMode` (deprecated in React 19)
  - Updated main.jsx to use new createRoot API
  - Improved performance and developer experience
- **Three.js**: Upgraded from 0.158.0 → 0.181.0
  - Latest rendering optimizations and bug fixes
  - Enhanced WebGL performance and compatibility
- **React Three Fiber**: Upgraded from 8.15.11 → 9.4.0
  - Improved hooks and rendering pipeline
  - Better performance for complex 3D scenes
- **React Three Drei**: Upgraded from 9.88.13 → 10.7.6
  - New utility components and helpers
  - Enhanced accessibility and performance
- **Zustand**: Upgraded from 4.4.7 → 5.0.8
  - Improved state management performance
  - Enhanced TypeScript support
- **Vite**: Upgraded from 5.0.8 → 7.2.0
  - Faster development server and builds
  - Enhanced optimization and plugin system

#### ⚡ Performance Improvements
- **Enhanced Build Configuration**:
  - Optimized code splitting for better loading performance
  - Improved chunking strategy for 3D assets
  - Better dependency optimization
- **PWA Enhancements**:
  - Improved caching strategies for 3D assets
  - Better offline support
  - Enhanced service worker configuration

#### 🛠️ Code Quality
- Updated configuration files for latest versions
- Improved development experience with hot module replacement
- Better error handling and debugging capabilities
- Enhanced TypeScript support (where applicable)

#### 🔧 Technical Improvements
- **React 19 Compatibility**: Updated all React patterns to work with the latest version
- **Modern Build Pipeline**: Leveraging latest Vite features for optimal performance
- **Better Asset Management**: Improved handling of 3D models and textures
- **Enhanced Development Tools**: Better debugging and development workflow

---

## 🙏 Acknowledgments

Built with the latest modern web technologies (React 19, Three.js 0.181, Vite 7.2) to promote environmental awareness and education through interactive gaming.