import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Clock, 
  Target, 
  Users, 
  Award,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Heart,
  Play,
  CheckCircle
} from "lucide-react";
import FeedbackDialog from "@/components/FeedbackDialog";
import TrakteerButton from "@/components/TrakteerButton";
import AboutUsDialog from "@/components/AboutUsDialog";
import { AnalyticsManager } from "@/lib/analytics";
import { useEffect } from "react";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AnalyticsManager.trackEvent('page_view', { page: 'homepage' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Madrasah RPP Wizard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate('/generator')} className="gap-2">
              Mulai Sekarang
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Star className="h-3 w-3 mr-1" />
              Powered by AI Technology
            </Badge>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Buat RPP Madrasah dengan
              <span className="text-primary"> AI Cerdas</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rencana Pelaksanaan Pembelajaran (RPP) yang lengkap dan sesuai standar 
              kurikulum Madrasah dalam hitungan detik. Didesain khusus untuk guru 
              Madrasah Ibtidaiyah, Tsanawiyah, dan Aliyah.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" onClick={() => navigate('/generator')} className="gap-2">
                <Play className="h-5 w-5" />
                Mulai Buat RPP
              </Button>
              
              <Button variant="outline" size="lg" onClick={() => navigate('/learn-more')} className="gap-2">
                <BookOpen className="h-5 w-5" />
                Pelajari Selengkapnya
              </Button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Generasi Cepat</CardTitle>
              <CardDescription>
                RPP lengkap dalam hitungan detik dengan teknologi AI terdepan
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-secondary/20 bg-secondary/5">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Standar Kurikulum</CardTitle>
              <CardDescription>
                Sesuai dengan standar kurikulum Madrasah (MI, MTs, MA)
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-accent/20 bg-accent/5">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Ramah Guru</CardTitle>
              <CardDescription>
                Interface yang mudah digunakan untuk semua tingkat keahlian
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats */}
        <div className="text-center mb-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-muted-foreground">Jenjang Madrasah</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Standar Kurikulum</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Tersedia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Gratis</div>
              <div className="text-muted-foreground">Tanpa Biaya</div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Mengapa Memilih Madrasah RPP Wizard?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Kurikulum Merdeka Kementerian Agama</h3>
                  <p className="text-muted-foreground">Sesuai dengan standar terbaru kurikulum Madrasah</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Deep Learning & AI</h3>
                  <p className="text-muted-foreground">Teknologi AI canggih untuk pembelajaran yang bermakna</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Project-Based Learning</h3>
                  <p className="text-muted-foreground">Integrasi PjBL dan PBL untuk pembelajaran aktif</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">HOTS Integration</h3>
                  <p className="text-muted-foreground">Higher Order Thinking Skills untuk pengembangan kritis</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Technology Integration</h3>
                  <p className="text-muted-foreground">Integrasi teknologi dalam pembelajaran</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Download .docx</h3>
                  <p className="text-muted-foreground">RPP siap cetak dalam format Microsoft Word</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback & Support Section */}
        <div className="text-center py-8 border-t">
          <h3 className="text-xl font-semibold mb-4">Bantu Kami Meningkatkan Layanan</h3>
          <p className="text-muted-foreground mb-6">
            Berikan feedback, saran, atau dukung pengembangan aplikasi
          </p>
          <div className="flex justify-center gap-4">
            <FeedbackDialog />
            <TrakteerButton />
            <AboutUsDialog />
          </div>
        </div>

        {/* Footer Placeholder */}
        <div className="text-center py-8 border-t mt-8">
          <p className="text-muted-foreground text-sm">
            © 2025 Madrasah RPP Wizard. Dibuat dengan ❤️ untuk guru Madrasah by AzkaCoding.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/learn-more')}>
              Pelajari Selengkapnya
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;