import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { LoadingStatus } from "shared/types";
import VehiclesForm from "../components/VehiclesForm";
import { actions, selectors } from "../store";

interface VehicleEditProps {}

const VehicleEdit = (props: VehicleEditProps) => {
  const dispatch = useDispatch();
  const { vehicleId } = useParams();
  const { data, loading } = useSelector(selectors.getVehicleDetails);
  useEffect(() => {
    if (!vehicleId) return;
    dispatch(actions.getVehicleDetails(parseInt(vehicleId, 10)));
  }, [dispatch, vehicleId]);
  if (loading === LoadingStatus.Pending) return null;
  return <VehiclesForm vehicle={data} />;
};

export default VehicleEdit;
