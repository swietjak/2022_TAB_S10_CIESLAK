import { Cancel } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import { FormProvider, useFieldArray } from "react-hook-form";
import { FormAutocomplete, TextField } from "shared/components";
import Servicers from "shared/services/Servicers";
import { Servicer } from "shared/types";
import { FormWrapper } from "./ServicerForm.style";
import {
  ServicePricingFields,
  ServicerFormFields,
  useOnSubmit,
  useServicersForm,
} from "./ServicerForm.utils";

interface ServicerFormProps {
  servicer?: Servicer;
}

const servicers = new Servicers();

const ServicerForm = ({ servicer }: ServicerFormProps) => {
  const formProps = useServicersForm(servicer);
  const onSubmit = useOnSubmit(servicer);

  const { fields, append, remove } = useFieldArray({
    control: formProps.control,
    name: ServicerFormFields.ServicePricings,
  });

  return (
    <form onSubmit={formProps.handleSubmit(onSubmit)}>
      <FormProvider {...formProps}>
        <FormWrapper container spacing={3}>
          <Grid item>
            <TextField label="NAME" name={ServicerFormFields.Name} />
          </Grid>
          <Grid item container direction="column" spacing={3}>
            {fields.map((_, i) => (
              <Grid item container spacing={3}>
                <Grid item>
                  <FormAutocomplete
                    label="Service"
                    name={`${ServicerFormFields.ServicePricings}[${i}].${ServicePricingFields.Service}`}
                    getOptions={() => servicers.getServices()}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name={`${ServicerFormFields.ServicePricings}[${i}].${ServicePricingFields.Price}`}
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={() => remove(i)}>
                    <Cancel />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Grid item>
              <Button onClick={() => append({ price: 0 })} variant="contained">
                Add service
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              onClick={formProps.handleSubmit(onSubmit)}
              variant="contained"
              type="submit"
            >
              Save
            </Button>
          </Grid>
        </FormWrapper>
      </FormProvider>
    </form>
  );
};

export default ServicerForm;
