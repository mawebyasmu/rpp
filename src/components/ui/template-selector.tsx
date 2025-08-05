import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Heart, BookOpen, Star, Target, Users } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  documentType: "RPP" | "LDP";
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
  documentType,
}) => {
  const templates = documentType === "RPP" ? [
    {
      id: "rpp-standar",
      name: "RPP Standar",
      description: "Template RPP dengan struktur lengkap sesuai kurikulum nasional",
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      features: ["Kompetensi Dasar", "Indikator", "Tujuan Pembelajaran", "Penilaian"]
    },
    {
      id: "rpp-sederhana",
      name: "RPP Sederhana",
      description: "Template RPP yang ringkas dan mudah dipahami",
      icon: BookOpen,
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      features: ["Struktur Ringkas", "Fokus Utama", "Implementasi Mudah"]
    }
  ] : [
    {
      id: "ldp-love-based",
      name: "LDP Berbasis Cinta",
      description: "Template LDP dengan fokus pada pengembangan karakter dan nilai cinta",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      features: ["Nilai Cinta", "Pengembangan Karakter", "Integrasi Islam"]
    },
    {
      id: "ldp-holistic",
      name: "LDP Holistik",
      description: "Template LDP dengan pendekatan pembelajaran menyeluruh",
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      features: ["Pembelajaran Holistik", "Multiple Intelligence", "Character Building"]
    },
    {
      id: "ldp-project-based",
      name: "LDP Project-Based",
      description: "Template LDP dengan fokus pada pembelajaran berbasis proyek",
      icon: Target,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      features: ["Project-Based Learning", "Real World Connection", "Collaboration"]
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Pilih Template {documentType}</h3>
        <p className="text-muted-foreground">
          Pilih template yang sesuai dengan kebutuhan pembelajaran Anda
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id 
                ? `${template.borderColor} ${template.bgColor} ring-2 ring-primary/20` 
                : "border-gray-200 hover:border-primary/50"
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <CardHeader className="text-center">
              <div className={`mx-auto w-12 h-12 ${template.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                <template.icon className={`h-6 w-6 ${template.color}`} />
              </div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription>
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3">
                <div className="space-y-1">
                  {template.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                {selectedTemplate === template.id && (
                  <Badge variant="default" className="mt-2">
                    Template Dipilih
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template Preview */}
      {selectedTemplate && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Preview Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">Template:</span>
                <Badge variant="outline">
                  {templates.find(t => t.id === selectedTemplate)?.name}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Jenis Dokumen:</span>
                <Badge variant="outline">{documentType}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Fitur Utama:</span>
                <div className="flex flex-wrap gap-1">
                  {templates.find(t => t.id === selectedTemplate)?.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 