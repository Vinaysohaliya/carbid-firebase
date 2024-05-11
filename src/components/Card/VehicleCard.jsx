import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, Image, Divider, DateRangePicker } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { checkIfVehicleLiked, deleteListing, toggleVehicleLike } from '../../Redux/vehicleSlice';
import { useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure } from "@nextui-org/react";
import { fetchBidData } from '../../Redux/auctionSlice';

const VehicleCard = ({ vehicle, isonListed = false, isonMyBid = false,MyBidAmount=null }) => {
  const { id, make, model, vehiclePhotos, brand, fuelType, transmission, distanceTraveled } = vehicle;
  console.log(MyBidAmount);
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
    } else {
      setIsLiked(false);
    }
  };

  const handleViewDetailClick = () => {
    navigate(`/vehicle/${id}`);
  };

  const handleAddToAuctionClick = () => {
    if (isonListed) {
      // Handle delete listing logic here
    } else {
      onOpen();
    }
  };

  const handleDeleteListingClick = () => {
    try {
      dispatch(deleteListing({ vehicleId: vehicle.id, userId: vehicle.userId }))
    } catch (error) {
      throw error;
    }
  };

  return (
    <Card shadow="dark-lg" className="w-[300px] flex flex-col rounded-xl overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Image alt={`${make} ${model}`} src={vehiclePhotos[0]} className="object-cover w-full h-full" />
      </div>
      <Button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</Button>
      <CardBody className="flex flex-col p-4">
      <div className=" flex items-center justify-between">
       {!isonMyBid? <div>startingBid {startingBid}</div>: <div>Your Bid {MyBidAmount}</div>}
        <div>HighestBid  {highestBid}</div>
      </div>
        <h3 className="font-bold text-xl mb-4">{make} {model}</h3>
        <div className="flex mb-2">
          <div className="mr-4">
            <p className="font-semibold">{brand}</p>
          </div>
          <div className="mr-4">
            <p className="font-semibold">{fuelType}</p>
          </div>
          <div className="mr-4">
            <p className="font-semibold">{transmission}</p>
          </div>
          <div>
            <p className="font-semibold">{distanceTraveled}</p>
          </div>
        </div>
        <div className="flex justify-between">
          {isonListed ? (
            <Button variant="text" color="error" onClick={handleDeleteListingClick}>Delete Listing</Button>
          ) : (
            <Button variant="text" color="primary" onClick={handleAddToAuctionClick}>Add to Auction</Button>
          )}
          <Button variant="text" color="error" onClick={handleViewDetailClick}>View Detail</Button>
        </div>
      </CardBody>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Book Test Drive</ModalHeader>
          <Divider />
          <DateRangePicker
            label="Stay duration"
            className="max-w-xs"
          />
          <ModalFooter>
            <Button color="error" variant="light" onClick={onClose}>Cancel</Button>
            <Button color="primary" onClick={onClose}>Add to Auction</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default VehicleCard;
