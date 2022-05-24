import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { Vehicle } from "shared/types";
import {
  AvailabilitiesFiltersFields,
  AvailabilitiesFiltersValues,
  useOnSubmit,
} from ".";

interface CreateReservationDialogProps extends DialogProps {}

export const CreateReservationDialog = (
  props: CreateReservationDialogProps
) => {
  const handleClose = () => {
    if (props.onClose) props.onClose({}, "backdropClick");
  };
  const { control, getValues } = useFormContext<AvailabilitiesFiltersValues>();
  const vehicle = useWatch({
    control,
    name: AvailabilitiesFiltersFields.Vehicle,
  }) as Vehicle;
  const onSubmit = useOnSubmit(handleClose);

  return (
    <Dialog {...props}>
      <DialogTitle>Create reservation</DialogTitle>
      <DialogContent>
        <Grid container direction="column">
          <Grid item>
            <p>
              <strong>Vin: </strong> {vehicle.vin}
            </p>
            <p>
              <strong>Brand: </strong> {vehicle.brand}
            </p>
            <p>
              <strong>Model: </strong> {vehicle.model}
            </p>
          </Grid>
          <Grid item>
            <TextField
              label="Description"
              name={AvailabilitiesFiltersFields.Description}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button onClick={handleClose}>Cancel</Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              type="submit"
              onClick={() => onSubmit(getValues())}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};
