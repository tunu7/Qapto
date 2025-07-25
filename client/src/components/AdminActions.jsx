import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaChartBar } from 'react-icons/fa';
import ActionButton from './ActionButton';

const AdminActions = () => {
  const navigate = useNavigate();
  return (
    <>
      <ActionButton
        icon={FaUsers}
        label="Manage Users"
        onClick={() => navigate('/admin/users')}
      />
      <ActionButton
        icon={FaChartBar}
        label="View Reports"
        onClick={() => navigate('/admin/reports')}
      />
    </>
  );
};

export default AdminActions;
