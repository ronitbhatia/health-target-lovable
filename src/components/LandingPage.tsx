import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Target, Calendar, BarChart3, Sparkles, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-conference.jpg";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Smart Attendee Profiling",
      description: "Auto-enrich contacts with LinkedIn data and healthcare CRM insights"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "AI-Powered Scoring", 
      description: "Prioritize prospects based on company size, fit, and buying intent"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Meeting Scheduler",
      description: "Integrate with Outlook/Google to pre-book meetings before conferences"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "ROI Analytics",
      description: "Track confirmed meetings vs outreach to measure event prep success"
    }
  ];

  const stats = [
    { value: "80%", label: "Higher Meeting Rate" },
    { value: "40%", label: "Time Saved on Outreach" },
    { value: "10+", label: "Meetings Per Rep" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-teal-50/30">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                HealthTarget
              </span>
            </div>
            <Button variant="outline" onClick={onGetStarted}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="lg:pr-8">
              <Badge className="mb-4 bg-gradient-primary text-white border-0">
                Healthcare Conference Targeting
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                Maximize Your
                <span className="bg-gradient-primary bg-clip-text text-transparent block">
                  Conference ROI
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Pre-identify high-value vendors & attendees, build customer profiles, 
                and schedule meetings before healthcare conferences. Turn networking into pipeline.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-healthcare-blue">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-glow"
                  onClick={onGetStarted}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Get Started Free
                  <ArrowRight className={`ml-2 w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </Button>
                <Button variant="outline" size="lg" className="border-healthcare-blue text-healthcare-blue hover:bg-healthcare-blue hover:text-white">
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Healthcare professionals networking at conference"
                  className="rounded-2xl shadow-card w-full h-auto"
                />
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-card border">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-8 h-8 text-success" />
                    <div>
                      <div className="font-semibold">12 Meetings Scheduled</div>
                      <div className="text-sm text-muted-foreground">Before HIMSS 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need to 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Win at Conferences</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From prospect identification to meeting scheduling, we've got your entire pre-conference workflow covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300 cursor-pointer border-0 bg-gradient-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Conference Strategy?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join sales teams already using HealthTarget to secure 10+ meetings before every healthcare conference.
          </p>
          <Button 
            size="lg"
            variant="secondary"
            className="bg-white text-healthcare-blue hover:bg-gray-50 shadow-lg"
            onClick={onGetStarted}
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};