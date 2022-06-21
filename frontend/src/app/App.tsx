import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { theme } from "config";
import { Layout, Loader } from "shared/components";
import { store } from "./App.store";
import { LocalizationProvider } from "@mui/x-date-pickers";

const App = () => {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<Loader />}>
            <BrowserRouter>
              <Layout />
            </BrowserRouter>
          </Suspense>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
};

export default App;
