import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Heart, Users } from "lucide-react";

interface DocumentTypeSelectorProps {
  selectedType: "RPP" | "LDP";
  onTypeChange: (type: "RPP" | "LDP") => void;
}

export const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Pilih Jenis Dokumen Pembelajaran</h3>
        <p className="text-muted-foreground">
          Pilih jenis dokumen yang sesuai dengan kebutuhan Anda
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {/* RPP Option */}
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedType === "RPP" 
              ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
              : "border-gray-200 hover:border-primary/50"
          }`}
          onClick={() => onTypeChange("RPP")}
        >
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-3">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <CardTitle className="text-lg">RPP</CardTitle>
            <CardDescription>
              Rencana Pelaksanaan Pembelajaran
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Dokumen pembelajaran tradisional</p>
              <p>✓ Fokus pada kompetensi akademik</p>
              <p>✓ Struktur RPP standar</p>
              <p>✓ Sesuai kurikulum nasional</p>
            </div>
          </CardContent>
        </Card>

        {/* LDP Option */}
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedType === "LDP" 
              ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
              : "border-gray-200 hover:border-primary/50"
          }`}
          onClick={() => onTypeChange("LDP")}
        >
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-3">
              <Heart className="h-6 w-6 text-green-500" />
            </div>
            <CardTitle className="text-lg">LDP</CardTitle>
            <CardDescription>
              Lembar Dokumen Pembelajaran
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Dokumen pembelajaran berbasis cinta</p>
              <p>✓ Fokus pada pengembangan karakter</p>
              <p>✓ Integrasi nilai-nilai Islam</p>
              <p>✓ Sesuai Kurikulum Berbasis Cinta</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selection Indicator */}
      <div className="text-center mt-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
          <span className="text-sm font-medium">
            {selectedType === "RPP" ? "Rencana Pelaksanaan Pembelajaran" : "Lembar Dokumen Pembelajaran"}
          </span>
        </div>
      </div>
    </div>
  );
}; 