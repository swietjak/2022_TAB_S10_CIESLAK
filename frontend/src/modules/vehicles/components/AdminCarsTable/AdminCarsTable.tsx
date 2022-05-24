import { useSelector } from "react-redux";
import { ConfirmationDialog, CustomTable } from "shared/components";
import { selectors } from "../../store";
import { useColumns, useConfirmationModal } from "./AdminCarsTable.utils";

type AdminCarsTableProps = {};

export const AdminCarsTable = (props: AdminCarsTableProps) => {
  const { isOpen, handleClose, handleConfirm, handleOpen } =
    useConfirmationModal();
  const columns = useColumns(handleOpen);

  const { data: vehiclesData, loading } = useSelector(selectors.getVehicles);

  return (
    <>
      <ConfirmationDialog
        onClose={handleClose}
        onConfirm={handleConfirm}
        open={isOpen}
        mainContent="This action will delete the selected vehicle"
      />
      <CustomTable columns={columns} data={vehiclesData} loading={loading} />
    </>
  );
};

export default AdminCarsTable;
