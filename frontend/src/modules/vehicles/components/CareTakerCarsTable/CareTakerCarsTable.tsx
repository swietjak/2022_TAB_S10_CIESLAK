import { useSelector } from "react-redux";
import { CustomTable } from "shared/components";
import ConfirmationDialog from "shared/components/ConfirmationDialog";
import { selectors } from "../../store";
import { useColumns, useConfirmationModal } from "./CareTakerCarsTable.utils";

type CareTakerCarsTableProps = {};

export const CareTakerCarsTable = (props: CareTakerCarsTableProps) => {
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

export default CareTakerCarsTable;
