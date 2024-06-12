import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../Redux/authSlice';
import {  Image } from '@nextui-org/react';


const EditProfile = () => {
  const dispatch = useDispatch();
  const { data, isLoggedIn } = useSelector((state) => state.auth);
  const [name, setName] = useState(data.displayName || '');
  const [role, setRole] = useState(data.role || '');
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(data.profilePicURL || '');
  useEffect(() => {
    const fetchProfile = async () => {
      if (isLoggedIn) {
        try {
          const res = await dispatch(getProfile(data.uid));
          if (res.payload) {
            setName(res.payload.name);
            setRole(res.payload.role);
            setPreviewPic(res.payload.profilePicURL);
          }
        } catch (error) {
          toast.error('Failed to fetch profile data');
        }
      }
    };
    fetchProfile();
  }, [dispatch, isLoggedIn, data.uid]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreviewPic(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = data.uid;

    try {
     const res= await dispatch(updateProfile({ uid, name, role, profilePic }));
     setPreviewPic(res.payload.profilePicURL)
     setName(res.payload.name)

    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 border border-blue-100 border-solid  p-10">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold ">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-2 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Profile Picture</label>
          {previewPic && <Image src={previewPic} alt="Profile Preview" className="w-20 h-20 rounded-full mb-2" />}
          <input
            type="file"
            onChange={handleProfilePicChange}
            className="mt-2 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
