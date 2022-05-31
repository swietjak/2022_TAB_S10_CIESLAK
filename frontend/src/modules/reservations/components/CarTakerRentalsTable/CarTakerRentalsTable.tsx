import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserData } from "shared/hooks";
import { actions, selectors } from "../../store";
import {
  useColumns,
  useVehicleReturnForm,
  useFormModal,
  fieldsLabels,
} from "./CarTakerRentalsTable.utils";
import { CustomTable, FormDialog } from "shared/components";
import { FormProvider } from "react-hook-form";

const CarTakerRentalsTable = () => {
  const dispatch = useDispatch();
  const { userId } = useUserData();
  const { data, loading } = useSelector(selectors.getCareTakerRentals);
  const formProps = useVehicleReturnForm();
  const { isOpen, handleClose, handleConfirm, handleOpen, ...props } =
    useFormModal();
  const columns = useColumns(handleOpen);

  useEffect(() => {
    if (!userId) return;
    dispatch(actions.getCareTakerRentals(userId));
  }, [dispatch, userId]);

  return (
    <>
      <form onSubmit={formProps.handleSubmit(handleConfirm)}>
        <FormProvider {...formProps}>
          <FormDialog
            {...props}
            mainContent="Renting Vehicle:"
            title="Rent"
            fields={fieldsLabels}
            onClose={handleClose}
            onConfirm={formProps.handleSubmit(handleConfirm)}
            open={isOpen}
          />
          <CustomTable columns={columns} data={data} loading={loading} />
        </FormProvider>
      </form>
    </>
  );
};

export default CarTakerRentalsTable;
