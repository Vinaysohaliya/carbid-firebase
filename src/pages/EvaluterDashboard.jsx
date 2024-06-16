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
  Modal,
  ModalContent,
  ModalBody,
  Divider,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import {Link} from "@nextui-org/react";
import { GoChevronRight } from "react-icons/go";

import { fetchVehiclesWithUsers } from "../Redux/vehicleSlice";
import VehicleEditForm from "../components/VehicleEditForm";

const columnsTable1 = [
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
    key: "Evaluation",
    label: "Evaluation completed on",
  },
  {
    key: "MarkAsComplate",
    label: "",
  },
  {
    key: "Edit",
    label: "EDIT",
  },
];

const columnsTable2 = [
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
    key: "sechualDate",
    label: "SCHEDULE DATE",
  },
  {
    key: "sechualtime",
    label: "SCHEDULE TIME",
  },

  {
    key: "View",
    label: "View",
  },
];

const columnsTable3 = [
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
    key: "sentForApproval",
    label: "Sent for Approval",
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

const EvaluterDashboard = () => {
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
    <div className="ml-8 my-6 ">
      <div className="btn-container ">

        <button
          color=""
          size="sm"
          onClick={() => handleButtonClick(1)}
          className={`mb-5 mr-5 ${activeTable === 1 ? "border-b-4 border-blue-900 text-blue-900" : ""}`}
        >
          Evaluation Pending
        </button>
        <button
          color=""
          size="sm"
          onClick={() => handleButtonClick(2)}
          className={`mb-5 mr-5 ${activeTable === 2 ? "border-b-4 border-blue-900 text-blue-900" : ""}`}
        >
          Schedule Visit
        </button>
        <button
          color=""
          size="sm"
          onClick={() => handleButtonClick(3)}
          className={`mb-5 ${activeTable === 3 ? "border-b-4 border-blue-900 text-blue-900" : ""}`}
        >
          Sent For Approval
        </button>

      </div>
      <Divider />
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {vehicleData?.length === 0 ? (
            <p>No vehicles found</p>
          ) : (
            <Table aria-label="Example table with dynamic content" className="mt-4">
              <TableHeader columns={activeTable === 1 ? columnsTable1 : (activeTable === 2 ? columnsTable2 : columnsTable3)}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={vehicleData}>

                {(item) => (
                  <TableRow key={item.vehicleId}>
                    {(columnKey) => (
                      <TableCell>
                        {item[columnKey.toLowerCase()]}
                        {columnKey === "Edit" && (
                          <Button
                            color=""
                            size="sm"
                            onClick={() => handleEditClick(item)}
                             className="text-blue-800 font-semibold"
                          >
                           
                             View Detail <GoChevronRight />
                          </Button>
                        )}
                        {item[columnKey.toLowerCase()]}
                        {columnKey === "View" && (
                          <Button
                            color=""
                            size="sm"
                            onClick={() => handleEditClick(item)}
                            className="text-blue-800 font-semibold"
                          >
                            Edit <GoChevronRight/>
                          </Button>
                        )}
                        {(columnKey === "MarkAsComplate") && (
                          <div className="text-blue-600 font-semibold">✔ Mark as complate</div>
                        )}
                        {(columnKey === "sechualDate") && (
                          <div>21 June 24</div>
                        )}
                        {(columnKey === "Evaluation") && (
                          <div>21 June 24</div>
                        )}
                        {(columnKey === "sechualtime" && <div>3:15 PM</div>)}
                        {columnKey === "sentForApproval" && (
                          <div>21 Jan 24</div>
                        )}
                        {columnKey === "Status" && <div>
                          <div>
                            {item.evaluationDone === 'APPROVE' && (
                              <span className=" ml-2">
                                <span className="text-green-600 w-4 h-4 rounded-sm">
                                  &#9679;
                                </span>
                                Up for Auction
                              </span>
                            )}
                            {item.evaluationDone === 'PENDING' && (
                              <span className=" ml-2">
                                <span className="text-yellow-600 w-4 h-4 rounded-sm">
                                  &#9679;
                                </span>
                                Pending
                              </span>
                            )}
                            {item.evaluationDone === 'DECLINED' && (
                              <span className=" ml-2">
                                <span className="text-red-600 w-4 h-4 rounded-sm">
                                  &#9679;
                                </span>
                                Evaluation Failed
                              </span>
                            )}
                          </div>
                        </div>}
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
};

export default EvaluterDashboard;
