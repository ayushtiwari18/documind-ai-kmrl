import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, FileText, Users, BookOpen, AlertCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your document management? Our team is here to help you get started with KMRL DocuMind.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Main Contact Info */}
            <Card className="card-enterprise">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 text-primary mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Main Office</h3>
                    <p className="text-muted-foreground">
                      Kochi Metro Rail Limited<br />
                      Metro Bhavan, Kalamassery<br />
                      Kochi, Kerala 683104, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone Support</h3>
                    <p className="text-muted-foreground">
                      +91-484-XXX-XXXX<br />
                      <span className="text-sm">24/7 Technical Support</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email Support</h3>
                    <p className="text-muted-foreground">
                      support@kochimetro-docusystem.org<br />
                      <span className="text-sm">Response within 2 hours</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                      <span className="text-sm">Emergency support available 24/7</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Resources */}
            <Card className="card-enterprise">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 text-success mr-2" />
                  Support Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg hover:bg-accent/80 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium text-foreground">User Manual</div>
                      <div className="text-sm text-muted-foreground">Complete system documentation</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-accent rounded-lg hover:bg-accent/80 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-success mr-3" />
                    <div>
                      <div className="font-medium text-foreground">Training Sessions</div>
                      <div className="text-sm text-muted-foreground">Live and recorded tutorials</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Schedule</Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-accent rounded-lg hover:bg-accent/80 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-orange-600 mr-3" />
                    <div>
                      <div className="font-medium text-foreground">Emergency Support</div>
                      <div className="text-sm text-muted-foreground">Critical system issues</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Contact</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="card-enterprise">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <p className="text-muted-foreground">We'll respond within 24 hours during business days</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="your.email@kochimetro.org" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91-XXX-XXX-XXXX" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department/Organization</Label>
                  <Input id="department" placeholder="e.g., Engineering, Operations, Finance" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="sales">Sales & Pricing</SelectItem>
                      <SelectItem value="compliance">Compliance Questions</SelectItem>
                      <SelectItem value="training">Training & Onboarding</SelectItem>
                      <SelectItem value="integration">System Integration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your inquiry or how we can help you..."
                    className="min-h-32"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachment">Attachment (Optional)</Label>
                  <Input id="attachment" type="file" className="cursor-pointer" />
                  <p className="text-xs text-muted-foreground">
                    Screenshots or documents that might help us understand your inquiry
                  </p>
                </div>

                <Button className="w-full btn-hero">
                  Send Message
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Quick Response</h3>
            <p className="text-muted-foreground">
              We respond to all inquiries within 2 hours during business hours, and within 24 hours on weekends.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Expert Support</h3>
            <p className="text-muted-foreground">
              Our support team includes technical experts and KMRL domain specialists ready to assist you.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Comprehensive Training</h3>
            <p className="text-muted-foreground">
              Complete onboarding and training programs to ensure your team maximizes the system's potential.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;