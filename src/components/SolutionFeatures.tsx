import { Brain, FileCheck, Route, Database, Search, Shield } from "lucide-react";

export const SolutionFeatures = () => {
  const features = [
    {
      icon: FileCheck,
      title: "Smart Ingestion",
      description: "Automatically capture documents from all sources - email, SharePoint, Maximo, and physical scans",
      color: "from-primary to-blue-600"
    },
    {
      icon: Brain,
      title: "AI Understanding",
      description: "Intelligent classification and bilingual processing with Malayalam and English support",
      color: "from-success to-green-600"
    },
    {
      icon: FileCheck,
      title: "Auto Summarization",
      description: "Role-specific summaries and insights tailored for managers, engineers, and compliance teams",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Route,
      title: "Smart Routing",
      description: "Send the right information to the right people based on content, urgency, and department rules",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Database,
      title: "Knowledge Management",
      description: "Centralized, searchable repository with institutional memory preservation and quick retrieval",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: Shield,
      title: "Compliance Tracking",
      description: "Never miss regulatory deadlines with automated tracking, alerts, and audit trail maintenance",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our Intelligent Solution
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform document chaos into organized intelligence with AI-powered automation designed specifically for KMRL's operational needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-enterprise hover-lift animate-fade-in group" style={{ animationDelay: `${index * 100}ms` }}>
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const BenefitsSection = () => {
  return (
    <section className="py-20 gradient-subtle-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Transform Your Operations
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Measurable improvements in efficiency, compliance, and knowledge management that directly impact KMRL's bottom line.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Efficiency */}
          <div className="text-center animate-slide-up">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center mx-auto shadow-medium">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold">70%</div>
                  <div className="text-sm">Faster</div>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-background rounded-full border-4 border-primary"></div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Efficiency Boost</h3>
            <p className="text-muted-foreground leading-relaxed">
              Dramatically reduce document processing time with automated classification, intelligent routing, and AI-powered insights that eliminate manual searching and sorting.
            </p>
          </div>

          {/* Compliance */}
          <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-success to-success-hover rounded-full flex items-center justify-center mx-auto shadow-medium">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-sm">Automated</div>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-background rounded-full border-4 border-success"></div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Compliance Assurance</h3>
            <p className="text-muted-foreground leading-relaxed">
              Automated deadline tracking and regulatory compliance monitoring ensures KMRL never misses critical requirements, reducing risk and maintaining operational standards.
            </p>
          </div>

          {/* Knowledge */}
          <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-medium">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm">Preserved</div>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-background rounded-full border-4 border-purple-500"></div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Knowledge Preservation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Complete institutional memory preservation with intelligent search and retrieval ensures critical knowledge is never lost when employees transition or retire.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};