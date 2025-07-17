// src/components/FooterNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calculator, User } from 'lucide-react';

const FooterNav = () => {
  const linkBase = "flex flex-col items-center justify-center p-2 focus:outline-none";
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${linkBase} ${isActive ? 'text-indigo-600' : 'text-gray-500'}`
        }
      >
        <Home className="w-6 h-6" />
        <span className="text-xs mt-1">Home</span>
      </NavLink>

      <NavLink
        to="/calculator"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? 'text-indigo-600' : 'text-gray-500'}`
        }
      >
        <Calculator className="w-6 h-6" />
        <span className="text-xs mt-1">Calc</span>
      </NavLink>

      <NavLink
        to="/account"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? 'text-indigo-600' : 'text-gray-500'}`
        }
      >
        <User className="w-6 h-6" />
        <span className="text-xs mt-1">Account</span>
      </NavLink>
    </nav>
  );
};

export default FooterNav;
