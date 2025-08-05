import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Download, ArrowLeft, CheckCircle, Brain, BarChart3 } from "lucide-react";
import RppViewer from "@/components/RppViewer";
import AdvancedAnalytics from "@/components/AdvancedAnalytics";
import FeedbackDialog from "@/components/FeedbackDialog";
import { GeneratedRPP, LearningDocumentFormData } from "@/lib/rpp-generator";
import { SecurityUtils } from "@/lib/security";
import { AnalyticsManager } from "@/lib/analytics";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, WidthType, Table, TableRow, TableCell, BorderStyle } from "docx";

const ResultPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<LearningDocumentFormData | null>(null);
  const [generatedRPP, setGeneratedRPP] = useState<GeneratedRPP | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    // Analytics: Track page view
    AnalyticsManager.trackEvent('page_view', { page: 'result' });
    
    // Get data from simple storage for public app
    const storedFormData = SecurityUtils.storage.getItem('formData');
    const storedGeneratedRPP = SecurityUtils.storage.getItem('generatedRPP');

    if (storedFormData && storedGeneratedRPP) {
      try {
        const parsedFormData = JSON.parse(storedFormData);
        const parsedGeneratedRPP = JSON.parse(storedGeneratedRPP);
        
        // Basic validation for public app
        if (!parsedFormData.namaGuru || !parsedGeneratedRPP.identitas) {
          throw new Error('Invalid data structure');
        }
        
        setFormData(parsedFormData);
        setGeneratedRPP(parsedGeneratedRPP);
        
        SecurityUtils.debugLog('Data loaded from storage');
      } catch (error) {
        SecurityUtils.errorLog('Failed to parse stored data', error);
        AnalyticsManager.trackError(error as Error, 'result_page_data_load');
        toast({
          title: "Data tidak valid",
          description: "Silakan isi form kembali",
          variant: "destructive",
        });
        navigate('/generator');
      }
    } else {
      toast({
        title: "Data tidak ditemukan",
        description: "Silakan isi form terlebih dahulu",
        variant: "destructive",
      });
      navigate('/generator');
    }
  }, [navigate, toast]);

  // Function to generate Materi Insersi KBC content
  const getMateriInsersiKBC = (nilaiCinta: string): string[] => {
    const contentMap: { [key: string]: string[] } = {
      "Cinta Allah": [
        "💖 Cinta Allah dan Rasul-Nya",
        "• Ayat: QS. At-Tin: 4 \"Sesungguhnya Kami telah menciptakan manusia dalam bentuk yang sebaik-baiknya.\"",
        "• Refleksi: Ajak murid merenungi keajaiban ciptaan Allah dan mensyukuri nikmat-Nya.",
        "• Aktivitas: Membuat jurnal rasa syukur atas nikmat yang diberikan Allah."
      ],
      "Cinta Rasul": [
        "💖 Cinta kepada Rasul-Nya",
        "• Narasi: Meneladani semangat Nabi Muhammad SAW dalam mencari ilmu dan mengajarkan kebaikan.",
        "• Aktivitas: Kajian hadits dan refleksi pribadi tentang meneladani Rasulullah SAW."
      ],
      "Cinta Keluarga": [
        "💖 Cinta kepada Keluarga",
        "• Integrasi: Hubungkan pembelajaran dengan tanggung jawab terhadap keluarga.",
        "• Aktivitas: Membuat proyek yang bermanfaat untuk keluarga dan refleksi peran dalam keluarga."
      ],
      "Cinta Sesama": [
        "💖 Cinta kepada Sesama",
        "• Integrasi: Hubungkan pembelajaran dengan kepedulian terhadap sesama manusia.",
        "• Aktivitas: Kolaborasi dalam kelompok dan membantu teman yang membutuhkan."
      ],
      "Cinta Alam": [
        "💖 Cinta kepada Alam",
        "• Integrasi: Hubungkan pembelajaran dengan tanggung jawab terhadap lingkungan.",
        "• Aktivitas: Analisis dampak aktivitas manusia terhadap lingkungan dan kampanye pelestarian."
      ],
      "Cinta Tanah Air": [
        "💖 Cinta kepada Tanah Air",
        "• Integrasi: Hubungkan pembelajaran dengan kecintaan terhadap bangsa dan negara.",
        "• Aktivitas: Kajian sejarah dan budaya Indonesia serta refleksi kontribusi untuk bangsa."
      ]
    };

    return contentMap[nilaiCinta] || [
      "💖 Cinta dalam Pembelajaran",
      "• Integrasi nilai cinta dalam setiap aspek pembelajaran.",
      "• Aktivitas refleksi dan pengamalan nilai cinta dalam kehidupan sehari-hari."
    ];
  };

  const generateDocxContent = (rpp: GeneratedRPP) => {
    const children: any[] = [];

    // Header
    children.push(
      new Paragraph({
        text: "PERENCANAAN PEMBELAJARAN",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 }
      })
    );

    // Document Title
    children.push(
      new Paragraph({
        text: formData.tema.toUpperCase(),
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      })
    );

    // Identitas
    children.push(
      new Paragraph({
        text: "A. IDENTITAS",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    const identitasTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: "Satuan Pendidikan" })] }),
            new TableCell({ children: [new Paragraph({ text: rpp.identitas.satuan })] })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: "Mata Pelajaran" })] }),
            new TableCell({ children: [new Paragraph({ text: rpp.identitas.mataPelajaran })] })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: "Fase" })] }),
            new TableCell({ children: [new Paragraph({ text: `Fase ${rpp.identitas.kelas}` })] })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: "Topik Panca Cinta" })] }),
            new TableCell({ children: [new Paragraph({ text: (rpp.identitas.nilaiCinta || []).join(", ") })] })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: "Alokasi Waktu" })] }),
            new TableCell({ children: [new Paragraph({ text: rpp.identitas.alokasi })] })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: "Penyusun" })] }),
            new TableCell({ children: [new Paragraph({ text: rpp.identitas.namaGuru })] })
          ]
        })
      ]
    });

    children.push(identitasTable);

    // Dimensi Profil Lulusan
    children.push(
      new Paragraph({
        text: "DIMENSI PROFIL LULUSAN",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    const dimensiProfil = [
      "Cinta kepada Tuhan Yang Maha Esa",
      "Cinta kepada Diri dan Sesama",
      "Cinta kepada Ilmu Pengetahuan",
      "Cinta kepada Lingkungan",
      "Cinta kepada Bangsa dan Negeri"
    ];

    dimensiProfil.forEach((dimensi, index) => {
      children.push(
        new Paragraph({
          text: `- ${dimensi}`,
          spacing: { after: 100 }
        })
      );
    });

    // Capaian Pembelajaran
    children.push(
      new Paragraph({
        text: "C. CAPAIAN PEMBELAJARAN",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: `Pengetahuan: ${rpp.capaianPembelajaran.pengetahuan}`,
        spacing: { after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: `Keterampilan: ${rpp.capaianPembelajaran.keterampilan}`,
        spacing: { after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: `Sikap: ${rpp.capaianPembelajaran.sikap}`,
        spacing: { after: 200 }
      })
    );



    // Tujuan Pembelajaran
    children.push(
      new Paragraph({
        text: "D. TUJUAN PEMBELAJARAN",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    (rpp.tujuanPembelajaran || []).forEach((tujuan, index) => {
      children.push(
        new Paragraph({
          text: `• ${tujuan}`,
          spacing: { after: 200 }
        })
      );
    });

    // Materi Insersi KBC
    children.push(
      new Paragraph({
        text: "E. MATERI INSERSI KBC",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    // Generate Materi Insersi KBC based on selected Nilai Cinta
    const nilaiCinta = rpp.identitas.nilaiCinta || [];
    if (nilaiCinta.length > 0) {
      nilaiCinta.forEach((nilai, index) => {
        children.push(
          new Paragraph({
            text: `${String.fromCharCode(65 + index)}. ${nilai}`,
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 300, after: 200 }
          })
        );

        // Add sample content for each Nilai Cinta
        const sampleContent = getMateriInsersiKBC(nilai);
        sampleContent.forEach((content, contentIndex) => {
          children.push(
            new Paragraph({
              text: content,
              spacing: { after: 200 }
            })
          );
        });
      });
    }

    // Materi Pembelajaran
    children.push(
      new Paragraph({
        text: "F. MATERI PEMBELAJARAN",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: "Materi Faktual:",
        spacing: { after: 200 }
      })
    );

    (rpp.materiPembelajaran?.faktual || []).forEach((materi, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${materi}`,
          spacing: { after: 200 }
        })
      );
    });

    children.push(
      new Paragraph({
        text: "Materi Konseptual:",
        spacing: { before: 400, after: 200 }
      })
    );

    (rpp.materiPembelajaran?.konseptual || []).forEach((materi, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${materi}`,
          spacing: { after: 200 }
        })
      );
    });

    children.push(
      new Paragraph({
        text: "Materi Prosedural:",
        spacing: { before: 400, after: 200 }
      })
    );

    (rpp.materiPembelajaran?.prosedural || []).forEach((materi, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${materi}`,
          spacing: { after: 200 }
        })
      );
    });

    children.push(
      new Paragraph({
        text: "Materi Metakognitif:",
        spacing: { before: 400, after: 200 }
      })
    );

    (rpp.materiPembelajaran?.metakognitif || []).forEach((materi, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${materi}`,
          spacing: { after: 200 }
        })
      );
    });

    // Metode Pembelajaran
    children.push(
      new Paragraph({
        text: "G. METODE PEMBELAJARAN",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    (rpp.metodePembelajaran || []).forEach((metode, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${metode}`,
          spacing: { after: 200 }
        })
      );
    });

    // Media dan Sumber Belajar
    children.push(
      new Paragraph({
        text: "H. MEDIA DAN SUMBER BELAJAR",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: "Media:",
        spacing: { after: 200 }
      })
    );

    (rpp.mediaDanSumber?.media || []).forEach((media, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${media}`,
          spacing: { after: 200 }
        })
      );
    });

    children.push(
      new Paragraph({
        text: "Sumber Belajar:",
        spacing: { before: 400, after: 200 }
      })
    );

    (rpp.mediaDanSumber?.sumberBelajar || []).forEach((sumber, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${sumber}`,
          spacing: { after: 200 }
        })
      );
    });

    // Langkah Pembelajaran
    children.push(
      new Paragraph({
        text: "I. LANGKAH PEMBELAJARAN",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: `Pendahuluan (${rpp.langkahPembelajaran.pendahuluan.waktu}):`,
        spacing: { after: 200 }
      })
    );

    (rpp.langkahPembelajaran?.pendahuluan?.kegiatan || []).forEach((kegiatan, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${kegiatan}`,
          spacing: { after: 200 }
        })
      );
    });

    children.push(
      new Paragraph({
        text: `Kegiatan Inti (${rpp.langkahPembelajaran.inti.waktu}):`,
        spacing: { before: 400, after: 200 }
      })
    );

    (rpp.langkahPembelajaran?.inti?.kegiatan || []).forEach((kegiatan, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${kegiatan}`,
          spacing: { after: 200 }
        })
      );
    });

    children.push(
      new Paragraph({
        text: `Penutup (${rpp.langkahPembelajaran.penutup.waktu}):`,
        spacing: { before: 400, after: 200 }
      })
    );

    (rpp.langkahPembelajaran?.penutup?.kegiatan || []).forEach((kegiatan, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${kegiatan}`,
          spacing: { after: 200 }
        })
      );
    });

    // Penilaian
    children.push(
      new Paragraph({
        text: "J. PENILAIAN",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: `Penilaian Sikap - Teknik: ${rpp.penilaian.sikap.teknik}`,
        spacing: { after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: `Penilaian Sikap - Instrumen: ${rpp.penilaian.sikap.instrumen}`,
        spacing: { after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: "Rubrik Penilaian Sikap:",
        spacing: { after: 200 }
      })
    );

    (rpp.penilaian?.sikap?.rubrik || []).forEach((rubrik, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${rubrik}`,
          spacing: { after: 200 }
        })
      );
    });

    children.push(
      new Paragraph({
        text: `Penilaian Pengetahuan - Teknik: ${rpp.penilaian.pengetahuan.teknik}`,
        spacing: { before: 400, after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: `Penilaian Pengetahuan - Instrumen: ${rpp.penilaian.pengetahuan.instrumen}`,
        spacing: { after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: "Kisi-kisi Penilaian Pengetahuan:",
        spacing: { after: 200 }
      })
    );

    (rpp.penilaian?.pengetahuan?.kisiKisi || []).forEach((kisi, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${kisi}`,
          spacing: { after: 200 }
        })
      );
    });

    children.push(
      new Paragraph({
        text: `Penilaian Keterampilan - Teknik: ${rpp.penilaian.keterampilan.teknik}`,
        spacing: { before: 400, after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: `Penilaian Keterampilan - Instrumen: ${rpp.penilaian.keterampilan.instrumen}`,
        spacing: { after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: "Rubrik Penilaian Keterampilan:",
        spacing: { after: 200 }
      })
    );

    (rpp.penilaian?.keterampilan?.rubrik || []).forEach((rubrik, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${rubrik}`,
          spacing: { after: 200 }
        })
      );
    });

    // Praktik Pedagogis
    children.push(
      new Paragraph({
        text: "J. PRAKTIK PEDAGOGIS",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    // Model Pembelajaran
    if (rpp.modelPembelajaran && rpp.modelPembelajaran.length > 0) {
      children.push(
        new Paragraph({
          text: "Model Pembelajaran:",
          spacing: { after: 200 }
        })
      );

      rpp.modelPembelajaran.forEach((model, index) => {
        children.push(
          new Paragraph({
            text: `${index + 1}. ${model}`,
            spacing: { after: 200 }
          })
        );
      });
    }

    // Metode Pembelajaran
    if (rpp.metodePembelajaran && rpp.metodePembelajaran.length > 0) {
      children.push(
        new Paragraph({
          text: "Metode Pembelajaran:",
          spacing: { before: 400, after: 200 }
        })
      );

      rpp.metodePembelajaran.forEach((metode, index) => {
        children.push(
          new Paragraph({
            text: `${index + 1}. ${metode}`,
            spacing: { after: 200 }
          })
        );
      });
    }

    // Kemitraan Pembelajaran
    if (rpp.kemitraanPembelajaran && rpp.kemitraanPembelajaran.length > 0) {
      children.push(
        new Paragraph({
          text: "Kemitraan Pembelajaran:",
          spacing: { before: 400, after: 200 }
        })
      );

      rpp.kemitraanPembelajaran.forEach((kemitraan, index) => {
        children.push(
          new Paragraph({
            text: `${index + 1}. ${kemitraan}`,
            spacing: { after: 200 }
          })
        );
      });
    }

    // Lingkungan Pembelajaran
    if (rpp.lingkunganPembelajaran && rpp.lingkunganPembelajaran.length > 0) {
      children.push(
        new Paragraph({
          text: "Lingkungan Pembelajaran:",
          spacing: { before: 400, after: 200 }
        })
      );

      rpp.lingkunganPembelajaran.forEach((lingkungan, index) => {
        children.push(
          new Paragraph({
            text: `${index + 1}. ${lingkungan}`,
            spacing: { after: 200 }
          })
        );
      });
    }

    // Pemanfaatan Digital
    if (rpp.pemanfaatanDigital && rpp.pemanfaatanDigital.length > 0) {
      children.push(
        new Paragraph({
          text: "Pemanfaatan Digital:",
          spacing: { before: 400, after: 200 }
        })
      );

      rpp.pemanfaatanDigital.forEach((digital, index) => {
        children.push(
          new Paragraph({
            text: `${index + 1}. ${digital}`,
            spacing: { after: 200 }
          })
        );
      });
    }

    // Remedial dan Pengayaan
    children.push(
      new Paragraph({
        text: "K. REMEDIAL DAN PENGAYAAN",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    children.push(
      new Paragraph({
        text: "Remedial:",
        spacing: { after: 200 }
      })
    );

    (rpp.remedialDanPengayaan?.remedial || []).forEach((remedial, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${remedial}`,
          spacing: { after: 200 }
        })
      );
    });

    children.push(
      new Paragraph({
        text: "Pengayaan:",
        spacing: { before: 400, after: 200 }
      })
    );

    (rpp.remedialDanPengayaan?.pengayaan || []).forEach((pengayaan, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${pengayaan}`,
          spacing: { after: 200 }
        })
      );
    });

    // Integrasi Nilai Islam
    children.push(
      new Paragraph({
        text: "L. INTEGRASI NILAI ISLAM",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    (rpp.identitas?.integrasiNilaiIslam || []).forEach((nilai, index) => {
      children.push(
        new Paragraph({
          text: `${index + 1}. ${nilai}`,
          spacing: { after: 200 }
        })
      );
    });

    // Asesmen Autentik
    children.push(
      new Paragraph({
        text: "M. ASESMEN AUTENTIK",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    // Add asesmen autentik if available in the RPP data
    if (rpp.asesmenAutentik && Array.isArray(rpp.asesmenAutentik)) {
      rpp.asesmenAutentik.forEach((asesmen, index) => {
        children.push(
          new Paragraph({
            text: `${index + 1}. ${asesmen}`,
            spacing: { after: 200 }
          })
        );
      });
    }

    // Nilai Cinta Activities
    children.push(
      new Paragraph({
        text: "N. PENGEMBANGAN NILAI CINTA",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    // Add nilai cinta activities if available in the RPP data
    if (rpp.nilaiCinta && typeof rpp.nilaiCinta === 'object') {
      Object.entries(rpp.nilaiCinta).forEach(([key, activities]) => {
        if (activities && Array.isArray(activities) && activities.length > 0) {
          children.push(
            new Paragraph({
              text: `${key}:`,
              spacing: { before: 200, after: 100 }
            })
          );
          activities.forEach((aktivitas, index) => {
            children.push(
              new Paragraph({
                text: `${index + 1}. ${aktivitas}`,
                spacing: { after: 200 }
              })
            );
          });
        }
      });
    }

    return children;
  };

  const handleDownload = async () => {
    if (!generatedRPP) return;
    
    setIsDownloading(true);
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: generateDocxContent(generatedRPP)
          }
        ]
      });

      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `RPP_${generatedRPP.identitas.mataPelajaran}_${generatedRPP.identitas.kelas}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Download Berhasil! 📄",
        description: "RPP telah berhasil diunduh dalam format .docx",
      });
      AnalyticsManager.trackEvent('download_rpp', {
        mata_pelajaran: generatedRPP.identitas.mataPelajaran,
        kelas: generatedRPP.identitas.kelas,
        jenjang: formData?.jenjang || '',
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Gagal",
        description: "Terjadi kesalahan saat mengunduh RPP",
        variant: "destructive",
      });
      AnalyticsManager.trackError(error as Error, 'rpp_download_failed');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!formData || !generatedRPP) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p>Loading RPP...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => navigate('/generator')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Form
          </Button>
          
          <div className="flex items-center gap-4">
            <FeedbackDialog />
            <Button 
              variant="outline" 
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              {showAnalytics ? "Sembunyikan Analytics" : "Tampilkan Analytics"}
            </Button>
            
            <Badge variant="secondary" className="px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              {formData.documentType} Generated with AI
            </Badge>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {formData.documentType} <span className="text-primary">Standar Kurikulum</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {formData.documentType} lengkap sesuai standar Madrasah yang dihasilkan menggunakan Deep Learning AI
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <RppViewer rpp={generatedRPP} />
          </div>
          
          <div className="space-y-6">
            <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-center">Download {formData.documentType}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <Download className="mr-2 h-4 w-4 animate-bounce" />
                      Mengunduh...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download .docx
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;