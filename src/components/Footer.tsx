import { FileText, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <div className="text-lg font-bold text-foreground">KMRL DocuMind</div>
                <div className="text-xs text-muted-foreground">Intelligent Document Management</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              AI-powered document management system designed specifically for Kochi Metro Rail Limited's operational excellence and compliance requirements.
            </p>
            <div className="text-sm text-muted-foreground">
              © 2024 KMRL DocuMind. All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-muted-foreground hover:text-primary transition-colors">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Resources */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/training" className="text-muted-foreground hover:text-primary transition-colors">
                  Training
                </a>
              </li>
              <li>
                <a href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-muted-foreground text-sm">
                  Kochi Metro Rail Limited<br />
                  Metro Bhavan, Kalamassery<br />
                  Kochi, Kerala 683104
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-3" />
                <span className="text-muted-foreground text-sm">+91-484-XXX-XXXX</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-3" />
                <span className="text-muted-foreground text-sm">support@kochimetro-docusystem.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            Built with ❤️ for KMRL's Digital Transformation Initiative
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="https://kochimetro.org" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
              KMRL Official Site
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};