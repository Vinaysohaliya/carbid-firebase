import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitVehicleDetails } from '../Redux/vehicleSlice.js';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Radio, RadioGroup, Input, Divider, Checkbox, ScrollShadow, Image } from '@nextui-org/react';
import LoadingButton from './LoadingButton ';


import toast from 'react-hot-toast';

const SimpleVehicleForm = ({ onAddNewVehicle }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.data.uid);
  const [isLoading, setisLoding] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [idPreviews, setidPreviews] = useState();
  const [formDisabled, setFormDisabled] = useState(false);
  const [idProof, setIdProof] = useState('');
  const [vehiclePhotos, setVehiclePhotos] = useState([]);
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    sellerType: 'individual',
    name: '',
    mobile: '',
    address: '',
    registrationYear: '',
    brand: '',
    model: '',
    travelDistance: 0,
    transmission: '',
    ownerType: '',
    carLocation: '',
    modification: '',
    'modificationDetails': '',
    pickupLocation: '',
    dealershipName: '',
    website: '',
    city: '',
    vehicleType: 'car',
    'fuelType': 'petrol'
  });





  const handlepickup = (e) => {
    if (e.target.checked) {
      setFormData({ ...formData, pickupLocation: formData.carLocation });
    } else {
      setFormData({ ...formData, pickupLocation: '' });
    }
  }

  const handlePhotoUpload = (files) => {
    const photoFiles = Array.from(files);
    setVehiclePhotos(photoFiles);
    const previews = photoFiles.map((file) => URL.createObjectURL(file));
    setPhotoPreviews(previews);

  };

  const handelIdproof = (files) => {
    setIdProof(files);
    const previews = URL.createObjectURL(files);
    setidPreviews(previews);


  };

  const handleSubmit = async (e) => {
    setisLoding(true);
    e.preventDefault();
    try {
      const missingFields = [];
      if (!formData.address) missingFields.push('Address');
      if (!formData.brand) missingFields.push('Brand');
      if (!formData.carLocation) missingFields.push('Car Location');
      if (!formData.mobile) missingFields.push('Mobile');
      if (!formData.model) missingFields.push('Model');
      if (!formData.modification) missingFields.push('Modification');
      if (!formData.name) missingFields.push('Name');
      if (!formData.ownerType) missingFields.push('Owner Type');
      if (!formData.pickupLocation) missingFields.push('Pickup Location');
      if (!formData.registrationYear) missingFields.push('Registration Year');
      if (!formData.sellerType) missingFields.push('Seller Type');
      if (!formData.transmission) missingFields.push('Transmission');
      if (!formData.travelDistance) missingFields.push('Travel Distance');
      if (!idProof) missingFields.push('ID Proof');
      if (!formData.vehicleType) missingFields.push('vehicleType');
      if (!formData.fuelType) missingFields.push('fuelType');
      if (!formData.city) missingFields.push('city');
      if (vehiclePhotos.length === 0) missingFields.push('Vehicle Photos');

      if (formData.sellerType === 'dealer') {
        if (!formData.dealershipName) missingFields.push('Dealership Name');
        if (!formData.salesRange) missingFields.push('Sales Range');
      }

      if (missingFields.length > 0) {
        const missingFieldsString = missingFields.join(', ');
        toast.error(`Please fill all required fields: ${missingFieldsString}`);
        return;
      }

      await dispatch(submitVehicleDetails({
        vehicleData: formData,
        vehiclePhotos,
        userId: currentUser,
        idProof,
        stage
      }));

      setFormData({
        sellerType: 'individual',
        name: '',
        mobile: '',
        address: '',
        registrationYear: '',
        brand: '',
        model: '',
        travelDistance: '',
        transmission: '',
        ownerType: '',
        carLocation: '',
        modification: '',
        pickupLocation: '',
        dealershipName: '',
        website: '',
        city: '',
        'fuelType': 'petrol',
        'vehicleType': 'car'
      });
      setStage(1);
      onAddNewVehicle(true);
      onClose();
    } catch (error) {
      console.error('Error submitting vehicle details:', error.message);
    } finally {
      setisLoding(false);
    }
  };


  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <div>
            <RadioGroup value={formData.sellerType} label="Seller Type" onChange={(value) => setFormData({ ...formData, sellerType: value.target.value })}>
              <div className='flex'>
                <Radio value="dealer" className=' mr-2'>Dealer</Radio>
                <Radio value="individual">Individual</Radio>
              </div>
            </RadioGroup>
            <h2>Seller Information</h2>
            {formData.sellerType === 'individual' && <div className='flex flex-col my-2'>
              <div className='flex my-2'>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  radius='sm'
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='mr-2'
                />
                <Input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  radius='sm'
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>
              <Input
                type="text"
                placeholder="Enter your address"
                value={formData.address}
                radius='sm'
                className='mb-2 '
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            }

            <label className="block m-4">
              <span className="text-gray-700">Upload your ID proof</span>
              <div className="mt-1 flex  flex-col">
                <span className="text-gray-500">(PDF, PNG, JPG up to 5MB)</span>
                <span className=" bg-gray-200 rounded-md px-3 py-1 size-2/5 flex items-center justify-center text-sm font-medium text-gray-700 mr-2">
                  Choose file
                </span>
                <input type="file" className="sr-only" onChange={(e) => handelIdproof(e.target.files[0])} />
              </div>
            </label>
            <Image
              src={idPreviews}
              alt='Proof'
              className="w-20 h-20 object-cover rounded-md mr-2"

            />
            {formData.sellerType === 'dealer' && (
              <div className=' flex flex-col'>

                <div><Input
                  type="text"
                  placeholder="Enter dealership name"
                  value={formData.dealershipName}
                  radius='sm'
                  onChange={(e) => setFormData({ ...formData, dealershipName: e.target.value })}
                  className='mb-2 w-1/2'
                />
                </div>
                <div className=' flex'>
                  <Input
                    type="text"
                    placeholder="Enter Delear your name"
                    value={formData.name}
                    radius='sm'
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className='mr-2'
                  />
                  <Input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    radius='sm'
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className='mb-2'
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Enter your address"
                    value={formData.address}
                    radius='sm'
                    className='mb-2'
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className=' flex'>
                  <Input
                    type="text"
                    placeholder="Enter website"
                    value={formData.website}
                    radius='sm'
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className='mb-2 mr-2'
                  />
                  <Input
                    type="text"
                    placeholder="Enter sales range"
                    value={formData.salesRange}
                    radius='sm'
                    onChange={(e) => setFormData({ ...formData, salesRange: e.target.value })}
                    className='mb-2'
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <ScrollShadow hideScrollBar className="w-[600px] h-[400px]">
            <div className=' flex flex-col'>
              <div >
                <select
                  value={formData.registrationYear}
                  onChange={(e) => setFormData({ ...formData, registrationYear: e.target.value })}
                  className="mt-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select registration year</option>
                  {[2022, 2021, 2020, 2019, 2018].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="mt-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">City</option>
                  {['bengaluru'].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>

              </div>
              <div className=' flex items-center justify-between my-2'>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className='mt-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                >
                  <option value="">Select vehicle brand</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Ford">Ford</option>
                </select>

                <select
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className='mt-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                >
                  <option value="">Select vehicle model</option>
                  {formData.brand === 'Toyota' && (
                    <>
                      <option value="Corolla">Corolla</option>
                      <option value="Camry">Camry</option>
                    </>
                  )}
                  {formData.brand === 'Honda' && (
                    <>
                      <option value="Civic">Civic</option>
                      <option value="Accord">Accord</option>
                    </>
                  )}
                </select>
              </div>

              <div className=' flex items-center justify-between my-2'>

                <div>
                  <label value="">Select vehicleType </label>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className='mt-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="scooty">Scooty</option>
                  </select>
                </div>


                <div>
                  <label value="">Select fuelType </label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    className='mt-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="cng">CNG</option>
                  </select>
                </div>


              </div>



            </div>
            <div className=' flex items-center w-full justify-between mb-2'>
              <div className='w-full'>
                <p>Distance Travel</p>
                <Input
                  type="text"
                  placeholder="Travel Distance (in kilometers)"
                  value={formData.travelDistance}
                  radius='sm'
                  className='mt-2 w-2/3 '
                  onChange={(e) => setFormData({ ...formData, travelDistance: e.target.value })}
                />
              </div>
              <div className=''>
                <p>Transmission Type</p>
                <RadioGroup
                  value={formData.transmission}
                  // label=""
                  className="mt-2 "
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                >
                  <div className=' flex items-center w-1/2'>
                    <Radio value="auto">Automatic</Radio>
                    <Radio value="manual">Manual</Radio>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <RadioGroup
              value={formData.ownerType}
              label="Owner Type"
              className="mt-2"
              onChange={(e) => setFormData({ ...formData, ownerType: e.target.value })}
            >
              <div className='flex mb-2'>
                <Radio value="first" >First Owner</Radio>
                <Radio value="second" className='mx-2'>Second Owner</Radio>
                <Radio value="third">Third Owner</Radio>
              </div>
            </RadioGroup>
            <Input
              type="text"
              placeholder="Car Location"
              value={formData.carLocation}
              radius='sm'
              className='mt-2'
              onChange={(e) => setFormData({ ...formData, carLocation: e.target.value })}
            />
            <RadioGroup
              value={formData.modification}
              label="Has there been any modification?"
              className="mt-2"
              onChange={(e) => setFormData({ ...formData, modification: e.target.value })}
            >
              <div className='flex'>
                <Radio value="yes" >Yes</Radio>
                <Radio value="no" className='mx-2'>No</Radio>
              </div>
            </RadioGroup>
            {formData.modification === 'yes' && (
              <Input
                type="text"
                placeholder="Enter modification details"
                value={formData.modificationDetails}
                radius='sm'
                onChange={(e) => setFormData({ ...formData, modificationDetails: e.target.value })}
              />
            )}

          </ScrollShadow>

        );

      case 3:
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
            <div className="flex mt-2">
              {photoPreviews.map((preview, index) => (
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md mr-2"
                />
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2>Pickup Location</h2>
            <div className='flex items-center'>
              <Checkbox
                onChange={handlepickup}  >Same as car location</Checkbox>
            </div>
            <Input
              type="text"
              placeholder="Enter pickup location"
              value={formData.pickupLocation}
              radius='sm'
              onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
            />

          </div>
        );

    }

  };


  return (
    <>
      <Button onPress={onOpen} disabled={formDisabled}>Add Vehicle</Button>
      <Modal size='2xl' isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Submit Vehicle Details</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              {renderStage()}
              <Divider />
              <div className='my-4 flex items-center justify-end'>

                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <>
                    <Button
                      radius='sm'
                      className='mr-2'
                      onClick={() => setStage((prevStage) => Math.max(prevStage - 1, 1))}
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      radius='sm'
                      onClick={(e) => {
                        if (stage === 4) {
                          handleSubmit(e);
                        } else {
                          setStage(prevStage => prevStage + 1);
                        }
                      }}
                    >
                      {(stage === 4) ? 'Submit' : 'Next'}
                    </Button>
                  </>
                )}



              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  );
};

export default SimpleVehicleForm;
