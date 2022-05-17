import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CareTakerCarsTable } from "../components";
import { actions } from "../store";
import { PageWrapper } from "./style";

const CareTakerVehiclesList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getVehicles({}));
  }, []); //eslint-disable-line

  return (
    <PageWrapper>
      <Typography variant="h6">Care taker's vehicles list</Typography>
      <CareTakerCarsTable />
    </PageWrapper>
  );
};

export default CareTakerVehiclesList;
