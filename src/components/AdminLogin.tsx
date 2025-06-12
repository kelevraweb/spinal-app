
import React from 'react';
import SecureAdminLogin from './SecureAdminLogin';

// This component now uses secure authentication instead of hardcoded credentials
const AdminLogin: React.FC = () => {
  return <SecureAdminLogin />;
};

export default AdminLogin;
