import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./static/auth.css";
import Logo from "./static/wittyflow-logo.png";
import { post } from "../../services/Transport";
import LaddaButton, { ZOOM_IN } from "react-ladda";
import * as Validator from "../../utilities/Validators";
import Alert from "../Generic/Alert";
import Loader from "../Generic/Loader";



class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      password_confirm: "",
      user_id: "",
      token:"",
      form_errors: {
        password_confirm: " ",
        password: " "
      },
      isLoggedIn: false,
      page_ready: false,
      signin_error: false,
      error_message: "",
      btnLoadingState: false,
      tokenExpired: false,
    };
  }

  componentDidMount(){
      const { user_id, token } = this.props.match.params;
      this.setState({ user_id, token });
      this.verifyToken(token, user_id);
      document.title = "Reset password - Wittyflow"
  }

  verifyToken = (token, user_id) =>{
      post('verify-password-reset-token',{ token, user_id }, null).then(res=>{
        this.setState({
          page_ready: true
        });
      }).catch(err=>{
        const { data } = err.response;
        if(data.code == "4000"){
          this.setState({
            error_message: data.message,
            tokenExpired: true,
            page_ready: true
          })
        }
      });
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let form_errors = this.state.form_errors;
    switch (name) {
      case "password":
        form_errors.password = value.length < 10 ? "Password must be 10 characters long!" : "";
        break;
      case "password_confirm":
        form_errors.password_confirm =
          value != this.state.password ? "Password must match" : "";
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
      this.setState({ btnLoadingState: true });
      post(
        "update-user-password",
        this.state,
        null,
        res => {
            if(res.data.code == "2010"){
                this.setState({ 
                  btnLoadingState: false, 
                  isLoggedIn: true,
                  page_ready: true
                 })
            }
        },
        err => {
            if(err.response.data.code == "4000"){
                this.setState({
                    signin_error: true,
                    btnLoadingState: false,
                    error_message: err.response.data.message,
                    password:"",
                    password_confirm:""
                })
            }
        }
      );
    }
  };


  render() {
    const formIsValid = Validator.validateForm(this.state.form_errors);
    const validForm = formIsValid ? true : false;
    const { 
      form_errors, 
      isLoggedIn,  
      error_message, 
      btnLoadingState,
      tokenExpired,
      page_ready
    } = this.state;
    if(isLoggedIn){
      return <Redirect  to="/auth/signin"/>
    }
    if(tokenExpired){
      return <Redirect to="/auth/token-expired" />
    }
    if(!page_ready){
      return (
        <div className="d-flex flex-column justify-content-center align-content-center">
            <Loader />
        </div>
      )
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
                      <img src={Logo} alt="logo" />
                    </div>
                    <h4>
                      Welcome back.{" "}
                      <small className="font-weight-light">
                      change your password now.
                      </small>{" "}
                    </h4>
                    {this.state.signin_error ? <Alert type="danger" message={error_message} />: (
                      ""
                    )}

                    <form className="pt-3" onSubmit={this.attempt_signin} method="POST">
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
                            placeholder="Confirm Password"
                            name="password_confirm"
                            onChange={this.handleChange}
                            value={this.state.password_confirm}
                            noValidate
                          />
                        </div>
                        {form_errors.password_confirm.length > 0 && (
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
                              {form_errors.password_confirm}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-3">
                        <LaddaButton
                          loading={btnLoadingState}
                          data-color="blue"
                          data-style={ ZOOM_IN }
                          data-spinner-size={30}
                          data-spinner-color="#ffffff"
                          data-spinner-lines={12}
                          className="ladda-button-primary"
                          disabled={!validForm}
                        >
                          RESET PASSWORD
                        </LaddaButton>
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

export default ResetPassword;
