class PerformanceOptimizer {
  constructor() {
    this.fps = 60;
    this.frameCount = 0;
    this.lastFpsUpdate = 0;
    this.qualitySettings = {
      particles: true,
      shadows: true,
      antialiasing: true,
      lod: true
    };
    this.performanceStats = {
      drawCalls: 0,
      triangles: 0,
      memory: 0,
      deltaTime: 0
    };
    this.isLowEndDevice = false;
    this.adaptiveQuality = true;
  }

  static getInstance() {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Initialize performance monitoring
  initialize(renderer) {
    this.renderer = renderer;
    this.detectDeviceCapabilities();
    this.setupPerformanceMonitoring();
  }

  // Detect device capabilities and adjust settings
  detectDeviceCapabilities() {
    // Check for low-end devices
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
      console.warn('WebGL not supported');
      this.isLowEndDevice = true;
      return;
    }

    // Get renderer info
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Check memory constraints
    const deviceMemory = navigator.deviceMemory || 4;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    // Determine if this is a low-end device
    this.isLowEndDevice = isMobile || deviceMemory < 4 || hardwareConcurrency < 4;

    // Adjust quality settings based on device
    if (this.isLowEndDevice) {
      this.qualitySettings = {
        particles: false,
        shadows: false,
        antialiasing: false,
        lod: true
      };
    }

    console.log('Device Performance Level:', this.isLowEndDevice ? 'Low' : 'High');
  }

  // Setup performance monitoring
  setupPerformanceMonitoring() {
    if (!this.renderer) return;

    // Monitor frame rate
    this.fpsInterval = setInterval(() => {
      this.updateFPS();
    }, 1000);
  }

  // Update FPS counter
  updateFPS() {
    this.fps = this.frameCount;
    this.frameCount = 0;

    // Adaptive quality based on FPS
    if (this.adaptiveQuality) {
      this.adjustQualityBasedOnPerformance();
    }

    // Log performance warnings
    if (this.fps < 30) {
      console.warn(`Low FPS detected: ${this.fps}`);
    }
  }

  // Adjust quality settings based on performance
  adjustQualityBasedOnPerformance() {
    if (this.fps < 25 && !this.isLowEndDevice) {
      // Reduce quality
      this.reduceQuality();
    } else if (this.fps > 50 && this.isLowEndDevice) {
      // Increase quality if possible
      this.increaseQuality();
    }
  }

  // Reduce quality settings
  reduceQuality() {
    if (this.qualitySettings.particles) {
      this.qualitySettings.particles = false;
      console.log('Disabling particles for performance');
      return;
    }

    if (this.qualitySettings.shadows) {
      this.qualitySettings.shadows = false;
      if (this.renderer) {
        this.renderer.shadowMap.enabled = false;
      }
      console.log('Disabling shadows for performance');
      return;
    }

    if (this.qualitySettings.antialiasing) {
      this.qualitySettings.antialiasing = false;
      console.log('Disabling antialiasing for performance');
    }
  }

  // Increase quality settings
  increaseQuality() {
    if (!this.qualitySettings.antialiasing) {
      this.qualitySettings.antialiasing = true;
      console.log('Enabling antialiasing');
      return;
    }

    if (!this.qualitySettings.shadows) {
      this.qualitySettings.shadows = true;
      if (this.renderer) {
        this.renderer.shadowMap.enabled = true;
      }
      console.log('Enabling shadows');
      return;
    }

    if (!this.qualitySettings.particles) {
      this.qualitySettings.particles = true;
      console.log('Enabling particles');
    }
  }

  // Calculate Level of Detail (LOD) based on distance
  calculateLOD(distance) {
    if (!this.qualitySettings.lod) return 1.0;

    if (distance < 10) return 1.0; // High detail
    if (distance < 30) return 0.7; // Medium detail
    if (distance < 60) return 0.4; // Low detail
    return 0.2; // Very low detail
  }

  // Optimize geometry based on LOD
  optimizeGeometry(geometry, lodLevel) {
    if (!geometry.isBufferGeometry || lodLevel >= 1.0) return geometry;

    // Create a simplified version for lower LOD
    const simplified = geometry.clone();
    const vertices = simplified.attributes.position.array;
    const originalCount = vertices.length / 3;
    const targetCount = Math.floor(originalCount * lodLevel);

    if (targetCount < originalCount) {
      // Simple decimation (in a real implementation, use proper mesh simplification)
      const step = Math.floor(originalCount / targetCount);
      const newVertices = new Float32Array(targetCount * 3);

      for (let i = 0; i < targetCount; i++) {
        const sourceIndex = i * step * 3;
        const targetIndex = i * 3;

        newVertices[targetIndex] = vertices[sourceIndex];
        newVertices[targetIndex + 1] = vertices[sourceIndex + 1];
        newVertices[targetIndex + 2] = vertices[sourceIndex + 2];
      }

      simplified.setAttribute('position', new THREE.BufferAttribute(newVertices, 3));
      simplified.computeVertexNormals();
    }

    return simplified;
  }

  // Optimize texture based on quality settings
  optimizeTexture(texture) {
    if (!texture) return texture;

    // Reduce texture resolution for low-end devices
    if (this.isLowEndDevice && texture.image) {
      const maxSize = 512;
      if (texture.image.width > maxSize || texture.image.height > maxSize) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = Math.min(texture.image.width, maxSize);
        canvas.height = Math.min(texture.image.height, maxSize);

        ctx.drawImage(texture.image, 0, 0, canvas.width, canvas.height);

        const newTexture = new THREE.CanvasTexture(canvas);
        newTexture.wrapS = texture.wrapS;
        newTexture.wrapT = texture.wrapT;
        newTexture.magFilter = texture.magFilter;
        newTexture.minFilter = texture.minFilter;

        return newTexture;
      }
    }

    return texture;
  }

  // Update performance stats
  update(deltaTime) {
    this.frameCount++;
    this.performanceStats.deltaTime = deltaTime;

    // Update memory usage if available
    if (performance.memory) {
      this.performanceStats.memory = performance.memory.usedJSHeapSize / 1048576; // MB
    }

    // Update renderer stats if available
    if (this.renderer && this.renderer.info) {
      this.performanceStats.drawCalls = this.renderer.info.render.calls;
      this.performanceStats.triangles = this.renderer.info.render.triangles;
    }
  }

  // Get current performance metrics
  getPerformanceMetrics() {
    return {
      fps: this.fps,
      memory: this.performanceStats.memory,
      drawCalls: this.performanceStats.drawCalls,
      triangles: this.performanceStats.triangles,
      deltaTime: this.performanceStats.deltaTime,
      qualitySettings: { ...this.qualitySettings },
      isLowEndDevice: this.isLowEndDevice
    };
  }

  // Enable/disable adaptive quality
  setAdaptiveQuality(enabled) {
    this.adaptiveQuality = enabled;
  }

  // Manual quality override
  setQualitySettings(settings) {
    this.qualitySettings = { ...this.qualitySettings, ...settings };

    // Apply renderer settings
    if (this.renderer) {
      this.renderer.shadowMap.enabled = this.qualitySettings.shadows;
      this.renderer.setPixelRatio(this.qualitySettings.antialiasing ? window.devicePixelRatio : 1);
    }
  }

  // Cleanup method
  cleanup() {
    if (this.fpsInterval) {
      clearInterval(this.fpsInterval);
    }
  }
}

// Export singleton instance
const performanceOptimizerInstance = PerformanceOptimizer.getInstance();

export { performanceOptimizerInstance as PerformanceOptimizer };
export default PerformanceOptimizer;