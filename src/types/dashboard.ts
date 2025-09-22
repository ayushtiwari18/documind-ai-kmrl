// src/types/dashboard.ts
export interface IngestionStats {
  [key: string]: {
    count: number;
    status: "active" | "paused" | "error" | "syncing" | "offline";
    lastSync: string;
  };
}

export interface AIProcessingMetrics {
  classificationAccuracy: number;
  languageDetection: number;
  entityExtraction: number;
  sentimentAnalysis: number;
}

export interface LanguageStats {
  englishCount: number;
  malayalamCount: number;
  mixedCount: number;
  translationAccuracy: number;
}

export interface RecentSummary {
  id: string;
  title: string;
  summary: string;
  confidence: number;
  generatedAt: string;
  category: string;
}

export interface WorkflowMetrics {
  autoRouted: number;
  pendingReview: number;
  escalated: number;
  completed: number;
}

export interface RoutingRule {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "paused";
  documentsRouted: number;
  escalationTime: number;
  successRate: number;
}

export interface ComplianceStats {
  complianceRate: number;
  pendingTasks: number;
  overdueTasks: number;
  completedThisMonth: number;
}

export interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: "completed" | "in-progress" | "overdue" | "upcoming";
  progress: number;
  priority: "high" | "medium" | "low";
  regulatoryBody: string;
}

export interface StatsData {
  documentsToday: number;
  pendingActions: number;
  complianceTasks: number;
  knowledgeSearches: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'active' | 'away' | 'offline';
  lastActive: string;
}

export interface EmployeeStats {
  totalEmployees: number;
  activeEmployees: number;
  departmentDistribution: {
    [key: string]: number;
  };
  recentActivity: Employee[];
}
