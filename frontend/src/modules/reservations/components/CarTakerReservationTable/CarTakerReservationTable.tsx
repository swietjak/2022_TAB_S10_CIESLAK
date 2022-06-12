import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserData } from "shared/hooks";
import { actions, selectors } from "../../store";
import {
  useColumns,
  useRentalForm,
  useFormModal,
  fieldsLabels,
} from "./CarTakerReservationTable.utils";
import { CustomTable, FormDialog } from "shared/components";
import { FormProvider } from "react-hook-form";

const CarTakerReservationTable = () => {
  const dispatch = useDispatch();
  const { userId } = useUserData();
  const { data, loading } = useSelector(selectors.getCareTakerReservations);
  const formProps = useRentalForm();
  const { isOpen, handleClose, handleConfirm, handleOpen, ...props } =
    useFormModal();
  const columns = useColumns(handleOpen);

  useEffect(() => {
    if (!userId) return;
    dispatch(actions.getCareTakerReservations(userId));
  }, [dispatch, userId]);

  return (
    <form onSubmit={formProps.handleSubmit(handleConfirm)}>
      <FormProvider {...formProps}>
        <FormDialog
          {...props}
          confirmLabel="Rent"
          title="Rent"
          fields={fieldsLabels}
          onClose={handleClose}
          onConfirm={formProps.handleSubmit(handleConfirm)}
          open={isOpen}
        />
        <CustomTable columns={columns} data={data} loading={loading} />
      </FormProvider>
    </form>
  );
};

export default CarTakerReservationTable;
