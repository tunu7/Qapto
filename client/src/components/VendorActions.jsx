import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaStore } from 'react-icons/fa';
import ActionButton from './ActionButton';

const VendorActions = () => {
  const navigate = useNavigate();
  return (
    <>
      <ActionButton
        icon={FaBoxOpen}
        label="My Products"
        onClick={() => navigate('/vendor/products')}
      />
      <ActionButton
        icon={FaStore}
        label="Orders"
        onClick={() => navigate('/vendor/orders')}
      />
    </>
  );
};

export default VendorActions;
