import { Grid, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "shared/components";
import { Column, WorkerStatistics } from "shared/types";
import { actions, selectors } from "../store";

const WorkersStatisticsTable = () => {
  const columns: Column<WorkerStatistics>[] = useMemo(
    () => [
      {
        label: "name",
        renderData: (data: WorkerStatistics) =>
          `${data.firstName} ${data.lastName}`,
      },
      {
        label: "current rentals",
        renderData: (data: WorkerStatistics) => `${data.currentRentals}`,
      },
      {
        label: "current reservations",
        renderData: (data: WorkerStatistics) => `${data.currentReservations}`,
      },
      {
        label: "total reservations",
        renderData: (data: WorkerStatistics) => `${data.totalReservations}`,
      },
      {
        label: "current reservations",
        renderData: (data: WorkerStatistics) => `${data.totalReservations}`,
      },
      {
        label: "fuel consumption [l]",
        renderData: (data: WorkerStatistics) => `${data.totalFuelUsed}`,
      },
      {
        label: "distance covered [km]",
        renderData: (data: WorkerStatistics) => `${data.totalDistanceCovered}`,
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectors.getWorkersStatistics);
  useEffect(() => {
    dispatch(actions.getWorkersStatistics());
  }, [dispatch]);

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h6">Care taker's vehicles list</Typography>
      </Grid>
      <Grid item>
        <CustomTable columns={columns} data={data} loading={loading} />
      </Grid>
    </Grid>
  );
};

export default WorkersStatisticsTable;
