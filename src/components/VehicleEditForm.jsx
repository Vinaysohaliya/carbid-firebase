import React, { useState } from 'react';
import {
  Input,
  Button,
  ModalBody,
  RadioGroup,
  Radio,
  Checkbox,
  Image,
  ScrollShadow,
  RadioGroupProvider,
} from '@nextui-org/react';
import { updateVehicleDetails } from '../Redux/vehicleSlice';
import { useDispatch } from 'react-redux';

const VehicleEditForm = ({ selectedVehicle, onClose }) => {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    ...selectedVehicle
  });
  const dispatch = useDispatch();
  const [photoPreviews, setPhotoPreviews] = useState({
    interior: [],
    exterior: [],
    features: [],
    imperfections: [],
  });
  const [idPreviews, setIdPreviews] = useState([]);

  const handlePhotoUpload = (section, files) => {
    const photoFiles = Array.from(files);
    const previews = photoFiles.map((file) => URL.createObjectURL(file));
    setPhotoPreviews({
      ...photoPreviews,
      [section]: [...photoPreviews[section], ...previews],
    });
    setFormData({
      ...formData,
      [section]: [...(formData[section] || []), ...photoFiles],
    });
  };

  const handleIdProofUpload = (file) => {
    const preview = URL.createObjectURL(file);
    setIdPreviews([preview]);
    setFormData({ ...formData, idProof: file });
  };

  const handleRemovePhoto = (section, index) => {
    const updatedPreviews = photoPreviews[section].filter((_, i) => i !== index);
    const updatedFiles = (formData[section] || []).filter((_, i) => i !== index);
    setPhotoPreviews({ ...photoPreviews, [section]: updatedPreviews });
    setFormData({ ...formData, [section]: updatedFiles });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const renderPhotoSection = (label, section) => (
    <div>
      <h3>{label}</h3>
      <div className="flex gap-2">
        {photoPreviews[section].map((preview, index) => (
          <div key={index} className="relative">
            <Image src={preview} alt={`${label} Photo ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
            <Button size="small" auto flat onClick={() => handleRemovePhoto(section, index)} className="absolute top-0 right-0">
              X
            </Button>
          </div>
        ))}
        <input type="file" multiple onChange={(e) => handlePhotoUpload(section, e.target.files)} className="hidden" id={`${section}-upload`} />
        <label htmlFor={`${section}-upload`} className="cursor-pointer">
          <div className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md">
            +
          </div>
        </label>
      </div>
    </div>
  );

  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <div>
            <RadioGroup
              value={formData.sellerType}
              label="Seller Type"
              onChange={(e) => setFormData({ ...formData, sellerType: e.target.value })}
            >
              <Radio value="dealer">Dealer</Radio>
              <Radio value="individual">Individual</Radio>
            </RadioGroup>
            <Input
              type="text"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              type="tel"
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <input type="file" onChange={(e) => handleIdProofUpload(e.target.files[0])} />
            {idPreviews.map((preview, index) => (
              <Image key={index} src={preview} alt={`ID Proof Preview ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
            ))}
            <Input
              type="text"
              label="Registration Year"
              name="registrationYear"
              value={formData.registrationYear}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Travel Distance"
              name="travelDistance"
              value={formData.travelDistance}
              onChange={handleChange}
            />
            <RadioGroup
              value={formData.transmission}
              label="Transmission"
              onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
            >
              <Radio value="auto">Automatic</Radio>
              <Radio value="manual">Manual</Radio>
            </RadioGroup>
            <RadioGroup
              value={formData.ownerType}
              label="Owner Type"
              onChange={(e) => setFormData({ ...formData, ownerType: e.target.value })}
            >
              <Radio value="first">First Owner</Radio>
              <Radio value="second">Second Owner</Radio>
              <Radio value="third">Third Owner</Radio>
            </RadioGroup>
            <Checkbox name="pickupLocationSame" checked={formData.pickupLocationSame} onChange={handleChange}>
              Same as car location
            </Checkbox>
            <Input
              type="text"
              label="Pickup Location"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center">
            <RadioGroup
              label="Safety Rating"
              value={formData.safetyRating}
              onChange={(e) => setFormData({ ...formData, safetyRating: e.target.value })}
            >
              <Radio value="NCAL">NCAL</Radio>
              <Radio value="GNCAP">GNCAP</Radio>
            </RadioGroup>
          </div>
        );
      case 3:
        return (
          <div>
            <RadioGroup
              label="Has there been any modification"
              value={formData.modification}
              onChange={(e) => setFormData({ ...formData, modification: e.target.value })}
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </RadioGroup>
            {formData.modification === 'yes' && (
              <>
                <h2>If Yes, Please Specify</h2>
                <Input
                  type="text"
                  name="modificationDetails"
                  value={formData.modificationDetails}
                  onChange={handleChange}
                />
              </>
            )}
          </div>
        );
      case 4:
        return (
          <div>
            {renderPhotoSection('Interior', 'interior')}
            {renderPhotoSection('Exterior', 'exterior')}
            {renderPhotoSection('Features', 'features')}
            {renderPhotoSection('Imperfections', 'imperfections')}
          </div>
        );
      case 5:
        return (
          <div>
            <h3>Status</h3>
            <RadioGroup
              value={formData.evaluationDone}
              label="Status"
              onChange={(e) => setFormData({ ...formData, evaluationDone: e.target.value })}
            >
              <Radio value="APPROVE">Approve</Radio>
              <Radio value="DECLINE">Decline</Radio>
            </RadioGroup>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { userEmail,userName,vehicleId, ...updatedDataWithoutEmailNameAndvehicleId } = formData;

      await dispatch(updateVehicleDetails({ vehicleId:selectedVehicle.vehicleId, updatedData: updatedDataWithoutEmailNameAndvehicleId }));
      alert("Vehicle details updated successfully");
    } catch (err) {
      console.error('Failed to update vehicle details:', err);
      alert('Failed to update vehicle details');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderStage()}
      <Button onClick={() => setStage(stage > 1 ? stage - 1 : 1)}>Previous</Button>
      <Button onClick={() => setStage(stage < 5 ? stage + 1 : 5)}>Next</Button>
      {stage === 5 && <Button type="submit">Confirm & Proceed</Button>}
      <Button onClick={onClose}>Close</Button>
    </form>
  );
};

export default VehicleEditForm;
