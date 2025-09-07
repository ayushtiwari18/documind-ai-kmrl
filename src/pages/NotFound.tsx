import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* KMRL DocuMind Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Error Icon */}
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 text-muted-foreground" />
        </div>

        {/* Error Content */}
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button className="btn-hero w-full" asChild>
            <a href="/">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </a>
          </Button>
          
          <Button variant="outline" className="w-full" asChild>
            <a href="/dashboard">
              Go to Dashboard
            </a>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          If you believe this is an error, please <a href="/contact" className="text-primary hover:underline">contact our support team</a>.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
