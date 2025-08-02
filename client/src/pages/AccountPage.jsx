// src/pages/AccountPage.jsx
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaGlobe,
  FaCog,
  FaInfoCircle,
  FaQuestionCircle,
  FaShieldAlt,
  FaStore,
} from 'react-icons/fa';

import RoleButton from '../components/RoleButton';
import GridButton from '../components/GridButton';

const hasRole = (user, ...roles) => !!user && roles.includes(user.role);

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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
            <div className="flex flex-col items-center">
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
              <span className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide">
                {user.role}
              </span>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-900">Welcome</h2>
              <p className="mt-2 text-sm text-gray-600">
                Please log in or sign up to access your account
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <GridButton
                  onClick={() => navigate('/login')}
                  Icon={FaSignInAlt}
                  label="Login"
                  color="blue"
                />
                <GridButton
                  onClick={() => navigate('/register')}
                  Icon={FaUserPlus}
                  label="Sign Up"
                  color="green"
                />
              </div>
            </>
          )}
        </div>

        {/* Icon Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {user && (
            <>
              <GridButton
                onClick={() => navigate('/account')}
                Icon={FaUser}
                label="Profile"
              />
              <RoleButton
                allowedRoles={['admin']}
                onClick={() => navigate('/admin-dashboard')}
                Icon={FaCog}
                label="Admin Panel"
              />
              <RoleButton
                allowedRoles={['vendor', 'admin']}
                onClick={() => navigate('/vendor-panel')}
                Icon={FaStore}
                label="Vendor Panel"
              />
              <GridButton
                onClick={() => navigate('/become-vendor')}
                Icon={FaUserPlus}
                label="Apply Vendor"
                color="green"
                hide={!hasRole(user, 'user')}
              />
            </>
          )}

          {/* Common actions */}
          <GridButton Icon={FaGlobe} label="Language" color="blue" />
          <GridButton Icon={FaShieldAlt} label="Security" />
          <GridButton
            onClick={() => navigate('/help')}
            Icon={FaQuestionCircle}
            label="Help"
            color="green"
          />
          <GridButton
            onClick={() => navigate('/about')}
            Icon={FaInfoCircle}
            label="About"
            color="purple"
          />

          {user && (
            <GridButton
              onClick={handleLogout}
              Icon={FaSignOutAlt}
              label="Logout"
              color="red"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
