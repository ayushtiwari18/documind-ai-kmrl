// src/components/dashboard/tabs/IngestionTab.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  Clock,
  Mail,
  Smartphone,
  Cloud,
  Settings,
  Upload,
  Activity,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Wifi,
  WifiOff,
  Play,
  Pause,
  RotateCcw,
  Database,
  FileText,
  Zap,
  Eye,
  BarChart3,
  Server,
  Globe,
  Shield,
  AlertCircle,
  CheckSquare,
} from "lucide-react";

type IngestionSourceStats = {
  count: number;
  status: "active" | "syncing" | "paused" | "error" | "offline";
  lastSync: string;
  totalToday?: number;
  successRate?: number;
  avgProcessingTime?: number;
  queueLength?: number;
  connectionHealth?: number;
};

type IngestionStats = {
  [source: string]: IngestionSourceStats;
};

interface IngestionTabProps {
  ingestionStats: IngestionStats;
}

interface RecentActivity {
  id: string;
  source: string;
  filename: string;
  timestamp: string;
  status: "success" | "processing" | "failed";
  size: string;
}

export const IngestionTab = ({
  ingestionStats: initialStats,
}: IngestionTabProps) => {
  // State for dynamic updates
  const [ingestionStats, setIngestionStats] = useState(() => {
    // Enhance initial stats with additional properties
    const enhanced = { ...initialStats };
    Object.keys(enhanced).forEach((source) => {
      enhanced[source] = {
        ...enhanced[source],
        totalToday: enhanced[source].count + Math.floor(Math.random() * 50),
        successRate: 95 + Math.random() * 4,
        avgProcessingTime: 1.5 + Math.random() * 2,
        queueLength: Math.floor(Math.random() * 5),
        connectionHealth: 85 + Math.random() * 15,
      };
    });
    return enhanced;
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [totalProcessed, setTotalProcessed] = useState(314);
  const [avgProcessingTime, setAvgProcessingTime] = useState(2.3);
  const [successRate, setSuccessRate] = useState(99.2);
  const [systemHealth, setSystemHealth] = useState(98.5);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setIngestionStats((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((source) => {
          const stats = updated[source];

          // Simulate document processing
          if (stats.status === "active" && Math.random() < 0.3) {
            stats.count += Math.floor(Math.random() * 3);
            stats.totalToday =
              (stats.totalToday || 0) + Math.floor(Math.random() * 3);

            // Add to recent activity
            if (Math.random() < 0.4) {
              const newActivity: RecentActivity = {
                id: `activity_${Date.now()}_${Math.random()}`,
                source,
                filename: getRandomFilename(source),
                timestamp: new Date().toISOString(),
                status: Math.random() < 0.95 ? "success" : "failed",
                size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
              };
              setRecentActivity((prev) => [newActivity, ...prev.slice(0, 9)]);
            }
          }

          // Simulate status changes
          if (Math.random() < 0.05) {
            const statuses: IngestionSourceStats["status"][] = [
              "active",
              "syncing",
              "paused",
            ];
            const currentIndex = statuses.indexOf(stats.status as any);
            if (currentIndex !== -1 && stats.status !== "syncing") {
              stats.status = "syncing";
              setTimeout(() => {
                setIngestionStats((current) => ({
                  ...current,
                  [source]: { ...current[source], status: "active" },
                }));
              }, 2000 + Math.random() * 3000);
            }
          }

          // Update last sync time for active sources
          if (stats.status === "active" && Math.random() < 0.4) {
            stats.lastSync = `${Math.floor(Math.random() * 5) + 1} min ago`;
          }

          // Fluctuate performance metrics
          stats.successRate = Math.max(
            90,
            Math.min(100, (stats.successRate || 95) + (Math.random() - 0.5) * 2)
          );
          stats.avgProcessingTime = Math.max(
            1,
            (stats.avgProcessingTime || 2) + (Math.random() - 0.5) * 0.3
          );
          stats.connectionHealth = Math.max(
            80,
            Math.min(
              100,
              (stats.connectionHealth || 95) + (Math.random() - 0.5) * 5
            )
          );
        });

        return updated;
      });

      // Update global metrics
      setTotalProcessed((prev) => prev + Math.floor(Math.random() * 3));
      setAvgProcessingTime((prev) =>
        Math.max(1.5, prev + (Math.random() - 0.5) * 0.1)
      );
      setSuccessRate((prev) =>
        Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 0.2))
      );
      setSystemHealth((prev) =>
        Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 0.5))
      );

      setLastUpdated(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-clear notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  // Helper functions
  const getRandomFilename = (source: string) => {
    const prefixes = {
      email: ["Invoice_", "Report_", "Memo_", "Contract_"],
      whatsapp: ["IMG_", "Document_", "Photo_", "File_"],
      sharepoint: ["Policy_", "Manual_", "Form_", "Guide_"],
      maximo: ["WorkOrder_", "Asset_", "Maintenance_", "Inspection_"],
      manual: ["Upload_", "Scan_", "Document_", "File_"],
    };

    const extensions = [".pdf", ".docx", ".xlsx", ".jpg", ".png"];
    const prefix = prefixes[source as keyof typeof prefixes] || ["File_"];
    const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
    const randomNum = Math.floor(Math.random() * 9999);
    const randomExt = extensions[Math.floor(Math.random() * extensions.length)];

    return `${randomPrefix}${randomNum}${randomExt}`;
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "email":
        return <Mail className="w-5 h-5 text-blue-500 mr-2" />;
      case "whatsapp":
        return <Smartphone className="w-5 h-5 text-green-500 mr-2" />;
      case "sharepoint":
        return <Cloud className="w-5 h-5 text-purple-500 mr-2" />;
      case "maximo":
        return <Settings className="w-5 h-5 text-orange-500 mr-2" />;
      case "manual":
        return <Upload className="w-5 h-5 text-indigo-500 mr-2" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500 mr-2" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "syncing":
        return <Clock className="w-4 h-4 text-warning animate-spin" />;
      case "paused":
        return <Pause className="w-4 h-4 text-gray-500" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "offline":
        return <WifiOff className="w-4 h-4 text-gray-500" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "status-success";
      case "syncing":
        return "status-warning";
      case "paused":
        return "bg-gray-100 text-gray-800";
      case "error":
        return "status-urgent";
      case "offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-secondary";
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setNotifications((prev) => [...prev, "🔄 Refreshing ingestion sources..."]);

    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Update all sources
    setIngestionStats((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((source) => {
        updated[source] = {
          ...updated[source],
          lastSync: "Just now",
          connectionHealth: 95 + Math.random() * 5,
        };
      });
      return updated;
    });

    setIsRefreshing(false);
    setLastUpdated(new Date());
    setNotifications((prev) => [
      ...prev,
      "✅ All sources refreshed successfully",
    ]);
  };

  const toggleSourceStatus = (source: string) => {
    setIngestionStats((prev) => ({
      ...prev,
      [source]: {
        ...prev[source],
        status: prev[source].status === "active" ? "paused" : "active",
      },
    }));

    const newStatus =
      ingestionStats[source].status === "active" ? "paused" : "active";
    setNotifications((prev) => [
      ...prev,
      `${source} ${newStatus === "active" ? "resumed" : "paused"}`,
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {notifications.length > 0 && (
        <Alert className="border-blue-200 bg-blue-50">
          <Activity className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">System Updates</AlertTitle>
          <AlertDescription className="text-blue-700">
            {notifications[0]}
          </AlertDescription>
        </Alert>
      )}

      {/* Header with System Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Document Ingestion Hub
          </h2>
          <Badge className="bg-primary/10 text-primary">
            <Wifi className="w-3 h-3 mr-1" />
            Live Monitoring
          </Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              System Health: {systemHealth.toFixed(1)}%
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated:{" "}
            {lastUpdated.toLocaleTimeString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Enhanced Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(ingestionStats).map(([source, stats]) => (
          <Card
            key={source}
            className="card-enterprise hover:shadow-lg transition-all duration-300 group"
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  {getSourceIcon(source)}
                  <span className="capitalize font-semibold">{source}</span>
                  {stats.connectionHealth && (
                    <div className="ml-2">
                      {stats.connectionHealth > 90 ? (
                        <Wifi className="w-4 h-4 text-success" />
                      ) : (
                        <Wifi className="w-4 h-4 text-warning" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(stats.status)}>
                    {stats.status}
                  </Badge>
                  {getStatusIcon(stats.status)}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Document Count */}
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stats.count}
                </div>
                <div className="text-sm text-muted-foreground">
                  Documents processed
                </div>
                {stats.totalToday && (
                  <div className="text-xs text-blue-600">
                    {stats.totalToday} total today
                  </div>
                )}
              </div>

              {/* Performance Metrics */}
              <div className="space-y-2">
                {stats.successRate && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Success Rate</span>
                      <span className="font-medium">
                        {stats.successRate.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={stats.successRate} className="h-1" />
                  </div>
                )}

                {stats.connectionHealth && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Connection Health</span>
                      <span className="font-medium">
                        {stats.connectionHealth.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={stats.connectionHealth} className="h-1" />
                  </div>
                )}
              </div>

              {/* Status Information */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last sync:</span>
                  <span className="font-medium">{stats.lastSync}</span>
                </div>

                {stats.avgProcessingTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Avg time:</span>
                    <span className="font-medium">
                      {stats.avgProcessingTime.toFixed(1)}s
                    </span>
                  </div>
                )}

                {stats.queueLength !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Queue:</span>
                    <span className="font-medium">
                      {stats.queueLength}{" "}
                      {stats.queueLength === 1 ? "item" : "items"}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedSource(source)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Details
                </Button>
                <Button
                  size="sm"
                  variant={
                    stats.status === "active" ? "destructive" : "default"
                  }
                  onClick={() => toggleSourceStatus(source)}
                  disabled={stats.status === "syncing"}
                >
                  {stats.status === "active" ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-enterprise">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 text-primary mr-2" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <FileText className="w-5 h-5 text-primary mr-2" />
                  <div className="text-2xl font-bold text-primary">
                    {totalProcessed}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  Total Documents
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-success" />
                  <div className="text-xs text-success">+23% today</div>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-5 h-5 text-yellow-600 mr-2" />
                  <div className="text-2xl font-bold text-yellow-600">
                    {avgProcessingTime.toFixed(1)}s
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  Avg Processing
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingDown className="w-3 h-3 text-success" />
                  <div className="text-xs text-success">15% faster</div>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckSquare className="w-5 h-5 text-success mr-2" />
                  <div className="text-2xl font-bold text-success">
                    {successRate.toFixed(1)}%
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  Success Rate
                </div>
                <div className="text-xs text-success">Exceeds target</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enterprise">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 text-green-600 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {recentActivity.length > 0 ? (
                recentActivity.slice(0, 5).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between text-xs py-1"
                  >
                    <div className="flex items-center space-x-2">
                      {getSourceIcon(activity.source)}
                      <span className="truncate max-w-32">
                        {activity.filename}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">
                        {activity.size}
                      </span>
                      {activity.status === "success" ? (
                        <CheckCircle className="w-3 h-3 text-success" />
                      ) : activity.status === "processing" ? (
                        <Clock className="w-3 h-3 text-warning animate-spin" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-destructive" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status Overview */}
      <Card className="card-enterprise bg-gradient-to-r from-card to-muted/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Server className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm">Ingestion Engine Status:</span>
                <Badge className="ml-2 status-success">Operational</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Processing:{" "}
                {recentActivity.filter((a) => a.status === "processing").length}{" "}
                items
              </div>
              <div className="text-sm text-muted-foreground">
                Queue:{" "}
                {Object.values(ingestionStats).reduce(
                  (sum, stats) => sum + (stats.queueLength || 0),
                  0
                )}{" "}
                pending
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-primary/10 text-primary">
                <Globe className="w-3 h-3 mr-1" />
                All Sources Connected
              </Badge>
              <Badge className="bg-success/10 text-success">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Source Detail Modal */}
      {selectedSource && (
        <Dialog
          open={!!selectedSource}
          onOpenChange={() => setSelectedSource(null)}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                {getSourceIcon(selectedSource)}
                <span className="capitalize">{selectedSource} Details</span>
              </DialogTitle>
              <DialogDescription>
                Detailed information and configuration for {selectedSource}{" "}
                ingestion
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {ingestionStats[selectedSource] && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Status</div>
                      <Badge
                        className={getStatusColor(
                          ingestionStats[selectedSource].status
                        )}
                      >
                        {ingestionStats[selectedSource].status}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        Connection Health
                      </div>
                      <div className="text-sm">
                        {ingestionStats[
                          selectedSource
                        ].connectionHealth?.toFixed(0)}
                        %
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">
                      Performance Metrics
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Documents Today:</span>
                        <span>{ingestionStats[selectedSource].totalToday}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Success Rate:</span>
                        <span>
                          {ingestionStats[selectedSource].successRate?.toFixed(
                            1
                          )}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Avg Processing:</span>
                        <span>
                          {ingestionStats[
                            selectedSource
                          ].avgProcessingTime?.toFixed(1)}
                          s
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Queue Length:</span>
                        <span>
                          {ingestionStats[selectedSource].queueLength} items
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium">Last Sync</div>
                    <div className="text-sm text-muted-foreground">
                      {ingestionStats[selectedSource].lastSync}
                    </div>
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedSource(null)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  toggleSourceStatus(selectedSource);
                  setSelectedSource(null);
                }}
              >
                {ingestionStats[selectedSource]?.status === "active"
                  ? "Pause"
                  : "Resume"}{" "}
                Source
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
