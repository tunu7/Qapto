// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, resetError } from '../features/auth/authSlice';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, message, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // If already logged in, go to account page
    if (user) {
      navigate('/account');
    }
    // Clear any previous errors when arriving
    dispatch(resetError());
  }, [user, navigate, dispatch]);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl mb-4">Log In</h1>
      {isError && <p className="text-red-500 mb-2">{message}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <p className="mt-4 text-center">
        Don’t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
