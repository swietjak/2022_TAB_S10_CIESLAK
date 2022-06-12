import { FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { CustomTable, FormDialog } from "shared/components";
import { selectors } from "../../store";
import { useColumns, useFormDialog } from "./CareTakerCarsTable.utils";

type CareTakerCarsTableProps = {};

export const CareTakerCarsTable = (props: CareTakerCarsTableProps) => {
  const { data: vehiclesData, loading } = useSelector(
    selectors.getCareTakerVehicles
  );

  const { fields, formProps, handleClose, handleOpen, handleConfirm, isOpen } =
    useFormDialog();
  const columns = useColumns(handleOpen);

  return (
    <form onSubmit={formProps.handleSubmit(handleConfirm)}>
      <FormProvider {...formProps}>
        <FormDialog
          summaryContent={[]}
          open={isOpen}
          fields={fields}
          confirmLabel="Plan"
          title="Plan new service"
          onConfirm={formProps.handleSubmit(handleConfirm)}
          onClose={handleClose}
        />
        <CustomTable columns={columns} data={vehiclesData} loading={loading} />
      </FormProvider>
    </form>
  );
};

export default CareTakerCarsTable;
