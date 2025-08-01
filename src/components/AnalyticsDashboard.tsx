import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Download, 
  FileText, 
  Users, 
  TrendingUp, 
  Clock, 
  Star,
  Activity,
  Target,
  Zap,
  Eye,
  MessageSquare
} from "lucide-react";
import { AnalyticsManager } from "@/lib/analytics";

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);

  useEffect(() => {
    // Get analytics data
    const summary = AnalyticsManager.getAnalyticsSummary();
    const userInsights = AnalyticsManager.getUserInsights();
    
    setAnalyticsData(summary);
    setInsights(userInsights);
  }, []);

  if (!analyticsData || !insights) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Memuat data analytics...</p>
        </div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">
          Analisis penggunaan aplikasi Madrasah RPP Wizard
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Form Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.totalFormSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              RPP yang dibuat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.totalDownloads}</div>
            <p className="text-xs text-muted-foreground">
              File .docx diunduh
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(insights.conversionRate)}</div>
            <p className="text-xs text-muted-foreground">
              Form → Download
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(insights.averageSessionDuration)}</div>
            <p className="text-xs text-muted-foreground">
              Rata-rata per sesi
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Popular Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Fitur Paling Digunakan
          </CardTitle>
          <CardDescription>
            Fitur yang paling sering digunakan oleh pengguna
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(insights.mostUsedFeatures).map(([feature, count]) => (
              <div key={feature} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{feature}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={(count as number / insights.totalFormSubmissions) * 100} className="w-24" />
                  <span className="text-sm font-medium">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Mata Pelajaran */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Mata Pelajaran Paling Populer
          </CardTitle>
          <CardDescription>
            Mata pelajaran yang paling sering dibuat RPP-nya
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(analyticsData.popularMataPelajaran)
              .sort(([,a], [,b]) => (b as number) - (a as number))
              .slice(0, 5)
              .map(([mataPelajaran, count]) => (
                <div key={mataPelajaran} className="flex items-center justify-between">
                  <span className="font-medium">{mataPelajaran}</span>
                  <Badge variant="outline">{count} RPP</Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* User Journey */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            User Journey
          </CardTitle>
          <CardDescription>
            Alur penggunaan aplikasi oleh pengguna
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 flex-wrap">
            {insights.userJourney.map((event: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {event === 'page_view' && <Eye className="h-3 w-3 mr-1" />}
                  {event === 'form_submit' && <FileText className="h-3 w-3 mr-1" />}
                  {event === 'download_rpp' && <Download className="h-3 w-3 mr-1" />}
                  {event === 'view_analytics' && <BarChart3 className="h-3 w-3 mr-1" />}
                  {event === 'feedback_submit' && <MessageSquare className="h-3 w-3 mr-1" />}
                  {event === 'error_occurred' && <Star className="h-3 w-3 mr-1" />}
                  {event.replace('_', ' ')}
                </Badge>
                {index < insights.userJourney.length - 1 && (
                  <span className="text-muted-foreground">→</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Session Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Informasi Sesi
          </CardTitle>
          <CardDescription>
            Detail sesi penggunaan aplikasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Session ID</p>
              <p className="text-xs text-muted-foreground font-mono">
                {analyticsData.sessionId}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Events</p>
              <p className="text-xs text-muted-foreground">
                {analyticsData.totalEvents} events
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Feedback Count</p>
              <p className="text-xs text-muted-foreground">
                {analyticsData.feedbackCount} feedback
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Last Activity</p>
              <p className="text-xs text-muted-foreground">
                {analyticsData.lastActivity ? 
                  new Date(analyticsData.lastActivity).toLocaleString('id-ID') : 
                  'N/A'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Data
          </CardTitle>
          <CardDescription>
            Unduh data analytics untuk analisis lebih lanjut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                const data = AnalyticsManager.exportAnalyticsData();
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export Analytics Data
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                AnalyticsManager.clearAnalyticsData();
                window.location.reload();
              }}
              className="gap-2"
            >
              <Activity className="h-4 w-4" />
              Clear Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard; 