// src/components/dashboard/DashboardFooter.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Bell, ExternalLink, Wifi } from "lucide-react";

interface DashboardFooterProps {
  recentSearches?: string[];
  systemStatus?: string;
  knowledgeBaseCount?: number;
  lastUpdated?: string;
}

export const DashboardFooter = ({
  recentSearches = [
    "platform safety protocols",
    "vendor payment procedures",
    "emergency response SOPs",
    "maintenance schedules",
  ],
  systemStatus = "All AI systems operational",
  knowledgeBaseCount = 12437,
  lastUpdated = "2 min ago",
}: DashboardFooterProps) => {
  return (
    <div className="mt-8 p-6 card-enterprise bg-gradient-to-r from-card to-muted/20">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side - Recent Searches */}
        <div className="mb-4 lg:mb-0">
          <div className="text-sm text-muted-foreground mb-2 flex items-center">
            <Database className="w-4 h-4 mr-1" />
            Recent AI-powered searches:
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>

        {/* Right Side - System Status & Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-2 lg:space-y-0">
          {/* System Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-muted-foreground flex items-center">
                <Wifi className="w-3 h-3 mr-1" />
                {systemStatus}
              </span>
            </div>

            <div className="flex items-center">
              <Database className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm text-muted-foreground">
                Knowledge base: {knowledgeBaseCount.toLocaleString()} docs
              </span>
            </div>
          </div>

          {/* Support & External Links */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
            >
              <Bell className="w-4 h-4 mr-1" />
              AI Support
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              asChild
            >
              <a href="/help" className="flex items-center">
                <ExternalLink className="w-4 h-4 mr-1" />
                Documentation
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="mt-4 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
        <div className="mb-2 sm:mb-0">
          Last system update: {lastUpdated} • Processing queue: 12 items •
          Response time: 1.2s
        </div>
        <div className="flex items-center space-x-4">
          <span>KMRL DocuMind v2.1.0</span>
          <Badge variant="outline" className="text-xs">
            Enterprise Edition
          </Badge>
        </div>
      </div>
    </div>
  );
};
