import { Button, Grid, Typography } from "@mui/material";
import { PageWrapper } from "modules/vehicles/pages/VehiclesForm/VehiclesForm.styles";
import React from "react";
import { useCallback } from "react";
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

  const addEq = useCallback(() => {
    appendQuantity(0);
    appendName({});
  }, [appendName, appendQuantity]);
  return (
    <PageWrapper item container direction="column" xs={6} spacing={2}>
      <Grid item>
        <Typography>Equipment</Typography>
      </Grid>
      {quantitiesFields.map((_, i) => (
        <Grid
          item
          container
          key={`grid-${i}`}
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item>
            <Select
              options={equipmentsOptionsMock}
              placeholder="Eq name"
              key={`name-${i}`}
              name={`${VehiclesFormFields.EquipmentNames}[${i}]`}
            />
          </Grid>
          <Grid item>
            <TextField
              type="number"
              placeholder="Eq quantity"
              key={`quantity-${i}`}
              name={`${VehiclesFormFields.EquipmentQuantities}[${i}]`}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item>
        <Button type="button" variant="outlined" onClick={addEq}>
          +
        </Button>
      </Grid>
    </PageWrapper>
  );
};

export default EquipmentComponent;
