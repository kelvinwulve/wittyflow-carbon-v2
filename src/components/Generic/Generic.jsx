import React, { Component } from "react";
import Alert from "./Alert";
import LaddaButton, { ZOOM_IN } from "react-ladda";
import Status from "./Status";
import Table from "./Table";
class Generic extends Component {
  render() {
    return (
      <div style={{ width: "500px", margin: "50px auto" }}>
        <h4>Alerts</h4>
        <Alert
          type="warning"
          message={[<strong>Sorry</strong>, " that didn't work. Try again."]}
        />
        <Alert
          type="danger"
          message={[<strong>Sorry</strong>, " that didn't work. Try again."]}
        />
        <Alert
          type="success"
          message={[<strong>Sorry</strong>, " that didn't work. Try again."]}
        />
        <h4>Buttons</h4>

        <LaddaButton
          loading="true"
          data-color="blue"
          // data-size={L}
          data-style={ZOOM_IN}
          data-spinner-size={30}
          data-spinner-color="#ffffff"
          data-spinner-lines={12}
          // onClick={}
          className="ladda-button-primary"
        >
          SIGN IN
        </LaddaButton>

        <Status status="error" />
        <Status status="success" />
        <Table />
      </div>
    );
  }
}

export default Generic;
