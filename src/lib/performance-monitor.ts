export interface PerformanceMetrics {
  loadTime: number;
  generationTime: number;
  memoryUsage: number;
  cpuUsage: number;
  networkRequests: number;
  errors: number;
  userInteractions: number;
}

export interface PerformanceReport {
  timestamp: Date;
  metrics: PerformanceMetrics;
  summary: string;
  recommendations: string[];
  score: number;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics = {
    loadTime: 0,
    generationTime: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    networkRequests: 0,
    errors: 0,
    userInteractions: 0,
  };

  private startTime: number = 0;
  private generationStartTime: number = 0;
  private interactionCount: number = 0;
  private errorCount: number = 0;
  private requestCount: number = 0;

  private constructor() {
    this.initializeMonitoring();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeMonitoring(): void {
    // Monitor page load time
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        this.metrics.loadTime = performance.now();
      });

      // Monitor memory usage
      if ('memory' in performance) {
        setInterval(() => {
          const memory = (performance as any).memory;
          this.metrics.memoryUsage = memory.usedJSHeapSize / memory.totalJSHeapSize * 100;
        }, 5000);
      }

      // Monitor user interactions
      const interactionEvents = ['click', 'input', 'change', 'submit'];
      interactionEvents.forEach(event => {
        document.addEventListener(event, () => {
          this.interactionCount++;
          this.metrics.userInteractions = this.interactionCount;
        });
      });

      // Monitor errors
      window.addEventListener('error', () => {
        this.errorCount++;
        this.metrics.errors = this.errorCount;
      });

      // Monitor network requests
      const originalFetch = window.fetch;
      window.fetch = (...args) => {
        this.requestCount++;
        this.metrics.networkRequests = this.requestCount;
        return originalFetch.apply(window, args);
      };
    }
  }

  startGenerationTimer(): void {
    this.generationStartTime = performance.now();
  }

  endGenerationTimer(): void {
    if (this.generationStartTime > 0) {
      this.metrics.generationTime = performance.now() - this.generationStartTime;
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  generateReport(): PerformanceReport {
    const score = this.calculatePerformanceScore();
    const summary = this.generateSummary();
    const recommendations = this.generateRecommendations();

    return {
      timestamp: new Date(),
      metrics: { ...this.metrics },
      summary,
      recommendations,
      score,
    };
  }

  private calculatePerformanceScore(): number {
    let score = 100;

    // Load time scoring (target: < 3 seconds)
    if (this.metrics.loadTime > 3000) {
      score -= 20;
    } else if (this.metrics.loadTime > 2000) {
      score -= 10;
    }

    // Generation time scoring (target: < 5 seconds)
    if (this.metrics.generationTime > 5000) {
      score -= 25;
    } else if (this.metrics.generationTime > 3000) {
      score -= 15;
    }

    // Memory usage scoring (target: < 80%)
    if (this.metrics.memoryUsage > 80) {
      score -= 20;
    } else if (this.metrics.memoryUsage > 60) {
      score -= 10;
    }

    // Error scoring
    score -= this.metrics.errors * 5;

    // Network requests scoring (target: < 10 requests)
    if (this.metrics.networkRequests > 10) {
      score -= 10;
    }

    return Math.max(0, score);
  }

  private generateSummary(): string {
    const loadTimeStatus = this.metrics.loadTime < 3000 ? 'Good' : 'Needs improvement';
    const generationTimeStatus = this.metrics.generationTime < 5000 ? 'Good' : 'Needs improvement';
    const memoryStatus = this.metrics.memoryUsage < 80 ? 'Good' : 'High usage';
    const errorStatus = this.metrics.errors === 0 ? 'No errors' : `${this.metrics.errors} errors detected`;

    return `Performance Summary: Load time is ${loadTimeStatus}, generation time is ${generationTimeStatus}, memory usage is ${memoryStatus}, ${errorStatus}.`;
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    if (this.metrics.loadTime > 3000) {
      recommendations.push('Optimize initial page load time by reducing bundle size');
    }

    if (this.metrics.generationTime > 5000) {
      recommendations.push('Optimize document generation process for faster results');
    }

    if (this.metrics.memoryUsage > 80) {
      recommendations.push('Monitor memory usage and implement cleanup strategies');
    }

    if (this.metrics.errors > 0) {
      recommendations.push('Address error handling and improve error recovery');
    }

    if (this.metrics.networkRequests > 10) {
      recommendations.push('Optimize network requests and implement caching');
    }

    if (recommendations.length === 0) {
      recommendations.push('Performance is optimal - continue monitoring');
    }

    return recommendations;
  }

  // Performance testing methods
  static async runPerformanceTest(): Promise<PerformanceReport> {
    const monitor = PerformanceMonitor.getInstance();
    
    // Simulate document generation
    monitor.startGenerationTimer();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate generation time
    monitor.endGenerationTimer();

    return monitor.generateReport();
  }

  static async testDocumentGeneration(formData: any): Promise<PerformanceReport> {
    const monitor = PerformanceMonitor.getInstance();
    
    monitor.startGenerationTimer();
    
    // Simulate the actual generation process
    try {
      // This would be the actual document generation call
      await new Promise(resolve => setTimeout(resolve, 1500));
      monitor.endGenerationTimer();
      
      return monitor.generateReport();
    } catch (error) {
      monitor.metrics.errors++;
      monitor.endGenerationTimer();
      return monitor.generateReport();
    }
  }

  // Memory monitoring
  static getMemoryInfo(): { used: number; total: number; percentage: number } {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100,
      };
    }
    return { used: 0, total: 0, percentage: 0 };
  }

  // Network monitoring
  static getNetworkInfo(): { requests: number; errors: number } {
    const monitor = PerformanceMonitor.getInstance();
    return {
      requests: monitor.metrics.networkRequests,
      errors: monitor.metrics.errors,
    };
  }

  // User interaction monitoring
  static getUserInteractionMetrics(): { interactions: number; averagePerMinute: number } {
    const monitor = PerformanceMonitor.getInstance();
    const minutesSinceStart = (Date.now() - monitor.startTime) / 60000;
    
    return {
      interactions: monitor.metrics.userInteractions,
      averagePerMinute: minutesSinceStart > 0 ? monitor.metrics.userInteractions / minutesSinceStart : 0,
    };
  }

  // Reset metrics for new session
  resetMetrics(): void {
    this.metrics = {
      loadTime: 0,
      generationTime: 0,
      memoryUsage: 0,
      cpuUsage: 0,
      networkRequests: 0,
      errors: 0,
      userInteractions: 0,
    };
    this.startTime = Date.now();
    this.interactionCount = 0;
    this.errorCount = 0;
    this.requestCount = 0;
  }
} 