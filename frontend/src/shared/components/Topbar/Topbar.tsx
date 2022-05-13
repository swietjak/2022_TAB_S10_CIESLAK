import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { actions } from "shared/store";
import { LogoutWrapper, LogoWrapper, TopbarContainer } from "./Topbar.styles";

const Topbar = () => {
  const dispatch = useDispatch();
  return (
    <TopbarContainer>
      <LogoWrapper>
        <AccessibleForwardIcon fontSize="large" />
        <Typography variant="h6">Cars & stuff</Typography>
      </LogoWrapper>
      <LogoutWrapper onClick={() => dispatch(actions.resetUserData())}>
        Log out
      </LogoutWrapper>
    </TopbarContainer>
  );
};

export default Topbar;
