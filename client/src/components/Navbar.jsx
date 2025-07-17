// src/components/Navbar.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ className = '' }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const showBack = pathname !== '/';

  return (
    <nav className={`flex items-center justify-between p-4 rounded mb-6 ${className}`}>
      <h1 className="text-2xl font-semibold">Qapto</h1>

      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="text-sm bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition"
        >
          ← Back
        </button>
      )}
    </nav>
  );
};

export default Navbar;
