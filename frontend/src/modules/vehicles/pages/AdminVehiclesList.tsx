import { Button, Grid, Typography } from "@mui/material";
import { paths } from "config";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AdminCarsTable } from "../components";
import { actions } from "../store";
import { PageWrapper } from "./style";

const AdminVehiclesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getVehicles({}));
  }, []); //eslint-disable-line

  return (
    <PageWrapper>
      <Grid container justifyContent="space-around">
        <Grid item xs={10}>
          <Typography variant="h6">Admin's vehicles list</Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            onClick={() => navigate(paths.vehiclesForm)}
            variant="contained"
          >
            New vehicle
          </Button>
        </Grid>
      </Grid>
      <AdminCarsTable />
    </PageWrapper>
  );
};

export default AdminVehiclesList;
