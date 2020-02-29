import { render } from "react-dom";
import React from "react";
import Root from "./../../app";

render(<Root />, document.getElementById("approot"));

if (module.hot) {
  module.hot.accept();
}