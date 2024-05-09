import React from 'react';

const UploadPhotos = ({ formData, setFormData }) => {
  const handlePhotoUpload = (files) => {
    // Handle photo upload
  };

  return (
    <div>
      <input
        type="file"
        placeholder="Upload vehicle photos"
        onChange={(e) => handlePhotoUpload(e.target.files)}
        multiple
        radius='sm'
        className='mt-2'
      />
    </div>
  );
};

export default UploadPhotos;
