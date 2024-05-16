import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router/index.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./utils/theme/index.jsx";
import store, { persistor } from "./store";
import "@fontsource-variable/albert-sans";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";

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
