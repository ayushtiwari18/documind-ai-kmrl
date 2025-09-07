import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { 
  Brain, 
  Shield, 
  Zap, 
  Users, 
  Database, 
  Languages,
  Lock,
  Network,
  CheckCircle,
  Target,
  Lightbulb
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Target className="h-4 w-4" />
            About DocuMind AI
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Empowering KMRL's 
            <span className="text-gradient"> Digital Transformation</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing document management for Kochi Metro Rail Limited through 
            cutting-edge AI technology, ensuring operational excellence and regulatory compliance 
            in every process.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                To transform KMRL's document-heavy operations into a streamlined, intelligent system 
                that eliminates manual bottlenecks, ensures 100% compliance, and preserves institutional 
                knowledge for future generations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that every document contains valuable insights, and our AI-powered platform 
                ensures no critical information is ever lost in the complexity of daily operations.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 text-center">
                <Lightbulb className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Vision 2030</h3>
                <p className="text-muted-foreground">
                  Making KMRL the most digitally advanced metro system in India
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem & Solution Story */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Challenge We Solved</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding KMRL's unique challenges led us to create a tailored solution
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <div className="bg-destructive/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle className="text-lg">The Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 1000+ documents processed daily</li>
                  <li>• 5+ hours wasted on manual sorting</li>
                  <li>• Multiple disconnected systems</li>
                  <li>• Compliance deadline misses</li>
                  <li>• Lost institutional knowledge</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover border-primary/20">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Our Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• AI-powered document classification</li>
                  <li>• Bilingual processing (English/Malayalam)</li>
                  <li>• Automated routing and alerts</li>
                  <li>• Real-time compliance tracking</li>
                  <li>• Centralized knowledge repository</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover border-accent/20">
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Impact Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 70% faster document processing</li>
                  <li>• 95% automated deadline tracking</li>
                  <li>• 100% institutional memory preservation</li>
                  <li>• 60% reduction in compliance risks</li>
                  <li>• 80% improvement in searchability</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technology Overview */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with enterprise-grade technology for reliability and scalability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Capabilities</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Natural Language Processing</li>
                <li>Bilingual Support (EN/ML)</li>
                <li>Automated Classification</li>
                <li>Smart Summarization</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Security Features</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>End-to-end Encryption</li>
                <li>Role-based Access Control</li>
                <li>Comprehensive Audit Trails</li>
                <li>SOC 2 Compliance</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Network className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integration</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>SAP Integration</li>
                <li>Maximo Connectivity</li>
                <li>SharePoint Sync</li>
                <li>Email Processing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collaborative effort between AI experts and KMRL domain specialists
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover text-center">
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Development Team</CardTitle>
                <CardDescription>AI & Software Engineering Experts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Specialized team with expertise in machine learning, natural language processing, 
                  and enterprise software development.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">AI/ML</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Python</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover text-center">
              <CardHeader>
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>KMRL Collaboration</CardTitle>
                <CardDescription>Domain Experts & Stakeholders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Working closely with KMRL's operations, compliance, and IT teams to ensure 
                  the solution meets real-world requirements.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Operations</Badge>
                  <Badge variant="secondary">Compliance</Badge>
                  <Badge variant="secondary">IT</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover text-center">
              <CardHeader>
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle>Support Team</CardTitle>
                <CardDescription>24/7 Technical Support</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Dedicated support specialists ensuring smooth operations and continuous 
                  system improvements based on user feedback.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">24/7 Support</Badge>
                  <Badge variant="secondary">Training</Badge>
                  <Badge variant="secondary">Maintenance</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Operations?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join KMRL's digital transformation journey and experience the power of intelligent document management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all hover:scale-105"
            >
              <Users className="h-5 w-5" />
              Get Started Today
            </a>
            <a 
              href="/dashboard" 
              className="btn-secondary inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all hover:scale-105"
            >
              <Database className="h-5 w-5" />
              View Demo
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;