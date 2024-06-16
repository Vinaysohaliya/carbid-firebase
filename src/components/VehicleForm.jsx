import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVehicle, submitVehicleDetails } from '../Redux/vehicleSlice.js';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Divider, Checkbox, CardHeader, CardBody, Card, Image, ScrollShadow } from '@nextui-org/react';
import { toast } from 'react-hot-toast';
import LoadingButton from './LoadingButton .jsx';

const VehicleSellingForm = ({ vehicle }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adminApprove, setAdminApprove] = useState();
  const [startingBid, setStartingBid] = useState(0);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [stage, setStage] = useState(5);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (vehicle) {
        try {
          setIsFetching(true);
          const res = await dispatch(fetchVehicle({ vehicleId: vehicle.id }));
          setAdminApprove(res.payload.adminApprove);
        } catch (error) {
          console.error('Error fetching vehicle data:', error.message);
        } finally {
          setIsFetching(false);
        }
      }
    };

    fetchData();
  }, [dispatch, vehicle]);

  const handleSubmit = async () => {
    try {
      if (!agreeToTerms) {
        toast.error('Please agree to the terms and conditions.');
        return;
      }
      setIsLoading(true);
      await dispatch(submitVehicleDetails({ vehicleId: vehicle.id, stage, agreeToTerms, setAgreeToTerms, startingBid }));
      onClose();
    } catch (error) {
      console.error('Error submitting vehicle details:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center justify-center">
            <p className="text-tiny uppercase font-bold text-blue-600">
              {!vehicle.evaluationDone ? "Your Vehicle Is under Evaluation" : "Click Button Below to add on Auction"}
            </p>
            <h4 className="font-bold text-large text-blue-800">Frontend Radio</h4>
            <Button className="bg-blue-800 text-white" onPress={onOpen}>Your Vehicle</Button>
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex justify-center items-center">
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full md:w-64 lg:w-72 xl:w-80" // Adjust width based on screen size
              src='/src/assets/fleet.png'
              height={250} // Maintain aspect ratio with fixed height
            />
          </CardBody>
        </Card>
      </div>

      <Modal size='2xl' isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-blue-800">Submit Vehicle Details</ModalHeader>
          <ModalBody>
            {isFetching ? (
              <div className="flex justify-center items-center py-4">
                <LoadingButton />
              </div>
            ) : (
              <form>
                {(stage === 5 && adminApprove !== "ACCEPT") ? (
                  <div>
                    <h2 className="text-blue-800">Your vehicle is under process</h2>
                  </div>
                ) : (
                  <>
                    {stage === 5 && adminApprove === "ACCEPT" && (
                      <div>
                        <h2 className="text-blue-800">Your vehicle is Approved</h2>
                      </div>
                    )}
                    <>
                      {stage === 6 && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <ScrollShadow className="w-full h-[400px] p-4 overflow-y-auto">
                          <p>Terms and conditions
                              By accessing or using our website (www.indianautoauction.com) or any related services provided by IAA, you agree to be bound by the following terms and conditions:

                              1. Acceptance of Terms: By accessing or using IAA, you agree to abide by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.

                              2. User Accounts: In order to participate in auctions or list vehicles for sale on IAA, users must create an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account. You agree to accept responsibility for all activities that occur under your account.

                              3. Listing and Selling: Users may list vehicles for sale on IAA subject to our approval. By listing a vehicle, you agree to provide accurate and complete information about the vehicle. IAA reserves the right to remove or reject any listing that violates our policies or standards.

                              4. Bidding and Purchasing: Users may bid on vehicles listed on IAA. Bids are binding commitments to purchase the vehicle if the bid is the winning bid at the end of the auction. The highest bidder at the end of the auction will be the purchaser of the vehicle.

                              5. Payment: Payment for purchased vehicles must be made in accordance with the payment terms specified by IAA. Failure to make timely payment may result in cancellation of the transaction and suspension of your account.

                              6. Vehicle Inspection and Warranties: Vehicles listed on IAA may be subject to inspection by prospective buyers. IAA does not guarantee the condition or quality of any vehicle listed on the site. All vehicles are sold "as is" without any warranties, express or implied.

                              7. Auction Terms:
                              - Reserve Price: Some auctions may have a reserve price set by the seller, which is the minimum amount the seller is willing to accept for the vehicle. If the reserve price is not met, the vehicle may not be sold.
                              - Bid Increments: Bids must adhere to specified bid increments, which may vary depending on the current bid amount.
                              - Auction Duration: Each auction will have a specified duration, and the highest bid at the end of the auction period will be the winning bid.

                              8. Fees: IAA may charge fees for listing vehicles, selling vehicles, or using certain features of the site. By using IAA, you agree to pay any applicable fees as described on the site.

                              9. Intellectual Property: All content on IAA, including text, graphics, logos, and images, is the property of IAA or its licensors and is protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any content from IAA without the prior written consent of IAA.

                              10. Limitation of Liability: In no event shall IAA be liable for any indirect, incidental, special, or consequential damages arising out of or in any way connected with your use of this site or the services provided by IAA.

                              11. Governing Law: These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts in India.

                              By using Indian Auto Auction (IAA), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.</p>
                            <Checkbox
                              checked={agreeToTerms}
                              onChange={(e) => setAgreeToTerms(e.target.checked)}
                              className="mt-4 text-blue-800"
                            >
                              I agree to the terms and conditions
                            </Checkbox>
                          </ScrollShadow>
                        </div>
                      )}
                      {stage === 7 && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h2 className="text-blue-800">Enter Starting Bid</h2>
                          <Input
                            type="number"
                            placeholder="Enter starting bid"
                            value={startingBid}
                            onChange={(e) => setStartingBid(e.target.value)}
                            className="mt-2 bg-white text-blue-800"
                          />
                        </div>
                      )}
                    </>
                  </>
                )}
                <Divider className="my-4" />
                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <div className="my-4 flex items-center justify-end">
                    {stage !== 5 && (
                      <Button className="mr-2 bg-blue-600 text-white" radius="sm" onClick={() => setStage((prevStage) => Math.max(prevStage - 1, 1))}>
                        Previous
                      </Button>
                    )}
                    {(stage !== 5 || adminApprove === 'ACCEPT') && (
                      <Button className="bg-blue-600 text-white" type="button" radius="sm" onClick={stage === 7 ? handleSubmit : () => setStage((prevStage) => Math.max(prevStage + 1, 1))}>
                        {stage === 7 ? 'Submit' : 'Next'}
                      </Button>
                    )}
                  </div>
                )}
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VehicleSellingForm;
