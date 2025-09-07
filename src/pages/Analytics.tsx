import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Zap
} from "lucide-react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");

  // Mock analytics data
  const metrics = {
    totalDocuments: 15420,
    avgProcessingTime: "2.3 minutes",
    complianceScore: 94,
    userEngagement: 87,
    documentsToday: 156,
    pendingActions: 23,
    complianceDeadlines: 8
  };

  const documentVolumeData = [
    { day: "Mon", count: 245 },
    { day: "Tue", count: 189 },
    { day: "Wed", count: 312 },
    { day: "Thu", count: 278 },
    { day: "Fri", count: 425 },
    { day: "Sat", count: 89 },
    { day: "Sun", count: 67 }
  ];

  const categoryData = [
    { category: "Safety Reports", count: 3240, percentage: 35 },
    { category: "Financial", count: 2160, percentage: 23 },
    { category: "Operations", count: 1944, percentage: 21 },
    { category: "Maintenance", count: 1080, percentage: 12 },
    { category: "HR", count: 648, percentage: 7 },
    { category: "Others", count: 348, percentage: 2 }
  ];

  const departmentActivity = [
    { department: "Operations", processed: 4200, pending: 12 },
    { department: "Safety", processed: 3800, pending: 8 },
    { department: "Finance", processed: 2400, pending: 15 },
    { department: "Maintenance", processed: 2100, pending: 6 },
    { department: "HR", processed: 1200, pending: 4 }
  ];

  const complianceItems = [
    { 
      title: "Fire Safety Annual Review", 
      deadline: "2024-02-15", 
      progress: 75, 
      risk: "medium",
      daysLeft: 12
    },
    { 
      title: "Environmental Impact Assessment", 
      deadline: "2024-01-28", 
      progress: 90, 
      risk: "low",
      daysLeft: 5
    },
    { 
      title: "Staff Training Compliance", 
      deadline: "2024-01-25", 
      progress: 45, 
      risk: "high",
      daysLeft: 2
    },
    { 
      title: "Vendor Contract Renewals", 
      deadline: "2024-02-28", 
      progress: 20, 
      risk: "medium",
      daysLeft: 25
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  const getRiskTextColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Reports</h1>
            <p className="text-muted-foreground mt-2">
              Monitor document processing performance and compliance metrics
            </p>
          </div>
          
          <div className="flex items-center gap-3">
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
            
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalDocuments.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.avgProcessingTime}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                15% faster than last month
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.complianceScore}%</div>
              <div className="flex items-center text-xs text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Excellent rating
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Engagement</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.userEngagement}%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Activity className="h-3 w-3 mr-1" />
                +3% from last week
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Document Volume Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Document Volume (Last 7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documentVolumeData.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-12 text-sm text-muted-foreground">{item.day}</div>
                        <div className="flex-1">
                          <div className="bg-primary/10 rounded-full h-6 relative overflow-hidden">
                            <div 
                              className="bg-primary h-full rounded-full transition-all duration-500"
                              style={{ width: `${(item.count / 450) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-16 text-sm font-medium text-right">{item.count}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Document Categories</CardTitle>
                  <CardDescription>Distribution by document type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{item.category}</span>
                          <span className="font-medium">{item.count}</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Processing Performance</CardTitle>
                  <CardDescription>Document processing metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Chart visualization would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Today's Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Documents Processed</span>
                    <Badge variant="outline">{metrics.documentsToday}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pending Actions</span>
                    <Badge variant="secondary">{metrics.pendingActions}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compliance Items</span>
                    <Badge variant="outline">{metrics.complianceDeadlines}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Classifications</span>
                    <Badge variant="outline">142</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Activity</CardTitle>
                <CardDescription>Document processing by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {departmentActivity.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{dept.department}</span>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-green-600">
                            {dept.processed} processed
                          </span>
                          <span className="text-yellow-600">
                            {dept.pending} pending
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Progress 
                          value={(dept.processed / (dept.processed + dept.pending)) * 100} 
                          className="h-2 flex-1" 
                        />
                      </div>
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
                    <Shield className="h-5 w-5" />
                    Compliance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {metrics.complianceScore}%
                      </div>
                      <p className="text-muted-foreground">Overall Compliance Score</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">85</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-600">12</div>
                        <div className="text-xs text-muted-foreground">In Progress</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">3</div>
                        <div className="text-xs text-muted-foreground">Overdue</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complianceItems.map((item, index) => (
                      <div key={index} className="space-y-2 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              Due: {item.deadline} ({item.daysLeft} days left)
                            </p>
                          </div>
                          <Badge variant={getRiskColor(item.risk) as any} className="text-xs">
                            {item.risk} risk
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-1.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analytics;