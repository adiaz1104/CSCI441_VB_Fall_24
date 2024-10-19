import React from 'react';
import '../App.css';
import './Shopping.css';

const Shopping = () => (
    <>
    <main>
        <div className="filter">
            <label htmlFor="user-filter">Filter by user:</label>
            <select id="user-filter">
                {/* Placeholder for dynamic filters if applicable to page */}
            </select>
            <button id="add-new-item">Add New Item</button>
            </div>
        </main>
    </>
);

export default Shopping;