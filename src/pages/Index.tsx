
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import AdminLayout from '../components/AdminLayout';
import AdminLogin from '../components/AdminLogin';
import HomePage from '../components/HomePage';
import PropertyDetails from '../components/PropertyDetails';
import CategoryPage from '../components/CategoryPage';
import ContactPage from '../components/ContactPage';
import AdminDashboard from '../components/AdminDashboard';
import ManageListings from '../components/ManageListings';
import AddListing from '../components/AddListing';

const Index = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="property/:id" element={<PropertyDetails />} />
            <Route path="category/:category" element={<CategoryPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
          
          {/* Admin Routes */}
          <Route 
            path="/admin/login" 
            element={
              isAdminLoggedIn ? 
              <Navigate to="/admin/dashboard" replace /> : 
              <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
            } 
          />
          <Route path="/admin" element={isAdminLoggedIn ? <AdminLayout /> : <Navigate to="/admin/login" replace />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="listings" element={<ManageListings />} />
            <Route path="listings/add" element={<AddListing />} />
            <Route path="listings/edit/:id" element={<AddListing />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default Index;
