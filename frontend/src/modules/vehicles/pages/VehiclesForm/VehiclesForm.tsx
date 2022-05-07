import { Button, Table } from "@mui/material";
import React from "react";
import { FormProvider } from "react-hook-form";
import { CarComponent } from "../../components/VehicleFormComponents/CarComponent";
import { EquipmentComponent } from "../../components/VehicleFormComponents/EquipmentComponent";
import { useOnSubmit, useVehiclesForm } from "./VehiclesForm.utils";

type VehiclesFormProps = {};

const VehiclesForm = (props: VehiclesFormProps) => {
  const formProps = useVehiclesForm();
  const onSubmit = useOnSubmit();
  return (
    <form onSubmit={formProps.handleSubmit(onSubmit)}>
      <FormProvider {...formProps}>
        <CarComponent />
        <EquipmentComponent />
        <Button onSubmit={formProps.handleSubmit(onSubmit)} type="submit">
          XDDDD
        </Button>
      </FormProvider>
    </form>
  );
};

export default VehiclesForm;
