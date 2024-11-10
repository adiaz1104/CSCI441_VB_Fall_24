import React, { useState } from 'react';
import { useTasks } from './TaskContext';
import './Tasks.css';

const Tasks = () => {
  // Get task-related functions and state from context
  const { tasks, addTask, removeTask, toggleTaskStatus } = useTasks();

  // Local state for new task form
  const [newTask, setNewTask] = useState({
    user: '',
    task: '',
    dueDate: ''
  });

  // UI state management
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

  // Get unique users for filter dropdown
  const users = [...new Set(tasks.map(task => task.user))];

  // Filter tasks based on selected user
  const filteredTasks = selectedUser 
    ? tasks.filter(task => task.user === selectedUser)
    : tasks;

  // Handle input changes in the new task form
  const handleInputChange = (e, field) => {
    setNewTask(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  // Handle form submission for new task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.user && newTask.task && newTask.dueDate) {
      addTask(newTask);
      setNewTask({ user: '', task: '', dueDate: '' }); // Reset form
      setShowNewTaskForm(false);
    }
  };

  // Toggle visibility of new task form
  const toggleTaskForm = () => {
    setShowNewTaskForm(!showNewTaskForm);
    if (showNewTaskForm) {
      setNewTask({ user: '', task: '', dueDate: '' }); // Reset form when closing
    }
  };

  return (
    <div className="tasks-container">
      {/* Filter and Add Task Section */}
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

      {/* Tasks Grid - Displays all tasks with completion checkboxes */}
      <div className="tasks-grid">
        {filteredTasks.map(task => (
          <div key={task.id} className={`task-card ${task.status === 'completed' ? 'completed' : ''}`}>
            <div className="task-header">
              <div className="task-header-left">
                {/* Completion checkbox */}
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  onChange={() => toggleTaskStatus(task.id)}
                  className="task-checkbox"
                  aria-label={`Mark task "${task.task}" as ${task.status === 'completed' ? 'incomplete' : 'complete'}`}
                />
                <h3 className="task-user">{task.user}</h3>
              </div>
              {/* Remove task button */}
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
        {/* Show message when no tasks are found */}
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