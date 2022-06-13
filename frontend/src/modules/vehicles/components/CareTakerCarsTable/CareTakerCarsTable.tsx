import { paths } from "config";
import { useCallback } from "react";
import { FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { generatePath, useNavigate } from "react-router";
import { CustomTable, FormDialog } from "shared/components";
import { Vehicle } from "shared/types";
import { selectors } from "../../store";
import { useColumns, useServiceFormDialog } from "./CareTakerCarsTable.utils";

type CareTakerCarsTableProps = {};

export const CareTakerCarsTable = (props: CareTakerCarsTableProps) => {
  const { data: vehiclesData, loading } = useSelector(
    selectors.getCareTakerVehicles
  );
  const { fields, formProps, handleClose, handleOpen, handleConfirm, isOpen } =
    useServiceFormDialog();
  const columns = useColumns(handleOpen);

  const navigate = useNavigate();
  const navigateToEdit = useCallback(
    (entry: Vehicle) => {
      navigate(
        generatePath(paths.vehiclesEdit, {
          vehicleId: entry.id.toString(),
        })
      );
    },
    [navigate]
  );

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
        <CustomTable
          onRowClick={navigateToEdit}
          columns={columns}
          data={vehiclesData}
          loading={loading}
        />
      </FormProvider>
    </form>
  );
};

export default CareTakerCarsTable;
