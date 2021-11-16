import React, { Component } from "react";
import LaddaButton, { ZOOM_IN } from "react-ladda";
import "./static/auth.css";
import { Link, Redirect } from "react-router-dom";
import Logo from "./static/wittyflow-logo.png";
import Alert from '../../Generic/Alert';
import { post } from '../../../services/Transport';
import * as Validator from '../../../Utilities/Validators';
import Auth from '../../Auth/Auth';
import { saveUser } from './actions';
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
      urlPath: "/v1/"
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
      post("/signin", this.state, null).then(async res => {
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
            await this.props.save(res.data.data.token);
            this.setState({ isLoggedIn: true });
            window.location.href = this.state.urlPath
            // const { urlPath } = this.state;
            // return this.props.history.push(urlPath);
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
         // console.log(err);
          if (err.response) {
            const { data, status } = err.response;
            if (status === 403) {
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
      // console.log(state.from.pathname);
      // this.setState({ urlPath: state.from.pathname });
    }
  }

  render() {
    if (this.props.user) {
      return <Redirect to="/v1/" />
    }

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
                      <a href="https://wittyflow.com">
                        <img src={Logo} alt="logo" />
                      </a>
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

                      <div className="text-center mt-3 font-weight-light auth-link">
                        Don't have an account?{" "}
                        <Link to="/auth/signup" className="text-primary ">
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


const mapStateToProps = state => {
  return {
    ...state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: token => dispatch(saveUser(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
