import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { SolutionFeatures, BenefitsSection } from "@/components/SolutionFeatures";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        {/* Hero Section with Problem Statement */}
        <HeroSection />
        
        {/* Solution Features Grid */}
        <SolutionFeatures />
        
        {/* Benefits Section */}
        <BenefitsSection />
        
        {/* Call to Action */}
        <CallToAction />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
