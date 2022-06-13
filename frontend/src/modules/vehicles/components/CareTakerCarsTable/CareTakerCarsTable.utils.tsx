import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { endOfToday, startOfToday } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useUserData } from "shared/hooks";
import Servicers from "shared/services/Servicers";
import { Column, DialogField, FieldValue, Vehicle } from "shared/types";
import { date, mixed, object, SchemaOf, string } from "yup";
import { actions } from "../../store";

export enum ServiceExecutionFields {
  StartDate = "startDate",
  EndDate = "endDate",
  Servicer = "servicer",
  ServicePricing = "servicePricing",
  Description = "description",
}

export interface ServiceExecutionValues {
  [ServiceExecutionFields.StartDate]: Date;
  [ServiceExecutionFields.EndDate]: Date;
  [ServiceExecutionFields.Servicer]: FieldValue | null;
  [ServiceExecutionFields.ServicePricing]: FieldValue | null;
  [ServiceExecutionFields.Description]: string;
}

export const defaultValues: ServiceExecutionValues = {
  [ServiceExecutionFields.StartDate]: startOfToday(),
  [ServiceExecutionFields.EndDate]: endOfToday(),
  [ServiceExecutionFields.Servicer]: null,
  [ServiceExecutionFields.ServicePricing]: null,
  [ServiceExecutionFields.Description]: "",
};

export const validationSchema: SchemaOf<ServiceExecutionValues> = object()
  .shape({
    [ServiceExecutionFields.StartDate]: date().required("REQUIRED"),
    [ServiceExecutionFields.EndDate]: date().required("REQUIRED"),
    [ServiceExecutionFields.Servicer]: mixed<FieldValue>().required("REQUIRED"),
    [ServiceExecutionFields.ServicePricing]:
      mixed<FieldValue>().required("REQUIRED"),
    [ServiceExecutionFields.Description]: string(),
  })
  .required();

export const useOnSubmit = (handleClose: () => void) => {
  const dispatch = useDispatch();
  const { userId } = useUserData();

  const onSuccess = useCallback(() => {
    handleClose();
    if (userId) dispatch(actions.getCareTakerVehicles(userId));
  }, [dispatch, handleClose, userId]);

  return useCallback(
    (values: ServiceExecutionValues, vehicleCareId: number) => {
      const { servicePricing, servicer, ...params } = values;
      if (
        !servicer ||
        !servicePricing ||
        !params[ServiceExecutionFields.StartDate] ||
        !params[ServiceExecutionFields.EndDate]
      )
        return;

      dispatch(
        actions.createServiceExecution({
          params: {
            vehicleCareId,
            servicePricingId: servicePricing.value,
            ...params,
          },
          onSuccess,
        })
      );
    },
    [dispatch, onSuccess]
  );
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
        label: "status",
        renderData: (data: Vehicle) => data.status || "",
      },
      {
        label: "",
        renderData: (data: Vehicle) => (
          <Button
            variant="contained"
            onClick={(e) => {
              if (!!data.vehicleCareId) handleDialogOpen(data.vehicleCareId);
              e.stopPropagation();
            }}
          >
            Plan service
          </Button>
        ),
      },
    ],
    [handleDialogOpen]
  );
};

const servicers = new Servicers();

export const useServiceFormDialog = () => {
  const formProps = useForm<ServiceExecutionValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  });

  const [selectedVehicleCareId, setSelectedVehicleCareId] = useState<
    number | null
  >(null);

  const handleOpen = useCallback((id: number) => {
    setSelectedVehicleCareId(id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedVehicleCareId(null);
  }, []);

  const handleSubmit = useOnSubmit(handleClose);
  const handleConfirm = useCallback(
    (values: ServiceExecutionValues) => {
      if (!!selectedVehicleCareId) handleSubmit(values, selectedVehicleCareId);
    },
    [handleSubmit, selectedVehicleCareId]
  );

  const externalServicer = useWatch({
    control: formProps.control,
    name: ServiceExecutionFields.Servicer,
  }) as FieldValue;

  const fields: DialogField[] = useMemo(
    () => [
      {
        label: "start date",
        name: ServiceExecutionFields.StartDate,
        type: "date",
      },
      {
        label: "end date",
        name: ServiceExecutionFields.EndDate,
        type: "date",
      },
      {
        label: "servicer",
        name: ServiceExecutionFields.Servicer,
        type: "autocomplete",
        getOptions: () => servicers.getServicers(),
      },
      {
        label: "service pricing",
        name: ServiceExecutionFields.ServicePricing,
        type: "autocomplete",
        getOptions: () => {
          console.log(externalServicer);
          if (!!externalServicer)
            return servicers.getServicePricings(externalServicer.value);
          return Promise.resolve([]);
        },
      },
      {
        label: "description",
        name: ServiceExecutionFields.Description,
        type: "text",
      },
    ],
    [externalServicer]
  );

  return {
    fields,
    formProps,
    handleClose,
    handleOpen,
    handleConfirm,
    isOpen: !!selectedVehicleCareId,
  };
};
