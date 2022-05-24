import { Grid, Typography } from "@mui/material";
import { WorkerCarsTable } from "../components";
import { PageWrapper } from "./style";

const WorkerVehiclesList = () => {
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
