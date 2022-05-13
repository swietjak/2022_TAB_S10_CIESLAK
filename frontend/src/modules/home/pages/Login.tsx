import { Button, Grid, Typography } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { Navigate, Route, Routes } from "react-router-dom";
import { TextField } from "shared/components";
import { useInitialPath, useUserData } from "shared/hooks";
import { LoginContainer } from "./Login.styles";
import { LoginFormFields, useOnLoginSubmit, useLoginForm } from "./Login.utils";

type LoginProps = {};

const Login = (props: LoginProps) => {
  const formProps = useLoginForm();
  const onLoginSubmit = useOnLoginSubmit();
  const initialPath = useInitialPath();
  const { userId } = useUserData();

  return (
    <form onSubmit={formProps.handleSubmit(onLoginSubmit)}>
      <FormProvider {...formProps}>
        <LoginContainer>
          <Grid
            direction="column"
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h5" marginBottom={3}>
                Login
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                name={LoginFormFields.Email}
                type="email"
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                name={LoginFormFields.Password}
                type="password"
                label="Password"
                variant="outlined"
              />
            </Grid>
            <Grid item marginTop={3}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                disableElevation
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </LoginContainer>
      </FormProvider>
    </form>
  );
};

export default Login;
