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

const rows1 = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
];

const rows2 = [
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const rows3 = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export default function EvaluterDashboard() {
  const [activeTable, setActiveTable] = useState(1);
const dispatch=useDispatch();
  const handleButtonClick = (tableNumber) => {
    setActiveTable(tableNumber);
  };

 
  useEffect(() => {
    const fetchVehicles = async () => {
      const res = await dispatch(fetchVehiclesWithUsers());
      console.log(res);
    };
    fetchVehicles();
  }, [dispatch]);

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
        <Button
          color={activeTable === 2 ? "primary" : "secondary"}
          size="sm"
          onClick={() => handleButtonClick(2)}
        >
          Table 2
        </Button>
        <Button
          color={activeTable === 3 ? "primary" : "secondary"}
          size="sm"
          onClick={() => handleButtonClick(3)}
        >
          Table 3
        </Button>
      </div>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={
            activeTable === 1
              ? rows1
              : activeTable === 2
              ? rows2
              : activeTable === 3
              ? rows3
              : []
          }
        >
          {(item) => (
            <TableRow key={item.key}>
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