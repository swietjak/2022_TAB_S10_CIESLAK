import { DirectionsCarFilled, Menu } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useUserData } from "shared/hooks";
import { actions } from "shared/store";
import { LogoutWrapper, LogoWrapper, TopbarContainer } from "./Topbar.styles";

interface TopbarProps {
  handleSidebarOpen: () => void;
  sidebarOpen: boolean;
}

const Topbar = ({ handleSidebarOpen, sidebarOpen }: TopbarProps) => {
  const dispatch = useDispatch();
  const { userId } = useUserData();
  return (
    <TopbarContainer>
      {userId && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleSidebarOpen}
          edge="start"
        >
          <Menu />
        </IconButton>
      )}
      <Grid container justifyContent="space-between" alignItems="center">
        <LogoWrapper item>
          <DirectionsCarFilled fontSize="large" />
          <Typography variant="h6">Cars & stuff</Typography>
        </LogoWrapper>
        {userId && (
          <LogoutWrapper item onClick={() => dispatch(actions.resetUserData())}>
            Log out
          </LogoutWrapper>
        )}
      </Grid>
    </TopbarContainer>
  );
};

export default Topbar;
