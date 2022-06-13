import {
  LinearProgress,
  styled,
  Table,
  TableBody,
  TableCell as BaseTableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCallback } from "react";
import { Column, LoadingStatus } from "shared/types";

interface CustomTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading: LoadingStatus;
  onRowClick?: (data: T) => void;
}

const TableContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
}));

const TableCell = styled(BaseTableCell)<{ clickable?: boolean }>(
  ({ clickable = false }) => ({
    "&:hover": {
      cursor: clickable ? "pointer" : "default",
    },
  })
);

const CustomTable = <T extends {}>({
  columns,
  data,
  loading,
  onRowClick,
}: CustomTableProps<T>) => {
  const handleRowClick = useCallback(
    (entry: T) => {
      if (onRowClick) onRowClick(entry);
    },
    [onRowClick]
  );

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
            <TableRow
              onClick={(e) => {
                handleRowClick(entry);
                e.stopPropagation();
              }}
            >
              {columns.map((col, i) => (
                <TableCell clickable={!!onRowClick} key={`table-cell-${i}`}>
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
