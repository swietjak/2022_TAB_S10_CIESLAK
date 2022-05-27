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
import { paths } from "config";
import { useNavigate } from "react-router";

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
    [RentalFormFields.Date]: string().required("REQUIRED"),
  })
  .required();

export const useOnSubmit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(paths.workerReservationList);
  }, [navigate]);

  return useCallback(
    (values: RentalFormValues, reservationId: number) => {
      dispatch(
        actions.createRental({
          params: { reservationId, ...values },
          onSuccess,
        })
      );
    },
    [dispatch]
  );
};

export const useRentalForm = () =>
  useForm<RentalFormValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  });

export const useFormModal = () => {
  const [reservationToRent, setReservationToRent] = useState<number | null>(
    null
  );

  const handleClose = () => setReservationToRent(null);
  const handleOpen = (data: CareTakerReservation) => {
    setReservationToRent(data.id);
  };
  const handlePost = useOnSubmit();

  const handleConfirm = useCallback(
    (values: RentalFormValues) => {
      if (!reservationToRent) return;
      handlePost(values, reservationToRent);
      handleClose();
    },
    [reservationToRent, handlePost]
  );

  return {
    handleClose,
    handleOpen,
    handleConfirm,
    isOpen: !!reservationToRent,
    mainContent: "Renting Vehicle:",
    title: "rent",
    fields: [
      { name: "meterIndicator", label: "Meter indicator", type: "number" },
      { name: "description", label: "description", type: "text" },
      { name: "date", label: "Rental date", type: "date" },
    ],
  };
};

export const useColumns = (
  handleDialogOpen: (data: CareTakerReservation) => void
) => {
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
          <Button onClick={() => handleDialogOpen(data)}>Rent</Button>
        ),
      },
    ],
    [handleDialogOpen]
  );
};

export const xd = 1;
