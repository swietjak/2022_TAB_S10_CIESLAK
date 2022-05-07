import { TextField } from "shared/components";
import { VehiclesFormFields } from "../../../pages/VehiclesForm";

const CarComponent = () => {
  return (
    <>
      <TextField
        name={VehiclesFormFields.Brand}
        placeholder="Brand"
        label="Brand"
      />
      <TextField
        name={VehiclesFormFields.Model}
        placeholder="Model"
        label="Model"
      />
      <TextField
        name={VehiclesFormFields.EngineCapacity}
        placeholder="EngineCapacity"
        label="EngineCapacity"
      />
      <TextField
        name={VehiclesFormFields.EnginePower}
        placeholder="EnginePower"
        label="EnginePower"
      />
    </>
  );
};

export default CarComponent;
