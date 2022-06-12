import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { object, SchemaOf, string, number, array, mixed } from "yup";
import { Equipment, FieldValue, VehicleDetails } from "shared/types";
import { actions } from "../../store";
import { useCallback } from "react";
import { paths } from "config";

export enum VehiclesFormFields {
  Brand = "brand",
  Model = "model",
  EnginePower = "enginePower",
  EngineCapacity = "engineCapacity",
  Vin = "vin",
  EquipmentNames = "equipmentsName",
  EquipmentQuantities = "equipmentsQuantities",
  Equipments = "Equipments",
}

export interface VehiclesFormValues {
  [VehiclesFormFields.Brand]: string;
  [VehiclesFormFields.Model]: string;
  [VehiclesFormFields.Vin]: string;
  [VehiclesFormFields.EngineCapacity]: number;
  [VehiclesFormFields.EnginePower]: number;
  [VehiclesFormFields.EquipmentQuantities]: number[];
  [VehiclesFormFields.EquipmentNames]: FieldValue[];
}

export const getDefaultValues = (
  vehicle?: VehicleDetails
): VehiclesFormValues => {
  const equipmentsNames = vehicle?.equipments.map(({ amount, ...eq }) => ({
    value: eq.id,
    label: eq.name,
  }));
  const equipmentsQuantities = vehicle?.equipments.map((eq) => eq.amount);
  return {
    [VehiclesFormFields.Brand]: vehicle?.brand || "",
    [VehiclesFormFields.Model]: vehicle?.model || "",
    [VehiclesFormFields.Vin]: vehicle?.vin || "",
    [VehiclesFormFields.EngineCapacity]: vehicle?.engineCapacity || 0,
    [VehiclesFormFields.EnginePower]: vehicle?.enginePower || 0,
    [VehiclesFormFields.EquipmentQuantities]: equipmentsQuantities || [],
    [VehiclesFormFields.EquipmentNames]: equipmentsNames || [],
  };
};

export const validationSchema: SchemaOf<VehiclesFormValues> = object()
  .shape({
    [VehiclesFormFields.Brand]: string().required("REQUIRED"),
    [VehiclesFormFields.Model]: string().required("REQUIRED"),
    [VehiclesFormFields.Vin]: string().required("REQUIRED"),
    [VehiclesFormFields.EngineCapacity]: number().required("REQUIRED"),
    [VehiclesFormFields.EnginePower]: number().required("REQUIRED"),
    [VehiclesFormFields.EquipmentQuantities]: array().of(
      number().required("REQUIRED")
    ),
    [VehiclesFormFields.EquipmentNames]: array().of(
      mixed().required("REQUIRED")
    ),
  })
  .required();

export const useOnSubmit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vehicleId } = useParams();

  const onSuccess = useCallback(() => {
    navigate(paths.careTakerVehiclesList);
  }, [navigate]);

  return (values: VehiclesFormValues) => {
    const { equipmentsName, equipmentsQuantities, ...createParams } = values;
    const equipments: Equipment[] = equipmentsName.map(({ value }, i) => ({
      id: value,
      amount: equipmentsQuantities[i],
    }));

    if (!vehicleId)
      return dispatch(
        actions.createVehicle({
          onSuccess,
          params: { equipments, ...createParams },
        })
      );

    return dispatch(
      actions.updateVehicle({
        onSuccess,
        params: { id: parseInt(vehicleId, 10), equipments, ...createParams },
      })
    );
  };
};

export const useVehiclesForm = (vehicle?: VehicleDetails) =>
  useForm<VehiclesFormValues>({
    defaultValues: getDefaultValues(vehicle),
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  });
