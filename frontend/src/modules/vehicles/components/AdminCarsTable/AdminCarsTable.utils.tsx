import { DeleteForever } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { paths } from "config";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { generatePath, useNavigate } from "react-router";
import { Vehicle } from "shared/types";
import { actions } from "../../store";

export const useNavigation = () => {
  const navigate = useNavigate();
  return useCallback(
    (data: Vehicle) => {
      navigate(
        generatePath(paths.vehiclesEdit, { vehicleId: data.id.toString() })
      );
    },
    [navigate]
  );
};

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

  const handleConfirmationClose = () => setCarToDelete(null);
  const handleConfirmationOpen = (id: number) => setCarToDelete(id);
  const handleDelete = useVehicleDelete();

  const handleConfirmationConfirm = useCallback(() => {
    if (!carToDelete) return;
    handleDelete(carToDelete);
    handleConfirmationClose();
  }, [carToDelete, handleDelete]);

  return {
    handleConfirmationClose,
    handleConfirmationOpen,
    handleConfirmationConfirm,
    isConfirmationOpen: !!carToDelete,
  };
};

export const useColumns = (
  handleConfirmationOpen: (id: number) => void,
  handleExecutionOpen: (id: number) => void
) => {
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
        label: "Actions",
        renderData: (data: Vehicle) => (
          <IconButton
            onClick={(e) => {
              handleConfirmationOpen(data.id);
              e.stopPropagation();
            }}
          >
            <DeleteForever color="error" />
          </IconButton>
        ),
      },
      {
        label: "",
        renderData: (data: Vehicle) => (
          <Button
            variant="contained"
            onClick={(e) => {
              handleExecutionOpen(data.id);
              e.stopPropagation();
            }}
          >
            Add execution
          </Button>
        ),
      },
    ],
    [handleConfirmationOpen, handleExecutionOpen]
  );
};
