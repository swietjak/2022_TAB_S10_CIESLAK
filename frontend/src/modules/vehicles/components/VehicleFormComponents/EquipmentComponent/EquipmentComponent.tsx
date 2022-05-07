import { Grid } from "@mui/material";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Select, TextField } from "shared/components";
import { equipmentsOptionsMock } from "shared/mocks";
import { VehiclesFormFields } from "../../../pages/VehiclesForm";

const EquipmentComponent = () => {
  const { control } = useFormContext();
  const {
    fields: namesFields,
    append: appendName,
    remove: removeName,
  } = useFieldArray({
    control,
    name: VehiclesFormFields.EquipmentNames,
  });

  const {
    fields: quantitiesFields,
    append: appendQuantity,
    remove: removeQuantity,
  } = useFieldArray({
    control,
    name: VehiclesFormFields.EquipmentQuantities,
  });
  return (
    <Grid container>
      {quantitiesFields.map((_, i) => (
        <Grid item key={`grid-${i}`}>
          <Select
            options={equipmentsOptionsMock}
            placeholder="Eq name"
            key={`name-${i}`}
            name={`${VehiclesFormFields.EquipmentNames}[${i}]`}
          />
          <TextField
            type="number"
            placeholder="Eq quantity"
            key={`quantity-${i}`}
            name={`${VehiclesFormFields.EquipmentQuantities}[${i}]`}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default EquipmentComponent;
