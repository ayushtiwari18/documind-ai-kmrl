// src/components/dashboard/tabs/ComplianceTab.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Shield,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  Plus,
  Bell,
  Activity,
  Target,
  Users,
  RefreshCw,
  Eye,
  Edit,
  CheckSquare,
  XCircle,
  Zap,
  Timer,
  Archive,
  BarChart3,
} from "lucide-react";

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: "completed" | "in-progress" | "overdue" | "upcoming";
  progress: number;
  priority: "high" | "medium" | "low";
  regulatoryBody: string;
  assignedTo?: string;
  lastUpdated?: string;
  documents?: number;
}

interface ComplianceTabProps {
  complianceStats: {
    complianceRate: number;
    pendingTasks: number;
    overdueTasks: number;
    completedThisMonth: number;
  };
  upcomingItems: ComplianceItem[];
}

export const ComplianceTab = ({
  complianceStats: initialStats,
  upcomingItems: initialItems,
}: ComplianceTabProps) => {
  // State for dynamic updates
  const [complianceStats, setComplianceStats] = useState(initialStats);
  const [upcomingItems, setUpcomingItems] = useState(initialItems);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "medium" as const,
    regulatoryBody: "",
  });

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate progress updates for in-progress items
      setUpcomingItems((prev) =>
        prev.map((item) => {
          if (item.status === "in-progress") {
            const newProgress = Math.min(
              100,
              item.progress + Math.random() * 2
            );
            const updatedItem = {
              ...item,
              progress: newProgress,
              lastUpdated: new Date().toISOString(),
            };

            // Auto-complete items that reach 100%
            if (newProgress >= 100) {
              updatedItem.status = "completed";
              setNotifications((current) => [
                ...current,
                `✅ ${item.title} has been completed!`,
              ]);

              // Update stats
              setComplianceStats((stats) => ({
                ...stats,
                completedThisMonth: stats.completedThisMonth + 1,
                pendingTasks: Math.max(0, stats.pendingTasks - 1),
                complianceRate: Math.min(100, stats.complianceRate + 0.5),
              }));
            }

            return updatedItem;
          }
          return item;
        })
      );

      // Check for approaching deadlines
      const today = new Date();
      upcomingItems.forEach((item) => {
        const deadline = new Date(item.deadline);
        const daysUntil = Math.ceil(
          (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysUntil === 1 && item.status !== "completed") {
          setNotifications((current) =>
            current.includes(`⏰ ${item.title} is due tomorrow!`)
              ? current
              : [...current, `⏰ ${item.title} is due tomorrow!`]
          );
        }
      });

      setLastUpdated(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, [upcomingItems]);

  // Auto-clear notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "status-success";
      case "in-progress":
        return "status-warning";
      case "overdue":
        return "status-urgent";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "status-urgent";
      case "medium":
        return "status-warning";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-secondary";
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-warning animate-pulse" />;
      case "overdue":
        return <XCircle className="w-4 h-4 text-urgent" />;
      case "upcoming":
        return <Timer className="w-4 h-4 text-blue-600" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate slight improvements in compliance rate
    setComplianceStats((prev) => ({
      ...prev,
      complianceRate: Math.min(100, prev.complianceRate + Math.random() * 0.5),
    }));

    setIsRefreshing(false);
    setLastUpdated(new Date());
    setNotifications((prev) => [
      ...prev,
      "🔄 Compliance data refreshed successfully",
    ]);
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.deadline) return;

    const task: ComplianceItem = {
      id: `task_${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      deadline: newTask.deadline,
      status: "upcoming",
      progress: 0,
      priority: newTask.priority,
      regulatoryBody: newTask.regulatoryBody,
      assignedTo: "Current User",
      lastUpdated: new Date().toISOString(),
      documents: 0,
    };

    setUpcomingItems((prev) => [task, ...prev]);
    setComplianceStats((prev) => ({
      ...prev,
      pendingTasks: prev.pendingTasks + 1,
    }));

    setNewTask({
      title: "",
      description: "",
      deadline: "",
      priority: "medium",
      regulatoryBody: "",
    });
    setIsAddingTask(false);
    setNotifications((prev) => [
      ...prev,
      `✅ New task "${task.title}" added successfully`,
    ]);
  };

  const updateTaskStatus = (
    id: string,
    newStatus: ComplianceItem["status"]
  ) => {
    setUpcomingItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
              lastUpdated: new Date().toISOString(),
            }
          : item
      )
    );

    if (newStatus === "completed") {
      setComplianceStats((prev) => ({
        ...prev,
        completedThisMonth: prev.completedThisMonth + 1,
        pendingTasks: Math.max(0, prev.pendingTasks - 1),
        complianceRate: Math.min(100, prev.complianceRate + 1),
      }));
    } else if (newStatus === "in-progress") {
      setNotifications((prev) => [
        ...prev,
        `🚀 Work started on compliance task`,
      ]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {notifications.length > 0 && (
        <Alert className="border-blue-200 bg-blue-50">
          <Bell className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Live Updates</AlertTitle>
          <AlertDescription className="text-blue-700">
            {notifications[0]}
          </AlertDescription>
        </Alert>
      )}

      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-red-500" />
          <h2 className="text-xl font-semibold text-foreground">
            Compliance Management
          </h2>
          <Badge className="bg-red-100 text-red-800">Live Tracking</Badge>
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

      {/* Enhanced Compliance Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-dashboard text-center hover-lift group">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <div className="relative">
                <Shield className="w-6 h-6 text-success mr-2 group-hover:scale-110 transition-transform" />
                {complianceStats.complianceRate >= 95 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full animate-pulse"></div>
                )}
              </div>
              <div className="text-2xl font-bold text-success">
                {complianceStats.complianceRate.toFixed(1)}%
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Compliance Rate
            </div>
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className="w-3 h-3 text-success" />
              <div className="text-xs text-success">Above target (90%)</div>
            </div>
            <Progress
              value={complianceStats.complianceRate}
              className="h-1 mt-2"
            />
          </CardContent>
        </Card>

        <Card className="card-dashboard text-center hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-warning mr-2" />
              <div className="text-2xl font-bold text-warning">
                {complianceStats.pendingTasks}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Pending Tasks
            </div>
            <div className="text-xs text-warning">3 due this week</div>
            {complianceStats.pendingTasks > 5 && (
              <Badge className="mt-2 bg-warning/10 text-warning text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                High Volume
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card className="card-dashboard text-center hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6 text-urgent mr-2 animate-pulse" />
              <div className="text-2xl font-bold text-urgent">
                {complianceStats.overdueTasks}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Overdue Items
            </div>
            <div className="text-xs text-urgent">Immediate action needed</div>
            {complianceStats.overdueTasks > 0 && (
              <Button size="sm" variant="destructive" className="mt-2 text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Take Action
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="card-dashboard text-center hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-success mr-2" />
              <div className="text-2xl font-bold text-success">
                {complianceStats.completedThisMonth}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Completed This Month
            </div>
            <div className="flex items-center justify-center space-x-1">
              <CheckSquare className="w-3 h-3 text-success" />
              <div className="text-xs text-success">+15% vs last month</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Compliance Timeline */}
      <Card className="card-enterprise">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-red-500 mr-2" />
              Compliance Timeline
              <Badge className="ml-2 bg-blue-100 text-blue-800">
                {upcomingItems.length} items
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
                <DialogTrigger asChild>
                  <Button size="sm" className="btn-success">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Compliance Task</DialogTitle>
                    <DialogDescription>
                      Create a new compliance task with deadline tracking.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="task-title">Task Title</Label>
                      <Input
                        id="task-title"
                        value={newTask.title}
                        onChange={(e) =>
                          setNewTask((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Enter task title..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="task-description">Description</Label>
                      <Textarea
                        id="task-description"
                        value={newTask.description}
                        onChange={(e) =>
                          setNewTask((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Task description..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="task-deadline">Deadline</Label>
                        <Input
                          id="task-deadline"
                          type="date"
                          value={newTask.deadline}
                          onChange={(e) =>
                            setNewTask((prev) => ({
                              ...prev,
                              deadline: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="task-priority">Priority</Label>
                        <select
                          id="task-priority"
                          className="w-full p-2 border border-border rounded-md"
                          value={newTask.priority}
                          onChange={(e) =>
                            setNewTask((prev) => ({
                              ...prev,
                              priority: e.target.value as any,
                            }))
                          }
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="regulatory-body">Regulatory Body</Label>
                      <Input
                        id="regulatory-body"
                        value={newTask.regulatoryBody}
                        onChange={(e) =>
                          setNewTask((prev) => ({
                            ...prev,
                            regulatoryBody: e.target.value,
                          }))
                        }
                        placeholder="e.g., Municipal Corporation"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingTask(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddTask}
                      disabled={!newTask.title || !newTask.deadline}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Task
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingItems.map((item) => {
              const daysUntil = getDaysUntilDeadline(item.deadline);
              const isOverdue = daysUntil < 0;
              const isUrgent = daysUntil <= 3 && daysUntil >= 0;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border-l-4 transition-all duration-300 hover:shadow-md ${
                    isOverdue
                      ? "bg-red-50 border-red-500"
                      : isUrgent
                      ? "bg-yellow-50 border-yellow-500"
                      : item.status === "completed"
                      ? "bg-green-50 border-green-500"
                      : "bg-blue-50 border-blue-500"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusIcon(item.status)}
                        <h4 className="font-semibold text-foreground">
                          {item.title}
                        </h4>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>📋 {item.regulatoryBody}</span>
                        {item.assignedTo && <span>👤 {item.assignedTo}</span>}
                        {item.lastUpdated && (
                          <span>
                            🕐 Updated{" "}
                            {new Date(item.lastUpdated).toLocaleTimeString(
                              "en-IN",
                              {
                                timeZone: "Asia/Kolkata",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {item.status === "in-progress" && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center">
                          <Activity className="w-3 h-3 mr-1" />
                          Progress
                        </span>
                        <span className="font-medium">
                          {Math.round(item.progress)}%
                        </span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm">
                        {isOverdue ? (
                          <span className="text-red-600 font-medium flex items-center">
                            <XCircle className="w-4 h-4 mr-1" />
                            Overdue by {Math.abs(daysUntil)} days
                          </span>
                        ) : (
                          <span
                            className={`font-medium flex items-center ${
                              isUrgent ? "text-yellow-600" : "text-green-600"
                            }`}
                          >
                            <Timer className="w-4 h-4 mr-1" />
                            {daysUntil === 0
                              ? "Due today"
                              : `Due in ${daysUntil} days`}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedItem(item)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>

                      {item.status !== "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateTaskStatus(
                              item.id,
                              item.status === "upcoming"
                                ? "in-progress"
                                : "completed"
                            )
                          }
                        >
                          {item.status === "upcoming" ? (
                            <>
                              <Activity className="w-3 h-3 mr-1" />
                              Start
                            </>
                          ) : (
                            <>
                              <CheckSquare className="w-3 h-3 mr-1" />
                              Complete
                            </>
                          )}
                        </Button>
                      )}

                      {isOverdue && (
                        <Button size="sm" variant="destructive">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Urgent Action
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {upcomingItems.length === 0 && (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No compliance items
                </h3>
                <p className="text-muted-foreground mb-4">
                  All compliance tasks are up to date!
                </p>
                <Button onClick={() => setIsAddingTask(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Task
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Regulatory Bodies Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-enterprise hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 text-blue-600 mr-2" />
              Regulatory Bodies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  name: "Ministry of Urban Affairs",
                  count: 3,
                  status: "active",
                  color: "blue",
                },
                {
                  name: "Metro Rail Safety Commission",
                  count: 2,
                  status: "active",
                  color: "green",
                },
                {
                  name: "Environmental Authority",
                  count: 1,
                  status: "pending",
                  color: "yellow",
                },
                {
                  name: "Fire Safety Department",
                  count: 1,
                  status: "overdue",
                  color: "red",
                },
              ].map((body, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Target className={`w-4 h-4 text-${body.color}-600`} />
                    <span className="text-sm font-medium">{body.name}</span>
                  </div>
                  <Badge
                    className={`bg-${body.color}-100 text-${body.color}-800`}
                  >
                    {body.count} {body.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-enterprise hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
              Compliance Score Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-success mb-2 flex items-center justify-center">
                {complianceStats.complianceRate.toFixed(1)}%
                <TrendingUp className="w-5 h-5 ml-2 text-success" />
              </div>
              <div className="text-sm text-muted-foreground">Current Score</div>
              <Progress
                value={complianceStats.complianceRate}
                className="mt-2 h-2"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span>This Month</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-success" />
                  <span className="font-medium text-success">+2.3%</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Month</span>
                <span className="font-medium">93.9%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Target</span>
                <span className="font-medium">90.0%</span>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="text-xs text-muted-foreground text-center">
                  Performance: Exceeding expectations
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Detail Modal */}
      {selectedItem && (
        <Dialog
          open={!!selectedItem}
          onOpenChange={() => setSelectedItem(null)}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                {getStatusIcon(selectedItem.status)}
                <span>{selectedItem.title}</span>
              </DialogTitle>
              <DialogDescription>
                Compliance task details and current status
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Description</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedItem.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Badge
                    className={`mt-1 ${getStatusColor(selectedItem.status)}`}
                  >
                    {selectedItem.status}
                  </Badge>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Badge
                    className={`mt-1 ${getPriorityColor(
                      selectedItem.priority
                    )}`}
                  >
                    {selectedItem.priority}
                  </Badge>
                </div>
              </div>
              <div>
                <Label>Deadline</Label>
                <p className="text-sm mt-1">
                  {new Date(selectedItem.deadline).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Label>Regulatory Body</Label>
                <p className="text-sm mt-1">{selectedItem.regulatoryBody}</p>
              </div>
              {selectedItem.status === "in-progress" && (
                <div>
                  <Label>Progress</Label>
                  <div className="mt-1">
                    <Progress value={selectedItem.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">
                      {Math.round(selectedItem.progress)}% complete
                    </p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedItem(null)}>
                Close
              </Button>
              {selectedItem.status !== "completed" && (
                <Button
                  onClick={() => {
                    updateTaskStatus(
                      selectedItem.id,
                      selectedItem.status === "upcoming"
                        ? "in-progress"
                        : "completed"
                    );
                    setSelectedItem(null);
                  }}
                >
                  {selectedItem.status === "upcoming"
                    ? "Start Task"
                    : "Mark Complete"}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
