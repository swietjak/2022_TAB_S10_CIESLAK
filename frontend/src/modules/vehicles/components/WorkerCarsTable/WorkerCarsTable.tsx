import { Button, Grid } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { CustomTable, FormDatePicker } from "shared/components";
import { CreateReservationDialog } from "./CreateReservationDialog";
import {
  useColumns,
  useReservationModal,
  useFormProps,
  useOnSubmit,
  AvailabilitiesFiltersFields,
  useAvailableVehicles,
} from "./WorkerCarsTable.utils";

export const WorkerCarsTable = () => {
  const formProps = useFormProps();
  const { control, setValue } = formProps;
  const { isOpen, handleClose, handleOpen } = useReservationModal(
    control,
    setValue
  );
  const onSubmit = useOnSubmit(handleClose);
  const columns = useColumns(handleOpen);
  const { getAvailableVehicles, loading, vehiclesData } =
    useAvailableVehicles(control);

  console.log("errory", formProps.formState.errors);

  return (
    <form onSubmit={formProps.handleSubmit(onSubmit)}>
      <FormProvider {...formProps}>
        {isOpen && <CreateReservationDialog open onClose={handleClose} />}
        <Grid spacing={4} container alignItems="center">
          <Grid item>
            <FormDatePicker name={AvailabilitiesFiltersFields.DateFrom} />
          </Grid>
          <Grid item>
            <FormDatePicker name={AvailabilitiesFiltersFields.DateTo} />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => getAvailableVehicles()}>
              Find vehicles
            </Button>
          </Grid>
        </Grid>
        <CustomTable columns={columns} data={vehiclesData} loading={loading} />
      </FormProvider>
    </form>
  );
};

export default WorkerCarsTable;
