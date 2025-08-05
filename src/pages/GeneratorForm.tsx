import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, BookOpen, GraduationCap, FileText, Clock, Target, Users, Award, ArrowLeft } from "lucide-react";
import { rppGenerator, LearningDocumentFormData } from "@/lib/rpp-generator";
import { SecurityUtils } from "@/lib/security";
import { AnalyticsManager } from "@/lib/analytics";
import FeedbackDialog from "@/components/FeedbackDialog";
import { Badge } from "@/components/ui/badge";
import { DocumentTypeSelector } from "@/components/ui/document-type-selector";

// Form validation schema with security measures - Updated for Love-Based Curriculum
const formSchema = z.object({
  satuanPendidikan: z.string().min(1, "Satuan pendidikan harus diisi").max(100, "Satuan pendidikan terlalu panjang"),
  jenjang: z.enum(["MI", "MTs", "MA"]),
  kelas: z.string().min(1, "Kelas harus diisi").max(10, "Kelas terlalu panjang"),
  semester: z.enum(["Ganjil", "Genap"]),
  mataPelajaran: z.string().min(1, "Mata pelajaran harus diisi").max(100, "Mata pelajaran terlalu panjang"),
  tema: z.string().min(1, "Tema harus diisi").max(200, "Tema terlalu panjang"),
  subtema: z.string().min(1, "Sub tema harus diisi").max(500, "Sub tema terlalu panjang"),
  alokasi: z.string().min(1, "Alokasi waktu harus diisi").max(50, "Alokasi waktu terlalu panjang"),
  pertemuan: z.number().min(1, "Pertemuan minimal 1").max(100, "Pertemuan terlalu banyak"),
  namaGuru: z.string().min(1, "Nama guru harus diisi").max(100, "Nama guru terlalu panjang"),
  
  // Document Type Selection
  documentType: z.enum(["RPP", "LDP"]),
  
  // Love-Based Curriculum Structure
  pendekatanPembelajaran: z.enum(["Love-Based", "Holistic", "Character-Building"]),
  nilaiCinta: z.object({
    cintaAllah: z.boolean().default(false),
    cintaRasul: z.boolean().default(false),
    cintaKeluarga: z.boolean().default(false),
    cintaSesama: z.boolean().default(false),
    cintaAlam: z.boolean().default(false),
    cintaTanahAir: z.boolean().default(false),
  }),
  
  // Learning Outcomes
  capaianPembelajaran: z.object({
    pengetahuan: z.string().min(1, "Pengetahuan harus diisi").max(500, "Pengetahuan terlalu panjang"),
    keterampilan: z.string().min(1, "Keterampilan harus diisi").max(500, "Keterampilan terlalu panjang"),
    sikap: z.string().min(1, "Sikap harus diisi").max(500, "Sikap terlalu panjang"),
  }),
  
  // Assessment & Evaluation
  asesmenAutentik: z.array(z.string()).min(1, "Pilih minimal 1 asesmen autentik"),
  penilaianKarakter: z.array(z.string()).min(1, "Pilih minimal 1 penilaian karakter"),
  integrasiNilaiIslam: z.array(z.string()).min(1, "Pilih minimal 1 integrasi nilai Islam"),
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
      kelas: "",
      semester: "Ganjil",
      mataPelajaran: "",
      tema: "",
      subtema: "",
      alokasi: "2 x 40 menit",
      pertemuan: 1,
      namaGuru: "",
      
      // Document Type Selection
      documentType: "RPP",
      
      // Love-Based Curriculum Structure
      pendekatanPembelajaran: "Love-Based",
      nilaiCinta: {
        cintaAllah: false,
        cintaRasul: false,
        cintaKeluarga: false,
        cintaSesama: false,
        cintaAlam: false,
        cintaTanahAir: false,
      },
      
      // Learning Outcomes
      capaianPembelajaran: {
        pengetahuan: "",
        keterampilan: "",
        sikap: "",
      },
      
      // Assessment & Evaluation
      asesmenAutentik: [],
      penilaianKarakter: [],
      integrasiNilaiIslam: [],
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

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log('Form submission started'); // Debug log
    console.log('Raw form data:', data); // Debug log
    
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
      console.log('Sanitized form data:', sanitizedData); // Debug log
      
      // Check required fields
      const requiredFields = {
        namaGuru: sanitizedData.namaGuru,
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
        console.log('Missing fields:', missingFields);
        toast({
          title: "Data tidak lengkap",
          description: `Mohon lengkapi: ${missingFields.join(', ')}`,
          variant: "destructive",
        });
        return;
      }

      console.log('Validation passed, proceeding to generation...'); // Debug log
      setIsLoading(true);
      console.log('Starting document generation...'); // Debug log
      
      // Analytics: Track form submission
      AnalyticsManager.trackFormSubmission(sanitizedData);
      
      // Generate document with sanitized data
      console.log('Calling generateLearningDocument...'); // Debug log
      let generatedRPP;
      try {
        generatedRPP = await rppGenerator.generateLearningDocument(sanitizedData);
        console.log('Document generated successfully:', generatedRPP); // Debug log
      } catch (genError) {
        console.error('Error in generateLearningDocument:', genError);
        throw genError;
      }
      
      // Store data in simple storage
      console.log('Storing data in storage...'); // Debug log
      SecurityUtils.storage.setItem('formData', JSON.stringify(sanitizedData));
      SecurityUtils.storage.setItem('generatedRPP', JSON.stringify(generatedRPP));
      
      // Log activity for public app
      SecurityUtils.debugLog('Document generated successfully', { 
        mataPelajaran: sanitizedData.mataPelajaran,
        tema: sanitizedData.tema,
        documentType: sanitizedData.documentType,
        timestamp: new Date().toISOString()
      });
      
      console.log('Navigating to result page...'); // Debug log
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Halaman Utama
          </Button>
          
          <div className="flex items-center gap-4">
            <FeedbackDialog />
            <Badge variant="secondary" className="px-4 py-2">
              <BookOpen className="h-4 w-4 mr-2" />
              Generator {form.watch("documentType") || "RPP"} Madrasah
            </Badge>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Generator {form.watch("documentType") || "RPP"}
            <span className="block text-primary">Madrasah</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lengkapi form di bawah ini untuk membuat {form.watch("documentType") === "LDP" ? "LDP" : "RPP"} yang sesuai dengan kurikulum Madrasah
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Form Data {form.watch("documentType") || "RPP"}
            </CardTitle>
            <CardDescription className="text-base">
              Masukkan informasi yang diperlukan untuk membuat {form.watch("documentType") === "LDP" ? "LDP" : "RPP"} Anda
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={(e) => {
                console.log('Form onSubmit event triggered'); // Debug log
                form.handleSubmit(handleSubmit)(e);
              }} className="space-y-6">
                {/* Document Type Selection */}
                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Pilih Jenis Dokumen</FormLabel>
                      <FormControl>
                        <DocumentTypeSelector
                          selectedType={field.value}
                          onTypeChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                    <div className="grid md:grid-cols-2 gap-4">
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
                      name="capaianPembelajaran.pengetahuan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pengetahuan</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: Memahami konsep penjumlahan dan pengurangan bilangan bulat" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="capaianPembelajaran.keterampilan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Keterampilan</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: Mampu melakukan penjumlahan dan pengurangan bilangan bulat dengan benar" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="capaianPembelajaran.sikap"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sikap</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: Menunjukkan sikap kreatif dan inovatif dalam menyelesaikan masalah" {...field} />
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
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="cintaAllah" 
                                  checked={field.value.cintaAllah} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, cintaAllah: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="cintaAllah">Cinta Allah</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="cintaRasul" 
                                  checked={field.value.cintaRasul} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, cintaRasul: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="cintaRasul">Cinta Rasul</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="cintaKeluarga" 
                                  checked={field.value.cintaKeluarga} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, cintaKeluarga: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="cintaKeluarga">Cinta Keluarga</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="cintaSesama" 
                                  checked={field.value.cintaSesama} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, cintaSesama: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="cintaSesama">Cinta Sesama</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="cintaAlam" 
                                  checked={field.value.cintaAlam} 
                                  onCheckedChange={(checked) => 
                                    field.onChange({ ...field.value, cintaAlam: checked as boolean })
                                  } 
                                />
                                <Label htmlFor="cintaAlam">Cinta Alam</Label>
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
                      name="capaianPembelajaran.pengetahuan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pengetahuan</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: Memahami konsep penjumlahan dan pengurangan bilangan bulat" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="capaianPembelajaran.keterampilan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Keterampilan</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: Mampu melakukan penjumlahan dan pengurangan bilangan bulat dengan benar" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="capaianPembelajaran.sikap"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sikap</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: Menunjukkan sikap kreatif dan inovatif dalam menyelesaikan masalah" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="asesmenAutentik"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asesmen Autentik</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="asesmenAutentik1" 
                                  checked={field.value.includes("Asesmen Autentik 1")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Asesmen Autentik 1"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Asesmen Autentik 1"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="asesmenAutentik1">Asesmen Autentik 1</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="asesmenAutentik2" 
                                  checked={field.value.includes("Asesmen Autentik 2")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Asesmen Autentik 2"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Asesmen Autentik 2"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="asesmenAutentik2">Asesmen Autentik 2</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="asesmenAutentik3" 
                                  checked={field.value.includes("Asesmen Autentik 3")} 
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, "Asesmen Autentik 3"]);
                                    } else {
                                      field.onChange(field.value.filter(item => item !== "Asesmen Autentik 3"));
                                    }
                                  }} 
                                />
                                <Label htmlFor="asesmenAutentik3">Asesmen Autentik 3</Label>
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
                      console.log('Submit button clicked'); // Debug log
                      console.log('Form state:', form.getValues()); // Debug log
                      console.log('Form errors:', form.formState.errors); // Debug log
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sedang Membuat {form.watch("documentType") || "RPP"}...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-5 w-5" />
                        Generate {form.watch("documentType") || "RPP"} Sekarang
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
                Semakin detail capaian pembelajaran yang Anda masukkan, semakin spesifik dan berkualitas {form.watch("documentType") || "RPP"} yang akan dihasilkan oleh AI.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeneratorForm;