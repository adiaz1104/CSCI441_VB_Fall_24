import React, { useState } from 'react';
import { useTasks } from './TaskContext'; // Update import path based on your file structure
import './Main.css';

const Main = () => {
  // Replace the local tasks state with the shared context
  const { tasks } = useTasks();
  const [selectedUser, setSelectedUser] = useState('');

  // Get unique users for filter
  const users = [...new Set(tasks.map(task => task.user))];
  
  // Filter tasks based on selected user
  const filteredTasks = selectedUser 
    ? tasks.filter(task => task.user === selectedUser)
    : tasks;

  return (
    <div className="main-container">
      <div className="filter-section">
        <label htmlFor="user-filter" className="filter-label">Filter by user:</label>
        <select
          id="user-filter"
          className="filter-select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">All</option>
          {users.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </div>

      <div className="main-grid">
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">Tasks Due Today</h3>
          </div>
          <div className="section-content">
            <div className="items-grid">
              {filteredTasks.map(task => (
                <div key={task.id} className="item-card">
                  <div className="item-header">
                    <p className="item-user">{task.user}</p>
                    <p className="item-time">{task.dueDate}</p>
                  </div>
                  <p className="item-description">{task.task}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Keep your Events Today section as is */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title">Events Today</h3>
          </div>
          <div className="section-content">
            <div className="items-grid">
              <div className="item-card">
                <div className="item-header">
                  <p className="item-user">Jake</p>
                  <p className="item-time">10:00 AM</p>
                </div>
                <p className="item-description">Dr Appt</p>
              </div>
              <div className="item-card">
                <div className="item-header">
                  <p className="item-user">Dylan</p>
                  <p className="item-time">2:00 PM</p>
                </div>
                <p className="item-description">Football Practice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;