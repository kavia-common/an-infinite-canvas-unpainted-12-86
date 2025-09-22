import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import IdeationBoard from './pages/IdeationBoard';
import MediaManager from './pages/MediaManager';
import Campaigns from './pages/Campaigns';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// PUBLIC_INTERFACE
function App() {
  /** Root app configures providers and routes. Includes ProtectedRoute for RBAC and auth. */
  return (
    <AuthProvider>
      <UIProvider>
        <Router>
          <div className="app-shell">
            <Sidebar />
            <div className="app-main">
              <Header />
              <main className="app-content" role="main" aria-live="polite">
                <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute roles={['viewer','editor','admin']}>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ideation"
                    element={
                      <ProtectedRoute roles={['editor','admin']}>
                        <IdeationBoard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/media"
                    element={
                      <ProtectedRoute roles={['editor','admin']}>
                        <MediaManager />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/campaigns"
                    element={
                      <ProtectedRoute roles={['editor','admin']}>
                        <Campaigns />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute roles={['viewer','editor','admin']}>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute roles={['admin','editor','viewer']}>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/help" element={<Help />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <footer className="app-footer" aria-label="Footer">
                <span>© {new Date().getFullYear()} Blu Creative Suite</span>
              </footer>
            </div>
          </div>
        </Router>
      </UIProvider>
    </AuthProvider>
  );
}

export default App;
