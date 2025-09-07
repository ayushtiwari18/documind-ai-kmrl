import { Button } from "@/components/ui/button";
import { FileText, Clock, Network, AlertTriangle, Play } from "lucide-react";
import heroImage from "@/assets/hero-document-management.jpg";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="gradient-hero-bg relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-white animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Transform Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-green-200">
                  Document Management
                </span>
              </h1>
              <h2 className="text-xl lg:text-2xl text-green-100 mb-8 font-light">
                AI-Powered Solutions for KMRL
              </h2>
              <p className="text-lg text-green-50 mb-10 leading-relaxed max-w-lg">
                Eliminate document overload, boost productivity, and ensure compliance with intelligent automation. 
                Built specifically for Kochi Metro Rail's operational excellence.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-white text-primary hover:bg-green-50 font-semibold px-8 py-4 rounded-xl shadow-strong hover:shadow-medium transition-all duration-300 hover:scale-105">
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-medium px-8 py-4 rounded-xl transition-all duration-300 group"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:text-primary" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative animate-slide-up">
              <div className="relative rounded-2xl overflow-hidden shadow-strong">
                <img 
                  src={heroImage} 
                  alt="KMRL Document Management Transformation - Before and After"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 gradient-subtle-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              The Document Challenge KMRL Faces Daily
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Managing thousands of documents across multiple departments creates bottlenecks, 
              compliance risks, and lost productivity. Our AI solution transforms chaos into order.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-enterprise text-center hover-lift animate-scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">1000+</h3>
              <p className="text-muted-foreground font-medium">Documents Daily</p>
              <p className="text-sm text-muted-foreground mt-2">
                Across all departments and communication channels
              </p>
            </div>

            <div className="card-enterprise text-center hover-lift animate-scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-warning to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">5+</h3>
              <p className="text-muted-foreground font-medium">Hours Wasted</p>
              <p className="text-sm text-muted-foreground mt-2">
                Daily on manual document processing tasks
              </p>
            </div>

            <div className="card-enterprise text-center hover-lift animate-scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Network className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">10+</h3>
              <p className="text-muted-foreground font-medium">Multiple Channels</p>
              <p className="text-sm text-muted-foreground mt-2">
                Email, SharePoint, Maximo, and physical documents
              </p>
            </div>

            <div className="card-enterprise text-center hover-lift animate-scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-destructive to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">HIGH</h3>
              <p className="text-muted-foreground font-medium">Compliance Risks</p>
              <p className="text-sm text-muted-foreground mt-2">
                Missing deadlines and regulatory requirements
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};