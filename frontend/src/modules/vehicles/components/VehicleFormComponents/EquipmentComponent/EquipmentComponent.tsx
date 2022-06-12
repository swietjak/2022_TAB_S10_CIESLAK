import { Cancel } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { PageWrapper } from "modules/vehicles/components/VehiclesForm/VehiclesForm.styles";
import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormAutocomplete, TextField } from "shared/components";
import Vehicles from "shared/services/Vehicles";
import { VehiclesFormFields } from "../../VehiclesForm";

const vehicles = new Vehicles();

const EquipmentComponent = () => {
  const { control } = useFormContext();
  const { append: appendName, remove: removeName } = useFieldArray({
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
    appendName({ label: "" });
  }, [appendName, appendQuantity]);

  const removeEq = useCallback(
    (index: number) => {
      removeName(index);
      removeQuantity(index);
    },
    [removeName, removeQuantity]
  );

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
            <FormAutocomplete
              getOptions={vehicles.getEquipments}
              label="Equipment name"
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
          <Grid item>
            <IconButton onClick={() => removeEq(i)} size="large">
              <Cancel />
            </IconButton>
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
