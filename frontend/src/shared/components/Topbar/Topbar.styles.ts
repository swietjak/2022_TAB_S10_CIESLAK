import { Grid, styled } from "@mui/material";

export const TOPBAR_HEIGHT = 84;

export const TopbarContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  color: theme.palette.common.white,
  background: theme.palette.primary.main,
  height: TOPBAR_HEIGHT,
  padding: 34,
  width: "100%",
}));

export const LogoWrapper = styled(Grid)({
  display: "flex",
});

export const LogoutWrapper = styled(Grid)({
  cursor: "pointer",
  justifySelf: "end",
});
