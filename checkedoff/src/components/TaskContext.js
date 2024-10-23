import React, { createContext, useState, useContext } from 'react';

// Create the context
const TaskContext = createContext();

// Create a provider component
export const TaskProvider = ({ children }) => {
  // Shared state
  const [tasks, setTasks] = useState([
    { id: 1, user: 'Adam', task: 'Mow Lawn', dueDate: '2024-10-05' },
    { id: 2, user: 'Tara', task: 'Mail Package', dueDate: '2024-10-05' },
    { id: 3, user: 'Jake', task: 'Clean Kitchen', dueDate: '2024-10-06' },
    { id: 4, user: 'Dylan', task: 'Submit Scholarship Application', dueDate: '2024-10-12' }
  ]);

  // Function to add a task
  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };

  // Function to remove a task
  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};