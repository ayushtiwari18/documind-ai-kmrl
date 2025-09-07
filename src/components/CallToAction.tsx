import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="py-20 gradient-hero-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 border border-white rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Eliminate{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-green-200">
              Document Overload?
            </span>
          </h2>
          
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the digital transformation and make document management your competitive advantage. 
            Experience the power of AI-driven automation designed specifically for KMRL.
          </p>

          {/* Key Benefits Quick List */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center text-white">
              <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center text-white">
              <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center text-white">
              <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
              <span>Full training included</span>
            </div>
            <div className="flex items-center text-white">
              <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
              <span>24/7 support</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-green-50 font-bold px-10 py-5 rounded-xl shadow-strong hover:shadow-medium transition-all duration-300 hover:scale-105 group"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex items-center text-white">
              <Phone className="w-5 h-5 mr-2" />
              <span className="text-lg">Or call us at <strong>+91-484-XXX-XXXX</strong></span>
            </div>
          </div>

          <p className="text-green-200 text-sm">
            Implementation typically takes 2-3 weeks. We handle all the technical setup.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-scale-in">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-green-200 text-sm">Documents Processed Daily</div>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '100ms' }}>
            <div className="text-3xl font-bold text-white mb-2">99.9%</div>
            <div className="text-green-200 text-sm">System Uptime</div>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-green-200 text-sm">KMRL Departments</div>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '300ms' }}>
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-green-200 text-sm">AI Processing</div>
          </div>
        </div>
      </div>
    </section>
  );
};