import React from 'react';
import '../App.css';
import './Tasks.css';

// Tasks component displaying tasks list content
const Tasks = () => (
  <>
    
    <main>
      <div className="filter">
        <label htmlFor="user-filter">Filter by user:</label>
        <select id="user-filter">
          <option value="">All</option>
          <option value="adam">Adam</option>
          <option value="tara">Tara</option>
          <option value="jake">Jake</option>
          <option value="dylan">Dylan</option>
        </select>
        <button id="add-new-task">Add New Task</button>
      </div>
      <section className="task-list">
        <h2>Task List</h2>
        <ul>
          <li>Adam: Mow Lawn - Due Date: 2024-10-05</li>
          <li>Tara: Mail Package - Due Date: 2024-10-05</li>
          <li>Jake: Clean Kitchen - Due Date: 2024-10-06</li>
          <li>Dylan: Submit Scholarship Application - Due Date: 2024-10-12</li>
        </ul>
      </section>
    </main>
  </>
);

export default Tasks;
