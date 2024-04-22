import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/index.jsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "./utils/theme/index.jsx";
import "@mantine/core/styles.css";
import "@fontsource-variable/albert-sans";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router />
          </PersistGate>
        </Provider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
