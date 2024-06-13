import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { fetchVehiclesWithUsers } from "../Redux/vehicleSlice";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
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
    label: "STATUS",
  },
  {
    key: "Edit",
    label: "EDIT",
  },
];

export default function EvaluterDashboard() {
  const [activeTable, setActiveTable] = useState(1);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      const res = await dispatch(fetchVehiclesWithUsers());
      setVehicleData(res.payload);
      setLoading(false);
    };
    fetchVehicles();
  }, [dispatch]);

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
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <div className="flex justify-center mb-5">
        <Button
          color={activeTable === 1 ? "primary" : "secondary"}
          size="sm"
          onClick={() => handleButtonClick(1)}
        >
          Table 1
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {vehicleData.length === 0 ? (
            <p>No vehicles found</p>
          ) : (
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
                        {columnKey === "Edit" ? (
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleEditClick(item)}
                          >
                            Edit
                          </Button>
                        ) : columnKey === "Status" ? (
                          <div>{item.evaluationDone}</div>
                        ) : (
                          item[columnKey]
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </>
      )}
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
