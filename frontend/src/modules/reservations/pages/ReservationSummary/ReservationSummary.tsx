import { Button, Grid, TextField } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ReservationFormFields,
  defaultValues,
  validationSchema,
  onSubmit,
  ReservationFormValues,
} from "./ReservationsSummary.utils";

const ReservationSummary = () => {
  const formProps = useForm<ReservationFormValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, register } = formProps;
  return (
    <form onSubmit={() => handleSubmit(onSubmit)}>
      <FormProvider {...formProps}>
        <Grid container spacing={4}>
          <Grid item>
            <TextField {...register(ReservationFormFields.Brand)} />
          </Grid>
          <Grid item>
            <TextField {...register(ReservationFormFields.StartDate)} />
          </Grid>
          <Grid item>
            <TextField {...register(ReservationFormFields.EndDate)} />
          </Grid>
          <Grid item>
            <Button type="submit">Submit</Button>
          </Grid>
        </Grid>
      </FormProvider>
    </form>
  );
};

export default ReservationSummary;
