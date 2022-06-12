import { Grid } from "@mui/material";
import { PageWrapper } from "../../VehiclesForm";
import { TextField } from "shared/components";
import { VehiclesFormFields } from "../../VehiclesForm";
import { Textlabel } from "./CarComponent.styles";

const CarComponent = () => {
  return (
    <PageWrapper item container spacing={2} xs={6}>
      <Grid xs={12}>
        <Textlabel>Car</Textlabel>
      </Grid>
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
      <Grid xs={12}>
        <Textlabel>Engine</Textlabel>
      </Grid>
      <Grid item>
        <TextField
          name={VehiclesFormFields.EngineCapacity}
          placeholder="EngineCapacity"
          label="Capacity"
        />
      </Grid>
      <Grid item>
        <TextField
          type="number"
          name={VehiclesFormFields.EnginePower}
          placeholder="EnginePower"
          label="Power"
        />
      </Grid>
    </PageWrapper>
  );
};

export default CarComponent;
