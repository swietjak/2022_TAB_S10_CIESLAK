import { Grid, styled } from "@mui/material";

export const ExecutionsTableContainer = styled(Grid)(({ theme }) => ({
  "& >:first-child": {
    marginLeft: theme.spacing(4.5),
  },
  marginTop: theme.spacing(5),
}));
