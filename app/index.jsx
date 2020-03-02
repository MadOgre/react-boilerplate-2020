import Test from "@approot/app/test";
import rootStyles from "./test.module.scss";

const Root = () => (
  <div className={rootStyles.bluetext}>
    React works
    <img src="../assets/img/tie_defender.png" alt="" />
    <Test />
  </div>
);

export default Root;
