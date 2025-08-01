import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  GraduationCap,
  Code,
  BookOpen,
  Users,
  Sparkles,
  Target,
  Globe,
  Coffee,
  Lightbulb
} from "lucide-react";
import { AnalyticsManager } from "@/lib/analytics";

interface AboutSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const aboutSections: AboutSection[] = [
  {
    title: "Guru Madrasah",
    description: "Mengajar di lingkungan Madrasah dengan passion untuk mendidik generasi muda dalam nilai-nilai Islam dan teknologi modern.",
    icon: <GraduationCap className="h-5 w-5" />,
    color: "bg-blue-500"
  },
  {
    title: "Tech Enthusiast",
    description: "Passionate dengan teknologi dan pengembangan aplikasi yang bermanfaat untuk dunia pendidikan.",
    icon: <Code className="h-5 w-5" />,
    color: "bg-green-500"
  },
  {
    title: "Problem Solver",
    description: "Mengidentifikasi masalah dalam dunia pendidikan dan menciptakan solusi digital yang inovatif.",
    icon: <Lightbulb className="h-5 w-5" />,
    color: "bg-yellow-500"
  },
  {
    title: "Community Builder",
    description: "Membangun komunitas guru yang saling mendukung dan berbagi pengetahuan.",
    icon: <Users className="h-5 w-5" />,
    color: "bg-purple-500"
  }
];

const achievements = [
  "Mengembangkan aplikasi pendidikan yang bermanfaat",
  "Mengintegrasikan teknologi dalam pembelajaran",
  "Membangun komunitas guru yang kolaboratif",
  "Menciptakan solusi digital untuk pendidikan"
];

const values = [
  "Pendidikan berkualitas untuk semua",
  "Inovasi teknologi yang bermanfaat",
  "Kolaborasi dan berbagi pengetahuan",
  "Kontinuitas pengembangan aplikasi"
];

interface AboutUsDialogProps {
  trigger?: React.ReactNode;
}

export const AboutUsDialog = ({ trigger }: AboutUsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    AnalyticsManager.trackEvent('about_us_viewed', {
      source: 'about_dialog'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Tentang Kami
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Tentang Madrasah RPP Wizard
          </DialogTitle>
          <DialogDescription>
            Mengenal lebih dekat tim di balik aplikasi yang membantu ribuan guru Madrasah
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Hero Section */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-10 w-10 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Alfian Yazdad</CardTitle>
              <CardDescription className="text-lg">
                Guru Madrasah & Tech Enthusiast
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                "Mengajar dengan hati, mengembangkan dengan teknologi. 
                Membantu guru Madrasah menciptakan pembelajaran yang bermakna 
                melalui inovasi digital."
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">Guru Madrasah</Badge>
                <Badge variant="secondary">Developer</Badge>
                <Badge variant="secondary">Tech Enthusiast</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Story Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Cerita Kami
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Sebagai seorang guru Madrasah yang passionate dengan teknologi, saya melihat 
                betapa pentingnya memadukan pendidikan berkualitas dengan inovasi digital. 
                Madrasah RPP Wizard lahir dari pengalaman mengajar yang merasakan betapa 
                berharganya waktu guru dalam menyiapkan materi pembelajaran.
              </p>
              <p className="text-muted-foreground">
                Dengan latar belakang IT dan pengalaman mengajar, saya berkomitmen untuk 
                menciptakan solusi yang tidak hanya memudahkan pekerjaan guru, tetapi juga 
                meningkatkan kualitas pembelajaran siswa Madrasah di seluruh Indonesia.
              </p>
            </CardContent>
          </Card>

          {/* Roles Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Peran & Passion</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {aboutSections.map((section, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${section.color} rounded-lg flex items-center justify-center`}>
                        <div className="text-white">
                          {section.icon}
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Pencapaian Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-green-700">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Values */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Nilai-Nilai Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-700">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Visi Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-700 text-sm">
                "Menjadi platform terdepan yang memberdayakan guru Madrasah dengan 
                teknologi inovatif, menciptakan pembelajaran yang bermakna dan 
                berkualitas untuk generasi masa depan yang unggul dalam ilmu dan takwa."
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-5 w-5" />
                Mari Berkolaborasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Punya ide untuk pengembangan aplikasi? Ingin berkolaborasi? 
                Atau sekedar ingin ngobrol tentang pendidikan dan teknologi?
              </p>
              <div className="flex gap-3">
                <Button 
                  onClick={() => window.open('https://trakteer.id/alfian_yazdad', '_blank')}
                  className="gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Support Kami
                </Button>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Tutup
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutUsDialog; 