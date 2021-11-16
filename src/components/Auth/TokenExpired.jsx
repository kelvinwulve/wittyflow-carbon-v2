import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./static/auth.css";
import Logo from "./static/wittyflow-logo.png";
import AnimatedCheckmark from "./static/check-animation.gif";
import Status from "../Generic/Status";

class VerifyEmailPrompt extends Component {
  state = {};

  componentDidMount(){
    document.title = "Token Expired - Wittyflow"
  }

  render() {
    const { email } = this.props.location.state || "";
    return (
      <>
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="content-wrapper d-flex align-items-center auth px-0">
              <div className="row w-100 mx-0">
                <div className="col-lg-4 mx-auto">
                  <div className="brand-logo">
                    <img src={Logo} alt="logo" />
                  </div>
                  <div className="auth-form-light text-center py-5 px-4 px-sm-5 ">
                    {/* <img
                      src={AnimatedCheckmark}
                      alt=""
                      width="180"
                      className="mb-5"
                      style={{ marginLeft: "30px" }}
                    /> */}
                    <Status status="error" />
                    <h4 className="mt-2">
                      <strong> Whoops!! </strong>
                    </h4>
                    <p> Token has either expired or is invalid. &nbsp; </p>

                    <p>Try resending a new reset token.</p>

                    <Link className="btn btn-light" to="/auth/forgot-password">
                      {" "}
                      Resend Now{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(VerifyEmailPrompt);
