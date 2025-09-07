// src/components/dashboard/DashboardTabs.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./tabs/OverviewTab";
import { IngestionTab } from "./tabs/IngestionTab";
import { AIInsightsTab } from "./tabs/AIInsightsTab";
import { WorkflowTab } from "./tabs/WorkflowTab";
import { ComplianceTab } from "./tabs/ComplianceTab";
import type {
  IngestionStats,
  AIProcessingMetrics,
  LanguageStats,
  RecentSummary,
  WorkflowMetrics,
  RoutingRule,
  ComplianceStats,
  ComplianceItem,
} from "@/types/dashboard";

interface DashboardTabsProps {
  ingestionStats: IngestionStats;
  aiMetrics: AIProcessingMetrics;
  languageStats: LanguageStats;
  recentSummaries: RecentSummary[];
  workflowMetrics: WorkflowMetrics;
  routingRules: RoutingRule[];
  complianceStats: ComplianceStats;
  upcomingItems: ComplianceItem[];
  processingQueue: number;
}

export const DashboardTabs = ({
  ingestionStats,
  aiMetrics,
  languageStats,
  recentSummaries,
  workflowMetrics,
  routingRules,
  complianceStats,
  upcomingItems,
  processingQueue,
}: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="ingestion">Document Ingestion</TabsTrigger>
        <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
        <TabsTrigger value="workflow">Smart Routing</TabsTrigger>
        <TabsTrigger value="compliance">Compliance</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <OverviewTab
          workflowMetrics={workflowMetrics}
          processingQueue={processingQueue}
        />
      </TabsContent>

      <TabsContent value="ingestion">
        <IngestionTab ingestionStats={ingestionStats} />
      </TabsContent>

      <TabsContent value="ai-insights">
        <AIInsightsTab
          aiMetrics={aiMetrics}
          languageStats={languageStats}
          recentSummaries={recentSummaries}
        />
      </TabsContent>

      <TabsContent value="workflow">
        <WorkflowTab
          workflowMetrics={workflowMetrics}
          routingRules={routingRules}
        />
      </TabsContent>

      <TabsContent value="compliance">
        <ComplianceTab
          complianceStats={complianceStats}
          upcomingItems={upcomingItems}
        />
      </TabsContent>
    </Tabs>
  );
};
