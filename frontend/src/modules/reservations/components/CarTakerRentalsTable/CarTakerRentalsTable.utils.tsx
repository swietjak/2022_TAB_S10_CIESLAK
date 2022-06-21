import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  CareTakerReservation,
  DialogField,
  Rental,
  SummaryEntry,
} from "shared/types";
import { actions } from "../../store";
import { Button } from "@mui/material";
import { object, SchemaOf, string, number, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { format, parseISO } from "date-fns";
import { startOfToday } from "date-fns/esm";
import { useUserData } from "shared/hooks";

const DEFAULT_DATE_FORMAT = "dd/MM/yyyy";

export enum VehicleReturnFormFields {
  Meters = "meterIndication",
  FuelConsumption = "fuelConsumption",
  Description = "description",
  Date = "date",
}

export const fieldsLabels: DialogField[] = [
  {
    name: VehicleReturnFormFields.Meters,
    label: "Meter indicator",
    type: "number",
  },
  {
    name: VehicleReturnFormFields.FuelConsumption,
    label: "Fuel consumption",
    type: "number",
  },
  {
    name: VehicleReturnFormFields.Description,
    label: "Description",
    type: "text",
  },
  {
    name: VehicleReturnFormFields.Date,
    label: "return date",
    type: "date",
  },
];

export interface VehicleReturnFormValues {
  [VehicleReturnFormFields.Meters]: number;
  [VehicleReturnFormFields.FuelConsumption]: number;
  [VehicleReturnFormFields.Description]: string;
  [VehicleReturnFormFields.Date]: Date;
}

export const defaultValues: VehicleReturnFormValues = {
  [VehicleReturnFormFields.Meters]: 0,
  [VehicleReturnFormFields.FuelConsumption]: 0,
  [VehicleReturnFormFields.Description]: "",
  [VehicleReturnFormFields.Date]: startOfToday(),
};

export const validationSchema: SchemaOf<VehicleReturnFormValues> = object()
  .shape({
    [VehicleReturnFormFields.Meters]: number().required("REQUIRED"),
    [VehicleReturnFormFields.FuelConsumption]: number().required("REQUIRED"),
    [VehicleReturnFormFields.Description]: string(),
    [VehicleReturnFormFields.Date]: date().required("REQUIRED"),
  })
  .required();

export const useOnSubmit = (handleClose: () => void) => {
  const dispatch = useDispatch();
  const { userId } = useUserData();

  const onSuccess = useCallback(() => {
    handleClose();
    if (userId) dispatch(actions.getCareTakerRentals(userId));
  }, [dispatch, handleClose, userId]);

  return useCallback(
    (values: VehicleReturnFormValues, rentalId: number) => {
      console.log(values);
      dispatch(
        actions.createVehicleReturn({
          params: { rentalId, ...values },
          onSuccess,
        })
      );
    },
    [dispatch, onSuccess]
  );
};

export const useVehicleReturnForm = () =>
  useForm<VehicleReturnFormValues>({
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

  const handleOpen = (data: Rental) => {
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
      {
        label: "Rental start",
        value: format(parseISO(data.rentalStartDate), DEFAULT_DATE_FORMAT),
      },
      { label: "Brand", value: data.vehicleSummary.brand },
      { label: "Model", value: data.vehicleSummary.model },
    ]);
  };
  const handlePost = useOnSubmit(handleClose);

  const handleConfirm = useCallback(
    (values: VehicleReturnFormValues) => {
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

export const useColumns = (handleDialogOpen: (data: Rental) => void) => {
  return useMemo(
    () => [
      {
        label: "brand",
        renderData: (data: Rental) => data.vehicleSummary.brand,
      },
      {
        label: "model",
        renderData: (data: Rental) => data.vehicleSummary.model,
      },
      {
        label: "date from",
        renderData: (data: Rental) =>
          format(parseISO(data.dateFrom), DEFAULT_DATE_FORMAT),
      },
      {
        label: "date to",
        renderData: (data: Rental) =>
          format(parseISO(data.dateTo), DEFAULT_DATE_FORMAT),
      },
      {
        label: "rental start",
        renderData: (data: Rental) =>
          format(parseISO(data.rentalStartDate), DEFAULT_DATE_FORMAT),
      },
      {
        label: "",
        renderData: (data: Rental) => (
          <Button variant="contained" onClick={() => handleDialogOpen(data)}>
            Close Rental
          </Button>
        ),
      },
    ],
    [handleDialogOpen]
  );
};
