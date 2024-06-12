import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, Image, Divider, DateRangePicker, ModalBody, ModalFooter } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { checkIfVehicleLiked, deleteVehicle, toggleVehicleLike } from '../../Redux/vehicleSlice';
import { useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { fetchBidData } from '../../Redux/auctionSlice';
import BidsTable from "../BidsTable";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import Clock from '../Clock'


const VehicleCard = ({ vehicle, isonListed = false, isonMyBid = false, MyBidAmount = null, bids = null }) => {
  const { id, make, model, vehiclePhotos, brand, fuelType, transmission, distanceTraveled } = vehicle;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const userId = useSelector((state) => state.auth.data.uid);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startingBid, setStartingBid] = useState(null);
  const [highestBid, setHighestBid] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const isLiked = await dispatch(checkIfVehicleLiked({ vehicleId: id, userId }));
      setIsLiked(isLiked.payload);

      const bidData = await dispatch(fetchBidData({ auctionId: vehicle.auctionId, vehicleId: id }));
      setStartingBid(bidData.payload.firstBid);
      setHighestBid(bidData.payload.highestBid);
    };
    fetchData();
  }, [dispatch, id, userId, vehicle]);

  const handleLike = async () => {
    const res = await dispatch(toggleVehicleLike({ vehicleId: id, userId }));
    if (res.payload) {
      setIsLiked(true);
      toast.success('Vehicle Liked!');
    } else {
      setIsLiked(false);
      toast.success('Vehicle disliked!');
    }
  };

  const handleViewDetailClick = () => {
    navigate(`/vehicle/${id}`);
  };

  const handleDeleteListingClick = () => {
    try {
      dispatch(deleteVehicle({ vehicleId: vehicle.id, userId }))
    } catch (error) {
      throw error;
    }
  };

  const renderModalContent = () => (
    <ModalContent>
      <ModalHeader className="flex flex-col gap-1 text-center">Bids Information</ModalHeader>
      <ModalBody className="mb-4">
        <BidsTable bids={bids} />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {renderModalContent()}
      </Modal>
      <Card shadow="dark-lg" className="w-[300px] flex flex-col rounded-xl overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute z-10 top-2 left-2 bg-gray-800 bg-opacity-75 text-white rounded-md px-2 py-1 text-sm">
          {/* <Clock vehicle={vehicle} /> */}
          </div>
          <Image radius="none" alt={`${make} ${model}`} src={vehiclePhotos} className="object-cover w-full h-full z-0" />
        </div>
        <div className="flex items-center justify-between px-4 pt-4">
          <h3 className="font-bold text-lg">{model}</h3>
          <div onClick={handleLike} className="text-xl text-blue-600 cursor-pointer">
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>
        <div className="px-4 text-gray-600 text-sm mb-2">
          {fuelType} • {transmission} • {distanceTraveled}km
        </div>
        <Divider />
        <div className="px-4 text-gray-600 text-sm mb-2">
          <span className="font-semibold">Brand:</span> {brand}
        </div>
        <CardBody className="flex flex-col px-4 pb-4">
          <div className="flex items-center justify-between text-lg font-bold">
            <div>{isonMyBid ? `${MyBidAmount}L` : `${startingBid}L`}</div>
            <div className="text-sm text-gray-500">{isonMyBid ? 'Your Bid' : 'Starting bid'}</div>
          </div>
          <div className="flex justify-between text-lg font-bold text-blue-600 mt-2">
            <div>{highestBid}L</div>
            <div className="text-sm text-gray-500">Current bid</div>
          </div>
          {/* <div className="mt-4">
            <DateRangePicker placeholder="Select date range" />
          </div> */}
          <div className="flex justify-between mt-4">
            {isonListed ? (
              <>
                <Button className="bg-blue-600 text-white" onPress={onOpen}>Open Modal</Button>
                <Button variant="text" color="error" className="bg-red-600 text-white" onClick={handleDeleteListingClick}>Delete Listing</Button>
              </>
            ) : (
              <>
                <Button  variant="outlined" color="primary" onClick={handleViewDetailClick} className="flex-grow mr-2 bg-blue-600 text-white">
                  View details
                </Button>
                <Button variant="outlined" color="primary" className="flex-grow bg-blue-600 text-white">
                  Book test drive
                </Button>
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default VehicleCard;
