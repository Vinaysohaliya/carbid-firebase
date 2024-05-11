import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { checkIfVehicleLiked, fetchVehicle, toggleVehicleLike,  } from '../Redux/vehicleSlice';
import { placeBid } from '../Redux/bidSlice';
import { Input, Button, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import Vehicleinfo from '../components/Vehicleinfo';
import useBidAmounts from '../hooks/useBidAmount';

const VehicleDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bidAmount, setBidAmount] = useState(0);
  const [message, setMessage] = useState('');
  const userId = useSelector((state) => state.auth.data.uid);
  const userName = useSelector((state) => state.auth.data.displayName);
  const vehicle = useSelector((state) => state.vehicle.onevehicle);
  const { startingBid, highestBid } = useBidAmounts();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchVehicle({vehicleId:id}));
      const isLiked = await dispatch(checkIfVehicleLiked({ vehicleId: id, userId }));
      setIsLiked(isLiked.payload);
    };
    fetchData();
  }, [dispatch, id, userId]);
  

  const handleLike = async () => {
    const res=await dispatch(toggleVehicleLike({ vehicleId: id, userId }));
    if(res.payload){
      setIsLiked(true);
    }else{
      setIsLiked(false);
    }
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
          <img width={600} isZoomed alt="NextUI hero Image" src={vehicle.imageUrl} />
          <div className='flex mt-2'>
            {[...Array(5)].map((_, index) => (
              <div key={index} className='mr-2'>
                <img radius='sm' width={110} alt="NextUI hero Image" src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" />
              </div>
            ))}
          </div>
        </div>
        <div className='w-1/2'>
          <div className='flex justify-between m-2'>
            <div className='font-bold'>Model name</div>
            <div>
              {   <Button onClick={handleLike}>{isLiked?"Unlike":"Like"}</Button>}
            </div>
          </div>
          <div className='flex flex-col'>
            <ul className='flex gap-4'>
              {[...Array(4)].map((_, index) => (
                <li key={index}>
                  <Popover placement="right">
                    <PopoverTrigger>
                      <Button>Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="px-1 py-2">
                        <div className="text-small font-bold">Popover Content</div>
                        <div className="text-tiny">This is the popover content</div>
                      </div>
                    </PopoverContent>
                  </Popover>
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
                  <div className='font-light'>Current bid</div>
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
      <Vehicleinfo />
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
