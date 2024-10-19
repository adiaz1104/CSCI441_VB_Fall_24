import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Tasks from './components/Tasks';
import Calendar from './components/Calendar';
import Recipes from './components/Recipes';
import Shopping from './components/Shopping';
import Documents from './components/Documents';
import './App.css';

// Main App component containing routes for different pages
const App = () => (
  <div className="App">
    {/* Header component displayed on all pages */}
    <Header />
    <Routes>
      {/* Route for the main/home page */}
      <Route path="/" element={<Main />} />
      {/* Route for the tasks page */}
      <Route path="/tasks" element={<Tasks />} />
      {/* Route for the Calendar page */}
      <Route path="/calendar" element={<Calendar />} />
      {/* Route for the Recipes page */}
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/shopping" element={<Shopping />} />
      <Route path="/documents" element={<Documents />} />

    </Routes>
  </div>
);

export default App;