import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Download, ArrowLeft, CheckCircle, Brain, BarChart3 } from "lucide-react";
import PerencanaanPembelajaranViewer from "@/components/RppViewer";
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
    const storedGeneratedPerencanaanPembelajaran = SecurityUtils.storage.getItem('generatedPerencanaanPembelajaran');

    if (storedFormData && storedGeneratedPerencanaanPembelajaran) {
      try {
        const parsedFormData = JSON.parse(storedFormData);
        const parsedGeneratedPerencanaanPembelajaran = JSON.parse(storedGeneratedPerencanaanPembelajaran);
        
        // Basic validation for public app
        if (!parsedFormData.namaGuru || !parsedGeneratedPerencanaanPembelajaran.identitas) {
          throw new Error('Invalid data structure');
        }
        
        setFormData(parsedFormData);
        setGeneratedRPP(parsedGeneratedPerencanaanPembelajaran);
        
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

  const generatePraktikPedagogisNarrative = (rpp: GeneratedRPP): string => {
    const selectedComponents = [];
    
    if (rpp.modelPembelajaran && rpp.modelPembelajaran.length > 0) {
      selectedComponents.push(`Model Pembelajaran: ${rpp.modelPembelajaran.join(", ")}`);
    }
    
    if (rpp.metodePembelajaran && rpp.metodePembelajaran.length > 0) {
      selectedComponents.push(`Metode Pembelajaran: ${rpp.metodePembelajaran.join(", ")}`);
    }
    
    if (rpp.kemitraanPembelajaran && rpp.kemitraanPembelajaran.length > 0) {
      selectedComponents.push(`Kemitraan Pembelajaran: ${rpp.kemitraanPembelajaran.join(", ")}`);
    }
    
    if (rpp.lingkunganPembelajaran && rpp.lingkunganPembelajaran.length > 0) {
      selectedComponents.push(`Lingkungan Pembelajaran: ${rpp.lingkunganPembelajaran.join(", ")}`);
    }
    
    if (rpp.pemanfaatanDigital && rpp.pemanfaatanDigital.length > 0) {
      selectedComponents.push(`Pemanfaatan Digital: ${rpp.pemanfaatanDigital.join(", ")}`);
    }

    if (selectedComponents.length === 0) {
      return "";
    }

    const mataPelajaran = rpp.identitas.mataPelajaran;
    const tema = rpp.identitas.tema;
    const subtema = rpp.identitas.subtema;
    const jenjang = rpp.identitas.satuan.includes("MI") ? "SD" : rpp.identitas.satuan.includes("MTs") ? "SMP" : "SMA";

    let narrative = `Praktik Pedagogis dalam pembelajaran ${mataPelajaran} dengan tema "${tema}" dan subtema "${subtema}" dirancang untuk jenjang ${jenjang} dengan mengintegrasikan berbagai komponen pembelajaran yang saling mendukung. `;

    if (rpp.modelPembelajaran && rpp.modelPembelajaran.length > 0) {
      narrative += `Model pembelajaran yang dipilih (${rpp.modelPembelajaran.join(", ")}) memberikan kerangka kerja yang sistematis dalam mencapai tujuan pembelajaran. `;
    }

    if (rpp.metodePembelajaran && rpp.metodePembelajaran.length > 0) {
      narrative += `Metode pembelajaran (${rpp.metodePembelajaran.join(", ")}) dipilih untuk memfasilitasi proses pembelajaran yang efektif dan menyenangkan. `;
    }

    if (rpp.kemitraanPembelajaran && rpp.kemitraanPembelajaran.length > 0) {
      narrative += `Kemitraan pembelajaran (${rpp.kemitraanPembelajaran.join(", ")}) memastikan kolaborasi yang sinergis antara berbagai pihak dalam mendukung pembelajaran. `;
    }

    if (rpp.lingkunganPembelajaran && rpp.lingkunganPembelajaran.length > 0) {
      narrative += `Lingkungan pembelajaran (${rpp.lingkunganPembelajaran.join(", ")}) diciptakan untuk mendukung suasana belajar yang kondusif dan mendukung. `;
    }

    if (rpp.pemanfaatanDigital && rpp.pemanfaatanDigital.length > 0) {
      narrative += `Pemanfaatan digital (${rpp.pemanfaatanDigital.join(", ")}) mengintegrasikan teknologi untuk meningkatkan efektivitas dan efisiensi pembelajaran. `;
    }

    narrative += `Kombinasi komponen-komponen ini dirancang untuk menciptakan pengalaman pembelajaran yang holistik, bermakna, dan sesuai dengan karakteristik peserta didik jenjang ${jenjang}.`;

    return narrative;
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
            new TableCell({ children: [new Paragraph({ text: rpp.identitas.fase })] })
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

    // Dimensi Kelulusan (8 Dimensi Profil Lulusan)
    children.push(
      new Paragraph({
        text: "DIMENSI KELULUSAN (8 DIMENSI PROFIL LULUSAN)",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    // Display 8 Dimensi Kelulusan based on user selection
    const dimensiKelulusan = rpp.dimensiKelulusan;
    if (dimensiKelulusan) {
      const dimensiList = [
        { key: 'keimananKetakwaan', label: 'Keimanan dan Ketakwaan kepada Tuhan Yang Maha Esa' },
        { key: 'kewargaan', label: 'Kewargaan' },
        { key: 'penalaranKritis', label: 'Penalaran Kritis' },
        { key: 'kreativitas', label: 'Kreativitas' },
        { key: 'kolaborasi', label: 'Kolaborasi' },
        { key: 'kemandirian', label: 'Kemandirian' },
        { key: 'kesehatan', label: 'Kesehatan' },
        { key: 'komunikasi', label: 'Komunikasi' }
      ];

      dimensiList.forEach((dimensi) => {
        const isSelected = dimensiKelulusan[dimensi.key as keyof typeof dimensiKelulusan];
        const checkmark = isSelected ? "✓" : "○";
        children.push(
          new Paragraph({
            text: `${checkmark} ${dimensi.label}`,
            spacing: { after: 100 }
          })
        );
      });
    }

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

    // Generate Materi Insersi KBC based on AI-generated content
    if (rpp.materiInsersiKBC && Object.keys(rpp.materiInsersiKBC).length > 0) {
      Object.entries(rpp.materiInsersiKBC).forEach(([nilaiCinta, content], index) => {
        children.push(
          new Paragraph({
            text: `${String.fromCharCode(65 + index)}. ${content.title}`,
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 300, after: 200 }
          })
        );

        // Add Ayat/Hadits if available
        if (content.ayat) {
          children.push(
            new Paragraph({
              text: `Ayat: ${content.ayat}`,
              spacing: { after: 200 }
            })
          );
        }

        if (content.hadits) {
          children.push(
            new Paragraph({
              text: `Hadits: ${content.hadits}`,
              spacing: { after: 200 }
            })
          );
        }

        // Add Refleksi
        if (content.refleksi) {
          children.push(
            new Paragraph({
              text: `Refleksi: ${content.refleksi}`,
              spacing: { after: 200 }
            })
          );
        }

        // Add Aktivitas
        if (content.aktivitas) {
          children.push(
            new Paragraph({
              text: `Aktivitas: ${content.aktivitas}`,
              spacing: { after: 200 }
            })
          );
        }
      });
    } else {
      // Fallback to basic content if AI content is not available
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

    // Metode Pembelajaran - Moved to Praktik Pedagogis section
    // Removed duplicate section here

    // Media dan Sumber Belajar
    children.push(
      new Paragraph({
        text: "G. MEDIA DAN SUMBER BELAJAR",
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
        text: "H. LANGKAH PEMBELAJARAN",
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
        text: "I. PENILAIAN",
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

    // Generate narrative for Praktik Pedagogis
    const praktikPedagogisNarrative = generatePraktikPedagogisNarrative(rpp);
    if (praktikPedagogisNarrative) {
      children.push(
        new Paragraph({
          text: praktikPedagogisNarrative,
          spacing: { after: 300 }
        })
      );
    }

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

    // Add Materi Insersi KBC if available in the RPP data
    if (rpp.materiInsersiKBC && typeof rpp.materiInsersiKBC === 'object') {
      children.push(
        new Paragraph({
          text: "E. MATERI INSERSI KBC",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 }
        })
      );

      Object.entries(rpp.materiInsersiKBC).forEach(([key, content]) => {
        if (content && typeof content === 'object') {
          // Add title
          children.push(
            new Paragraph({
              text: content.title || key,
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 300, after: 150 }
            })
          );

          // Add ayat/hadits if available
          if (content.ayat) {
            children.push(
              new Paragraph({
                text: `• Ayat: ${content.ayat} "${content.teks}"`,
                spacing: { after: 100 }
              })
            );
          } else if (content.hadits) {
            children.push(
              new Paragraph({
                text: `• Hadits: ${content.hadits} "${content.teks}"`,
                spacing: { after: 100 }
              })
            );
          }

          // Add refleksi
          children.push(
            new Paragraph({
              text: `• Refleksi: ${content.refleksi}`,
              spacing: { after: 100 }
            })
          );

          // Add aktivitas
          children.push(
            new Paragraph({
              text: `• Aktivitas: ${content.aktivitas}`,
              spacing: { after: 200 }
            })
          );
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
      link.download = `Perencanaan_Pembelajaran_${generatedRPP.identitas.mataPelajaran}_${generatedRPP.identitas.kelas}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Download Berhasil! 📄",
        description: "Perencanaan Pembelajaran telah berhasil diunduh dalam format .docx",
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
        description: "Terjadi kesalahan saat mengunduh Perencanaan Pembelajaran",
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
          <p>Loading Perencanaan Pembelajaran...</p>
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
              Perencanaan Pembelajaran Generated with AI
            </Badge>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Perencanaan Pembelajaran <span className="text-primary">Standar Kurikulum</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Perencanaan Pembelajaran lengkap sesuai standar Madrasah yang dihasilkan menggunakan Deep Learning AI
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <PerencanaanPembelajaranViewer rpp={generatedRPP} />
          </div>
          
          <div className="space-y-6">
            <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-center">Download Perencanaan Pembelajaran</CardTitle>
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