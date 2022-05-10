import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "config";
import { ModalRoutes } from "modules";
import { Loader, Topbar } from "shared/components";
import { store } from "./App.store";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
            <Topbar />
            <ModalRoutes />
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
