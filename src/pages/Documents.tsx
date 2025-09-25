// src/pages/Documents.tsx (Enhanced with CRUD)
import { useState, useEffect } from "react";
import apiClient from "@/services/api";
import { Link } from "react-router-dom";
import {
  FileText,
  Filter,
  Search,
  Upload,
  Calendar,
  Tag,
  Star,
  Clock,
  AlertTriangle,
  Eye,
  Share,
  Download,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  CheckSquare,
  Square,
  MoreHorizontal,
  Brain,
  Languages,
  Mail,
  Cloud,
  Settings,
  Smartphone,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Document {
  id: string;
  title: string;
  type: string;
  source: string;
  uploadDate: string;
  priority: "normal" | "high" | "urgent";
  status: "processed" | "pending" | "failed";
  summary: string | {
    executiveSummary: string;
    keyPoints: string[];
    actionItems: any[];
    complianceItems: string[];
    confidence: string;
    documentType: string;
  };
  department: string;
  author?: string;
  fileSize: string;
  language: string;
  aiConfidence?: number;
  extractedEntities?: string[];
  tags?: string[];
  lastModified?: string;
  modifiedBy?: string;
  version?: number;
}

// Mock API Functions
const mockAPI = {
  // GET - Fetch all documents
  getDocuments: async (filters?: any): Promise<Document[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay
    return mockDocuments.filter((doc) => {
      if (
        filters?.search &&
        !doc.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (
        filters?.type &&
        filters.type !== "all" &&
        doc.type !== filters.type
      ) {
        return false;
      }
      if (
        filters?.priority &&
        filters.priority !== "all" &&
        doc.priority !== filters.priority
      ) {
        return false;
      }
      return true;
    });
  },

  // POST - Create new document
  createDocument: async (
    documentData: Partial<Document>
  ): Promise<Document> => {
    await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate AI processing
    const newDoc: Document = {
      id: `doc_${Date.now()}`,
      title: documentData.title || "Untitled Document",
      type: documentData.type || "General",
      source: "Manual Upload",
      uploadDate: new Date().toISOString().split("T")[0],
      priority: documentData.priority || "normal",
      status: "processed",
      summary:
        documentData.summary || "AI-generated summary will appear here...",
      department: documentData.department || "General",
      fileSize: "1.2 MB",
      language: "English",
      aiConfidence: Math.floor(Math.random() * 20) + 80, // 80-100%
      extractedEntities: ["Date", "Amount", "Department"],
      tags: documentData.tags || [],
      lastModified: new Date().toISOString(),
      modifiedBy: "Current User",
      version: 1,
    };
    mockDocuments.unshift(newDoc);
    return newDoc;
  },

  // PUT - Update existing document
  updateDocument: async (
    id: string,
    updates: Partial<Document>
  ): Promise<Document> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const docIndex = mockDocuments.findIndex((doc) => doc.id === id);
    if (docIndex === -1) throw new Error("Document not found");

    mockDocuments[docIndex] = {
      ...mockDocuments[docIndex],
      ...updates,
      lastModified: new Date().toISOString(),
      modifiedBy: "Current User",
      version: (mockDocuments[docIndex].version || 1) + 1,
    };
    return mockDocuments[docIndex];
  },

  // DELETE - Remove document
  deleteDocument: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const index = mockDocuments.findIndex((doc) => doc.id === id);
    if (index === -1) throw new Error("Document not found");
    mockDocuments.splice(index, 1);
  },

  // Bulk operations
  bulkDelete: async (ids: string[]): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    ids.forEach((id) => {
      const index = mockDocuments.findIndex((doc) => doc.id === id);
      if (index !== -1) mockDocuments.splice(index, 1);
    });
  },
};

// Enhanced mock data with more fields
const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Metro Safety Protocol Update - January 2025",
    type: "Safety Document",
    source: "Email",
    uploadDate: "2025-01-15",
    priority: "urgent",
    status: "processed",
    summary:
      "Updated safety protocols for metro operations including new emergency procedures and passenger safety guidelines.",
    department: "Operations",
    fileSize: "2.3 MB",
    language: "English",
    aiConfidence: 96,
    extractedEntities: [
      "Emergency Procedures",
      "Safety Guidelines",
      "Operations",
    ],
    tags: ["safety", "protocol", "emergency"],
    lastModified: "2025-01-15T10:30:00Z",
    modifiedBy: "Safety Officer",
    version: 2,
  },
  {
    id: "2",
    title: "Vendor Invoice - Electrical Maintenance",
    type: "Financial Document",
    source: "SharePoint",
    uploadDate: "2025-01-14",
    priority: "normal",
    status: "processed",
    summary:
      "Invoice for electrical maintenance work completed on Line 1 stations. Amount: ₹45,000.",
    department: "Finance",
    fileSize: "856 KB",
    language: "English",
    aiConfidence: 94,
    extractedEntities: ["₹45,000", "Line 1", "Electrical Maintenance"],
    tags: ["invoice", "maintenance", "electrical"],
    lastModified: "2025-01-14T15:45:00Z",
    modifiedBy: "Finance Manager",
    version: 1,
  },
  {
    id: "3",
    title: "പാസഞ്ജർ പരാതി റിപ്പോർട്ട്",
    type: "Compliance Report",
    source: "Maximo",
    uploadDate: "2025-01-13",
    priority: "high",
    status: "pending",
    summary:
      "Monthly passenger complaint report with analysis and proposed resolution actions.",
    department: "Customer Service",
    fileSize: "1.2 MB",
    language: "Malayalam",
    aiConfidence: 91,
    extractedEntities: ["Passenger Complaints", "Monthly Report", "Resolution"],
    tags: ["complaints", "monthly", "malayalam"],
    lastModified: "2025-01-13T09:15:00Z",
    modifiedBy: "Customer Service Head",
    version: 1,
  },
];

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [deletingDoc, setDeletingDoc] = useState<Document | null>(null);

  // Form states
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form data for create/edit
  const [formData, setFormData] = useState<{
    title: string;
    type: string;
    department: string;
    priority: "normal" | "high" | "urgent";
    summary: string;
  tags: string;
  author?: string;
  file?: File | null;
  }>({
    title: "",
    type: "",
    department: "",
    priority: "normal",
    summary: "",
  tags: "",
  author: "",
  file: null,
  });

  // Load documents on component mount
  useEffect(() => {
    loadDocuments();
  }, [searchTerm, filterType, filterPriority, sortBy]);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const filters = {
        search: searchTerm,
        type: filterType,
        priority: filterPriority,
      };
      const docs = await mockAPI.getDocuments(filters);

      // Apply sorting
      const sortedDocs = [...docs].sort((a, b) => {
        switch (sortBy) {
          case "title":
            return a.title.localeCompare(b.title);
          case "priority":
            const priorityOrder = { urgent: 3, high: 2, normal: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          case "type":
            return a.type.localeCompare(b.type);
          default: // date
            return (
              new Date(b.uploadDate).getTime() -
              new Date(a.uploadDate).getTime()
            );
        }
      });

      setDocuments(sortedDocs);
    } catch (err) {
      setError("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  // CRUD Operations
  const handleCreate = async () => {
    if (!formData.title.trim() || !formData.file) {
      setError("Document title and file are required");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const uploadForm = new FormData();
      uploadForm.append('title', formData.title);
      uploadForm.append('type', formData.type || 'General');
      uploadForm.append('department', formData.department || 'General');
      uploadForm.append('priority', formData.priority || 'normal');
      uploadForm.append('author', formData.author || 'Unknown');
      uploadForm.append('tags', formData.tags);
      // Ensure file input is handled
      if (formData.file instanceof File) {
        uploadForm.append('document', formData.file);
      } else {
        setError("Please select a valid file.");
        setIsProcessing(false);
        return;
      }

      const response = await apiClient.upload('/documents/upload', uploadForm);
      const newDoc = response.document;

      setDocuments((prev) => [newDoc, ...prev]);
      setSuccess("Document uploaded and summarized successfully!");
      setIsCreateOpen(false);
      resetForm();
    } catch (err) {
      setError("Failed to upload document");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEdit = async () => {
    if (!editingDoc || !formData.title.trim()) {
      setError("Document title is required");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const updatedDoc = await mockAPI.updateDocument(editingDoc.id, {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      setDocuments((prev) =>
        prev.map((doc) => (doc.id === editingDoc.id ? updatedDoc : doc))
      );
      setSuccess("Document updated successfully!");
      setIsEditOpen(false);
      setEditingDoc(null);
      resetForm();
    } catch (err) {
      setError("Failed to update document");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingDoc) return;

    setIsProcessing(true);
    setError(null);

    try {
      await mockAPI.deleteDocument(deletingDoc.id);
      setDocuments((prev) => prev.filter((doc) => doc.id !== deletingDoc.id));
      setSuccess("Document deleted successfully!");
      setIsDeleteOpen(false);
      setDeletingDoc(null);
    } catch (err) {
      setError("Failed to delete document");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedDocs.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      await mockAPI.bulkDelete(selectedDocs);
      setDocuments((prev) =>
        prev.filter((doc) => !selectedDocs.includes(doc.id))
      );
      setSuccess(`${selectedDocs.length} documents deleted successfully!`);
      setSelectedDocs([]);
      setIsBulkDeleteOpen(false);
    } catch (err) {
      setError("Failed to delete documents");
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper functions
  const resetForm = () => {
    setFormData({
      title: "",
      type: "",
      department: "",
      priority: "normal",
      summary: "",
  tags: "",
  author: "",
  file: null,
    });
  };

  const openEditDialog = (doc: Document) => {
    setEditingDoc(doc);
    setFormData({
      title: doc.title,
      type: doc.type,
      department: doc.department,
      priority: doc.priority,
      summary: typeof doc.summary === 'string' ? doc.summary : doc.summary?.executiveSummary || '',
      tags: doc.tags?.join(", ") || "",
      author: doc.author || "",
      file: null,
    });
    setIsEditOpen(true);
  };

  const openDeleteDialog = (doc: Document) => {
    setDeletingDoc(doc);
    setIsDeleteOpen(true);
  };

  const toggleDocSelection = (docId: string) => {
    setSelectedDocs((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    );
  };

  const selectAllDocs = () => {
    setSelectedDocs(
      documents.length === selectedDocs.length
        ? []
        : documents.map((doc) => doc.id)
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "status-urgent";
      case "high":
        return "status-warning";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed":
        return "status-success";
      case "pending":
        return "status-warning";
      case "failed":
        return "status-urgent";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case "email":
        return <Mail className="w-4 h-4" />;
      case "sharepoint":
        return <Cloud className="w-4 h-4" />;
      case "maximo":
        return <Settings className="w-4 h-4" />;
      case "whatsapp":
        return <Smartphone className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // Clear alerts after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-subtle-bg">
      <Navigation
        isLoggedIn={true}
        userRole="Document Manager"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Error</AlertTitle>
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                Intelligent Document Management
              </h1>
              <p className="text-muted-foreground flex items-center">
                <Brain className="w-4 h-4 mr-2 text-purple-500" />
                AI-powered organization and processing for all KMRL documents
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {selectedDocs.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={() => setIsBulkDeleteOpen(true)}
                  className="flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected ({selectedDocs.length})
                </Button>
              )}

              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-hero">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Document</DialogTitle>
                    <DialogDescription>
                      Create a new document entry. AI will process and
                      categorize it automatically.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="file">Document File *</Label>
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                        onChange={(e) => {
                          const file = e.target.files && e.target.files[0];
                          setFormData((prev) => ({ ...prev, file: file || null }));
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Document Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Enter document title..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, author: e.target.value }))
                        }
                        placeholder="Enter author name..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type">Type</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, type: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Safety Document">
                              Safety Document
                            </SelectItem>
                            <SelectItem value="Financial Document">
                              Financial Document
                            </SelectItem>
                            <SelectItem value="Compliance Report">
                              Compliance Report
                            </SelectItem>
                            <SelectItem value="Maintenance Record">
                              Maintenance Record
                            </SelectItem>
                            <SelectItem value="General">General</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              department: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Operations">
                              Operations
                            </SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Engineering">
                              Engineering
                            </SelectItem>
                            <SelectItem value="Customer Service">
                              Customer Service
                            </SelectItem>
                            <SelectItem value="Safety">Safety</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value: any) =>
                          setFormData((prev) => ({ ...prev, priority: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="summary">Summary</Label>
                      <Textarea
                        id="summary"
                        value={formData.summary}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            summary: e.target.value,
                          }))
                        }
                        placeholder="Brief description of the document..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tags: e.target.value,
                          }))
                        }
                        placeholder="safety, protocol, urgent..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateOpen(false)}
                      disabled={isProcessing}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreate}
                      disabled={isProcessing}
                      className="btn-success"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Create Document
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="processing">AI Processing</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="card-dashboard hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <FileText className="w-8 h-8 text-primary mr-3" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          1,247
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total Documents
                        </div>
                        <div className="text-xs text-success">
                          +12% this month
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-dashboard hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Clock className="w-8 h-8 text-warning mr-3" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          23
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Pending Review
                        </div>
                        <div className="text-xs text-warning">3 urgent</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-dashboard hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Brain className="w-8 h-8 text-purple-500 mr-3" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          96.8%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          AI Accuracy
                        </div>
                        <div className="text-xs text-success">Above target</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-dashboard hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Star className="w-8 h-8 text-success mr-3" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          156
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Favorites
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Your starred items
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="processing" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="card-dashboard">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Classification Accuracy
                      </span>
                      <span className="text-sm font-bold text-primary">
                        96.8%
                      </span>
                    </div>
                    <Progress value={96.8} className="h-2 mb-2" />
                    <div className="text-xs text-muted-foreground">
                      Documents auto-classified today: 234
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-dashboard">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Language Detection
                      </span>
                      <span className="text-sm font-bold text-success">
                        99.2%
                      </span>
                    </div>
                    <Progress value={99.2} className="h-2 mb-2" />
                    <div className="text-xs text-muted-foreground">
                      <Languages className="w-3 h-3 inline mr-1" />
                      English: 187, Malayalam: 43, Mixed: 84
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-dashboard">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Processing Speed
                      </span>
                      <span className="text-sm font-bold text-purple-600">
                        2.3s
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Average processing time
                    </div>
                    <div className="text-xs text-success">
                      15% faster than last week
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sources" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  {
                    name: "Email",
                    count: 156,
                    icon: Mail,
                    color: "text-blue-500",
                    status: "active",
                  },
                  {
                    name: "SharePoint",
                    count: 89,
                    icon: Cloud,
                    color: "text-purple-500",
                    status: "active",
                  },
                  {
                    name: "Maximo",
                    count: 34,
                    icon: Settings,
                    color: "text-orange-500",
                    status: "syncing",
                  },
                  {
                    name: "WhatsApp",
                    count: 23,
                    icon: Smartphone,
                    color: "text-green-500",
                    status: "active",
                  },
                  {
                    name: "Manual",
                    count: 12,
                    icon: Upload,
                    color: "text-indigo-500",
                    status: "active",
                  },
                ].map((source) => (
                  <Card
                    key={source.name}
                    className="card-dashboard text-center"
                  >
                    <CardContent className="p-4">
                      <source.icon
                        className={`w-6 h-6 ${source.color} mx-auto mb-2`}
                      />
                      <div className="text-lg font-bold">{source.count}</div>
                      <div className="text-sm text-muted-foreground">
                        {source.name}
                      </div>
                      <Badge
                        className={`mt-1 text-xs ${
                          source.status === "active"
                            ? "status-success"
                            : "status-warning"
                        }`}
                      >
                        {source.status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="card-dashboard text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-success mb-1">
                      87%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Auto-routing Success
                    </div>
                    <div className="text-xs text-success">
                      Documents routed correctly
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-dashboard text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">
                      2.1m
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Data Processed
                    </div>
                    <div className="text-xs text-muted-foreground">
                      This month
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-dashboard text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      42s
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg. Response Time
                    </div>
                    <div className="text-xs text-success">18% improvement</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="card-enterprise mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents with AI..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80 bg-gradient-to-r from-background to-muted/20"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={loadDocuments}
                  disabled={loading}
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                {documents.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={selectAllDocs}
                    className="flex items-center"
                  >
                    {selectedDocs.length === documents.length ? (
                      <CheckSquare className="w-4 h-4 mr-1" />
                    ) : (
                      <Square className="w-4 h-4 mr-1" />
                    )}
                    Select All
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Safety Document">
                    Safety Document
                  </SelectItem>
                  <SelectItem value="Financial Document">
                    Financial Document
                  </SelectItem>
                  <SelectItem value="Compliance Report">
                    Compliance Report
                  </SelectItem>
                  <SelectItem value="Maintenance Record">
                    Maintenance Record
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Upload Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="type">Document Type</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  List
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Documents List */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading documents...</p>
          </div>
        ) : documents.length === 0 ? (
          <Card className="card-enterprise text-center py-12">
            <CardContent>
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No documents found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterType !== "all" || filterPriority !== "all"
                  ? "Try adjusting your search criteria or filters."
                  : "Get started by uploading your first document."}
              </p>
              <Button
                className="btn-hero"
                onClick={() => setIsCreateOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Document
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {documents.map((doc) => (
              <Card key={doc.id} className="card-enterprise hover-lift group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 flex-1">
                      <div
                        className="cursor-pointer"
                        onClick={() => toggleDocSelection(doc.id)}
                      >
                        {selectedDocs.includes(doc.id) ? (
                          <CheckSquare className="w-5 h-5 text-primary" />
                        ) : (
                          <Square className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getSourceIcon(doc.source)}
                          <Link
                            to={`/documents/${doc.id}`}
                            className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                          >
                            {doc.title}
                          </Link>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge className={getPriorityColor(doc.priority)}>
                            {doc.priority}
                          </Badge>
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                          {doc.aiConfidence && (
                            <Badge variant="outline" className="text-xs">
                              <Brain className="w-3 h-3 mr-1" />
                              {doc.aiConfidence}% confident
                            </Badge>
                          )}
                          {doc.language === "Malayalam" && (
                            <Badge variant="outline" className="text-xs">
                              <Languages className="w-3 h-3 mr-1" />
                              മലയാളം
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link
                            to={`/documents/${doc.id}`}
                            className="flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(doc)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Document
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="w-4 h-4 mr-2" />
                          Add to Favorites
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(doc)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {typeof doc.summary === 'string' ? doc.summary : doc.summary?.executiveSummary || 'No summary available'}
                  </p>

                  {doc.extractedEntities &&
                    doc.extractedEntities.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground mb-2 flex items-center">
                          <Brain className="w-3 h-3 mr-1" />
                          AI Extracted:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {doc.extractedEntities
                            .slice(0, 3)
                            .map((entity, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {entity}
                              </Badge>
                            ))}
                          {doc.extractedEntities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{doc.extractedEntities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {doc.type}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </div>
                    <div>Dept: {doc.department}</div>
                    <div>{doc.fileSize}</div>
                    {doc.version && (
                      <div className="ml-auto">v{doc.version}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        {documents.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="group">
              <RefreshCw className="w-4 h-4 mr-2 group-hover:animate-spin" />
              Load More Documents
            </Button>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Document</DialogTitle>
              <DialogDescription>
                Update document information. AI will reprocess if content
                changes.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Document Title *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter document title..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Safety Document">
                        Safety Document
                      </SelectItem>
                      <SelectItem value="Financial Document">
                        Financial Document
                      </SelectItem>
                      <SelectItem value="Compliance Report">
                        Compliance Report
                      </SelectItem>
                      <SelectItem value="Maintenance Record">
                        Maintenance Record
                      </SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, department: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Customer Service">
                        Customer Service
                      </SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: any) =>
                    setFormData((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-summary">Summary</Label>
                <Textarea
                  id="edit-summary"
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      summary: e.target.value,
                    }))
                  }
                  placeholder="Brief description of the document..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
                <Input
                  id="edit-tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tags: e.target.value }))
                  }
                  placeholder="safety, protocol, urgent..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditOpen(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEdit}
                disabled={isProcessing}
                className="btn-success"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Update Document
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center text-red-600">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Delete Document
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{deletingDoc?.title}"? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteOpen(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Document
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Bulk Delete Confirmation Dialog */}
        <Dialog open={isBulkDeleteOpen} onOpenChange={setIsBulkDeleteOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center text-red-600">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Delete Multiple Documents
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedDocs.length} selected
                documents? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsBulkDeleteOpen(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete {selectedDocs.length} Documents
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Documents;
