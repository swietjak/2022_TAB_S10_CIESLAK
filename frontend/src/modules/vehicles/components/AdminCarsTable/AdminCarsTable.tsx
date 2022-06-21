import { FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { ConfirmationDialog, CustomTable, FormDialog } from "shared/components";
import { selectors } from "../../store";
import { useServiceFormDialog } from "../CareTakerCarsTable/CareTakerCarsTable.utils";
import {
  useColumns,
  useConfirmationModal,
  useNavigation,
} from "./AdminCarsTable.utils";

type AdminCarsTableProps = {};

export const AdminCarsTable = (props: AdminCarsTableProps) => {
  const {
    handleConfirmationClose,
    handleConfirmationConfirm,
    handleConfirmationOpen,
    isConfirmationOpen,
  } = useConfirmationModal();
  const { fields, formProps, handleClose, handleConfirm, handleOpen, isOpen } =
    useServiceFormDialog();
  const columns = useColumns(handleConfirmationOpen, handleOpen);

  const { data: vehiclesData, loading } = useSelector(selectors.getVehicles);
  const handleRowClick = useNavigation();

  return (
    <form onSubmit={formProps.handleSubmit(handleConfirm)}>
      <FormProvider {...formProps}>
        <ConfirmationDialog
          onClose={handleConfirmationClose}
          onConfirm={handleConfirmationConfirm}
          open={isConfirmationOpen}
          mainContent="This action will delete the selected vehicle"
        />
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
          onRowClick={handleRowClick}
          columns={columns}
          data={vehiclesData}
          loading={loading}
        />
      </FormProvider>
    </form>
  );
};

export default AdminCarsTable;
