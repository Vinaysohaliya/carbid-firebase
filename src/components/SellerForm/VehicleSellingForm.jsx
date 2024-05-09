import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Divider } from '@nextui-org/react';


const VehicleSellingForm = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({});
  const [idProofError, setIdProofError] = useState('');

  const handleSubmit = () => {
    // Handle form submission
  };

  const handleSubmitAndAddToAuction = async () => {
    // Handle form submission and adding to auction
  };

  const renderStage = () => {
    switch (stage) {
      case 1:
        return <SellerInformation formData={formData} setFormData={setFormData} />;
      case 2:
        return <VehicleDetails formData={formData} setFormData={setFormData} />;
      case 3:
        return <UploadPhotos formData={formData} setFormData={setFormData} />;
      case 4:
        return <PickupLocation formData={formData} setFormData={setFormData} />;
      case 5:
        return <Confirmation />;
     
    }
  };

  return (
    <>
      <h2>Submit Vehicle Details</h2>
      <Button onPress={onOpen}>Add Vehicle</Button>
      <Modal size='2xl' isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Submit Vehicle Details</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              {renderStage()}
              <Divider />
              <div className='my-4 flex items-center justify-end'>
                <Button radius='sm' className='mr-2' onClick={() => setStage((prevStage) => Math.max(prevStage - 1, 1))}>
                  Previous
                </Button>
                <Button type={stage === 5 ? "submit" : "button"} radius='sm' onClick={() => setStage(prevStage => prevStage + 1)}>
                  {stage === 5 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VehicleSellingForm;
