import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, 
  Clock, 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

interface UsabilityTestingProps {
  onComplete: (feedback: UsabilityFeedback) => void;
  documentType: "RPP" | "LDP";
}

export interface UsabilityFeedback {
  easeOfUse: number;
  clarity: number;
  completeness: number;
  timeToComplete: number;
  satisfaction: number;
  issues: string[];
  suggestions: string[];
  wouldRecommend: boolean;
  difficultyAreas: string[];
  positiveAspects: string[];
}

export const UsabilityTesting: React.FC<UsabilityTestingProps> = ({
  onComplete,
  documentType,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState<UsabilityFeedback>({
    easeOfUse: 0,
    clarity: 0,
    completeness: 0,
    timeToComplete: 0,
    satisfaction: 0,
    issues: [],
    suggestions: [],
    wouldRecommend: false,
    difficultyAreas: [],
    positiveAspects: [],
  });

  const steps = [
    {
      id: 0,
      title: "Ease of Use",
      description: "How easy was it to use the application?",
      type: "rating",
      field: "easeOfUse"
    },
    {
      id: 1,
      title: "Clarity",
      description: "How clear were the instructions and interface?",
      type: "rating",
      field: "clarity"
    },
    {
      id: 2,
      title: "Completeness",
      description: "How complete was the generated document?",
      type: "rating",
      field: "completeness"
    },
    {
      id: 3,
      title: "Time to Complete",
      description: "How long did it take to complete the process?",
      type: "time",
      field: "timeToComplete"
    },
    {
      id: 4,
      title: "Satisfaction",
      description: "How satisfied are you with the overall experience?",
      type: "rating",
      field: "satisfaction"
    },
    {
      id: 5,
      title: "Issues & Suggestions",
      description: "What issues did you encounter and what suggestions do you have?",
      type: "text",
      field: "issues"
    },
    {
      id: 6,
      title: "Recommendation",
      description: "Would you recommend this application to other teachers?",
      type: "boolean",
      field: "wouldRecommend"
    },
    {
      id: 7,
      title: "Difficulty Areas",
      description: "Which areas were most difficult to use?",
      type: "multiSelect",
      field: "difficultyAreas"
    },
    {
      id: 8,
      title: "Positive Aspects",
      description: "What aspects did you find most helpful?",
      type: "multiSelect",
      field: "positiveAspects"
    }
  ];

  const difficultyOptions = [
    "Document type selection",
    "Love-based curriculum setup",
    "Form filling",
    "Content generation",
    "Export process",
    "Navigation",
    "Understanding instructions"
  ];

  const positiveOptions = [
    "Easy to use interface",
    "Clear instructions",
    "Comprehensive templates",
    "Love-based curriculum integration",
    "Export options",
    "Visual feedback",
    "Step-by-step guidance"
  ];

  const handleRatingChange = (value: number) => {
    const currentField = steps[currentStep].field as keyof UsabilityFeedback;
    setFeedback({ ...feedback, [currentField]: value });
  };

  const handleTextChange = (value: string) => {
    const currentField = steps[currentStep].field as keyof UsabilityFeedback;
    if (currentField === "issues") {
      setFeedback({ ...feedback, issues: [value] });
    } else if (currentField === "suggestions") {
      setFeedback({ ...feedback, suggestions: [value] });
    }
  };

  const handleMultiSelectChange = (value: string, checked: boolean) => {
    const currentField = steps[currentStep].field as keyof UsabilityFeedback;
    const currentArray = feedback[currentField] as string[];
    
    if (checked) {
      setFeedback({ ...feedback, [currentField]: [...currentArray, value] });
    } else {
      setFeedback({ ...feedback, [currentField]: currentArray.filter(item => item !== value) });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(feedback);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    const currentField = steps[currentStep].field as keyof UsabilityFeedback;
    const value = feedback[currentField];
    
    switch (steps[currentStep].type) {
      case "rating":
        return typeof value === "number" && value > 0;
      case "time":
        return typeof value === "number" && value > 0;
      case "text":
        return Array.isArray(value) && value.length > 0 && value[0].trim().length > 0;
      case "boolean":
        return typeof value === "boolean";
      case "multiSelect":
        return Array.isArray(value) && value.length > 0;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    const currentValue = feedback[step.field as keyof UsabilityFeedback];

    switch (step.type) {
      case "rating":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={currentValue === rating ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRatingChange(rating)}
                  className="w-12 h-12 rounded-full"
                >
                  {rating}
                </Button>
              ))}
            </div>
            <div className="text-center text-sm text-muted-foreground">
              {currentValue === 1 && "Very Poor"}
              {currentValue === 2 && "Poor"}
              {currentValue === 3 && "Average"}
              {currentValue === 4 && "Good"}
              {currentValue === 5 && "Excellent"}
            </div>
          </div>
        );

      case "time":
        return (
          <div className="space-y-4">
            <RadioGroup
              value={currentValue?.toString() || ""}
              onValueChange={(value) => handleRatingChange(parseInt(value))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="time-1" />
                <Label htmlFor="time-1">Less than 5 minutes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="time-2" />
                <Label htmlFor="time-2">5-10 minutes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="time-3" />
                <Label htmlFor="time-3">10-15 minutes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="time-4" />
                <Label htmlFor="time-4">15-30 minutes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="time-5" />
                <Label htmlFor="time-5">More than 30 minutes</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case "text":
        return (
          <div className="space-y-4">
            <Textarea
              placeholder="Please share your feedback..."
              value={Array.isArray(currentValue) ? currentValue[0] || "" : ""}
              onChange={(e) => handleTextChange(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        );

      case "boolean":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="true"
                  id="recommend-yes"
                  checked={currentValue === true}
                  onCheckedChange={() => setFeedback({ ...feedback, wouldRecommend: true })}
                />
                <Label htmlFor="recommend-yes">Yes, I would recommend</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="false"
                  id="recommend-no"
                  checked={currentValue === false}
                  onCheckedChange={() => setFeedback({ ...feedback, wouldRecommend: false })}
                />
                <Label htmlFor="recommend-no">No, I would not recommend</Label>
              </div>
            </div>
          </div>
        );

      case "multiSelect":
        const options = step.field === "difficultyAreas" ? difficultyOptions : positiveOptions;
        return (
          <div className="space-y-4">
            <div className="grid gap-3">
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={(currentValue as string[]).includes(option)}
                    onCheckedChange={(checked) => 
                      handleMultiSelectChange(option, checked as boolean)
                    }
                  />
                  <Label htmlFor={option} className="text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                Usability Testing
              </CardTitle>
              <CardDescription>
                Help us improve the application by providing your feedback
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              Step {currentStep + 1} of {steps.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {Math.round(progressPercentage)}% complete
              </span>
              <span className="text-muted-foreground">
                {currentStep + 1} of {steps.length} questions
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            {steps[currentStep].title}
          </CardTitle>
          <CardDescription>
            {steps[currentStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {currentStep === steps.length - 1 ? "Submit Feedback" : "Next"}
        </Button>
      </div>

      {/* Quick Summary */}
      {currentStep > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-green-600" />
              Feedback Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {feedback.easeOfUse > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Ease of Use:</span>
                  <Badge variant="outline">{feedback.easeOfUse}/5</Badge>
                </div>
              )}
              {feedback.clarity > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Clarity:</span>
                  <Badge variant="outline">{feedback.clarity}/5</Badge>
                </div>
              )}
              {feedback.completeness > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Completeness:</span>
                  <Badge variant="outline">{feedback.completeness}/5</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 