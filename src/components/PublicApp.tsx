
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './PublicLayout';
import HomePage from './HomePage';
import PropertyDetails from './PropertyDetails';
import CategoryPage from './CategoryPage';
import ContactPage from './ContactPage';

const PublicApp = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="property/:id" element={<PropertyDetails />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default PublicApp;
