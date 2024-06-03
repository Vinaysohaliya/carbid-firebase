import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { fetchVehiclesWithUsers } from "../Redux/vehicleSlice";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import VehicleEditForm from "../components/VehicleEditForm";

const columns = [
  {
    key: "model",
    label: "MODEL",
  },
  {
    key: "userName",
    label: "SELLER NAME",
  },
  {
    key: "userEmail",
    label: "EMAIL",
  },
  {
    key: "Status",
    label: "status",
  }
];

export default function EvaluterDashboard() {
  const [activeTable, setActiveTable] = useState(1);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      const res = await dispatch(fetchVehiclesWithUsers());
      console.log(res);
      setVehicleData(res.payload);
    };
    fetchVehicles();
  }, [dispatch]);

  const [vehicleData, setVehicleData] = useState([]);

  const handleButtonClick = (tableNumber) => {
    setActiveTable(tableNumber);
  };

  const handleEditClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };


  return (
    <div>
      <div className="btn-container">
        <Button
          color={activeTable === 1 ? "primary" : "secondary"}
          size="sm"
          onClick={() => handleButtonClick(1)}
        >
          Table 1
        </Button>
      </div>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={vehicleData}>
          {(item) => (
            <TableRow key={item.vehicleId}>
              {(columnKey) => (
                <TableCell>
                  {getKeyValue(item, columnKey)}
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </Button>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalContent>
          <ModalBody>
            {selectedVehicle && (
              <VehicleEditForm
                selectedVehicle={selectedVehicle}
                onClose={handleModalClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
