import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { AboutPage } from '../pages/public/AboutPage';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { CategoriesPage } from '../pages/public/CategoriesPage';
import { CollectionCentersPage } from '../pages/public/CollectionCentersPage';
import { RewardsPage } from '../pages/public/RewardsPage';
import { ContactPage } from '../pages/public/ContactPage';
import { LoginPage } from '../pages/public/LoginPage';
import { RegisterPage } from '../pages/public/RegisterPage';
import { EnvironmentalImpactPage } from '../pages/public/EnvironmentalImpactPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// User Pages
import { UserDashboard } from '../pages/user/UserDashboard';
import { SubmitEwastePage } from '../pages/user/SubmitEwastePage';
import { ScanPage } from '../pages/user/ScanPage';
import { CalculatorPage } from '../pages/user/CalculatorPage';
import { BookPickupPage } from '../pages/user/BookPickupPage';
import { PickupsHistoryPage } from '../pages/user/PickupsHistoryPage';
import { TrackPage } from '../pages/user/TrackPage';
import { NotificationsPage } from '../pages/user/NotificationsPage';
import { ProfilePage } from '../pages/user/ProfilePage';

// Collector Pages
import { CollectorDashboard } from '../pages/collector/CollectorDashboard';

// Recycler Pages
import { RecyclerDashboard } from '../pages/recycler/RecyclerDashboard';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ children, allowedRoles }) => {
  const { user, role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/collection-centers" element={<CollectionCentersPage />} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route path="/impact" element={<EnvironmentalImpactPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* USER ROUTES */}
      <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
      <Route path="/submit-ewaste" element={<ProtectedRoute><SubmitEwastePage /></ProtectedRoute>} />
      <Route path="/scan" element={<ProtectedRoute><ScanPage /></ProtectedRoute>} />
      <Route path="/calculator" element={<CalculatorPage />} />
      <Route path="/book-pickup" element={<ProtectedRoute><BookPickupPage /></ProtectedRoute>} />
      <Route path="/my-pickups" element={<ProtectedRoute><PickupsHistoryPage /></ProtectedRoute>} />
      <Route path="/track" element={<TrackPage />} />
      <Route path="/track/:id" element={<TrackPage />} />
      <Route path="/history" element={<ProtectedRoute><PickupsHistoryPage /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

      {/* COLLECTOR ROUTES */}
      <Route path="/collector/dashboard" element={<ProtectedRoute allowedRoles={['COLLECTOR', 'ADMIN']}><CollectorDashboard /></ProtectedRoute>} />
      <Route path="/collector/pickups" element={<ProtectedRoute allowedRoles={['COLLECTOR', 'ADMIN']}><CollectorDashboard /></ProtectedRoute>} />
      <Route path="/collector/pickup/:id" element={<ProtectedRoute allowedRoles={['COLLECTOR', 'ADMIN']}><CollectorDashboard /></ProtectedRoute>} />
      <Route path="/collector/history" element={<ProtectedRoute allowedRoles={['COLLECTOR', 'ADMIN']}><CollectorDashboard /></ProtectedRoute>} />
      <Route path="/collector/profile" element={<ProtectedRoute allowedRoles={['COLLECTOR', 'ADMIN']}><ProfilePage /></ProtectedRoute>} />

      {/* RECYCLER ROUTES */}
      <Route path="/recycler/dashboard" element={<ProtectedRoute allowedRoles={['RECYCLER', 'ADMIN']}><RecyclerDashboard /></ProtectedRoute>} />
      <Route path="/recycler/incoming" element={<ProtectedRoute allowedRoles={['RECYCLER', 'ADMIN']}><RecyclerDashboard /></ProtectedRoute>} />
      <Route path="/recycler/processing" element={<ProtectedRoute allowedRoles={['RECYCLER', 'ADMIN']}><RecyclerDashboard /></ProtectedRoute>} />
      <Route path="/recycler/completed" element={<ProtectedRoute allowedRoles={['RECYCLER', 'ADMIN']}><RecyclerDashboard /></ProtectedRoute>} />
      <Route path="/recycler/profile" element={<ProtectedRoute allowedRoles={['RECYCLER', 'ADMIN']}><ProfilePage /></ProtectedRoute>} />

      {/* ADMIN ROUTES */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/ewaste" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/pickups" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/collectors" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/recyclers" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/centers" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['ADMIN']}><EnvironmentalImpactPage /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['ADMIN']}><EnvironmentalImpactPage /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />

      {/* CATCH-ALL 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
