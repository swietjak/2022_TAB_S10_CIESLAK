import { Grid, styled } from "@mui/material";

export const PageWrapper = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1, 2, 1, 1),
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  "& .MuiInputBase-root": {
    width: 150,
  },
}));
export const CarContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(7),
}));
