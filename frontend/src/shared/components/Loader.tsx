import { CircularProgress, styled, Typography } from "@mui/material";
import { HTMLAttributes } from "react";

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  size?: number;
}

export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  "& > .MuiCircularProgress-root": {
    marginBottom: theme.spacing(2),
  },
}));

const Loader = ({ label, size = 100, ...props }: LoaderProps) => (
  <Container {...props}>
    <CircularProgress size={size} />
    <Typography variant="subtitle1" color="textPrimary">
      {label}
    </Typography>
  </Container>
);

export default Loader;
