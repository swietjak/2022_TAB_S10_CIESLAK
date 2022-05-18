import { Button } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Column, Vehicle } from "shared/types";
import { actions } from "../../store";

const useVehicleDelete = () => {
  const dispatch = useDispatch();

  const onSuccess = useCallback(() => {
    dispatch(actions.getVehicles({}));
  }, [dispatch]);

  return useCallback(
    (vehicleId: number) => {
      dispatch(actions.deleteVehicle({ vehicleId, onSuccess }));
    },
    [dispatch, onSuccess]
  );
};

export const useConfirmationModal = () => {
  const [carToDelete, setCarToDelete] = useState<number | null>(null);

  const handleClose = () => setCarToDelete(null);
  const handleOpen = (id: number) => setCarToDelete(id);
  const handleDelete = useVehicleDelete();

  const handleConfirm = useCallback(() => {
    if (!carToDelete) return;
    handleDelete(carToDelete);
    handleClose();
  }, [carToDelete, handleDelete]);

  return {
    handleClose,
    handleOpen,
    handleConfirm,
    isOpen: !!carToDelete,
  };
};

export const useColumns = (
  handleDialogOpen: (id: number) => void
): Column<Vehicle>[] => {
  return useMemo(
    () => [
      {
        label: "vin",
        renderData: (data: Vehicle) => data.vin,
      },
      {
        label: "brand",
        renderData: (data: Vehicle) => data.brand,
      },
      {
        label: "model",
        renderData: (data: Vehicle) => data.model,
      },
      {
        label: "equipments",
        renderData: (data: Vehicle) => data.equipments.join(", "),
      },
      {
        label: "",
        renderData: (data: Vehicle) => (
          <Button variant="contained">Book</Button>
        ),
      },
    ],
    []
  );
};
