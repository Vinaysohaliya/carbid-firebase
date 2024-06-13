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
import { IoCloseSharp } from "react-icons/io5";
import { updateVehicleDetails } from '../Redux/vehicleSlice';
import { useDispatch } from 'react-redux';

const VehicleEditForm = ({ selectedVehicle, onClose }) => {
  const [stage, setStage] = useState(1);

  const [formData, setFormData] = useState({
    ...selectedVehicle
  });
  const dispatch = useDispatch();
  const [interiorPhotos, setInteriorPhotos] = useState([]);
  const [interiorPreviews, setInteriorPreviews] = useState([]);
const [idProofEvaluterPanel, setidProofEvaluterPanel] = useState();
const [IdPreviews , setIdPreviews ] = useState();
const [formVisible, setFormVisible] = useState(true)

  const handlePhotoUpload = (files) => {
    const photoFiles = Array.from(files);
    const previews = photoFiles.map((file) => URL.createObjectURL(file));
    setInteriorPhotos((prevPhotos) => [...prevPhotos, ...photoFiles]);
    setInteriorPreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };
  
  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...interiorPhotos];
    updatedPhotos.splice(index, 1);
    setInteriorPhotos(updatedPhotos);

    const updatedPreviews = [...interiorPreviews];
    updatedPreviews.splice(index, 1);
    setInteriorPreviews(updatedPreviews);
  };


  const handleIdProofUpload = (file) => {
    const preview = URL.createObjectURL(file);
    setIdPreviews([preview]);
    setidProofEvaluterPanel({  idProof: file });
  };




  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

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
              <Radio value="dealer"><span className='text-blue-600'>Dealer</span></Radio>
              <Radio value="individual"><span className='text-blue-600'>Individual</span></Radio>
            </RadioGroup>
            <Input
              type="text"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className='mb-3 mt-2'
            />
            <Input
              type="tel"
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
               className='mb-3'
            />
            <Input
              type="text"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
               className='mb-3'
            />
            <label className="block m-4">
              <div className="mt-1 flex  flex-col">
                <span className=" bg-blue-600 rounded-md px-3 py-1 size-2/5 flex items-center justify-center text-sm font-medium mr-2 text-white">
                  Choose file
                </span>
                <input type="file" className="sr-only" onChange={(e) => handleIdProofUpload(e.target.files[0])} />
              </div>
            </label>
            {/* <input type="file" onChange={(e) => handleIdProofUpload(e.target.files[0])} /> */}
            <Image src={IdPreviews} alt={'ID Proof'} className="w-20 h-20 object-cover rounded-md" />

            <Image src={formData.idProof} alt={'ID Proof'} className="w-20 h-20 object-cover rounded-md" />
            <Input
              type="text"
              label="Registration Year"
              name="registrationYear"
              value={formData.registrationYear}
              onChange={handleChange}
               className='mb-3 mt-2'
            />
            <Input
              type="text"
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className='mb-3'
              
            />
            <Input
              type="text"
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className='mb-3'

            />
            <Input
              type="text"
              label="Travel Distance"
              name="travelDistance"
              value={formData.travelDistance}
              onChange={handleChange}
              className='mb-3'

            />
            <RadioGroup
              value={formData.transmission}
              label="Transmission"
              onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
            >
              <Radio value="auto"><span className='text-blue-600'>Automatic</span></Radio>
              <Radio value="manual"><span className='text-blue-600'>Manual</span></Radio>
            </RadioGroup>
            <RadioGroup
              value={formData.ownerType}
              label="Owner Type"
              onChange={(e) => setFormData({ ...formData, ownerType: e.target.value })}
            >
              <Radio value="first"><span className='text-blue-600'>First Owner</span></Radio>
              <Radio value="second"><span className='text-blue-600'>Second Owner</span></Radio>
              <Radio value="third"><span className='text-blue-600'>Third Owner</span></Radio>
            </RadioGroup>
            <Checkbox name="pickupLocationSame" checked={formData.pickupLocationSame} onChange={handleChange}>
            <span className='text-blue-600'>Same as car location</span>
            </Checkbox>
            <Input
              type="text"
              label="Pickup Location"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className='mb-4 mt-4'
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
              <Radio value="NCAL"><span className='text-blue-600'>NCAL</span></Radio>
              <Radio value="GNCAP"><span className='text-blue-600'>GNCAP</span></Radio>
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
              <Radio value="yes"><span className='text-blue-600'>Yes</span></Radio>
              <Radio value="no"><span className='text-blue-600'>No</span></Radio>
            </RadioGroup>
            {formData.modification === 'yes' && (
              <>
                <h2 className='text-blue-600 mt-3 mb-4'>If Yes, Please Specify</h2>
                <Input
                  type="text"
                  name="modificationDetails"
                  value={formData.modificationDetails}
                  onChange={handleChange}
                  className='mb-5'
                />
              </>
            )}
          </div>
        );
      case 4:
        return (
          <div>
          <h3>Photos</h3>
          <div className="flex gap-2">
            {formData.vehiclePhotos.map((photo, index) => (
              <div key={index} className="relative">
                <Image src={photo} alt={`Vehicle Photo ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
              </div>
            ))}

            {interiorPreviews.map((preview, index) => (
              <div key={index} className="relative">
                <Image src={preview} alt={`Interior Photo ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
                <IoCloseSharp onClick={() => handleRemovePhoto(index)} className="absolute z-10 top-0 right-0 bg-red-600 rounded-md cursor-pointer" />
              </div>
            ))}
            <input type="file" multiple onChange={(e) => handlePhotoUpload(e.target.files)} className="hidden" id="interior-upload" />
            <label htmlFor="interior-upload" className="cursor-pointer">
              <div className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md">
                +
              </div>
            </label>
          </div>
        </div>
        );
      case 5:
        return (
          <div className='mb-5'>
            <h3 className='text-blue-600'>Status</h3>
            <Input
              type="number"
              label="Name"
              name="name"
              value={formData.startingBid}
              onChange={(e) => setFormData({ ...formData, startingBid: e.target.value })}
            />
            <RadioGroup
              value={formData.evaluationDone}
              label="Status"
              onChange={(e) => setFormData({ ...formData, evaluationDone: e.target.value })}
            >
              <Radio value="APPROVE"><span className='text-blue-600'>Approve</span></Radio>
              <Radio  value="DECLINE"><span className=' text-blue-600'>Decline</span></Radio>
            </RadioGroup>
          </div>
        );

    }
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { userEmail, userName, vehicleId, ...updatedDataWithoutEmailNameAndvehicleId } = formData;

      await dispatch(updateVehicleDetails({
        vehicleId: selectedVehicle.vehicleId,
        idProofEvaluterPanel,
        updatedData: { ...updatedDataWithoutEmailNameAndvehicleId, vehiclePhotos: interiorPhotos }
      }));
      setFormVisible(false)
    } catch (err) {
      console.error('Failed to update vehicle details:', err);
      alert('Failed to update vehicle details');
    }
  };
  if (!formVisible) {
     alert("SUCCESS")
  }

  return (
    <form onSubmit={handleSubmit} >
      <ScrollShadow className="w-full sm:w-[450px] sm:h-[400px] max-w-full max-h-[75vh] overflow-auto">

        {renderStage()}
        <div className='flex justify-around mt-12'>
        {stage > 1 && (
      <Button className='bg-blue-600 text-white mr-2' onClick={() => setStage(stage - 1)}>Previous</Button>
    )}
    {stage < 5 && (
      <Button className='bg-blue-600 text-white mr-2' onClick={() => setStage(stage + 1)}>Next</Button>
    )}
    {stage === 5 && (
      <Button  className='bg-blue-600 text-white mr-2' type="submit">Confirm & Proceed</Button>
    )}
    <Button className='bg-blue-600 text-white' onClick={onClose}>Close</Button>
        </div>
      </ScrollShadow>
    </form>
  );
};

export default VehicleEditForm;
