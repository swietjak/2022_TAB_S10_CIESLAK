import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ReservationStatus } from "shared/types";

interface DeleteReservationIconProps {
  onClick: () => void;
  status: ReservationStatus;
}

const DeleteReservationIcon = ({
  onClick,
  status,
}: DeleteReservationIconProps) => {
  if (status !== ReservationStatus.Pending) return null;
  return (
    <IconButton onClick={onClick}>
      <DeleteForever color="error" fontSize="large" />
    </IconButton>
  );
};

export default DeleteReservationIcon;
