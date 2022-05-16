import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Vehicle } from "shared/types";
import { selectors } from "../../store";

type CarsTableProps = {};

export const CarsTable = (props: CarsTableProps) => {
  const columns = [
    {
      label: "vin",
      renderData: (data: Vehicle) => data.vin,
    },
    {
      label: "brand",
      renderData: (data: Vehicle) => data.vin,
    },
    {
      label: "model",
      renderData: (data: Vehicle) => data.vin,
    },
    {
      label: "equipments",
      renderData: (data: Vehicle) => data.equipments.join(", "),
    },
  ];

  const { data: vehiclesData } = useSelector(selectors.getVehicles);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell>{column.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {vehiclesData.map((vehicle) => (
          <TableRow>
            {columns.map((col) => (
              <TableCell>{col.renderData(vehicle)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CarsTable;
