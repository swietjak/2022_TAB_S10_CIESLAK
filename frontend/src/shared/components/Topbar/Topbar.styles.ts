import { styled } from "@mui/material";

export const TopbarContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.common.white,
  background: theme.palette.primary.main,
  height: 84,
  padding: 34,
}));
