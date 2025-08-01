import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink, HelpCircle } from "lucide-react";
import { AnalyticsManager } from "@/lib/analytics";
import DonationGuide from "./DonationGuide";

export const TrakteerButton = () => {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Trakteer embed script
    const script = document.createElement('script');
    script.src = 'https://edge-cdn.trakteer.id/js/embed/trbtn.min.js?v=14-05-2025';
    script.async = true;
    
    script.onload = () => {
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
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
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
      {/* Trakteer Embed Container */}
      <div 
        ref={embedRef} 
        className="flex justify-center"
        id="trakteer-footer-container"
      />
      
      {/* Donation Button with Guide */}
      <DonationGuide 
        trigger={
          <Button 
            variant="ghost" 
            size="sm"
            className="gap-2"
          >
            <Heart className="h-4 w-4" />
            Support
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