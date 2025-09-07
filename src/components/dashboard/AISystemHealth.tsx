// src/components/dashboard/AISystemHealth.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  FileText,
  MessageSquare,
  Route,
  Database,
  Shield,
} from "lucide-react";

interface AISystemHealthProps {
  activeIngestionSources: number;
  aiAccuracy: number;
  summariesGenerated: number;
  autoRouted: number;
  knowledgeBase: string;
  complianceItems: number;
}

export const AISystemHealth = ({
  activeIngestionSources,
  aiAccuracy,
  summariesGenerated,
  autoRouted,
  knowledgeBase,
  complianceItems,
}: AISystemHealthProps) => {
  return (
    <div className="mb-8">
      <Card className="card-enterprise">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-6 h-6 text-purple-500 mr-2" />
            AI System Health & Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-sm font-medium">Multi-Channel</div>
              <div className="text-xs text-muted-foreground">
                Ingestion Active
              </div>
              <div className="text-lg font-bold text-success mt-1">
                {activeIngestionSources}/5
              </div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Brain className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-sm font-medium">AI Understanding</div>
              <div className="text-xs text-muted-foreground">Processing</div>
              <div className="text-lg font-bold text-primary mt-1">
                {aiAccuracy}%
              </div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <MessageSquare className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-sm font-medium">Summarization</div>
              <div className="text-xs text-muted-foreground">
                Auto-Generated
              </div>
              <div className="text-lg font-bold text-success mt-1">
                {summariesGenerated}
              </div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Route className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-sm font-medium">Smart Routing</div>
              <div className="text-xs text-muted-foreground">Auto-Routed</div>
              <div className="text-lg font-bold text-orange-500 mt-1">
                {autoRouted}
              </div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Database className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="text-sm font-medium">Knowledge Base</div>
              <div className="text-xs text-muted-foreground">Documents</div>
              <div className="text-lg font-bold text-indigo-500 mt-1">
                {knowledgeBase}
              </div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <div className="text-sm font-medium">Compliance</div>
              <div className="text-xs text-muted-foreground">Tracked Items</div>
              <div className="text-lg font-bold text-red-500 mt-1">
                {complianceItems}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
