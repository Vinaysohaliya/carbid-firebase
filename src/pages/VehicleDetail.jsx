import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { checkIfVehicleLiked, fetchVehicle, toggleVehicleLike } from '../Redux/vehicleSlice';
import { Input, Button, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Popover, PopoverTrigger, PopoverContent, Image, ScrollShadow } from '@nextui-org/react';
import Vehicleinfo from '../components/Vehicleinfo';
import { fetchBidData } from '../Redux/auctionSlice';
import { placeBid } from '../Redux/bidSlice';
import LoadingButton from '../components/LoadingButton ';
import toast from 'react-hot-toast';


const VehicleDetail = () => {
  const userName = useSelector((state) => state.auth.data.displayName);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bidAmount, setBidAmount] = useState(0);
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
          const res = await dispatch(fetchBidData({ auctionId: vehicle.auctionId, vehicleId: vehicle.id }));
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
      setIsPlacingBid(true);
      const res = await dispatch(placeBid({ auctionId: vehicle.auctionId, bidAmount: parseFloat(bidAmount), userId, userName }));
      toast(res.payload.message);
      onClose();
      const bidData = await dispatch(fetchBidData({ auctionId: vehicle.auctionId, vehicleId: id }));
      setStartingBid(bidData.payload.firstBid);
      setHighestBid(bidData.payload.highestBid);
    } catch (error) {
      toast(error.message);
    } finally {
      setIsPlacingBid(false);
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

          <ScrollShadow className="w-[600px] h-[75px]" orientation='horizontal' hideScrollBar={true}>
            <div className='flex mt-2' style={{ minWidth: `${vehicle.vehiclePhotos.length * 120}px` }}>
              {vehicle.vehiclePhotos.map((photo, index) => (
                <div key={index} className='mr-2' onClick={() => setSelectedImage(photo)}>
                  <img className="rounded-md" width={110} alt="NextUI hero Image" src={photo} />
                </div>
              ))}
            </div>
          </ScrollShadow>

        </div>
        <div className='w-1/2'>
          <div className='flex justify-between m-2'>
            <div className='font-bold'>{vehicle.model}</div>
            <div>
              {<Button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</Button>}
            </div>
          </div>
          <div className='flex flex-col'>
            <ul className='flex gap-4'>
              <div placement="right">
                <div>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">{vehicle.travelDistance}</div>
                  </div>
                </div>
              </div>
              <div placement="right">
                <div>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">Popover Content</div>
                  </div>
                </div>
              </div>
              <div placement="right">
                <div>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">{vehicle.transmission}</div>
                  </div>
                </div>
              </div>
              <div placement="right">
                <div>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">Popover Content</div>
                  </div>
                </div>
              </div>
            </ul>
            <div className='flex-col mt-6'>
              <div className='mb-2'>L  {vehicle.address}</div>
              <div className='mb-2'>H  test drive available</div>
              <div className='mb-2'>Check inspection report</div>
              <div className='mb-2'>Check service history</div>
            </div>
            <div className='flex mt-5'>
              <div className='mr-14' style={{ width: '30%' }}>
                <div>
                  <div className='font-extrabold text-large'>{startingBid}</div>
                  <div className='font-light'>Starting Bid</div>
                  <Button fullWidth>Book Test Drive Comming Soon ...</Button>
                </div>
              </div>
              <div style={{ width: '30%' }}>
                <div>
                  <div  className='font-extrabold text-large'>{highestBid}</div>
                  <div className='font-light'>Current bid</div>
                  {isPlacingBid ? (
                    <LoadingButton />
                  ) : (
                    <Button onPress={onOpen} fullWidth>Place Bid</Button>
                  )}
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
            {isPlacingBid ? (
              <LoadingButton />
            ) : (
              <Button color="primary" onPress={handlePlaceBid}>Place Bid</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div >
  );
};

export default VehicleDetail;
