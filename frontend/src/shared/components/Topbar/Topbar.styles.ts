import { styled } from "@mui/material";

export const TopbarContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: theme.palette.common.white,
  background: theme.palette.primary.main,
  height: 84,
  padding: 34,
}));

export const LogoWrapper = styled("div")({
  display: "flex",
});

export const LogoutWrapper = styled("div")({
  cursor: "pointer",
});
