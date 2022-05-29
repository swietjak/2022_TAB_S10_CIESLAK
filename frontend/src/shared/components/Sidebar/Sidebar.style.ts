import { Grid, Paper, styled } from "@mui/material";
import { TOPBAR_HEIGHT } from "../Topbar/Topbar.styles";

export const SidebarContainer = styled(Paper)(({ theme }) => ({
  height: "100%",
}));

export const SidebarItem = styled(Grid)({
  "&:hover": {
    cursor: "pointer",
  },
});

export const ItemsContainer = styled(Grid)(({ theme }) => ({
  width: 200,
  padding: theme.spacing(2),
}));

export const EmptyCell = styled("div")({
  height: TOPBAR_HEIGHT,
});
