import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount } from '../Redux/authSlice.js';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createAccount({ email, password, name, role }));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border rounded-md py-2 px-3" />
        </div>
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border rounded-md py-2 px-3" />
        </div>
        <div>
          <label htmlFor="password" className="block">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border rounded-md py-2 px-3" />
        </div>
        <div>
          <label htmlFor="role" className="block">Role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded-md py-2 px-3">
            <option value="buyer">Buyer&Seller</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">Sign Up</button>
        <p>
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
