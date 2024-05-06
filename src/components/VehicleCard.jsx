import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, Image, useSelect, Divider, DateRangePicker } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { checkIfVehicleLiked, toggleVehicleLike } from '../Redux/vehicleSlice';
import { useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

const VehicleCard = ({ vehicle }) => {
  const { id, make, model, imageUrl, brand, fuelType, transmission, distanceTraveled } = vehicle;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const userId = useSelector((state) => state.auth.data.uid)
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      const isLiked = await dispatch(checkIfVehicleLiked({ vehicleId: id, userId }));
      setIsLiked(isLiked.payload);
    };
    fetchData();
  }, [dispatch, id, userId]);

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
    onOpen();
  };

  return (
    <Card shadow="dark-lg" className="w-[300px] flex flex-col rounded-xl overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Image alt={`${make} ${model}`} src={imageUrl} className="object-cover w-full h-full" />
      </div>
      {<Button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</Button>}

      <CardBody className="flex flex-col p-4">z
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
          <Button variant="text" color="primary" onClick={handleAddToAuctionClick}>Add to Auction</Button>
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
          <ModalBody>
            {/* Add content for the auction modal here */}
          </ModalBody>
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
