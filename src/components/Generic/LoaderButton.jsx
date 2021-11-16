import React, { Component } from "react";
import LaddaButton, {
  XS,
  S,
  L,
  XL,
  SLIDE_UP,
  ZOOM_IN,
  EXPAND_LEFT
} from "react-ladda";

class LoaderButton extends Component {
  constructor(props) {
    super(props);
  }
  toggle = () => {
    this.setState({
      loading: !this.state.loading,
      progress: 0.5
    });
  };
  state = { loading: false };
  render() {
    return (
      <LaddaButton
        loading={this.props.btnLoadingState}
        data-color="blue"
        // data-size={L}
        data-style={this.props.btnAnimation}
        data-spinner-size={30}
        data-spinner-color="#ffffff"
        data-spinner-lines={12}
        onClick={this.toggle}
      >
        Click Here!
      </LaddaButton>
    );
  }
}

export default LoaderButton;
