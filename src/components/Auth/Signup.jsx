import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./static/auth.css";
import Logo from "./static/wittyflow-logo.png";
import AuthRoute from "./withAuth";
import LaddaButton, { ZOOM_IN } from "react-ladda";
import * as Validator from "../../utilities/Validators";
import Auth from "./Auth";
import { post } from "../../services/Transport";
import Alert from "../Generic/Alert";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    form_errors: {
      email: " ",
      password: " ",
      name: " "
    },
    error_message: "",
    btnLoadingState: false,
    signup_error: false,
    isSignUpSuccessful: false
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    let form_errors = this.state.form_errors;
    switch (name) {
      case "name":
        form_errors.name =
          value.length < 5 ? "Full Name must be 5 characters long!" : "";
        break;
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
  };

  componentDidMount() {
    document.title = "Sign Up - Wittyflow";
  }

  handleSubmit = e => {
    e.preventDefault();
    const valid = Validator.validateForm(this.state.form_errors);
    if (!valid) {
    } else {
      this.setState({ btnLoadingState: true, signup_error: false });
      post("signup", this.state, null)
        .then(res => {
          if (res) {
            if (res.data.status === "success") {
              Auth.saveVerifyMail(this.state.email);
              this.setState({
                signup_error: false,
                isSignUpSuccessful: true,
                email: "",
                password: ""
              });
            }
          } else {
            this.setState({
              signup_error: true,
              password: "",
              error_message: res.data.message,
              btnLoadingState: false
            });
          }
        })
        .catch(err => {
          console.log(err);
          if (err.response) {
            const { data } = err.response;
            if (data.code == "4090") {
              this.setState({
                signup_error: true,
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

  render() {
    const formIsValid = Validator.validateForm(this.state.form_errors);
    const validForm = formIsValid ? true : false;
    const {
      form_errors,
      name,
      email,
      password,
      error_message,
      isSignUpSuccessful
    } = this.state;
    if (isSignUpSuccessful) {
      return <Redirect to="/auth/verify-email-prompt" />;
    }
    return (
      <>
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="content-wrapper d-flex align-items-center auth px-0">
              <div className="row w-100 mx-0">
                <div className="col-lg-4 mx-auto">
                  <div
                    className="auth-form-light text-left py-5 px-4 px-sm-5"
                    style={{ marginTop: "80px" }}
                  >
                    <div className="brand-logo">
                      <Link to="/">
                        <img src={Logo} alt="logo" />
                      </Link>
                    </div>
                    <h4>
                      Get started for free{" "}
                      <small className="font-weight-light">
                        in just 30 secs.
                      </small>{" "}
                    </h4>

                    {this.state.signup_error ? (
                      <Alert type="danger" message={error_message} />
                    ) : (
                      ""
                    )}
                    <form
                      className="pt-3"
                      id="signupForm"
                      onSubmit={this.handleSubmit}
                      method="POST"
                    >
                      <div className="form-group">
                        <div className="form-error-msg"></div>
                        <div className="input-group">
                          <div className="input-group-prepend bg-transparent">
                            <span className="input-group-text bg-transparent border-right-0">
                              <i className="ti-user text-primary"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-lg border-left-0"
                            placeholder="Full Name"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                          />
                        </div>
                        {form_errors.name.length > 0 && (
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
                              {form_errors.name}
                            </span>
                          </div>
                        )}
                      </div>
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
                            value={email}
                            onChange={this.handleChange}
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
                              <i className="ti-email text-primary"></i>
                            </span>
                          </div>
                          <input
                            type="email"
                            className="form-control form-control-lg border-left-0"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
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
                            value={password}
                            onChange={this.handleChange}
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
                      <div className="mb-4">
                        <div className="form-check">
                          <label className="form-check-label text-muted">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                            I agree to all Terms &amp; Conditions
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </div>
                      <div className="mt-3">
                        <LaddaButton
                          loading={this.state.btnLoadingState}
                          data-color="blue"
                          data-style={ZOOM_IN}
                          data-spinner-size={30}
                          data-spinner-color="#ffffff"
                          data-spinner-lines={12}
                          onClick={this.attempt_signin}
                          className="ladda-button-primary"
                          disabled={!validForm}
                        >
                          Sign Up
                        </LaddaButton>
                      </div>
                      <div className="text-center mt-4 font-weight-light">
                        Already have an account?{" "}
                        <Link to="/auth/signin" className="text-primary">
                          Sign in
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

export default AuthRoute(Signup);
