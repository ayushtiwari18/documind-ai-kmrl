import { useState, useCallback } from 'react';
import { aiService } from '@/services/aiService';
import { taskService } from '@/services/taskService';

export const useAISummarization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const [createdTasks, setCreatedTasks] = useState([]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSummary = useCallback(() => {
    setSummary(null);
    setCreatedTasks([]);
  }, []);

  /**
   * Summarize text content and optionally create tasks
   * @param {string} text - Text to summarize
   * @param {object} options - Summarization options
   * @param {boolean} autoCreateTasks - Whether to automatically create tasks
   */
  const summarizeText = useCallback(async (text, options = {}, autoCreateTasks = true) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let result;
      
      if (autoCreateTasks) {
        result = await aiService.processAndCreateTasks(text, options);
        setCreatedTasks(result.createdTasks || []);
      } else {
        result = await aiService.summarizeText(text, options);
        setCreatedTasks([]);
      }
      
      setSummary(result.summary);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Summarize document file and optionally create tasks
   * @param {File} file - Document file to summarize
   * @param {object} options - Summarization options
   * @param {boolean} autoCreateTasks - Whether to automatically create tasks
   */
  const summarizeDocument = useCallback(async (file, options = {}, autoCreateTasks = true) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let result;
      
      if (autoCreateTasks) {
        result = await aiService.processAndCreateTasks(file, options);
        setCreatedTasks(result.createdTasks || []);
      } else {
        result = await aiService.summarizeDocument(file, options);
        setCreatedTasks([]);
      }
      
      setSummary(result.summary);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Summarize with KMRL-specific context
   * @param {string|File} content - Content to summarize
   * @param {object} context - Additional context
   */
  const summarizeWithKMRLContext = useCallback(async (content, context = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await aiService.summarizeWithKMRLContext(content, context);
      setSummary(result.summary);
      setCreatedTasks(result.createdTasks || []);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Create tasks from existing action items
   * @param {Array} actionItems - Action items to convert to tasks
   * @param {string} documentId - Related document ID
   */
  const createTasksFromActionItems = useCallback(async (actionItems, documentId = null) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await taskService.createTasksFromActionItems(actionItems, documentId);
      setCreatedTasks(result.tasks || []);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // State
    isLoading,
    error,
    summary,
    createdTasks,
    
    // Actions
    summarizeText,
    summarizeDocument,
    summarizeWithKMRLContext,
    createTasksFromActionItems,
    clearError,
    clearSummary,
  };
};

export default useAISummarization;
