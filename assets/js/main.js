import { render } from "react-dom";
import Root from "./../../app";

render(<Root />, document.getElementById("approot"));

if (module.hot) {
  module.hot.accept();
}