// src/components/dashboard/DashboardHeader.tsx
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, Clock, Search } from "lucide-react";

interface StatsData {
  documentsToday: number;
  pendingActions: number;
  complianceTasks: number;
  knowledgeSearches: number;
}

interface DashboardHeaderProps {
  currentTime: Date;
  userRole: string;
  userName: string;
  statsData: StatsData;
}

export const DashboardHeader = ({
  currentTime,
  userRole,
  userName,
  statsData,
}: DashboardHeaderProps) => {
  const timeString = currentTime.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            Good morning, {userName}
          </h1>
          <p className="text-muted-foreground flex items-center">
            <Badge className="bg-primary/10 text-primary mr-2">
              {userRole}
            </Badge>
            {timeString}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 lg:mt-0">
          <div className="card-dashboard p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {statsData.documentsToday}
            </div>
            <div className="text-xs text-muted-foreground">Documents Today</div>
            <div className="flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 text-success mr-1" />
              <span className="text-xs text-success">+12%</span>
            </div>
          </div>

          <div className="card-dashboard p-4 text-center">
            <div className="text-2xl font-bold text-urgent">
              {statsData.pendingActions}
            </div>
            <div className="text-xs text-muted-foreground">Pending Actions</div>
            <div className="flex items-center justify-center mt-1">
              <AlertTriangle className="w-3 h-3 text-urgent mr-1" />
              <span className="text-xs text-urgent">Urgent</span>
            </div>
          </div>

          <div className="card-dashboard p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {statsData.complianceTasks}
            </div>
            <div className="text-xs text-muted-foreground">
              Compliance Tasks
            </div>
            <div className="flex items-center justify-center mt-1">
              <Clock className="w-3 h-3 text-warning mr-1" />
              <span className="text-xs text-warning">Due Soon</span>
            </div>
          </div>

          <div className="card-dashboard p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {statsData.knowledgeSearches}
            </div>
            <div className="text-xs text-muted-foreground">
              Knowledge Searches
            </div>
            <div className="flex items-center justify-center mt-1">
              <Search className="w-3 h-3 text-primary mr-1" />
              <span className="text-xs text-primary">Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
