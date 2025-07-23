// src/pages/AccountPage.jsx

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaSignOutAlt,
  FaGlobe,
  FaCog,
  FaInfoCircle,
  FaQuestionCircle,
} from 'react-icons/fa';
import ProductsManager from '../components/ProductsManager';

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Actions: Login/Signup or User Info & Actions */}
      {user ? (
        <div className="flex justify-center items-center space-x-6 mb-8">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name || 'User'
            )}&background=ffffff&color=000000&size=64`}
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
          <span className="text-lg font-medium text-gray-800">
            {user.name}
          </span>
          <Link
            to="/account"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            <FaUser className="w-6 h-6" />
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-gray-900 transition"
          >
            <FaSignOutAlt className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <div className="flex justify-center space-x-4 mb-8">
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* Four Sections (common) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <button className="flex flex-col items-center p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <FaGlobe className="w-8 h-8 text-blue-600" />
          <span className="mt-2 text-gray-700 font-medium">Language</span>
        </button>
        <button className="flex flex-col items-center p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <FaCog className="w-8 h-8 text-gray-600" />
          <span className="mt-2 text-gray-700 font-medium">Settings</span>
        </button>
        <button
          onClick={() => navigate('/help')}
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow hover:shadow-md transition"
        >
          <FaQuestionCircle className="w-8 h-8 text-green-600" />
          <span className="mt-2 text-gray-700 font-medium">Help</span>
        </button>
        <button
          onClick={() => navigate('/about')}
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow hover:shadow-md transition"
        >
          <FaInfoCircle className="w-8 h-8 text-purple-600" />
          <span className="mt-2 text-gray-700 font-medium">About</span>
        </button>
      </div>

      {/* Products Management (only for logged-in users) */}
      {user && <ProductsManager shopId={user.shopId} />}
    </div>
  );
};

export default AccountPage;
