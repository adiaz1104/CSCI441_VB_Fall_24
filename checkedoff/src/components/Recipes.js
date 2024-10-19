import React from 'react';
import '../App.css';
import './Recipes.css';

// Recipes component displaying recipe content
const Recipes = () => (
  <>
    <main>
      <div className="filter">
        <label htmlFor="user-filter">Filter by user:</label>
        <select id="user-filter">
          {/* Placeholder for dynamic user options from the database */}
        </select>
        <button id="add-new-recipe">Add New Recipe</button>
      </div>
    </main>
  </>
);

export default Recipes;
