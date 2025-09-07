import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Clock, 
  AlertTriangle, 
  Search, 
  Upload, 
  Calendar,
  Users,
  TrendingUp,
  Bell,
  Filter
} from "lucide-react";

const Dashboard = () => {
  const currentTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} userRole="System Administrator" notifications={5} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Good morning, Admin User
              </h1>
              <p className="text-muted-foreground">System Administrator | {currentTime}</p>
            </div>
            
            {/* Quick Stats Bar */}
            <div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm font-medium">Documents Today: 23</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-urgent rounded-full"></div>
                <span className="text-sm font-medium">Pending Actions: 5</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-sm font-medium">Compliance Tasks: 2</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm font-medium">Knowledge Searches: 12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Priority Actions & Compliance */}
          <div className="lg:col-span-3 space-y-6">
            {/* Priority Actions Widget */}
            <Card className="card-dashboard">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <AlertTriangle className="w-5 h-5 text-urgent mr-2" />
                  Requires Your Attention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-foreground">Safety Audit Report</div>
                    <div className="text-xs text-muted-foreground">Due in 2 hours</div>
                  </div>
                  <Badge variant="destructive" className="text-xs">Urgent</Badge>
                </div>
                
                <div className="flex items-start justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-foreground">Vendor Contract Review</div>
                    <div className="text-xs text-muted-foreground">Due tomorrow</div>
                  </div>
                  <Badge className="bg-warning text-warning-foreground text-xs">High</Badge>
                </div>

                <div className="flex items-start justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-foreground">Maintenance Schedule</div>
                    <div className="text-xs text-muted-foreground">Due in 3 days</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">Normal</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Tracker Widget */}
            <Card className="card-dashboard">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="w-5 h-5 text-success mr-2" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Environmental Clearance</span>
                    <span className="text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">5 days remaining</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Fire Safety Audit</span>
                    <span className="text-muted-foreground">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <div className="text-xs text-warning font-medium mt-1">12 days remaining</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Annual Financial Report</span>
                    <span className="text-muted-foreground">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                  <div className="text-xs text-destructive font-medium mt-1">3 days overdue</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Document Stream */}
          <div className="lg:col-span-6 space-y-6">
            {/* Document Stream Widget */}
            <Card className="card-dashboard">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="w-5 h-5 text-primary mr-2" />
                    Recent Documents
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Filter className="w-4 h-4 mr-1" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="card-enterprise p-4 hover-lift">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Station Platform Safety Assessment</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                        <span>PDF Document</span>
                        <span>•</span>
                        <span>Engineering Department</span>
                        <span>•</span>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <Badge className="bg-success/10 text-success border-success">Safety</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    Comprehensive safety assessment covering platform edges, lighting systems, and emergency evacuation procedures. Critical recommendations for immediate implementation highlighted.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">View Full</Button>
                    <Button size="sm" variant="ghost">
                      <Bell className="w-4 h-4 mr-1" />
                      Mark Important
                    </Button>
                  </div>
                </div>

                <div className="card-enterprise p-4 hover-lift">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Quarterly Procurement Report</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                        <span>Excel Spreadsheet</span>
                        <span>•</span>
                        <span>Finance Department</span>
                        <span>•</span>
                        <span>4 hours ago</span>
                      </div>
                    </div>
                    <Badge variant="secondary">Finance</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    Detailed analysis of Q3 procurement activities, vendor performance metrics, and cost optimization opportunities. Budget variance analysis included.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">View Full</Button>
                    <Button size="sm" variant="ghost">Share</Button>
                  </div>
                </div>

                <div className="card-enterprise p-4 hover-lift">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Train Maintenance Schedule Update</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                        <span>Email Thread</span>
                        <span>•</span>
                        <span>Operations Department</span>
                        <span>•</span>
                        <span>6 hours ago</span>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">Operations</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    Updated maintenance schedule for all rolling stock. Critical maintenance windows identified to minimize service disruption during peak hours.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">View Full</Button>
                    <Button size="sm" variant="ghost">Create Reminder</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights Widget */}
            <Card className="card-dashboard">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                  Today's Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="text-sm font-medium text-foreground">Safety Compliance Trend</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      15% increase in safety documentation submissions this month. Platform safety assessments showing improved compliance ratings.
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm font-medium text-foreground">Procurement Efficiency</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Vendor response times improved by 22%. Cost savings of ₹2.3L identified through automated contract analysis.
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm font-medium text-foreground">Maintenance Optimization</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Predictive maintenance alerts reduced unplanned downtime by 18%. Next critical maintenance window: December 15-16.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Department Activity */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Actions Panel */}
            <Card className="card-dashboard">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full btn-hero justify-start">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search Knowledge Base..."
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Report
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Reminder
                </Button>
              </CardContent>
            </Card>

            {/* Department Activity Widget */}
            <Card className="card-dashboard">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Users className="w-5 h-5 text-blue-600 mr-2" />
                  Department Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-medium">Engineering</div>
                    <div className="text-xs text-muted-foreground">8 active users</div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-medium">Operations</div>
                    <div className="text-xs text-muted-foreground">12 active users</div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-medium">Finance</div>
                    <div className="text-xs text-muted-foreground">5 active users</div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-medium">Safety & Compliance</div>
                    <div className="text-xs text-muted-foreground">3 active users</div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dashboard Footer Section */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-muted-foreground">
          <div>
            Recent searches: <span className="text-foreground">safety protocols, vendor invoices, maintenance schedules</span>
          </div>
          <div className="mt-2 md:mt-0 flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
              All systems operational
            </div>
            <a href="/help" className="text-primary hover:underline">Need help? Contact support</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;