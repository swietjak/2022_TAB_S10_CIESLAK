import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { object, SchemaOf, string, number, array, mixed } from "yup";
import { Equipment, FieldValue } from "shared/types";
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
  [VehiclesFormFields.EquipmentNames]: number[];
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

  const onSuccess = useCallback(() => {
    navigate(paths.adminVehiclesList);
  }, [navigate]);

  return (values: VehiclesFormValues) => {
    const { equipmentsName, equipmentsQuantities, ...createParams } = values;
    const equipments: Equipment[] = equipmentsName.map((eqName, i) => ({
      id: eqName,
      amount: equipmentsQuantities[i],
    }));
    dispatch(
      actions.createVehicle({
        onSuccess,
        params: { equipments, ...createParams },
      })
    );
  };
};

export const useVehiclesForm = () =>
  useForm<VehiclesFormValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  });
