import React from 'react';
import '../App.css';
import './Calendar.css';

// Calendar component displaying calendar content
const Calendar = () => (
    <>
        <main>
            <div className="filter">
                <label htmlFor="user-filter">Filter by user:</label>
                <select id="user-filter">
                    {/* placeholder for dynamic user options from the database */}   
                </select>
                {/* Add New Event button */}
                <button id="add-new-event">Add New Event</button>
            </div>
            
        </main>
    </>
);

export default Calendar;