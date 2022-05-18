import {
  LinearProgress,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import ConfirmationDialog from "shared/components/ConfirmationDialog/ConfirmationDialog";
import { LoadingStatus } from "shared/types";
import { selectors } from "../../store";
import { useColumns, useConfirmationModal } from "./WorkerCarsTable.utils";

const TableContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const WorkerCarsTable = () => {
  const { isOpen, handleClose, handleConfirm, handleOpen } =
    useConfirmationModal();
  const columns = useColumns(handleOpen);

  const { data: vehiclesData, loading } = useSelector(selectors.getVehicles);

  return (
    <>
      <ConfirmationDialog
        onClose={handleClose}
        onConfirm={handleConfirm}
        open={isOpen}
        mainContent="This action will delete the selected vehicle"
      />
      <TableContainer>
        {loading === LoadingStatus.Pending && <LinearProgress />}
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
      </TableContainer>
    </>
  );
};

export default WorkerCarsTable;
