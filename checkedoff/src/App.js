//written by: Cody Hinz and Nathan Diaz
//tested by: Cody Hinz and Nathan Diaz
//debugged by: Cody Hinz and Nathan Diaz

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { TaskProvider } from './components/TaskContext';
import { ShoppingProvider } from './components/ShoppingContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Main from './components/Main';
import Tasks from './components/Tasks';
import Calendar from './components/Calendar';
import Recipes from './components/Recipes';
import Shopping from './components/Shopping';
import Documents from './components/Documents';
import Login from './components/Login';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <ShoppingProvider>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Main />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <Tasks />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  <ProtectedRoute>
                    <Calendar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recipes"
                element={
                  <ProtectedRoute>
                    <Recipes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shopping"
                element={
                  <ProtectedRoute>
                    <Shopping />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/documents"
                element={
                  <ProtectedRoute>
                    <Documents />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </ShoppingProvider>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;