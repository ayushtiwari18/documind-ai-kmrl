// src/components/dashboard/tabs/AIInsightsTab.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Languages,
  BarChart3,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Zap,
  RefreshCw,
  Activity,
  FileText,
  Clock,
  Sparkles,
  Eye,
  Download,
} from "lucide-react";

interface AIInsightsTabProps {
  aiMetrics: {
    classificationAccuracy: number;
    languageDetection: number;
    entityExtraction: number;
    sentimentAnalysis: number;
  };
  languageStats: {
    englishCount: number;
    malayalamCount: number;
    mixedCount: number;
    translationAccuracy: number;
  };
  recentSummaries: Array<{
    id: string;
    title: string;
    summary: string;
    confidence: number;
    generatedAt: string;
    category: string;
  }>;
}

export const AIInsightsTab = ({
  aiMetrics: initialAIMetrics,
  languageStats: initialLanguageStats,
  recentSummaries: initialSummaries,
}: AIInsightsTabProps) => {
  // State for dynamic updates
  const [aiMetrics, setAIMetrics] = useState(initialAIMetrics);
  const [languageStats, setLanguageStats] = useState(initialLanguageStats);
  const [recentSummaries, setRecentSummaries] = useState(initialSummaries);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [processingCount, setProcessingCount] = useState(314);
  const [avgProcessingTime, setAvgProcessingTime] = useState(2.3);
  const [successRate, setSuccessRate] = useState(99.2);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small fluctuations in metrics
      setAIMetrics((prev) => ({
        classificationAccuracy: Math.min(
          100,
          prev.classificationAccuracy + (Math.random() - 0.5) * 0.2
        ),
        languageDetection: Math.min(
          100,
          prev.languageDetection + (Math.random() - 0.5) * 0.1
        ),
        entityExtraction: Math.min(
          100,
          prev.entityExtraction + (Math.random() - 0.5) * 0.3
        ),
        sentimentAnalysis: Math.min(
          100,
          prev.sentimentAnalysis + (Math.random() - 0.5) * 0.4
        ),
      }));

      // Update processing statistics
      setProcessingCount((prev) => prev + Math.floor(Math.random() * 3));
      setAvgProcessingTime((prev) =>
        Math.max(1.0, prev + (Math.random() - 0.5) * 0.1)
      );
      setSuccessRate((prev) =>
        Math.min(100, Math.max(95, prev + (Math.random() - 0.5) * 0.1))
      );

      // Update language stats occasionally
      if (Math.random() < 0.3) {
        setLanguageStats((prev) => ({
          ...prev,
          englishCount: prev.englishCount + Math.floor(Math.random() * 2),
          malayalamCount: prev.malayalamCount + (Math.random() < 0.3 ? 1 : 0),
          mixedCount: prev.mixedCount + (Math.random() < 0.2 ? 1 : 0),
        }));
      }

      setLastUpdated(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate adding new AI summaries
  useEffect(() => {
    const summaryInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        // 10% chance every 5 seconds
        const newSummary = {
          id: `summary_${Date.now()}`,
          title: getRandomSummaryTitle(),
          summary: getRandomSummaryContent(),
          confidence: Math.floor(Math.random() * 10) + 90, // 90-100%
          generatedAt: new Date().toISOString(),
          category: getRandomCategory(),
        };

        setRecentSummaries((prev) => [newSummary, ...prev.slice(0, 4)]);
      }
    }, 5000);

    return () => clearInterval(summaryInterval);
  }, []);

  // Mock data generators
  const getRandomSummaryTitle = () => {
    const titles = [
      "Platform Safety Inspection - Station 5",
      "Electrical Systems Maintenance Report",
      "Passenger Flow Analysis - Peak Hours",
      "Security Protocol Update - Line 2",
      "Equipment Status Monitoring Alert",
      "Environmental Compliance Check",
      "Staff Training Completion Report",
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomSummaryContent = () => {
    const contents = [
      "Key findings include equipment status updates and maintenance recommendations. Priority actions identified for next week.",
      "System performance analysis shows optimal operation levels. Minor adjustments recommended for efficiency improvements.",
      "Monthly review indicates compliance with all safety standards. Additional training scheduled for new protocols.",
      "Operational metrics demonstrate strong performance indicators. Suggested enhancements for passenger experience.",
      "Infrastructure assessment reveals maintenance requirements. Scheduled interventions planned for minimal disruption.",
    ];
    return contents[Math.floor(Math.random() * contents.length)];
  };

  const getRandomCategory = () => {
    const categories = [
      "Safety Report",
      "Engineering Report",
      "Operations Update",
      "Maintenance Alert",
      "Compliance Document",
      "Performance Analysis",
    ];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update all metrics with slight improvements
    setAIMetrics((prev) => ({
      classificationAccuracy: Math.min(
        100,
        prev.classificationAccuracy + Math.random() * 0.5
      ),
      languageDetection: Math.min(
        100,
        prev.languageDetection + Math.random() * 0.3
      ),
      entityExtraction: Math.min(
        100,
        prev.entityExtraction + Math.random() * 0.4
      ),
      sentimentAnalysis: Math.min(
        100,
        prev.sentimentAnalysis + Math.random() * 0.6
      ),
    }));

    setIsRefreshing(false);
    setLastUpdated(new Date());
  };

  const getMetricIcon = (value: number) => {
    if (value >= 95) return <CheckCircle className="w-4 h-4 text-success" />;
    if (value >= 90) return <Activity className="w-4 h-4 text-primary" />;
    return <AlertCircle className="w-4 h-4 text-warning" />;
  };

  const getMetricColor = (value: number) => {
    if (value >= 95) return "text-success";
    if (value >= 90) return "text-primary";
    return "text-warning";
  };

  return (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-foreground">
            AI Intelligence Hub
          </h2>
          <Badge className="bg-purple-100 text-purple-800">Live</Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* AI Processing Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-enterprise hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Brain className="w-5 h-5 text-purple-600 mr-2" />
                AI Processing Metrics
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-success">Live</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(aiMetrics).map(([metric, value]) => (
              <div key={metric} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm capitalize font-medium">
                    {metric.replace(/([A-Z])/g, " $1")}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm font-bold ${getMetricColor(value)}`}
                    >
                      {value.toFixed(1)}%
                    </span>
                    {getMetricIcon(value)}
                  </div>
                </div>
                <Progress
                  value={value}
                  className="h-2 transition-all duration-500"
                />
                <div className="text-xs text-muted-foreground">
                  Target: 90% • Status:{" "}
                  {value >= 95
                    ? "Excellent"
                    : value >= 90
                    ? "Good"
                    : "Needs Attention"}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Overall Performance
                </span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-success font-medium">Excellent</span>
                  <Badge className="bg-success/10 text-success text-xs">
                    +2.1%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enterprise hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Languages className="w-5 h-5 text-green-600 mr-2" />
              Bilingual Processing Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">English Only</span>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-blue-600">
                    {languageStats.englishCount}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(
                      (languageStats.englishCount /
                        (languageStats.englishCount +
                          languageStats.malayalamCount +
                          languageStats.mixedCount)) *
                        100
                    )}
                    %
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Malayalam Only</span>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-600">
                    {languageStats.malayalamCount}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    മലയാളം
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Mixed Language</span>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-purple-600">
                    {languageStats.mixedCount}
                  </span>
                  <Badge className="bg-purple-100 text-purple-800 text-xs">
                    Bi-lingual
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Translation Accuracy
                  </span>
                  <span className="text-lg font-bold text-success">
                    {languageStats.translationAccuracy}%
                  </span>
                </div>
                <Progress
                  value={languageStats.translationAccuracy}
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent AI-Generated Summaries */}
      <Card className="card-enterprise">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="w-5 h-5 text-yellow-600 mr-2" />
              Recent AI-Generated Summaries
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-yellow-100 text-yellow-800">
                {recentSummaries.length} today
              </Badge>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                View All
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSummaries.slice(0, 3).map((summary, index) => (
              <div
                key={summary.id}
                className={`p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300 ${
                  index === 0 ? "ring-2 ring-blue-200 ring-opacity-50" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      {summary.category}
                    </Badge>
                    {index === 0 && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {summary.confidence}% confidence
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(summary.generatedAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <h4 className="font-semibold mb-2 text-foreground">
                  {summary.title}
                </h4>

                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {summary.summary}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Brain className="w-3 h-3 text-purple-600 mr-1" />
                      <span className="text-xs text-purple-600">
                        AI Generated
                      </span>
                    </div>
                    {summary.confidence >= 95 && (
                      <Badge
                        variant="outline"
                        className="text-xs text-success border-success"
                      >
                        High Confidence
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <FileText className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {recentSummaries.length === 0 && (
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No summaries yet
                </h3>
                <p className="text-muted-foreground">
                  AI summaries will appear here as documents are processed.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Performance Trends */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-dashboard text-center hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="w-6 h-6 text-primary mr-2" />
              <div className="text-2xl font-bold text-primary">
                {processingCount}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Documents Processed
            </div>
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className="w-3 h-3 text-success" />
              <div className="text-xs text-success">+23% from yesterday</div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-dashboard text-center hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-yellow-600 mr-2" />
              <div className="text-2xl font-bold text-yellow-600">
                {avgProcessingTime.toFixed(1)}s
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Avg Processing Time
            </div>
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className="w-3 h-3 text-success" />
              <div className="text-xs text-success">15% faster</div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-dashboard text-center hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 text-success mr-2" />
              <div className="text-2xl font-bold text-success">
                {successRate.toFixed(1)}%
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Success Rate
            </div>
            <div className="text-xs text-success">Exceeds target</div>
          </CardContent>
        </Card>
      </div>

      {/* Processing Status Footer */}
      <Card className="card-enterprise bg-gradient-to-r from-card to-muted/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Activity className="w-4 h-4 text-success mr-2 animate-pulse" />
                <span className="text-sm text-foreground">
                  AI System Status: Operational
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Queue: 3 documents • Response time: 1.2s
              </div>
            </div>
            <Badge className="bg-success/10 text-success">
              All systems running optimally
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
