// src/components/ApplyVendorButton.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  applyForVendor } from '../features/user/userThunks';
import { useNavigate } from 'react-router-dom';

const ApplyVendorButton = () => {
  const [shopName, setShopName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, profile } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shopName.trim()) {
      return setError('Shop name is required');
    }

    try {
      await dispatch( applyForVendor({ shopName })).unwrap();
      navigate('/vendor-panel');
    } catch (err) {
      setError(err?.message || err || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Become a Vendor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Shop Name</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your shop name"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          {success && profile?.role === 'vendor' && (
            <p className="text-green-600 text-sm mb-3">🎉 You are now a vendor!</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Applying…' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyVendorButton;
