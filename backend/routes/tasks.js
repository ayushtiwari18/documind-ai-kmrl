import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory storage for tasks (in production, use a database)
let tasks = [
  {
    id: '1',
    title: 'Complete staff training on new protocols',
    description: 'Conduct comprehensive training for all operational staff on new safety protocols',
    priority: 'high',
    status: 'pending',
    assignee: 'HR Department',
    department: 'Human Resources',
    deadline: '2024-01-28T00:00:00.000Z',
    estimatedHours: 40,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z',
    createdBy: 'AI System',
    documentId: 'DOC001',
    category: 'Training',
    tags: ['safety', 'training', 'protocols']
  },
  {
    id: '2',
    title: 'Install additional safety equipment',
    description: 'Install new safety equipment in tunnel sections as per safety review recommendations',
    priority: 'medium',
    status: 'in-progress',
    assignee: 'Maintenance Team',
    department: 'Maintenance',
    deadline: '2024-02-15T00:00:00.000Z',
    estimatedHours: 80,
    createdAt: '2024-01-15T11:00:00.000Z',
    updatedAt: '2024-01-20T14:30:00.000Z',
    createdBy: 'AI System',
    documentId: 'DOC001',
    category: 'Maintenance',
    tags: ['safety', 'equipment', 'tunnel']
  }
];

// GET /api/tasks - Get all tasks with optional filtering
router.get('/', (req, res) => {
  try {
    const {
      status,
      priority,
      department,
      assignee,
      category,
      search,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 50
    } = req.query;

    let filteredTasks = [...tasks];

    // Apply filters
    if (status) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }
    if (priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }
    if (department) {
      filteredTasks = filteredTasks.filter(task => 
        task.department.toLowerCase().includes(department.toLowerCase())
      );
    }
    if (assignee) {
      filteredTasks = filteredTasks.filter(task => 
        task.assignee.toLowerCase().includes(assignee.toLowerCase())
      );
    }
    if (category) {
      filteredTasks = filteredTasks.filter(task => task.category === category);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    filteredTasks.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'priority') {
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[a.priority];
        bValue = priorityOrder[b.priority];
      }

      if (order === 'desc') {
        return aValue > bValue ? -1 : 1;
      }
      return aValue < bValue ? -1 : 1;
    });

    // Apply pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    res.json({
      tasks: paginatedTasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredTasks.length,
        totalPages: Math.ceil(filteredTasks.length / parseInt(limit))
      },
      filters: { status, priority, department, assignee, category, search },
      sort: { sortBy, order }
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      error: 'Failed to fetch tasks'
    });
  }
});

// GET /api/tasks/:id - Get specific task
router.get('/:id', (req, res) => {
  try {
    const task = tasks.find(t => t.id === req.params.id);
    
    if (!task) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({
      error: 'Failed to fetch task'
    });
  }
});

// POST /api/tasks - Create new task
router.post('/', (req, res) => {
  try {
    const {
      title,
      description,
      priority = 'medium',
      assignee,
      department,
      deadline,
      estimatedHours,
      documentId,
      category,
      tags = []
    } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        error: 'Title and description are required'
      });
    }

    const newTask = {
      id: uuidv4(),
      title,
      description,
      priority,
      status: 'pending',
      assignee: assignee || 'Unassigned',
      department: department || 'General',
      deadline: deadline || null,
      estimatedHours: estimatedHours || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: req.body.createdBy || 'AI System',
      documentId: documentId || null,
      category: category || 'General',
      tags: Array.isArray(tags) ? tags : []
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      error: 'Failed to create task'
    });
  }
});

// POST /api/tasks/batch - Create multiple tasks from AI analysis
router.post('/batch', (req, res) => {
  try {
    const { actionItems, documentId, createdBy = 'AI System' } = req.body;

    if (!actionItems || !Array.isArray(actionItems)) {
      return res.status(400).json({
        error: 'actionItems array is required'
      });
    }

    const createdTasks = [];

    for (const item of actionItems) {
      const newTask = {
        id: uuidv4(),
        title: item.task || 'Untitled Task',
        description: item.description || item.task || 'No description provided',
        priority: item.priority || 'medium',
        status: 'pending',
        assignee: item.assignee || item.department || 'Unassigned',
        department: item.department || 'General',
        deadline: item.deadline ? new Date(item.deadline).toISOString() : null,
        estimatedHours: item.estimatedHours || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy,
        documentId: documentId || null,
        category: item.category || 'AI Generated',
        tags: item.tags || ['ai-generated']
      };

      tasks.push(newTask);
      createdTasks.push(newTask);
    }

    res.status(201).json({
      message: `Successfully created ${createdTasks.length} tasks`,
      tasks: createdTasks
    });
  } catch (error) {
    console.error('Error creating batch tasks:', error);
    res.status(500).json({
      error: 'Failed to create batch tasks'
    });
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', (req, res) => {
  try {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...req.body,
      id: req.params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    tasks[taskIndex] = updatedTask;

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      error: 'Failed to update task'
    });
  }
});

// PATCH /api/tasks/:id/status - Update task status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    if (!status || !['pending', 'in-progress', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        error: 'Valid status is required (pending, in-progress, completed, cancelled)'
      });
    }

    tasks[taskIndex].status = status;
    tasks[taskIndex].updatedAt = new Date().toISOString();

    res.json(tasks[taskIndex]);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({
      error: 'Failed to update task status'
    });
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', (req, res) => {
  try {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.json({
      message: 'Task deleted successfully',
      task: deletedTask
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      error: 'Failed to delete task'
    });
  }
});

// GET /api/tasks/stats/summary - Get task statistics
router.get('/stats/summary', (req, res) => {
  try {
    const stats = {
      total: tasks.length,
      byStatus: {
        pending: tasks.filter(t => t.status === 'pending').length,
        'in-progress': tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
        cancelled: tasks.filter(t => t.status === 'cancelled').length
      },
      byPriority: {
        critical: tasks.filter(t => t.priority === 'critical').length,
        high: tasks.filter(t => t.priority === 'high').length,
        medium: tasks.filter(t => t.priority === 'medium').length,
        low: tasks.filter(t => t.priority === 'low').length
      },
      byDepartment: {}
    };

    // Calculate department statistics
    tasks.forEach(task => {
      const dept = task.department;
      if (!stats.byDepartment[dept]) {
        stats.byDepartment[dept] = 0;
      }
      stats.byDepartment[dept]++;
    });

    res.json(stats);
  } catch (error) {
    console.error('Error fetching task statistics:', error);
    res.status(500).json({
      error: 'Failed to fetch task statistics'
    });
  }
});

export default router;
