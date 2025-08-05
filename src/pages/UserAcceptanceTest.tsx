import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  RefreshCw,
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
  Award,
  Target
} from "lucide-react";

interface UATTest {
  id: string;
  name: string;
  description: string;
  category: 'usability' | 'functionality' | 'performance' | 'security';
  status: 'pending' | 'passed' | 'failed' | 'needs-improvement';
  feedback?: string;
  rating?: number;
}

interface UserFeedback {
  name: string;
  email: string;
  role: string;
  overallRating: number;
  comments: string;
  recommendations: string;
  bugsFound: string;
  featuresRequested: string;
}

const UserAcceptanceTest = () => {
  const [uatTests, setUatTests] = useState<UATTest[]>([
    {
      id: 'form-usability',
      name: 'Form Usability',
      description: 'Test kemudahan penggunaan form input',
      category: 'usability',
      status: 'pending'
    },
    {
      id: 'content-generation',
      name: 'Content Generation',
      description: 'Test generate dokumen pembelajaran',
      category: 'functionality',
      status: 'pending'
    },
    {
      id: 'download-functionality',
      name: 'Download Functionality',
      description: 'Test download dokumen .docx',
      category: 'functionality',
      status: 'pending'
    },
    {
      id: 'curriculum-alignment',
      name: 'Curriculum Alignment',
      description: 'Test kesesuaian dengan kurikulum berbasis cinta',
      category: 'functionality',
      status: 'pending'
    },
    {
      id: 'performance-test',
      name: 'Performance Test',
      description: 'Test kecepatan dan responsivitas',
      category: 'performance',
      status: 'pending'
    },
    {
      id: 'security-test',
      name: 'Security Test',
      description: 'Test keamanan input dan data',
      category: 'security',
      status: 'pending'
    },
    {
      id: 'mobile-compatibility',
      name: 'Mobile Compatibility',
      description: 'Test kompatibilitas mobile',
      category: 'usability',
      status: 'pending'
    },
    {
      id: 'accessibility-test',
      name: 'Accessibility Test',
      description: 'Test aksesibilitas untuk semua user',
      category: 'usability',
      status: 'pending'
    }
  ]);

  const [userFeedback, setUserFeedback] = useState<UserFeedback>({
    name: '',
    email: '',
    role: '',
    overallRating: 0,
    comments: '',
    recommendations: '',
    bugsFound: '',
    featuresRequested: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<UserFeedback[]>([]);

  const updateTestStatus = (testId: string, status: 'passed' | 'failed' | 'needs-improvement', feedback?: string, rating?: number) => {
    setUatTests(prev => 
      prev.map(test => 
        test.id === testId ? { ...test, status, feedback, rating } : test
      )
    );
  };

  const getStatusIcon = (status: 'pending' | 'passed' | 'failed' | 'needs-improvement') => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'needs-improvement':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: 'pending' | 'passed' | 'failed' | 'needs-improvement') => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'needs-improvement':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'usability':
        return 'bg-blue-100 text-blue-800';
      case 'functionality':
        return 'bg-green-100 text-green-800';
      case 'performance':
        return 'bg-purple-100 text-purple-800';
      case 'security':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitFeedback = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmittedFeedback(prev => [...prev, userFeedback]);
    setUserFeedback({
      name: '',
      email: '',
      role: '',
      overallRating: 0,
      comments: '',
      recommendations: '',
      bugsFound: '',
      featuresRequested: ''
    });
    
    setIsSubmitting(false);
  };

  const completedTests = uatTests.filter(t => t.status !== 'pending').length;
  const progressPercentage = (completedTests / uatTests.length) * 100;

  const averageRating = submittedFeedback.length > 0 
    ? submittedFeedback.reduce((sum, feedback) => sum + feedback.overallRating, 0) / submittedFeedback.length 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            User Acceptance
            <span className="block text-primary">Testing</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Final validation dengan user untuk memastikan aplikasi siap untuk production
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Testing Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {uatTests.filter(t => t.status === 'passed').length}
                </div>
                <div className="text-sm text-green-600">Passed</div>
              </div>
              <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {uatTests.filter(t => t.status === 'failed').length}
                </div>
                <div className="text-sm text-red-600">Failed</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {uatTests.filter(t => t.status === 'needs-improvement').length}
                </div>
                <div className="text-sm text-yellow-600">Needs Improvement</div>
              </div>
              <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {submittedFeedback.length}
                </div>
                <div className="text-sm text-blue-600">Feedback Received</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress: {completedTests}/{uatTests.length} tests</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {submittedFeedback.length > 0 && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Star className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">
                  Average Rating: {averageRating.toFixed(1)}/5 ({submittedFeedback.length} feedbacks)
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* UAT Tests */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {uatTests.map((test) => (
            <Card key={test.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <CardTitle className="text-lg">{test.name}</CardTitle>
                      <CardDescription>{test.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(test.category)}>
                    {test.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(test.status)}>
                    {test.status.toUpperCase()}
                  </Badge>
                  {test.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{test.rating}/5</span>
                    </div>
                  )}
                </div>

                {test.feedback && (
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Feedback:</h4>
                    <p className="text-sm text-muted-foreground">{test.feedback}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateTestStatus(test.id, 'passed', 'Test passed successfully', 5)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Pass
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateTestStatus(test.id, 'needs-improvement', 'Minor issues found', 3)}
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Needs Improvement
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateTestStatus(test.id, 'failed', 'Critical issues found', 1)}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Fail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Feedback Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              User Feedback Form
            </CardTitle>
            <CardDescription>
              Berikan feedback Anda untuk membantu meningkatkan aplikasi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input 
                  id="name"
                  value={userFeedback.name}
                  onChange={(e) => setUserFeedback({ ...userFeedback, name: e.target.value })}
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={userFeedback.email}
                  onChange={(e) => setUserFeedback({ ...userFeedback, email: e.target.value })}
                  placeholder="Masukkan email Anda"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Peran/Profesi</Label>
              <Input 
                id="role"
                value={userFeedback.role}
                onChange={(e) => setUserFeedback({ ...userFeedback, role: e.target.value })}
                placeholder="Contoh: Guru MI, Kepala Sekolah, dll"
              />
            </div>

            <div className="space-y-2">
              <Label>Rating Keseluruhan</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant={userFeedback.overallRating >= rating ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUserFeedback({ ...userFeedback, overallRating: rating })}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Komentar Umum</Label>
              <Textarea 
                id="comments"
                value={userFeedback.comments}
                onChange={(e) => setUserFeedback({ ...userFeedback, comments: e.target.value })}
                placeholder="Bagaimana pengalaman Anda menggunakan aplikasi ini?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recommendations">Rekomendasi Perbaikan</Label>
              <Textarea 
                id="recommendations"
                value={userFeedback.recommendations}
                onChange={(e) => setUserFeedback({ ...userFeedback, recommendations: e.target.value })}
                placeholder="Apa yang bisa diperbaiki dari aplikasi ini?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bugsFound">Bug yang Ditemukan</Label>
              <Textarea 
                id="bugsFound"
                value={userFeedback.bugsFound}
                onChange={(e) => setUserFeedback({ ...userFeedback, bugsFound: e.target.value })}
                placeholder="Apakah ada bug atau error yang Anda temukan?"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuresRequested">Fitur yang Diinginkan</Label>
              <Textarea 
                id="featuresRequested"
                value={userFeedback.featuresRequested}
                onChange={(e) => setUserFeedback({ ...userFeedback, featuresRequested: e.target.value })}
                placeholder="Fitur apa yang ingin Anda lihat di aplikasi ini?"
                rows={2}
              />
            </div>

            <Button 
              onClick={handleSubmitFeedback}
              disabled={isSubmitting || !userFeedback.name || !userFeedback.email}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Feedback
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Submitted Feedback */}
        {submittedFeedback.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Submitted Feedback ({submittedFeedback.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submittedFeedback.map((feedback, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{feedback.name}</h4>
                        <p className="text-sm text-muted-foreground">{feedback.role}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < feedback.overallRating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    {feedback.comments && (
                      <div className="mb-3">
                        <h5 className="font-medium text-sm mb-1">Comments:</h5>
                        <p className="text-sm text-muted-foreground">{feedback.comments}</p>
                      </div>
                    )}
                    
                    {feedback.recommendations && (
                      <div className="mb-3">
                        <h5 className="font-medium text-sm mb-1">Recommendations:</h5>
                        <p className="text-sm text-muted-foreground">{feedback.recommendations}</p>
                      </div>
                    )}
                    
                    {feedback.bugsFound && (
                      <div className="mb-3">
                        <h5 className="font-medium text-sm mb-1">Bugs Found:</h5>
                        <p className="text-sm text-muted-foreground">{feedback.bugsFound}</p>
                      </div>
                    )}
                    
                    {feedback.featuresRequested && (
                      <div>
                        <h5 className="font-medium text-sm mb-1">Features Requested:</h5>
                        <p className="text-sm text-muted-foreground">{feedback.featuresRequested}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserAcceptanceTest; 