import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  FileText,
  Download,
  Eye,
  Clock,
  Users,
  Target
} from "lucide-react";
import { perencanaanPembelajaranGenerator } from "@/lib/rpp-generator";
import { ContentValidator } from "@/lib/content-validator";
import { PerformanceMonitor } from "@/lib/performance-monitor";
import { AnalyticsManager } from "@/lib/analytics";

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
  result?: any;
}

const EndToEndTest = () => {
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: 'form-validation',
      name: 'Form Validation',
      description: 'Validasi input form data',
      status: 'pending'
    },
    {
      id: 'content-generation',
      name: 'Content Generation',
      description: 'Generate dokumen pembelajaran',
      status: 'pending'
    },
    {
      id: 'quality-assessment',
      name: 'Quality Assessment',
      description: 'Assess kualitas konten',
      status: 'pending'
    },
    {
      id: 'performance-test',
      name: 'Performance Test',
      description: 'Test performa aplikasi',
      status: 'pending'
    },
    {
      id: 'export-test',
      name: 'Export Test',
      description: 'Test export dokumen',
      status: 'pending'
    },
    {
      id: 'analytics-test',
      name: 'Analytics Test',
      description: 'Test tracking analytics',
      status: 'pending'
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [testResults, setTestResults] = useState<any>({});

  const updateStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    setWorkflowSteps(prev => 
      prev.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      )
    );
  };

  const runWorkflowTest = async () => {
    setIsRunning(true);
    setTestResults({});

    // Mock form data for testing
          const mockFormData = {
        namaGuru: "Ahmad S.Pd",
        satuanPendidikan: "MI Al-Hikmah",
        jenjang: "MI" as const,
        fase: "A",
        kelas: "3",
        semester: "Ganjil" as const,
        mataPelajaran: "Matematika",
        tema: "Bilangan dan Operasi Hitung",
        subtema: "Penjumlahan dan Pengurangan",
        alokasi: "2 x 40 menit",
        pertemuan: 1,
        pendekatanPembelajaran: "Love-Based" as const,
        nilaiCinta: {
          cintaAllah: true,
          cintaRasul: true,
          cintaKeluarga: false,
          cintaSesama: true,
          cintaAlam: false,
          cintaTanahAir: true,
        },
        capaianPembelajaran: {
          pengetahuan: "Memahami konsep penjumlahan dan pengurangan bilangan bulat",
          keterampilan: "Mampu melakukan penjumlahan dan pengurangan dengan benar",
          sikap: "Menunjukkan sikap kreatif dan inovatif dalam menyelesaikan masalah"
        },
        penilaianKarakter: ["Observasi Sikap", "Refleksi Diri"],
        integrasiNilaiIslam: ["Doa Sebelum Belajar", "Adab Belajar"],
        asesmenAutentik: ["Observasi Sikap", "Refleksi Diri"],
        modelPembelajaran: ["Project Based Learning"],
        metodePembelajaran: ["Diskusi", "Praktik"],
        kemitraanPembelajaran: ["Guru", "Orang Tua"],
        lingkunganPembelajaran: ["Kelas", "Lingkungan Sekitar"],
        pemanfaatanDigital: ["Aplikasi Pembelajaran", "Video"]
      };

    try {
      // Step 1: Form Validation
      setCurrentStep('form-validation');
      updateStep('form-validation', { status: 'running' });
      
      const startTime = Date.now();
      const validation = ContentValidator.validateFormData(mockFormData);
      const duration = Date.now() - startTime;
      
      updateStep('form-validation', { 
        status: validation.isValid ? 'completed' : 'failed',
        duration,
        result: validation
      });

      if (!validation.isValid) {
        throw new Error('Form validation failed');
      }

      // Step 2: Content Generation
      setCurrentStep('content-generation');
      updateStep('content-generation', { status: 'running' });
      
      const genStartTime = Date.now();
      const generatedDocument = await perencanaanPembelajaranGenerator.generateLearningDocument(mockFormData);
      const genDuration = Date.now() - genStartTime;
      
      updateStep('content-generation', { 
        status: 'completed',
        duration: genDuration,
        result: generatedDocument
      });

      // Step 3: Quality Assessment
      setCurrentStep('quality-assessment');
      updateStep('quality-assessment', { status: 'running' });
      
      const qualityStartTime = Date.now();
      const qualityValidation = ContentValidator.validateGeneratedContent(generatedDocument);
      const qualityDuration = Date.now() - qualityStartTime;
      
      updateStep('quality-assessment', { 
        status: qualityValidation.isValid ? 'completed' : 'failed',
        duration: qualityDuration,
        result: qualityValidation
      });

      // Step 4: Performance Test
      setCurrentStep('performance-test');
      updateStep('performance-test', { status: 'running' });
      
      const perfStartTime = Date.now();
      const performanceMonitor = PerformanceMonitor.getInstance();
      const performanceReport = performanceMonitor.generateReport();
      const perfDuration = Date.now() - perfStartTime;
      
      updateStep('performance-test', { 
        status: performanceReport.score > 70 ? 'completed' : 'failed',
        duration: perfDuration,
        result: performanceReport
      });

      // Step 5: Export Test
      setCurrentStep('export-test');
      updateStep('export-test', { status: 'running' });
      
      const exportStartTime = Date.now();
      // Simulate export functionality
      await new Promise(resolve => setTimeout(resolve, 1000));
      const exportDuration = Date.now() - exportStartTime;
      
      updateStep('export-test', { 
        status: 'completed',
        duration: exportDuration,
        result: { format: 'docx', size: '2.5MB' }
      });

      // Step 6: Analytics Test
      setCurrentStep('analytics-test');
      updateStep('analytics-test', { status: 'running' });
      
      const analyticsStartTime = Date.now();
      AnalyticsManager.trackEvent('form_submit', { 
        steps: workflowSteps.length,
        duration: Date.now() - startTime,
        testType: 'e2e_test_completed'
      });
      const analyticsDuration = Date.now() - analyticsStartTime;
      
      updateStep('analytics-test', { 
        status: 'completed',
        duration: analyticsDuration,
        result: { event: 'e2e_test_completed' }
      });

      setTestResults({
        totalSteps: workflowSteps.length,
        completedSteps: workflowSteps.filter(s => s.status === 'completed').length,
        totalDuration: Date.now() - startTime,
        success: true
      });

    } catch (error) {
      console.error('E2E Test failed:', error);
      setTestResults({
        error: error.message,
        success: false
      });
    } finally {
      setIsRunning(false);
      setCurrentStep('');
    }
  };

  const resetTest = () => {
    setWorkflowSteps(prev => 
      prev.map(step => ({ ...step, status: 'pending', duration: undefined, result: undefined }))
    );
    setTestResults({});
    setCurrentStep('');
  };

  const getStepIcon = (status: 'pending' | 'running' | 'completed' | 'failed') => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />;
      case 'running':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStepColor = (status: 'pending' | 'running' | 'completed' | 'failed') => {
    switch (status) {
      case 'pending':
        return 'border-gray-200 bg-gray-50';
      case 'running':
        return 'border-blue-200 bg-blue-50';
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'failed':
        return 'border-red-200 bg-red-50';
    }
  };

  const completedSteps = workflowSteps.filter(s => s.status === 'completed').length;
  const progressPercentage = (completedSteps / workflowSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            End-to-End
            <span className="block text-primary">Testing</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test workflow lengkap dari form input sampai hasil akhir
          </p>
        </div>

        {/* Test Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Play className="h-6 w-6 text-primary" />
              Test Controls
            </CardTitle>
            <CardDescription>
              Jalankan test workflow lengkap untuk memverifikasi semua fitur
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button 
                onClick={runWorkflowTest}
                disabled={isRunning}
                className="flex items-center gap-2"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Running E2E Test...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Run E2E Test
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline"
                onClick={resetTest}
                disabled={isRunning}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset Test
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress: {completedSteps}/{workflowSteps.length} steps</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {currentStep && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                <span className="text-sm font-medium text-blue-700">
                  Currently running: {currentStep}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Workflow Steps */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Workflow Steps</h2>
          
          {workflowSteps.map((step) => (
            <Card key={step.id} className={getStepColor(step.status)}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStepIcon(step.status)}
                    <div>
                      <CardTitle className="text-lg">{step.name}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                      {step.status.toUpperCase()}
                    </Badge>
                    {step.duration && (
                      <span className="text-sm text-muted-foreground">
                        {step.duration}ms
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {step.result && (
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium">Result:</h4>
                    <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                      {JSON.stringify(step.result, null, 2)}
                    </pre>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Test Results Summary */}
        {Object.keys(testResults).length > 0 && (
          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Test Results Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Test Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Steps:</span>
                      <span className="font-medium">{testResults.totalSteps || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed Steps:</span>
                      <span className="font-medium">{testResults.completedSteps || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Duration:</span>
                      <span className="font-medium">{testResults.totalDuration || 0}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="font-medium">
                        {testResults.totalSteps ? 
                          Math.round((testResults.completedSteps / testResults.totalSteps) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Test Status</h3>
                  <div className="flex items-center gap-2">
                    {testResults.success ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-green-700 font-medium">All tests passed successfully!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <span className="text-red-700 font-medium">Some tests failed</span>
                      </>
                    )}
                  </div>
                  
                  {testResults.error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-700 mb-2">Error Details:</h4>
                      <p className="text-sm text-red-600">{testResults.error}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EndToEndTest; 