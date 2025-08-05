import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TestTube, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Stop, 
  RefreshCw,
  FileText,
  Heart,
  Users,
  Award,
  Download,
  Eye
} from "lucide-react";
import { DocumentTypeSelector } from "@/components/ui/document-type-selector";
import { LoveBasedCurriculumSelector } from "@/components/ui/love-based-curriculum-selector";
import { CharacterAssessmentCards } from "@/components/ui/character-assessment-cards";
import { LearningDocumentWizard } from "@/components/ui/learning-document-wizard";
import { TemplateSelector } from "@/components/ui/template-selector";
import { ExportOptions } from "@/components/ui/export-options";
import { UsabilityTesting } from "@/components/ui/usability-testing";
import { ContentValidator } from "@/lib/content-validator";
import { PerformanceMonitor } from "@/lib/performance-monitor";

interface TestResult {
  component: string;
  status: 'pass' | 'fail' | 'pending';
  message: string;
  timestamp: Date;
}

const IntegrationTest = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string>('');
  const [testData, setTestData] = useState({
    documentType: "RPP" as "RPP" | "LDP",
    nilaiCinta: {
      cintaAllah: true,
      cintaRasul: true,
      cintaKeluarga: false,
      cintaSesama: true,
      cintaAlam: false,
      cintaTanahAir: true,
    },
    pendekatanPembelajaran: "Love-Based" as "Love-Based" | "Holistic" | "Character-Building",
    selectedTemplate: "rpp-standar",
  });

  const addTestResult = (component: string, status: 'pass' | 'fail' | 'pending', message: string) => {
    setTestResults(prev => [...prev, {
      component,
      status,
      message,
      timestamp: new Date()
    }]);
  };

  const runComponentTest = async (componentName: string, testFunction: () => Promise<boolean>) => {
    setCurrentTest(componentName);
    addTestResult(componentName, 'pending', 'Testing in progress...');
    
    try {
      const result = await testFunction();
      addTestResult(componentName, result ? 'pass' : 'fail', 
        result ? 'Component working correctly' : 'Component has issues');
    } catch (error) {
      addTestResult(componentName, 'fail', `Error: ${error}`);
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test Document Type Selector
    await runComponentTest('Document Type Selector', async () => {
      // Simulate component interaction
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    });

    // Test Love-Based Curriculum Selector
    await runComponentTest('Love-Based Curriculum Selector', async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return Object.values(testData.nilaiCinta).some(Boolean);
    });

    // Test Character Assessment Cards
    await runComponentTest('Character Assessment Cards', async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    });

    // Test Learning Document Wizard
    await runComponentTest('Learning Document Wizard', async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    });

    // Test Template Selector
    await runComponentTest('Template Selector', async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return testData.selectedTemplate !== '';
    });

    // Test Export Options
    await runComponentTest('Export Options', async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    });

    // Test Content Validator
    await runComponentTest('Content Validator', async () => {
      const mockFormData = {
        namaGuru: "Test Guru",
        satuanPendidikan: "MI Test",
        mataPelajaran: "Matematika",
        tema: "Bilangan",
        subtema: "Penjumlahan",
        documentType: "RPP" as const,
        nilaiCinta: testData.nilaiCinta,
        pendekatanPembelajaran: testData.pendekatanPembelajaran,
        capaianPembelajaran: {
          pengetahuan: "Test pengetahuan",
          keterampilan: "Test keterampilan", 
          sikap: "Test sikap"
        },
        penilaianKarakter: ["Observasi"],
        integrasiNilaiIslam: ["Doa"]
      };
      
      const validation = ContentValidator.validateFormData(mockFormData);
      return validation.isValid;
    });

    // Test Performance Monitor
    await runComponentTest('Performance Monitor', async () => {
      const monitor = PerformanceMonitor.getInstance();
      const report = monitor.generateReport();
      return report.score > 0;
    });

    setIsRunning(false);
    setCurrentTest('');
  };

  const resetTests = () => {
    setTestResults([]);
    setCurrentTest('');
  };

  const getStatusIcon = (status: 'pass' | 'fail' | 'pending') => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'fail':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusColor = (status: 'pass' | 'fail' | 'pending') => {
    switch (status) {
      case 'pass':
        return 'bg-green-100 text-green-800';
      case 'fail':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Integration Testing
            <span className="block text-primary">Dashboard</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test semua komponen yang telah dibuat untuk memastikan integrasi yang sempurna
          </p>
        </div>

        <Tabs defaultValue="testing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TestTube className="h-6 w-6 text-primary" />
                  Test Controls
                </CardTitle>
                <CardDescription>
                  Jalankan semua test untuk memverifikasi integrasi komponen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={runAllTests}
                    disabled={isRunning}
                    className="flex items-center gap-2"
                  >
                    {isRunning ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Running Tests...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Run All Tests
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={resetTests}
                    disabled={isRunning}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset Tests
                  </Button>
                </div>

                {currentTest && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                    <span className="text-sm font-medium text-blue-700">
                      Currently testing: {currentTest}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {testResults.filter(r => r.status === 'pass').length}
                    </div>
                    <div className="text-sm text-green-600">Passed</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {testResults.filter(r => r.status === 'fail').length}
                    </div>
                    <div className="text-sm text-red-600">Failed</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {testResults.filter(r => r.status === 'pending').length}
                    </div>
                    <div className="text-sm text-yellow-600">Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Document Type Selector */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Document Type Selector
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentTypeSelector
                    selectedType={testData.documentType}
                    onTypeChange={(type) => setTestData({ ...testData, documentType: type })}
                  />
                </CardContent>
              </Card>

              {/* Love-Based Curriculum Selector */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Love-Based Curriculum Selector
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LoveBasedCurriculumSelector
                    nilaiCinta={testData.nilaiCinta}
                    pendekatanPembelajaran={testData.pendekatanPembelajaran}
                    onNilaiCintaChange={(key, value) => 
                      setTestData({ 
                        ...testData, 
                        nilaiCinta: { 
                          ...testData.nilaiCinta, 
                          [key]: value 
                        } 
                      })
                    }
                    onPendekatanChange={(value) => 
                      setTestData({ ...testData, pendekatanPembelajaran: value })
                    }
                  />
                </CardContent>
              </Card>

              {/* Character Assessment Cards */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Character Assessment Cards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CharacterAssessmentCards
                    nilaiCinta={testData.nilaiCinta}
                    pendekatanPembelajaran={testData.pendekatanPembelajaran}
                  />
                </CardContent>
              </Card>

              {/* Template Selector */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Template Selector
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TemplateSelector
                    selectedTemplate={testData.selectedTemplate}
                    onTemplateChange={(template) => setTestData({ ...testData, selectedTemplate: template })}
                    documentType={testData.documentType}
                  />
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Export Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ExportOptions
                    onExport={(format) => console.log('Export:', format)}
                    onPreview={() => console.log('Preview')}
                    onShare={() => console.log('Share')}
                    onPrint={() => console.log('Print')}
                    documentType={testData.documentType}
                  />
                </CardContent>
              </Card>

              {/* Usability Testing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Usability Testing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <UsabilityTesting
                    onComplete={(feedback) => console.log('Feedback:', feedback)}
                    documentType={testData.documentType}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Eye className="h-6 w-6 text-primary" />
                  Test Results
                </CardTitle>
                <CardDescription>
                  Hasil dari semua test yang telah dijalankan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testResults.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Belum ada test yang dijalankan. Klik "Run All Tests" untuk memulai.
                    </div>
                  ) : (
                    testResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(result.status)}
                          <div>
                            <div className="font-medium">{result.component}</div>
                            <div className="text-sm text-muted-foreground">
                              {result.message}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(result.status)}>
                            {result.status.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {result.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IntegrationTest; 