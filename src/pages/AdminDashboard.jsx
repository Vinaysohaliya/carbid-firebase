import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner } from '@nextui-org/react';
import { fetchAllVehicles, updateAdminVehicleStatus, updateVehicleDetails } from '../Redux/vehicleSlice';

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [vehicleList, setVehicleList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      const resultAction = await dispatch(fetchAllVehicles());
      console.log(resultAction);
      if (fetchAllVehicles.fulfilled.match(resultAction)) {
        setVehicleList(resultAction.payload);
      }
      setLoading(false);
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
    await dispatch(updateAdminVehicleStatus({ vehicleId: selectedVehicle.id, status: updatedData.adminApprove }));
    onOpenChange();
  };

  const handleDecline = async () => {
    console.log("Declined", selectedVehicle);
    const updatedData = { ...selectedVehicle, adminApprove: "DECLINE" };
    await dispatch(updateAdminVehicleStatus({ vehicleId: selectedVehicle.id, status: updatedData.adminApprove }));
    onOpenChange();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {vehicleList.length === 0 ? (
            <p>No vehicles found</p>
          ) : (
            <Table aria-label="Vehicle Details Table">
              <TableHeader>
                <TableColumn className='text-blue-600'>ID</TableColumn>
                <TableColumn  className='text-blue-600'>BRAND</TableColumn>
                <TableColumn  className='text-blue-600'>MODEL</TableColumn>
                <TableColumn  className='text-blue-600'>OWNER TYPE</TableColumn>
                <TableColumn  className='text-blue-600'>SELLER TYPE</TableColumn>
                <TableColumn  className='text-blue-600'>EVALUATION STATUS</TableColumn>
                <TableColumn  className='text-blue-600'>ADMIN APPROVE</TableColumn>
                <TableColumn>  className='text-blue-600'Edit</TableColumn>
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
        </>
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
                    <p className='m-5 border-b border-blue-300'><strong  className='text-blue-600 '>ID:</strong> {selectedVehicle.id}</p>
                    <p className='m-5 border-b border-blue-300'><strong  className='text-blue-600'>Brand:</strong> {selectedVehicle.brand}</p>
                    <p className='m-5 border-b border-blue-300'><strong  className='text-blue-600'>Model:</strong> {selectedVehicle.model}</p>
                    <p className='m-5 border-b border-blue-300'><strong  className='text-blue-600'>Owner Type:</strong> {selectedVehicle.ownerType}</p>
                    <p className='m-5 border-b border-blue-300'><strong  className='text-blue-600'>Seller Type:</strong> {selectedVehicle.sellerType}</p>
                    <p className='m-5 border-b border-blue-300'><strong className='text-blue-600'>Evaluation Status:</strong> {selectedVehicle.evaluationDone}</p>
                    <p className='m-5 border-b border-blue-300'><strong  className='text-blue-600'>Address:</strong> {selectedVehicle.address}</p>
                    <p className='m-5 border-b border-blue-300'><strong  className='text-blue-600'>Admin Approve:</strong> {selectedVehicle.adminApprove.toString()}</p>
                    <p className='m-5 border-b border-blue-300'><strong className='text-blue-600'>Auction ID:</strong> {selectedVehicle.auctionId}</p>
                    <p className='m-5 border-b border-blue-300'><strong className='text-blue-600'>Auction Status:</strong> {selectedVehicle.auctionStatus.toString()}</p>
                    <p className=' m-5 border-b border-blue-300'><strong className='text-blue-600'>Car Location:</strong> {selectedVehicle.carLocation}</p>
                    <p className='m-5 border-b border-blue-300'><strong className='text-blue-600'>Created At:</strong> {new Date(selectedVehicle.createdAt.seconds * 1000).toLocaleString()}</p>
                    <p className='m-5 border-b border-blue-300'><strong className='text-blue-600'>Dealership Name:</strong> {selectedVehicle.dealershipName}</p>
                    <p className='m-5 border-b border-blue-300'><strong className='text-blue-600'>Fuel Type:</strong> {selectedVehicle.fuelType}</p>
                    <p className='m-5 border-b border-blue-300'><strong className='text-blue-600'>ID Proof:</strong> <a href={selectedVehicle.idProof} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View ID Proof</a></p>
                    <p className='m-5 border-b border-blue-300'><strong className='text-blue-600'>Mobile:</strong> {selectedVehicle.mobile}</p>
                    <p className='m-5 border-b border-blue-300'><strong className='text-blue-600'>Modification:</strong> {selectedVehicle.modification}</p>
                    <p className='m-5 border-b border-blue-300'><strong className='text-blue-600'>Modification Details:</strong> {selectedVehicle.modificationDetails}</p>
                    <p className='m-5 border-b border-blue-300'><strong className='text-blue-600'>Name:</strong> {selectedVehicle.name}</p>
                    <p className='m-5 border-b border-blue-300'><strong className='text-blue-600'>Pickup Location:</strong> {selectedVehicle.pickupLocation}</p>
                    <p className='m-5 border-b border-blue-300'><strong className='text-blue-600'>Registration Year:</strong> {selectedVehicle.registrationYear}</p>
                    <p className='m-5 border-b border-blue-300'><strong  className='text-blue-600' >Safety Rating:</strong> {selectedVehicle.safetyRating}</p>
                    <p className='m-5 border-b border-blue-300'><strong  className='text-blue-600'>Transmission:</strong> {selectedVehicle.transmission}</p>
                    <p className='m-5 border-b border-blue-300'><strong  className='text-blue-600'>Travel Distance:</strong> {selectedVehicle.travelDistance}</p>
                    <p className='m-5 border-b border-blue-300'><strong  className='text-blue-600'>Vehicle Type:</strong> {selectedVehicle.vehicleType}</p>
                    <p className='m-5 border-b border-blue-300'><strong  className='text-blue-600'>Website:</strong> {selectedVehicle.website}</p>
                    <p className='m-5 border-b border-blue-300'><strong  className='text-blue-600'>Vehicle Photos:</strong> {selectedVehicle.vehiclePhotos.map((photo, index) => (
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
