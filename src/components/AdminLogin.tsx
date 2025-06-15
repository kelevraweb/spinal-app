
import React from 'react';
import UsernameAdminLogin from './UsernameAdminLogin';

// This component now uses username-based authentication instead of email
const AdminLogin: React.FC = () => {
  return <UsernameAdminLogin />;
};

export default AdminLogin;
