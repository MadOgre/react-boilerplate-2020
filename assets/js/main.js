import Test2 from "./test";
import "./test.module.scss";
const test = async () => {
  return await 2;
};

import tieDefender from "../img/tie_defender.png";

test().then(value => console.log(value));

console.log("this works2");

const obj = {
  a: 32,
  b: 46
};

const obj2 = {
  ...obj,
  b: 999,
  c: "hello"
};

console.table(obj2);

function decorator() {
  return function(cl) {
    return class extends cl {
      y = 66;
      func2() {
        return `${this.a} ${this.y}`;
      }
    };
  };
}

@decorator()
class Test {
  a = 34;
  func() {
    return this.a;
  }
}

const t = new Test();

console.log(t.func());
console.log(t.func2());

const tt2 = new Test2;

tt2.foo();

<div></div>;

if (module.hot) {
  module.hot.accept();
}