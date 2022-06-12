import { Button, Grid } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { VehicleDetails } from "shared/types";
import { CarComponent } from "../VehicleFormComponents/CarComponent";
import { EquipmentComponent } from "../VehicleFormComponents/EquipmentComponent";
import { useOnSubmit, useVehiclesForm } from "./VehiclesForm.utils";
import { CarContainer } from "./VehiclesForm.styles";
import ExecutionsTable from "../ExecutionsTable/ExecutionsTable";
import VehicleStatistics from "../VehicleStatistics";

interface VehiclesFormProps {
  vehicle?: VehicleDetails;
}

const VehiclesForm = ({ vehicle }: VehiclesFormProps) => {
  const formProps = useVehiclesForm(vehicle);
  const onSubmit = useOnSubmit();
  return (
    <form onSubmit={formProps.handleSubmit(onSubmit)}>
      <FormProvider {...formProps}>
        <CarContainer justifyContent="center" container>
          <CarComponent />
          <EquipmentComponent />
          <Grid xs={6}>
            <Button
              onSubmit={formProps.handleSubmit(onSubmit)}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Grid>
          {!!vehicle && <ExecutionsTable vehicleId={vehicle.id} />}
          {!!vehicle && <VehicleStatistics vehicleId={vehicle.id} />}
        </CarContainer>
      </FormProvider>
    </form>
  );
};

export default VehiclesForm;
