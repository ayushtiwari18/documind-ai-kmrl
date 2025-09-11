import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Brain,
  FileText,
  Upload,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  Building,
  Sparkles,
  Zap,
  Download,
  Plus
} from 'lucide-react';
import { useAISummarization } from '@/hooks/useAISummarization';

const AISummarizationPanel = ({ onTasksCreated }) => {
  const [inputType, setInputType] = useState('text'); // 'text' or 'file'
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const {
    isLoading,
    error,
    summary,
    createdTasks,
    summarizeText,
    summarizeDocument,
    summarizeWithKMRLContext,
    clearError,
    clearSummary
  } = useAISummarization();

  const handleTextSummarize = async () => {
    if (!textInput.trim()) return;
    
    try {
      await summarizeWithKMRLContext(textInput, {
        documentType: 'Manual Input',
        priority: 'medium'
      });
      
      if (onTasksCreated && createdTasks.length > 0) {
        onTasksCreated(createdTasks);
      }
    } catch (err) {
      console.error('Summarization failed:', err);
    }
  };

  const handleFileSummarize = async () => {
    if (!selectedFile) return;
    
    try {
      await summarizeWithKMRLContext(selectedFile, {
        documentType: selectedFile.type,
        fileName: selectedFile.name,
        priority: 'medium'
      });
      
      if (onTasksCreated && createdTasks.length > 0) {
        onTasksCreated(createdTasks);
      }
    } catch (err) {
      console.error('Document summarization failed:', err);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      clearSummary();
      clearError();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Document Summarization
            <Badge className="bg-purple-100 text-purple-800">Powered by Gemini</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input Type Toggle */}
          <div className="flex gap-2">
            <Button
              variant={inputType === 'text' ? 'default' : 'outline'}
              onClick={() => {
                setInputType('text');
                clearSummary();
                clearError();
              }}
              className="flex-1"
            >
              <FileText className="h-4 w-4 mr-2" />
              Text Input
            </Button>
            <Button
              variant={inputType === 'file' ? 'default' : 'outline'}
              onClick={() => {
                setInputType('file');
                clearSummary();
                clearError();
              }}
              className="flex-1"
            >
              <Upload className="h-4 w-4 mr-2" />
              File Upload
            </Button>
          </div>

          {/* Text Input */}
          {inputType === 'text' && (
            <div className="space-y-4">
              <Textarea
                placeholder="Paste your document content here for AI analysis..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {textInput.length} characters
                </span>
                <Button
                  onClick={handleTextSummarize}
                  disabled={!textInput.trim() || isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {isLoading ? 'Analyzing...' : 'Analyze with AI'}
                </Button>
              </div>
            </div>
          )}

          {/* File Upload */}
          {inputType === 'file' && (
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                {selectedFile ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(selectedFile.size)} • {selectedFile.type}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Click to upload document</p>
                    <p className="text-xs text-muted-foreground">
                      PDF, Word, Excel, PowerPoint, or Text files
                    </p>
                  </div>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                onChange={handleFileSelect}
              />
              
              {selectedFile && (
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFile(null);
                      clearSummary();
                      clearError();
                    }}
                  >
                    Clear File
                  </Button>
                  <Button
                    onClick={handleFileSummarize}
                    disabled={!selectedFile || isLoading}
                    className="flex items-center gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    {isLoading ? 'Processing...' : 'Process Document'}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {error}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearError}
                  className="ml-2"
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Loading Progress */}
          {isLoading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                  AI Processing in progress...
                </span>
                <span className="text-muted-foreground">Please wait</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Results */}
      {summary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                AI Analysis Results
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {summary.confidence}% confidence
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {summary.language}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Executive Summary */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-blue-600" />
                Executive Summary
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {summary.executiveSummary}
              </p>
            </div>

            <Separator />

            {/* Key Points */}
            {summary.keyPoints && summary.keyPoints.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Key Points</h4>
                <ul className="space-y-2">
                  {summary.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Items */}
            {summary.actionItems && summary.actionItems.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    Action Items
                    {createdTasks.length > 0 && (
                      <Badge className="bg-green-100 text-green-800">
                        {createdTasks.length} tasks created
                      </Badge>
                    )}
                  </h4>
                  <div className="space-y-3">
                    {summary.actionItems.map((item, index) => (
                      <div key={index} className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{item.task}</span>
                          <Badge variant={getPriorityColor(item.priority) as any} className="text-xs">
                            {item.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {item.deadline && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Due: {new Date(item.deadline).toLocaleDateString()}
                            </div>
                          )}
                          {item.department && (
                            <div className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {item.department}
                            </div>
                          )}
                          {item.estimatedHours && (
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {item.estimatedHours}h estimated
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Compliance Items */}
            {summary.complianceItems && summary.complianceItems.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3">Compliance Requirements</h4>
                  <div className="space-y-2">
                    {summary.complianceItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Risk Factors */}
            {summary.riskFactors && summary.riskFactors.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Risk Factors
                  </h4>
                  <div className="space-y-2">
                    {summary.riskFactors.map((risk, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span>{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Document Metadata */}
            <Separator />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <div className="font-medium">{summary.documentType}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Urgency:</span>
                <div className="font-medium capitalize">{summary.urgencyLevel}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Language:</span>
                <div className="font-medium">{summary.language}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Confidence:</span>
                <div className="font-medium">{summary.confidence}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Created Tasks Summary */}
      {createdTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-green-600" />
              Automatically Created Tasks
              <Badge className="bg-green-100 text-green-800">
                {createdTasks.length} tasks
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <div className="space-y-3">
                {createdTasks.map((task, index) => (
                  <div key={task.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{task.title}</span>
                      <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Assigned to: {task.assignee} • Department: {task.department}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AISummarizationPanel;
