import { styled } from "@mui/material";
import { ConfirmationDialog, CustomTable } from "shared/components";
import {
  useColumns,
  useConfirmationModal,
  useUserResrvations,
} from "./ReservationsTable.utils";

export const PageWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(3, 2),
}));

const ReservationsTable = () => {
  const { data, loading } = useUserResrvations();
  const { handleClose, handleConfirm, handleOpen, isOpen } =
    useConfirmationModal();
  const columns = useColumns(handleOpen);

  return (
    <PageWrapper>
      <ConfirmationDialog
        onClose={handleClose}
        onConfirm={handleConfirm}
        open={isOpen}
        mainContent="This action will delete the selected reservationa"
      />
      <CustomTable data={data} loading={loading} columns={columns} />
    </PageWrapper>
  );
};

export default ReservationsTable;
