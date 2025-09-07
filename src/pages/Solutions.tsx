// src/pages/Solutions.tsx
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Wrench,
  DollarSign,
  Shield,
  CheckCircle,
  ArrowRight,
  BarChart3,
  FileText,
  Clock,
  AlertTriangle,
  TrendingUp,
  Search,
  Bell,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const Solutions = () => {
  const solutions = [
    {
      id: "managers",
      icon: <Users className="w-12 h-12" />,
      title: "For Managers",
      subtitle: "Executive Insights & Decision Making",
      description:
        "Get comprehensive overviews, performance metrics, and actionable insights to make informed decisions quickly.",
      color: "from-blue-500 to-blue-600",
      features: [
        {
          icon: <BarChart3 className="w-5 h-5" />,
          title: "Executive Dashboards",
          description:
            "Real-time metrics on document processing, team productivity, and system performance",
        },
        {
          icon: <FileText className="w-5 h-5" />,
          title: "Smart Summaries",
          description:
            "AI-generated executive summaries highlighting key points and required actions",
        },
        {
          icon: <TrendingUp className="w-5 h-5" />,
          title: "Performance Analytics",
          description:
            "Department-wise productivity metrics and improvement recommendations",
        },
        {
          icon: <Bell className="w-5 h-5" />,
          title: "Priority Alerts",
          description:
            "Immediate notifications for high-priority documents requiring executive attention",
        },
      ],
      benefits: [
        "70% faster decision-making process",
        "Complete visibility into document workflows",
        "Automated compliance reporting",
        "Risk identification and mitigation alerts",
      ],
      caseStudy: {
        title: "Operations Manager Success",
        metric: "50% reduction in meeting time",
        description:
          "By receiving AI-generated summaries, operations managers spend less time reviewing documents and more time on strategic decisions.",
      },
    },
    {
      id: "engineers",
      icon: <Wrench className="w-12 h-12" />,
      title: "For Engineers",
      subtitle: "Technical Documentation & Maintenance",
      description:
        "Streamlined access to technical documents, maintenance records, and engineering specifications.",
      color: "from-green-500 to-green-600",
      features: [
        {
          icon: <Search className="w-5 h-5" />,
          title: "Technical Search",
          description:
            "Find engineering drawings, specifications, and maintenance manuals instantly",
        },
        {
          icon: <FileText className="w-5 h-5" />,
          title: "Document Linking",
          description:
            "Automatically link related technical documents and revision histories",
        },
        {
          icon: <Clock className="w-5 h-5" />,
          title: "Maintenance Scheduling",
          description:
            "AI-powered maintenance reminders based on equipment documentation",
        },
        {
          icon: <Settings className="w-5 h-5" />,
          title: "Version Control",
          description:
            "Automatic tracking of document revisions and engineering change orders",
        },
      ],
      benefits: [
        "60% faster access to technical information",
        "Reduced equipment downtime",
        "Improved maintenance compliance",
        "Enhanced knowledge transfer",
      ],
      caseStudy: {
        title: "Maintenance Engineer Efficiency",
        metric: "40% faster troubleshooting",
        description:
          "Engineers can quickly access relevant maintenance history and technical specifications when addressing system issues.",
      },
    },
    {
      id: "finance",
      icon: <DollarSign className="w-12 h-12" />,
      title: "For Finance",
      subtitle: "Financial Document Processing & Compliance",
      description:
        "Automated invoice processing, expense tracking, and financial compliance management.",
      color: "from-yellow-500 to-yellow-600",
      features: [
        {
          icon: <FileText className="w-5 h-5" />,
          title: "Invoice Automation",
          description:
            "Automatic extraction of invoice data with vendor matching and approval routing",
        },
        {
          icon: <BarChart3 className="w-5 h-5" />,
          title: "Expense Analytics",
          description:
            "Real-time spending analysis and budget tracking with automated alerts",
        },
        {
          icon: <Shield className="w-5 h-5" />,
          title: "Audit Trail",
          description:
            "Complete documentation trail for regulatory compliance and auditing",
        },
        {
          icon: <Clock className="w-5 h-5" />,
          title: "Payment Processing",
          description:
            "Streamlined approval workflows reducing payment processing time",
        },
      ],
      benefits: [
        "80% faster invoice processing",
        "Reduced manual data entry errors",
        "Improved cash flow management",
        "Enhanced audit readiness",
      ],
      caseStudy: {
        title: "Finance Department Transformation",
        metric: "3 days to 3 hours",
        description:
          "Monthly financial reporting preparation time reduced from 3 days to 3 hours through automated document processing.",
      },
    },
    {
      id: "compliance",
      icon: <Shield className="w-12 h-12" />,
      title: "For Compliance",
      subtitle: "Regulatory Management & Risk Assessment",
      description:
        "Comprehensive compliance tracking, regulatory reporting, and risk management automation.",
      color: "from-red-500 to-red-600",
      features: [
        {
          icon: <AlertTriangle className="w-5 h-5" />,
          title: "Risk Assessment",
          description:
            "AI-powered identification of compliance risks and regulatory requirements",
        },
        {
          icon: <Clock className="w-5 h-5" />,
          title: "Deadline Tracking",
          description:
            "Automated monitoring of regulatory deadlines with escalation protocols",
        },
        {
          icon: <FileText className="w-5 h-5" />,
          title: "Report Generation",
          description:
            "Automated compliance report generation with required documentation",
        },
        {
          icon: <BarChart3 className="w-5 h-5" />,
          title: "Compliance Metrics",
          description:
            "Real-time compliance score tracking and improvement recommendations",
        },
      ],
      benefits: [
        "95% automated deadline tracking",
        "Zero missed regulatory submissions",
        "Comprehensive audit documentation",
        "Proactive risk identification",
      ],
      caseStudy: {
        title: "Regulatory Compliance Success",
        metric: "100% on-time submissions",
        description:
          "Complete elimination of missed regulatory deadlines through automated tracking and intelligent alert systems.",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="gradient-hero-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/20 text-white border-white/30 mb-4">
            Role-Based Solutions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Solutions Tailored
            <span className="block text-3xl md:text-5xl mt-2 opacity-90">
              For Every Role at KMRL
            </span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Discover how our intelligent document management system addresses
            the unique challenges faced by different teams within KMRL.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
            Explore Solutions
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                className={`${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                } lg:flex items-center gap-12`}
              >
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${solution.color} rounded-2xl text-white mb-6`}
                  >
                    {solution.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {solution.title}
                  </h2>
                  <h3 className="text-xl text-muted-foreground mb-4">
                    {solution.subtitle}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {solution.description}
                  </p>

                  {/* Key Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">
                      Key Benefits:
                    </h4>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Case Study */}
                  <div className="card-dashboard p-4 mb-6">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-5 h-5 text-success mr-2" />
                      <span className="font-semibold text-foreground">
                        {solution.caseStudy.title}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">
                      {solution.caseStudy.metric}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {solution.caseStudy.description}
                    </p>
                  </div>

                  <Button className="btn-success">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="lg:w-1/2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="card-enterprise">
                        <div className="text-primary mb-3">{feature.icon}</div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 gradient-subtle-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Unified Solution Architecture
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All solutions work together seamlessly, providing a comprehensive
              document management ecosystem for KMRL
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Management Layer
              </h3>
              <p className="text-sm text-muted-foreground">
                Strategic oversight and decision-making support
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Operations Layer
              </h3>
              <p className="text-sm text-muted-foreground">
                Day-to-day technical operations and maintenance
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Financial Layer
              </h3>
              <p className="text-sm text-muted-foreground">
                Budget management and financial control
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Compliance Layer
              </h3>
              <p className="text-sm text-muted-foreground">
                Regulatory adherence and risk management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-enterprise">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Department?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              See how our role-based solutions can address your specific
              challenges and improve your team's productivity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero" size="lg">
                Request Custom Demo
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Speak with Specialist</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
