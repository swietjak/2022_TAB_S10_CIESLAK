import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "shared/components";
import { useUserData } from "shared/hooks";
import { selectors, actions } from "../../store";
import { useColumns } from "./ArchivesTable.utils";

const ArchivesTable = () => {
  const dispatch = useDispatch();
  const { userId } = useUserData();
  const { data, loading } = useSelector(selectors.getReservationArchive);
  const columns = useColumns();

  useEffect(() => {
    if (!userId) return;
    dispatch(actions.getReservationArchive(userId));
  }, [dispatch, userId]);

  return <CustomTable columns={columns} data={data} loading={loading} />;
};

export default ArchivesTable;
