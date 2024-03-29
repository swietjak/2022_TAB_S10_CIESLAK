import { styled } from "@mui/material";
import { useState } from "react";
import { ModalRoutes } from "modules";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type LayoutProps = {};

export const PageWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(3, 2),
}));

const Layout = (props: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Topbar
        sidebarOpen={isSidebarOpen}
        handleSidebarOpen={() => setIsSidebarOpen(true)}
      />
      <Sidebar
        drawerOpen={isSidebarOpen}
        closeDialog={() => setIsSidebarOpen(false)}
      />
      <PageWrapper>
        <ModalRoutes />
      </PageWrapper>
    </>
  );
};

export default Layout;
