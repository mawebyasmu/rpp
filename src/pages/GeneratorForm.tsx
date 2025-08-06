import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, BookOpen, GraduationCap, FileText, Clock, Target, Users, Award, ArrowLeft } from "lucide-react";
import { perencanaanPembelajaranGenerator, LearningDocumentFormData } from "@/lib/rpp-generator";
import { SecurityUtils } from "@/lib/security";
import { AnalyticsManager } from "@/lib/analytics";
import FeedbackDialog from "@/components/FeedbackDialog";
import { Badge } from "@/components/ui/badge";


// Form validation schema with security measures - Updated for Love-Based Curriculum
const formSchema = z.object({
  satuanPendidikan: z.string().min(1, "Satuan pendidikan harus diisi").max(100, "Satuan pendidikan terlalu panjang"),
  jenjang: z.enum(["MI", "MTs", "MA"]),
  fase: z.string().min(1, "Fase harus diisi").max(10, "Fase terlalu panjang"),
  kelas: z.string().min(1, "Kelas harus diisi").max(10, "Kelas terlalu panjang"),
  semester: z.enum(["Ganjil", "Genap"]),
  mataPelajaran: z.string().min(1, "Mata pelajaran harus diisi").max(100, "Mata pelajaran terlalu panjang"),
  tema: z.string().min(1, "Tema harus diisi").max(200, "Tema terlalu panjang"),
  subtema: z.string().min(1, "Sub tema harus diisi").max(500, "Sub tema terlalu panjang"),
  alokasi: z.string().min(1, "Alokasi waktu harus diisi").max(50, "Alokasi waktu terlalu panjang"),
  pertemuan: z.number().min(1, "Pertemuan minimal 1").max(20, "Pertemuan maksimal 20"),
  namaGuru: z.string().min(1, "Nama guru harus diisi").max(100, "Nama guru terlalu panjang"),
  namaKepalaSekolah: z.string().min(1, "Nama kepala sekolah harus diisi").max(100, "Nama kepala sekolah terlalu panjang"),
  

  
  // Love-Based Curriculum Structure
  pendekatanPembelajaran: z.enum(["Love-Based", "Holistic", "Character-Building"]),
  nilaiCinta: z.object({
    cintaAllahRasul: z.boolean().default(false),
    cintaIlmu: z.boolean().default(false),
    cintaLingkungan: z.boolean().default(false),
    cintaDiriSesama: z.boolean().default(false),
    cintaTanahAir: z.boolean().default(false),
  }),
  
  // Dimensi Kelulusan (8 Dimensi Profil Lulusan)
  dimensiKelulusan: z.object({
    keimananKetakwaan: z.boolean().default(false),
    kewargaan: z.boolean().default(false),
    penalaranKritis: z.boolean().default(false),
    kreativitas: z.boolean().default(false),
    kolaborasi: z.boolean().default(false),
    kemandirian: z.boolean().default(false),
    kesehatan: z.boolean().default(false),
    komunikasi: z.boolean().default(false),
  }),
  
  // Learning Outcomes
  capaianPembelajaran: z.string().min(1, "Capaian pembelajaran harus diisi").max(1000, "Capaian pembelajaran terlalu panjang"),
  
  // Assessment & Evaluation
  asesmenFormatif: z.array(z.string()).min(1, "Pilih minimal 1 asesmen formatif"),
  asesmenSumatif: z.array(z.string()).min(1, "Pilih minimal 1 asesmen sumatif"),
  penilaianKarakter: z.array(z.string()).optional().default([]),
  integrasiNilaiIslam: z.array(z.string()).optional().default([]),
  
  // Praktik Pedagogis (New Section)
  modelPembelajaran: z.array(z.string()).optional().default([]),
  metodePembelajaran: z.array(z.string()).optional().default([]),
  kemitraanPembelajaran: z.array(z.string()).optional().default([]),
  lingkunganPembelajaran: z.array(z.string()).optional().default([]),
  pemanfaatanDigital: z.array(z.string()).optional().default([]),
});

type FormData = z.infer<typeof formSchema>;

const GeneratorForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      satuanPendidikan: "",
      jenjang: "MI",
      fase: "",
      kelas: "",
      semester: "Ganjil",
      mataPelajaran: "",
      tema: "",
      subtema: "",
      alokasi: "2 x 40 menit",
      pertemuan: 1,
      namaGuru: "",
      namaKepalaSekolah: "",
      

      
      // Love-Based Curriculum Structure
      pendekatanPembelajaran: "Love-Based",
      nilaiCinta: {
        cintaAllahRasul: false,
        cintaIlmu: false,
        cintaLingkungan: false,
        cintaDiriSesama: false,
        cintaTanahAir: false,
      },
      
      // Dimensi Kelulusan (8 Dimensi Profil Lulusan)
      dimensiKelulusan: {
        keimananKetakwaan: false,
        kewargaan: false,
        penalaranKritis: false,
        kreativitas: false,
        kolaborasi: false,
        kemandirian: false,
        kesehatan: false,
        komunikasi: false,
      },
      
      // Learning Outcomes
      capaianPembelajaran: "",
      
      // Assessment & Evaluation
      asesmenFormatif: [],
      asesmenSumatif: [],
      penilaianKarakter: [],
      integrasiNilaiIslam: [],
      
      // Praktik Pedagogis (New Section)
      modelPembelajaran: [],
      metodePembelajaran: [],
      kemitraanPembelajaran: [],
      lingkunganPembelajaran: [],
      pemanfaatanDigital: [],
    },
  });

  // Track form start when component mounts
  useEffect(() => {
    AnalyticsManager.trackEvent('form_start', { page: 'generator' });
  }, []);

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

  // Function to get alokasi waktu based on jenjang
  const getAlokasiWaktu = (jenjang: string) => {
    switch (jenjang) {
      case "MI":
        return "2 x 35 menit";
      case "MTs":
        return "2 x 40 menit";
      case "MA":
        return "2 x 45 menit";
      default:
        return "2 x 40 menit";
    }
  };

  // Watch jenjang changes and update alokasi waktu
  const watchedJenjang = form.watch("jenjang");
  useEffect(() => {
    if (watchedJenjang) {
      const newAlokasi = getAlokasiWaktu(watchedJenjang);
      form.setValue("alokasi", newAlokasi);
      console.log(`Jenjang berubah ke ${watchedJenjang}, alokasi waktu: ${newAlokasi}`);
    }
  }, [watchedJenjang, form]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    
    try {
      // Security: Basic rate limiting for public app
      if (!SecurityUtils.checkRateLimit('form_submit', 10, 60000)) {
        toast({
          title: "Terlalu banyak request",
          description: "Silakan tunggu sebentar sebelum mencoba lagi",
          variant: "destructive",
        });
        return;
      }

      // Security: Basic input sanitization
      const sanitizedData = SecurityUtils.sanitizeObject(data) as LearningDocumentFormData;
      
      // Security: Basic validation

      
      // Check required fields
      const requiredFields = {
        namaGuru: sanitizedData.namaGuru,
        namaKepalaSekolah: sanitizedData.namaKepalaSekolah,
        mataPelajaran: sanitizedData.mataPelajaran,
        tema: sanitizedData.tema,
        subtema: sanitizedData.subtema,
        kelas: sanitizedData.kelas,
        satuanPendidikan: sanitizedData.satuanPendidikan
      };
      
      const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value || value.trim() === '')
        .map(([key]) => key);
      
      if (missingFields.length > 0) {

        toast({
          title: "Data tidak lengkap",
          description: `Mohon lengkapi: ${missingFields.join(', ')}`,
          variant: "destructive",
        });
        return;
      }

      
      setIsLoading(true);
      
      
      // Analytics: Track form submission
      AnalyticsManager.trackFormSubmission(sanitizedData);
      
      // Generate document with sanitized data
      
      let generatedPerencanaanPembelajaran;
try {
  generatedPerencanaanPembelajaran = await perencanaanPembelajaranGenerator.generateLearningDocument(sanitizedData);

      } catch (genError) {
        console.error('Error in generateLearningDocument:', genError);
        throw genError;
      }
      
      // Store data in simple storage
      
      SecurityUtils.storage.setItem('formData', JSON.stringify(sanitizedData));
              SecurityUtils.storage.setItem('generatedPerencanaanPembelajaran', JSON.stringify(generatedPerencanaanPembelajaran));
      
      // Log activity for public app
      SecurityUtils.debugLog('Document generated successfully', { 
        mataPelajaran: sanitizedData.mataPelajaran,
        tema: sanitizedData.tema,
        timestamp: new Date().toISOString()
      });
      
      
      navigate('/result');
    } catch (error) {
      console.error('Form submission error:', error);
      SecurityUtils.errorLog('Failed to generate document', error);
      AnalyticsManager.trackError(error as Error, 'form_submission');
      toast({
        title: "Gagal menghasilkan dokumen",
        description: "Terjadi kesalahan saat menghasilkan dokumen. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary py-6 sm:py-12 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Kembali ke Halaman Utama</span>
            <span className="sm:hidden">Kembali</span>
          </Button>
          
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <FeedbackDialog />
            <Badge variant="secondary" className="px-2 sm:px-4 py-2 text-xs sm:text-sm">
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Generator Perencanaan Pembelajaran KBC</span>
              <span className="sm:hidden">Generator KBC</span>
            </Badge>
          </div>
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Generator Perencanaan Pembelajaran
            <span className="block text-primary">Kurikulum Berbasis Cinta</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Lengkapi form di bawah ini untuk membuat Perencanaan Pembelajaran yang sesuai dengan Kurikulum Berbasis Cinta Madrasah
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center justify-center gap-2 flex-wrap">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <span className="text-center">Form Data Perencanaan Pembelajaran</span>
            </CardTitle>
            <CardDescription className="text-sm sm:text-base px-4">
              Masukkan informasi yang diperlukan untuk membuat Perencanaan Pembelajaran Anda
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 sm:space-y-6 px-2 sm:px-6">
            <Form {...form}>
              <form onSubmit={(e) => {
        
                form.handleSubmit(handleSubmit)(e);
              }} className="space-y-4 sm:space-y-6">


                {/* Identitas Madrasah */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Identitas Madrasah
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="namaGuru"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Guru</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: Ahmad S.Pd, Siti M.Pd..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="namaKepalaSekolah"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Kepala Madrasah</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: Dr. H. Ahmad S.Pd, M.Pd..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="satuanPendidikan"
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
                              // Update alokasi waktu immediately
                              form.setValue("alokasi", getAlokasiWaktu(value));
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fase"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fase</FormLabel>
                            <FormControl>
                              <Input placeholder="Contoh: A, B, C, D, E, F" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
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
                    </div>

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="alokasi"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alokasi Waktu</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Otomatis terisi berdasarkan jenjang" 
                                {...field} 
                                readOnly
                                className="bg-muted"
                              />
                            </FormControl>
                            <FormDescription>
                              Alokasi waktu otomatis: MI (35 menit), MTs (40 menit), MA (45 menit)
                            </FormDescription>
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

                {/* Dimensi Kelulusan (8 Dimensi Profil Lulusan) */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Dimensi Kelulusan (8 Dimensi Profil Lulusan)
                    </CardTitle>
                    <CardDescription>
                      Pilih dimensi profil lulusan yang akan dikembangkan dalam pembelajaran ini
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="dimensiKelulusan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dimensi Profil Lulusan</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="keimananKetakwaan" 
                                  checked={field.value.keimananKetakwaan} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, keimananKetakwaan: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="keimananKetakwaan">Keimanan dan Ketakwaan kepada Tuhan Yang Maha Esa</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="kewargaan" 
                                  checked={field.value.kewargaan} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, kewargaan: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="kewargaan">Kewargaan</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="penalaranKritis" 
                                  checked={field.value.penalaranKritis} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, penalaranKritis: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="penalaranKritis">Penalaran Kritis</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="kreativitas" 
                                  checked={field.value.kreativitas} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, kreativitas: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="kreativitas">Kreativitas</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="kolaborasi" 
                                  checked={field.value.kolaborasi} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, kolaborasi: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="kolaborasi">Kolaborasi</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="kemandirian" 
                                  checked={field.value.kemandirian} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, kemandirian: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="kemandirian">Kemandirian</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="kesehatan" 
                                  checked={field.value.kesehatan} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, kesehatan: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="kesehatan">Kesehatan</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="komunikasi" 
                                  checked={field.value.komunikasi} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, komunikasi: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="komunikasi">Komunikasi</Label>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                          <FormLabel>Capaian Pembelajaran</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Contoh:&#10;1. Siswa dapat memahami konsep penjumlahan dan pengurangan bilangan bulat&#10;2. Siswa dapat melakukan penjumlahan dan pengurangan bilangan bulat dengan benar&#10;3. Siswa dapat menunjukkan sikap kreatif dan inovatif dalam menyelesaikan masalah" 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Kurikulum Berbasis Cinta */}
                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Kurikulum Berbasis Cinta
                    </CardTitle>
                    <CardDescription>
                      Pilih opsi yang sesuai dengan Kurikulum Berbasis Cinta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="nilaiCinta"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nilai-Nilai Cinta</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="cintaAllahRasul" 
                                  checked={field.value.cintaAllahRasul} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, cintaAllahRasul: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="cintaAllahRasul">Cinta Allah dan Rasulullah</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="cintaIlmu" 
                                  checked={field.value.cintaIlmu} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, cintaIlmu: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="cintaIlmu">Cinta Ilmu</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="cintaLingkungan" 
                                  checked={field.value.cintaLingkungan} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, cintaLingkungan: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="cintaLingkungan">Cinta Lingkungan</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="cintaDiriSesama" 
                                  checked={field.value.cintaDiriSesama} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, cintaDiriSesama: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="cintaDiriSesama">Cinta Diri dan Sesama Manusia</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="cintaTanahAir" 
                                  checked={field.value.cintaTanahAir} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, cintaTanahAir: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="cintaTanahAir">Cinta Tanah Air</Label>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />





                    <FormField
                      control={form.control}
                      name="asesmenFormatif"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asesmen Formatif</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="observasi" 
                                  checked={field.value.includes("Observasi")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Observasi"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Observasi"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="observasi">Observasi</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="pertanyaan" 
                                  checked={field.value.includes("Pertanyaan")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Pertanyaan"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Pertanyaan"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="pertanyaan">Pertanyaan</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="diskusi" 
                                  checked={field.value.includes("Diskusi")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Diskusi"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Diskusi"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="diskusi">Diskusi</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="refleksi" 
                                  checked={field.value.includes("Refleksi")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Refleksi"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Refleksi"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="refleksi">Refleksi</Label>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="asesmenSumatif"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asesmen Sumatif</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="tesTertulis" 
                                  checked={field.value.includes("Tes Tertulis")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Tes Tertulis"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Tes Tertulis"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="tesTertulis">Tes Tertulis</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="tesPraktik" 
                                  checked={field.value.includes("Tes Praktik")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Tes Praktik"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Tes Praktik"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="tesPraktik">Tes Praktik</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="proyek" 
                                  checked={field.value.includes("Proyek")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Proyek"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Proyek"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="proyek">Proyek</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="portofolio" 
                                  checked={field.value.includes("Portofolio")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Portofolio"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Portofolio"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="portofolio">Portofolio</Label>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Praktik Pedagogis */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Praktik Pedagogis
                    </CardTitle>
                    <CardDescription>
                      Konfigurasi pendekatan pembelajaran dan kemitraan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="modelPembelajaran"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model Pembelajaran</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="pbl" 
                                  checked={field.value.includes("PBL")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "PBL"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "PBL"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="pbl">PBL (Problem Based Learning)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="pjbl" 
                                  checked={field.value.includes("PjBL")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "PjBL"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "PjBL"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="pjbl">PjBL (Project Based Learning)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="discovery" 
                                  checked={field.value.includes("Discovery")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Discovery"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Discovery"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="discovery">Discovery Learning</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="inquiry" 
                                  checked={field.value.includes("Inquiry")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Inquiry"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Inquiry"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="inquiry">Inquiry Learning</Label>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="metodePembelajaran"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Metode Pembelajaran</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="diskusi" 
                                  checked={field.value.includes("Diskusi")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Diskusi"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Diskusi"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="diskusi">Diskusi</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="wawancara" 
                                  checked={field.value.includes("Wawancara")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Wawancara"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Wawancara"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="wawancara">Wawancara</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="presentasi" 
                                  checked={field.value.includes("Presentasi")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Presentasi"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Presentasi"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="presentasi">Presentasi</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="praktek" 
                                  checked={field.value.includes("Praktek")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Praktek"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Praktek"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="praktek">Praktek</Label>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="kemitraanPembelajaran"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kemitraan Pembelajaran</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="tenagaKesehatan" 
                                  checked={field.value.includes("Tenaga Kesehatan")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Tenaga Kesehatan"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Tenaga Kesehatan"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="tenagaKesehatan">Tenaga Kesehatan</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="masyarakat" 
                                  checked={field.value.includes("Masyarakat")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Masyarakat"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Masyarakat"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="masyarakat">Masyarakat</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="temanSekelas" 
                                  checked={field.value.includes("Teman Sekelas")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Teman Sekelas"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Teman Sekelas"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="temanSekelas">Teman Sekelas</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="sumberTerpercaya" 
                                  checked={field.value.includes("Sumber Terpercaya")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Sumber Terpercaya"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Sumber Terpercaya"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="sumberTerpercaya">Sumber Terpercaya</Label>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lingkunganPembelajaran"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lingkungan Pembelajaran</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="tatapMuka" 
                                  checked={field.value.includes("Tatap Muka")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Tatap Muka"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Tatap Muka"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="tatapMuka">Tatap Muka</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="daring" 
                                  checked={field.value.includes("Daring")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Daring"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Daring"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="daring">Daring</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="hybrid" 
                                  checked={field.value.includes("Hybrid")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Hybrid"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Hybrid"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="hybrid">Hybrid</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="outdoor" 
                                  checked={field.value.includes("Outdoor")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Outdoor"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Outdoor"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="outdoor">Outdoor</Label>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pemanfaatanDigital"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pemanfaatan Digital</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="internet" 
                                  checked={field.value.includes("Internet")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Internet"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Internet"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="internet">Internet</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="aplikasiVisual" 
                                  checked={field.value.includes("Aplikasi Visual")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Aplikasi Visual"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Aplikasi Visual"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="aplikasiVisual">Aplikasi Visual</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="aplikasiOnline" 
                                  checked={field.value.includes("Aplikasi Online")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Aplikasi Online"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Aplikasi Online"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="aplikasiOnline">Aplikasi Online</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="sosialMedia" 
                                  checked={field.value.includes("Sosial Media")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Sosial Media"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Sosial Media"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="sosialMedia">Sosial Media</Label>
                              </div>
                            </div>
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
                    onClick={() => {
                      
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sedang Membuat Perencanaan Pembelajaran...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-5 w-5" />
                        Generate Perencanaan Pembelajaran Sekarang
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
                Semakin detail capaian pembelajaran yang Anda masukkan, semakin spesifik dan berkualitas Perencanaan Pembelajaran yang akan dihasilkan oleh AI.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeneratorForm;