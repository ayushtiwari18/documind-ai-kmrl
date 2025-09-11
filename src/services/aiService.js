import { apiClient } from './api.js';

export class AIService {
  /**
   * Summarize text content using Gemini AI
   * @param {string} text - Text content to summarize
   * @param {object} options - Additional options for summarization
   * @returns {Promise<object>} AI summary with action items and metadata
   */
  async summarizeText(text, options = {}) {
    try {
      const response = await apiClient.post('/ai/analyze-text', {
        text,
        options
      });
      
      return response;
    } catch (error) {
      console.error('Error summarizing text:', error);
      throw new Error(`AI summarization failed: ${error.message}`);
    }
  }

  /**
   * Summarize document file using Gemini AI
   * @param {File} file - Document file to summarize
   * @param {object} options - Additional options for summarization
   * @returns {Promise<object>} AI summary with action items and metadata
   */
  async summarizeDocument(file, options = {}) {
    try {
      const response = await apiClient.uploadFile('/ai/summarize', file, { options: JSON.stringify(options) });
      return response;
    } catch (error) {
      console.error('Error summarizing document:', error);
      throw new Error(`Document summarization failed: ${error.message}`);
    }
  }

  /**
   * Process document and automatically create tasks
   * @param {string|File} content - Text content or file to process
   * @param {object} options - Processing options
   * @returns {Promise<object>} Summary with created tasks
   */
  async processAndCreateTasks(content, options = {}) {
    try {
      let summaryResponse;
      
      if (typeof content === 'string') {
        summaryResponse = await this.summarizeText(content, options);
      } else {
        summaryResponse = await this.summarizeDocument(content, options);
      }

      // Automatically create tasks if action items exist
      if (summaryResponse.summary.actionItems && summaryResponse.summary.actionItems.length > 0) {
        const tasksResponse = await apiClient.post('/tasks/batch', {
          actionItems: summaryResponse.summary.actionItems,
          documentId: options.documentId,
          createdBy: 'AI System'
        });

        return {
          ...summaryResponse,
          createdTasks: tasksResponse.tasks,
          taskCount: tasksResponse.tasks.length
        };
      }

      return summaryResponse;
    } catch (error) {
      console.error('Error processing content and creating tasks:', error);
      throw new Error(`Processing failed: ${error.message}`);
    }
  }

  /**
   * Check AI service health
   * @returns {Promise<object>} Health status
   */
  async checkHealth() {
    try {
      return await apiClient.get('/ai/health');
    } catch (error) {
      console.error('Error checking AI health:', error);
      throw new Error(`AI health check failed: ${error.message}`);
    }
  }

  /**
   * Enhanced summarization with KMRL-specific context
   * @param {string|File} content - Content to summarize
   * @param {object} context - KMRL-specific context
   * @returns {Promise<object>} Enhanced summary
   */
  async summarizeWithKMRLContext(content, context = {}) {
    const kmrlOptions = {
      ...context,
      organizationContext: 'Kochi Metro Rail Limited (KMRL)',
      focusAreas: [
        'passenger safety',
        'operational efficiency',
        'compliance requirements',
        'maintenance protocols',
        'emergency procedures'
      ],
      outputFormat: 'kmrl_standard',
      includeRiskAssessment: true,
      generateActionItems: true
    };

    return this.processAndCreateTasks(content, kmrlOptions);
  }
}

export const aiService = new AIService();
