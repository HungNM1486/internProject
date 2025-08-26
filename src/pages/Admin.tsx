import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';

const Admin: React.FC = () => {
  console.log('🎯 Admin component rendered!');

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default Admin;
