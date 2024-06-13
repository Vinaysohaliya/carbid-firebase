import React from 'react';

const Denied = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
        <p className="text-lg">You do not have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Denied;
