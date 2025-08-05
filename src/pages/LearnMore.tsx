import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Brain, 
  Users, 
  Award, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Clock,
  Target,
  GraduationCap,
  Zap,
  Info,
  Heart
} from "lucide-react";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Button>
          
          <Badge variant="secondary" className="px-4 py-2">
            <Brain className="h-4 w-4 mr-2" />
            AI-Powered RPP Generator
          </Badge>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pelajari Selengkapnya
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Generator RPP dan LDP Madrasah dirancang sebagai alat bantu untuk guru dalam menyusun dokumen pembelajaran yang sesuai standar kurikulum. 
            Meskipun menggunakan teknologi AI, aplikasi ini tetap memerlukan review dan penyesuaian oleh guru sesuai dengan kondisi kelas dan kebutuhan siswa.
          </p>
        </div>

        {/* What is RPP Section */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Apa itu RPP?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              <strong>RPP (Rencana Pelaksanaan Pembelajaran)</strong> adalah dokumen penting yang menjadi panduan guru dalam melaksanakan pembelajaran. 
              RPP berisi rencana kegiatan pembelajaran yang sistematis dan logis untuk mencapai kompetensi dasar yang telah ditetapkan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              RPP yang baik akan membantu guru dalam:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Mengorganisir pembelajaran secara sistematis</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Mencapai tujuan pembelajaran yang efektif</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Mengoptimalkan waktu pembelajaran</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Meningkatkan kualitas pembelajaran</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* RPP Components Section */}
        <Card className="mb-8 border-secondary/20 bg-secondary/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Target className="h-6 w-6 text-secondary" />
              Komponen RPP Madrasah
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Komponen Wajib:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>Identitas:</strong> Satuan pendidikan, kelas, semester, mata pelajaran</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>Capaian Pembelajaran:</strong> Pengetahuan, keterampilan, dan sikap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>Pendekatan Pembelajaran:</strong> Model pembelajaran berbasis cinta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>Nilai Cinta:</strong> Integrasi nilai-nilai cinta dalam pembelajaran</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>Tujuan Pembelajaran:</strong> Hasil yang diharapkan</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Komponen Pendukung:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>Materi Pembelajaran:</strong> Faktual, konseptual, prosedural</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>Integrasi Nilai Islam:</strong> Nilai-nilai Islam dalam pembelajaran</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>Media & Sumber:</strong> Alat dan bahan pembelajaran</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>Langkah Pembelajaran:</strong> Kegiatan pendahuluan, inti, penutup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span><strong>Penilaian:</strong> Teknik dan instrumen penilaian</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What is LDP Section */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Heart className="h-6 w-6 text-green-600" />
              Apa itu LDP?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              <strong>LDP (Lembar Dokumen Pembelajaran)</strong> adalah dokumen pembelajaran berbasis cinta yang dirancang khusus untuk Kurikulum Berbasis Cinta. 
              LDP mengintegrasikan nilai-nilai Islam dan karakter dalam setiap aspek pembelajaran.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              LDP yang baik akan membantu guru dalam:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Mengintegrasikan nilai-nilai cinta dalam pembelajaran</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Mengembangkan karakter siswa secara holistik</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Menciptakan pembelajaran yang bermakna dan menyentuh hati</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Membangun hubungan harmonis antara guru dan siswa</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* LDP Components Section */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Target className="h-6 w-6 text-green-600" />
              Komponen LDP Madrasah
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Komponen Wajib:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Identitas:</strong> Satuan pendidikan, kelas, semester, mata pelajaran</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Nilai Cinta:</strong> Integrasi 6 nilai cinta dalam pembelajaran</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Pendekatan Pembelajaran:</strong> Love-Based, Holistic, Character-Building</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Capaian Pembelajaran:</strong> Pengetahuan, keterampilan, dan sikap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Penilaian Karakter:</strong> Asesmen perkembangan karakter siswa</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Komponen Pendukung:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Integrasi Nilai Islam:</strong> Nilai-nilai Islam dalam pembelajaran</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Asesmen Autentik:</strong> Penilaian berbasis proyek dan portofolio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Refleksi Pembelajaran:</strong> Evaluasi diri dan pengembangan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Kolaborasi Keluarga:</strong> Keterlibatan orang tua dalam pembelajaran</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Dokumentasi Cinta:</strong> Catatan perkembangan karakter siswa</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Madrasah Curriculum Standards */}
        <Card className="mb-8 border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-accent" />
              Kurikulum Berbasis Cinta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Nilai-Nilai Cinta dalam Kurikulum Berbasis Cinta:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Cinta kepada Allah SWT</strong> - Menumbuhkan keimanan dan ketakwaan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Cinta kepada Rasulullah SAW</strong> - Mengikuti sunnah dan teladan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Cinta kepada Keluarga</strong> - Menghormati dan menyayangi keluarga</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Cinta kepada Sesama</strong> - Menjalin persaudaraan dan tolong menolong</span>
                    </li>
                  </ul>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Cinta kepada Alam</strong> - Melestarikan dan menjaga lingkungan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Cinta kepada Tanah Air</strong> - Mencintai dan membela Indonesia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Rahmatan Lil 'Alamin</strong> - Menjadi rahmat bagi semesta alam</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">MI (Madrasah Ibtidaiyah)</h3>
                  <p className="text-sm text-muted-foreground">
                    Kelas 1-6, fokus pada pembentukan karakter dan dasar-dasar keilmuan Islam
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">MTs (Madrasah Tsanawiyah)</h3>
                  <p className="text-sm text-muted-foreground">
                    Kelas 7-9, pengembangan pengetahuan dan keterampilan yang lebih mendalam
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">MA (Madrasah Aliyah)</h3>
                  <p className="text-sm text-muted-foreground">
                    Kelas 10-12, persiapan untuk pendidikan tinggi dan kehidupan bermasyarakat
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Use Section */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Cara Menggunakan Generator RPP & LDP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Pilih Jenis Dokumen</h3>
                <p className="text-sm text-muted-foreground">
                  Pilih antara RPP (tradisional) atau LDP (berbasis cinta) sesuai kebutuhan
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Input Data & Generate</h3>
                <p className="text-sm text-muted-foreground">
                  Lengkapi form dan AI akan menghasilkan dokumen sesuai standar kurikulum Madrasah
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Review & Download</h3>
                <p className="text-sm text-muted-foreground">
                  Review hasil dokumen, sesuaikan jika perlu, dan download dalam format .docx
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips & Best Practices */}
        <Card className="mb-8 border-secondary/20 bg-secondary/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-secondary" />
              Tips & Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Sebelum Menggunakan:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Pastikan capaian pembelajaran sudah jelas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Siapkan referensi materi pembelajaran</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Kenali karakteristik siswa kelas Anda</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Setelah Generate:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Review dan sesuaikan dengan kondisi kelas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Tambahkan contoh dan ilustrasi yang relevan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Adaptasikan dengan gaya mengajar Anda</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 text-orange-800">
              <AlertCircle className="h-6 w-6" />
              Penting untuk Diperhatikan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="text-orange-800 leading-relaxed">
                <strong>Generator RPP Madrasah adalah alat bantu, bukan pengganti keahlian guru.</strong> 
                Meskipun menggunakan teknologi AI, hasil RPP yang dihasilkan tetap memerlukan review, 
                penyesuaian, dan improvisasi oleh guru sesuai dengan:
              </p>
            </div>
            <ul className="space-y-2 text-orange-800">
              <li className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Kondisi dan karakteristik siswa di kelas</span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Ketersediaan media dan sumber belajar</span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Alokasi waktu yang tersedia</span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Gaya mengajar dan preferensi guru</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Info className="h-6 w-6 text-primary" />
              FAQ (Frequently Asked Questions)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Apakah RPP yang dihasilkan sudah sesuai standar?</h3>
              <p className="text-muted-foreground">
                Ya, RPP yang dihasilkan mengikuti standar kurikulum Madrasah terbaru. Namun tetap memerlukan review dan penyesuaian oleh guru.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Berapa lama waktu yang dibutuhkan untuk generate RPP?</h3>
              <p className="text-muted-foreground">
                Proses generate RPP memakan waktu sekitar 30-60 detik, tergantung kompleksitas dan detail yang diminta.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Apakah ada biaya untuk menggunakan aplikasi ini?</h3>
              <p className="text-muted-foreground">
                Tidak, aplikasi ini sepenuhnya gratis dan dapat digunakan tanpa biaya apapun.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Apakah data yang saya input akan disimpan?</h3>
              <p className="text-muted-foreground">
                Data hanya disimpan sementara di browser Anda untuk keperluan generate RPP. Tidak ada data yang dikirim ke server.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Mencoba Generator RPP & LDP?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mulai buat RPP dan LDP berkualitas untuk Madrasah Anda sekarang. Gratis dan mudah digunakan!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => navigate('/generator')}
            >
              <FileText className="mr-2 h-5 w-5" />
              Mulai Buat Dokumen
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore; 