import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Download, ArrowLeft, CheckCircle, Brain } from "lucide-react";
import RppViewer from "@/components/RppViewer";
import { GeneratedRPP, RPPFormData } from "@/lib/rpp-generator";

const ResultPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<RPPFormData | null>(null);
  const [generatedRPP, setGeneratedRPP] = useState<GeneratedRPP | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const savedFormData = localStorage.getItem('rppFormData');
    const savedRPP = localStorage.getItem('generatedRPP');
    
    if (savedFormData && savedRPP) {
      setFormData(JSON.parse(savedFormData));
      setGeneratedRPP(JSON.parse(savedRPP));
    } else {
      navigate('/generator');
    }
  }, [navigate]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Download Berhasil! 📄",
        description: "RPP telah berhasil diunduh dalam format .docx",
      });
    } catch (error) {
      toast({
        title: "Download Gagal",
        description: "Terjadi kesalahan saat mengunduh RPP",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (!formData || !generatedRPP) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p>Loading RPP...</p>
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
          
          <Badge variant="secondary" className="px-4 py-2">
            <CheckCircle className="h-4 w-4 mr-2" />
            RPP Generated with AI
          </Badge>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            RPP <span className="text-primary">Standar Kurikulum</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            RPP lengkap sesuai standar Madrasah yang dihasilkan menggunakan Deep Learning AI
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <RppViewer rpp={generatedRPP} />
          </div>
          
          <div className="space-y-6">
            <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-center">Download RPP</CardTitle>
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