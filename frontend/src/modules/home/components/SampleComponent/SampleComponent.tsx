import { Button, Grid, Typography } from "@mui/material";
import { paths } from "config";
import { useNavigate } from "react-router";
import {
  PageWrapper,
  CustomGrid,
  StyledTypography,
} from "./SampleComponent.styles";
import { useMultipliedNum, useReduxIncrement } from "./SampleComponent.utils";

interface SampleComponentProps {
  initialNum: number;
}

const SampleComponent = ({ initialNum }: SampleComponentProps) => {
  const { num: stateNumber, handleClick } = useMultipliedNum(initialNum);
  const {
    handleDcrement,
    handleIncrement,
    number: reduxNumber,
  } = useReduxIncrement();

  const navigate = useNavigate();
  return (
    <PageWrapper container spacing={3}>
      <CustomGrid item container xs={6} justifyContent="center">
        <Grid item xs>
          <Typography color="#fff" variant="body2">
            {stateNumber}
          </Typography>
        </Grid>
        <Grid item xs>
          <Button onClick={handleClick}>Increment!</Button>
        </Grid>
      </CustomGrid>
      <Grid item container xs={6} justifyContent="center">
        <Grid item>
          <StyledTypography variant="subtitle1">{reduxNumber}</StyledTypography>
        </Grid>
        <Grid item container justifyContent="center">
          <Grid item>
            <Button onClick={handleIncrement} variant="contained">
              Increment!
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleDcrement} variant="outlined">
              Decrement!
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Button onClick={() => navigate(paths.reservationsTable)}>XDDD</Button>
    </PageWrapper>
  );
};

export default SampleComponent;
