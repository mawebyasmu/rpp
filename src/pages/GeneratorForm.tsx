import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2, BookOpen, GraduationCap, FileText, Brain } from "lucide-react";
import { rppGenerator, RPPFormData } from "@/lib/rpp-generator";

const GeneratorForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RPPFormData>({
    capaianPembelajaran: "",
    jenjang: "MI" as const,
    kelas: "",
    mataPelajaran: ""
  });

  const jenjangOptions = [
    { value: "MI", label: "MI (Madrasah Ibtidaiyah)" },
    { value: "MTs", label: "MTs (Madrasah Tsanawiyah)" },
    { value: "MA", label: "MA (Madrasah Aliyah)" }
  ];

  const getKelasOptions = (jenjang: string) => {
    switch (jenjang) {
      case "MI":
        return Array.from({ length: 6 }, (_, i) => ({ value: (i + 1).toString(), label: `Kelas ${i + 1}` }));
      case "MTs":
        return Array.from({ length: 3 }, (_, i) => ({ value: (i + 7).toString(), label: `Kelas ${i + 7}` }));
      case "MA":
        return Array.from({ length: 3 }, (_, i) => ({ value: (i + 10).toString(), label: `Kelas ${i + 10}` }));
      default:
        return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.capaianPembelajaran || !formData.jenjang || !formData.kelas || !formData.mataPelajaran) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      toast({
        title: "Memulai Generasi RPP",
        description: "AI sedang memproses data Anda...",
      });

      // Generate RPP using Deep Learning AI
      const generatedRPP = await rppGenerator.generateRPP(formData);
      
      // Store both form data and generated RPP for result page
      localStorage.setItem('rppFormData', JSON.stringify(formData));
      localStorage.setItem('generatedRPP', JSON.stringify(generatedRPP));
      
      // Navigate to result page
      navigate('/result');
      
      toast({
        title: "RPP Berhasil Dibuat! 🎉",
        description: "RPP dengan standar kurikulum Madrasah telah berhasil di-generate menggunakan AI",
      });
    } catch (error) {
      console.error("Error generating RPP:", error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal membuat RPP. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Generator RPP
            <span className="block text-primary">Madrasah</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lengkapi form di bawah ini untuk membuat RPP yang sesuai dengan kurikulum Madrasah
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Form Data RPP
            </CardTitle>
            <CardDescription className="text-base">
              Masukkan informasi yang diperlukan untuk membuat RPP Anda
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Capaian Pembelajaran */}
              <div className="space-y-2">
                <Label htmlFor="capaianPembelajaran" className="text-base font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Capaian Pembelajaran
                </Label>
                <Textarea
                  id="capaianPembelajaran"
                  placeholder="Tuliskan capaian pembelajaran yang ingin dicapai dalam RPP ini..."
                  className="min-h-[120px] resize-none"
                  value={formData.capaianPembelajaran}
                  onChange={(e) => setFormData({ ...formData, capaianPembelajaran: e.target.value })}
                />
              </div>

              {/* Jenjang & Kelas */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="jenjang" className="text-base font-medium flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Jenjang Madrasah
                  </Label>
                  <Select 
                    value={formData.jenjang} 
                    onValueChange={(value) => setFormData({ ...formData, jenjang: value as "MI" | "MTs" | "MA", kelas: "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenjang..." />
                    </SelectTrigger>
                    <SelectContent>
                      {jenjangOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kelas" className="text-base font-medium">
                    Kelas
                  </Label>
                  <Select 
                    value={formData.kelas} 
                    onValueChange={(value) => setFormData({ ...formData, kelas: value })}
                    disabled={!formData.jenjang}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas..." />
                    </SelectTrigger>
                    <SelectContent>
                      {getKelasOptions(formData.jenjang).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mata Pelajaran */}
              <div className="space-y-2">
                <Label htmlFor="mataPelajaran" className="text-base font-medium">
                  Mata Pelajaran
                </Label>
                <Input
                  id="mataPelajaran"
                  placeholder="Contoh: Matematika, Bahasa Indonesia, Akidah Akhlak..."
                  value={formData.mataPelajaran}
                  onChange={(e) => setFormData({ ...formData, mataPelajaran: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full text-lg py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sedang Membuat RPP...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-5 w-5" />
                      Generate RPP Sekarang
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-primary mb-2">💡 Tips</h3>
              <p className="text-sm text-muted-foreground">
                Semakin detail capaian pembelajaran yang Anda masukkan, semakin spesifik dan berkualitas RPP yang akan dihasilkan oleh AI.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeneratorForm;