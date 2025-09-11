import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  RotateCw,
  Brain,
  Sparkles,
  RefreshCw,
  Plus
} from 'lucide-react';
import AISummarizationPanel from '@/components/AISummarizationPanel';
import { useAISummarization } from '@/hooks/useAISummarization';

const EnhancedDocumentViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(100);
  const [isStarred, setIsStarred] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    summarizeText,
    summary,
    isLoading: aiLoading,
    error: aiError,
    createdTasks
  } = useAISummarization();

  // Mock document data - in real app this would come from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDocument({
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
        content: `QUARTERLY SAFETY PROTOCOL REVIEW - Q4 2024

Executive Summary:
This document presents the quarterly review of safety protocols implemented across the Kochi Metro Rail Limited (KMRL) network during Q4 2024. The review encompasses passenger safety measures, emergency response procedures, and operational safety standards.

Key Findings:
1. Implementation of new emergency evacuation protocols across all stations has been completed successfully
2. Updated safety training requirements for all operational staff are now in effect
3. Installation of additional safety equipment in tunnel sections is 80% complete
4. Full compliance achieved with latest Metro Railway Safety Standards (MRSS) 2024

Critical Action Items:
- Complete remaining staff training on new protocols by January 28, 2024
- Finish installation of additional safety equipment by February 15, 2024
- Review and update fire safety regulations as per new standards
- Conduct comprehensive emergency response drill at all stations

Compliance Status:
- MRSS 2024: Fully Compliant
- Fire Safety Regulations: Review Required
- Emergency Response Standards: Updated

Risk Assessment:
- Medium risk identified in tunnel ventilation systems during peak hours
- Low risk in passenger boarding procedures during rush hours
- High priority for completing safety equipment installation

Recommendations:
1. Accelerate safety equipment installation timeline
2. Increase frequency of safety training sessions
3. Implement real-time monitoring of tunnel ventilation systems
4. Establish dedicated emergency response teams at each station`,
        summary: null,
        relatedDocs: [
          { id: "DOC002", title: "Q3 Safety Report", type: "Report" },
          { id: "DOC003", title: "Emergency Response Manual", type: "Manual" },
          { id: "DOC004", title: "Staff Training Records", type: "Records" }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const handleAISummarize = async () => {
    if (!document?.content) return;
    
    try {
      await summarizeText(document.content, {
        documentId: document.id,
        documentType: document.type,
        department: document.department,
        priority: document.priority.toLowerCase()
      });
    } catch (error) {
      console.error('AI summarization failed:', error);
    }
  };

  const handleTasksCreated = (tasks) => {
    console.log('Tasks created:', tasks);
    // You could show a notification or update the UI here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Loading document...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Document not found. Please check the document ID and try again.
            </AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

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

          <div className="flex items-center gap-2">
            <Button
              variant={showAIPanel ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAIPanel(!showAIPanel)}
            >
              <Brain className="h-4 w-4 mr-2" />
              AI Analysis
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className={`${showAIPanel ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
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
                  <Badge variant={getPriorityColor(document.priority)}>{document.priority}</Badge>
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
            {(summary || aiLoading) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    AI Analysis Results
                    {aiLoading && <RefreshCw className="h-4 w-4 animate-spin" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {aiLoading && (
                    <div className="text-center py-8">
                      <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-pulse" />
                      <p className="text-muted-foreground">AI is analyzing the document...</p>
                    </div>
                  )}

                  {summary && !aiLoading && (
                    <>
                      {/* Executive Summary */}
                      <div>
                        <h4 className="font-semibold mb-2">AI Executive Summary</h4>
                        <p className="text-muted-foreground">{summary.executiveSummary}</p>
                      </div>

                      <Separator />

                      {/* Key Points */}
                      {summary.keyPoints && summary.keyPoints.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3">Key Points</h4>
                          <ul className="space-y-2">
                            {summary.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Auto-generated Tasks */}
                      {createdTasks.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Plus className="h-4 w-4 text-green-600" />
                              Auto-generated Tasks
                              <Badge className="bg-green-100 text-green-800">
                                {createdTasks.length} created
                              </Badge>
                            </h4>
                            <div className="space-y-2">
                              {createdTasks.slice(0, 3).map((task, index) => (
                                <div key={task.id} className="bg-green-50 p-3 rounded-lg border border-green-200">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-sm">{task.title}</span>
                                    <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                                      {task.priority}
                                    </Badge>
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {task.assignee} • {task.department}
                                  </div>
                                </div>
                              ))}
                              {createdTasks.length > 3 && (
                                <p className="text-sm text-muted-foreground text-center">
                                  +{createdTasks.length - 3} more tasks created
                                </p>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {aiError && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{aiError}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Document Content */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Document Content</CardTitle>
                  <div className="flex items-center gap-2">
                    {!summary && !aiLoading && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAISummarize}
                        className="flex items-center gap-2"
                      >
                        <Sparkles className="h-4 w-4" />
                        Analyze with AI
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={handleZoomOut}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">{zoom}%</span>
                    <Button variant="outline" size="sm" onClick={handleZoomIn}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                    {document.content}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Panel */}
          {showAIPanel && (
            <div className="lg:col-span-1 space-y-6">
              <AISummarizationPanel onTasksCreated={handleTasksCreated} />
            </div>
          )}

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

export default EnhancedDocumentViewer;
