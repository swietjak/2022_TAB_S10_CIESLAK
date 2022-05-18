import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { WorkerCarsTable } from "../components";
import { actions } from "../store";
import { PageWrapper } from "./style";

const WorkerVehiclesList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getVehicles({}));
  }, []); //eslint-disable-line

  return (
    <PageWrapper>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="h6">Workers's vehicles list</Typography>
        </Grid>
      </Grid>
      <WorkerCarsTable />
    </PageWrapper>
  );
};

export default WorkerVehiclesList;
