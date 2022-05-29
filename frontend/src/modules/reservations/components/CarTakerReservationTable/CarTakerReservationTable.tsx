import { LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserData } from "shared/hooks";
import { LoadingStatus } from "shared/types";
import { actions, selectors } from "../../store";

const CarTakerReservationTable = () => {
  const dispatch = useDispatch();
  const { userId } = useUserData();
  const { data, loading } = useSelector(selectors.getCareTakerReservations);

  useEffect(() => {
    if (!userId) return;
    dispatch(actions.getCareTakerReservations(userId));
  }, [userId]);
  return <>{loading === LoadingStatus.Pending && <LinearProgress />}</>;
};

export default CarTakerReservationTable;
