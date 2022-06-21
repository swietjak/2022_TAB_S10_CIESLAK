import { equipmentsOptionsMock } from "shared/mocks";

export const useEquipmentsOptions = () => {
  //TODO: uncomment when autocompletes are ready
  // const { control } = useFormContext();
  // const selectedOptions = useWatch({
  //   control,
  //   name: VehiclesFormFields.EquipmentNames,
  // }) as number[];

  return equipmentsOptionsMock;
};
