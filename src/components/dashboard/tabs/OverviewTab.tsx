// src/components/dashboard/tabs/OverviewTab.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  AlertTriangle,
  Database,
  Activity,
  Search,
  CheckCircle,
  Brain,
  Mail,
  Languages,
  Clock,
  Eye,
  Share,
  Upload,
  MessageSquare,
  Route,
  Shield,
  BarChart3,
  RefreshCw,
  Bell,
  Zap,
  TrendingUp,
  Filter,
  Settings,
  FileText,
  Users,
  Target,
  Sparkles,
  AlertCircle,
  Play,
  Pause,
  MoreHorizontal,
  Calendar,
  CheckSquare,
  ArrowRight
} from "lucide-react";

interface WorkflowMetrics {
  escalated: number;
  completed?: number;
  pending?: number;
  autoRouted?: number;
}

interface OverviewTabProps {
  workflowMetrics: WorkflowMetrics;
  processingQueue: number;
}

interface LiveDocument {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  status: 'processing' | 'completed' | 'routing' | 'urgent';
  aiConfidence: number;
  summary: string;
  department: string;
  language: string;
  priority: 'normal' | 'high' | 'urgent';
}

interface CriticalAction {
  id: string;
  title: string;
  department: string;
  priority: 'critical' | 'high' | 'medium';
  timeLeft: string;
  description: string;
  status: 'pending' | 'in-progress' | 'escalated';
}

export const OverviewTab = ({
  workflowMetrics: initialMetrics,
  processingQueue: initialQueue,
}: OverviewTabProps) => {
  // State management
  const [workflowMetrics, setWorkflowMetrics] = useState(initialMetrics);
  const [processingQueue, setProcessingQueue] = useState(initialQueue);
  const [liveDocuments, setLiveDocuments] = useState<LiveDocument[]>([]);
  const [criticalActions, setCriticalActions] = useState<CriticalAction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [classificationAccuracy, setClassificationAccuracy] = useState(96.8);
  const [routingSuccess, setRoutingSuccess] = useState(94.2);
  const [knowledgeBaseCount, setKnowledgeBaseCount] = useState(12437);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedDocument, setSelectedDocument] = useState<LiveDocument | null>(null);

  // Initialize critical actions
  useEffect(() => {
    setCriticalActions([
      {
        id: "1",
        title: "Safety Audit Report - Platform 3",
        department: "Engineering Department",
        priority: "critical",
        timeLeft: "47 minutes",
        description: "Emergency repair needed for platform edge detection system. Service disruption imminent.",
        status: "escalated"
      },
      {
        id: "2",
        title: "Vendor Payment Authorization",
        department: "Finance Department", 
        priority: "high",
        timeLeft: "1 day",
        description: "₹15.6L payment to M/s Electrical Solutions requires CFO approval.",
        status: "pending"
      },
      {
        id: "3",
        title: "Environmental Compliance Report",
        department: "Compliance Team",
        priority: "medium", 
        timeLeft: "3 days",
        description: "Quarterly environmental impact assessment for regulatory submission.",
        status: "in-progress"
      }
    ]);
  }, []);

  // Real-time document stream simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new documents arriving
      if (Math.random() < 0.3) {
        const newDoc: LiveDocument = {
          id: `doc_${Date.now()}`,
          title: getRandomDocumentTitle(),
          source: getRandomSource(),
          timestamp: new Date().toISOString(),
          status: Math.random() < 0.8 ? 'completed' : 'processing',
          aiConfidence: Math.floor(Math.random() * 15) + 85,
          summary: getRandomSummary(),
          department: getRandomDepartment(),
          language: Math.random() < 0.8 ? 'English' : Math.random() < 0.5 ? 'Malayalam' : 'Mixed',
          priority: Math.random() < 0.1 ? 'urgent' : Math.random() < 0.3 ? 'high' : 'normal'
        };
        
        setLiveDocuments(prev => [newDoc, ...prev.slice(0, 4)]);
        
        if (newDoc.priority === 'urgent') {
          setNotifications(prev => [...prev, `🚨 Urgent document received: ${newDoc.title}`]);
        }
      }

      // Update metrics with slight variations
      setClassificationAccuracy(prev => Math.max(94, Math.min(99, prev + (Math.random() - 0.5) * 0.5)));
      setRoutingSuccess(prev => Math.max(90, Math.min(98, prev + (Math.random() - 0.5) * 0.3)));
      setProcessingQueue(prev => Math.max(0, prev + (Math.random() < 0.5 ? -1 : 1)));
      setKnowledgeBaseCount(prev => prev + (Math.random() < 0.3 ? 1 : 0));

      // Update critical action time remaining
      setCriticalActions(prev => prev.map(action => {
        if (action.id === "1" && Math.random() < 0.1) {
          const newTimeLeft = Math.max(10, parseInt(action.timeLeft) - Math.floor(Math.random() * 3));
          return { ...action, timeLeft: `${newTimeLeft} minutes` };
        }
        return action;
      }));

      setLastUpdated(new Date());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Search functionality simulation
  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const mockResults = [
          "Safety Protocol SOP-2024-15",
          "Emergency Response Manual v3.2", 
          "Platform Maintenance Guidelines",
          "Fire Safety Procedures - Updated",
          "Vendor Contract Template",
          "Staff Training Module - Safety"
        ].filter(result => 
          result.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(mockResults);
        setIsSearching(false);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchTerm]);

  // Auto-clear notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  // Helper functions
  const getRandomDocumentTitle = () => {
    const titles = [
      "Track Inspection Report - Line 2",
      "Monthly Safety Compliance Update",
      "Electrical System Maintenance Log",
      "Passenger Complaint Analysis",
      "Station Security Protocol Update", 
      "Equipment Purchase Request",
      "Staff Performance Review",
      "Environmental Impact Assessment",
      "Budget Allocation Proposal",
      "Infrastructure Upgrade Plan"
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomSource = () => {
    const sources = ['Email', 'SharePoint', 'Maximo', 'WhatsApp', 'Manual'];
    return sources[Math.floor(Math.random() * sources.length)];
  };

  const getRandomSummary = () => {
    const summaries = [
      "Key findings indicate optimal performance with minor maintenance recommendations.",
      "Critical safety updates require immediate staff training and protocol updates.",
      "Financial analysis shows cost-saving opportunities in equipment procurement.",
      "Operational metrics demonstrate improved efficiency across all stations.",
      "Compliance review identifies areas for improvement in regulatory adherence."
    ];
    return summaries[Math.floor(Math.random() * summaries.length)];
  };

  const getRandomDepartment = () => {
    const departments = ['Engineering', 'Operations', 'Finance', 'Safety', 'Maintenance', 'Administration'];
    return departments[Math.floor(Math.random() * departments.length)];
  };

  const handleActionComplete = (actionId: string) => {
    setCriticalActions(prev => prev.map(action => 
      action.id === actionId ? { ...action, status: 'in-progress' } : action
    ));
    setNotifications(prev => [...prev, "✅ Action item updated successfully"]);
  };

  const handleDocumentView = (doc: LiveDocument) => {
    setSelectedDocument(doc);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': case 'urgent': return 'status-urgent';
      case 'high': return 'status-warning'; 
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'status-success';
      case 'processing': return 'status-warning';
      case 'routing': return 'bg-purple-100 text-purple-800';
      case 'urgent': return 'status-urgent';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Notifications */}
      {notifications.length > 0 && (
        <Alert className="border-blue-200 bg-blue-50">
          <Bell className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Live Updates</AlertTitle>
          <AlertDescription className="text-blue-700">
            {notifications[0]}
          </AlertDescription>
        </Alert>
      )}

      {/* Header with Live Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-primary animate-pulse" />
          <h2 className="text-xl font-semibold text-foreground">Command Center Overview</h2>
          <Badge className="bg-success/10 text-success">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-1"></div>
            Live
          </Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </div>
          <Badge className="bg-primary/10 text-primary">
            Queue: {processingQueue} items
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column - Enhanced Priority Actions & Knowledge Search */}
        <div className="lg:col-span-4 space-y-6">
          {/* Enhanced Critical Actions */}
          <Card className="card-dashboard">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-urgent mr-2 animate-pulse" />
                  Critical Actions
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive">{workflowMetrics.escalated}</Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {criticalActions.map((action) => (
                <div
                  key={action.id}
                  className={`p-4 rounded-lg border-l-4 transition-all duration-300 hover:shadow-md ${
                    action.priority === 'critical' 
                      ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-500'
                      : action.priority === 'high'
                      ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-500' 
                      : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-foreground mb-1">
                        {action.title}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {action.department}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(action.priority)}>
                        {action.priority}
                      </Badge>
                      {action.status === 'escalated' && (
                        <AlertTriangle className="w-4 h-4 text-urgent animate-pulse" />
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {action.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className={`text-xs font-medium ${
                        action.priority === 'critical' 
                          ? 'text-red-600' 
                          : action.priority === 'high' 
                          ? 'text-yellow-600' 
                          : 'text-blue-600'
                      }`}>
                        Due in {action.timeLeft}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        className="text-xs"
                        onClick={() => handleDocumentView({
                          id: action.id,
                          title: action.title,
                          source: 'Internal',
                          timestamp: new Date().toISOString(),
                          status: 'urgent',
                          aiConfidence: 95,
                          summary: action.description,
                          department: action.department,
                          language: 'English',
                          priority: action.priority as any
                        })}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Review
                      </Button>
                      {action.status === 'pending' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs"
                          onClick={() => handleActionComplete(action.id)}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Enhanced Knowledge Search */}
          <Card className="card-dashboard">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Database className="w-5 h-5 text-indigo-500 mr-2" />
                  AI Knowledge Search
                </div>
                <Badge className="bg-indigo-100 text-indigo-800 text-xs">
                  Smart
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search institutional knowledge..."
                  className="pl-10 bg-gradient-to-r from-background to-muted/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {isSearching && (
                  <RefreshCw className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-primary" />
                )}
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {searchResults.map((result, index) => (
                    <div 
                      key={index}
                      className="p-2 text-xs bg-accent rounded hover:bg-accent/80 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center">
                        <FileText className="w-3 h-3 mr-2 text-primary" />
                        {result}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Popular searches today:
                </div>
                <div className="flex flex-wrap gap-1">
                  {["safety protocols", "vendor contracts", "maintenance SOPs", "compliance reports"].map((term) => (
                    <Badge
                      key={term}
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setSearchTerm(term)}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Knowledge base: {knowledgeBaseCount.toLocaleString()} documents
                  </div>
                  <div>Updated 2 min ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Column - Enhanced Live Document Stream */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="card-dashboard">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 text-primary mr-2" />
                  Live Document Stream
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Live Processing</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Live Document Cards */}
              {liveDocuments.map((doc, index) => (
                <div 
                  key={doc.id}
                  className={`card-enterprise p-4 hover-lift border-l-4 transition-all duration-300 ${
                    index === 0 ? 'border-l-green-500 ring-2 ring-green-100' : 'border-l-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-foreground">
                          {doc.title}
                        </h4>
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {doc.status === 'processing' && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
                          {doc.status}
                        </Badge>
                        {index === 0 && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <Sparkles className="w-3 h-3 mr-1" />
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                        <Mail className="w-3 h-3" />
                        <span>From {doc.source}</span>
                        <span>•</span>
                        <Languages className="w-3 h-3" />
                        <span>{doc.language}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{new Date(doc.timestamp).toLocaleTimeString('en-IN', { 
                          timeZone: 'Asia/Kolkata',
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg mb-3">
                    <div className="flex items-center mb-2">
                      <Brain className="w-4 h-4 text-purple-600 mr-2" />
                      <span className="text-sm font-medium text-purple-600">
                        AI Analysis
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {doc.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-orange-100 text-orange-800 text-xs">
                        Auto-routed to {doc.department}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {doc.aiConfidence}% confidence
                      </Badge>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDocumentView(doc)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {liveDocuments.length === 0 && (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Monitoring Document Stream
                  </h3>
                  <p className="text-muted-foreground">
                    New documents will appear here as they're processed by AI.
                  </p>
                </div>
              )}

              <div className="text-center py-4">
                <Button variant="outline" size="sm" className="group">
                  <Activity className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  View Live Processing Queue ({processingQueue} items)
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Enhanced Quick Actions & Live Metrics */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="card-dashboard">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                Smart Actions
                <Zap className="w-4 h-4 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full btn-hero justify-start group">
                <Upload className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Upload Document
                <Badge className="ml-auto bg-white/20">AI Ready</Badge>
              </Button>

              <Button className="w-full btn-success justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Generate Report
                <Sparkles className="w-3 h-3 ml-auto" />
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Route className="w-4 h-4 mr-2" />
                Setup Routing Rule
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Compliance Check
              </Button>

              <div className="pt-2">
                <Button variant="ghost" className="w-full text-xs text-muted-foreground">
                  <Settings className="w-3 h-3 mr-2" />
                  More Actions...
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card-dashboard">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                  Live Metrics
                </div>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Classification</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-bold text-success">
                      {classificationAccuracy.toFixed(1)}%
                    </span>
                    <TrendingUp className="w-3 h-3 text-success" />
                  </div>
                </div>
                <Progress value={classificationAccuracy} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-routing Success</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-bold text-purple-600">
                      {routingSuccess.toFixed(1)}%
                    </span>
                    <Target className="w-3 h-3 text-purple-600" />
                  </div>
                </div>
                <Progress value={routingSuccess} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Health</span>
                  <span className="text-sm font-bold text-success">98.5%</span>
                </div>
                <Progress value={98.5} className="h-2" />
              </div>

              <div className="pt-2 border-t border-border">
                <div className="text-xs text-muted-foreground text-center flex items-center justify-center">
                  <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                  Updated every 30 seconds
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="card-dashboard bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-primary">
                    {(workflowMetrics.autoRouted || 234)}
                  </div>
                  <div className="text-xs text-muted-foreground">Auto-routed</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-success">
                    {(workflowMetrics.completed || 189)}
                  </div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Document Detail Modal */}
      {selectedDocument && (
        <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>{selectedDocument.title}</span>
              </DialogTitle>
              <DialogDescription>
                Document processed by AI with {selectedDocument.aiConfidence}% confidence
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Source</div>
                  <div className="text-sm text-muted-foreground">{selectedDocument.source}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Department</div>
                  <div className="text-sm text-muted-foreground">{selectedDocument.department}</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">AI Summary</div>
                <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">{selectedDocument.summary}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(selectedDocument.status)}>
                  {selectedDocument.status}
                </Badge>
                <Badge className={getPriorityColor(selectedDocument.priority)}>
                  {selectedDocument.priority}
                </Badge>
                <Badge variant="outline">
                  {selectedDocument.aiConfidence}% confidence
                </Badge>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                Close
              </Button>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Open Full Document
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
