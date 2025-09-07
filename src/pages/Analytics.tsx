// src/pages/Analytics.tsx
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BarChart3,
  TrendingUp,
  FileText,
  Clock,
  Shield,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Target,
  Activity,
  Database,
  Zap,
  RefreshCw,
  Download,
  Filter,
  Search,
  Bell,
  Eye,
  Settings,
  PieChart,
  LineChart,
  Brain,
  Sparkles,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Mail,
  Smartphone,
  Cloud,
  Upload,
  Globe,
  Wifi,
} from "lucide-react";

interface DocumentVolumeData {
  day: string;
  count: number;
  trend: "up" | "down" | "stable";
}

interface CategoryData {
  category: string;
  count: number;
  percentage: number;
  change: number;
  icon: string;
}

interface DepartmentActivity {
  department: string;
  processed: number;
  pending: number;
  efficiency: number;
  avgTime: number;
}

interface ComplianceItem {
  id: string;
  title: string;
  deadline: string;
  progress: number;
  risk: "high" | "medium" | "low";
  daysLeft: number;
  assignee: string;
  status: "on-track" | "at-risk" | "overdue";
}

interface SystemHealth {
  aiAccuracy: number;
  processingSpeed: number;
  uptime: number;
  errorRate: number;
}

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  // Dynamic metrics state
  const [metrics, setMetrics] = useState({
    totalDocuments: 15420,
    avgProcessingTime: 2.3,
    complianceScore: 94,
    userEngagement: 87,
    documentsToday: 156,
    pendingActions: 23,
    complianceDeadlines: 8,
    aiClassifications: 142,
  });

  const [documentVolumeData, setDocumentVolumeData] = useState<
    DocumentVolumeData[]
  >([
    { day: "Mon", count: 245, trend: "up" },
    { day: "Tue", count: 189, trend: "down" },
    { day: "Wed", count: 312, trend: "up" },
    { day: "Thu", count: 278, trend: "down" },
    { day: "Fri", count: 425, trend: "up" },
    { day: "Sat", count: 89, trend: "down" },
    { day: "Sun", count: 67, trend: "stable" },
  ]);

  const [categoryData, setCategoryData] = useState<CategoryData[]>([
    {
      category: "Safety Reports",
      count: 3240,
      percentage: 35,
      change: 12,
      icon: "🛡️",
    },
    {
      category: "Financial",
      count: 2160,
      percentage: 23,
      change: 5,
      icon: "💰",
    },
    {
      category: "Operations",
      count: 1944,
      percentage: 21,
      change: -3,
      icon: "⚡",
    },
    {
      category: "Maintenance",
      count: 1080,
      percentage: 12,
      change: 8,
      icon: "🔧",
    },
    { category: "HR", count: 648, percentage: 7, change: 2, icon: "👥" },
    { category: "Others", count: 348, percentage: 2, change: 0, icon: "📄" },
  ]);

  const [departmentActivity, setDepartmentActivity] = useState<
    DepartmentActivity[]
  >([
    {
      department: "Operations",
      processed: 4200,
      pending: 12,
      efficiency: 97,
      avgTime: 1.8,
    },
    {
      department: "Safety",
      processed: 3800,
      pending: 8,
      efficiency: 95,
      avgTime: 2.1,
    },
    {
      department: "Finance",
      processed: 2400,
      pending: 15,
      efficiency: 89,
      avgTime: 3.2,
    },
    {
      department: "Maintenance",
      processed: 2100,
      pending: 6,
      efficiency: 92,
      avgTime: 2.5,
    },
    {
      department: "HR",
      processed: 1200,
      pending: 4,
      efficiency: 94,
      avgTime: 2.0,
    },
  ]);

  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([
    {
      id: "1",
      title: "Fire Safety Annual Review",
      deadline: "2025-02-15",
      progress: 75,
      risk: "medium",
      daysLeft: 12,
      assignee: "Safety Team",
      status: "on-track",
    },
    {
      id: "2",
      title: "Environmental Impact Assessment",
      deadline: "2025-01-28",
      progress: 90,
      risk: "low",
      daysLeft: 5,
      assignee: "Compliance Officer",
      status: "on-track",
    },
    {
      id: "3",
      title: "Staff Training Compliance",
      deadline: "2025-01-25",
      progress: 45,
      risk: "high",
      daysLeft: 2,
      assignee: "HR Department",
      status: "at-risk",
    },
    {
      id: "4",
      title: "Vendor Contract Renewals",
      deadline: "2025-02-28",
      progress: 20,
      risk: "medium",
      daysLeft: 25,
      assignee: "Finance Team",
      status: "on-track",
    },
  ]);

  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    aiAccuracy: 96.8,
    processingSpeed: 98.2,
    uptime: 99.9,
    errorRate: 0.3,
  });

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with small variations
      setMetrics((prev) => ({
        ...prev,
        documentsToday:
          prev.documentsToday +
          (Math.random() < 0.3 ? Math.floor(Math.random() * 3) : 0),
        avgProcessingTime: Math.max(
          1.5,
          prev.avgProcessingTime + (Math.random() - 0.5) * 0.1
        ),
        complianceScore: Math.max(
          90,
          Math.min(100, prev.complianceScore + (Math.random() - 0.5) * 0.5)
        ),
        userEngagement: Math.max(
          80,
          Math.min(95, prev.userEngagement + (Math.random() - 0.5) * 1)
        ),
        aiClassifications:
          prev.aiClassifications +
          (Math.random() < 0.4 ? Math.floor(Math.random() * 2) : 0),
      }));

      // Update document volume with trend changes
      setDocumentVolumeData((prev) =>
        prev.map((item) => {
          if (Math.random() < 0.2) {
            const newCount = Math.max(
              50,
              item.count + Math.floor((Math.random() - 0.5) * 30)
            );
            const trend: "up" | "down" | "stable" =
              newCount > item.count
                ? "up"
                : newCount < item.count
                ? "down"
                : "stable";
            return { ...item, count: newCount, trend };
          }
          return item;
        })
      );

      // Update category data
      setCategoryData((prev) =>
        prev.map((cat) => ({
          ...cat,
          count:
            cat.count +
            (Math.random() < 0.2 ? Math.floor(Math.random() * 5) : 0),
          change: cat.change + (Math.random() - 0.5) * 2,
        }))
      );

      // Update department activity
      setDepartmentActivity((prev) =>
        prev.map((dept) => ({
          ...dept,
          processed:
            dept.processed +
            (Math.random() < 0.3 ? Math.floor(Math.random() * 3) : 0),
          pending: Math.max(
            0,
            dept.pending +
              (Math.random() < 0.2 ? (Math.random() < 0.5 ? -1 : 1) : 0)
          ),
          efficiency: Math.max(
            85,
            Math.min(100, dept.efficiency + (Math.random() - 0.5) * 1)
          ),
          avgTime: Math.max(1, dept.avgTime + (Math.random() - 0.5) * 0.2),
        }))
      );

      // Update compliance progress
      setComplianceItems((prev) =>
        prev.map((item) => {
          if (Math.random() < 0.1) {
            const newProgress = Math.min(
              100,
              item.progress + Math.floor(Math.random() * 5)
            );
            const status =
              item.daysLeft <= 3 && newProgress < 70
                ? "at-risk"
                : item.daysLeft < 0
                ? "overdue"
                : "on-track";
            return { ...item, progress: newProgress, status };
          }
          return item;
        })
      );

      // Update system health
      setSystemHealth((prev) => ({
        aiAccuracy: Math.max(
          94,
          Math.min(99, prev.aiAccuracy + (Math.random() - 0.5) * 0.3)
        ),
        processingSpeed: Math.max(
          95,
          Math.min(100, prev.processingSpeed + (Math.random() - 0.5) * 0.5)
        ),
        uptime: Math.max(
          99,
          Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.1)
        ),
        errorRate: Math.max(
          0,
          Math.min(2, prev.errorRate + (Math.random() - 0.5) * 0.1)
        ),
      }));

      // Occasional notifications
      if (Math.random() < 0.1) {
        const alerts = [
          "📊 New compliance deadline approaching",
          "🔄 Document processing rate increased 15%",
          "⚡ AI classification accuracy improved",
          "📈 Department efficiency targets met",
          "🛡️ Security scan completed successfully",
        ];
        setNotifications((prev) => [
          ...prev,
          alerts[Math.floor(Math.random() * alerts.length)],
        ]);
      }

      setLastUpdated(new Date());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Auto-clear notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setNotifications((prev) => [...prev, "🔄 Refreshing analytics data..."]);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate data refresh with improvements
    setMetrics((prev) => ({
      ...prev,
      totalDocuments: prev.totalDocuments + Math.floor(Math.random() * 50),
      complianceScore: Math.min(100, prev.complianceScore + Math.random() * 2),
    }));

    setIsRefreshing(false);
    setLastUpdated(new Date());
    setNotifications((prev) => [
      ...prev,
      "✅ Analytics data refreshed successfully",
    ]);
  };

  const handleExport = async () => {
    setIsExporting(true);
    setNotifications((prev) => [...prev, "📊 Generating analytics report..."]);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsExporting(false);
    setNotifications((prev) => [...prev, "✅ Report exported successfully"]);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "default";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "text-success";
      case "at-risk":
        return "text-warning";
      case "overdue":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3 w-3 text-success" />;
      case "down":
        return <ArrowDown className="h-3 w-3 text-destructive" />;
      default:
        return <div className="w-3 h-3" />;
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        isLoggedIn={true}
        userRole="Analytics Manager"
        notifications={notifications.length}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Notifications */}
        {notifications.length > 0 && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Bell className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">System Updates</AlertTitle>
            <AlertDescription className="text-blue-700">
              {notifications[0]}
            </AlertDescription>
          </Alert>
        )}

        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Analytics & Intelligence Hub
            </h1>
            <p className="text-muted-foreground mt-2 flex items-center">
              <Brain className="w-4 h-4 mr-2 text-purple-500" />
              Real-time insights and performance metrics for KMRL document
              processing
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Live Data</span>
              <span>•</span>
              <span>
                Updated{" "}
                {lastUpdated.toLocaleTimeString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="365d">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleExport} disabled={isExporting}>
              {isExporting ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Export Report
            </Button>
          </div>
        </div>

        {/* Enhanced Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            className="card-hover group cursor-pointer"
            onClick={() => setSelectedMetric("documents")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Documents
              </CardTitle>
              <Database className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.totalDocuments.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </div>
              <div className="mt-2">
                <Progress value={85} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-hover group cursor-pointer"
            onClick={() => setSelectedMetric("processing")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Processing Time
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.avgProcessingTime.toFixed(1)} min
              </div>
              <div className="flex items-center text-xs text-success">
                <TrendingDown className="h-3 w-3 mr-1" />
                15% faster than last month
              </div>
              <div className="mt-2">
                <Progress value={92} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-hover group cursor-pointer"
            onClick={() => setSelectedMetric("compliance")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Compliance Score
              </CardTitle>
              <Shield className="h-4 w-4 text-success group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.complianceScore.toFixed(1)}%
              </div>
              <div className="flex items-center text-xs text-success">
                <CheckCircle className="h-3 w-3 mr-1" />
                Excellent rating
              </div>
              <div className="mt-2">
                <Progress value={metrics.complianceScore} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-hover group cursor-pointer"
            onClick={() => setSelectedMetric("engagement")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                System Health
              </CardTitle>
              <Zap className="h-4 w-4 text-green-600 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {systemHealth.uptime.toFixed(1)}%
              </div>
              <div className="flex items-center text-xs text-success">
                <Wifi className="h-3 w-3 mr-1" />
                All systems operational
              </div>
              <div className="mt-2">
                <Progress value={systemHealth.uptime} className="h-1" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="system">System Health</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced Document Volume Chart */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Document Volume Trends
                  </CardTitle>
                  <CardDescription>
                    Processing activity over the last 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documentVolumeData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 group hover:bg-accent/50 p-2 rounded transition-colors"
                      >
                        <div className="w-12 text-sm text-muted-foreground font-medium">
                          {item.day}
                        </div>
                        <div className="flex-1">
                          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full h-6 relative overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-primary to-purple-500 h-full rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${(item.count / 450) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(item.trend)}
                          <div className="w-16 text-sm font-medium text-right">
                            {item.count}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Weekly Total
                      </span>
                      <span className="font-bold text-primary">
                        {documentVolumeData.reduce(
                          (sum, item) => sum + item.count,
                          0
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Category Distribution */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-green-600" />
                      Document Categories
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Distribution by document type with growth trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((item, index) => (
                      <div
                        key={index}
                        className="space-y-3 p-3 rounded-lg bg-accent/20 hover:bg-accent/40 transition-colors"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium">{item.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">
                              {item.count.toLocaleString()}
                            </span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${getChangeColor(
                                item.change
                              )}`}
                            >
                              {item.change > 0 ? "+" : ""}
                              {item.change.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {item.percentage}% of total documents
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Performance Metrics */}
            <Card className="card-enterprise">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {systemHealth.aiAccuracy.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      AI Accuracy
                    </div>
                    <Progress value={systemHealth.aiAccuracy} className="h-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {systemHealth.processingSpeed.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Processing Speed
                    </div>
                    <Progress
                      value={systemHealth.processingSpeed}
                      className="h-2"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success mb-1">
                      {metrics.aiClassifications}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      AI Classifications Today
                    </div>
                    <Badge className="bg-success/10 text-success">
                      +15 this hour
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {systemHealth.errorRate.toFixed(2)}%
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Error Rate
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Excellent
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Processing Performance Timeline</CardTitle>
                  <CardDescription>
                    Document processing metrics and AI insights over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <div className="text-center z-10">
                      <LineChart className="h-12 w-12 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">
                        Interactive Timeline Chart
                      </p>
                      <div className="flex items-center justify-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-primary rounded mr-2"></div>
                          Processing Volume
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                          AI Accuracy
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Today's Highlights
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">
                      Documents Processed
                    </span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {metrics.documentsToday}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium">Pending Actions</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {metrics.pendingActions}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">
                      AI Classifications
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      {metrics.aiClassifications}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium">
                      Compliance Items
                    </span>
                    <Badge className="bg-purple-100 text-purple-800">
                      {metrics.complianceDeadlines}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Document Sources Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Document Sources Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    {
                      source: "Email",
                      icon: Mail,
                      count: 156,
                      growth: "+12%",
                      color: "text-blue-500",
                    },
                    {
                      source: "WhatsApp",
                      icon: Smartphone,
                      count: 89,
                      growth: "+8%",
                      color: "text-green-500",
                    },
                    {
                      source: "SharePoint",
                      icon: Cloud,
                      count: 234,
                      growth: "+15%",
                      color: "text-purple-500",
                    },
                    {
                      source: "Maximo",
                      icon: Settings,
                      count: 67,
                      growth: "+5%",
                      color: "text-orange-500",
                    },
                    {
                      source: "Manual",
                      icon: Upload,
                      count: 45,
                      growth: "+2%",
                      color: "text-indigo-500",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-accent/20 rounded-lg hover:bg-accent/40 transition-colors"
                    >
                      <item.icon
                        className={`h-8 w-8 ${item.color} mx-auto mb-2`}
                      />
                      <div className="text-lg font-bold">{item.count}</div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {item.source}
                      </div>
                      <Badge variant="outline" className="text-xs text-success">
                        {item.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Department Performance Analysis
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </CardTitle>
                <CardDescription>
                  Comprehensive view of document processing by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {departmentActivity.map((dept, index) => (
                    <div
                      key={index}
                      className="p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {dept.department}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Avg processing time: {dept.avgTime.toFixed(1)}{" "}
                            minutes
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={`${
                              dept.efficiency >= 95
                                ? "bg-success text-success-foreground"
                                : dept.efficiency >= 90
                                ? "bg-warning text-warning-foreground"
                                : "bg-destructive text-destructive-foreground"
                            }`}
                          >
                            {dept.efficiency.toFixed(1)}% efficient
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-success">
                            {dept.processed.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Processed
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-warning">
                            {dept.pending}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Pending
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            {(
                              (dept.processed /
                                (dept.processed + dept.pending)) *
                              100
                            ).toFixed(1)}
                            %
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Completion Rate
                          </div>
                        </div>
                      </div>

                      <Progress
                        value={
                          (dept.processed / (dept.processed + dept.pending)) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-success" />
                    Compliance Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-success mb-2">
                        {metrics.complianceScore.toFixed(1)}%
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Overall Compliance Score
                      </p>
                      <Progress
                        value={metrics.complianceScore}
                        className="h-3"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-success">
                          {
                            complianceItems.filter(
                              (item) => item.status === "on-track"
                            ).length
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">
                          On Track
                        </div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-warning">
                          {
                            complianceItems.filter(
                              (item) => item.status === "at-risk"
                            ).length
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">
                          At Risk
                        </div>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-destructive">
                          {
                            complianceItems.filter(
                              (item) => item.status === "overdue"
                            ).length
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Overdue
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Critical Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complianceItems
                      .sort((a, b) => a.daysLeft - b.daysLeft)
                      .map((item, index) => (
                        <div
                          key={item.id}
                          className="space-y-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {item.title}
                              </p>
                              <p className="text-xs text-muted-foreground mb-1">
                                Assigned to: {item.assignee}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Due:{" "}
                                {new Date(item.deadline).toLocaleDateString()}
                                <span className={getStatusColor(item.status)}>
                                  {" "}
                                  ({item.daysLeft} days left)
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={getRiskColor(item.risk) as any}
                                className="text-xs"
                              >
                                {item.risk} risk
                              </Badge>
                              {item.daysLeft <= 3 && (
                                <AlertTriangle className="w-4 h-4 text-warning animate-pulse" />
                              )}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span className="font-medium">
                                {item.progress}%
                              </span>
                            </div>
                            <Progress value={item.progress} className="h-2" />
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">AI Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {systemHealth.aiAccuracy.toFixed(1)}%
                  </div>
                  <Progress
                    value={systemHealth.aiAccuracy}
                    className="h-2 mb-2"
                  />
                  <p className="text-xs text-success">Excellent performance</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">System Uptime</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {systemHealth.uptime.toFixed(1)}%
                  </div>
                  <Progress value={systemHealth.uptime} className="h-2 mb-2" />
                  <p className="text-xs text-success">Highly available</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Processing Speed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {systemHealth.processingSpeed.toFixed(1)}%
                  </div>
                  <Progress
                    value={systemHealth.processingSpeed}
                    className="h-2 mb-2"
                  />
                  <p className="text-xs text-success">Optimal speed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Error Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {systemHealth.errorRate.toFixed(2)}%
                  </div>
                  <Progress
                    value={100 - systemHealth.errorRate * 10}
                    className="h-2 mb-2"
                  />
                  <p className="text-xs text-success">Very low errors</p>
                </CardContent>
              </Card>
            </div>

            {/* System Status Overview */}
            <Card className="bg-gradient-to-r from-card to-muted/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  System Status Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
                    <h3 className="font-semibold text-success">
                      All Systems Operational
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      No issues detected
                    </p>
                  </div>
                  <div className="text-center">
                    <Zap className="h-12 w-12 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">High Performance</h3>
                    <p className="text-sm text-muted-foreground">
                      Processing at optimal speed
                    </p>
                  </div>
                  <div className="text-center">
                    <Target className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Meeting SLAs</h3>
                    <p className="text-sm text-muted-foreground">
                      All targets achieved
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analytics;
