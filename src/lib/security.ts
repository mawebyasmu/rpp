// Simplified Security utilities for Public Madrasah RPP Wizard

// Environment variables
const APP_NAME = import.meta.env.VITE_APP_NAME || "Madrasah RPP Wizard";
const APP_VERSION = import.meta.env.VITE_APP_VERSION || "1.0.0";
const ENABLE_DEBUG = import.meta.env.VITE_ENABLE_DEBUG_MODE === "true";
const STORAGE_PREFIX = import.meta.env.VITE_STORAGE_PREFIX || "madrasah_rpp_";

// Simplified Security for Public Application
export class SecurityUtils {
  
  // Basic input sanitization for public app
  static sanitizeString(input: string): string {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .substring(0, 1000); // Limit length
  }

  // Validate file size for downloads
  static isValidFileSize(size: number, maxSize: number = 10 * 1024 * 1024): boolean {
    return size > 0 && size <= maxSize;
  }

  // Validate file type for downloads
  static isValidFileType(filename: string, allowedTypes: string[] = ['.docx', '.pdf', '.txt']): boolean {
    if (!filename || typeof filename !== 'string') return false;
    
    const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    return allowedTypes.includes(extension);
  }

  // Sanitize object recursively
  static sanitizeObject<T>(obj: T): T {
    if (typeof obj === 'string') {
      return this.sanitizeString(obj) as T;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item)) as T;
    }
    
    if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = this.sanitizeObject(value);
      }
      return sanitized as T;
    }
    
    return obj;
  }

  // Simple local storage for public app
  static storage = {
    setItem: (key: string, value: string): void => {
      try {
        const secureKey = `${STORAGE_PREFIX}${key}`;
        localStorage.setItem(secureKey, value);
      } catch (error) {
        console.error('Failed to set storage item:', error);
      }
    },

    getItem: (key: string): string | null => {
      try {
        const secureKey = `${STORAGE_PREFIX}${key}`;
        return localStorage.getItem(secureKey);
      } catch (error) {
        console.error('Failed to get storage item:', error);
        return null;
      }
    },

    removeItem: (key: string): void => {
      try {
        const secureKey = `${STORAGE_PREFIX}${key}`;
        localStorage.removeItem(secureKey);
      } catch (error) {
        console.error('Failed to remove storage item:', error);
      }
    },

    clear: (): void => {
      try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith(STORAGE_PREFIX)) {
            localStorage.removeItem(key);
          }
        });
      } catch (error) {
        console.error('Failed to clear storage:', error);
      }
    }
  };

  // Basic rate limiting for public app
  private static rateLimitMap = new Map<string, { count: number; resetTime: number }>();

  static checkRateLimit(key: string, limit: number = 20, windowMs: number = 60000): boolean {
    const now = Date.now();
    const record = this.rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
      this.rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (record.count >= limit) {
      return false;
    }

    record.count++;
    return true;
  }

  // Debug logging (only in development)
  static debugLog(message: string, data?: any): void {
    if (ENABLE_DEBUG) {
      console.log(`[${APP_NAME}] ${message}`, data || '');
    }
  }

  // Error logging
  static errorLog(message: string, error?: any): void {
    console.error(`[${APP_NAME}] ERROR: ${message}`, error || '');
  }

  // Content Security Policy headers for public app
  static getCSPHeaders(): Record<string, string> {
    return {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self'",
        "connect-src 'self'",
        "media-src 'self'",
        "object-src 'none'",
        "frame-src 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ].join('; '),
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };
  }
}

// Export constants
export const SECURITY_CONFIG = {
  APP_NAME,
  APP_VERSION,
  ENABLE_DEBUG,
  STORAGE_PREFIX
}; 