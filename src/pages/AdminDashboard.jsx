import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, ScrollShadow } from '@nextui-org/react';
import { fetchAllVehicles, updateAdminVehicleStatus, updateVehicleDetails } from '../Redux/vehicleSlice';

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [vehicleList, setVehicleList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      const resultAction = await dispatch(fetchAllVehicles());
      console.log(resultAction);
      if (fetchAllVehicles.fulfilled.match(resultAction)) {
        setVehicleList(resultAction.payload);
      }
    };

    fetchVehicles();
  }, [dispatch]);

  const handleEditClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    onOpen();
  };

  const handleAccept = async () => {
    console.log("Accepted", selectedVehicle);
    const updatedData = { ...selectedVehicle, adminApprove: "ACCEPT" };
    await dispatch(updateAdminVehicleStatus({ vehicleId: selectedVehicle.id, status:updatedData.adminApprove }));
    onOpenChange();
  };

  const handleDecline = async () => {
    console.log("Declined", selectedVehicle);
    const updatedData = { ...selectedVehicle, adminApprove: "DECLINE" };
    await dispatch(updateAdminVehicleStatus({ vehicleId: selectedVehicle.id, status:updatedData.adminApprove }));

    onOpenChange();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {vehicleList.length === 0 && <p>No vehicles found</p>}
      {vehicleList.length > 0 && (
        <Table aria-label="Vehicle Details Table">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>BRAND</TableColumn>
            <TableColumn>MODEL</TableColumn>
            <TableColumn>OWNER TYPE</TableColumn>
            <TableColumn>SELLER TYPE</TableColumn>
            <TableColumn>EVALUATION STATUS</TableColumn>
            <TableColumn>ADMIN APPROVE</TableColumn>
            <TableColumn>Edit</TableColumn>
          </TableHeader>
          <TableBody>
            {vehicleList.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.id}</TableCell>
                <TableCell>{vehicle.brand}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.ownerType}</TableCell>
                <TableCell>{vehicle.sellerType}</TableCell>
                <TableCell>{vehicle.evaluationDone}</TableCell>
                <TableCell>{vehicle.adminApprove}</TableCell>
                <TableCell>
                  <Button onPress={() => handleEditClick(vehicle)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Edit Vehicle</h3>
              </ModalHeader>
              <ModalBody className="space-y-4 overflow-auto max-h-[400px]">
                {selectedVehicle && (
                  <div className="space-y-2">
                    <p><strong>ID:</strong> {selectedVehicle.id}</p>
                    <p><strong>Brand:</strong> {selectedVehicle.brand}</p>
                    <p><strong>Model:</strong> {selectedVehicle.model}</p>
                    <p><strong>Owner Type:</strong> {selectedVehicle.ownerType}</p>
                    <p><strong>Seller Type:</strong> {selectedVehicle.sellerType}</p>
                    <p><strong>Evaluation Status:</strong> {selectedVehicle.evaluationDone}</p>
                    <p><strong>Address:</strong> {selectedVehicle.address}</p>
                    <p><strong>Admin Approve:</strong> {selectedVehicle.adminApprove.toString()}</p>
                    <p><strong>Auction ID:</strong> {selectedVehicle.auctionId}</p>
                    <p><strong>Auction Status:</strong> {selectedVehicle.auctionStatus.toString()}</p>
                    <p><strong>Car Location:</strong> {selectedVehicle.carLocation}</p>
                    <p><strong>Created At:</strong> {new Date(selectedVehicle.createdAt.seconds * 1000).toLocaleString()}</p>
                    <p><strong>Dealership Name:</strong> {selectedVehicle.dealershipName}</p>
                    <p><strong>Fuel Type:</strong> {selectedVehicle.fuelType}</p>
                    <p><strong>ID Proof:</strong> <a href={selectedVehicle.idProof} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View ID Proof</a></p>
                    <p><strong>Mobile:</strong> {selectedVehicle.mobile}</p>
                    <p><strong>Modification:</strong> {selectedVehicle.modification}</p>
                    <p><strong>Modification Details:</strong> {selectedVehicle.modificationDetails}</p>
                    <p><strong>Name:</strong> {selectedVehicle.name}</p>
                    <p><strong>Pickup Location:</strong> {selectedVehicle.pickupLocation}</p>
                    <p><strong>Registration Year:</strong> {selectedVehicle.registrationYear}</p>
                    <p><strong>Safety Rating:</strong> {selectedVehicle.safetyRating}</p>
                    <p><strong>Transmission:</strong> {selectedVehicle.transmission}</p>
                    <p><strong>Travel Distance:</strong> {selectedVehicle.travelDistance}</p>
                    <p><strong>Vehicle Type:</strong> {selectedVehicle.vehicleType}</p>
                    <p><strong>Website:</strong> {selectedVehicle.website}</p>
                    <p><strong>Vehicle Photos:</strong> {selectedVehicle.vehiclePhotos.map((photo, index) => (
                      <a key={index} href={photo} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Photo {index + 1}</a>
                    ))}</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="space-x-2">
                <Button color="danger" variant="light" onPress={handleDecline} className="hover:bg-red-500">
                  Decline
                </Button>
                <Button color="primary" onPress={handleAccept} className="hover:bg-blue-500">
                  Accept
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
