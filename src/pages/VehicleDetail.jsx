import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { checkIfVehicleLiked, fetchVehicle, toggleVehicleLike } from '../Redux/vehicleSlice';
import { Input, Button, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Popover, PopoverTrigger, PopoverContent, Image } from '@nextui-org/react';
import Vehicleinfo from '../components/Vehicleinfo';
import { fetchBidData } from '../Redux/auctionSlice';
import { placeBid } from '../Redux/bidSlice';

const VehicleDetail = () => {
  const userName = useSelector((state) => state.auth.data.displayName);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bidAmount, setBidAmount] = useState(0);
  const [message, setMessage] = useState('');
  const userId = useSelector((state) => state.auth.data.uid);
  const vehicle = useSelector((state) => state.vehicle.onevehicle);
  const [startingBid, setStartingBid] = useState(null);
  const [highestBid, setHighestBid] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchVehicle({ vehicleId: id }));
      const isLiked = await dispatch(checkIfVehicleLiked({ vehicleId: id, userId }));
      setIsLiked(isLiked.payload);
    };
    fetchData();
  }, [dispatch, id, userId]);

  useEffect(() => {
    const fetchBidAmounts = async () => {
      if (vehicle) {
        try {
          // Fetch bid data directly here
          const res = await dispatch(fetchBidData({ auctionId: vehicle.auctionId, vehicleId: vehicle.id }));
          console.log(res);
          // Assuming 'res.payload' contains the 'highestBid' and 'firstBid' objects
          setStartingBid(res.payload.firstBid);
          setHighestBid(res.payload.highestBid);
        } catch (error) {
          console.error('Error fetching bid data:', error);
        }
      }
    };

    if (vehicle) {
      fetchBidAmounts();
    }
  }, [dispatch, vehicle]);

  const handleLike = async () => {
    const res = await dispatch(toggleVehicleLike({ vehicleId: id, userId }));
    setIsLiked(res.payload);
  };

  const handleChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handlePlaceBid = async () => {
    try {
      const res = await dispatch(placeBid({ auctionId: vehicle.auctionId, bidAmount: parseFloat(bidAmount), userId, userName }));
      setMessage(res.payload.message);
      // Close the modal after placing the bid
      onClose();
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!vehicle) {
    return <div>No auction details found</div>;
  }

  return (
    <div>
      <div className='flex mt-10'>
        <div className='w-1/2 flex flex-col items-center'>
          <Image width={600} isZoomed alt="hero Image" src={selectedImage ? selectedImage : vehicle.vehiclePhotos[0]} />

          <div className='flex mt-2'>
            {vehicle.vehiclePhotos.map((photo, index) => (
              <div key={index} className='mr-2' onClick={() => setSelectedImage(photo)}>
                <img radius='sm' width={110} alt="NextUI hero Image" src={photo} />
              </div>
            ))}
          </div>
        </div>
        <div className='w-1/2'>
          <div className='flex justify-between m-2'>
            <div className='font-bold'>Model name</div>
            <div>
              {<Button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</Button>}
            </div>
          </div>
          <div className='flex flex-col'>
            <ul className='flex gap-4'>
              {[...Array(4)].map((_, index) => (
                <li key={index}>
                  <div placement="right">
                    <div>
                      <Button>Open Popover</Button>
                    </div>
                    <div>
                      <div className="px-1 py-2">
                        <div className="text-small font-bold">Popover Content</div>
                        <div className="text-tiny">This is the popover content</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className='flex-col mt-6'>
              <div className='mb-2'>L  Noida utterdrades</div>
              <div className='mb-2'>H  test drive available</div>
              <div className='mb-2'>Check inspection report</div>
              <div className='mb-2'>Check service history</div>
            </div>
            <div className='flex mt-5'>
              <div className='mr-14' style={{ width: '30%' }}>
                <div>
                  <div>{startingBid}</div>
                  <div className='font-light'>Starting Bid</div>
                  <Button fullWidth>Book Test Drive</Button>
                </div>
              </div>
              <div style={{ width: '30%' }}>
                <div>
                  <div>{highestBid}</div>
                  <div className='font-light'>Current bid</div>
                  <Button onPress={onOpen} fullWidth>Place Bid</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Vehicleinfo Vehicleinfo={vehicle} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Place your Bid</ModalHeader>
          <ModalBody>
            <div className="flex items-center justify-center flex-col">
              <div className='flex items-center justify-between w-full '>
                <div className='mx-2'>
                  <div className='font-light'>Current Bid</div>
                  <div className='font-bold'>24L</div>
                </div>
                <div className='mx-2'>
                  <div className='font-light'>Current Bid</div>
                  <div className='font-bold'>24L</div>
                </div>
              </div>
              <div className="flex flex-col w-80 m-4">
                <Input type="number" placeholder='Enter Bid Amount' value={bidAmount} onChange={handleChange} />
              </div>
              <Divider />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>Close</Button>
            <Button color="primary" onPress={handlePlaceBid}>Place Bid</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default VehicleDetail;
