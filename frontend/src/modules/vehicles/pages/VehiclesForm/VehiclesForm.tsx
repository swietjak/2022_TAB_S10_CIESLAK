import React from "react";
import { CarComponent } from "../../components/VehicleFormComponents/CarComponent";
import { EquipmentComponent } from "../../components/VehicleFormComponents/EquipmentComponent";

type VehiclesFormProps = {};

const VehiclesForm = (props: VehiclesFormProps) => (
  <form>
    <CarComponent />
    <EquipmentComponent />
  </form>
);

export default VehiclesForm;
