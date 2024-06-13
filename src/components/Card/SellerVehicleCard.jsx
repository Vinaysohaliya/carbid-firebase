import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, Image, useSelect, Divider } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromAuction } from '../../Redux/auctionSlice';
import { useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure } from "@nextui-org/react";

const SellerVehicleCard = ({ vehicle }) => {
  const userId = useSelector((state) => state.auth.data.uid);
  const { id, make, model, vehiclePhotos, brand, fuelType, transmission, distanceTraveled } = vehicle;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteFromAuction = async () => {
    try {
      await dispatch(removeFromAuction({ vehicleId: id, userId }));
    } catch (error) {
      console.error('Error deleting vehicle from auction:', error.message);
    }
  };

  const handleViewDetailClick = () => {
    navigate(`/vehicle/${id}`);
  };

  return (
    <Card shadow="dark-lg" className="w-[300px] sm:w-[400px] flex flex-col rounded-xl overflow-hidden">
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <Image alt={`${make} ${model}`} src={vehiclePhotos[0]} className="object-cover w-full h-full" />
      </div>
      <CardBody className="flex flex-col p-4">
        <h3 className="font-bold text-xl mb-4">{make} {model}</h3>
        <div className="flex flex-wrap mb-2">
          <div className="mr-4 mb-2">
            <p className="font-semibold">{brand}</p>
          </div>
          <div className="mr-4 mb-2">
            <p className="font-semibold">{fuelType}</p>
          </div>
          <div className="mr-4 mb-2">
            <p className="font-semibold">{transmission}</p>
          </div>
          <div className="mb-2">
            <p className="font-semibold">{distanceTraveled}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="text" color="primary" onClick={handleDeleteFromAuction}>Delete from Auction</Button>
          <Button variant="text" color="error" onClick={handleViewDetailClick}>View Detail</Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default SellerVehicleCard;
