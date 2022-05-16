import { paths } from "config";
import { useSelector } from "react-redux";
import { selectors } from "shared/store";

export const useInitialPath = () => {
  const { data } = useSelector(selectors.getUserDataResource);

  if (!data) return paths.login;
  return paths.vehiclesList; //TODO: when other pages are ready add paths for other permissions
};
