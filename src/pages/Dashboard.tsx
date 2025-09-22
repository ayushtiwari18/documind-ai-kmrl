// src/pages/Dashboard.tsx (Updated)
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AISystemHealth } from "@/components/dashboard/AISystemHealth";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import type {
  IngestionStats,
  AIProcessingMetrics,
  LanguageStats,
  RecentSummary,
  WorkflowMetrics,
  RoutingRule,
  ComplianceStats,
  ComplianceItem,
  StatsData,
  EmployeeStats,
} from "@/types/dashboard";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Complete mock data with proper typing
  const mockData = {
    statsData: {
      documentsToday: 23,
      pendingActions: 5,
      complianceTasks: 2,
      knowledgeSearches: 127,
    } as StatsData,

    ingestionStats: {
      email: { count: 156, status: "active", lastSync: "2 min ago" },
      whatsapp: { count: 23, status: "active", lastSync: "5 min ago" },
      sharepoint: { count: 89, status: "syncing", lastSync: "1 min ago" },
      maximo: { count: 34, status: "active", lastSync: "3 min ago" },
      manual: { count: 12, status: "active", lastSync: "Just now" },
    } as IngestionStats,

    aiProcessingMetrics: {
      classificationAccuracy: 96.8,
      languageDetection: 99.2,
      entityExtraction: 94.5,
      sentimentAnalysis: 91.3,
    } as AIProcessingMetrics,

    languageStats: {
      englishCount: 187,
      malayalamCount: 43,
      mixedCount: 84,
      translationAccuracy: 97.8,
    } as LanguageStats,

    recentSummaries: [
      {
        id: "1",
        title: "Track Inspection Findings - Line 2",
        summary:
          "Critical Issues: Rail joint wear detected at 3 locations. Recommended Action: Schedule maintenance within 48 hours. Impact Assessment: Potential 15% speed restriction if not addressed.",
        confidence: 95,
        generatedAt: new Date(Date.now() - 300000).toISOString(),
        category: "Engineering Report",
      },
      {
        id: "2",
        title: "Emergency Response Protocol Update",
        summary:
          "Key Updates: New fire evacuation procedures for Stations 8-12. Action Required: Staff training by Dec 20. Priority Level: High - affects 45,000 daily passengers.",
        confidence: 98,
        generatedAt: new Date(Date.now() - 600000).toISOString(),
        category: "Safety Document",
      },
    ] as RecentSummary[],

    workflowMetrics: {
      autoRouted: 234,
      pendingReview: 8,
      escalated: 3,
      completed: 189,
    } as WorkflowMetrics,

    routingRules: [
      {
        id: "1",
        name: "Safety Documents → Safety Team",
        description:
          "Auto-route safety bulletins, incident reports → Safety Officers (2h escalation)",
        status: "active" as const,
        documentsRouted: 89,
        escalationTime: 2,
        successRate: 96,
      },
      {
        id: "2",
        name: "Financial Documents → Finance Team",
        description:
          "Invoices, budget reports → Finance Department (24h escalation)",
        status: "active" as const,
        documentsRouted: 67,
        escalationTime: 24,
        successRate: 94,
      },
      {
        id: "3",
        name: "Regulatory Updates → Compliance",
        description:
          "Government circulars → Compliance Team + Management (4h escalation)",
        status: "active" as const,
        documentsRouted: 34,
        escalationTime: 4,
        successRate: 98,
      },
    ] as RoutingRule[],

    complianceStats: {
      complianceRate: 95.2,
      pendingTasks: 7,
      overdueTasks: 2,
      completedThisMonth: 18,
    } as ComplianceStats,

    employeeStats: {
      totalEmployees: 245,
      activeEmployees: 182,
      departmentDistribution: {
        "Operations": 85,
        "Engineering": 65,
        "Safety": 25,
        "Administration": 35,
        "Finance": 20,
        "IT": 15
      },
      recentActivity: [
        {
          id: "1",
          name: "John Smith",
          role: "Senior Engineer",
          department: "Engineering",
          status: "active",
          lastActive: "Just now"
        },
        {
          id: "2",
          name: "Mary Johnson",
          role: "Safety Officer",
          department: "Safety",
          status: "active",
          lastActive: "5 min ago"
        },
        {
          id: "3",
          name: "Raj Patel",
          role: "Operations Manager",
          department: "Operations",
          status: "away",
          lastActive: "15 min ago"
        },
        {
          id: "4",
          name: "Sarah Lee",
          role: "Financial Analyst",
          department: "Finance",
          status: "active",
          lastActive: "2 min ago"
        },
        {
          id: "5",
          name: "James Wilson",
          role: "IT Specialist",
          department: "IT",
          status: "offline",
          lastActive: "1 hour ago"
        }
      ]
    } as EmployeeStats,

    upcomingItems: [
      {
        id: "1",
        title: "Fire Safety Audit",
        description:
          "Annual fire safety audit report submission to Municipal Corporation",
        deadline: "2025-01-10",
        status: "overdue" as const,
        progress: 85,
        priority: "high" as const,
        regulatoryBody: "Municipal Corporation",
      },
      {
        id: "2",
        title: "Environmental Clearance",
        description: "Quarterly environmental impact assessment report",
        deadline: "2025-01-20",
        status: "in-progress" as const,
        progress: 85,
        priority: "medium" as const,
        regulatoryBody: "Environmental Authority",
      },
      {
        id: "3",
        title: "Safety Training Records",
        description: "Monthly staff safety training completion report",
        deadline: "2025-01-25",
        status: "upcoming" as const,
        progress: 45,
        priority: "low" as const,
        regulatoryBody: "Metro Rail Safety Commission",
      },
    ] as ComplianceItem[],
  };

  return (
    <div className="min-h-screen bg-gradient-subtle-bg">
      <Navigation
        isLoggedIn={true}
        userRole="System Administrator"
        notifications={7}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          currentTime={currentTime}
          userRole="System Administrator"
          userName="Admin User"
          statsData={mockData.statsData}
        />

        <AISystemHealth
          activeIngestionSources={4}
          aiAccuracy={mockData.aiProcessingMetrics.classificationAccuracy}
          summariesGenerated={98}
          autoRouted={mockData.workflowMetrics.autoRouted}
          knowledgeBase="12.4K"
          complianceItems={45}
        />

        <DashboardTabs
          ingestionStats={mockData.ingestionStats}
          aiMetrics={mockData.aiProcessingMetrics}
          languageStats={mockData.languageStats}
          recentSummaries={mockData.recentSummaries}
          workflowMetrics={mockData.workflowMetrics}
          routingRules={mockData.routingRules}
          complianceStats={mockData.complianceStats}
          upcomingItems={mockData.upcomingItems}
          processingQueue={12}
          employeeStats={mockData.employeeStats}
        />

        <DashboardFooter />
      </main>
    </div>
  );
};

export default Dashboard;
