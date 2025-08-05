// Interface untuk data form Learning Document - Updated for Love-Based Curriculum
export interface LearningDocumentFormData {
  // Basic Identity
  satuanPendidikan: string;
  jenjang: "MI" | "MTs" | "MA";
  fase: string; // New field for Fase
  kelas: string;
  semester: "Ganjil" | "Genap";
  mataPelajaran: string;
  tema: string;
  subtema: string;
  alokasi: string;
  pertemuan: number;
  namaGuru: string;
  

  
  // Love-Based Curriculum Structure
  pendekatanPembelajaran: "Love-Based" | "Holistic" | "Character-Building";
  nilaiCinta: {
    cintaAllah: boolean;
    cintaRasul: boolean;
    cintaKeluarga: boolean;
    cintaSesama: boolean;
    cintaAlam: boolean;
    cintaTanahAir: boolean;
  };
  
  // Learning Outcomes
  capaianPembelajaran: {
    pengetahuan: string;
    keterampilan: string;
    sikap: string;
  };
  
  // Assessment & Evaluation
  asesmenAutentik: string[];
  penilaianKarakter: string[];
  integrasiNilaiIslam: string[];
  
  // Praktik Pedagogis (New Section)
  modelPembelajaran: string[];
  metodePembelajaran: string[];
  kemitraanPembelajaran: string[];
  lingkunganPembelajaran: string[];
  pemanfaatanDigital: string[];
}

// Interface untuk hasil RPP yang dihasilkan - Updated for Love-Based Curriculum
export interface GeneratedRPP {
  identitas: {
    satuan: string;
    fase: string;
    kelas: string;
    semester: string;
    mataPelajaran: string;
    tema: string;
    subtema: string;
    alokasi: string;
    pertemuan: number;
    namaGuru: string;
    pendekatanPembelajaran: string;
    nilaiCinta: string[];
    integrasiNilaiIslam: string[];
  };
  
  // Removed: kompetensiInti, kompetensiDasar, indikator
  // Added: Love-Based Curriculum structure
  
  capaianPembelajaran: {
    pengetahuan: string;
    keterampilan: string;
    sikap: string;
  };
  
  tujuanPembelajaran: string[];
  
  materiPembelajaran: {
    faktual: string[];
    konseptual: string[];
    prosedural: string[];
    metakognitif: string[];
  };
  
  metodePembelajaran: string[];
  
  mediaDanSumber: {
    media: string[];
    sumberBelajar: string[];
  };
  
  langkahPembelajaran: {
    pendahuluan: {
      waktu: string;
      kegiatan: string[];
    };
    inti: {
      waktu: string;
      kegiatan: string[];
    };
    penutup: {
      waktu: string;
      kegiatan: string[];
    };
  };
  
  penilaian: {
    sikap: {
      teknik: string;
      instrumen: string;
      rubrik: string[];
    };
    pengetahuan: {
      teknik: string;
      instrumen: string;
      kisiKisi: string[];
    };
    keterampilan: {
      teknik: string;
      instrumen: string;
      rubrik: string[];
    };
    karakter: {
      teknik: string;
      instrumen: string;
      rubrik: string[];
    };
  };
  
  remedialDanPengayaan: {
    remedial: string[];
    pengayaan: string[];
  };
  
  // Love-Based Curriculum additions
  nilaiCinta?: {
    cintaAllah: string[];
    cintaRasul: string[];
    cintaKeluarga: string[];
    cintaSesama: string[];
    cintaAlam: string[];
    cintaTanahAir: string[];
  };
  
  aspekKarakter?: string[];
  asesmenAutentik?: string[];
  penilaianKarakter?: string[];
  
  // Praktik Pedagogis (New Section)
  modelPembelajaran?: string[];
  metodePembelajaran?: string[];
  kemitraanPembelajaran?: string[];
  lingkunganPembelajaran?: string[];
  pemanfaatanDigital?: string[];
}



// Deep Learning Perencanaan Pembelajaran Generator Class
export class PerencanaanPembelajaranGenerator {
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
  
      
      // Simulate initialization delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      this.isInitialized = true;
      
    } catch (error) {
      console.error("Failed to initialize Perencanaan Pembelajaran Generator:", error);
      throw new Error("Gagal menginisialisasi Perencanaan Pembelajaran Generator");
    }
  }

  // Generate comprehensive Perencanaan Pembelajaran using enhanced AI approach with Phase 3 features
  async generateLearningDocument(formData: LearningDocumentFormData): Promise<GeneratedRPP> {

    
    // Add small delay to show loading state, then generate quickly
    await new Promise(resolve => setTimeout(resolve, 500));

    // Use enhanced AI content generation
    const enhancedContent = await this.generateAIContent(formData);
    
    // Generate personalized recommendations
    const personalizedRecommendations = this.generatePersonalizedRecommendations(formData);

    // Construct complete Perencanaan Pembelajaran based on Kurikulum Berbasis Cinta with Phase 3
    const perencanaanPembelajaran: GeneratedRPP = {
      identitas: {
        satuan: formData.satuanPendidikan,
        kelas: formData.kelas,
        semester: formData.semester,
        mataPelajaran: formData.mataPelajaran,
        tema: formData.tema,
        subtema: formData.subtema,
        alokasi: formData.alokasi,
        pertemuan: formData.pertemuan,
        namaGuru: formData.namaGuru,
        // Love-Based Curriculum additions
        pendekatanPembelajaran: formData.pendekatanPembelajaran,
        nilaiCinta: this.formatNilaiCinta(formData.nilaiCinta),
        integrasiNilaiIslam: enhancedContent.integrasiNilaiIslam
      },

              // Love-Based Curriculum structure
      capaianPembelajaran: formData.capaianPembelajaran,

      tujuanPembelajaran: enhancedContent.tujuanPembelajaran,

      materiPembelajaran: enhancedContent.materiPembelajaran,

      metodePembelajaran: this.getRecommendedMethods(formData),

      mediaDanSumber: {
        media: [
          "Papan tulis/whiteboard",
          "Proyektor LCD",
          "Laptop/komputer",
          "Media visual (gambar, chart)",
          "Alat peraga sesuai materi",
          ...(enhancedContent.integrasiNilaiIslam || []).map(tik => `Teknologi: ${tik}`)
        ],
        sumberBelajar: [
          `Buku teks ${formData.mataPelajaran} Kelas ${formData.kelas}`,
          "Al-Qur'an dan Hadits",
          "Internet (sumber terpercaya)",
          "Lingkungan sekitar",
          "Narasumber ahli",
          "Platform pembelajaran digital"
        ]
      },

      langkahPembelajaran: enhancedContent.langkahPembelajaran,

      penilaian: enhancedContent.penilaian,

      remedialDanPengayaan: enhancedContent.remedialDanPengayaan,

      // Love-Based Curriculum additions
      nilaiCinta: enhancedContent.nilaiCinta || {},
      aspekKarakter: enhancedContent.aspekKarakter || [],
      asesmenAutentik: enhancedContent.asesmenAutentik || [],
      penilaianKarakter: enhancedContent.penilaianKarakter || []
    };

    
    return perencanaanPembelajaran;
  }

  // Enhanced AI content generation for Kurikulum Merdeka Kementerian Agama
  private async generateAIContent(formData: LearningDocumentFormData): Promise<any> {
    try {
      // Enhanced prompts for deep learning and Kurikulum Merdeka
      const enhancedPrompt = this.buildEnhancedPrompt(formData);
      

      
      // Simulate AI processing with enhanced content
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        tujuanPembelajaran: this.generateTujuanPembelajaran(formData),
        materiPembelajaran: this.generateMateriPembelajaran(formData),
        langkahPembelajaran: this.generateLangkahPembelajaran(formData),
        penilaian: this.generatePenilaian(formData),
        remedialDanPengayaan: this.generateRemedialPengayaan(formData),
        integrasiNilaiIslam: this.generateIslamicIntegration(formData),
        asesmenAutentik: this.generateAsesmenAutentik(formData),
        nilaiCinta: this.generateNilaiCinta(formData.nilaiCinta),
        aspekKarakter: this.generateCharacterDevelopment(formData),
        penilaianKarakter: this.generateCharacterDevelopment(formData)
      };
    } catch (error) {
      console.error("Error in enhanced AI generation:", error);
      throw new Error("Gagal menghasilkan konten AI yang ditingkatkan");
    }
  }

  // Build enhanced prompt for deep learning
  private buildEnhancedPrompt(formData: LearningDocumentFormData): string {
    const nilaiCinta = Object.entries(formData.nilaiCinta || {})
      .filter(([_, value]) => value)
      .map(([key, _]) => key)
      .join(", ");

    return `
      Buat Perencanaan Pembelajaran untuk ${formData.mataPelajaran} kelas ${formData.kelas} ${formData.jenjang} 
      dengan pendekatan pembelajaran ${formData.pendekatanPembelajaran}.
      
      Nilai Cinta yang dikembangkan: ${nilaiCinta}
      
      Capaian Pembelajaran:
      - Pengetahuan: ${formData.capaianPembelajaran.pengetahuan}
      - Keterampilan: ${formData.capaianPembelajaran.keterampilan}
      - Sikap: ${formData.capaianPembelajaran.sikap}
      
      Integrasi Nilai Islam: ${(formData.integrasiNilaiIslam || []).join(", ")}
      Asesmen Autentik: ${(formData.asesmenAutentik || []).join(", ")}
      
      Fokus pada:
      1. Deep Learning dan Higher Order Thinking Skills (HOTS)
      2. Pembelajaran yang bermakna dan kontekstual
      3. Integrasi nilai-nilai Islam yang relevan
      4. Asesmen autentik yang sesuai
      5. Pengembangan Nilai-Nilai Cinta dalam Kurikulum Berbasis Cinta
    `;
  }

  // Generate enhanced Kompetensi Dasar with specific tema and subtema
  private generateKompetensiDasar(formData: LearningDocumentFormData): any {
    const modelPembelajaran = formData.pendekatanPembelajaran;
    const mataPelajaran = formData.mataPelajaran;
    const tema = formData.tema;
    const subtema = formData.subtema;
    
    let pengetahuan = "";
    let keterampilan = "";
    
    switch (modelPembelajaran) {
      case "Love-Based":
        pengetahuan = `Memahami konsep dasar ${tema} dalam ${mataPelajaran} melalui proyek yang bermakna`;
        keterampilan = `Menerapkan pengetahuan ${subtema} dalam menyelesaikan proyek nyata terkait ${tema}`;
        break;
      case "Holistic":
        pengetahuan = `Menganalisis masalah terkait ${tema} dalam ${mataPelajaran} secara sistematis`;
        keterampilan = `Menyelesaikan masalah ${subtema} dengan solusi yang kreatif dan sesuai syariah`;
        break;
      case "Character-Building":
        pengetahuan = `Menemukan konsep ${tema} dalam ${mataPelajaran} melalui eksplorasi mandiri`;
        keterampilan = `Mengkonstruksi pemahaman ${subtema} secara aktif dan kritis`;
        break;
      default:
        pengetahuan = `Memahami konsep dasar ${tema} dalam ${mataPelajaran}`;
        keterampilan = `Menerapkan konsep ${subtema} dalam kehidupan sehari-hari sesuai ajaran Islam`;
    }
    
    return { pengetahuan, keterampilan };
  }

  // Generate enhanced Indikator with HOTS and specific tema
  private generateIndikator(formData: LearningDocumentFormData): any {
    const mataPelajaran = formData.mataPelajaran;
    const tema = formData.tema;
    const subtema = formData.subtema;
    const modelPembelajaran = formData.pendekatanPembelajaran;
    
    const indikatorPengetahuan = [
      `Mengidentifikasi konsep dasar ${tema} dalam ${mataPelajaran}`,
      `Menganalisis hubungan antar konsep dalam ${subtema}`,
      `Mengevaluasi penerapan konsep ${tema} dalam konteks nyata sesuai syariah`,
      `Menciptakan solusi inovatif berdasarkan pemahaman ${subtema}`
    ];
    
    const indikatorKeterampilan = [
      `Mendemonstrasikan keterampilan dasar terkait ${tema}`,
      `Menerapkan strategi pemecahan masalah dalam ${subtema}`,
      `Mengkomunikasikan hasil pembelajaran ${tema} secara efektif`,
      `Berkolaborasi dalam menyelesaikan tugas terkait ${subtema}`
    ];
    
    return { pengetahuan: indikatorPengetahuan, keterampilan: indikatorKeterampilan };
  }

  // Generate enhanced Tujuan Pembelajaran with specific tema
  private generateTujuanPembelajaran(formData: LearningDocumentFormData): string[] {
    const mataPelajaran = formData.mataPelajaran;
    const tema = formData.tema;
    const subtema = formData.subtema;
    const modelPembelajaran = formData.pendekatanPembelajaran;
    const nilaiCinta = formData.nilaiCinta;
    
    const tujuan = [
      `Siswa mampu memahami konsep dasar ${tema} dalam ${mataPelajaran} dengan benar`,
      `Siswa dapat menerapkan pengetahuan ${subtema} dalam situasi nyata sesuai syariah`,
      `Siswa mampu menganalisis dan memecahkan masalah terkait ${tema}`,
      `Siswa dapat mengkomunikasikan hasil pembelajaran ${subtema} secara efektif`,
      `Siswa mampu bekerja sama dalam menyelesaikan tugas terkait ${tema}`,
      `Siswa dapat mengembangkan sikap kreatif dan inovatif dalam pembelajaran ${subtema}`
    ];
    
    // Add Love-Based Curriculum objectives based on selected nilai cinta
    if (nilaiCinta.cintaAllah) {
      tujuan.push(`Siswa mampu mengintegrasikan nilai cinta kepada Allah dalam pembelajaran ${subtema}`);
    }
    if (nilaiCinta.cintaRasul) {
      tujuan.push(`Siswa mampu meneladani sikap Rasulullah dalam memahami ${tema}`);
    }
    if (nilaiCinta.cintaKeluarga) {
      tujuan.push(`Siswa mampu menerapkan pembelajaran ${subtema} dalam konteks keluarga`);
    }
    if (nilaiCinta.cintaSesama) {
      tujuan.push(`Siswa mampu berkolaborasi dengan sesama dalam pembelajaran ${tema}`);
    }
    if (nilaiCinta.cintaAlam) {
      tujuan.push(`Siswa mampu menghargai dan menjaga alam dalam konteks ${subtema}`);
    }
    if (nilaiCinta.cintaTanahAir) {
      tujuan.push(`Siswa mampu mengaplikasikan ${tema} untuk kemajuan tanah air`);
    }
    
    // Add model-specific objectives
    if (modelPembelajaran === "Love-Based") {
      tujuan.push(`Siswa mampu menyelesaikan proyek ${tema} yang bermakna dan sesuai syariah`);
    } else if (modelPembelajaran === "Holistic") {
      tujuan.push(`Siswa mampu mengidentifikasi dan menyelesaikan masalah terkait ${subtema}`);
    }
    
    return tujuan;
  }

  // Generate enhanced Materi Pembelajaran with specific tema
  private generateMateriPembelajaran(formData: LearningDocumentFormData): any {
    const mataPelajaran = formData.mataPelajaran;
    const tema = formData.tema;
    const subtema = formData.subtema;
    
    return {
      faktual: [
        `Konsep dasar ${tema} dalam ${mataPelajaran}`,
        `Fakta-fakta penting tentang ${subtema}`,
        `Contoh-contoh penerapan ${tema} dalam kehidupan sehari-hari`
      ],
      konseptual: [
        `Prinsip-prinsip dalam ${tema} sesuai syariah`,
        `Teori-teori yang mendukung pemahaman ${subtema}`,
        `Hubungan antar konsep dalam ${tema} dan ${subtema}`
      ],
      prosedural: [
        `Langkah-langkah pemecahan masalah terkait ${tema}`,
        `Prosedur kerja dalam memahami ${subtema}`,
        `Metode-metode pembelajaran ${tema} yang efektif`
      ],
      metakognitif: [
        `Strategi belajar ${subtema} secara sistematis`,
        `Refleksi pembelajaran ${tema} dalam konteks Islami`,
        `Pengembangan pemikiran kritis dalam memahami ${subtema}`
      ]
    };
  }

  // Generate enhanced Integrasi TIK
  private generateIntegrasiTIK(formData: LearningDocumentFormData): string[] {
    const mataPelajaran = formData.mataPelajaran;
    const selectedTIK = formData.integrasiNilaiIslam;
    
    const tikOptions = [
      `Penggunaan aplikasi digital untuk pembelajaran ${mataPelajaran}`,
      `Pemanfaatan video pembelajaran interaktif ${mataPelajaran}`,
      `Penggunaan simulasi digital untuk ${mataPelajaran}`,
      `Pemanfaatan platform pembelajaran online untuk ${mataPelajaran}`,
      `Penggunaan alat digital untuk presentasi ${mataPelajaran}`,
      `Pemanfaatan media sosial untuk kolaborasi ${mataPelajaran}`
    ];
    
    return selectedTIK.length > 0 ? selectedTIK : [tikOptions[0], tikOptions[1]];
  }

  // Generate enhanced Asesmen Autentik
  private generateAsesmenAutentik(formData: LearningDocumentFormData): string[] {
    const mataPelajaran = formData.mataPelajaran;
    const tema = formData.tema;
    const subtema = formData.subtema;
    const modelPembelajaran = formData.pendekatanPembelajaran;
    const selectedAsesmen = formData.asesmenAutentik;
    
    const asesmenOptions = [
      `Portfolio pembelajaran ${mataPelajaran} yang mencakup pemahaman ${tema} dan ${subtema}`,
      `Proyek nyata terkait ${mataPelajaran} yang mengintegrasikan ${tema} dalam kehidupan sehari-hari`,
      `Presentasi hasil pembelajaran ${mataPelajaran} dengan fokus pada ${subtema}`,
      `Demonstrasi keterampilan ${mataPelajaran} dalam menerapkan konsep ${tema}`,
      `Refleksi pembelajaran ${mataPelajaran} yang mencakup pengalaman belajar ${subtema}`,
      `Penilaian diri dan teman sejawat untuk ${mataPelajaran} dengan rubrik yang jelas`,
      `Observasi langsung terhadap penerapan ${tema} dalam konteks nyata`,
      `Wawancara mendalam tentang pemahaman ${subtema} dalam ${mataPelajaran}`,
      `Jurnal pembelajaran ${mataPelajaran} yang mencatat perkembangan pemahaman ${tema}`,
      `Penilaian berbasis kinerja untuk ${mataPelajaran} dengan fokus pada ${subtema}`
    ];
    
    // If user selected specific asesmen, use them, otherwise generate comprehensive ones
    if (selectedAsesmen.length > 0) {
      return selectedAsesmen.map((asesmen, index) => 
        `${asesmen} - ${asesmenOptions[index % asesmenOptions.length]}`
      );
    }
    
    // Generate comprehensive asesmen based on model pembelajaran
    const comprehensiveAsesmen = [];
    
    if (modelPembelajaran === "Love-Based") {
      comprehensiveAsesmen.push(
        `Proyek cinta dalam ${mataPelajaran} - Siswa membuat proyek yang mencerminkan nilai cinta dalam konteks ${tema}`,
        `Portfolio pembelajaran berbasis cinta - Mengumpulkan bukti pembelajaran ${subtema} yang mengintegrasikan nilai-nilai cinta`,
        `Refleksi pembelajaran dengan nilai cinta - Siswa merefleksikan pembelajaran ${mataPelajaran} dalam konteks nilai cinta`
      );
    } else if (modelPembelajaran === "Holistic") {
      comprehensiveAsesmen.push(
        `Penilaian holistik ${mataPelajaran} - Mengintegrasikan aspek kognitif, afektif, dan psikomotor dalam ${tema}`,
        `Proyek terintegrasi ${mataPelajaran} - Menggabungkan berbagai aspek pembelajaran ${subtema}`,
        `Observasi pembelajaran holistik - Mengamati perkembangan siswa dalam ${mataPelajaran} secara menyeluruh`
      );
    } else {
      comprehensiveAsesmen.push(
        `Portfolio pembelajaran ${mataPelajaran} - Mengumpulkan bukti pembelajaran ${tema} dan ${subtema}`,
        `Proyek nyata terkait ${mataPelajaran} - Menerapkan konsep ${subtema} dalam situasi nyata`,
        `Presentasi hasil pembelajaran ${mataPelajaran} - Menyampaikan pemahaman ${tema} secara efektif`
      );
    }
    
    return comprehensiveAsesmen;
  }

  // Generate enhanced Profil Pelajar Pancasila
  private generateProfilPelajarPancasila(formData: LearningDocumentFormData): any {
    const selectedProfil = formData.profilPelajarPancasila;
    const mataPelajaran = formData.mataPelajaran;
    
    const profilActivities = {
      berimanBertakwa: [
        `Mengawali pembelajaran dengan doa`,
        `Mengintegrasikan nilai-nilai Islam dalam pembelajaran ${mataPelajaran}`,
        `Mengembangkan sikap syukur dalam belajar ${mataPelajaran}`
      ],
      mandiri: [
        `Mengembangkan kemampuan belajar mandiri dalam ${mataPelajaran}`,
        `Mengambil inisiatif dalam pembelajaran ${mataPelajaran}`,
        `Bertanggung jawab atas hasil belajar ${mataPelajaran}`
      ],
      bernalarKritis: [
        `Menganalisis informasi ${mataPelajaran} secara kritis`,
        `Mengevaluasi berbagai sumber belajar ${mataPelajaran}`,
        `Mengembangkan argumentasi logis dalam ${mataPelajaran}`
      ],
      kreatif: [
        `Mengembangkan ide kreatif dalam pembelajaran ${mataPelajaran}`,
        `Menciptakan solusi inovatif untuk masalah ${mataPelajaran}`,
        `Mengekspresikan pemahaman ${mataPelajaran} secara kreatif`
      ],
      bergotongRoyong: [
        `Berkolaborasi dalam menyelesaikan tugas ${mataPelajaran}`,
        `Membantu teman dalam memahami ${mataPelajaran}`,
        `Mengembangkan sikap saling menghargai dalam pembelajaran ${mataPelajaran}`
      ],
      berkebinekaanGlobal: [
        `Menghargai keragaman dalam pembelajaran ${mataPelajaran}`,
        `Mengembangkan perspektif global dalam ${mataPelajaran}`,
        `Mengintegrasikan nilai-nilai universal dalam ${mataPelajaran}`
      ],
      rahmatanLilAlamin: [
        `Mengembangkan sikap peduli terhadap lingkungan dalam ${mataPelajaran}`,
        `Menerapkan pembelajaran ${mataPelajaran} untuk kebaikan umat`,
        `Mengembangkan sikap rahmatan lil 'alamin dalam ${mataPelajaran}`
      ]
    };
    
    const selectedActivities = [];
    Object.entries(selectedProfil).forEach(([key, value]) => {
      if (value && profilActivities[key as keyof typeof profilActivities]) {
        selectedActivities.push(...profilActivities[key as keyof typeof profilActivities]);
      }
    });
    
    return selectedActivities;
  }

  // Generate enhanced Langkah Pembelajaran with specific tema
  private generateLangkahPembelajaran(formData: LearningDocumentFormData): any {
    const mataPelajaran = formData.mataPelajaran;
    const tema = formData.tema;
    const subtema = formData.subtema;
    const modelPembelajaran = formData.pendekatanPembelajaran;
    
    const pendahuluan = [
      "Mengawali pembelajaran dengan doa",
      "Mengondisikan siswa untuk siap belajar",
      `Mengaitkan materi ${tema} dengan pengalaman siswa`,
      "Menyampaikan tujuan pembelajaran"
    ];
    
    let inti = [];
    switch (modelPembelajaran) {
      case "Love-Based":
        inti = [
          `Mengidentifikasi masalah atau proyek terkait ${tema} yang akan dikerjakan`,
          `Merencanakan langkah-langkah penyelesaian proyek ${subtema}`,
          "Melaksanakan proyek secara kolaboratif",
          "Mengumpulkan dan menganalisis data",
          `Menyusun laporan hasil proyek ${tema}`
        ];
        break;
      case "Holistic":
        inti = [
          `Mengidentifikasi masalah terkait ${tema} yang relevan`,
          `Menganalisis masalah ${subtema} secara sistematis`,
          "Mengumpulkan informasi untuk menyelesaikan masalah",
          "Mengembangkan solusi alternatif",
          "Menyajikan dan mengevaluasi solusi"
        ];
        break;
      case "Character-Building":
        inti = [
          `Mengamati fenomena atau objek pembelajaran terkait ${tema}`,
          `Mengajukan pertanyaan berdasarkan pengamatan ${subtema}`,
          "Melakukan eksplorasi untuk menemukan jawaban",
          "Mengkonstruksi pemahaman berdasarkan temuan",
          "Menyimpulkan hasil eksplorasi"
        ];
        break;
      default:
        inti = [
          `Menyampaikan materi pembelajaran ${tema}`,
          `Memberikan contoh dan ilustrasi terkait ${subtema}`,
          "Melakukan tanya jawab",
          "Memberikan latihan",
          "Mengadakan evaluasi"
        ];
    }
    
    const penutup = [
      "Menyimpulkan pembelajaran",
      "Melakukan refleksi pembelajaran",
      "Memberikan umpan balik",
      "Menyampaikan tugas untuk pertemuan berikutnya",
      "Mengakhiri dengan doa"
    ];
    
    return {
      pendahuluan: { waktu: "10 menit", kegiatan: pendahuluan },
      inti: { waktu: "60 menit", kegiatan: inti },
      penutup: { waktu: "10 menit", kegiatan: penutup }
    };
  }

  // Generate enhanced Penilaian with specific tema
  private generatePenilaian(formData: LearningDocumentFormData): any {
    const mataPelajaran = formData.mataPelajaran;
    const tema = formData.tema;
    const subtema = formData.subtema;
    
    return {
      sikap: {
        teknik: "Observasi",
        instrumen: "Lembar observasi sikap",
        rubrik: [
          "Sangat baik: Menunjukkan sikap yang sangat positif",
          "Baik: Menunjukkan sikap yang positif",
          "Cukup: Menunjukkan sikap yang cukup positif",
          "Kurang: Menunjukkan sikap yang kurang positif"
        ]
      },
      pengetahuan: {
        teknik: "Tes tertulis",
        instrumen: "Soal uraian dan pilihan ganda",
        kisiKisi: [
          `Pemahaman konsep dasar ${tema}`,
          `Analisis hubungan antar konsep dalam ${subtema}`,
          `Penerapan konsep ${tema} dalam konteks nyata`,
          `Evaluasi solusi terkait ${subtema}`
        ]
      },
      keterampilan: {
        teknik: "Tes praktik",
        instrumen: "Rubrik penilaian keterampilan",
        rubrik: [
          `Kemampuan mendemonstrasikan ${tema}`,
          `Kemampuan menerapkan ${subtema} dalam situasi nyata`,
          "Kemampuan berkomunikasi secara efektif",
          "Kemampuan bekerja sama dalam tim"
        ]
      }
    };
  }

  // Generate enhanced Remedial dan Pengayaan with specific tema
  private generateRemedialPengayaan(formData: LearningDocumentFormData): any {
    const mataPelajaran = formData.mataPelajaran;
    const tema = formData.tema;
    const subtema = formData.subtema;
    
    const remedial = [
      `Memberikan penjelasan ulang tentang ${tema} dengan cara yang lebih sederhana`,
      `Memberikan contoh-contoh konkret terkait ${subtema}`,
      `Memberikan latihan tambahan untuk memperkuat pemahaman ${tema}`,
      `Memberikan bimbingan individual untuk siswa yang mengalami kesulitan`,
      `Menggunakan media pembelajaran yang lebih menarik untuk ${subtema}`
    ];
    
    const pengayaan = [
      `Memberikan tugas tambahan yang menantang terkait ${tema}`,
      `Mengajak siswa untuk mengeksplorasi aspek lain dari ${subtema}`,
      `Memberikan proyek mini yang lebih kompleks tentang ${tema}`,
      `Mengajak siswa untuk membuat presentasi tentang ${subtema}`,
      `Memberikan kesempatan untuk menjadi tutor sebaya untuk ${tema}`
    ];
    
    return { remedial, pengayaan };
  }

  // Enhanced Assessment Methods for LDP
  private generateEnhancedAssessment(formData: LearningDocumentFormData): any {
    const mataPelajaran = formData.mataPelajaran;
    const tema = formData.tema;
    const jenjang = formData.jenjang;

    return {
      karakter: {
        teknik: "Observasi dan portofolio karakter",
        instrumen: "Lembar penilaian sikap dan karakter",
        rubrik: [
          "Sangat Baik: Menunjukkan nilai cinta yang sangat tinggi dalam pembelajaran",
          "Baik: Menunjukkan nilai cinta yang baik dalam pembelajaran",
          "Cukup: Menunjukkan nilai cinta yang cukup dalam pembelajaran",
          "Kurang: Masih perlu bimbingan dalam nilai cinta"
        ]
      },
      pengetahuan: {
        teknik: "Tes tertulis dan lisan berbasis konteks",
        instrumen: "Soal pilihan ganda, uraian, dan tanya jawab",
        kisiKisi: [
          `Pemahaman konsep dasar ${tema} dalam ${mataPelajaran} (C1-C2)`,
          `Penerapan konsep ${tema} dalam konteks baru (C3)`,
          `Analisis hubungan antar konsep dalam ${mataPelajaran} (C4)`,
          `Evaluasi dan sintesis pemahaman ${tema} (C5-C6)`
        ]
      },
      keterampilan: {
        teknik: "Praktik dan portofolio berbasis proyek",
        instrumen: "Lembar penilaian kinerja dan portofolio",
        rubrik: [
          "Sangat Terampil: Melakukan praktik dengan sangat baik dan mandiri",
          "Terampil: Melakukan praktik dengan baik namun sesekali perlu bimbingan",
          "Cukup Terampil: Melakukan praktik dengan cukup baik namun perlu bimbingan",
          "Kurang Terampil: Melakukan praktik namun masih memerlukan bimbingan intensif"
        ]
      },
      sikap: {
        teknik: "Observasi sikap dan jurnal refleksi",
        instrumen: "Lembar observasi sikap dan jurnal pembelajaran",
        rubrik: [
          "Sangat Baik: Menunjukkan sikap yang sangat positif dalam pembelajaran",
          "Baik: Menunjukkan sikap yang positif dalam pembelajaran",
          "Cukup: Menunjukkan sikap yang cukup positif dalam pembelajaran",
          "Kurang: Menunjukkan sikap yang kurang positif dalam pembelajaran"
        ]
      }
    };
  }

  private generateHolisticAssessment(formData: LearningDocumentFormData): any {
    const jenjang = formData.jenjang;
    const mataPelajaran = formData.mataPelajaran;

    const assessmentStrategies = {
      MI: {
        focus: "Karakter dan nilai-nilai dasar",
        methods: ["Observasi sikap", "Portofolio sederhana", "Penilaian teman sebaya"],
        tools: ["Lembar observasi", "Buku portofolio", "Rubrik sederhana"]
      },
      MTs: {
        focus: "Keterampilan dan pemahaman konseptual",
        methods: ["Proyek", "Presentasi", "Penilaian diri"],
        tools: ["Rubrik proyek", "Lembar presentasi", "Jurnal refleksi"]
      },
      MA: {
        focus: "Kemampuan analitis dan kreativitas",
        methods: ["Penelitian sederhana", "Karya tulis", "Portofolio digital"],
        tools: ["Rubrik penelitian", "Template karya tulis", "Platform digital"]
      }
    };

    const strategy = assessmentStrategies[jenjang] || assessmentStrategies.MI;

    return {
      strategi: strategy,
      penilaianBerkesinambungan: [
        "Asesmen Formatif: Observasi sikap dan keterampilan",
        "Asesmen Sumatif: Portofolio pembelajaran",
        "Asesmen Autentik: Proyek dan presentasi",
        "Asesmen Karakter: Penilaian nilai-nilai Islam",
        "Asesmen Reflektif: Jurnal pembelajaran"
      ]
    };
  }

  // Personalized Learning Recommendations
  private generatePersonalizedRecommendations(formData: LearningDocumentFormData): any {
    const jenjang = formData.jenjang;
    const kelas = parseInt(formData.kelas);
    const mataPelajaran = formData.mataPelajaran;
    const modelPembelajaran = formData.pendekatanPembelajaran;
    
    const recommendations = {
      learningStyle: this.determineLearningStyle(jenjang, kelas),
      difficultyLevel: this.calculateDifficultyLevel(jenjang, kelas),
      technologyLevel: this.assessTechnologyLevel(jenjang, kelas),
      timeAllocation: this.optimizeTimeAllocation(modelPembelajaran),
      assessmentStrategy: this.recommendAssessmentStrategy(modelPembelajaran),
      differentiationStrategy: this.generateDifferentiationStrategy(jenjang, kelas),
      enrichmentActivities: this.suggestEnrichmentActivities(mataPelajaran, modelPembelajaran, formData.tema, formData.subtema),
      remedialStrategies: this.suggestRemedialStrategies(jenjang, kelas),
      collaborationOpportunities: this.identifyCollaborationOpportunities(modelPembelajaran),
      realWorldConnections: this.findRealWorldConnections(mataPelajaran, jenjang, formData.tema, formData.subtema)
    };
    
    return recommendations;
  }

  // Determine learning style based on grade level
  private determineLearningStyle(jenjang: string, kelas: number): string {
    if (jenjang === "MI") {
      if (kelas <= 3) return "Concrete-Pictorial-Abstract (CPA)";
      else return "Inquiry-Based Learning";
    } else if (jenjang === "MTs") {
      return "Problem-Based Learning";
    } else {
      return "Project-Based Learning";
    }
  }

  // Calculate appropriate difficulty level
  private calculateDifficultyLevel(jenjang: string, kelas: number): string {
    const baseLevel = jenjang === "MI" ? kelas : (jenjang === "MTs" ? kelas - 6 : kelas - 9);
    
    if (baseLevel <= 2) return "Basic";
    else if (baseLevel <= 4) return "Intermediate";
    else return "Advanced";
  }

  // Assess technology integration level
  private assessTechnologyLevel(jenjang: string, kelas: number): string {
    if (jenjang === "MI" && kelas <= 3) return "Minimal";
    else if (jenjang === "MI" && kelas <= 6) return "Moderate";
    else return "Advanced";
  }

  // Optimize time allocation based on learning model
  private optimizeTimeAllocation(modelPembelajaran: string): any {
    switch (modelPembelajaran) {
      case "Love-Based":
        return {
          pendahuluan: "15%",
          inti: "70%",
          penutup: "15%"
        };
      case "Holistic":
        return {
          pendahuluan: "10%",
          inti: "75%",
          penutup: "15%"
        };
      case "Character-Building":
        return {
          pendahuluan: "20%",
          inti: "65%",
          penutup: "15%"
        };
      default:
        return {
          pendahuluan: "20%",
          inti: "60%",
          penutup: "20%"
        };
    }
  }

  // Recommend assessment strategy
  private recommendAssessmentStrategy(modelPembelajaran: string): string[] {
    const strategies = [];
    
    switch (modelPembelajaran) {
      case "Love-Based":
        strategies.push("Portfolio Assessment", "Project Rubric", "Peer Assessment", "Self-Assessment");
        break;
      case "Holistic":
        strategies.push("Problem-Solving Rubric", "Case Study Analysis", "Group Presentation", "Reflection Journal");
        break;
      case "Character-Building":
        strategies.push("Observation Checklist", "Learning Journal", "Concept Map", "Exit Ticket");
        break;
      default:
        strategies.push("Traditional Test", "Quiz", "Homework", "Class Participation");
    }
    
    return strategies;
  }

  // Generate differentiation strategies
  private generateDifferentiationStrategy(jenjang: string, kelas: number): any {
    const strategies = {
      content: [],
      process: [],
      product: [],
      environment: []
    };
    
    if (jenjang === "MI") {
      strategies.content = [
        "Menggunakan media visual yang menarik",
        "Memberikan contoh konkret",
        "Menggunakan lagu atau gerakan"
      ];
      strategies.process = [
        "Pembelajaran berkelompok",
        "Pembelajaran individual",
        "Pembelajaran dengan bimbingan"
      ];
      strategies.product = [
        "Gambar atau poster",
        "Cerita atau drama",
        "Model atau maket"
      ];
      strategies.environment = [
        "Ruang kelas yang nyaman",
        "Pencahayaan yang baik",
        "Tempat duduk yang fleksibel"
      ];
    } else {
      strategies.content = [
        "Materi yang menantang",
        "Sumber belajar yang beragam",
        "Konteks yang relevan"
      ];
      strategies.process = [
        "Pembelajaran mandiri",
        "Kolaborasi kelompok",
        "Penelitian sederhana"
      ];
      strategies.product = [
        "Presentasi digital",
        "Laporan tertulis",
        "Proyek kreatif"
      ];
      strategies.environment = [
        "Ruang diskusi",
        "Akses teknologi",
        "Sumber belajar digital"
      ];
    }
    
    return strategies;
  }

  // Suggest enrichment activities with specific tema
  private suggestEnrichmentActivities(mataPelajaran: string, modelPembelajaran: string, tema: string, subtema: string): string[] {
    const activities = [];
    
    if (modelPembelajaran === "Love-Based") {
      activities.push(
        `Mengembangkan proyek ${tema} yang lebih kompleks`,
        `Membuat presentasi digital tentang ${subtema}`,
        `Menulis artikel tentang ${tema} dalam ${mataPelajaran}`,
        `Membuat video pembelajaran ${subtema}`
      );
    } else if (modelPembelajaran === "Holistic") {
      activities.push(
        `Menganalisis kasus ${tema} yang lebih menantang`,
        `Mengembangkan solusi inovatif untuk masalah ${subtema}`,
        `Membuat simulasi ${tema} dalam ${mataPelajaran}`,
        `Menulis laporan penelitian ${subtema}`
      );
    } else {
      activities.push(
        `Mengembangkan materi pembelajaran ${tema}`,
        `Membuat quiz interaktif ${subtema}`,
        `Menulis cerita tentang ${tema} dalam ${mataPelajaran}`,
        `Membuat poster informatif ${subtema}`
      );
    }
    
    return activities;
  }

  // Suggest remedial strategies
  private suggestRemedialStrategies(jenjang: string, kelas: number): string[] {
    const strategies = [];
    
    if (jenjang === "MI") {
      strategies.push(
        "Menggunakan media pembelajaran yang lebih sederhana",
        "Memberikan bimbingan individual",
        "Menggunakan pendekatan yang lebih konkret",
        "Memberikan latihan tambahan yang lebih mudah"
      );
    } else {
      strategies.push(
        "Menggunakan pendekatan yang berbeda",
        "Memberikan bimbingan khusus",
        "Menggunakan media yang lebih menarik",
        "Memberikan motivasi dan dorongan"
      );
    }
    
    return strategies;
  }

  // Identify collaboration opportunities
  private identifyCollaborationOpportunities(modelPembelajaran: string): string[] {
    const opportunities = [];
    
    switch (modelPembelajaran) {
      case "Love-Based":
        opportunities.push(
          "Kerja kelompok dalam proyek",
          "Presentasi bersama",
          "Peer review",
          "Kolaborasi antar kelompok"
        );
        break;
      case "Holistic":
        opportunities.push(
          "Diskusi kelompok",
          "Brainstorming bersama",
          "Presentasi solusi",
          "Refleksi kelompok"
        );
        break;
      default:
        opportunities.push(
          "Diskusi kelas",
          "Kerja berpasangan",
          "Tanya jawab",
          "Sharing pengalaman"
        );
    }
    
    return opportunities;
  }

  // Find real-world connections with specific tema
  private findRealWorldConnections(mataPelajaran: string, jenjang: string, tema: string, subtema: string): string[] {
    const connections = [];
    
    // Add subject-specific real-world connections
    if (mataPelajaran.toLowerCase().includes("matematika")) {
      connections.push(
        `Penerapan ${tema} dalam kehidupan sehari-hari`,
        `Koneksi ${subtema} dengan mata pelajaran lain`,
        `Aplikasi ${tema} dalam teknologi`,
        `Relevansi ${subtema} dengan profesi masa depan`
      );
    } else if (mataPelajaran.toLowerCase().includes("bahasa")) {
      connections.push(
        `Komunikasi ${tema} dalam kehidupan sehari-hari`,
        `Literasi digital terkait ${subtema}`,
        `Kreativitas dalam menulis tentang ${tema}`,
        `Kemampuan presentasi ${subtema}`
      );
    } else if (mataPelajaran.toLowerCase().includes("islam") || mataPelajaran.toLowerCase().includes("fikih")) {
      connections.push(
        `Aplikasi ${tema} dalam kehidupan beragama`,
        `Koneksi ${subtema} dengan nilai-nilai Islam`,
        `Relevansi ${tema} dengan kehidupan sosial`,
        `Pengembangan karakter melalui ${subtema}`
      );
    } else {
      connections.push(
        `Aplikasi ${tema} dalam kehidupan sehari-hari`,
        `Koneksi ${subtema} dengan mata pelajaran lain`,
        `Relevansi ${tema} dengan masa depan`,
        `Pengembangan keterampilan hidup melalui ${subtema}`
      );
    }
    
    return connections;
  }

  // Structure AI response into educational format
  private structureAIResponse(formData: LearningDocumentFormData, aiResponse: any): any {
    // Extract key educational concepts from AI response
    const generatedText = aiResponse?.[0]?.generated_text || "";
    
    return {
      tema: this.extractTheme(formData.mataPelajaran, formData.capaianPembelajaran),
      subtema: this.extractSubtheme(formData.capaianPembelajaran),
      
      kompetensiDasar: {
        pengetahuan: `Memahami ${this.extractConcepts(formData.capaianPembelajaran)} dalam konteks ${formData.mataPelajaran}`,
        keterampilan: `Menerapkan pemahaman ${this.extractConcepts(formData.capaianPembelajaran)} dalam kehidupan sehari-hari`
      },

      indikator: {
        pengetahuan: [
          `Menjelaskan konsep dasar ${this.extractConcepts(formData.capaianPembelajaran)}`,
          `Mengidentifikasi karakteristik ${this.extractConcepts(formData.capaianPembelajaran)}`,
          `Menganalisis hubungan antar konsep dalam materi`
        ],
        keterampilan: [
          `Mendemonstrasikan penerapan konsep dalam konteks nyata`,
          `Menyelesaikan masalah menggunakan pemahaman materi`,
          `Mengkomunikasikan hasil pembelajaran dengan baik`
        ]
      },

      tujuanPembelajaran: [
        `Melalui kegiatan diskusi dan tanya jawab, peserta didik dapat menjelaskan ${this.extractConcepts(formData.capaianPembelajaran)} dengan tepat`,
        `Melalui kegiatan praktik, peserta didik dapat menerapkan pemahaman materi dalam situasi nyata`,
        `Melalui refleksi, peserta didik dapat menghargai nilai-nilai Islam dalam pembelajaran`
      ],

      materiPembelajaran: {
        faktual: [
          `Definisi dan pengertian ${this.extractConcepts(formData.capaianPembelajaran)}`,
          "Data dan informasi terkini sesuai materi",
          "Contoh nyata dalam kehidupan sehari-hari"
        ],
        konseptual: [
          "Prinsip-prinsip dasar materi pembelajaran",
          "Hubungan antar konsep dalam materi",
          "Teori dan model yang relevan"
        ],
        prosedural: [
          "Langkah-langkah penerapan konsep",
          "Prosedur pemecahan masalah",
          "Teknik dan strategi implementasi"
        ],
        metakognitif: [
          "Strategi belajar yang efektif",
          "Monitoring pemahaman diri",
          "Evaluasi proses pembelajaran"
        ]
      },

      langkahPembelajaran: this.generateLearningSteps(formData),
      penilaian: this.generateAssessment(formData)
    };
  }

  // Extract main theme from subject and objectives
  private extractTheme(subject: string, objectives: string): string {
    const themes: { [key: string]: string } = {
      "Matematika": "Bilangan dan Operasi Hitung",
      "Bahasa Indonesia": "Komunikasi dan Literasi",
      "IPA": "Alam Semesta dan Kehidupan",
      "IPS": "Manusia dan Lingkungan",
      "Akidah Akhlak": "Keimanan dan Akhlak Mulia",
      "Fiqih": "Ibadah dan Muamalah",
      "Sejarah Kebudayaan Islam": "Peradaban Islam",
      "Bahasa Arab": "Komunikasi dalam Bahasa Arab"
    };
    
    return themes[subject] || "Pembelajaran Holistik";
  }

  // Extract subtheme from learning objectives
  private extractSubtheme(objectives: string): string {
    // Simple keyword extraction for subtheme
    const words = objectives.toLowerCase().split(" ");
    const importantWords = words.filter(word => word.length > 4);
    return importantWords.slice(0, 3).join(" ") || "Pengembangan Kompetensi";
  }

  // Extract key concepts from learning objectives
  private extractConcepts(objectives: string): string {
    // Extract main concepts using simple NLP
    const words = objectives.split(" ");
    const concepts = words.filter(word => word.length > 5);
    return concepts.slice(0, 2).join(" dan ") || "konsep pembelajaran";
  }

  // Get Kompetensi Inti based on education level
  private getKompetensiInti(jenjang: string): string[] {
    const kiMap: { [key: string]: string[] } = {
      "MI": [
        "KI-1: Menerima, menjalankan, dan menghargai ajaran agama yang dianutnya",
        "KI-2: Menunjukkan perilaku jujur, disiplin, santun, percaya diri, peduli, dan bertanggung jawab dalam berinteraksi dengan keluarga, teman, guru, dan tetangga",
        "KI-3: Memahami pengetahuan faktual dan konseptual dengan cara mengamati, menanya, dan mencoba berdasarkan rasa ingin tahu tentang dirinya, makhluk ciptaan Tuhan dan kegiatannya",
        "KI-4: Menyajikan pengetahuan faktual dan konseptual dalam bahasa yang jelas, sistematis, logis dan kritis, dalam karya yang estetis, dalam gerakan yang mencerminkan anak sehat"
      ],
      "MTs": [
        "KI-1: Menghargai dan menghayati ajaran agama yang dianutnya",
        "KI-2: Menghargai dan menghayati perilaku jujur, disiplin, tanggungjawab, peduli (toleransi, gotong royong), santun, percaya diri, dalam berinteraksi secara efektif dengan lingkungan sosial dan alam",
        "KI-3: Memahami dan menerapkan pengetahuan (faktual, konseptual, dan prosedural) berdasarkan rasa ingin tahunya tentang ilmu pengetahuan, teknologi, seni, budaya terkait fenomena dan kejadian tampak mata",
        "KI-4: Mengolah, menyaji, dan menalar dalam ranah konkret (menggunakan, mengurai, merangkai, memodifikasi, dan membuat) dan ranah abstrak (menulis, membaca, menghitung, menggambar, dan mengarang)"
      ],
      "MA": [
        "KI-1: Menghayati dan mengamalkan ajaran agama yang dianutnya",
        "KI-2: Menghayati dan mengamalkan perilaku jujur, disiplin, tanggungjawab, peduli (gotong royong, kerjasama, toleran, damai), santun, responsif dan pro-aktif dan menunjukkan sikap sebagai bagian dari solusi",
        "KI-3: Memahami, menerapkan, dan menganalisis pengetahuan faktual, konseptual, prosedural, dan metakognitif berdasarkan rasa ingin tahunya tentang ilmu pengetahuan, teknologi, seni, budaya, dan humaniora",
        "KI-4: Mengolah, menalar, menyaji, dan mencipta dalam ranah konkret dan ranah abstrak terkait dengan pengembangan dari yang dipelajarinya di sekolah secara mandiri serta bertindak secara efektif dan kreatif"
      ]
    };

    return kiMap[jenjang] || kiMap["MI"];
  }

  // Get recommended teaching methods based on form data
  private getRecommendedMethods(formData: LearningDocumentFormData): string[] {
    const baseMethods = [
      "Ceramah interaktif",
      "Diskusi kelompok",
      "Tanya jawab",
      "Demonstrasi"
    ];

    // Add specific methods based on subject
    const subjectMethods: { [key: string]: string[] } = {
      "Matematika": ["Problem solving", "Drill and practice", "Discovery learning"],
      "IPA": ["Eksperimen", "Observasi", "Inquiry learning"],
      "Bahasa Indonesia": ["Role playing", "Storytelling", "Peer editing"],
      "IPS": ["Studi kasus", "Simulasi", "Project based learning"],
      "Akidah Akhlak": ["Modeling", "Pembiasaan", "Refleksi"],
      "Fiqih": ["Praktik ibadah", "Studi hadits", "Diskusi hukum"]
    };

    return [...baseMethods, ...(subjectMethods[formData.mataPelajaran] || ["Pembelajaran kontekstual"])];
  }

  // Generate detailed learning steps
  private generateLearningSteps(formData: LearningDocumentFormData): any {
    return {
      pendahuluan: {
        waktu: "10 menit",
        kegiatan: [
          "Guru membuka pembelajaran dengan salam dan membaca doa bersama",
          "Guru melakukan absensi dan mengecek kesiapan siswa",
          "Guru melakukan apersepsi dengan mengaitkan materi sebelumnya",
          `Guru menyampaikan tujuan pembelajaran ${formData.mataPelajaran}`,
          "Guru memberikan motivasi dengan menjelaskan manfaat materi dalam kehidupan"
        ]
      },
      inti: {
        waktu: "60 menit",
        kegiatan: [
          "Guru menjelaskan materi pokok dengan bantuan media pembelajaran",
          "Siswa mengamati demonstrasi/penjelasan guru dengan seksama",
          "Guru memberikan kesempatan siswa untuk bertanya",
          "Siswa dibagi dalam kelompok kecil untuk diskusi",
          "Setiap kelompok mendiskusikan topik yang telah ditentukan",
          "Perwakilan kelompok mempresentasikan hasil diskusi",
          "Guru memberikan feedback dan penguatan materi",
          "Siswa mengerjakan latihan soal/praktik sesuai materi",
          "Guru membimbing siswa yang mengalami kesulitan"
        ]
      },
      penutup: {
        waktu: "10 menit",
        kegiatan: [
          "Guru dan siswa bersama-sama menyimpulkan pembelajaran",
          "Guru melakukan evaluasi pemahaman siswa",
          "Guru memberikan tugas rumah untuk pendalaman materi",
          "Guru menyampaikan rencana pembelajaran pertemuan berikutnya",
          "Pembelajaran ditutup dengan doa dan salam"
        ]
      }
    };
  }

  // Generate comprehensive assessment
  private generateAssessment(formData: LearningDocumentFormData): any {
    return {
      sikap: {
        teknik: "Observasi",
        instrumen: "Lembar observasi sikap",
        rubrik: [
          "Sangat Baik: Menunjukkan sikap yang sangat positif",
          "Baik: Menunjukkan sikap yang positif",
          "Cukup: Menunjukkan sikap yang cukup positif",
          "Kurang: Menunjukkan sikap yang kurang positif"
        ]
      },
      pengetahuan: {
        teknik: "Tes tertulis dan lisan",
        instrumen: "Soal pilihan ganda, uraian, dan tanya jawab",
        kisiKisi: [
          "Pemahaman konsep dasar materi (C1-C2)",
          "Penerapan konsep dalam konteks baru (C3)",
          "Analisis hubungan antar konsep (C4)",
          "Evaluasi dan sintesis pemahaman (C5-C6)"
        ]
      },
      keterampilan: {
        teknik: "Praktik dan portofolio",
        instrumen: "Lembar penilaian kinerja",
        rubrik: [
          "Sangat Terampil: Melakukan praktik dengan sangat baik dan mandiri",
          "Terampil: Melakukan praktik dengan baik namun sesekali perlu bimbingan",
          "Cukup Terampil: Melakukan praktik dengan cukup baik namun perlu bimbingan",
          "Kurang Terampil: Melakukan praktik namun masih memerlukan bimbingan intensif"
        ]
      }
    };
  }

  // Optimized template content generation
  private getTemplateContent(formData: LearningDocumentFormData): any {
    return {
      kompetensiDasar: {
        pengetahuan: `Memahami ${this.extractConcepts(formData.capaianPembelajaran)} dalam konteks ${formData.mataPelajaran}`,
        keterampilan: `Menerapkan pemahaman ${this.extractConcepts(formData.capaianPembelajaran)} dalam kehidupan sehari-hari`
      },

      indikator: {
        pengetahuan: [
          `Menjelaskan konsep dasar ${this.extractConcepts(formData.capaianPembelajaran)}`,
          `Mengidentifikasi karakteristik ${this.extractConcepts(formData.capaianPembelajaran)}`,
          `Menganalisis hubungan antar konsep dalam materi ${formData.mataPelajaran}`
        ],
        keterampilan: [
          `Mendemonstrasikan penerapan konsep dalam konteks nyata`,
          `Menyelesaikan masalah menggunakan pemahaman materi`,
          `Mengkomunikasikan hasil pembelajaran dengan baik`
        ]
      },

      tujuanPembelajaran: [
        `Melalui kegiatan diskusi dan tanya jawab, peserta didik dapat menjelaskan ${this.extractConcepts(formData.capaianPembelajaran)} dengan tepat`,
        `Melalui kegiatan praktik, peserta didik dapat menerapkan pemahaman materi dalam situasi nyata`,
        `Melalui refleksi, peserta didik dapat menghargai nilai-nilai Islam dalam pembelajaran ${formData.mataPelajaran}`
      ],

      materiPembelajaran: {
        faktual: [
          `Definisi dan pengertian ${this.extractConcepts(formData.capaianPembelajaran)}`,
          `Data dan informasi terkini dalam ${formData.mataPelajaran}`,
          "Contoh nyata dalam kehidupan sehari-hari"
        ],
        konseptual: [
          `Prinsip-prinsip dasar dalam ${formData.mataPelajaran}`,
          "Hubungan antar konsep dalam materi",
          "Teori dan model yang relevan"
        ],
        prosedural: [
          "Langkah-langkah penerapan konsep",
          `Prosedur pemecahan masalah dalam ${formData.mataPelajaran}`,
          "Teknik dan strategi implementasi"
        ],
        metakognitif: [
          "Strategi belajar yang efektif",
          "Monitoring pemahaman diri",
          "Evaluasi proses pembelajaran"
        ]
      },

      langkahPembelajaran: this.generateLearningSteps(formData),
      penilaian: this.generateAssessment(formData)
    };
  }

  // Format nilai cinta for the identitas section
  private formatNilaiCinta(nilaiCinta: { [key: string]: boolean }): string[] {
    const formattedNilai: string[] = [];
    if (nilaiCinta.cintaAllah) formattedNilai.push("Cinta kepada Allah SWT");
    if (nilaiCinta.cintaRasul) formattedNilai.push("Cinta kepada Rasulullah SAW");
    if (nilaiCinta.cintaKeluarga) formattedNilai.push("Cinta kepada Keluarga");
    if (nilaiCinta.cintaSesama) formattedNilai.push("Cinta kepada Sesama");
    if (nilaiCinta.cintaAlam) formattedNilai.push("Cinta kepada Alam");
    if (nilaiCinta.cintaTanahAir) formattedNilai.push("Cinta kepada Tanah Air");
    return formattedNilai;
  }

  // Format profil pelajar Pancasila for the identitas section
  private formatProfilPelajar(profil: { [key: string]: boolean }): string[] {
    const formattedProfil: string[] = [];
    if (profil.berimanBertakwa) formattedProfil.push("Beriman Bertakwa");
    if (profil.mandiri) formattedProfil.push("Mandiri");
    if (profil.bernalarKritis) formattedProfil.push("Bernalar Kritis");
    if (profil.kreatif) formattedProfil.push("Kreatif");
    if (profil.bergotongRoyong) formattedProfil.push("Bergotong Royong");
    if (profil.berkebinekaanGlobal) formattedProfil.push("Berkebinekaan Global");
    if (profil.rahmatanLilAlamin) formattedProfil.push("Rahmatan Lil 'Alamin");
    return formattedProfil;
  }

  // Love-Based Content Generation Methods
  private generateLoveBasedContent(formData: LearningDocumentFormData): any {
    return {
      nilaiCinta: this.generateNilaiCinta(formData.nilaiCinta),
      loveBasedActivities: this.generateLoveBasedActivities(formData),
      characterDevelopment: this.generateCharacterDevelopment(formData),
      islamicIntegration: this.generateIslamicIntegration(formData)
    };
  }

  private generateNilaiCinta(nilaiCinta: { [key: string]: boolean }): any {
    const activities = {
      cintaAllah: [
        "Mengawali pembelajaran dengan doa dan dzikir yang dipimpin oleh siswa secara bergantian",
        "Mengintegrasikan nilai-nilai Islam dalam setiap aspek pembelajaran dengan mengaitkan materi dengan ayat Al-Qur'an",
        "Mengembangkan sikap syukur dalam belajar dengan mengucapkan hamdalah setelah memahami konsep baru",
        "Mengamalkan ajaran Islam dalam kehidupan sehari-hari melalui praktik ibadah yang terkait dengan pembelajaran"
      ],
      cintaRasul: [
        "Meneladani akhlak Rasulullah SAW dalam pembelajaran dengan mengikuti sikap sabar dan ikhlas",
        "Mengintegrasikan sunnah dalam aktivitas belajar dengan mengamalkan adab-adab belajar yang diajarkan Rasulullah",
        "Mengembangkan sikap sabar dan ikhlas seperti Rasulullah dalam menghadapi kesulitan belajar",
        "Mengamalkan hadits dalam kehidupan sehari-hari dengan menerapkan nilai-nilai yang terkandung dalam hadits"
      ],
      cintaKeluarga: [
        "Mengembangkan sikap hormat kepada orang tua dengan membuat karya yang dipersembahkan untuk keluarga",
        "Mengintegrasikan nilai keluarga dalam pembelajaran dengan mengaitkan materi dengan konteks keluarga",
        "Mengembangkan sikap peduli terhadap keluarga melalui proyek yang bermanfaat untuk keluarga",
        "Mengamalkan nilai-nilai keluarga dalam kehidupan dengan menerapkan pembelajaran dalam konteks keluarga"
      ],
      cintaSesama: [
        "Mengembangkan sikap tolong-menolong dalam pembelajaran melalui kerja kelompok yang saling mendukung",
        "Mengintegrasikan nilai persaudaraan dalam belajar dengan mengembangkan sikap saling membantu",
        "Mengembangkan sikap saling menghargai melalui presentasi yang menghargai pendapat teman",
        "Mengamalkan nilai persaudaraan dalam kehidupan dengan mengembangkan proyek yang bermanfaat untuk masyarakat"
      ],
      cintaAlam: [
        "Mengembangkan sikap peduli terhadap lingkungan melalui proyek pelestarian lingkungan",
        "Mengintegrasikan nilai pelestarian alam dalam pembelajaran dengan mengaitkan materi dengan isu lingkungan",
        "Mengembangkan sikap ramah lingkungan melalui praktik pembelajaran yang ramah lingkungan",
        "Mengamalkan nilai pelestarian alam dalam kehidupan dengan mengembangkan kesadaran lingkungan"
      ],
      cintaTanahAir: [
        "Mengembangkan sikap cinta tanah air dalam pembelajaran dengan mengaitkan materi dengan kearifan lokal",
        "Mengintegrasikan nilai patriotisme dalam belajar dengan mengembangkan sikap bangga sebagai bangsa Indonesia",
        "Mengembangkan sikap bangga sebagai bangsa Indonesia melalui proyek yang mengangkat budaya lokal",
        "Mengamalkan nilai cinta tanah air dalam kehidupan dengan mengembangkan kontribusi untuk kemajuan bangsa"
      ]
    };

    const selectedActivities = [];
    Object.entries(nilaiCinta).forEach(([key, value]) => {
      if (value && activities[key as keyof typeof activities]) {
        selectedActivities.push(...activities[key as keyof typeof activities]);
      }
    });

    return selectedActivities;
  }

  private generateLoveBasedActivities(formData: LearningDocumentFormData): string[] {
    const mataPelajaran = formData.mataPelajaran;
    const tema = formData.tema;
    const subtema = formData.subtema;

    return [
      `Mengintegrasikan nilai cinta dalam pembelajaran ${mataPelajaran}`,
      `Mengembangkan sikap peduli melalui tema ${tema}`,
      `Mengamalkan nilai-nilai Islam dalam ${subtema}`,
      `Mengembangkan karakter melalui pembelajaran ${mataPelajaran}`,
      `Mengintegrasikan nilai persaudaraan dalam pembelajaran`,
      `Mengembangkan sikap syukur dalam belajar ${mataPelajaran}`
    ];
  }

  private generateCharacterDevelopment(formData: LearningDocumentFormData): string[] {
    const jenjang = formData.jenjang;
    const kelas = formData.kelas;

    const characterActivities = {
      MI: [
        "Mengembangkan sikap jujur dan bertanggung jawab",
        "Mengembangkan sikap disiplin dalam belajar",
        "Mengembangkan sikap peduli terhadap teman",
        "Mengembangkan sikap hormat kepada guru"
      ],
      MTs: [
        "Mengembangkan sikap mandiri dalam belajar",
        "Mengembangkan sikap kreatif dalam menyelesaikan masalah",
        "Mengembangkan sikap kolaboratif dalam pembelajaran",
        "Mengembangkan sikap kritis dalam berpikir"
      ],
      MA: [
        "Mengembangkan sikap leadership dalam pembelajaran",
        "Mengembangkan sikap inovatif dalam menyelesaikan masalah",
        "Mengembangkan sikap global dalam berpikir",
        "Mengembangkan sikap entrepreneurship"
      ]
    };

    return characterActivities[jenjang] || characterActivities.MI;
  }

  private generateIslamicIntegration(formData: LearningDocumentFormData): string[] {
    const mataPelajaran = formData.mataPelajaran;
    const tema = formData.tema;

    return [
      `Mengintegrasikan nilai-nilai Islam dalam pembelajaran ${mataPelajaran}`,
      `Mengamalkan ajaran Islam melalui tema ${tema}`,
      `Mengembangkan akhlak mulia dalam pembelajaran`,
      `Mengintegrasikan doa dalam aktivitas pembelajaran`,
      `Mengamalkan sunnah Rasulullah dalam belajar`,
      `Mengembangkan sikap tawakal dalam pembelajaran`
    ];
  }


}

// Singleton instance
export const perencanaanPembelajaranGenerator = new PerencanaanPembelajaranGenerator();