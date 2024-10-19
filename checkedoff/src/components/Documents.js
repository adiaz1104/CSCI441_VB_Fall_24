import React from 'react';
import '../App.css';
import './Documents.css';

// Documents component displaying documents
const Documents = () => (
  <>
    <main>
      <div className="filter">
        <label htmlFor="user-filter">Filter by user:</label>
        <select id="user-filter">
          {/* Placeholder for dynamic options from the database */}
        </select>
        <button id="add-new-document">Add New Docuement</button>
      </div>
    </main>
  </>
);

export default Documents;
