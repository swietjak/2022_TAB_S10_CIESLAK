import { PageWrapper } from "modules/vehicles/pages/VehiclesForm/ViehiclesForm.styles";
import { TextField } from "shared/components";
import { VehiclesFormFields } from "../../../pages/VehiclesForm";
import { Textlabel } from "./CarComponent.styles";


const CarComponent = () => {
  return (
    <PageWrapper container spacing={-10}>
      <Textlabel>Car</Textlabel>
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
      <TextField name={VehiclesFormFields.Vin} placeholder="Vin" label="Vin" />
      <Textlabel>Engine</Textlabel>
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
    </PageWrapper>
  );
};

export default CarComponent;
