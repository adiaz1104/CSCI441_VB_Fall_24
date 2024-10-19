import React from 'react';
import '../App.css';
import './Main.css';

// Main component displaying home page content
const Main = () => (
  <main>
    <div className="filter">
      <label htmlFor="user-filter">Filter by user</label>
      <select id="user-filter">
        <option value="">All</option>
        <option value="adam">Adam</option>
        <option value="tara">Tara</option>
        <option value="jake">Jake</option>
        <option value="dylan">Dylan</option>
      </select>
    </div>
    <section className="summary">
      <div className="card">
        <h3>Tasks Due Today</h3>
        <ul id="tasks-list">
          <li>Adam: Mow lawn</li>
          <li>Tara: Mail package</li>
        </ul>
      </div>
      <div className="card">
        <h3>Events Today</h3>
        <ul id="events-list">
          <li>Jake: Dr Appt - 10:00 AM</li>
          <li>Dylan: Football Practice - 2:00 PM</li>
        </ul>
      </div>
    </section>
  </main>
);

export default Main;
