import React, { useState } from 'react';
import { useTasks } from './TaskContext';
import './styles/Calendar.css';

/**
 * Calendar Component
 * Displays a monthly calendar view with tasks and filtering capabilities
 */
const Calendar = () => {
  // Get tasks from global context
  const { tasks } = useTasks();
  
  // State for tracking current displayed month/year
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // State for user filter selection
  const [selectedUser, setSelectedUser] = useState('');
  
  // Extract unique users from tasks for filter dropdown
  const users = [...new Set(tasks.map(task => task.user))];
  
  // Filter tasks based on selected user
  const filteredTasks = selectedUser 
    ? tasks.filter(task => task.user === selectedUser)
    : tasks;

  /**
   * Gets the number of days in the current month
   * @param {Date} date - Date object for current month
   * @returns {number} Number of days in the month
   */
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  /**
   * Gets the day of week (0-6) for the first day of the month
   * @param {Date} date - Date object for current month
   * @returns {number} Day of week (0 = Sunday, 6 = Saturday)
   */
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  /**
   * Navigation handler for previous month
   */
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  /**
   * Navigation handler for next month
   */
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  /**
   * Retrieves tasks for a specific day
   * @param {number} day - Day of the month
   * @returns {Array} Array of tasks for the specified day
   */
  const getTasksForDay = (day) => {
    // Format date string to match task due dates (YYYY-MM-DD)
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredTasks.filter(task => task.dueDate === dateStr);
  };

  /**
   * Builds the calendar grid with days and tasks
   * @returns {Array} Array of JSX elements representing calendar cells
   */
  const buildCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    // Calculate total cells needed (including empty cells) to maintain 7-column grid
    const totalDays = Math.ceil((daysInMonth + firstDay) / 7) * 7;
    const days = [];

    for (let i = 0; i < totalDays; i++) {
      // Calculate actual day number (accounting for empty cells at start)
      const dayNumber = i - firstDay + 1;
      // Check if this is a valid day in the month
      const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
      // Get tasks for this day (if it's valid)
      const tasksForDay = isValidDay ? getTasksForDay(dayNumber) : [];

      days.push(
        <div key={i} className={`calendar-cell ${!isValidDay ? 'empty' : ''}`}>
          {isValidDay && (
            <>
              {/* Display day number in top-right corner */}
              <div className="date-number">{dayNumber}</div>
              {/* Display tasks for this day */}
              <div className="task-list">
                {tasksForDay.map(task => (
                  <div key={task.id} className="calendar-task">
                    <div className="task-user">{task.user}</div>
                    <div className="task-description">{task.task}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar-wrapper">
      {/* Calendar Controls Section */}
      <div className="calendar-controls">
        {/* User Filter Dropdown */}
        <div className="filter-container">
          <label htmlFor="user-filter">Filter by user:</label>
          <select
            id="user-filter"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">All Users</option>
            {users.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
        
        {/* Month Navigation */}
        <div className="month-navigation">
          <button onClick={prevMonth} className="nav-button">&lt;</button>
          <h2 className="current-month">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={nextMonth} className="nav-button">&gt;</button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-container">
        {/* Weekday Headers */}
        <div className="calendar-header">
          <div className="weekday">Sunday</div>
          <div className="weekday">Monday</div>
          <div className="weekday">Tuesday</div>
          <div className="weekday">Wednesday</div>
          <div className="weekday">Thursday</div>
          <div className="weekday">Friday</div>
          <div className="weekday">Saturday</div>
        </div>
        {/* Calendar Days Grid */}
        <div className="calendar-grid">
          {buildCalendarGrid()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;