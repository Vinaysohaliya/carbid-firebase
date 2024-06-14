import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { createAccount } from '../Redux/authSlice';

// Import Next.js UI components as needed
import { Button } from '@nextui-org/react';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false); // State for loading indicator

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading indicator
    try {
      await dispatch(createAccount({ email, password, name, role, profilePic }));
      navigate('/buyvehicle');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
    setLoading(false); // Stop loading indicator
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-500 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-blue-500">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-blue-500">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-blue-500">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div >
          <label className="block m-4">
          <label htmlFor="profilePic" className="block text-blue-500">Profile Picture</label>

              <div className="mt-3 flex  flex-col">
                <span className=" bg-blue-600 rounded-md px-3 py-1 size-2/5 flex items-center justify-center text-sm font-medium mr-2 text-white">
                  Choose file
                </span>
                <input
              type="file"
              id="profilePic"
              onChange={handleProfilePicChange}
              required
              className="w-full border rounded-md py-2 px-3 sr-only"
            /> 
              </div>
            </label>
            
          </div>
          {/* Conditionally render the Next.js UI button for loading state */}
          {isLoading ? (
            <Button isLoading color="primary" className="w-full">
              Loading
            </Button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Sign Up
            </button>
          )}
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-500 hover:text-blue-700">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
