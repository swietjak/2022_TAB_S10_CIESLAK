import { Button, Table } from "@mui/material";
import React from "react";
import { FormProvider } from "react-hook-form";
import { CarComponent } from "../../components/VehicleFormComponents/CarComponent";
import { EquipmentComponent } from "../../components/VehicleFormComponents/EquipmentComponent";
import { useOnSubmit, useVehiclesForm } from "./VehiclesForm.utils";
import { CarContainer } from "./ViehiclesForm.styles";

type VehiclesFormProps = {};

const VehiclesForm = (props: VehiclesFormProps) => {
  const formProps = useVehiclesForm();
  const onSubmit = useOnSubmit();
  return (
    <form onSubmit={formProps.handleSubmit(onSubmit)}>
     
      <FormProvider {...formProps}>

      <CarContainer container spacing={3}>
        <CarComponent />
        <EquipmentComponent />
        
        </CarContainer>
        <Button onSubmit={formProps.handleSubmit(onSubmit)} type="submit">
          Submit
        </Button>
      </FormProvider>
      
    </form>
  );
};

export default VehiclesForm;