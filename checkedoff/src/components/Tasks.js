import React, { useState } from 'react';
import { useTasks } from './TaskContext';
import './Tasks.css';

/**
 * Tasks Component
 * Displays and manages tasks with filtering, adding, and removing functionality
 * Uses shared task context for state management across the application
 */
const Tasks = () => {
  // =========================================
  // Context and State Management
  // =========================================
  
  // Get tasks and task management functions from context
  const { tasks, addTask, removeTask } = useTasks();

  // Local state for new task form
  const [newTask, setNewTask] = useState({
    user: '',
    task: '',
    dueDate: ''
  });

  // UI state management
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

  // =========================================
  // Derived Values and Calculations
  // =========================================
  
  // Get unique users for filter dropdown
  const users = [...new Set(tasks.map(task => task.user))];

  // Filter tasks based on selected user
  const filteredTasks = selectedUser 
    ? tasks.filter(task => task.user === selectedUser)
    : tasks;

  // =========================================
  // Event Handlers
  // =========================================
  
  /**
   * Handles changes to new task form inputs
   * @param {Object} e - Event object
   * @param {string} field - Field to update (user, task, or dueDate)
   */
  const handleInputChange = (e, field) => {
    setNewTask(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  /**
   * Handles form submission for new task
   * Validates inputs and adds task to global state
   * @param {Object} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all required fields are filled
    if (newTask.user && newTask.task && newTask.dueDate) {
      // Add task using context function
      addTask(newTask);
      
      // Reset form and hide it
      setNewTask({ user: '', task: '', dueDate: '' });
      setShowNewTaskForm(false);
    }
  };

  /**
   * Toggles visibility of new task form
   * Resets form data when hiding
   */
  const toggleTaskForm = () => {
    setShowNewTaskForm(!showNewTaskForm);
    if (showNewTaskForm) {
      setNewTask({ user: '', task: '', dueDate: '' });
    }
  };

  // =========================================
  // Render Component
  // =========================================
  return (
    <div className="tasks-container">
      {/* Header Section with Filter and Add Button */}
      <div className="tasks-header">
        <div className="filter-section">
          <div className="filter-group">
            <label htmlFor="user-filter" className="filter-label">
              Filter by user:
            </label>
            <select
              id="user-filter"
              className="filter-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">All Users</option>
              {users.map(user => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={toggleTaskForm}
            className="add-task-btn"
          >
            {showNewTaskForm ? 'Cancel' : 'Add New Task'}
          </button>
        </div>
      </div>

      {/* New Task Form - Conditionally Rendered */}
      {showNewTaskForm && (
        <div className="task-form">
          <div className="form-header">
            <h3 className="form-title">Add New Task</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="task-user" className="form-label">
                User:
              </label>
              <input
                id="task-user"
                type="text"
                className="form-input"
                value={newTask.user}
                onChange={(e) => handleInputChange(e, 'user')}
                placeholder="Enter user name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="task-description" className="form-label">
                Task:
              </label>
              <input
                id="task-description"
                type="text"
                className="form-input"
                value={newTask.task}
                onChange={(e) => handleInputChange(e, 'task')}
                placeholder="Enter task description"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="task-date" className="form-label">
                Due Date:
              </label>
              <input
                id="task-date"
                type="date"
                className="form-input"
                value={newTask.dueDate}
                onChange={(e) => handleInputChange(e, 'dueDate')}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Add Task
            </button>
          </form>
        </div>
      )}

      {/* Tasks Grid */}
      <div className="tasks-grid">
        {filteredTasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <h3 className="task-user">{task.user}</h3>
              <button
                onClick={() => removeTask(task.id)}
                className="remove-btn"
                aria-label={`Remove task for ${task.user}`}
              >
                ✕
              </button>
            </div>
            <div className="task-content">
              <p className="task-description">{task.task}</p>
              <p className="task-date">Due Date: {task.dueDate}</p>
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="no-tasks-message">
            No tasks found{selectedUser ? ` for ${selectedUser}` : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;