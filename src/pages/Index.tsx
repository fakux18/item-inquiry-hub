
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import PublicLayout from '../components/PublicLayout';
import AdminLayout from '../components/AdminLayout';
import HomePage from '../components/HomePage';
import PropertyDetails from '../components/PropertyDetails';
import CategoryPage from '../components/CategoryPage';
import ContactPage from '../components/ContactPage';
import AdminDashboard from '../components/AdminDashboard';
import ManageListings from '../components/ManageListings';
import AddListing from '../components/AddListing';

const Index = () => {
  const { user, loading } = useAuth();

  // Show loading while authentication is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="property/:id" element={<PropertyDetails />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        
        {/* Admin Routes - Protected */}
        <Route 
          path="/admin" 
          element={user ? <AdminLayout /> : <Navigate to="/auth" replace />}
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="listings" element={<ManageListings />} />
          <Route path="listings/add" element={<AddListing />} />
          <Route path="listings/edit/:id" element={<AddListing />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Index;
