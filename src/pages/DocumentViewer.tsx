import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronLeft, 
  Share2, 
  Bell, 
  Star, 
  Download, 
  ExternalLink, 
  Flag,
  Calendar,
  Building,
  FileText,
  Languages,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Tag,
  ZoomIn,
  ZoomOut,
  RotateCw
} from "lucide-react";

const DocumentViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(100);
  const [isStarred, setIsStarred] = useState(false);

  // Mock document data - in real app this would come from API
  const document = {
    id: id || "DOC001",
    title: "Safety Protocol Review - Q4 2024",
    source: "Email - operations@kochimetro.org",
    uploadDate: "15/01/2024",
    type: "Safety Documentation",
    language: "English",
    priority: "High",
    department: "Operations",
    author: "Rajesh Kumar",
    fileSize: "2.4 MB",
    pages: 8,
    summary: {
      executive: "Quarterly safety protocol review highlighting key improvements in passenger safety measures and emergency response procedures.",
      keyPoints: [
        "Implementation of new emergency evacuation protocols across all stations",
        "Updated safety training requirements for all operational staff",
        "Installation of additional safety equipment in tunnel sections",
        "Compliance with latest Metro Railway Safety Standards (MRSS) 2024"
      ],
      actionItems: [
        {
          task: "Complete staff training on new protocols",
          deadline: "28/01/2024",
          assignee: "HR Department",
          priority: "High"
        },
        {
          task: "Install additional safety equipment",
          deadline: "15/02/2024", 
          assignee: "Maintenance Team",
          priority: "Medium"
        }
      ],
      compliance: [
        "MRSS 2024 - Fully Compliant",
        "Fire Safety Regulations - Review Required",
        "Emergency Response Standards - Updated"
      ]
    },
    relatedDocs: [
      { id: "DOC002", title: "Q3 Safety Report", type: "Report" },
      { id: "DOC003", title: "Emergency Response Manual", type: "Manual" },
      { id: "DOC004", title: "Staff Training Records", type: "Records" }
    ]
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="hover:scale-105 transition-transform"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <nav className="text-sm text-muted-foreground">
              <span>Home</span>
              <span className="mx-2">›</span>
              <span>Documents</span>
              <span className="mx-2">›</span>
              <span>Safety</span>
              <span className="mx-2">›</span>
              <span className="text-foreground">{document.title}</span>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Document Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{document.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {document.source}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {document.uploadDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {document.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <Languages className="h-4 w-4" />
                        {document.language}
                      </div>
                    </div>
                  </div>
                  <Badge variant={getPriorityColor(document.priority) as any}>
                    {document.priority}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <Badge variant="outline">
                    <Tag className="h-3 w-3 mr-1" />
                    {document.department}
                  </Badge>
                  <Badge variant="outline">
                    <User className="h-3 w-3 mr-1" />
                    {document.author}
                  </Badge>
                  <Badge variant="outline">
                    {document.fileSize} • {document.pages} pages
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* AI Summary Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  AI Summary & Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Executive Summary */}
                <div>
                  <h4 className="font-semibold mb-2">Executive Summary</h4>
                  <p className="text-muted-foreground">{document.summary.executive}</p>
                </div>

                <Separator />

                {/* Key Points */}
                <div>
                  <h4 className="font-semibold mb-3">Key Points</h4>
                  <ul className="space-y-2">
                    {document.summary.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Action Items */}
                <div>
                  <h4 className="font-semibold mb-3">Action Items</h4>
                  <div className="space-y-3">
                    {document.summary.actionItems.map((item, index) => (
                      <div key={index} className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{item.task}</span>
                          <Badge variant={getPriorityColor(item.priority) as any} className="text-xs">
                            {item.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Due: {item.deadline}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {item.assignee}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Compliance Requirements */}
                <div>
                  <h4 className="font-semibold mb-3">Compliance Status</h4>
                  <div className="space-y-2">
                    {document.summary.compliance.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Viewer */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Document Preview</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleZoomOut}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">{zoom}%</span>
                    <Button variant="outline" size="sm" onClick={handleZoomIn}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <RotateCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-8 text-center min-h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Document preview would be displayed here
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      PDF viewer with zoom: {zoom}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setIsStarred(!isStarred)}
                >
                  <Star className={`h-4 w-4 mr-2 ${isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  {isStarred ? 'Remove Bookmark' : 'Mark Important'}
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Document
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Create Reminder
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Summary
                </Button>
                
                <Separator />
                
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  <Flag className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>

            {/* Related Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48">
                  <div className="space-y-3">
                    {document.relatedDocs.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{doc.title}</p>
                          <p className="text-xs text-muted-foreground">{doc.type}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Document Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">File Size:</span>
                  <span>{document.fileSize}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pages:</span>
                  <span>{document.pages}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Uploaded:</span>
                  <span>{document.uploadDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Views:</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Modified:</span>
                  <span>2 hours ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentViewer;