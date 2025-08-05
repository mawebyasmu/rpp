import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Rocket, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Globe,
  Shield,
  Zap,
  Database,
  Code,
  Settings,
  Cloud,
  Target
} from "lucide-react";

interface DeploymentStep {
  id: string;
  name: string;
  description: string;
  category: 'build' | 'security' | 'performance' | 'monitoring';
  status: 'pending' | 'completed' | 'failed';
  details?: string;
}

const DeploymentPrep = () => {
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([
    {
      id: 'build-optimization',
      name: 'Build Optimization',
      description: 'Optimize production build',
      category: 'build',
      status: 'pending'
    },
    {
      id: 'security-hardening',
      name: 'Security Hardening',
      description: 'Apply security best practices',
      category: 'security',
      status: 'pending'
    },
    {
      id: 'performance-optimization',
      name: 'Performance Optimization',
      description: 'Optimize for speed and efficiency',
      category: 'performance',
      status: 'pending'
    },
    {
      id: 'environment-config',
      name: 'Environment Configuration',
      description: 'Configure production environment',
      category: 'build',
      status: 'pending'
    },
    {
      id: 'monitoring-setup',
      name: 'Monitoring Setup',
      description: 'Setup error tracking and analytics',
      category: 'monitoring',
      status: 'pending'
    },
    {
      id: 'cdn-configuration',
      name: 'CDN Configuration',
      description: 'Configure content delivery network',
      category: 'performance',
      status: 'pending'
    },
    {
      id: 'ssl-certificate',
      name: 'SSL Certificate',
      description: 'Setup HTTPS security',
      category: 'security',
      status: 'pending'
    },
    {
      id: 'backup-strategy',
      name: 'Backup Strategy',
      description: 'Implement data backup',
      category: 'security',
      status: 'pending'
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [deploymentConfig, setDeploymentConfig] = useState({
    environment: 'production',
    domain: 'airpp.koneksiazka.my.id',
    cdn: true,
    ssl: true,
    monitoring: true,
    analytics: true
  });

  const runDeploymentPrep = async () => {
    setIsRunning(true);

    for (const step of deploymentSteps) {
      setCurrentStep(step.id);
      
      // Simulate deployment preparation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDeploymentSteps(prev => 
        prev.map(s => 
          s.id === step.id ? { ...s, status: 'completed' } : s
        )
      );
    }

    setIsRunning(false);
    setCurrentStep('');
  };

  const getStepIcon = (status: 'pending' | 'completed' | 'failed') => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'build':
        return <Code className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      case 'performance':
        return <Zap className="h-4 w-4" />;
      case 'monitoring':
        return <Database className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'build':
        return 'bg-blue-100 text-blue-800';
      case 'security':
        return 'bg-red-100 text-red-800';
      case 'performance':
        return 'bg-green-100 text-green-800';
      case 'monitoring':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const completedSteps = deploymentSteps.filter(s => s.status === 'completed').length;
  const progressPercentage = (completedSteps / deploymentSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Deployment
            <span className="block text-primary">Preparation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Persiapan lengkap untuk deployment ke production
          </p>
        </div>

        {/* Deployment Configuration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Settings className="h-6 w-6 text-primary" />
              Deployment Configuration
            </CardTitle>
            <CardDescription>
              Konfigurasi untuk deployment ke production
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Environment</h3>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{deploymentConfig.environment}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Domain</h3>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-green-500" />
                    <span className="font-medium">{deploymentConfig.domain}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>CDN: {deploymentConfig.cdn ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>SSL: {deploymentConfig.ssl ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Monitoring: {deploymentConfig.monitoring ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Analytics: {deploymentConfig.analytics ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              Deployment Controls
            </CardTitle>
            <CardDescription>
              Jalankan persiapan deployment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button 
                onClick={runDeploymentPrep}
                disabled={isRunning}
                className="flex items-center gap-2"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Preparing Deployment...
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4" />
                    Run Deployment Prep
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.open('https://vercel.com', '_blank')}
                className="flex items-center gap-2"
              >
                <Cloud className="h-4 w-4" />
                Deploy to Vercel
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress: {completedSteps}/{deploymentSteps.length} steps</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {currentStep && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                <span className="text-sm font-medium text-blue-700">
                  Currently preparing: {currentStep}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Deployment Steps */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Deployment Steps</h2>
          
          {deploymentSteps.map((step) => (
            <Card key={step.id} className="relative">
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
                    {getCategoryIcon(step.category)}
                    <Badge className={getCategoryColor(step.category)}>
                      {step.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                    {step.status.toUpperCase()}
                  </Badge>
                </div>
                
                {step.details && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Details:</h4>
                    <p className="text-sm text-muted-foreground">{step.details}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Production Checklist */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Production Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Pre-Deployment</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">All tests passed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Security audit completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Performance optimized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Environment configured</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Post-Deployment</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">SSL certificate active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">CDN configured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Monitoring active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Analytics tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeploymentPrep; 