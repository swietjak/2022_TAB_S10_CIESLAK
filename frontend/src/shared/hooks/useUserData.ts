import { paths } from "config";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectors } from "shared/store";

interface UserPermisions {
  isAdmin: boolean;
  hasCarePermissions: boolean;
}

const getInitialPath = ({ hasCarePermissions, isAdmin }: UserPermisions) => {
  if (isAdmin) return paths.adminVehiclesList;
  if (hasCarePermissions) return paths.careTakerVehiclesList;
  return paths.workerVehiclesList;
};

export const useUserData = () => {
  const { data: userData } = useSelector(selectors.getUserDataResource);
  console.log("userData", userData);
  const hasCarePermissions = useMemo(
    () => userData && userData.userPermisions.hasCarePermissions,
    [userData]
  );

  const hasAdminPermissions = useMemo(
    () => userData && userData.userPermisions.isAdmin,
    [userData]
  );

  const userId = useMemo(() => userData && userData.userId, [userData]);

  const initialPath = !!userData
    ? getInitialPath(userData.userPermisions)
    : paths.login;

  return {
    hasCarePermissions,
    hasAdminPermissions,
    userId,
    initialPath,
  };
};
