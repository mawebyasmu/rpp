import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  ExternalLink,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { AnalyticsManager } from "@/lib/analytics";
import DonationGuide from "./DonationGuide";

interface TrakteerEmbedProps {
  showHeader?: boolean;
  className?: string;
}

export const TrakteerEmbed = ({ showHeader = true, className = "" }: TrakteerEmbedProps) => {
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
          embedType: 'button'
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
    <Card className={`border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 ${className}`}>
      {showHeader && (
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Dukung Madrasah RPP Wizard</CardTitle>
          <CardDescription className="text-lg">
            Bantu kami terus mengembangkan aplikasi yang bermanfaat untuk guru Madrasah
          </CardDescription>
        </CardHeader>
      )}
      
      <CardContent className="text-center">
        <div className="mb-6">
          <p className="text-muted-foreground mb-4">
            Klik tombol di bawah untuk mendukung pengembangan aplikasi melalui Trakteer.id
          </p>
          
          {/* Trakteer Embed Container */}
          <div 
            ref={embedRef} 
            className="flex justify-center mb-4"
            id="trakteer-embed-container"
          />
          
          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={handleDirectLink}
              className="gap-2"
              variant="outline"
            >
              <ExternalLink className="h-4 w-4" />
              Kunjungi Trakteer.id
            </Button>
            
            <DonationGuide 
              trigger={
                <Button variant="outline" className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Cara Donasi
                </Button>
              }
              onDonate={handleDirectLink}
            />
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Pengembangan fitur baru</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Pemeliharaan server</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Peningkatan performa</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Dukungan teknis</span>
          </div>
        </div>
      </CardContent>
    </Card>
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

export default TrakteerEmbed; 