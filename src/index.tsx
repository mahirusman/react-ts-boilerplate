import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./General/ErrorBoundary/Index";

ReactDOM.render(
  <ErrorBoundary>
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  </ErrorBoundary>,
  document.getElementById("root")
);

export { axios as ApiClient };
// exporting axios to use it in base service
