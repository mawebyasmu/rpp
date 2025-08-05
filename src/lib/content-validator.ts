import { LearningDocumentFormData, GeneratedRPP, GeneratedLDP } from './rpp-generator';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  score: number;
  recommendations: string[];
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
  suggestion?: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  impact: 'low' | 'medium' | 'high';
}

export class ContentValidator {
  private static readonly MIN_WORD_COUNT = 10;
  private static readonly MAX_WORD_COUNT = 500;
  private static readonly REQUIRED_FIELDS = [
    'namaGuru',
    'satuanPendidikan',
    'mataPelajaran',
    'kelas',
    'semester',
    'tema',
    'subtema'
  ];

  private static readonly LOVE_BASED_REQUIREMENTS = [
    'cintaAllah',
    'cintaRasul',
    'cintaKeluarga',
    'cintaSesama',
    'cintaAlam',
    'cintaTanahAir'
  ];

  static validateFormData(formData: LearningDocumentFormData): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    let score = 100;

    // Required fields validation
    for (const field of this.REQUIRED_FIELDS) {
      const value = formData[field as keyof LearningDocumentFormData];
      if (!value || (typeof value === 'string' && value.trim().length === 0)) {
        errors.push({
          field,
          message: `Field ${field} is required`,
          severity: 'error'
        });
        score -= 10;
      }
    }

    // Love-based curriculum validation
    if (formData.documentType === 'LDP') {
      const selectedNilaiCinta = Object.values(formData.nilaiCinta).filter(Boolean).length;
      
      if (selectedNilaiCinta === 0) {
        errors.push({
          field: 'nilaiCinta',
          message: 'At least one nilai cinta must be selected for LDP',
          severity: 'error'
        });
        score -= 20;
      } else if (selectedNilaiCinta < 3) {
        warnings.push({
          field: 'nilaiCinta',
          message: `Only ${selectedNilaiCinta} nilai cinta selected. Consider selecting more for comprehensive character development.`,
          impact: 'medium'
        });
        score -= 5;
      }
    }

    // Content length validation
    const contentFields = ['tujuanPembelajaran', 'materiPembelajaran', 'langkahPembelajaran'];
    for (const field of contentFields) {
      const value = formData[field as keyof LearningDocumentFormData];
      if (typeof value === 'string') {
        const wordCount = value.split(' ').length;
        
        if (wordCount < this.MIN_WORD_COUNT) {
          errors.push({
            field,
            message: `Content too short (${wordCount} words). Minimum ${this.MIN_WORD_COUNT} words required.`,
            severity: 'error',
            suggestion: 'Add more detailed content to meet minimum requirements.'
          });
          score -= 15;
        } else if (wordCount > this.MAX_WORD_COUNT) {
          warnings.push({
            field,
            message: `Content very long (${wordCount} words). Consider breaking into smaller sections.`,
            impact: 'low'
          });
          score -= 2;
        }
      }
    }

    // Curriculum alignment validation
    if (formData.pendekatanPembelajaran === 'Love-Based' && selectedNilaiCinta < 2) {
      warnings.push({
        field: 'pendekatanPembelajaran',
        message: 'Love-Based approach selected but insufficient nilai cinta chosen.',
        impact: 'medium'
      });
      score -= 5;
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score),
      recommendations: this.generateRecommendations(errors, warnings, formData)
    };
  }

  static validateGeneratedContent(generatedContent: GeneratedRPP | GeneratedLDP): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    let score = 100;

    // Check for empty sections
    const sections = ['identitas', 'tujuanPembelajaran', 'materiPembelajaran', 'langkahPembelajaran', 'penilaian'];
    for (const section of sections) {
      const content = generatedContent[section as keyof typeof generatedContent];
      if (!content || (typeof content === 'string' && content.trim().length === 0)) {
        errors.push({
          field: section,
          message: `Section ${section} is empty`,
          severity: 'error'
        });
        score -= 15;
      }
    }

    // Check content quality
    if (generatedContent.tujuanPembelajaran) {
      const tujuanWords = generatedContent.tujuanPembelajaran.split(' ').length;
      if (tujuanWords < 20) {
        warnings.push({
          field: 'tujuanPembelajaran',
          message: 'Learning objectives seem too brief. Consider adding more detail.',
          impact: 'medium'
        });
        score -= 5;
      }
    }

    // Check for curriculum alignment
    if ('nilaiCinta' in generatedContent && generatedContent.nilaiCinta) {
      const nilaiCintaCount = Object.keys(generatedContent.nilaiCinta).length;
      if (nilaiCintaCount === 0) {
        errors.push({
          field: 'nilaiCinta',
          message: 'No nilai cinta integrated in LDP content',
          severity: 'error'
        });
        score -= 20;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score),
      recommendations: this.generateRecommendations(errors, warnings, generatedContent)
    };
  }

  private static generateRecommendations(errors: ValidationError[], warnings: ValidationWarning[], data: any): string[] {
    const recommendations: string[] = [];

    // Error-based recommendations
    if (errors.some(e => e.field === 'nilaiCinta')) {
      recommendations.push('Select at least 3 nilai cinta for comprehensive character development');
    }

    if (errors.some(e => e.field.includes('Pembelajaran'))) {
      recommendations.push('Add more detailed content to learning objectives and materials');
    }

    // Warning-based recommendations
    if (warnings.some(w => w.field === 'pendekatanPembelajaran')) {
      recommendations.push('Consider selecting more nilai cinta to align with Love-Based approach');
    }

    if (warnings.some(w => w.field.includes('Content'))) {
      recommendations.push('Review content length - aim for balanced, comprehensive sections');
    }

    // General recommendations
    if (data.documentType === 'LDP') {
      recommendations.push('Ensure Islamic values are integrated throughout the document');
      recommendations.push('Focus on character development alongside academic achievement');
    }

    return recommendations;
  }

  static validateCurriculumAlignment(formData: LearningDocumentFormData): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    let score = 100;

    // Check Kurikulum Berbasis Cinta alignment
    if (formData.documentType === 'LDP') {
      const selectedNilaiCinta = Object.values(formData.nilaiCinta).filter(Boolean).length;
      
      if (selectedNilaiCinta < 3) {
        errors.push({
          field: 'curriculumAlignment',
          message: 'Insufficient nilai cinta for Kurikulum Berbasis Cinta',
          severity: 'error'
        });
        score -= 25;
      }

      if (formData.pendekatanPembelajaran !== 'Love-Based' && selectedNilaiCinta > 0) {
        warnings.push({
          field: 'pendekatanPembelajaran',
          message: 'Consider Love-Based approach for better nilai cinta integration',
          impact: 'medium'
        });
        score -= 5;
      }
    }

    // Check jenjang appropriateness
    const jenjang = formData.jenjang;
    if (jenjang === 'MI' && formData.kelas > 6) {
      errors.push({
        field: 'kelas',
        message: 'Invalid class for MI jenjang (max class 6)',
        severity: 'error'
      });
      score -= 20;
    }

    if (jenjang === 'MTs' && (formData.kelas < 7 || formData.kelas > 9)) {
      errors.push({
        field: 'kelas',
        message: 'Invalid class for MTs jenjang (classes 7-9)',
        severity: 'error'
      });
      score -= 20;
    }

    if (jenjang === 'MA' && (formData.kelas < 10 || formData.kelas > 12)) {
      errors.push({
        field: 'kelas',
        message: 'Invalid class for MA jenjang (classes 10-12)',
        severity: 'error'
      });
      score -= 20;
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score),
      recommendations: this.generateCurriculumRecommendations(errors, warnings, formData)
    };
  }

  private static generateCurriculumRecommendations(errors: ValidationError[], warnings: ValidationWarning[], formData: LearningDocumentFormData): string[] {
    const recommendations: string[] = [];

    if (formData.documentType === 'LDP') {
      recommendations.push('Ensure all selected nilai cinta are reflected in learning activities');
      recommendations.push('Integrate Islamic values naturally into subject matter');
      recommendations.push('Focus on character development alongside academic goals');
    }

    if (warnings.some(w => w.field === 'pendekatanPembelajaran')) {
      recommendations.push('Consider Love-Based approach for better curriculum alignment');
    }

    return recommendations;
  }
} 