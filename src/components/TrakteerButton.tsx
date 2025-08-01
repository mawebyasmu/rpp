import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink, HelpCircle } from "lucide-react";
import { AnalyticsManager } from "@/lib/analytics";
import DonationGuide from "./DonationGuide";

export const TrakteerButton = () => {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add error handling and timeout
    const loadTrakteerScript = () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://edge-cdn.trakteer.id/js/embed/trbtn.min.js?v=14-05-2025';
        script.async = true;
        
        script.onload = () => {
          try {
            // Initialize Trakteer button after script loads
            if (window.trbtn && embedRef.current) {
              const trbtnId = window.trbtn.init(
                'Dukung Saya di Trakteer',
                '#0A6B04',
                'https://trakteer.id/alfian_yazdad',
                'https://edge-cdn.trakteer.id/images/embed/trbtn-icon.png?v=14-05-2025',
                '40'
              );
              window.trbtn.draw(trbtnId);
              
              // Track embed load
              AnalyticsManager.trackEvent('trakteer_embed_loaded', {
                username: 'alfian_yazdad',
                embedType: 'footer_button'
              });
            }
          } catch (error) {
            console.warn('Trakteer script loaded but initialization failed:', error);
          }
        };

        script.onerror = () => {
          console.warn('Failed to load Trakteer script, using fallback button');
        };

        document.head.appendChild(script);

        return () => {
          // Cleanup script when component unmounts
          const existingScript = document.querySelector(`script[src="${script.src}"]`);
          if (existingScript) {
            document.head.removeChild(existingScript);
          }
        };
      } catch (error) {
        console.warn('Error setting up Trakteer script:', error);
      }
    };

    // Delay script loading to ensure app renders first
    const timer = setTimeout(loadTrakteerScript, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleDirectLink = () => {
    window.open('https://trakteer.id/alfian_yazdad', '_blank');
    AnalyticsManager.trackEvent('donation_redirect', {
      platform: 'trakteer',
      method: 'direct_link'
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Fallback Button - Trakteer script disabled temporarily */}
      <Button 
        variant="ghost" 
        size="sm"
        className="gap-2"
        onClick={handleDirectLink}
      >
        <Heart className="h-4 w-4" />
        Support
      </Button>
      
      {/* Donation Guide */}
      <DonationGuide 
        trigger={
          <Button 
            variant="ghost" 
            size="sm"
            className="gap-2"
          >
            <Heart className="h-4 w-4" />
            Guide
          </Button>
        }
        onDonate={handleDirectLink}
      />
    </div>
  );
};

// Add trbtn to window type
declare global {
  interface Window {
    trbtn?: {
      init: (text: string, color: string, url: string, icon: string, size: string) => string;
      draw: (id: string) => void;
    };
  }
}

export default TrakteerButton; 