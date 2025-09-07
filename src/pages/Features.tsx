// src/pages/Features.tsx
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Brain,
  MessageSquare,
  Route,
  Database,
  Shield,
  Clock,
  Languages,
  Search,
  Bell,
  CheckCircle,
  ArrowRight,
  Zap,
  Eye,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const coreFeatures = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Document Ingestion",
      description:
        "Automatically capture documents from all sources including email, SharePoint, Maximo, and direct uploads. No manual intervention required.",
      benefits: [
        "Connects to multiple data sources",
        "Real-time document capture",
        "Automatic format recognition",
        "Bulk processing capabilities",
      ],
      color: "text-blue-500",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Understanding",
      description:
        "Advanced natural language processing that understands context, extracts key information, and classifies documents with 95%+ accuracy.",
      benefits: [
        "Intelligent content analysis",
        "Context-aware classification",
        "Key information extraction",
        "Continuous learning improvement",
      ],
      color: "text-purple-500",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Auto-Summarization",
      description:
        "Generate role-specific summaries and insights automatically. Get the information you need without reading entire documents.",
      benefits: [
        "Executive summaries",
        "Action item extraction",
        "Key point highlighting",
        "Multi-language support",
      ],
      color: "text-green-500",
    },
    {
      icon: <Route className="w-8 h-8" />,
      title: "Smart Document Routing",
      description:
        "Intelligently route documents to the right people based on content, urgency, and department workflows.",
      benefits: [
        "Automated workflow routing",
        "Priority-based distribution",
        "Role-based access control",
        "Escalation management",
      ],
      color: "text-orange-500",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Centralized Knowledge Management",
      description:
        "Create a searchable repository of institutional knowledge. Never lose important information again.",
      benefits: [
        "Full-text search capabilities",
        "Tag-based organization",
        "Version control",
        "Knowledge preservation",
      ],
      color: "text-indigo-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Compliance Tracking",
      description:
        "Never miss regulatory deadlines with automated compliance monitoring and alert systems.",
      benefits: [
        "Automated deadline tracking",
        "Regulatory calendar integration",
        "Risk assessment alerts",
        "Audit trail maintenance",
      ],
      color: "text-red-500",
    },
  ];

  const technicalFeatures = [
    {
      icon: <Languages className="w-6 h-6" />,
      title: "Bilingual Processing",
      description: "Native support for English and Malayalam text processing",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Advanced Search",
      description:
        "Powerful search with filters, tags, and semantic understanding",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Notifications",
      description:
        "Intelligent alerts based on priority, role, and preferences",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Processing",
      description: "Documents processed and available within minutes",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Document Preview",
      description: "Quick preview with AI-generated insights and summaries",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Role-based access, encryption, and audit logging",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="gradient-hero-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/20 text-white border-white/30 mb-4">
            AI-Powered Features
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Intelligent Document Management
            <span className="block text-3xl md:text-5xl mt-2 opacity-90">
              Built for KMRL
            </span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Transform your document workflows with cutting-edge AI technology
            designed specifically for metro operations and compliance
            requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              Try Free Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Watch Features Video
            </Button>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Core Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Six powerful capabilities that revolutionize how KMRL manages
              documents and information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="card-enterprise hover-lift">
                <div className={`${feature.color} mb-4`}>{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-16 gradient-subtle-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Technical Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced technical features that ensure reliability, security, and
              performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-medium transition-all duration-200"
              >
                <div className="text-primary mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Proven Performance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real metrics from KMRL's implementation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                95%
              </div>
              <div className="text-muted-foreground">
                Classification Accuracy
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-success mb-2">
                70%
              </div>
              <div className="text-muted-foreground">Time Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-warning mb-2">
                2min
              </div>
              <div className="text-muted-foreground">
                Average Processing Time
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-500 mb-2">
                24/7
              </div>
              <div className="text-muted-foreground">Automated Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 gradient-subtle-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Seamless Integration
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with your existing KMRL systems and workflows
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Database className="w-8 h-8 text-primary" />
              </div>
              <div className="font-semibold text-foreground">SharePoint</div>
              <div className="text-sm text-muted-foreground">
                Document Libraries
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-success" />
              </div>
              <div className="font-semibold text-foreground">Maximo</div>
              <div className="text-sm text-muted-foreground">
                Asset Management
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="w-8 h-8 text-warning" />
              </div>
              <div className="font-semibold text-foreground">SAP</div>
              <div className="text-sm text-muted-foreground">
                Enterprise Resource Planning
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-8 h-8 text-purple-500" />
              </div>
              <div className="font-semibold text-foreground">Email</div>
              <div className="text-sm text-muted-foreground">
                Outlook Integration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-enterprise">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Document Management?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              See how these features work together to streamline KMRL operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
