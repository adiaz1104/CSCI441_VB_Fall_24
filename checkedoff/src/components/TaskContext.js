//written by: Cody Hinz and Nathan Diaz
//tested by: Cody Hinz and Nathan Diaz
//debugged by: Cody Hinz and Nathan Diaz

import React, { createContext, useState, useContext } from 'react';

// Create context to share task state across components
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Initial task state with mock data
  const [tasks, setTasks] = useState([
    { id: 1, user: 'Adam', task: 'Mow Lawn', dueDate: '2024-11-09', status: 'pending' },
    { id: 2, user: 'Tara', task: 'Mail Package', dueDate: '2024-11-02', status: 'pending' },
    { id: 3, user: 'Jake', task: 'Clean Kitchen', dueDate: '2024-11-28', status: 'completed' },
    { id: 4, user: 'Dylan', task: 'Submit Scholarship Application', dueDate: '2024-11-21', status: 'pending' }
  ]);

  // Add a new task with default pending status
  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1, status: 'pending' }]);
  };

  // Remove a task by ID
  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Toggle task completion status between pending and completed
  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'pending' ? 'completed' : 'pending'
        };
      }
      return task;
    }));
  };

  // Provide task state and functions to children
  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook for accessing task context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};