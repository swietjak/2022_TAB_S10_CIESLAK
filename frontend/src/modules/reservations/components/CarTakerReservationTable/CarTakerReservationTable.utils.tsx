import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { CareTakerReservation } from "shared/types";
import { actions } from "../../store";
import { Button } from "@mui/material";
import { object, SchemaOf, string, number, array, mixed } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export enum RentalFormFields {
  Meters = "meterIndicator",
  Description = "description",
  Date = "date",
}

export interface RentalFormValues {
  [RentalFormFields.Meters]: number;
  [RentalFormFields.Description]: string;
  [RentalFormFields.Date]: string;
}

export const defaultValues: RentalFormValues = {
  [RentalFormFields.Meters]: 0,
  [RentalFormFields.Description]: "",
  [RentalFormFields.Date]: "",
};

export const validationSchema: SchemaOf<RentalFormValues> = object()
  .shape({
    [RentalFormFields.Meters]: number().required("REQUIRED"),
    [RentalFormFields.Description]: string().required("REQUIRED"),
    [RentalFormFields.Description]: string().required("REQUIRED"),
  })
  .required();

export const useOnSubmit = () => {
  const dispatch = useDispatch();

  const onSuccess = useCallback(
    (userId: number) => {
      dispatch(actions.getCareTakerReservations(userId));
    },
    [dispatch]
  );

  return (values: RentalFormValues, reservationId: number) => {
    dispatch(
      actions.createRental({
        params: { reservationId, ...values },
        onSuccess,
      })
    );
  };
};

export const useVehiclesForm = () =>
  useForm<RentalFormValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  });

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

export const useColumns = (handleDialogOpen: (id: number) => void) => {
  return useMemo(
    () => [
      {
        label: "brand",
        renderData: (data: CareTakerReservation) => data.vehicleSummary.brand,
      },
      {
        label: "model",
        renderData: (data: CareTakerReservation) => data.vehicleSummary.model,
      },
      {
        label: "date from",
        renderData: (data: CareTakerReservation) => data.dateFrom,
      },
      {
        label: "date to",
        renderData: (data: CareTakerReservation) => data.dateTo,
      },
      {
        label: "",
        renderData: (data: CareTakerReservation) => (
          <Button onClick={() => handleDialogOpen(data.id)}>Rent</Button>
        ),
      },
    ],
    [handleDialogOpen]
  );
};

export const xd = 1;
