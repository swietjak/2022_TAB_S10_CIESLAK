import { TopbarContainer } from "./Topbar.styles";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import { Typography } from "@mui/material";

const Topbar = () => {
  return (
    <TopbarContainer>
      <AccessibleForwardIcon fontSize="large" />
      <Typography variant="h6">Cars & stuff</Typography>
    </TopbarContainer>
  );
};

export default Topbar;
