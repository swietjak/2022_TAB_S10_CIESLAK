import { Grid, styled, Typography } from "@mui/material";

export const PageWrapper = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1, 2, 1, 1),
  background: "teal",
}));

export const CustomGrid = styled(Grid)(({ theme }) => ({
  background: "red",
  paddingTop: theme.spacing(1.25),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
