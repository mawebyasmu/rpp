import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Share2, 
  Printer, 
  Mail, 
  Copy, 
  Eye,
  FileDown,
  FileUp,
  Smartphone
} from "lucide-react";

interface ExportOptionsProps {
  onExport: (format: string) => void;
  onPreview: () => void;
  onShare: () => void;
  onPrint: () => void;
  documentType: "RPP" | "LDP";
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({
  onExport,
  onPreview,
  onShare,
  onPrint,
  documentType,
}) => {
  const exportFormats = [
    {
      id: "docx",
      name: "Microsoft Word (.docx)",
      description: "Format dokumen yang dapat diedit di Microsoft Word",
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      popular: true
    },
    {
      id: "pdf",
      name: "PDF Document (.pdf)",
      description: "Format dokumen yang siap untuk dicetak dan dibagikan",
      icon: FileDown,
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      popular: false
    },
    {
      id: "txt",
      name: "Plain Text (.txt)",
      description: "Format teks sederhana untuk kompatibilitas maksimal",
      icon: FileUp,
      color: "text-gray-500",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      popular: false
    }
  ];

  const quickActions = [
    {
      id: "preview",
      name: "Preview",
      description: "Lihat dokumen sebelum mengunduh",
      icon: Eye,
      color: "text-green-500",
      bgColor: "bg-green-50",
      action: onPreview
    },
    {
      id: "share",
      name: "Bagikan",
      description: "Bagikan dokumen melalui email atau link",
      icon: Share2,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      action: onShare
    },
    {
      id: "print",
      name: "Cetak",
      description: "Cetak dokumen langsung dari browser",
      icon: Printer,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      action: onPrint
    }
  ];

  return (
    <div className="space-y-6">
      {/* Export Formats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Pilih Format Export
          </CardTitle>
          <CardDescription>
            Pilih format file yang sesuai dengan kebutuhan Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {exportFormats.map((format) => (
              <Card 
                key={format.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${format.borderColor} ${format.bgColor}`}
                onClick={() => onExport(format.id)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto w-12 h-12 ${format.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                    <format.icon className={`h-6 w-6 ${format.color}`} />
                  </div>
                  <CardTitle className="text-base flex items-center justify-center gap-2">
                    {format.name}
                    {format.popular && (
                      <Badge variant="default" className="text-xs">
                        Populer
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {format.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onExport(format.id);
                    }}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Unduh {format.name.split(' ')[0]}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Aksi Cepat
          </CardTitle>
          <CardDescription>
            Akses cepat untuk preview, share, dan print dokumen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Card 
                key={action.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${action.borderColor} ${action.bgColor}`}
                onClick={action.action}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <CardTitle className="text-base">{action.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      action.action();
                    }}
                    className="w-full"
                  >
                    {action.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Summary */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            Ringkasan Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-medium">Jenis Dokumen:</span>
              <Badge variant="outline">{documentType}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Format Tersedia:</span>
              <div className="flex flex-wrap gap-1">
                {exportFormats.map((format) => (
                  <Badge key={format.id} variant="secondary" className="text-xs">
                    {format.id.toUpperCase()}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Aksi Cepat:</span>
              <div className="flex flex-wrap gap-1">
                {quickActions.map((action) => (
                  <Badge key={action.id} variant="outline" className="text-xs">
                    {action.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 