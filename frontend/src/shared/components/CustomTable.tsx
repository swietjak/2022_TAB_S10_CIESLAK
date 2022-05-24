import {
  LinearProgress,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Column, LoadingStatus } from "shared/types";

interface CustomTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading: LoadingStatus;
}

const TableContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
}));

const CustomTable = <T extends {}>({
  columns,
  data,
  loading,
}: CustomTableProps<T>) => {
  return (
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
          {data.map((entry) => (
            <TableRow>
              {columns.map((col, i) => (
                <TableCell key={`table-cell-${i}`}>
                  {col.renderData(entry)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
