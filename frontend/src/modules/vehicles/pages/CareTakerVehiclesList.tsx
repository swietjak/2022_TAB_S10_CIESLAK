import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserData } from "shared/hooks";
import { CareTakerCarsTable } from "../components";
import { actions } from "../store";
import { PageWrapper } from "./style";

const CareTakerVehiclesList = () => {
  const dispatch = useDispatch();
  const { userId, hasCarePermissions } = useUserData();
  useEffect(() => {
    if (!userId || !hasCarePermissions) return;
    dispatch(actions.getCareTakerVehicles(userId));
  }, []); //eslint-disable-line

  return (
    <PageWrapper>
      <Typography variant="h6">Care taker's vehicles list</Typography>
      <CareTakerCarsTable />
    </PageWrapper>
  );
};

export default CareTakerVehiclesList;
