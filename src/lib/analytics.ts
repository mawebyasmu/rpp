// Analytics & Feedback System for Madrasah RPP Wizard

// Analytics Event Types
export type AnalyticsEvent = 
  | 'page_view'
  | 'form_start'
  | 'form_submit'
  | 'download_rpp'
  | 'view_analytics'
  | 'feedback_submit'
  | 'error_occurred'
  | 'donation_click'
  | 'donation_redirect'
  | 'trakteer_embed_loaded'
  | 'donation_guide_viewed';

// Analytics Event Data
export interface AnalyticsEventData {
  event: AnalyticsEvent;
  timestamp: number;
  sessionId: string;
  page: string;
  data?: Record<string, any>;
  userAgent: string;
  screenSize: string;
  language: string;
}

// Feedback Types
export type FeedbackType = 'bug_report' | 'feature_request' | 'general_feedback' | 'rating';

// Feedback Data
export interface FeedbackData {
  type: FeedbackType;
  rating?: number; // 1-5 stars
  title: string;
  description: string;
  contactEmail?: string;
  timestamp: number;
  userAgent: string;
  page: string;
  sessionId: string;
}

// Analytics Configuration
const ANALYTICS_CONFIG = {
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_EVENTS_PER_SESSION: 100,
  STORAGE_KEY: 'madrasah_rpp_analytics',
  FEEDBACK_KEY: 'madrasah_rpp_feedback'
};

// Analytics & Feedback Manager
export class AnalyticsManager {
  private static sessionId: string | null = null;
  private static sessionStartTime: number | null = null;
  private static events: AnalyticsEventData[] = [];
  private static feedback: FeedbackData[] = [];

  // Initialize analytics session
  static initialize(): void {
    if (!ANALYTICS_CONFIG.ENABLE_ANALYTICS) return;

    this.sessionId = this.generateSessionId();
    this.sessionStartTime = Date.now();
    
    // Load existing data
    this.loadStoredData();
    
    // Track initial page view
    this.trackEvent('page_view', { page: window.location.pathname });
    
    console.log('Analytics initialized');
  }

  // Generate unique session ID
  private static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Track analytics event
  static trackEvent(event: AnalyticsEvent, data?: Record<string, any>): void {
    if (!ANALYTICS_CONFIG.ENABLE_ANALYTICS || !this.sessionId) return;

    const eventData: AnalyticsEventData = {
      event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      page: window.location.pathname,
      data,
      userAgent: navigator.userAgent,
      screenSize: `${screen.width}x${screen.height}`,
      language: navigator.language
    };

    this.events.push(eventData);
    this.saveEvents();
    
    console.log('Analytics event tracked:', event, data);
  }

  // Track form submission
  static trackFormSubmission(formData: any): void {
    this.trackEvent('form_submit', {
      mataPelajaran: formData.mataPelajaran,
      jenjang: formData.jenjang,
      kelas: formData.kelas,
      modelPembelajaran: formData.modelPembelajaran,
      hasProfilPelajar: Object.values(formData.profilPelajarPancasila).some(Boolean),
      integrasiTIKCount: formData.integrasiTIK?.length || 0,
      asesmenAutentikCount: formData.asesmenAutentik?.length || 0
    });
  }

  // Track download
  static trackDownload(fileName: string, fileSize: number): void {
    this.trackEvent('download_rpp', {
      fileName,
      fileSize,
      fileType: 'docx'
    });
  }

  // Track error
  static trackError(error: Error, context?: string): void {
    this.trackEvent('error_occurred', {
      errorMessage: error.message,
      errorStack: error.stack,
      context
    });
  }

  // Submit feedback
  static submitFeedback(feedback: Omit<FeedbackData, 'timestamp' | 'userAgent' | 'page' | 'sessionId'>): void {
    if (!this.sessionId) return;

    const feedbackData: FeedbackData = {
      ...feedback,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      page: window.location.pathname,
      sessionId: this.sessionId
    };

    this.feedback.push(feedbackData);
    this.saveFeedback();
    
    console.log('Feedback submitted:', feedback);
  }

  // Get analytics summary
  static getAnalyticsSummary(): any {
    const now = Date.now();
    const sessionDuration = this.sessionStartTime ? now - this.sessionStartTime : 0;

    const eventCounts = this.events.reduce((acc, event) => {
      acc[event.event] = (acc[event.event] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const popularMataPelajaran = this.events
      .filter(e => e.event === 'form_submit' && e.data?.mataPelajaran)
      .reduce((acc, event) => {
        const mp = event.data!.mataPelajaran;
        acc[mp] = (acc[mp] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return {
      sessionId: this.sessionId,
      sessionDuration,
      totalEvents: this.events.length,
      eventCounts,
      popularMataPelajaran,
      feedbackCount: this.feedback.length,
      lastActivity: this.events.length > 0 ? this.events[this.events.length - 1].timestamp : null
    };
  }

  // Get user behavior insights
  static getUserInsights(): any {
    const formSubmissions = this.events.filter(e => e.event === 'form_submit');
    const downloads = this.events.filter(e => e.event === 'download_rpp');
    const analyticsViews = this.events.filter(e => e.event === 'view_analytics');

    return {
      totalFormSubmissions: formSubmissions.length,
      totalDownloads: downloads.length,
      analyticsViews: analyticsViews.length,
      conversionRate: formSubmissions.length > 0 ? (downloads.length / formSubmissions.length) * 100 : 0,
      averageSessionDuration: this.sessionStartTime ? (Date.now() - this.sessionStartTime) / 1000 : 0,
      mostUsedFeatures: this.getMostUsedFeatures(),
      userJourney: this.getUserJourney()
    };
  }

  // Get most used features
  private static getMostUsedFeatures(): Record<string, number> {
    const features: Record<string, number> = {};
    
    this.events.forEach(event => {
      if (event.event === 'form_submit' && event.data) {
        if (event.data.modelPembelajaran) {
          features[`Model ${event.data.modelPembelajaran}`] = (features[`Model ${event.data.modelPembelajaran}`] || 0) + 1;
        }
        if (event.data.integrasiTIKCount > 0) {
          features['Integrasi TIK'] = (features['Integrasi TIK'] || 0) + 1;
        }
        if (event.data.asesmenAutentikCount > 0) {
          features['Asesmen Autentik'] = (features['Asesmen Autentik'] || 0) + 1;
        }
      }
    });

    return features;
  }

  // Get user journey
  private static getUserJourney(): string[] {
    return this.events.map(event => event.event);
  }

  // Save events to storage
  private static saveEvents(): void {
    try {
      const stored = localStorage.getItem(ANALYTICS_CONFIG.STORAGE_KEY);
      const allEvents = stored ? JSON.parse(stored) : [];
      
      // Add new events
      allEvents.push(...this.events);
      
      // Keep only recent events (last 1000)
      const recentEvents = allEvents.slice(-1000);
      
      localStorage.setItem(ANALYTICS_CONFIG.STORAGE_KEY, JSON.stringify(recentEvents));
    } catch (error) {
      console.error('Failed to save analytics events:', error);
    }
  }

  // Save feedback to storage
  private static saveFeedback(): void {
    try {
      const stored = localStorage.getItem(ANALYTICS_CONFIG.FEEDBACK_KEY);
      const allFeedback = stored ? JSON.parse(stored) : [];
      
      allFeedback.push(...this.feedback);
      
      localStorage.setItem(ANALYTICS_CONFIG.FEEDBACK_KEY, JSON.stringify(allFeedback));
    } catch (error) {
      console.error('Failed to save feedback:', error);
    }
  }

  // Load stored data
  private static loadStoredData(): void {
    try {
      const storedEvents = localStorage.getItem(ANALYTICS_CONFIG.STORAGE_KEY);
      const storedFeedback = localStorage.getItem(ANALYTICS_CONFIG.FEEDBACK_KEY);
      
      if (storedEvents) {
        this.events = JSON.parse(storedEvents);
      }
      
      if (storedFeedback) {
        this.feedback = JSON.parse(storedFeedback);
      }
    } catch (error) {
      console.error('Failed to load stored analytics data:', error);
    }
  }

  // Export analytics data
  static exportAnalyticsData(): string {
    const data = {
      summary: this.getAnalyticsSummary(),
      insights: this.getUserInsights(),
      events: this.events,
      feedback: this.feedback,
      exportTimestamp: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  }

  // Clear analytics data
  static clearAnalyticsData(): void {
    this.events = [];
    this.feedback = [];
    localStorage.removeItem(ANALYTICS_CONFIG.STORAGE_KEY);
    localStorage.removeItem(ANALYTICS_CONFIG.FEEDBACK_KEY);
    console.log('Analytics data cleared');
  }
}

// Initialize analytics on app start
if (typeof window !== 'undefined') {
  AnalyticsManager.initialize();
} 