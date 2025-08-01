import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Heart, 
  Coffee, 
  Gift, 
  Star, 
  Users, 
  Sparkles,
  ExternalLink,
  CheckCircle
} from "lucide-react";
import { AnalyticsManager } from "@/lib/analytics";

interface DonationTier {
  id: string;
  name: string;
  amount: number;
  description: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
}

const donationTiers: DonationTier[] = [
  {
    id: "coffee",
    name: "Secangkir Kopi",
    amount: 10000,
    description: "Dukung pengembangan aplikasi dengan secangkir kopi",
    icon: <Coffee className="h-5 w-5" />,
    color: "bg-orange-500",
    benefits: ["Nama di halaman donatur", "Akses fitur premium (coming soon)"]
  },
  {
    id: "meal",
    name: "Makan Siang",
    amount: 25000,
    description: "Bantu kami tetap produktif dengan makan siang",
    icon: <Gift className="h-5 w-5" />,
    color: "bg-green-500",
    benefits: ["Nama di halaman donatur", "Akses fitur premium (coming soon)", "Prioritas request fitur"]
  },
  {
    id: "premium",
    name: "Premium Supporter",
    amount: 50000,
    description: "Dukung penuh pengembangan aplikasi",
    icon: <Star className="h-5 w-5" />,
    color: "bg-purple-500",
    benefits: ["Nama di halaman donatur", "Akses fitur premium (coming soon)", "Prioritas request fitur", "Konsultasi khusus"]
  }
];

export const DonationWidget = () => {
  const [selectedTier, setSelectedTier] = useState<DonationTier | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDonationClick = (tier: DonationTier) => {
    setSelectedTier(tier);
    setIsDialogOpen(true);
    AnalyticsManager.trackEvent('donation_click', { 
      tier: tier.id, 
      amount: tier.amount 
    });
  };

  const handleTrakteerRedirect = () => {
    // Redirect ke Trakteer.id dengan parameter
    const trakteerUrl = `https://trakteer.id/mawebyasmu?amount=${selectedTier?.amount}`;
    window.open(trakteerUrl, '_blank');
    
    AnalyticsManager.trackEvent('donation_redirect', { 
      tier: selectedTier?.id, 
      amount: selectedTier?.amount,
      platform: 'trakteer'
    });
    
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full">
      {/* Donation Banner */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
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
        
        <CardContent>
          {/* Donation Tiers */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {donationTiers.map((tier) => (
              <Card key={tier.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center pb-3">
                  <div className={`mx-auto w-12 h-12 ${tier.color} rounded-lg flex items-center justify-center mb-3`}>
                    <div className="text-white">
                      {tier.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  <CardDescription className="text-sm">
                    Rp {tier.amount.toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    {tier.description}
                  </p>
                  <Button 
                    onClick={() => handleDonationClick(tier)}
                    className="w-full"
                    variant="outline"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Pilih
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Manfaat Donasi</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Pengembangan fitur baru</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Pemeliharaan server</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Peningkatan performa</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Dukungan teknis</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Donation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Terima Kasih atas Dukungannya!
            </DialogTitle>
            <DialogDescription>
              Anda akan diarahkan ke Trakteer.id untuk menyelesaikan donasi
            </DialogDescription>
          </DialogHeader>
          
          {selectedTier && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${selectedTier.color} rounded-lg flex items-center justify-center`}>
                      <div className="text-white">
                        {selectedTier.icon}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{selectedTier.name}</CardTitle>
                      <CardDescription>
                        Rp {selectedTier.amount.toLocaleString()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {selectedTier.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Benefit yang akan Anda dapatkan:</h4>
                    {selectedTier.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleTrakteerRedirect}
                  className="flex-1"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Lanjutkan ke Trakteer
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Batal
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationWidget; 