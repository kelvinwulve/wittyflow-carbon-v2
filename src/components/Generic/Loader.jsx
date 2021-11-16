import React, { Component } from "react";
// import { Modal } from 'bootstrap';
import "./modal.css";
// import ActivityIndicator from "react-activity-indicator/src/activityindicator";

class Loader extends Component {
  render() {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className="center">
          <div className="spinner">
            <div className="spinnerContainer active common">
              <div className="spinner-layer layer-1 common">
                <div className="circle-clipper left common">
                  <div
                    className="circle common"
                    style={{ borderWidth: "3px" }}
                  ></div>
                </div>
                <div className="gap-patch common">
                  <div
                    className="circle common"
                    style={{ borderWidth: "3px" }}
                  ></div>
                </div>
                <div className="circle-clipper right common">
                  <div
                    className="circle common"
                    style={{ borderWidth: "3px" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<h3>Hold on while we make everything possible for you</h3>*/}
      </div>
    );
  }
}

export default Loader;
