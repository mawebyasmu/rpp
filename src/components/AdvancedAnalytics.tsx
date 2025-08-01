import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Target, 
  Users, 
  Clock, 
  Lightbulb, 
  BookOpen, 
  Activity,
  BarChart3,
  Brain,
  Zap
} from "lucide-react";

interface PersonalizedRecommendations {
  learningStyle: string;
  difficultyLevel: string;
  technologyLevel: string;
  timeAllocation: {
    pendahuluan: string;
    inti: string;
    penutup: string;
  };
  assessmentStrategy: string[];
  differentiationStrategy: {
    content: string[];
    process: string[];
    product: string[];
    environment: string[];
  };
  enrichmentActivities: string[];
  remedialStrategies: string[];
  collaborationOpportunities: string[];
  realWorldConnections: string[];
}

interface AdvancedAnalyticsProps {
  recommendations: PersonalizedRecommendations;
  mataPelajaran: string;
  jenjang: string;
  kelas: string;
}

const AdvancedAnalytics = ({ recommendations, mataPelajaran, jenjang, kelas }: AdvancedAnalyticsProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Analytics & Rekomendasi</h2>
        <p className="text-muted-foreground">
          Analisis personalisasi untuk {mataPelajaran} {jenjang} Kelas {kelas}
        </p>
      </div>

      {/* Learning Profile */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Profil Pembelajaran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <Badge variant="secondary" className="mb-2">
                <BookOpen className="h-3 w-3 mr-1" />
                Gaya Belajar
              </Badge>
              <p className="font-semibold">{recommendations.learningStyle}</p>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-2">
                <Target className="h-3 w-3 mr-1" />
                Tingkat Kesulitan
              </Badge>
              <p className="font-semibold">{recommendations.difficultyLevel}</p>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-2">
                <Zap className="h-3 w-3 mr-1" />
                Level Teknologi
              </Badge>
              <p className="font-semibold">{recommendations.technologyLevel}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Allocation */}
      <Card className="border-secondary/20 bg-secondary/5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Clock className="h-5 w-5 text-secondary" />
            Alokasi Waktu Optimal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">
                {recommendations.timeAllocation.pendahuluan}
              </div>
              <p className="text-sm text-muted-foreground">Pendahuluan</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">
                {recommendations.timeAllocation.inti}
              </div>
              <p className="text-sm text-muted-foreground">Kegiatan Inti</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">
                {recommendations.timeAllocation.penutup}
              </div>
              <p className="text-sm text-muted-foreground">Penutup</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Strategy */}
      <Card className="border-accent/20 bg-accent/5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            Strategi Penilaian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.assessmentStrategy.map((strategy, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">{strategy}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Differentiation Strategies */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Strategi Diferensiasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Konten</h3>
              <ul className="space-y-2 text-sm">
                {recommendations.differentiationStrategy.content.map((strategy, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Proses</h3>
              <ul className="space-y-2 text-sm">
                {recommendations.differentiationStrategy.process.map((strategy, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrichment & Remedial */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-secondary/20 bg-secondary/5">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              Aktivitas Pengayaan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.enrichmentActivities.map((activity, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></div>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent" />
              Strategi Remedial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.remedialStrategies.map((strategy, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                  <span>{strategy}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Collaboration & Real World */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Peluang Kolaborasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.collaborationOpportunities.map((opportunity, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span>{opportunity}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-secondary/5">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-secondary" />
              Koneksi Dunia Nyata
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.realWorldConnections.map((connection, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></div>
                  <span>{connection}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedAnalytics; 