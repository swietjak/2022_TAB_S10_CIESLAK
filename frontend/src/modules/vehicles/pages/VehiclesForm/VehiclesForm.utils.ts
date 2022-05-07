import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Equipment, FieldValue } from "shared/types";
import { object, SchemaOf, string, number, array, mixed } from "yup";

import { actions } from "../../store";

export enum VehiclesFormFields {
  Brand = "brand",
  Model = "model",
  EnginePower = "enginePower",
  EngineCapacity = "engineCapacity",
  Vin = "vin",
  EquipmentNames = "equipmentsName",
  EquipmentQuantities = "equipmentsQuantities",
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

export const defaultValues: VehiclesFormValues = {
  [VehiclesFormFields.Brand]: "",
  [VehiclesFormFields.Model]: "",
  [VehiclesFormFields.Vin]: "",
  [VehiclesFormFields.EngineCapacity]: 0,
  [VehiclesFormFields.EnginePower]: 0,
  [VehiclesFormFields.EquipmentQuantities]: [],
  [VehiclesFormFields.EquipmentNames]: [],
};

export const validationSchema: SchemaOf<VehiclesFormValues> = object()
  .shape({
    [VehiclesFormFields.Brand]: string().required("JESTEM WYMAGANY"),
    [VehiclesFormFields.Model]: string().required("JESTEM WYMAGANY"),
    [VehiclesFormFields.Vin]: string().required("JESTEM WYMAGANY"),
    [VehiclesFormFields.EngineCapacity]: number(),
    [VehiclesFormFields.EnginePower]: number(),
    [VehiclesFormFields.EquipmentQuantities]: array().of(string()),
    [VehiclesFormFields.EquipmentNames]: array().of(mixed()),
  })
  .required();

export const useOnSubmit = () => {
  const dispatch = useDispatch();
  return (values: VehiclesFormValues) => {
    const { equipmentsName, equipmentsQuantities, ...createParams } = values;
    const equipments: Equipment[] = equipmentsName.map((eqName, i) => ({
      id: eqName.value,
      amount: equipmentsQuantities[i],
    }));
    dispatch(actions.createVehicle({ equipments, ...createParams }));
  };
};

export const useVehiclesForm = () => {
  return useForm<VehiclesFormValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  });
};
