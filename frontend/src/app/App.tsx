import { Provider } from "react-redux";
import { Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "config";
import { Loader } from "shared/components";
import { routes } from "modules";
import { store } from "./App.store";
import { BrowserRouter } from "react-router-dom";
import Hello from "modules/home/pages/Hello";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
            <Hello />
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
