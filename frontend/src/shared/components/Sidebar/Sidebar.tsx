import {
  Divider,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useNavigate } from "react-router";
import { SidebarContainer, EmptyCell } from "./Sidebar.style";
import { useSidebarEntries } from "./Sidebar.utils";

interface SidebarProps {
  drawerOpen: boolean;
  closeDialog: () => void;
}

const Sidebar = ({ closeDialog, drawerOpen }: SidebarProps) => {
  const sidebarEntries = useSidebarEntries();
  const navigate = useNavigate();

  return (
    <nav>
      <SwipeableDrawer
        open={drawerOpen}
        anchor="left"
        onOpen={() => {}}
        onClose={closeDialog}
      >
        <SidebarContainer>
          <EmptyCell />
          <Divider />
          <List>
            {sidebarEntries.map(({ Icon, label, path }) => (
              <ListItem>
                <ListItemButton onClick={() => navigate(path)}>
                  <ListItemIcon>
                    <Icon fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </SidebarContainer>
      </SwipeableDrawer>
    </nav>
  );
};

export default Sidebar;
