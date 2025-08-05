import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Users, Target, Star } from "lucide-react";

interface LoveBasedCurriculumSelectorProps {
  nilaiCinta: {
    cintaAllah: boolean;
    cintaRasul: boolean;
    cintaKeluarga: boolean;
    cintaSesama: boolean;
    cintaAlam: boolean;
    cintaTanahAir: boolean;
  };
  pendekatanPembelajaran: "Love-Based" | "Holistic" | "Character-Building";
  onNilaiCintaChange: (key: string, value: boolean) => void;
  onPendekatanChange: (value: "Love-Based" | "Holistic" | "Character-Building") => void;
}

export const LoveBasedCurriculumSelector: React.FC<LoveBasedCurriculumSelectorProps> = ({
  nilaiCinta,
  pendekatanPembelajaran,
  onNilaiCintaChange,
  onPendekatanChange,
}) => {
  const nilaiCintaOptions = [
    {
      key: "cintaAllah",
      label: "Cinta kepada Allah SWT",
      description: "Mengintegrasikan nilai-nilai Islam dalam pembelajaran",
      icon: "🕌"
    },
    {
      key: "cintaRasul",
      label: "Cinta kepada Rasulullah SAW",
      description: "Meneladani akhlak Rasulullah dalam pembelajaran",
      icon: "📖"
    },
    {
      key: "cintaKeluarga",
      label: "Cinta kepada Keluarga",
      description: "Mengembangkan sikap hormat kepada keluarga",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      key: "cintaSesama",
      label: "Cinta kepada Sesama",
      description: "Mengembangkan sikap tolong-menolong",
      icon: "🤝"
    },
    {
      key: "cintaAlam",
      label: "Cinta kepada Alam",
      description: "Mengembangkan sikap peduli terhadap lingkungan",
      icon: "🌱"
    },
    {
      key: "cintaTanahAir",
      label: "Cinta kepada Tanah Air",
      description: "Mengembangkan sikap cinta tanah air",
      icon: "🇮🇩"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Pendekatan Pembelajaran */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Pendekatan Pembelajaran
          </CardTitle>
          <CardDescription>
            Pilih pendekatan pembelajaran yang sesuai dengan Kurikulum Berbasis Cinta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={pendekatanPembelajaran} onValueChange={onPendekatanChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih pendekatan pembelajaran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Love-Based">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  Love-Based Learning
                </div>
              </SelectItem>
              <SelectItem value="Holistic">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  Holistic Development
                </div>
              </SelectItem>
              <SelectItem value="Character-Building">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Character Building
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Nilai-Nilai Cinta */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-600" />
            Nilai-Nilai Cinta
          </CardTitle>
          <CardDescription>
            Pilih nilai-nilai cinta yang akan dikembangkan dalam pembelajaran
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {nilaiCintaOptions.map((option) => (
              <div key={option.key} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-green-50 transition-colors">
                <Checkbox
                  id={option.key}
                  checked={nilaiCinta[option.key as keyof typeof nilaiCinta]}
                  onCheckedChange={(checked) => 
                    onNilaiCintaChange(option.key, checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={option.key} className="flex items-center gap-2 cursor-pointer">
                    <span className="text-lg">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selection Summary */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-600" />
            Ringkasan Pilihan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <span className="font-medium">Pendekatan Pembelajaran: </span>
              <span className="text-blue-600">{pendekatanPembelajaran}</span>
            </div>
            <div>
              <span className="font-medium">Nilai Cinta yang Dipilih: </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(nilaiCinta)
                  .filter(([_, value]) => value)
                  .map(([key, _]) => {
                    const option = nilaiCintaOptions.find(opt => opt.key === key);
                    return (
                      <span key={key} className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        <span>{option?.icon}</span>
                        {option?.label}
                      </span>
                    );
                  })}
                {Object.values(nilaiCinta).every(value => !value) && (
                  <span className="text-muted-foreground text-sm">Belum ada nilai cinta yang dipilih</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 