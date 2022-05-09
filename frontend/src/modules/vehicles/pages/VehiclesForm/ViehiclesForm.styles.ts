import { Grid, styled, Typography } from "@mui/material";

export const PageWrapper = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1, 2, 1, 1),
    background: "white",
    width: "431px",
    height: "663px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"


}));
export const CarContainer = styled(Grid)(({ theme }) => ({
      background: "white",
      width: "100%",
      height: "100%",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
  
  
}));
