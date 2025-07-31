// src/pages/AccountPage.jsx
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authThunks';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaGlobe,
  FaCog,
  FaInfoCircle,
  FaQuestionCircle,
} from 'react-icons/fa';

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          {user ? (
            <>
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name || 'User'
                )}&background=ffffff&color=000000&size=128`}
                alt="Avatar"
                className="w-20 h-20 rounded-full mx-auto shadow-sm"
              />
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                Welcome, {user.name}
              </h2>
              <p className="mt-1 text-sm text-gray-600">{user.email}</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-900">
                Welcome
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please log in or sign up to access your account
              </p>
            </>
          )}
        </div>

        {/* Icon Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {user ? (
            <>
              <button
                onClick={() => navigate('/account')}
                className="group bg-white flex flex-col items-center justify-center p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <FaUser className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
                <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-gray-900">
                  Profile
                </span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="group bg-white flex flex-col items-center justify-center p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <FaSignInAlt className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-gray-900">
                  Login
                </span>
              </button>
              <button
                onClick={() => navigate('/register')}
                className="group bg-white flex flex-col items-center justify-center p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <FaUserPlus className="w-6 h-6 text-green-600 group-hover:text-green-700" />
                <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-gray-900">
                  Sign Up
                </span>
              </button>
            </>
          )}

          {/* Common Actions */}
          <button className="group bg-white flex flex-col items-center justify-center p-4 rounded-lg shadow hover:shadow-lg transition">
            <FaGlobe className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
            <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-gray-900">
              Language
            </span>
          </button>
          <button className="group bg-white flex flex-col items-center justify-center p-4 rounded-lg shadow hover:shadow-lg transition">
            <FaCog className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
            <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-gray-900">
              Settings
            </span>
          </button>
          <button
            onClick={() => navigate('/help')}
            className="group bg-white flex flex-col items-center justify-center p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <FaQuestionCircle className="w-6 h-6 text-green-600 group-hover:text-green-700" />
            <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-gray-900">
              Help
            </span>
          </button>
          <button
            onClick={() => navigate('/about')}
            className="group bg-white flex flex-col items-center justify-center p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <FaInfoCircle className="w-6 h-6 text-purple-600 group-hover:text-purple-700" />
            <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-gray-900">
              About
            </span>
          </button>

          {/* Logout (last) */}
          {user && (
            <button
              onClick={handleLogout}
              className="group bg-white flex flex-col items-center justify-center p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <FaSignOutAlt className="w-6 h-6 text-red-500 group-hover:text-red-600" />
              <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-gray-900">
                Logout
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
