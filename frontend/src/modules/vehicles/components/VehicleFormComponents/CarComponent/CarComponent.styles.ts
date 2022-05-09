import { Grid, styled } from "@mui/material";

export const TextField = styled(Grid)(({ theme }) => ({
  display: "flex",
}));

export const Textlabel = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(4, 3, 1, 3),
  fontWeight: "400",
  lineHeight: "24px",
}));
