class AudioManager {
  constructor() {
    this.sounds = {};
    this.audioContext = null;
    this.masterVolume = 0.8;
    this.musicVolume = 0.6;
    this.sfxVolume = 0.8;
    this.voiceVolume = 0.7;
    this.currentMusic = null;
    this.isInitialized = false;
  }

  static init() {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  static getInstance() {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  initialize() {
    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Create master gain node
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = this.masterVolume;

      // Create category gain nodes
      this.musicGain = this.audioContext.createGain();
      this.sfxGain = this.audioContext.createGain();
      this.voiceGain = this.audioContext.createGain();

      this.musicGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.voiceGain.connect(this.masterGain);

      this.musicGain.gain.value = this.musicVolume;
      this.sfxGain.gain.value = this.sfxVolume;
      this.voiceGain.gain.value = this.voiceVolume;

      this.isInitialized = true;
      console.log('Audio Manager initialized successfully');
    } catch (error) {
      console.warn('Audio initialization failed:', error);
      this.isInitialized = false;
    }
  }

  // Load a sound file
  async loadSound(name, url) {
    if (!this.isInitialized) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      this.sounds[name] = {
        buffer: audioBuffer,
        source: null,
        gainNode: null
      };

      console.log(`Loaded sound: ${name}`);
    } catch (error) {
      console.warn(`Failed to load sound ${name}:`, error);
    }
  }

  // Play a sound once
  playSound(name, volume = 1.0, loop = false, category = 'sfx') {
    if (!this.isInitialized || !this.sounds[name]) return null;

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = this.sounds[name].buffer;
      source.loop = loop;

      // Connect to appropriate gain node based on category
      gainNode.connect(this.getGainNodeForCategory(category));
      source.connect(gainNode);

      gainNode.gain.value = volume;
      source.start(0);

      // Store reference for stopping later if needed
      const instance = {
        source,
        gainNode,
        stop: () => source.stop(),
        setVolume: (vol) => { gainNode.gain.value = vol; }
      };

      // Handle loop cleanup
      if (!loop) {
        source.onended = () => {
          this.sounds[name].source = null;
        };
      } else {
        this.sounds[name].source = instance;
      }

      return instance;
    } catch (error) {
      console.warn(`Failed to play sound ${name}:`, error);
      return null;
    }
  }

  // Stop a looping sound
  stopSound(name) {
    if (this.sounds[name] && this.sounds[name].source) {
      this.sounds[name].source.stop();
      this.sounds[name].source = null;
    }
  }

  // Play background music
  playMusic(name, fadeTime = 2.0) {
    if (!this.isInitialized) return;

    // Stop current music
    if (this.currentMusic) {
      this.fadeOutMusic(fadeTime);
    }

    // Start new music with fade in
    setTimeout(() => {
      this.currentMusic = this.playSound(name, 0, true, 'music');
      if (this.currentMusic) {
        this.currentMusic.setVolume(0);
        this.fadeInMusic(fadeTime);
      }
    }, fadeTime * 1000);
  }

  // Fade in current music
  fadeInMusic(duration = 2.0) {
    if (!this.currentMusic) return;

    const targetVolume = this.musicVolume;
    const steps = 60;
    const stepDuration = (duration * 1000) / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
      currentStep++;
      const newVolume = Math.min(volumeStep * currentStep, targetVolume);
      this.currentMusic.setVolume(newVolume);

      if (currentStep >= steps) {
        clearInterval(fadeInterval);
      }
    }, stepDuration);
  }

  // Fade out current music
  fadeOutMusic(duration = 2.0) {
    if (!this.currentMusic) return;

    const initialVolume = this.currentMusic.gainNode.gain.value;
    const steps = 60;
    const stepDuration = (duration * 1000) / steps;
    const volumeStep = initialVolume / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
      currentStep++;
      const newVolume = Math.max(initialVolume - (volumeStep * currentStep), 0);
      this.currentMusic.setVolume(newVolume);

      if (currentStep >= steps || newVolume <= 0) {
        clearInterval(fadeInterval);
        this.stopMusic();
      }
    }, stepDuration);
  }

  // Stop all music
  stopMusic() {
    if (this.currentMusic) {
      this.currentMusic.stop();
      this.currentMusic = null;
    }
  }

  // Set volume for categories
  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain) {
      this.masterGain.gain.value = this.masterVolume;
    }
  }

  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.musicGain) {
      this.musicGain.gain.value = this.musicVolume;
    }
  }

  setSfxVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    if (this.sfxGain) {
      this.sfxGain.gain.value = this.sfxVolume;
    }
  }

  setVoiceVolume(volume) {
    this.voiceVolume = Math.max(0, Math.min(1, volume));
    if (this.voiceGain) {
      this.voiceGain.gain.value = this.voiceVolume;
    }
  }

  // Get appropriate gain node for sound category
  getGainNodeForCategory(category) {
    switch (category) {
      case 'music': return this.musicGain;
      case 'sfx': return this.sfxGain;
      case 'voice': return this.voiceGain;
      default: return this.sfxGain;
    }
  }

  // Generate procedural sounds (for environmental effects)
  generateEnvironmentalSound(type) {
    if (!this.isInitialized) return null;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      gainNode.connect(this.sfxGain);

      switch (type) {
        case 'wind':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(
            100 + Math.random() * 200,
            this.audioContext.currentTime
          );
          gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
          break;
        case 'water':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(
            50 + Math.random() * 100,
            this.audioContext.currentTime
          );
          gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
          break;
        case 'forest':
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(
            200 + Math.random() * 300,
            this.audioContext.currentTime
          );
          gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
          break;
        default:
          return null;
      }

      oscillator.connect(gainNode);
      oscillator.start();

      return {
        stop: () => oscillator.stop(),
        setVolume: (vol) => { gainNode.gain.setValueAtTime(vol, this.audioContext.currentTime); }
      };
    } catch (error) {
      console.warn(`Failed to generate environmental sound ${type}:`, error);
      return null;
    }
  }

  // Update method for game loop
  update(deltaTime) {
    // Update any dynamic audio effects here
    // For example: position-based audio, dynamic music changes, etc.
  }

  // Cleanup method
  cleanup() {
    if (this.currentMusic) {
      this.stopMusic();
    }

    Object.keys(this.sounds).forEach(name => {
      if (this.sounds[name].source) {
        this.sounds[name].source.stop();
      }
    });

    if (this.audioContext) {
      this.audioContext.close();
    }

    this.isInitialized = false;
  }
}

// Export singleton instance
const audioManagerInstance = AudioManager.getInstance();

export { audioManagerInstance as AudioManager };
export default AudioManager;