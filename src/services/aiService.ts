import apiClient from './api';

export interface AISummaryRequest {
  text?: string;
  options?: {
    language?: 'english' | 'malayalam' | 'mixed';
    summaryType?: 'executive' | 'detailed' | 'technical';
    extractActionItems?: boolean;
  };
}

export interface AISummaryResponse {
  id: string;
  summary: {
    executiveSummary: string;
    keyPoints: string[];
    actionItems: Array<{
      task: string;
      priority: 'high' | 'medium' | 'low';
      deadline: string;
      department: string;
      estimatedHours: number;
    }>;
    complianceItems: string[];
    riskFactors: string[];
    recommendations: string[];
    categories: string[];
    confidence: string;
    language: string;
    documentType: string;
    urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  metadata: {
    originalLength: number;
    generatedAt: string;
    model: string;
    processingTime: number;
  };
}

export interface AIHealthResponse {
  status: 'healthy' | 'unhealthy';
  geminiConnected: boolean;
  message: string;
  model: string;
  timestamp: string;
}

class AIService {
  // Summarize document by uploading file
  async summarizeDocument(file: File, options?: AISummaryRequest['options']): Promise<AISummaryResponse> {
    const formData = new FormData();
    formData.append('document', file);
    
    if (options) {
      formData.append('options', JSON.stringify(options));
    }

    return await apiClient.upload('/ai/summarize', formData);
  }

  // Summarize raw text
  async summarizeText(text: string, options?: AISummaryRequest['options']): Promise<AISummaryResponse> {
    return await apiClient.post('/ai/analyze-text', { text, options });
  }

  // Check AI service health
  async checkHealth(): Promise<AIHealthResponse> {
    return await apiClient.get('/ai/health');
  }

  // Process document and automatically create tasks
  async processDocumentWithTasks(file: File, createTasks: boolean = true): Promise<{
    summary: AISummaryResponse;
    tasks?: any[];
  }> {
    try {
      // First, get the AI summary
      const summary = await this.summarizeDocument(file);
      
      let tasks: any[] = [];
      
      // If createTasks is true and we have action items, create tasks
      if (createTasks && summary.summary.actionItems?.length > 0) {
        try {
          const taskResponse = await apiClient.post('/tasks/batch', {
            actionItems: summary.summary.actionItems,
            documentId: summary.id,
            createdBy: 'AI System'
          });
          tasks = taskResponse.tasks || [];
        } catch (taskError) {
          console.warn('Failed to create tasks from action items:', taskError);
          // Continue even if task creation fails
        }
      }

      return {
        summary,
        ...(tasks.length > 0 && { tasks })
      };
    } catch (error) {
      console.error('Error processing document with tasks:', error);
      throw error;
    }
  }

  // Enhanced processing with workflow integration
  async processWithWorkflow(
    file: File,
    options: {
      autoCreateTasks?: boolean;
      assignToUsers?: boolean;
      priority?: 'low' | 'medium' | 'high' | 'critical';
      department?: string;
    } = {}
  ): Promise<{
    summary: AISummaryResponse;
    tasks: any[];
    workflow: any;
  }> {
    const {
      autoCreateTasks = true,
      assignToUsers = false,
      priority = 'medium',
      department
    } = options;

    try {
      const result = await this.processDocumentWithTasks(file, autoCreateTasks);
      
      // Create workflow entry
      const workflow = {
        id: `workflow_${Date.now()}`,
        documentId: result.summary.id,
        status: 'active',
        steps: [
          {
            name: 'Document Analysis',
            status: 'completed',
            completedAt: new Date().toISOString()
          },
          ...(result.tasks?.length > 0 ? [{
            name: 'Task Creation',
            status: 'completed',
            completedAt: new Date().toISOString()
          }] : []),
          ...(assignToUsers ? [{
            name: 'Task Assignment',
            status: 'pending'
          }] : [])
        ],
        createdAt: new Date().toISOString(),
        priority,
        department
      };

      return {
        summary: result.summary,
        tasks: result.tasks || [],
        workflow
      };
    } catch (error) {
      console.error('Error processing with workflow:', error);
      throw error;
    }
  }
}

export const aiService = new AIService();
export default aiService;
