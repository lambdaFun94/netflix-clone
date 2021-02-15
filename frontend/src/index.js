import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "normalize.css";

import App from "./app";
import { GlobalStyles } from "./global-styles";
import store from "./redux/store";

render(
  <>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </>,
  document.getElementById("root")
);
