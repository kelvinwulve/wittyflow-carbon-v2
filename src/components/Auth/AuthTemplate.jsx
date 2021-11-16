import React, { Component } from "react";
import $ from "jquery";
import Login from "./Login";

import Register from "./Register";
import "./static/auth.css";
import Logo from "./static/wittyflow-logo.png";

class AuthTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: props.match.params.page
    };
  }

  state = {};

  load_current_page = () => {
    if (this.state.current_page === "login") return <Login />;
    if (this.state.current_page === "register") return <Register />;
  };

  render() {
    return (
      <>
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="content-wrapper d-flex align-items-center auth px-0">
              <div className="row w-100 mx-0">
                <div className="col-lg-4 mx-auto">
                  <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                    <div className="brand-logo">
                      <img src={Logo} alt="logo" />
                    </div>

                    {this.load_current_page()}
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

export default AuthTemplate;
