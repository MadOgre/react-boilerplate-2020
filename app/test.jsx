export default class Test extends React.Component {
  state = {
    val: 23
  };

  doThings = () => {
    const { val } = this.state;
    console.log(val);
  }

  render() {
    const { val } = this.state;
    return (
      <h1>
        Test:
        {val}
      </h1>
    );
  }
}
