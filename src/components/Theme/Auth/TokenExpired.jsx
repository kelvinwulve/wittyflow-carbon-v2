import React, { Component } from "react";
import "./static/auth.css";
import { Link } from "react-router-dom";
import Logo from "./static/wittyflow-logo.png";
import { saveUser } from './actions';
import { connect } from 'react-redux';
import Status from '../../Generic/Status';

class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      form_errors: {
        email: " ",
        password: " "
      },
      isLoggedIn: false,
      requiresVerification: false,
      signin_error: false,
      error_message: "",
      btnLoadingState: false,
      urlPath: "/v1/"
    };
  }


  componentDidMount() {
    document.title = "Token Expired - Wittyflow";
  }

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
                      <Link to="/">
                        <img src={Logo} alt="logo" />
                      </Link>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <Status status="failed" />
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <h2>Whoops!!</h2>
                        <p>Token has either expired or is invalid. </p>
                        <p>Try resending a new reset token.</p>

                        <Link className="btn btn-light" to="/auth/forgot-password">Resend Now</Link>
                    </div>
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


const mapDispatchToProps = dispatch =>{
  return {
    save: token => dispatch(saveUser(token)),
  }
}

export default connect(null, mapDispatchToProps)(Signin);
