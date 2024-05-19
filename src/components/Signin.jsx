import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate , Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login } from '../Redux/authSlice.js'; // Update import

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await dispatch(login({ email, password })).unwrap(); // Ensure to use unwrap if using Redux Toolkit
      navigate('/buyvehicle'); // Redirect on successful login
    } catch (error) {
      toast.error('Login failed. Please check your credentials and try again.'); // Show error toast
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <button
        onClick={handleSignIn}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Sign In
      </button>
      <div className="mt-4">
        <p>
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
