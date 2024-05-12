import React, { useState } from 'react';

const Sidebar = ({ onSelectComponent }) => {
  const [selectedComponent, setSelectedComponent] = useState('');

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
    console.log(selectedComponent);
    onSelectComponent(component); // Pass the selected component to the parent component
  };

  return (
    <div className="sidebar bg-gray-200 h-full w-1/5 py-8 px-4 fixed top-0 left-0 flex  flex-col">
      <h2 className="text-lg font-bold mt-16 mx-3">My Vehicle</h2>
      <ul>
        <li className={`mb-2 ${selectedComponent === 'wishlist' && 'bg-gray-300'}`} onClick={() => handleSelectComponent('wishlist')}>
          <p className="text-gray-800 hover:bg-gray-300 px-3 py-2 rounded-md block">My Wishlist</p>
        </li>
        <li className={`mb-2 ${selectedComponent === 'listings' && 'bg-gray-300'}`} onClick={() => handleSelectComponent('listings')}>
          <p className="text-gray-800 hover:bg-gray-300 px-3 py-2 rounded-md block">My Listings</p>
        </li>
        <li className={`mb-2 ${selectedComponent === 'bids' && 'bg-gray-300'}`} onClick={() => handleSelectComponent('bids')}>
          <p className="text-gray-800 hover:bg-gray-300 px-3 py-2 rounded-md block">My Bids</p>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
