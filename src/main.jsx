import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/index.jsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "./utils/theme/index.jsx";
import "@mantine/core/styles.css";

import { Provider } from "react-redux";
import store from "./store/index.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <Provider store={store}>
          <Router />
        </Provider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
