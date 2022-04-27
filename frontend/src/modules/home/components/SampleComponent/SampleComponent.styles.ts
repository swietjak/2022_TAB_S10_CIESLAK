import { Grid, styled } from "@mui/material";

export const PageWrapper = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1, 2, 1, 1),
  background: "teal",
}));
