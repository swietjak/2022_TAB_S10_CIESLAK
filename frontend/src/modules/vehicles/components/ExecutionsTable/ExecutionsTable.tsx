import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "shared/components";
import { selectors, actions } from "../../store";
import { ExecutionsTableContainer } from "./ExecutionsTable.styles";
import { useColumns } from "./ExecutionTable.utils";

interface ExecutionsTableProps {
  vehicleId: number;
}

const ExecutionsTable = ({ vehicleId }: ExecutionsTableProps) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    selectors.getServiceExecutionsByVehicleId
  );
  useEffect(() => {
    dispatch(actions.getServiceExecutionsByVehicleId(vehicleId));
  }, [dispatch, vehicleId]);
  const columns = useColumns();
  return (
    <ExecutionsTableContainer container direction="column">
      <Grid item>
        <Typography variant="subtitle1">Service executions history</Typography>
      </Grid>
      <Grid item>
        <CustomTable data={data} loading={loading} columns={columns} />
      </Grid>
    </ExecutionsTableContainer>
  );
};

export default ExecutionsTable;
