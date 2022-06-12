import { Grid, styled, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "shared/components";
import { actions, selectors } from "../../store";
import { useColumns } from "./VehicleStatistics.utils";

interface VehicleStatisticsProps {
  vehicleId: number;
}

export const StatisticsTableContainer = styled(Grid)(({ theme }) => ({
  "& >:first-child": {
    marginLeft: theme.spacing(4.5),
  },
  marginTop: theme.spacing(5),
}));

const VehicleStatistics = ({ vehicleId }: VehicleStatisticsProps) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectors.getVehicleStatistics);
  const columns = useColumns();

  useEffect(() => {
    dispatch(actions.getVehicleStatistics(vehicleId));
  }, [dispatch, vehicleId]);
  if (!data) return null;

  return (
    <StatisticsTableContainer container direction="column">
      <Grid item>
        <Typography variant="subtitle1">Vehicle statistics</Typography>
      </Grid>
      <Grid item>
        <CustomTable data={[data]} columns={columns} loading={loading} />
      </Grid>
    </StatisticsTableContainer>
  );
};

export default VehicleStatistics;
