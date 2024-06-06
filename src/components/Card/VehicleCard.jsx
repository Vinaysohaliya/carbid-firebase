import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, Image, Divider, DateRangePicker, ModalBody } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { checkIfVehicleLiked, deleteVehicle, toggleVehicleLike } from '../../Redux/vehicleSlice';
import { useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure } from "@nextui-org/react";
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
      dispatch(deleteVehicle({ vehicleId: vehicle.id,userId }))
    } catch (error) {
      throw error;
    }
  };

  const renderModalContent = () => (
    <ModalContent>
      <ModalHeader className="flex flex-col gap-1 text-center">Modal Title</ModalHeader>
      <ModalBody className="mb-4">
        <BidsTable bids={bids} />

      </ModalBody>
    </ModalContent>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {renderModalContent()}
      </Modal>
      <Card shadow="dark-lg" className="w-[300px] flex flex-col rounded-xl overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          {/* <Clock vehicle={vehicle} className="absolute top-0 right-0 mr-2  mt-2" /> */}
          <Image alt={`${make} ${model}`} src={vehiclePhotos} className="object-cover w-full h-full" />
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl mb-4 ml-4"> {model}</h3>
          <div onClick={handleLike} style={{ fontSize: '24px', color: '#005BC4' }} className="mr-4">
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>
        <CardBody className="flex flex-col p-4">
          <div className=" flex items-center justify-between">
            {!isonMyBid ? <div>startingBid {startingBid}</div> : <div>Your Bid {MyBidAmount}</div>}
            <div>HighestBid {highestBid}</div>
          </div>
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
              <>
                <Button onPress={onOpen}>Open Modal</Button>
                <Button variant="text" color="error" onClick={handleDeleteListingClick}>Delete Listing</Button>
              </>
            ) : (
              <>
                <Button variant="text" color="primary" >Book Test Drive</Button>
                <Button variant="text" color="error" onClick={handleViewDetailClick}>View Detail</Button>
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default VehicleCard;
