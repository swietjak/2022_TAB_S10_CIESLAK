import { paths } from "config";
import { useSelector } from "react-redux";
import { selectors } from "shared/store";

export const useInitialPath = () => {
  const { data } = useSelector(selectors.getUserDataResource);

  if (!data) return paths.login;
  if (data.userPermisions.isAdmin) return paths.adminVehiclesList;
  if (data.userPermisions.hasCarePermissions)
    return paths.careTakerVehiclesList;
  return paths.workerVehiclesList;
};
