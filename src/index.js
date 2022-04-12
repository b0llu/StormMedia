import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  AuthProvider,
  PostProvider,
  ReducerProvider,
  ThemeProvider,
} from "Context";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ReducerProvider>
        <PostProvider>
          <ThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </PostProvider>
      </ReducerProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
