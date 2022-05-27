import { LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserData } from "shared/hooks";
import { LoadingStatus } from "shared/types";
import { actions, selectors } from "../../store";
import {
  useColumns,
  useRentalForm,
  useFormModal,
} from "./CarTakerReservationTable.utils";
import { CustomTable, FormDialog } from "shared/components";

const CarTakerReservationTable = () => {
  const dispatch = useDispatch();
  const { userId } = useUserData();
  const { data, loading } = useSelector(selectors.getCareTakerReservations);

  useEffect(() => {
    if (!userId) return;
    dispatch(actions.getCareTakerReservations(userId));
  }, [userId]);

  const formProps = useRentalForm();
  const { isOpen, handleClose, handleConfirm, handleOpen, ...props } =
    useFormModal();
  const columns = useColumns(handleOpen);
  return (
    <>
      <form onSubmit={formProps.handleSubmit(handleConfirm)}>
        <FormDialog
          {...props}
          onClose={handleClose}
          onConfirm={formProps.handleSubmit(handleConfirm)}
          open={isOpen}
          mainContent="This action will delete the selected vehicle"
        />
      </form>
      <CustomTable columns={columns} data={data} loading={loading} />
    </>
  );
};

export default CarTakerReservationTable;
