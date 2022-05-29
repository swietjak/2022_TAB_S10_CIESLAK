import React, { useState } from "react";
import { ModalRoutes } from "modules";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type LayoutProps = {};

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
      <ModalRoutes />
    </>
  );
};

export default Layout;
