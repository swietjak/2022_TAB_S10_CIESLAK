import { Button, Grid, TextField, Typography } from "@mui/material";
import { LoginContainer } from "./Login.styles";

type LoginProps = {};

const Login = (props: LoginProps) => (
  <LoginContainer>
  <Grid  direction="column"  container spacing={3}  justifyContent="center" alignItems="center" >
    <Grid item> 
    <Typography variant="h5" marginBottom={3}> Login </Typography>
    </Grid>
    <Grid item> 
    <TextField  type="email" id="Login-basic" label="Username" variant="outlined" />
    </Grid>
    <Grid item> 
    <TextField type="password" id="Password-basic" label="Password" variant="outlined" />
    </Grid>
    <Grid item marginTop={3}> 
    <Button  type="submit" size="large" variant="contained" color = "primary" disableElevation > Log in </Button>
    </Grid>
  </Grid>
   </LoginContainer>
);

export default Login;
