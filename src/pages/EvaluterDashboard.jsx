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
import { useDispatch} from "react-redux";
import { fetchVehiclesWithUsers } from "../Redux/vehicleSlice";

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
];

export default function EvaluterDashboard() {
  const [activeTable, setActiveTable] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVehicles = async () => {
      const res = await dispatch(fetchVehiclesWithUsers());
      setVehicleData(res.payload);
    };
    fetchVehicles();
  }, [dispatch]);

  const [vehicleData, setVehicleData] = useState([]);

  const handleButtonClick = (tableNumber) => {
    setActiveTable(tableNumber);
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
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}