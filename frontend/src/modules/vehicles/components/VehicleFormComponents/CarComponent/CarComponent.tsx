import { Grid } from "@mui/material";
import { PageWrapper } from "../../../pages/VehiclesForm";
import { TextField } from "shared/components";
import { VehiclesFormFields } from "../../../pages/VehiclesForm";
import { Textlabel } from "./CarComponent.styles";

const CarComponent = () => {
  return (
    <PageWrapper direction="column" item container spacing={2} xs={6}>
      <Textlabel>Car</Textlabel>
      <Grid item>
        <TextField
          name={VehiclesFormFields.Brand}
          placeholder="Brand"
          label="Brand"
        />
      </Grid>
      <Grid item>
        <TextField
          name={VehiclesFormFields.Model}
          placeholder="Model"
          label="Model"
        />
      </Grid>
      <Grid item>
        <TextField
          name={VehiclesFormFields.Vin}
          placeholder="Vin"
          label="Vin"
        />
      </Grid>
      <Textlabel>Engine</Textlabel>
      <Grid item>
        <TextField
          name={VehiclesFormFields.EngineCapacity}
          placeholder="EngineCapacity"
          label="EngineCapacity"
        />
      </Grid>
      <Grid item>
        <TextField
          name={VehiclesFormFields.EnginePower}
          placeholder="EnginePower"
          label="EnginePower"
        />
      </Grid>
    </PageWrapper>
  );
};

export default CarComponent;
