import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { CareTakerReservation, DialogField, SummaryEntry } from "shared/types";
import { actions } from "../../store";
import { Button } from "@mui/material";
import { object, SchemaOf, string, number, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { paths } from "config";
import { useNavigate } from "react-router";
import { format, parseISO } from "date-fns";
import { startOfToday } from "date-fns/esm";
import { useUserData } from "shared/hooks";

const DEFAULT_DATE_FORMAT = "dd/MM/yyyy";

export enum RentalFormFields {
  Meters = "meterIndicator",
  Description = "description",
  Date = "date",
}

export const fieldsLabels: DialogField[] = [
  { name: RentalFormFields.Meters, label: "Meter indicator", type: "number" },
  { name: RentalFormFields.Description, label: "Description", type: "text" },
  { name: RentalFormFields.Date, label: "Rental date", type: "date" },
];

export interface RentalFormValues {
  [RentalFormFields.Meters]: number;
  [RentalFormFields.Description]: string;
  [RentalFormFields.Date]: Date;
}

export const defaultValues: RentalFormValues = {
  [RentalFormFields.Meters]: 0,
  [RentalFormFields.Description]: "",
  [RentalFormFields.Date]: startOfToday(),
};

export const validationSchema: SchemaOf<RentalFormValues> = object()
  .shape({
    [RentalFormFields.Meters]: number().required("REQUIRED"),
    [RentalFormFields.Description]: string(),
    [RentalFormFields.Date]: date().required("REQUIRED"),
  })
  .required();

export const useOnSubmit = (handleClose: () => void) => {
  const dispatch = useDispatch();
  const { userId } = useUserData();

  const onSuccess = useCallback(() => {
    handleClose();
    if (userId) dispatch(actions.getCareTakerReservations(userId));
  }, [dispatch, handleClose, userId]);

  return useCallback(
    (values: RentalFormValues, reservationId: number) => {
      const { date, ...payload } = values;
      console.log(values);
      dispatch(
        actions.createRental({
          params: { reservationId, date: date.toISOString(), ...payload },
          onSuccess,
        })
      );
    },
    [dispatch, onSuccess]
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
  const [summaryContent, setSummaryContent] = useState<SummaryEntry[]>([]);
  const handleClose = () => {
    setReservationToRent(null);
    setSummaryContent([]);
  };

  const handleOpen = (data: CareTakerReservation) => {
    setReservationToRent(data.id);
    setSummaryContent([
      {
        label: "Date from",
        value: format(parseISO(data.dateFrom), DEFAULT_DATE_FORMAT),
      },
      {
        label: "Date to",
        value: format(parseISO(data.dateTo), DEFAULT_DATE_FORMAT),
      },
      { label: "Brand", value: data.vehicleSummary.brand },
      { label: "Model", value: data.vehicleSummary.model },
    ]);
  };
  const handlePost = useOnSubmit(handleClose);

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
    summaryContent,
    isOpen: !!reservationToRent,
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
        label: "Date from",
        renderData: (data: CareTakerReservation) =>
          format(parseISO(data.dateFrom), DEFAULT_DATE_FORMAT) || "-",
      },
      {
        label: "Date to",
        renderData: (data: CareTakerReservation) =>
          format(parseISO(data.dateTo), DEFAULT_DATE_FORMAT) || "-",
      },
      {
        label: "",
        renderData: (data: CareTakerReservation) => (
          <Button variant="contained" onClick={() => handleDialogOpen(data)}>
            Rent
          </Button>
        ),
      },
    ],
    [handleDialogOpen]
  );
};
