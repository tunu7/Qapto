import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'N/A';

  const displayRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : 'Role';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gray-100 px-6 py-8 flex flex-col items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=ffffff&color=000000&size=128`}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.name || 'User'}
          </h2>
          <p className="text-gray-600">{user.email || 'No email'}</p>
          <span className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {displayRole}
          </span>
        </div>

        {/* Account Details */}
        <div className="px-6 py-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Account Details
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Member Since:</strong> {memberSince}
            </li>
            <li>
              <strong>User ID:</strong> {user._id || 'N/A'}
            </li>
          </ul>

          {/* Actions */}
          <div className="mt-6 flex space-x-4">
            <Link
              to="/account/edit"
              className="flex-1 text-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Edit Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
