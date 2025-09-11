import { apiClient } from './api.js';

export class TaskService {
  /**
   * Get all tasks with filtering and pagination
   * @param {object} filters - Filter options
   * @returns {Promise<object>} Tasks with pagination info
   */
  async getTasks(filters = {}) {
    try {
      return await apiClient.get('/tasks', filters);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error(`Failed to fetch tasks: ${error.message}`);
    }
  }

  /**
   * Get specific task by ID
   * @param {string} taskId - Task ID
   * @returns {Promise<object>} Task details
   */
  async getTask(taskId) {
    try {
      return await apiClient.get(`/tasks/${taskId}`);
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error(`Failed to fetch task: ${error.message}`);
    }
  }

  /**
   * Create a new task
   * @param {object} taskData - Task data
   * @returns {Promise<object>} Created task
   */
  async createTask(taskData) {
    try {
      return await apiClient.post('/tasks', taskData);
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error(`Failed to create task: ${error.message}`);
    }
  }

  /**
   * Create multiple tasks from action items
   * @param {Array} actionItems - Array of action items
   * @param {string} documentId - Related document ID
   * @returns {Promise<object>} Created tasks
   */
  async createTasksFromActionItems(actionItems, documentId = null) {
    try {
      return await apiClient.post('/tasks/batch', {
        actionItems,
        documentId,
        createdBy: 'AI System'
      });
    } catch (error) {
      console.error('Error creating batch tasks:', error);
      throw new Error(`Failed to create tasks: ${error.message}`);
    }
  }

  /**
   * Update task
   * @param {string} taskId - Task ID
   * @param {object} updateData - Data to update
   * @returns {Promise<object>} Updated task
   */
  async updateTask(taskId, updateData) {
    try {
      return await apiClient.put(`/tasks/${taskId}`, updateData);
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error(`Failed to update task: ${error.message}`);
    }
  }

  /**
   * Update task status
   * @param {string} taskId - Task ID
   * @param {string} status - New status
   * @returns {Promise<object>} Updated task
   */
  async updateTaskStatus(taskId, status) {
    try {
      return await apiClient.patch(`/tasks/${taskId}/status`, { status });
    } catch (error) {
      console.error('Error updating task status:', error);
      throw new Error(`Failed to update task status: ${error.message}`);
    }
  }

  /**
   * Delete task
   * @param {string} taskId - Task ID
   * @returns {Promise<object>} Deletion result
   */
  async deleteTask(taskId) {
    try {
      return await apiClient.delete(`/tasks/${taskId}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error(`Failed to delete task: ${error.message}`);
    }
  }

  /**
   * Get task statistics
   * @returns {Promise<object>} Task statistics
   */
  async getTaskStats() {
    try {
      return await apiClient.get('/tasks/stats/summary');
    } catch (error) {
      console.error('Error fetching task stats:', error);
      throw new Error(`Failed to fetch task statistics: ${error.message}`);
    }
  }

  /**
   * Get tasks by priority
   * @param {string} priority - Priority level
   * @returns {Promise<Array>} Tasks with specified priority
   */
  async getTasksByPriority(priority) {
    try {
      const response = await this.getTasks({ priority });
      return response.tasks;
    } catch (error) {
      console.error('Error fetching tasks by priority:', error);
      throw new Error(`Failed to fetch tasks by priority: ${error.message}`);
    }
  }

  /**
   * Get tasks by department
   * @param {string} department - Department name
   * @returns {Promise<Array>} Tasks for specified department
   */
  async getTasksByDepartment(department) {
    try {
      const response = await this.getTasks({ department });
      return response.tasks;
    } catch (error) {
      console.error('Error fetching tasks by department:', error);
      throw new Error(`Failed to fetch tasks by department: ${error.message}`);
    }
  }

  /**
   * Get overdue tasks
   * @returns {Promise<Array>} Overdue tasks
   */
  async getOverdueTasks() {
    try {
      const response = await this.getTasks();
      const now = new Date();
      
      return response.tasks.filter(task => {
        if (!task.deadline) return false;
        const deadline = new Date(task.deadline);
        return deadline < now && task.status !== 'completed';
      });
    } catch (error) {
      console.error('Error fetching overdue tasks:', error);
      throw new Error(`Failed to fetch overdue tasks: ${error.message}`);
    }
  }
}

export const taskService = new TaskService();
