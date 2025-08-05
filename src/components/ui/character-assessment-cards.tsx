import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Star, Users, Target, Award, CheckCircle } from "lucide-react";

interface CharacterAssessmentCardsProps {
  nilaiCinta: {
    cintaAllah: boolean;
    cintaRasul: boolean;
    cintaKeluarga: boolean;
    cintaSesama: boolean;
    cintaAlam: boolean;
    cintaTanahAir: boolean;
  };
  pendekatanPembelajaran: "Love-Based" | "Holistic" | "Character-Building";
}

export const CharacterAssessmentCards: React.FC<CharacterAssessmentCardsProps> = ({
  nilaiCinta,
  pendekatanPembelajaran,
}) => {
  const selectedNilaiCinta = Object.values(nilaiCinta).filter(Boolean).length;
  const totalNilaiCinta = Object.keys(nilaiCinta).length;
  const progressPercentage = (selectedNilaiCinta / totalNilaiCinta) * 100;

  const assessmentAreas = [
    {
      title: "Nilai Cinta",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      description: "Pengembangan nilai-nilai cinta dalam pembelajaran",
      value: selectedNilaiCinta,
      total: totalNilaiCinta,
      items: Object.entries(nilaiCinta)
        .filter(([_, value]) => value)
        .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))
    },
    {
      title: "Pendekatan Pembelajaran",
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      description: "Metode pembelajaran yang dipilih",
      value: 1,
      total: 1,
      items: [pendekatanPembelajaran]
    },
    {
      title: "Pengembangan Karakter",
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      description: "Aspek pengembangan karakter siswa",
      value: selectedNilaiCinta > 0 ? 1 : 0,
      total: 1,
      items: selectedNilaiCinta > 0 ? ["Karakter Development Active"] : ["Belum ada nilai cinta dipilih"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Ringkasan Assessment Karakter
          </CardTitle>
          <CardDescription>
            Progress pengembangan karakter berdasarkan pilihan nilai cinta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress Nilai Cinta</span>
              <span className="text-sm text-muted-foreground">
                {selectedNilaiCinta} dari {totalNilaiCinta} nilai
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                {progressPercentage >= 50 ? "Siap untuk pembelajaran berbasis cinta" : "Perlu menambahkan nilai cinta"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Areas */}
      <div className="grid md:grid-cols-3 gap-4">
        {assessmentAreas.map((area, index) => (
          <Card key={index} className={`${area.borderColor} ${area.bgColor}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <area.icon className={`h-5 w-5 ${area.color}`} />
                <CardTitle className="text-base">{area.title}</CardTitle>
              </div>
              <CardDescription className="text-sm">
                {area.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <Badge variant="secondary">
                    {area.value}/{area.total}
                  </Badge>
                </div>
                <Progress 
                  value={(area.value / area.total) * 100} 
                  className="h-2"
                />
                <div className="space-y-2">
                  <span className="text-xs font-medium text-muted-foreground">Item yang dipilih:</span>
                  <div className="flex flex-wrap gap-1">
                    {area.items.map((item, itemIndex) => (
                      <Badge key={itemIndex} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Rekomendasi Pembelajaran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {selectedNilaiCinta >= 3 ? (
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-green-700">Siap untuk pembelajaran berbasis cinta</p>
                  <p className="text-sm text-green-600">
                    Dengan {selectedNilaiCinta} nilai cinta yang dipilih, pembelajaran akan fokus pada pengembangan karakter dan nilai-nilai Islam.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-700">Perlu menambahkan nilai cinta</p>
                  <p className="text-sm text-yellow-600">
                    Pilih minimal 3 nilai cinta untuk pembelajaran yang optimal berbasis karakter.
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-3">
              <Star className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-blue-700">Pendekatan: {pendekatanPembelajaran}</p>
                <p className="text-sm text-blue-600">
                  Pendekatan ini akan mengintegrasikan nilai-nilai cinta dalam pembelajaran secara holistik.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 