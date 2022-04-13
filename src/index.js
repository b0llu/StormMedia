import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  AuthProvider,
  PostProvider,
  ReducerProvider,
  ThemeProvider,
  UserProvider,
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
          <UserProvider>
            <ThemeProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ThemeProvider>
          </UserProvider>
        </PostProvider>
      </ReducerProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
