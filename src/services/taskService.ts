import apiClient from './api';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignee: string;
  department: string;
  deadline: string | null;
  estimatedHours: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  documentId: string | null;
  category: string;
  tags: string[];
}

export interface TaskFilters {
  status?: string;
  priority?: string;
  department?: string;
  assignee?: string;
  category?: string;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: TaskFilters;
  sort: {
    sortBy: string;
    order: string;
  };
}

export interface TaskStats {
  total: number;
  byStatus: {
    pending: number;
    'in-progress': number;
    completed: number;
    cancelled: number;
  };
  byPriority: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  byDepartment: Record<string, number>;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority?: 'critical' | 'high' | 'medium' | 'low';
  assignee?: string;
  department?: string;
  deadline?: string;
  estimatedHours?: number;
  documentId?: string;
  category?: string;
  tags?: string[];
}

export interface BatchCreateTasksRequest {
  actionItems: Array<{
    task: string;
    priority?: string;
    deadline?: string;
    department?: string;
    estimatedHours?: number;
    description?: string;
    assignee?: string;
    category?: string;
    tags?: string[];
  }>;
  documentId?: string;
  createdBy?: string;
}

class TaskService {
  // Get all tasks with filtering and pagination
  async getTasks(filters: TaskFilters = {}): Promise<TasksResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString();
    const endpoint = queryString ? `/tasks?${queryString}` : '/tasks';
    
    return await apiClient.get(endpoint);
  }

  // Get specific task by ID
  async getTask(id: string): Promise<Task> {
    return await apiClient.get(`/tasks/${id}`);
  }

  // Create new task
  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    return await apiClient.post('/tasks', taskData);
  }

  // Create multiple tasks from action items
  async createTasksBatch(request: BatchCreateTasksRequest): Promise<{
    message: string;
    tasks: Task[];
  }> {
    return await apiClient.post('/tasks/batch', request);
  }

  // Update task
  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    return await apiClient.put(`/tasks/${id}`, updates);
  }

  // Update task status only
  async updateTaskStatus(id: string, status: Task['status']): Promise<Task> {
    return await apiClient.patch(`/tasks/${id}/status`, { status });
  }

  // Delete task
  async deleteTask(id: string): Promise<{ message: string; task: Task }> {
    return await apiClient.delete(`/tasks/${id}`);
  }

  // Get task statistics
  async getTaskStats(): Promise<TaskStats> {
    return await apiClient.get('/tasks/stats/summary');
  }

  // Helper methods for common operations
  async getTasksByStatus(status: Task['status']): Promise<Task[]> {
    const response = await this.getTasks({ status });
    return response.tasks;
  }

  async getTasksByPriority(priority: Task['priority']): Promise<Task[]> {
    const response = await this.getTasks({ priority });
    return response.tasks;
  }

  async getTasksByDepartment(department: string): Promise<Task[]> {
    const response = await this.getTasks({ department });
    return response.tasks;
  }

  async getTasksByDocument(documentId: string): Promise<Task[]> {
    const response = await this.getTasks();
    return response.tasks.filter(task => task.documentId === documentId);
  }

  async searchTasks(query: string): Promise<Task[]> {
    const response = await this.getTasks({ search: query });
    return response.tasks;
  }

  // Mark task as completed
  async completeTask(id: string): Promise<Task> {
    return await this.updateTaskStatus(id, 'completed');
  }

  // Start working on task
  async startTask(id: string): Promise<Task> {
    return await this.updateTaskStatus(id, 'in-progress');
  }

  // Cancel task
  async cancelTask(id: string): Promise<Task> {
    return await this.updateTaskStatus(id, 'cancelled');
  }

  // Get overdue tasks
  async getOverdueTasks(): Promise<Task[]> {
    const response = await this.getTasks();
    const now = new Date();
    
    return response.tasks.filter(task => {
      if (!task.deadline || task.status === 'completed' || task.status === 'cancelled') {
        return false;
      }
      return new Date(task.deadline) < now;
    });
  }

  // Get upcoming tasks (due within next 7 days)
  async getUpcomingTasks(days: number = 7): Promise<Task[]> {
    const response = await this.getTasks();
    const now = new Date();
    const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
    
    return response.tasks.filter(task => {
      if (!task.deadline || task.status === 'completed' || task.status === 'cancelled') {
        return false;
      }
      const deadline = new Date(task.deadline);
      return deadline >= now && deadline <= futureDate;
    });
  }

  // Utility function to format task for display
  formatTaskForDisplay(task: Task) {
    return {
      ...task,
      formattedDeadline: task.deadline 
        ? new Date(task.deadline).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        : 'No deadline',
      daysUntilDeadline: task.deadline 
        ? Math.ceil((new Date(task.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : null,
      isOverdue: task.deadline 
        ? new Date(task.deadline) < new Date() && task.status !== 'completed'
        : false
    };
  }
}

export const taskService = new TaskService();
export default taskService;
