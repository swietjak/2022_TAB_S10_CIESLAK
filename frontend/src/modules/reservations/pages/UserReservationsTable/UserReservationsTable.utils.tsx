import { format, parseISO } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserData } from "shared/hooks";
import { Column, UserReservation } from "shared/types";
import { DeleteReservationIcon } from "../../components";
import { actions, selectors } from "../../store";

export const useUserResrvations = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectors.getUserReservations);
  const { userId } = useUserData();

  useEffect(() => {
    if (!userId) return;
    dispatch(actions.getUserReservations(userId));
  }, [dispatch, userId]);

  return { data, loading };
};

export const useColumns = (
  openModal: (id: number) => void
): Column<UserReservation>[] => {
  return [
    {
      label: "VIN",
      renderData: (data) => data.vehicleSummary.vin,
    },
    {
      label: "BRAND",
      renderData: (data) => data.vehicleSummary.brand,
    },
    {
      label: "MODEL",
      renderData: (data) => data.vehicleSummary.model,
    },
    {
      label: "DATE FROM",
      renderData: (data) => format(parseISO(data.dateFrom), "dd/MM/yyyy"),
    },
    {
      label: "DATE TO",
      renderData: (data) => format(parseISO(data.dateTo), "dd/MM/yyyy"),
    },
    {
      label: "STATUS",
      renderData: (data) => data.status,
    },
    {
      label: "",
      renderData: (data) => (
        <DeleteReservationIcon
          status={data.status}
          onClick={() => openModal(data.id)}
        />
      ),
    },
  ];
};

export const useConfirmationModal = () => {
  const [reservationToDelete, setReservationToDelete] = useState<number | null>(
    null
  );

  const handleClose = () => setReservationToDelete(null);
  const handleOpen = (id: number) => setReservationToDelete(id);
  const handleDelete = useReservationDelete();

  const handleConfirm = useCallback(() => {
    if (!reservationToDelete) return;
    handleDelete(reservationToDelete);
    handleClose();
  }, [reservationToDelete, handleDelete]);

  return {
    handleClose,
    handleOpen,
    handleConfirm,
    isOpen: !!reservationToDelete,
  };
};

const useReservationDelete = () => {
  const dispatch = useDispatch();
  const { userId } = useUserData();

  const onSuccess = useCallback(() => {
    if (!userId) return;
    dispatch(actions.getUserReservations(userId));
  }, [dispatch, userId]);

  return useCallback(
    (reservationId: number) => {
      dispatch(actions.deleteUserReservation({ reservationId, onSuccess }));
    },
    [dispatch, onSuccess]
  );
};
