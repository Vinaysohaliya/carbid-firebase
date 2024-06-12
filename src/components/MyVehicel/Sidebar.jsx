import React, { useState } from 'react';
import { FaHeart} from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";

const Sidebar = ({ onSelectComponent }) => {
  const [selectedComponent, setSelectedComponent] = useState('');

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
    onSelectComponent(component); // Pass the selected component to the parent component
  };

  return (
    <div className="sidebar bg-white h-full w-1/5 py-8 px-4 fixed top-0 left-0 flex flex-col">
      <h2 className="text-lg font-bold mt-16 mb-3 mx-3 text-blue-600">My Vehicle</h2>
      <ul>
        <li className={`mb-2 ${selectedComponent === 'wishlist' && 'bg-gray-300'}`} onClick={() => handleSelectComponent('wishlist')}>
          <p className="text-gray-800 hover:bg-gray-300 px-3 py-2 rounded-md block flex items-center"><FaHeart color='blue' className="mr-2 "/> My Wishlist</p>
        </li>
        <li className={`mb-2 ${selectedComponent === 'listings' && 'bg-gray-300'}`} onClick={() => handleSelectComponent('listings')}>
          <p className="text-gray-800 hover:bg-gray-300 px-3 py-2 rounded-md block flex items-center"><MdOutlineEventNote color='blue' className="mr-2"/> My Listings</p>
        </li>
        <li className={`mb-2 ${selectedComponent === 'bids' && 'bg-gray-300'}`} onClick={() => handleSelectComponent('bids')}>
          <p className="text-gray-800 hover:bg-gray-300 px-3 py-2 rounded-md block flex items-center"><HiOutlineClipboardList color='blue' className="mr-2"/> My Bids</p>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
