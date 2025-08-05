import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  FileText, 
  Heart, 
  Users, 
  Target,
  BookOpen,
  Award
} from "lucide-react";
import { DocumentTypeSelector } from "./document-type-selector";
import { LoveBasedCurriculumSelector } from "./love-based-curriculum-selector";
import { CharacterAssessmentCards } from "./character-assessment-cards";

interface LearningDocumentWizardProps {
  onComplete: (data: any) => void;
}

export const LearningDocumentWizard: React.FC<LearningDocumentWizardProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    documentType: "RPP" as "RPP" | "LDP",
    nilaiCinta: {
      cintaAllah: false,
      cintaRasul: false,
      cintaKeluarga: false,
      cintaSesama: false,
      cintaAlam: false,
      cintaTanahAir: false,
    },
    pendekatanPembelajaran: "Love-Based" as "Love-Based" | "Holistic" | "Character-Building",
  });

  const steps = [
    {
      id: 0,
      title: "Pilih Jenis Dokumen",
      description: "Pilih antara RPP atau LDP",
      icon: FileText,
      component: (
        <DocumentTypeSelector
          selectedType={formData.documentType}
          onTypeChange={(type) => setFormData({ ...formData, documentType: type })}
        />
      )
    },
    {
      id: 1,
      title: "Kurikulum Berbasis Cinta",
      description: "Pilih nilai-nilai cinta dan pendekatan pembelajaran",
      icon: Heart,
      component: (
        <LoveBasedCurriculumSelector
          nilaiCinta={formData.nilaiCinta}
          pendekatanPembelajaran={formData.pendekatanPembelajaran}
          onNilaiCintaChange={(key, value) => 
            setFormData({ 
              ...formData, 
              nilaiCinta: { 
                ...formData.nilaiCinta, 
                [key]: value 
              } 
            })
          }
          onPendekatanChange={(value) => 
            setFormData({ ...formData, pendekatanPembelajaran: value })
          }
        />
      )
    },
    {
      id: 2,
      title: "Assessment Karakter",
      description: "Review pilihan dan rekomendasi pembelajaran",
      icon: Award,
      component: (
        <CharacterAssessmentCards
          nilaiCinta={formData.nilaiCinta}
          pendekatanPembelajaran={formData.pendekatanPembelajaran}
        />
      )
    }
  ];

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;
  const selectedNilaiCinta = Object.values(formData.nilaiCinta).filter(Boolean).length;

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.documentType !== null;
      case 1:
        return selectedNilaiCinta >= 1;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Learning Document Wizard
              </CardTitle>
              <CardDescription>
                Buat dokumen pembelajaran dengan mudah dan terstruktur
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              Langkah {currentStep + 1} dari {steps.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {Math.round(progressPercentage)}% selesai
              </span>
              <span className="text-muted-foreground">
                {currentStep + 1} dari {steps.length} langkah
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium">
              {index < currentStep ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : index === currentStep ? (
                <step.icon className="h-4 w-4 text-primary" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${
                index <= currentStep ? "text-primary" : "text-muted-foreground"
              }`}>
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {step.description}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="ml-4 w-8 h-px bg-muted" />
            )}
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <steps[currentStep].icon className="h-5 w-5 text-primary" />
            {steps[currentStep].title}
          </CardTitle>
          <CardDescription>
            {steps[currentStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {steps[currentStep].component}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Sebelumnya
        </Button>

        <div className="flex items-center gap-4">
          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Selesai & Lanjutkan
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2"
            >
              Selanjutnya
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Quick Summary */}
      {currentStep > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Ringkasan Pilihan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Jenis Dokumen:</span>
                <Badge variant="outline">{formData.documentType}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Pendekatan:</span>
                <Badge variant="outline">{formData.pendekatanPembelajaran}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Nilai Cinta:</span>
                <Badge variant="outline">{selectedNilaiCinta} dipilih</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 