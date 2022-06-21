import { Grid } from "@mui/material";
import Workers from "shared/services/Workers";
import { FormAutocomplete, TextField } from "shared/components";
import { PageWrapper } from "../../VehiclesForm";
import { VehiclesFormFields } from "../../VehiclesForm";
import { Textlabel } from "./CarComponent.styles";
import { useParams } from "react-router";

const workers = new Workers();

const CarComponent = () => {
  const { vehicleId } = useParams();
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
      {!vehicleId && (
        <>
          <Grid xs={12}>
            <Textlabel>Care Taker</Textlabel>
          </Grid>

          <Grid item xs={12}>
            <FormAutocomplete
              getOptions={workers.getCareTakers}
              name={VehiclesFormFields.CareTaker}
              label="Care taker name"
            />
          </Grid>
        </>
      )}
    </PageWrapper>
  );
};

export default CarComponent;
