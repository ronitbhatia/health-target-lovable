import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building, Target, Calendar, CheckCircle } from "lucide-react";

interface OnboardingFormProps {
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
}

export interface OnboardingData {
  company: string;
  industry: string;
  role: string;
  goals: string;
  conference: string;
  attendeeCount: string;
  budget: string;
}

export const OnboardingForm = ({ onComplete, onBack }: OnboardingFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    company: "",
    industry: "",
    role: "",
    goals: "",
    conference: "",
    attendeeCount: "",
    budget: ""
  });

  const handleInputChange = (field: keyof OnboardingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.company && formData.industry && formData.role;
      case 2:
        return formData.goals && formData.conference;
      case 3:
        return formData.attendeeCount && formData.budget;
      default:
        return false;
    }
  };

  const industries = [
    "Medical Devices",
    "Pharmaceuticals", 
    "Digital Health",
    "Healthcare IT",
    "Biotechnology",
    "Medical Software",
    "Healthcare Services",
    "Telehealth"
  ];

  const conferences = [
    "HIMSS 2024",
    "RSNA 2024", 
    "ASH Annual Conference",
    "ASCO Annual Meeting",
    "Healthcare IT Summit",
    "Digital Medicine Society",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-teal-50/30 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} of 3
            </span>
            <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
              ← Back to Home
            </Button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card className="shadow-card border-0 bg-gradient-card">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              {step === 1 && <Building className="w-8 h-8 text-white" />}
              {step === 2 && <Target className="w-8 h-8 text-white" />}
              {step === 3 && <Calendar className="w-8 h-8 text-white" />}
            </div>
            <CardTitle className="text-2xl">
              {step === 1 && "Tell Us About Your Company"}
              {step === 2 && "Define Your Conference Goals"}
              {step === 3 && "Conference Details"}
            </CardTitle>
            <CardDescription className="text-base">
              {step === 1 && "Help us understand your business and role"}
              {step === 2 && "What are you hoping to achieve at your next conference?"}
              {step === 3 && "Final details to optimize your targeting strategy"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    placeholder="e.g., Sales Director, Marketing Manager"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="goals">Conference Goals</Label>
                  <Textarea
                    id="goals"
                    placeholder="What are your main objectives? (e.g., generate leads, find partners, launch product)"
                    className="min-h-[100px]"
                    value={formData.goals}
                    onChange={(e) => handleInputChange("goals", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conference">Target Conference</Label>
                  <Select value={formData.conference} onValueChange={(value) => handleInputChange("conference", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your target conference" />
                    </SelectTrigger>
                    <SelectContent>
                      {conferences.map(conference => (
                        <SelectItem key={conference} value={conference}>{conference}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-healthcare-blue mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-healthcare-dark">Smart Targeting</p>
                      <p className="text-muted-foreground">We'll analyze attendee lists and suggest the highest-value prospects based on your goals.</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="attendeeCount">Expected Attendee Count</Label>
                  <Select value={formData.attendeeCount} onValueChange={(value) => handleInputChange("attendeeCount", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How many attendees are expected?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<1000">Less than 1,000</SelectItem>
                      <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
                      <SelectItem value="5000-10000">5,000 - 10,000</SelectItem>
                      <SelectItem value="10000+">10,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Meeting Target</Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How many meetings do you want to schedule?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-10">5-10 meetings</SelectItem>
                      <SelectItem value="10-20">10-20 meetings</SelectItem>
                      <SelectItem value="20-50">20-50 meetings</SelectItem>
                      <SelectItem value="50+">50+ meetings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-gradient-primary p-4 rounded-lg text-white">
                  <h4 className="font-semibold mb-2">🎯 Your Personalized Strategy</h4>
                  <div className="space-y-1 text-sm text-blue-100">
                    <p>• AI-powered prospect scoring for {formData.conference}</p>
                    <p>• Automated outreach templates for {formData.industry}</p>
                    <p>• Meeting scheduler integration</p>
                    <p>• Real-time ROI tracking dashboard</p>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="border-healthcare-blue text-healthcare-blue hover:bg-healthcare-blue hover:text-white"
              >
                {step === 1 ? "Back to Home" : "Previous"}
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-gradient-primary hover:opacity-90 disabled:opacity-50"
              >
                {step === 3 ? "Complete Setup" : "Next Step"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {step < 3 && (
          <div className="mt-6 text-center">
            <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                  {step > 1 ? "✓" : "1"}
                </Badge>
                <span>Company Info</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={step > 1 ? "default" : "secondary"} className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                  {step > 2 ? "✓" : "2"}
                </Badge>
                <span>Goals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={step > 2 ? "default" : "secondary"} className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                  3
                </Badge>
                <span>Details</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};