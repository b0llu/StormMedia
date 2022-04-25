import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "Context";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";

// Call make Server
makeServer();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
