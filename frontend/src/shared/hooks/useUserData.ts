import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectors } from "../store";

export const useUserData = () => {
  const { data } = useSelector(selectors.getUserDataResource);

  const hasCarePermissions = useMemo(
    () => data && data.userPermisions.hasCarePermissions,
    [data]
  );

  const hasAdminPermissions = useMemo(
    () => data && data.userPermisions.isAdmin,
    [data]
  );

  const userId = useMemo(() => data && data.userId, [data]);

  return {
    hasCarePermissions,
    hasAdminPermissions,
    userId,
  };
};
