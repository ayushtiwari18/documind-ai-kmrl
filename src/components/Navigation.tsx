import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

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
                <Link to="/" className={`transition-colors font-medium ${location.pathname === '/' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                  Home
                </Link>
                <Link to="/#features" className="text-foreground hover:text-primary transition-colors font-medium">
                  Features
                </Link>
                <Link to="/#solutions" className="text-foreground hover:text-primary transition-colors font-medium">
                  Solutions
                </Link>
                <Link to="/about" className={`transition-colors font-medium ${location.pathname === '/about' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                  About
                </Link>
                <Link to="/contact" className={`transition-colors font-medium ${location.pathname === '/contact' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                  Contact
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className={`transition-colors font-medium ${location.pathname === '/dashboard' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                  Dashboard
                </Link>
                <Link to="/documents" className="text-foreground hover:text-primary transition-colors font-medium">
                  Documents
                </Link>
                <Link to="/analytics" className={`transition-colors font-medium ${location.pathname === '/analytics' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                  Analytics
                </Link>
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
                  <Link to="/" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    Home
                  </Link>
                  <Link to="/#features" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    Features
                  </Link>
                  <Link to="/#solutions" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    Solutions
                  </Link>
                  <Link to="/about" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    About
                  </Link>
                  <Link to="/contact" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    Contact
                  </Link>
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
                  <Link to="/dashboard" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    Dashboard
                  </Link>
                  <Link to="/documents" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    Documents
                  </Link>
                  <Link to="/analytics" className="block px-3 py-2 text-foreground hover:bg-accent rounded-md">
                    Analytics
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};