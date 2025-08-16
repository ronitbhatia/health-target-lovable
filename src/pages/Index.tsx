import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { OnboardingForm, OnboardingData } from "@/components/OnboardingForm";
import { Dashboard } from "@/components/Dashboard";

type AppState = "landing" | "onboarding" | "dashboard";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [userData, setUserData] = useState<OnboardingData | null>(null);

  const handleGetStarted = () => {
    setCurrentState("onboarding");
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserData(data);
    setCurrentState("dashboard");
  };

  const handleBackToLanding = () => {
    setCurrentState("landing");
    setUserData(null);
  };

  const handleBackToOnboarding = () => {
    setCurrentState("onboarding");
  };

  if (currentState === "landing") {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentState === "onboarding") {
    return (
      <OnboardingForm 
        onComplete={handleOnboardingComplete}
        onBack={handleBackToLanding}
      />
    );
  }

  if (currentState === "dashboard" && userData) {
    return (
      <Dashboard 
        userData={userData}
        onBack={handleBackToOnboarding}
      />
    );
  }

  // Fallback
  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Index;
