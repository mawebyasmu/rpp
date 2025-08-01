import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Zap, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-madrasah.jpg";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Madrasah RPP
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Generator AI
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Buat Rencana Pelaksanaan Pembelajaran (RPP) untuk MI, MTs, dan MA dengan bantuan AI. 
              Hemat waktu, tingkatkan kualitas pembelajaran sesuai kurikulum Madrasah.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generator">
              <Button variant="hero" size="lg" className="px-8 py-6 text-lg">
                <FileText className="mr-2 h-5 w-5" />
                Buat RPP Sekarang
              </Button>
            </Link>
            <Button variant="elegant" size="lg" className="px-8 py-6 text-lg">
              <BookOpen className="mr-2 h-5 w-5" />
              Pelajari Selengkapnya
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mengapa Pilih RPP Generator AI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Solusi terdepan untuk membantu guru Madrasah membuat RPP berkualitas tinggi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Cepat & Efisien</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Generate RPP lengkap dalam hitungan menit. Hemat waktu persiapan mengajar 
                  untuk fokus pada kualitas pembelajaran.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-accent/20 rounded-full w-fit">
                  <BookOpen className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Sesuai Kurikulum</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  RPP yang dihasilkan sesuai dengan standar kurikulum Madrasah terbaru 
                  dan capaian pembelajaran yang ditetapkan.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Untuk Semua Jenjang</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Mendukung semua jenjang Madrasah: MI (Kelas 1-6), MTs (Kelas 7-9), 
                  dan MA (Kelas 10-12).
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cara Menggunakan
            </h2>
            <p className="text-lg text-muted-foreground">
              Hanya 3 langkah mudah untuk membuat RPP berkualitas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Input Data</h3>
              <p className="text-muted-foreground">
                Masukkan capaian pembelajaran, jenjang, kelas, dan mata pelajaran
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Generate AI</h3>
              <p className="text-muted-foreground">
                AI akan memproses dan membuat RPP sesuai dengan input Anda
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Download RPP</h3>
              <p className="text-muted-foreground">
                Unduh RPP dalam format .docx dan gunakan untuk mengajar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Siap Membuat RPP Berkualitas?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan guru Madrasah yang sudah menggunakan RPP Generator AI 
            untuk meningkatkan kualitas pembelajaran
          </p>
          <Link to="/generator">
            <Button variant="hero" size="lg" className="px-12 py-6 text-xl">
              <FileText className="mr-3 h-6 w-6" />
              Mulai Sekarang - Gratis
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;