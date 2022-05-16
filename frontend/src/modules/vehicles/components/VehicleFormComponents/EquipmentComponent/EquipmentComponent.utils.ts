import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { equipmentsOptionsMock } from "shared/mocks";
import { FieldValue } from "shared/types";
import { VehiclesFormFields } from "../../../pages/VehiclesForm";

export const useEquipmentsOptions = () => {
  const { control } = useFormContext();
  const selectedOptions = useWatch({
    control,
    name: VehiclesFormFields.EquipmentNames,
  }) as number[];

  return useMemo(
    () =>
      equipmentsOptionsMock.filter(
        (option) => !selectedOptions.some((o) => option.value === o)
      ),
    [selectedOptions]
  );
};
