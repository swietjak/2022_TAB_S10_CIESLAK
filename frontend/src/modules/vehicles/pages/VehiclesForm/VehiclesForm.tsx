import { Button, Grid } from "@mui/material";
import React from "react";
import { FormProvider } from "react-hook-form";
import { CarComponent } from "../../components/VehicleFormComponents/CarComponent";
import { EquipmentComponent } from "../../components/VehicleFormComponents/EquipmentComponent";
import { useOnSubmit, useVehiclesForm } from "./VehiclesForm.utils";
import { CarContainer } from "./VehiclesForm.styles";

type VehiclesFormProps = {};

const VehiclesForm = (props: VehiclesFormProps) => {
  const formProps = useVehiclesForm();
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
        </CarContainer>
      </FormProvider>
    </form>
  );
};

export default VehiclesForm;
