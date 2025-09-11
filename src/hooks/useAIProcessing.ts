import { useState, useCallback } from 'react';
import { aiService, AISummaryResponse } from '@/services/aiService';
import { taskService, Task } from '@/services/taskService';

interface AIProcessingState {
  isProcessing: boolean;
  progress: number;
  currentStep: string;
  error: string | null;
  summary: AISummaryResponse | null;
  tasks: Task[];
}

interface ProcessingOptions {
  autoCreateTasks?: boolean;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  department?: string;
  assignToUsers?: boolean;
}

export const useAIProcessing = () => {
  const [state, setState] = useState<AIProcessingState>({
    isProcessing: false,
    progress: 0,
    currentStep: '',
    error: null,
    summary: null,
    tasks: []
  });

  const updateState = useCallback((updates: Partial<AIProcessingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const resetState = useCallback(() => {
    setState({
      isProcessing: false,
      progress: 0,
      currentStep: '',
      error: null,
      summary: null,
      tasks: []
    });
  }, []);

  const processDocument = useCallback(async (
    file: File,
    options: ProcessingOptions = {}
  ): Promise<{
    summary: AISummaryResponse;
    tasks: Task[];
  } | null> => {
    const { autoCreateTasks = true, priority = 'medium', department, assignToUsers = false } = options;

    try {
      resetState();
      updateState({ 
        isProcessing: true, 
        progress: 10, 
        currentStep: 'Uploading document...' 
      });

      // Step 1: Validate file
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        throw new Error('File size exceeds 10MB limit');
      }

      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain'
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error('Unsupported file type. Please upload PDF, Word, Excel, or text files.');
      }

      updateState({ 
        progress: 25, 
        currentStep: 'Analyzing document with AI...' 
      });

      // Step 2: Get AI summary
      const summary = await aiService.summarizeDocument(file, {
        extractActionItems: autoCreateTasks
      });

      updateState({ 
        progress: 60, 
        currentStep: 'Processing summary results...',
        summary 
      });

      let tasks: Task[] = [];

      // Step 3: Create tasks if requested and action items exist
      if (autoCreateTasks && summary.summary.actionItems?.length > 0) {
        updateState({ 
          progress: 75, 
          currentStep: 'Creating tasks from action items...' 
        });

        try {
          const taskResponse = await taskService.createTasksBatch({
            actionItems: summary.summary.actionItems.map(item => ({
              ...item,
              priority: item.priority || priority,
              department: item.department || department || 'General'
            })),
            documentId: summary.id,
            createdBy: 'AI System'
          });

          tasks = taskResponse.tasks;

          updateState({ 
            progress: 90, 
            currentStep: 'Finalizing task assignments...',
            tasks 
          });
        } catch (taskError) {
          console.warn('Failed to create tasks:', taskError);
          // Continue processing even if task creation fails
        }
      }

      updateState({ 
        progress: 100, 
        currentStep: 'Processing complete!',
        isProcessing: false 
      });

      return { summary, tasks };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error('Document processing error:', error);
      
      updateState({ 
        isProcessing: false, 
        error: errorMessage,
        progress: 0,
        currentStep: 'Processing failed' 
      });

      return null;
    }
  }, [resetState, updateState]);

  const processText = useCallback(async (
    text: string,
    options: ProcessingOptions = {}
  ): Promise<{
    summary: AISummaryResponse;
    tasks: Task[];
  } | null> => {
    const { autoCreateTasks = true, priority = 'medium', department } = options;

    try {
      resetState();
      updateState({ 
        isProcessing: true, 
        progress: 20, 
        currentStep: 'Analyzing text with AI...' 
      });

      if (!text.trim()) {
        throw new Error('Text content is required');
      }

      // Step 1: Get AI summary
      const summary = await aiService.summarizeText(text, {
        extractActionItems: autoCreateTasks
      });

      updateState({ 
        progress: 60, 
        currentStep: 'Processing summary results...',
        summary 
      });

      let tasks: Task[] = [];

      // Step 2: Create tasks if requested
      if (autoCreateTasks && summary.summary.actionItems?.length > 0) {
        updateState({ 
          progress: 80, 
          currentStep: 'Creating tasks from action items...' 
        });

        try {
          const taskResponse = await taskService.createTasksBatch({
            actionItems: summary.summary.actionItems.map(item => ({
              ...item,
              priority: item.priority || priority,
              department: item.department || department || 'General'
            })),
            documentId: summary.id,
            createdBy: 'AI System'
          });

          tasks = taskResponse.tasks;
          updateState({ tasks });
        } catch (taskError) {
          console.warn('Failed to create tasks:', taskError);
        }
      }

      updateState({ 
        progress: 100, 
        currentStep: 'Processing complete!',
        isProcessing: false 
      });

      return { summary, tasks };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error('Text processing error:', error);
      
      updateState({ 
        isProcessing: false, 
        error: errorMessage,
        progress: 0,
        currentStep: 'Processing failed' 
      });

      return null;
    }
  }, [resetState, updateState]);

  const checkAIHealth = useCallback(async () => {
    try {
      const health = await aiService.checkHealth();
      return health;
    } catch (error) {
      console.error('AI health check failed:', error);
      return {
        status: 'unhealthy' as const,
        geminiConnected: false,
        message: 'Failed to connect to AI service',
        model: 'unknown',
        timestamp: new Date().toISOString()
      };
    }
  }, []);

  return {
    // State
    isProcessing: state.isProcessing,
    progress: state.progress,
    currentStep: state.currentStep,
    error: state.error,
    summary: state.summary,
    tasks: state.tasks,

    // Actions
    processDocument,
    processText,
    resetState,
    checkAIHealth
  };
};
