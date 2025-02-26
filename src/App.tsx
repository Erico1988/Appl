import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DefaultLayout from './layouts/DefaultLayout';
import LoginForm from './pages/Login';
import AdminDashboard from './components/AdminDashboard';
import Navigation from './components/Navigation';

// Lazy-loaded pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Procedures = lazy(() => import('./pages/Procedures'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Planning = lazy(() => import('./pages/Planning'));
const Team = lazy(() => import('./pages/Team'));
const Reports = lazy(() => import('./pages/Reports'));
const Validation = lazy(() => import('./pages/Validation'));
const Alerts = lazy(() => import('./pages/Alerts'));
const Settings = lazy(() => import('./pages/Settings'));
const Chat = lazy(() => import('./pages/Chat'));
const MissionManagement = lazy(() => import('./pages/MissionManagement'));
const LeaveManagement = lazy(() => import('./pages/LeaveManagement'));

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, isAdmin } = useAuth();
  return currentUser && isAdmin ? <>{children}</> : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Navigation />
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <DefaultLayout>
                  <Suspense fallback={<div>Chargement...</div>}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/procedures" element={<Procedures />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/missions" element={<MissionManagement />} />
                      <Route path="/leave" element={<LeaveManagement />} />
                      <Route path="/planning" element={<Planning />} />
                      <Route path="/team" element={<Team />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/validation" element={<Validation />} />
                      <Route path="/alerts" element={<Alerts />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </Suspense>
                </DefaultLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;