import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, BookOpen, GraduationCap, FileText, Clock, Target, Users, Award } from "lucide-react";
import { rppGenerator, RPPFormData } from "@/lib/rpp-generator";

// Form validation schema
const formSchema = z.object({
  satuan: z.string().min(1, "Satuan pendidikan harus diisi"),
  jenjang: z.enum(["MI", "MTs", "MA"], {
    required_error: "Jenjang harus dipilih",
  }),
  kelas: z.string().min(1, "Kelas harus dipilih"),
  semester: z.enum(["Ganjil", "Genap"], {
    required_error: "Semester harus dipilih",
  }),
  mataPelajaran: z.string().min(1, "Mata pelajaran harus diisi"),
  tema: z.string().min(1, "Tema harus diisi"),
  subtema: z.string().min(1, "Sub tema harus diisi"),
  alokasi: z.string().min(1, "Alokasi waktu harus diisi"),
  pertemuan: z.number().min(1, "Pertemuan harus diisi"),
  capaianPembelajaran: z.string().min(10, "Capaian pembelajaran minimal 10 karakter"),
});

type FormData = z.infer<typeof formSchema>;

const GeneratorForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      satuan: "",
      jenjang: "MI",
      kelas: "",
      semester: "Ganjil",
      mataPelajaran: "",
      tema: "",
      subtema: "",
      alokasi: "2 x 40 menit",
      pertemuan: 1,
      capaianPembelajaran: "",
    },
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

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      toast({
        title: "Memulai Generasi RPP",
        description: "AI sedang memproses data Anda...",
      });

      // Convert form data to RPPFormData format
      const rppFormData: RPPFormData = {
        satuan: data.satuan,
        jenjang: data.jenjang,
        kelas: data.kelas,
        semester: data.semester,
        mataPelajaran: data.mataPelajaran,
        tema: data.tema,
        subtema: data.subtema,
        alokasi: data.alokasi,
        pertemuan: data.pertemuan,
        capaianPembelajaran: data.capaianPembelajaran,
      };

      // Generate RPP using Deep Learning AI
      const generatedRPP = await rppGenerator.generateRPP(rppFormData);
      
      // Store both form data and generated RPP for result page
      localStorage.setItem('rppFormData', JSON.stringify(rppFormData));
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Identitas Madrasah */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Identitas Madrasah
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="satuan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Satuan Pendidikan</FormLabel>
                            <FormControl>
                              <Input placeholder="Contoh: MI Al-Hikmah" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="jenjang"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jenjang Madrasah</FormLabel>
                            <Select onValueChange={(value) => {
                              field.onChange(value);
                              form.setValue("kelas", "");
                            }} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih jenjang..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {jenjangOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="kelas"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kelas</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih kelas..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {getKelasOptions(form.watch("jenjang")).map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="semester"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Semester</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih semester..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Ganjil">Semester Ganjil</SelectItem>
                                <SelectItem value="Genap">Semester Genap</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Mata Pelajaran dan Tema */}
                <Card className="border-secondary/20 bg-secondary/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Mata Pelajaran & Tema
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="mataPelajaran"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mata Pelajaran</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: Matematika, Bahasa Indonesia, Akidah Akhlak..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="tema"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tema</FormLabel>
                            <FormControl>
                              <Input placeholder="Contoh: Bilangan dan Operasi Hitung" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subtema"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sub Tema</FormLabel>
                            <FormControl>
                              <Input placeholder="Contoh: Penjumlahan dan Pengurangan" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Alokasi Waktu dan Pertemuan */}
                <Card className="border-accent/20 bg-accent/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Waktu dan Pertemuan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="alokasi"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alokasi Waktu</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih alokasi waktu..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1 x 40 menit">1 x 40 menit</SelectItem>
                                <SelectItem value="2 x 40 menit">2 x 40 menit</SelectItem>
                                <SelectItem value="3 x 40 menit">3 x 40 menit</SelectItem>
                                <SelectItem value="4 x 40 menit">4 x 40 menit</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="pertemuan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pertemuan ke-</FormLabel>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih pertemuan..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => (
                                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                                    Pertemuan {i + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Capaian Pembelajaran */}
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Capaian Pembelajaran
                    </CardTitle>
                    <CardDescription>
                      Tuliskan capaian pembelajaran yang spesifik dan terukur
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="capaianPembelajaran"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deskripsi Capaian Pembelajaran</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Contoh: Peserta didik mampu memahami konsep penjumlahan dan pengurangan bilangan bulat, serta dapat menerapkannya dalam menyelesaikan masalah sehari-hari dengan benar dan sistematis..."
                              className="min-h-[120px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

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
            </Form>
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