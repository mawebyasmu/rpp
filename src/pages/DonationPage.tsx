import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Users, 
  Target, 
  Star,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Gift,
  Coffee
} from "lucide-react";
import TrakteerEmbed from "@/components/TrakteerEmbed";
import { AnalyticsManager } from "@/lib/analytics";
import { useEffect } from "react";

const DonationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AnalyticsManager.trackEvent('page_view', { page: 'donation' });
  }, []);

  const stats = [
    { label: "Guru Terbantu", value: "1000+", icon: <Users className="h-5 w-5" /> },
    { label: "RPP Dihasilkan", value: "5000+", icon: <Target className="h-5 w-5" /> },
    { label: "Donatur Aktif", value: "50+", icon: <Heart className="h-5 w-5" /> },
    { label: "Rating Aplikasi", value: "4.8/5", icon: <Star className="h-5 w-5" /> }
  ];

  const impactAreas = [
    {
      title: "Pengembangan Fitur Baru",
      description: "Membantu kami menambahkan fitur-fitur yang lebih canggih dan bermanfaat",
      icon: <Sparkles className="h-6 w-6" />
    },
    {
      title: "Pemeliharaan Server",
      description: "Memastikan aplikasi tetap berjalan lancar 24/7 untuk semua guru",
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "Peningkatan Performa",
      description: "Optimasi kecepatan dan responsivitas aplikasi",
      icon: <Star className="h-6 w-6" />
    },
    {
      title: "Dukungan Teknis",
      description: "Memberikan bantuan teknis kepada guru yang mengalami kendala",
      icon: <Users className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              <Heart className="h-3 w-3 mr-1" />
              Support Us
            </Badge>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Heart className="h-3 w-3 mr-1" />
              Dukung Pengembangan
            </Badge>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Bantu Kami Terus
              <span className="text-primary"> Berkembang</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Madrasah RPP Wizard dibuat dengan ❤️ untuk membantu guru Madrasah. 
              Dukungan Anda sangat berarti untuk terus mengembangkan aplikasi yang bermanfaat ini.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <div className="text-primary">
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Areas */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Dampak Donasi Anda
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {impactAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <div className="text-primary">
                        {area.icon}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{area.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trakteer Embed */}
        <div className="mb-12">
          <TrakteerEmbed />
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Apa Kata Donatur Kami
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Aplikasi yang sangat membantu untuk guru Madrasah. Semoga terus berkembang!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Guru Madrasah</div>
                    <div className="text-xs text-muted-foreground">Donatur Aktif</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Terima kasih sudah membuat aplikasi gratis yang berkualitas tinggi!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Pengguna Setia</div>
                    <div className="text-xs text-muted-foreground">Donatur Aktif</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Aplikasi ini sangat memudahkan pekerjaan saya sebagai guru. Keep it up!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Guru Madrasah</div>
                    <div className="text-xs text-muted-foreground">Donatur Aktif</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Pertanyaan Umum
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Apakah donasi aman?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ya, kami menggunakan Trakteer.id yang merupakan platform donasi terpercaya di Indonesia 
                  dengan sistem keamanan yang tinggi. Link donasi: trakteer.id/alfian_yazdad
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Apa manfaat donasi?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Donasi Anda akan digunakan untuk pengembangan fitur baru, pemeliharaan server, 
                  dan peningkatan performa aplikasi.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Apakah aplikasi tetap gratis?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ya, aplikasi akan tetap gratis untuk semua guru Madrasah. 
                  Donasi adalah bentuk dukungan sukarela.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bagaimana cara donasi?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pilih tier donasi yang diinginkan, kemudian Anda akan diarahkan ke Trakteer.id 
                  (trakteer.id/alfian_yazdad) untuk menyelesaikan pembayaran.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t">
          <p className="text-muted-foreground text-sm">
            © 2025 Madrasah RPP Wizard. Dibuat dengan ❤️ untuk guru Madrasah by AzkaCoding.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              Beranda
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/learn-more')}>
              Tentang Kami
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage; 