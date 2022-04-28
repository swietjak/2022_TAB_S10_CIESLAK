import { Provider } from "react-redux";
import { Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "config";
import { Loader } from "shared/components";
import { store } from "./App.store";
import { BrowserRouter } from "react-router-dom";
import { ModalRoutes } from "modules";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
            <div>Test Topbar</div>
            <ModalRoutes />
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
