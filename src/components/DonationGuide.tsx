import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  ExternalLink,
  CheckCircle,
  ArrowRight,
  MousePointer,
  HandPointer,
  CreditCard,
  Gift
} from "lucide-react";
import { AnalyticsManager } from "@/lib/analytics";

interface DonationStep {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
}

const donationSteps: DonationStep[] = [
  {
    step: 1,
    title: "Klik Tombol Support",
    description: "Setelah diarahkan ke halaman Trakteer.id, Anda akan melihat tombol merah 'Support' di bagian tengah halaman. Klik tombol tersebut untuk memulai proses donasi.",
    icon: <MousePointer className="h-5 w-5" />
  },
  {
    step: 2,
    title: "Pilih Jumlah Donasi",
    description: "Pilih jumlah donasi yang ingin Anda berikan. Anda bisa memilih dari preset amount atau memasukkan jumlah custom sesuai keinginan.",
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    step: 3,
    title: "Tulis Pesan (Opsional)",
    description: "Anda bisa menulis pesan dukungan atau request fitur yang ingin Anda lihat di aplikasi Madrasah RPP Wizard.",
    icon: <Gift className="h-5 w-5" />
  },
  {
    step: 4,
    title: "Pilih Metode Pembayaran",
    description: "Pilih metode pembayaran yang tersedia seperti transfer bank, e-wallet, atau kartu kredit/debit.",
    icon: <CheckCircle className="h-5 w-5" />
  },
  {
    step: 5,
    title: "Selesaikan Pembayaran",
    description: "Ikuti instruksi pembayaran sesuai metode yang dipilih. Setelah berhasil, donasi Anda akan langsung masuk ke akun kami.",
    icon: <Heart className="h-5 w-5" />
  }
];

interface DonationGuideProps {
  trigger?: React.ReactNode;
  onDonate?: () => void;
}

export const DonationGuide = ({ trigger, onDonate }: DonationGuideProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDonateClick = () => {
    AnalyticsManager.trackEvent('donation_guide_viewed', {
      source: 'guide_dialog'
    });
    setIsOpen(false);
    if (onDonate) {
      onDonate();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Heart className="h-4 w-4" />
            Dukung Kami
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Panduan Dukung Kami
                  </DialogTitle>
                  <DialogDescription>
                    Ikuti langkah-langkah di bawah ini untuk mendukung pengembangan aplikasi
                  </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Trakteer Preview */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Preview Halaman Trakteer.id
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white border rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <div>
                    <div className="font-semibold">Alfian Yazdad</div>
                    <div className="text-sm text-muted-foreground">@alfian_yazdad</div>
                    <div className="text-sm text-muted-foreground">Mengajar, Developer, Vibe Coding</div>
                  </div>
                </div>
                <div className="text-center">
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-semibold">
                    Support
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    ← Klik tombol ini untuk memulai donasi
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Steps */}
          <div>
                                    <h3 className="text-lg font-semibold mb-4">Langkah-langkah Dukung Kami:</h3>
            <div className="space-y-4">
              {donationSteps.map((step) => (
                <Card key={step.step} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                          {step.step}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-primary">
                            {step.icon}
                          </div>
                          <h4 className="font-semibold">{step.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tips */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
                          <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Tips Dukung Kami
            </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-green-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Pastikan Anda berada di halaman yang benar: trakteer.id/alfian_yazdad</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Pilih jumlah donasi sesuai kemampuan Anda</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Jangan lupa tulis pesan dukungan untuk kami</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Simpan bukti pembayaran untuk keamanan</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleDonateClick}
              className="flex-1 gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Dukung Kami Sekarang
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Tutup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationGuide; 