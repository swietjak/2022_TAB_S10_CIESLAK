import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { actions } from "shared/store";
import { LogoutWrapper, LogoWrapper, TopbarContainer } from "./Topbar.styles";

const Topbar = () => {
  const dispatch = useDispatch();
  return (
    <TopbarContainer>
      <LogoWrapper>
        <DirectionsCarFilledIcon fontSize="large" />
        <Typography variant="h6">Cars & stuff</Typography>
      </LogoWrapper>
      <LogoutWrapper onClick={() => dispatch(actions.resetUserData())}>
        Log out
      </LogoutWrapper>
    </TopbarContainer>
  );
};

export default Topbar;
