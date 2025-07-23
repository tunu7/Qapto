// src/pages/RegisterPage.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, resetError } from '../features/auth/authSlice';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, message, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // If already registered/logged in, go to account page
    if (user) {
      navigate('/account');
    }
    dispatch(resetError());
  }, [user, navigate, dispatch]);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl mb-4">Register</h1>
      {isError && <p className="text-red-500 mb-2">{message}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
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
          className="w-full p-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {isLoading ? 'Registering...' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
