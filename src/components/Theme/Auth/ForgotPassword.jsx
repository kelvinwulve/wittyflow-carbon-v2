import React, { Component } from "react";
import LaddaButton, { ZOOM_IN } from "react-ladda";
import "./static/auth.css";
import { Link,Redirect } from "react-router-dom";
import Logo from "./static/wittyflow-logo.png";
import Auth from "../../Auth/Auth";
import * as Validator from "../../../Utilities/Validators";
import { post } from "../../../services/Transport";
import { connect } from "react-redux";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      btnLoadingState: false,
      form_errors: {
        email: " "
      },
      password_sent: false
    };
  }

  componentDidMount() {
    document.title = "Forgot password - Wittyflow";
  }

  handleChange = e => {
    const { value, name } = e.target;
    let form_errors = this.state.form_errors;

    switch (name) {
      case "email":
        form_errors.email = Validator.validEmailRegex.test(value)
          ? ""
          : "Please provide a valid email";
        break;
      default:
        break;
    }

    this.setState({ form_errors, [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    this.setState({ btnLoadingState: true });
    post("send-password-reset-email", { email }, null)
      .then(res => {
        // alert(JSON.stringify(res));
        if (res) {
         // console.log(res.data);
          // this.props.saveEmail(email);
          Auth.saveVerifyMail(email);
          this.setState({ btnLoadingState: false, password_sent: true });
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.code == "2010") {
            return this.setState({
              btnLoadingState: false,
              password_sent: false
            });
          }
        }
        this.setState({ btnLoadingState: false });
      });
  };

  render() {

    if(this.props.user){
      return <Redirect to="/v1/" />
    }
    const formIsValid = Validator.validateForm(this.state.form_errors);

    // console.log(formIsValid);

    const validForm = !!formIsValid;
    const { form_errors, password_sent } = this.state;

    if (password_sent) {
      return (
        <Redirect
          to={{
            pathname: "/auth/verify-email-prompt",
            state: { from: this.props.location }
          }}
        />
      );
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
                      Let's Help You,&nbsp;
                      <small className="font-weight-light">
                        recover your lost password.
                      </small>{" "}
                    </h4>

                    <form
                      className="pt-3"
                      method="POST"
                      onSubmit={this.handleSubmit}
                    >
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend bg-transparent">
                            <span className="input-group-text bg-transparent border-right-0">
                              <i className="ti-email text-primary"/>
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

                      <div className="mt-3">
                        <LaddaButton
                          loading={this.state.btnLoadingState}
                          data-color="blue"
                          data-style={ZOOM_IN}
                          data-spinner-size={30}
                          data-spinner-color="#ffffff"
                          data-spinner-lines={12}
                          className="ladda-button-primary"
                          disabled={!validForm}
                        >
                          RESET PASSWORD
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


const mapStateToProps = state =>{
  return {
    ...state.auth
  }
}

export default connect(mapStateToProps)(ForgotPassword);
