import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./static/auth.css";
import Logo from "./static/wittyflow-logo.png";
import { post } from "../../services/Transport";
import LaddaButton, { ZOOM_IN } from "react-ladda";
import AuthRoute from "./withAuth";
import * as Validator from "../../Utilities/Validators";
import Auth from "./Auth";
import Alert from "../Generic/Alert";
import { connect } from 'react-redux';

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
      urlPath: "/en/"
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let form_errors = this.state.form_errors;
    switch (name) {
      case "email":
        form_errors.email = Validator.validEmailRegex.test(value)
          ? ""
          : "Please provide a valid email";
        break;
      case "password":
        form_errors.password =
          value.length < 10 ? "Password must be 10 characters long!" : "";
        break;
      default:
        break;
    }
    this.setState({ form_errors, [name]: value });
  };

  attempt_signin = event => {
    event.preventDefault();
    if (!Validator.validateForm(this.state.form_errors)) {
      console.error("Invalid Form");
    } else {
      this.setState({ btnLoadingState: true, signin_error: false });
      post("/signin", this.state, null).then(res => {
          if (res) {
            this.setState({ btnLoadingState: false });
            const {
              data: { status }
            } = res;
            if (status === "success") {
              this.setState({
                signin_error: false,
                email: "",
                password: ""
              });
              Auth.authenticate("Wittyflow_auth_jwt", res.data.data.token);
              this.setState({ isLoggedIn: true });
              const { urlPath } = this.state;
              return this.props.history.push(urlPath);
            }
          } else {
            this.setState({
              signin_error: true,
              error_message: "Invalid Email or Password",
              password: "",
              btnLoadingState: false
            });
          }
        })
        .catch(err => {
        //  console.log(err);
          if (err.response) {
            const { data, status } = err.response;
            if (data.code === "4030") {
              Auth.saveVerifyMail(this.state.email);
              this.setState({
                requiresVerification: true,
                isLoggedIn: true,
                btnLoadingState: false
              });
            } else if (status == 401) {
              this.setState({
                signin_error: true,
                password: "",
                error_message: data.message,
                btnLoadingState: false
              });
            }
          } else {
            this.setState({
              password: "",
              btnLoadingState: false
            });
          }
        });
    }
  };

  componentDidMount() {
    document.title = "Sign in - Wittyflow";
    const {
      history: {
        location: { state }
      }
    } = this.props;
    if (state != undefined) {
      //console.log(state.from.pathname);
      this.setState({ urlPath: state.from.pathname });
    }
  }

  componentWillMount(){

  }

  render() {
    const formIsValid = Validator.validateForm(this.state.form_errors);
    const validForm = formIsValid ? true : false;
    const {
      form_errors,
      isLoggedIn,
      requiresVerification,
      error_message,
      btnLoadingState
    } = this.state;
    if (isLoggedIn && requiresVerification) {
      return <Redirect to="/auth/verify-email-prompt" />;
    }

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
                    <h4>
                      Welcome back.{" "}
                      <small className="font-weight-light">
                        We're happy to see you.
                      </small>{" "}
                    </h4>
                    {this.state.signin_error ? (
                      <Alert type="danger" message={error_message} />
                    ) : (
                      ""
                    )}

                    <form
                      className="pt-3"
                      onSubmit={this.attempt_signin}
                      method="POST"
                    >
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend bg-transparent">
                            <span className="input-group-text bg-transparent border-right-0">
                              <i className="ti-email text-primary"></i>
                            </span>
                          </div>
                          <input
                            type="email"
                            className="form-control form-control-lg border-left-0"
                            placeholder="Email"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                            noValidate
                          />
                        </div>
                        {form_errors.email.length > 0 && (
                          <div className="form-error">
                            <span className="form-error-svg">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fill="#ED6347"
                                  stroke="none"
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-8h2V6H9v4zm0 4h2v-2H9v2z"
                                ></path>
                              </svg>
                            </span>
                            <span className="form-error-msg">
                              {form_errors.email}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend bg-transparent">
                            <span className="input-group-text bg-transparent border-right-0">
                              <i className="ti-lock text-primary"></i>
                            </span>
                          </div>
                          <input
                            type="password"
                            className="form-control form-control-lg border-left-0"
                            id="exampleInputPassword"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            noValidate
                          />
                        </div>
                        {form_errors.password.length > 0 && (
                          <div className="form-error">
                            <span className="form-error-svg">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fill="#ED6347"
                                  stroke="none"
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-8h2V6H9v4zm0 4h2v-2H9v2z"
                                ></path>
                              </svg>
                            </span>
                            <span className="form-error-msg">
                              {form_errors.password}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="my-2 d-flex justify-content-between align-items-center">
                        <div className="form-check"></div>
                        <Link
                          to="/auth/forgot-password"
                          className="auth-link text-black"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <div className="mt-3">
                        <LaddaButton
                          loading={btnLoadingState}
                          data-color="blue"
                          data-style={ZOOM_IN}
                          data-spinner-size={30}
                          data-spinner-color="#ffffff"
                          data-spinner-lines={12}
                          className="ladda-button-primary"
                          disabled={!validForm}
                        >
                          SIGN IN
                        </LaddaButton>
                      </div>

                      <div className="text-center mt-3 font-weight-light">
                        Don't have an account?{" "}
                        <Link to="/auth/signup" className="text-primary">
                          Sign Up For Free
                        </Link>
                      </div>
                    </form>
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

export default AuthRoute(withRouter(Signin));
