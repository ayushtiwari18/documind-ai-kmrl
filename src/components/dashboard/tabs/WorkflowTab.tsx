// src/components/dashboard/tabs/WorkflowTab.tsx
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Route,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Settings,
  TrendingUp,
  ArrowRight,
  Play,
  Pause,
  Edit,
  Plus,
  RefreshCw,
  Activity,
  Target,
  Zap,
  BarChart3,
  Timer,
  Bell,
  Eye,
  Archive,
  Workflow,
  GitBranch,
  CheckSquare,
  XCircle,
  AlertCircle,
  Calendar,
  Filter,
} from "lucide-react";

interface WorkflowTabProps {
  workflowMetrics: {
    autoRouted: number;
    pendingReview: number;
    escalated: number;
    completed: number;
  };
  routingRules: Array<{
    id: string;
    name: string;
    description: string;
    status: "active" | "inactive" | "paused";
    documentsRouted: number;
    escalationTime: number;
    successRate: number;
  }>;
}

interface WorkflowActivity {
  id: string;
  documentTitle: string;
  fromDepartment: string;
  toDepartment: string;
  timestamp: string;
  status: "routed" | "escalated" | "completed" | "failed";
  processingTime: number;
}

interface DepartmentStats {
  name: string;
  icon: string;
  color: string;
  docsReceived: number;
  percentage: number;
  avgResponseTime: number;
  backlog: number;
}

export const WorkflowTab = ({
  workflowMetrics: initialMetrics,
  routingRules: initialRules,
}: WorkflowTabProps) => {
  // State management
  const [workflowMetrics, setWorkflowMetrics] = useState(initialMetrics);
  const [routingRules, setRoutingRules] = useState(initialRules);
  const [recentActivity, setRecentActivity] = useState<WorkflowActivity[]>([]);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);
  const [overallSuccessRate, setOverallSuccessRate] = useState(94.2);
  const [avgProcessingTime, setAvgProcessingTime] = useState(1.8);
  const [escalationsTriggered, setEscalationsTriggered] = useState(3);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [isCreatingRule, setIsCreatingRule] = useState(false);
  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    escalationTime: 24,
    targetDepartment: "",
  });

  // Initialize department stats
  useEffect(() => {
    setDepartmentStats([
      {
        name: "Engineering",
        icon: "🔧",
        color: "text-blue-500",
        docsReceived: 89,
        percentage: 38,
        avgResponseTime: 2.1,
        backlog: 5,
      },
      {
        name: "Operations",
        icon: "⚡",
        color: "text-green-500",
        docsReceived: 67,
        percentage: 29,
        avgResponseTime: 1.8,
        backlog: 2,
      },
      {
        name: "Finance",
        icon: "💰",
        color: "text-purple-500",
        docsReceived: 45,
        percentage: 19,
        avgResponseTime: 3.2,
        backlog: 8,
      },
      {
        name: "Safety & Compliance",
        icon: "🛡️",
        color: "text-red-500",
        docsReceived: 33,
        percentage: 14,
        avgResponseTime: 4.5,
        backlog: 12,
      },
    ]);
  }, []);

  // Real-time workflow simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new workflow activity
      if (Math.random() < 0.4) {
        const newActivity: WorkflowActivity = {
          id: `activity_${Date.now()}`,
          documentTitle: getRandomDocumentTitle(),
          fromDepartment: getRandomDepartment(),
          toDepartment: getRandomDepartment(),
          timestamp: new Date().toISOString(),
          status:
            Math.random() < 0.85
              ? "routed"
              : Math.random() < 0.5
              ? "escalated"
              : "completed",
          processingTime: Math.random() * 5 + 0.5,
        };

        setRecentActivity((prev) => [newActivity, ...prev.slice(0, 9)]);

        // Update metrics based on activity
        if (newActivity.status === "routed") {
          setWorkflowMetrics((prev) => ({
            ...prev,
            autoRouted: prev.autoRouted + 1,
          }));
        } else if (newActivity.status === "escalated") {
          setWorkflowMetrics((prev) => ({
            ...prev,
            escalated: prev.escalated + 1,
          }));
          setNotifications((prev) => [
            ...prev,
            `🚨 Document escalated: ${newActivity.documentTitle}`,
          ]);
        }
      }

      // Update routing rules performance
      setRoutingRules((prev) =>
        prev.map((rule) => ({
          ...rule,
          documentsRouted:
            rule.documentsRouted +
            (Math.random() < 0.3 ? Math.floor(Math.random() * 3) : 0),
          successRate: Math.max(
            80,
            Math.min(100, rule.successRate + (Math.random() - 0.5) * 2)
          ),
        }))
      );

      // Update department stats
      setDepartmentStats((prev) =>
        prev.map((dept) => ({
          ...dept,
          docsReceived: dept.docsReceived + (Math.random() < 0.2 ? 1 : 0),
          avgResponseTime: Math.max(
            1,
            dept.avgResponseTime + (Math.random() - 0.5) * 0.3
          ),
          backlog: Math.max(
            0,
            dept.backlog +
              (Math.random() < 0.3 ? -1 : Math.random() < 0.1 ? 1 : 0)
          ),
        }))
      );

      // Update overall metrics
      setOverallSuccessRate((prev) =>
        Math.max(90, Math.min(98, prev + (Math.random() - 0.5) * 0.5))
      );
      setAvgProcessingTime((prev) =>
        Math.max(1, prev + (Math.random() - 0.5) * 0.2)
      );

      setLastUpdated(new Date());
    }, 3500);

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
  const getRandomDocumentTitle = () => {
    const titles = [
      "Track Maintenance Report",
      "Safety Inspection Update",
      "Budget Approval Request",
      "Equipment Purchase Order",
      "Staff Schedule Change",
      "Compliance Audit Result",
      "Passenger Complaint Response",
      "Infrastructure Planning Doc",
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomDepartment = () => {
    const depts = [
      "Engineering",
      "Operations",
      "Finance",
      "Safety",
      "Administration",
    ];
    return depts[Math.floor(Math.random() * depts.length)];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "status-success";
      case "paused":
        return "status-warning";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-secondary";
    }
  };

  const getActivityStatusIcon = (status: string) => {
    switch (status) {
      case "routed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "escalated":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "completed":
        return <CheckSquare className="w-4 h-4 text-success" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const toggleRuleStatus = (ruleId: string) => {
    setRoutingRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId
          ? { ...rule, status: rule.status === "active" ? "paused" : "active" }
          : rule
      )
    );

    const rule = routingRules.find((r) => r.id === ruleId);
    const newStatus = rule?.status === "active" ? "paused" : "active";
    setNotifications((prev) => [
      ...prev,
      `📋 Rule "${rule?.name}" ${newStatus}`,
    ]);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setNotifications((prev) => [...prev, "🔄 Refreshing workflow data..."]);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate data refresh
    setWorkflowMetrics((prev) => ({
      ...prev,
      autoRouted: prev.autoRouted + Math.floor(Math.random() * 5),
      completed: prev.completed + Math.floor(Math.random() * 3),
    }));

    setIsRefreshing(false);
    setLastUpdated(new Date());
    setNotifications((prev) => [...prev, "✅ Workflow data refreshed"]);
  };

  const handleCreateRule = () => {
    if (!newRule.name || !newRule.description) return;

    const rule = {
      id: `rule_${Date.now()}`,
      name: newRule.name,
      description: newRule.description,
      status: "active" as const,
      documentsRouted: 0,
      escalationTime: newRule.escalationTime,
      successRate: 95,
    };

    setRoutingRules((prev) => [...prev, rule]);
    setNewRule({
      name: "",
      description: "",
      escalationTime: 24,
      targetDepartment: "",
    });
    setIsCreatingRule(false);
    setNotifications((prev) => [
      ...prev,
      `✅ New routing rule "${rule.name}" created`,
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {notifications.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <Bell className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-800">Workflow Updates</AlertTitle>
          <AlertDescription className="text-orange-700">
            {notifications[0]}
          </AlertDescription>
        </Alert>
      )}

      {/* Header with Live Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Workflow className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-semibold text-foreground">
            Smart Workflow Engine
          </h2>
          <Badge className="bg-orange-100 text-orange-800">
            <Activity className="w-3 h-3 mr-1 animate-pulse" />
            Processing
          </Badge>
        </div>
        <div className="flex items-center space-x-4">
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

      {/* Enhanced Workflow Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-dashboard text-center hover-lift group">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 text-success mr-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-success">
                {workflowMetrics.autoRouted}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Auto-Routed
            </div>
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className="w-3 h-3 text-success" />
              <div className="text-xs text-success">Today</div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-dashboard text-center hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-warning mr-2 animate-pulse" />
              <div className="text-2xl font-bold text-warning">
                {workflowMetrics.pendingReview}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Pending Review
            </div>
            <div className="text-xs text-warning">Needs attention</div>
          </CardContent>
        </Card>

        <Card className="card-dashboard text-center hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6 text-urgent mr-2 animate-pulse" />
              <div className="text-2xl font-bold text-urgent">
                {workflowMetrics.escalated}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">Escalated</div>
            <div className="text-xs text-urgent">Urgent</div>
          </CardContent>
        </Card>

        <Card className="card-dashboard text-center hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <CheckSquare className="w-6 h-6 text-success mr-2" />
              <div className="text-2xl font-bold text-success">
                {workflowMetrics.completed}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">Completed</div>
            <div className="text-xs text-success">Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Active Routing Rules */}
      <Card className="card-enterprise">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Route className="w-5 h-5 text-orange-500 mr-2" />
              Active Routing Rules
              <Badge className="ml-2 bg-orange-100 text-orange-800">
                {routingRules.length} rules
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={isCreatingRule} onOpenChange={setIsCreatingRule}>
                <DialogTrigger asChild>
                  <Button size="sm" className="btn-success">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Rule
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create Routing Rule</DialogTitle>
                    <DialogDescription>
                      Set up intelligent document routing with auto-escalation.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="rule-name">Rule Name</Label>
                      <Input
                        id="rule-name"
                        value={newRule.name}
                        onChange={(e) =>
                          setNewRule((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="e.g., Safety Documents → Safety Team"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rule-description">Description</Label>
                      <Textarea
                        id="rule-description"
                        value={newRule.description}
                        onChange={(e) =>
                          setNewRule((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Describe when this rule should trigger..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="escalation-time">
                        Escalation Time (hours)
                      </Label>
                      <Input
                        id="escalation-time"
                        type="number"
                        value={newRule.escalationTime}
                        onChange={(e) =>
                          setNewRule((prev) => ({
                            ...prev,
                            escalationTime: parseInt(e.target.value),
                          }))
                        }
                        min="1"
                        max="168"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreatingRule(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateRule}
                      disabled={!newRule.name || !newRule.description}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Rule
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Manage Rules
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routingRules.map((rule) => (
              <div
                key={rule.id}
                className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                      <Route className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {rule.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(rule.status)}>
                      {rule.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleRuleStatus(rule.id)}
                    >
                      {rule.status === "active" ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">
                      Documents Routed
                    </div>
                    <div className="font-semibold text-foreground flex items-center">
                      {rule.documentsRouted}
                      {rule.documentsRouted > 50 && (
                        <TrendingUp className="w-3 h-3 ml-1 text-success" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">
                      Escalation Time
                    </div>
                    <div className="font-semibold text-foreground flex items-center">
                      {rule.escalationTime}h
                      <Timer className="w-3 h-3 ml-1 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">
                      Success Rate
                    </div>
                    <div className="font-semibold text-success flex items-center">
                      {rule.successRate.toFixed(1)}%
                      <Target className="w-3 h-3 ml-1 text-success" />
                    </div>
                  </div>
                </div>

                {rule.status === "active" && (
                  <div className="mt-3">
                    <Progress value={rule.successRate} className="h-1" />
                  </div>
                )}
              </div>
            ))}

            {routingRules.length === 0 && (
              <div className="text-center py-8">
                <Route className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No routing rules configured
                </h3>
                <p className="text-muted-foreground mb-4">
                  Set up intelligent routing rules to automate document
                  distribution.
                </p>
                <Button
                  className="btn-success"
                  onClick={() => setIsCreatingRule(true)}
                >
                  Create First Rule
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Workflow Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-enterprise hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 text-blue-600 mr-2" />
              Department Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/40 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">{dept.icon}</div>
                    <div>
                      <div className="font-medium">{dept.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Avg response: {dept.avgResponseTime.toFixed(1)}h
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm font-medium">
                        {dept.docsReceived} docs
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {dept.percentage}%
                      </Badge>
                    </div>
                    {dept.backlog > 0 && (
                      <div className="text-xs text-warning">
                        Backlog: {dept.backlog}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-enterprise hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
                Routing Efficiency
              </div>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2 flex items-center justify-center">
                  {overallSuccessRate.toFixed(1)}%
                  <TrendingUp className="w-5 h-5 ml-2 text-success" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Overall Success Rate
                </div>
                <Progress value={overallSuccessRate} className="mt-2 h-2" />
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span>Correctly Routed</span>
                  <span className="font-medium">221/234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Average Processing Time</span>
                  <span className="font-medium">
                    {avgProcessingTime.toFixed(1)} minutes
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Escalations Triggered</span>
                  <span className="font-medium text-warning">
                    {escalationsTriggered}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>SLA Compliance</span>
                  <span className="font-medium text-success">96.8%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Workflow Activity */}
      <Card className="card-enterprise">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-green-600 mr-2" />
              Recent Workflow Activity
            </div>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/40 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {getActivityStatusIcon(activity.status)}
                    <div>
                      <div className="font-medium text-sm">
                        {activity.documentTitle}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activity.fromDepartment} → {activity.toDepartment}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleTimeString(
                        "en-IN",
                        {
                          timeZone: "Asia/Kolkata",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </div>
                    <div className="text-xs font-medium">
                      {activity.processingTime.toFixed(1)}s
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <GitBranch className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No recent workflow activity</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* System Performance Footer */}
      <Card className="card-enterprise bg-gradient-to-r from-card to-muted/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Workflow className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm">Workflow Engine Status:</span>
                <Badge className="ml-2 status-success">Operational</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Processing:{" "}
                {recentActivity.filter((a) => a.status === "routed").length}{" "}
                active flows
              </div>
              <div className="text-sm text-muted-foreground">
                Queue: {workflowMetrics.pendingReview} pending reviews
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-primary/10 text-primary">
                <Zap className="w-3 h-3 mr-1" />
                High Performance
              </Badge>
              <Badge className="bg-success/10 text-success">
                <CheckCircle className="w-3 h-3 mr-1" />
                All Rules Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
