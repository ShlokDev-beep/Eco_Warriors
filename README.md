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

## 🙏 Acknowledgments

Built with modern web technologies to promote environmental awareness and education through interactive gaming.