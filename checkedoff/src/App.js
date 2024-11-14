import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TaskProvider } from './components/TaskContext';
import { ShoppingProvider } from './components/ShoppingContext';
import Header from './components/Header';
import Main from './components/Main';
import Tasks from './components/Tasks';
import Calendar from './components/Calendar';
import Recipes from './components/Recipes';
import Shopping from './components/Shopping';
import Documents from './components/Documents';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

const App = () => {
  return (
    <TaskProvider>
      <ShoppingProvider>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </ShoppingProvider>
    </TaskProvider>
  );
};

export default App;