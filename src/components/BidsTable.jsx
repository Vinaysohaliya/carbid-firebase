import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const BidsTable = ({ bids, handleSelectBid }) => {
  const [selectedBid, setSelectedBid] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleBidSelection = (bid) => {
    setSelectedBid(bid);
    setConfirmationModalOpen(true);
  };

  const handleConfirmSelection = () => {
    handleSelectBid(selectedBid);
    setConfirmationModalOpen(false);
  };

  const handleCloseModal = () => {
    setSelectedBid(null);
    setConfirmationModalOpen(false);
  };

  return (
    <>
      <Table aria-label="Bids Table">
        <TableHeader>
          <TableColumn>Rank</TableColumn>
          <TableColumn>Bid ID</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {bids &&
            bids.map((bid, index) => (
              <TableRow key={bid.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{bid.userName}</TableCell>
                <TableCell>{bid.amount}</TableCell>
                <TableCell>
                  <button onClick={() => handleBidSelection(bid)}>Select Bid</button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Modal isOpen={confirmationModalOpen} onClose={handleCloseModal}>
        <ModalContent>
          <ModalHeader>Confirm Bid Selection</ModalHeader>
          <ModalBody>
            Are you sure you want to select this bid?
          </ModalBody>
          <ModalFooter>
            <Button color="error" variant="light" onClick={handleCloseModal}>Cancel</Button>
            <Button color="primary" onClick={handleConfirmSelection}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BidsTable;
