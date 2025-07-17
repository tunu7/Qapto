
// src/pages/AccountPage.jsx
import React from 'react';

const AccountPage = () => {
  // TODO: Replace placeholder data with real user info from state
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">My Account</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="mb-2">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
