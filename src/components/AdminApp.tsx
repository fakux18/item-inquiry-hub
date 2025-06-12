
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import ManageListings from './ManageListings';
import AddListing from './AddListing';

const AdminApp = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<AdminLayout />}>
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

export default AdminApp;
