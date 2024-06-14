import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login } from '../Redux/authSlice.js'; // Update import
import { Button } from '@nextui-org/react';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false); // State for loading indicator

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    setLoading(true)

    try {
      const res = await dispatch(login({ email, password }));
      console.log(res);
      navigate('/buyvehicle'); // Redirect on successful login
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      toast.error('Login failed. Please check your credentials and try again.'); // Show error toast
    }
    setLoading(false)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-blue-500 text-center">Sign In</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
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
        {isLoading ? (
            <Button isLoading color="primary" className="w-full">
              Loading
            </Button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          )}
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
