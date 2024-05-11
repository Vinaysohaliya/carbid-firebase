import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVehicle, submitVehicleDetails } from '../Redux/vehicleSlice.js';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Divider, Checkbox } from '@nextui-org/react';
import { toast } from 'react-hot-toast';

const VehicleSellingForm = ({ vehicle }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [evaluationDone, setEvaluationDone] = useState(false);
  const [auctionStatus, setAuctionStatus] = useState(false);
  const [startingBid, setStartingBid] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [stage, setStage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      if (vehicle) {
        try {
          const res = await dispatch(fetchVehicle({ vehicleId: vehicle.id }));
          setEvaluationDone(res.payload.evaluationDone);
          setAuctionStatus(res.payload.auctionStatus);
        } catch (error) {
          console.error('Error fetching vehicle data:', error.message);
        }
      }
    };

    fetchData();
  }, [dispatch, vehicle]);

  const isFormValid = () => {
    switch (stage) {
      case 6:
        return agreeToTerms;
      case 7:
        return startingBid.trim() !== '';
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    try {
      if (!isFormValid()) {
        toast.error('Please fill all required fields.');
        return;
      }

      const res = await dispatch(submitVehicleDetails({ vehicleId: vehicle.id, stage, agreeToTerms, setAgreeToTerms, startingBid }));
      onClose();
    } catch (error) {
      console.error('Error submitting vehicle details:', error.message);
    }
  };

  return (
    <>
      <h2>Submit Vehicle Details</h2>
      <Button onPress={onOpen}>Your Vehicle</Button>
      <Modal size='2xl' isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Submit Vehicle Details</ModalHeader>
          <ModalBody>
            <form>
              {(stage === 5 && !evaluationDone) ? (
                <div>
                  <h2>Your vehicle is under process</h2>
                </div>
              ) : (
                <>
                  {stage === 5 && (
                    <div>
                      <h2>Your vehicle is Approved</h2>
                    </div>
                  )}
                  {evaluationDone && (
                    <>
                      {stage === 6 && (
                        <div>
                          <p>Please read and agree to the terms and conditions:</p>
                          <Input
                            type='checkbox'
                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                          >
                            I agree to the terms and conditions
                          </Input>
                        </div>
                      )}
                      {stage === 7 && (
                        <div>
                          <h2>Enter Starting Bid</h2>
                          <Input
                            type="text"
                            placeholder="Enter starting bid"
                            value={startingBid}
                            onChange={(e) => setStartingBid(e.target.value)}
                          />
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
              <Divider />
              <div className='my-4 flex items-center justify-end'>
                {stage !== 5 && (
                  <Button radius='sm' className='mr-2' onClick={() => setStage((prevStage) => Math.max(prevStage - 1, 1))}>
                    Previous
                  </Button>
                )}
                {(stage !== 5 || evaluationDone) && (
                  <Button type="button" radius='sm' onClick={stage === 7 ? handleSubmit : () => setStage((prevStage) => Math.max(prevStage + 1, 1))}>
                    {stage === 7 ? 'Submit' : 'Next'}
                  </Button>
                )}
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VehicleSellingForm;
