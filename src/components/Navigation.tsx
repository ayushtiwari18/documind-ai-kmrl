import { useState } from "react";
import { Menu, X, User, Bell, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavigationProps {
  isLoggedIn?: boolean;
  userRole?: string;
  notifications?: number;
}

export const Navigation = ({ isLoggedIn = false, userRole = "", notifications = 0 }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white font-bold" />
              </div>
              <div className="ml-3">
                <div className="text-lg font-bold text-foreground">KMRL DocuMind</div>
                <div className="text-xs text-muted-foreground">Intelligent Document Management</div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!isLoggedIn ? (
              <>
                <a href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                  Home
                </a>
                <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
                  Features
                </a>
                <a href="#solutions" className="text-foreground hover:text-primary transition-colors font-medium">
                  Solutions
                </a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                  About
                </a>
                <a href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
                  Contact
                </a>
              </>
            ) : (
              <>
                <a href="/dashboard" className="text-foreground hover:text-primary transition-colors font-medium">
                  Dashboard
                </a>
                <a href="/documents" className="text-foreground hover:text-primary transition-colors font-medium">
                  Documents
                </a>
                <a href="/analytics" className="text-foreground hover:text-primary transition-colors font-medium">
                  Analytics
                </a>
              </>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Login
                </Button>
                <Button className="btn-hero">
                  Get Started
                </Button>
              </>
            ) : (
              <>
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                  />
                </div>

                {/* Notifications */}
                <div className="relative">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <Badge variant="destructive" className="absolute -top-1 -right-1 px-1 min-w-5 h-5 text-xs flex items-center justify-center">
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-2">
                  <div className="text-right hidden lg:block">
                    <div className="text-sm font-medium text-foreground">Admin User</div>
                    <div className="text-xs text-muted-foreground">{userRole || "System Administrator"}</div>
                  </div>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="w-5 h-5" />
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card">
              {!isLoggedIn ? (
                <>
                  <a href="#features" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    Features
                  </a>
                  <a href="#solutions" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    Solutions
                  </a>
                  <a href="#about" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    About
                  </a>
                  <a href="#contact" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    Contact
                  </a>
                  <div className="pt-4 flex flex-col space-y-2">
                    <Button variant="ghost" className="text-foreground">
                      Login
                    </Button>
                    <Button className="btn-hero">
                      Get Started
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <a href="/dashboard" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    Dashboard
                  </a>
                  <a href="/documents" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    Documents
                  </a>
                  <a href="/analytics" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    Analytics
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};