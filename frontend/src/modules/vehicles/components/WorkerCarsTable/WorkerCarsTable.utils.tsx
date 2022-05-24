import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { startOfToday, startOfWeek } from "date-fns";
import { endOfWeek } from "date-fns/esm";
import { useCallback, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { Control, UseFormSetValue } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useUserData } from "shared/hooks";
import { Column, Vehicle } from "shared/types";
import { date, mixed, object, SchemaOf, string } from "yup";
import { actions, selectors } from "../../store";

export enum AvailabilitiesFiltersFields {
  DateFrom = "dateFrom",
  DateTo = "dateTo",
  Vehicle = "vehicle",
  Description = "description",
}

export interface AvailabilitiesFiltersValues {
  [AvailabilitiesFiltersFields.DateFrom]: Date;
  [AvailabilitiesFiltersFields.DateTo]: Date;
  [AvailabilitiesFiltersFields.Vehicle]: Vehicle | null;
  [AvailabilitiesFiltersFields.Description]: string;
}

export const defaultValues: AvailabilitiesFiltersValues = {
  [AvailabilitiesFiltersFields.DateFrom]: startOfWeek(startOfToday()),
  [AvailabilitiesFiltersFields.DateTo]: endOfWeek(startOfToday()),
  [AvailabilitiesFiltersFields.Vehicle]: null,
  [AvailabilitiesFiltersFields.Description]: "",
};

export const resolverSchema: SchemaOf<AvailabilitiesFiltersValues> = object()
  .shape({
    [AvailabilitiesFiltersFields.DateFrom]: date().required("REQUIRED"),
    [AvailabilitiesFiltersFields.DateTo]: date().required("REQUIRED"),
    [AvailabilitiesFiltersFields.Vehicle]: mixed<Vehicle>(),
    [AvailabilitiesFiltersFields.Description]: string(),
  })
  .required();

export const useFormProps = () =>
  useForm<AvailabilitiesFiltersValues>({
    defaultValues,
    reValidateMode: "onChange",
    mode: "onSubmit",
    resolver: yupResolver(resolverSchema),
  });

export const useOnSubmit = (closeDialog: () => void) => {
  const dispatch = useDispatch();
  const { userId } = useUserData();
  const onSuccess = useCallback(() => {
    dispatch(
      actions.getAvailableVehicles({
        startDate: defaultValues.dateFrom?.toISOString(),
        endDate: defaultValues.dateTo?.toISOString(),
      })
    );
    closeDialog();
  }, [closeDialog, dispatch]);

  return useCallback(
    (values: AvailabilitiesFiltersValues) => {
      console.log("XDDDD");
      if (!userId || !values[AvailabilitiesFiltersFields.Vehicle]) return;
      dispatch(
        actions.createUserReservation({
          onSuccess,
          params: {
            workerId: userId,
            dateFrom:
              values[AvailabilitiesFiltersFields.DateFrom].toISOString(),
            dateTo: values[AvailabilitiesFiltersFields.DateTo].toISOString(),
            vehicleId: values[AvailabilitiesFiltersFields.Vehicle]!.id,
            description: values[AvailabilitiesFiltersFields.Description],
          },
        })
      );
    },
    [dispatch, onSuccess, userId]
  );
};

export const useReservationModal = (
  control: Control<AvailabilitiesFiltersValues, object>,
  setValue: UseFormSetValue<AvailabilitiesFiltersValues>
) => {
  const vehicle = useWatch({
    control,
    name: AvailabilitiesFiltersFields.Vehicle,
  });

  const handleClose = () => setValue(AvailabilitiesFiltersFields.Vehicle, null);
  const handleOpen = (vehicle: Vehicle) => {
    setValue(AvailabilitiesFiltersFields.Vehicle, vehicle);
  };

  return {
    handleClose,
    handleOpen,
    isOpen: !!vehicle,
  };
};

export const useColumns = (
  handleDialogOpen: (vehicle: Vehicle) => void
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
          <Button variant="contained" onClick={() => handleDialogOpen(data)}>
            Make reservation
          </Button>
        ),
      },
    ],
    [handleDialogOpen]
  );
};

export const useAvailableVehicles = (
  control: Control<AvailabilitiesFiltersValues, object>
) => {
  const dispatch = useDispatch();
  const { data: vehiclesData, loading } = useSelector(
    selectors.getAvailableVehicles
  );

  const [dateFrom, dateTo] = useWatch({
    control,
    name: [
      AvailabilitiesFiltersFields.DateFrom,
      AvailabilitiesFiltersFields.DateTo,
    ],
  }) as [
    AvailabilitiesFiltersValues[AvailabilitiesFiltersFields.DateFrom],
    AvailabilitiesFiltersValues[AvailabilitiesFiltersFields.DateTo]
  ];

  const getAvailableVehicles = useCallback(
    () =>
      dispatch(
        actions.getAvailableVehicles({
          startDate: dateFrom.toISOString(),
          endDate: dateTo.toISOString(),
        })
      ),
    [dateFrom, dateTo, dispatch]
  );

  return { vehiclesData, loading, getAvailableVehicles };
};
