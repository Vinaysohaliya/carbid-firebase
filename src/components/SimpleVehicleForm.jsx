import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicle, submitVehicleDetails } from '../Redux/vehicleSlice.js';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Radio, RadioGroup, Input, Divider, Checkbox, ScrollShadow } from '@nextui-org/react';
import { addToAuction } from '../Redux/auctionSlice.js';

const SimpleVehicleForm = ({ vehicle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser=useSelector((state)=>state.auth.data.uid);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [startingBid, setStartBid] = useState('');

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const [auctionStatus, setAuctionStatus] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  
  const [idProof, setIdProof] = useState('');
  const [vehiclePhotos, setVehiclePhotos] = useState([]);

  const [dataFetched, setDataFetched] = useState(false);
  const [stage, setStage] = useState(1);
  const [idProofError, setIdProofError] = useState('');
  const [formData, setFormData] = useState({
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
    salesRange: '',
  });

  const handleAgreeToTerms = (checked) => {
    setAgreeToTerms(checked);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (vehicle) {
        try {
          const res = await dispatch(fetchVehicle({ vehicleId: vehicle.id }));
          const vehicleData = res.payload;
          setFormData({
            sellerType: vehicleData.sellerType,
            name: vehicleData.name,
            mobile: vehicleData.mobile,
            address: vehicleData.address,
            registrationYear: vehicleData.registrationYear,
            brand: vehicleData.brand,
            model: vehicleData.model,
            travelDistance: vehicleData.travelDistance,
            transmission: vehicleData.transmission,
            ownerType: vehicleData.ownerType,
            carLocation: vehicleData.carLocation,
            modification: vehicleData.modification,
            pickupLocation: vehicleData.pickupLocation,
            dealershipName: vehicleData.dealershipName,
            website: vehicleData.website,
            evalutionDone:vehicleData.evalutionDone,
          });
          setDataFetched(true);
          setAuctionStatus(vehicleData.auctionStatus);
          setFormDisabled(vehicleData.auctionStatus);
          setStage(vehicleData.auctionStatus ? 5 : 1);
        } catch (error) {
          console.error('Error fetching vehicle data:', error.message);
        }
      }
    };

    fetchData();
  }, [dispatch, vehicle]);

 

  const handleStartBidChange = (e) => {
    setStartBid(e.target.value);
  };
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
  };

  const handelIdproof = (files) => {
    setIdProof(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (stage === 4) {
        if (!idProof) {
          setIdProofError('Please upload your ID proof.');
          return;
        } else {
          setIdProofError('');
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
          salesRange: '',
        });
        setStage(1);
        onClose();
      } else if (stage === 7) {
        await dispatch(submitVehicleDetails({
          vehicleId:vehicle.id,
          agreeToTerms,
          startingBid,
          stage
        }));
      }
    } catch (error) {
      console.error('Error submitting vehicle details:', error.message);
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
            {formData.sellerType === 'individual' && <div className='flex my-2'>
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
              <Input
                type="text"
                placeholder="Enter your address"
                value={formData.address}
                radius='sm'
                className='mb-2'
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            }

            {idProofError && <p className="text-red-500">{idProofError}</p>}
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
            {formData.sellerType === 'dealer' && (
              <>
                <Input
                  type="text"
                  placeholder="Enter dealer name"
                  value={formData.dealerName}
                  radius='sm'
                  onChange={(e) => setFormData({ ...formData, dealerName: e.target.value })}
                  className='mb-2'
                />
                <Input
                  type="text"
                  placeholder="Enter dealership name"
                  value={formData.dealershipName}
                  radius='sm'
                  onChange={(e) => setFormData({ ...formData, dealershipName: e.target.value })}
                  className='mb-2'
                />
                <Input
                  type="text"
                  placeholder="Enter website"
                  value={formData.website}
                  radius='sm'
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className='mb-2'
                />
                <Input
                  type="text"
                  placeholder="Enter sales range"
                  value={formData.salesRange}
                  radius='sm'
                  onChange={(e) => setFormData({ ...formData, salesRange: e.target.value })}
                  className='mb-2'
                />
              </>
            )}
          </div>
        );

      case 2:
        return (
          <ScrollShadow hideScrollBar className="w-[300px] h-[400px]">
            <div>
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
              {/* Repeat the same approach for other fields */}
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
                    {/* Add more options as needed */}
                  </>
                )}
              </select>

            </div>
            <Input
              type="text"
              placeholder="Travel Distance (in kilometers)"
              value={formData.travelDistance}
              radius='sm'
              className='mt-2'
              onChange={(e) => setFormData({ ...formData, travelDistance: e.target.value })}
            />
            <RadioGroup
              value={formData.transmission}
              label="Transmission Type"
              className="mt-2"
              onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
            >
              <Radio value="auto">Automatic</Radio>
              <Radio value="manual">Manual</Radio>
            </RadioGroup>
            <RadioGroup
              value={formData.ownerType}
              label="Owner Type"
              className="mt-2"
              onChange={(e) => setFormData({ ...formData, ownerType: e.target.value })}
            >
              <Radio value="first">First Owner</Radio>
              <Radio value="second">Second Owner</Radio>
              <Radio value="third">Third Owner</Radio>
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
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </RadioGroup>

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
        // if (!dataFetched || !formData.evalutionDone) {
        //   // If data is not fetched or evaluation is not done, show only case 5
        //   return (
        //     <div>
        //       <p>Evaluation is not done yet. Please wait.</p>
        //     </div>
        //   );
        // }
      
        // switch (stage) {
        //   case 5:
        //     return (
        //       <div>
        //         <h2>Evaluation Done</h2>
        //         {/* Your content for case 5 */}
        //       </div>
        //     );
        //   default:
        //     return (
        //       <div>
        //         <p>Evaluation is done. You cannot move to other stages.</p>
        //       </div>
        //     );
        // }
      // case 5:
      //   return (<>hij</>);
      // case 6:
      //   return (<>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      //     <Input type='checkbox' onChange={(e) => handleAgreeToTerms(e.target.checked)}>
      //       I agree to the terms and conditions
      //     </Input>

      //   </>);
      //   case 7:
        
        
      //     return (
      //       <div>
      //         <h2>Bid Information</h2>
      //         <p>Estimated Bid Range: 50</p>
      //         <Input
      //           type="text"
      //           placeholder="Enter your starting bid"
      //           value={startingBid}
      //           onChange={handleStartBidChange}
      //           radius="sm"
      //           className="mt-2"
      //         />
      //       </div>
      //     );
        
    }
    
  };


  return (
    <>
     <h2>Submit Vehicle Details</h2>
    <Button onPress={onOpen} disabled={formDisabled}>Add Vehicle</Button>
    <Modal size='2xl' isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Submit Vehicle Details</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            {renderStage()}
            <Divider />
            <div className='my-4 flex items-center justify-end'>
              <Button radius='sm' className='mr-2' onClick={() => setStage((prevStage) => Math.max(prevStage - 1, 1))}> 
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
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
    
  );
};

export default SimpleVehicleForm;
