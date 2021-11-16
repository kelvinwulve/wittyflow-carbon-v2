import React, { Component } from "react";
import LaddaButton, { ZOOM_IN } from "react-ladda";
import "./static/auth.css";
import { Link, Redirect } from "react-router-dom";
import Logo from "./static/wittyflow-logo.png";
import Alert from "../../Generic/Alert";
import Auth from "../../Auth/Auth";
import * as Validator from "../../../Utilities/Validators";
import { post } from "../../../services/Transport";
import { connect } from "react-redux";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    phone: "",
    form_errors: {
      email: " ",
      password: " ",
      name: " ",
      phone: ""
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
      case "phone":
        form_errors.phone = Validator.validContact(value) ? "" : "Phone number should be 10 digits";
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
      const { name, email, password, phone } = this.state;
      const payload = {
        name,
        email,
        password,
        phone: phone.slice(-9)
      }
      post("signup", payload, null)
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
    if (this.props.user) {
      return <Redirect to="/v1/" />;
    }

    const formIsValid = Validator.validateForm(this.state.form_errors);
    const validForm = formIsValid ? true : false;
    const {
      form_errors,
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
                <div className="col-lg-5 mx-auto">
                  <div
                    className="auth-form-light text-left py-5 px-4 px-sm-5"
                    style={{ marginTop: "70px" }}
                  >
                    <div className="brand-logo">
                      <a href="https://wittyflow.com">
                        <img src={Logo} alt="logo" />
                      </a>
                    </div>
                    <h4>
                      Get started for free,
                      <small className="font-weight-light">
                        &nbsp;in just 30 seconds.
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
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
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
                                onChange={this.handleChange}
                                value={this.state.name}
                                noValidate
                              />
                            </div>
                            {form_errors.name.length > 0 && (
                              <div className="form-error">
                                <span className="form-error-msg">
                                  {form_errors.name}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
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
                                <span className="form-error-msg">
                                  {form_errors.email}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-xs-12 col-sm-12">
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
                                <span className="form-error-msg">
                                  {form_errors.password}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-xs-12 col-sm-12">
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-prepend bg-transparent">
                                <span className="input-group-text bg-transparent border-right-0">
                                  <i className="ti-mobile text-primary"></i>
                                </span>
                              </div>
                              <input
                                type="text"
                                className="form-control form-control-lg border-left-0"
                                placeholder="Phone Number"
                                name="phone"
                                onChange={this.handleChange}
                                value={this.state.phone}
                                noValidate
                                maxLength="10"
                              />
                            </div>
                            {form_errors.phone.length > 0 && (
                              <div className="form-error">
                                <span className="form-error-msg">
                                  {form_errors.phone}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div class="mb-4">
                        <label class="kt-checkbox kt-checkbox--bold kt-checkbox--default auth-link">
                          <input type="checkbox" /> I agree to all{" "}
                          <a
                            href="https://wittyflow.com/terms/"
                            target="_blank"
                          >
                            Terms &amp; Conditions
                          </a>
                          <span></span>
                        </label>
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
                          SIGN UP
                        </LaddaButton>
                      </div>

                      <div className="text-center mt-3 font-weight-light auth-link">
                        Already have an account?{" "}
                        <Link to="/auth/signin" className="text-primary ">
                          Sign In
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

const mapStateToProps = state => {
  return {
    ...state.auth
  };
};

export default connect(mapStateToProps)(Signup);
