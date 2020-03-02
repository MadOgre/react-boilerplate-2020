import { render } from "react-dom";
import Root from "../../app";

const user = {
  name: "Mike",
  last: "Semko",
  address: {
    street: "petrovsk",
    house: 4,
    apt: 61
  }
};

const { address: { street } } = user;

console.log(street);

render(React.createElement(Root), document.getElementById("approot"));

if (module.hot) {
  module.hot.accept();
}
