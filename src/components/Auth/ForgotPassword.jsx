import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./static/auth.css";
import Logo from "./static/wittyflow-logo.png";
import LaddaButton, { ZOOM_IN } from "react-ladda";
import * as Validator from "../../utilities/Validators";
import { post } from "../../services/Transport";
import Auth from "./Auth";
import { connect } from "react-redux";
import { saveEmail } from "../Auth/actions/authActions";

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
          console.log(res.data);
          this.props.saveEmail(email);
          Auth.saveVerifyMail(email);
          this.setState({ btnLoadingState: false, password_sent: true });
        }
      })
      .catch(err => {
        alert(JSON.stringify(err));
        // //   console.table(err.response);
        //   if (err.response.code == "2010") {
        //     return this.setState({
        //       btnLoadingState: false,
        //       password_sent: false
        //     });
        //   }
        //   this.setState({ btnLoadingState: false });
      });
  };

  render() {
    const formIsValid = Validator.validateForm(this.state.form_errors);

    // console.log(formIsValid);

    const validForm = formIsValid ? true : false;
    const { email, btnLoadingState, form_errors, password_sent } = this.state;

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
                      Let's Help You,{" "}
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

                      <div className="mt-3">
                        <LaddaButton
                          loading={btnLoadingState}
                          data-color="blue"
                          // data-size={L}
                          data-style={ZOOM_IN}
                          data-spinner-size={30}
                          data-spinner-color="#ffffff"
                          data-spinner-lines={12}
                          // onClick={}
                          className="ladda-button-primary"
                          disabled={!validForm}
                        >
                          RESET PASSWORD
                        </LaddaButton>
                      </div>

                      <div className="text-center mt-3 font-weight-light">
                        Don't have an account?{" "}
                        <Link to="/auth/signup" className="text-primary">
                          Sign Up For Free
                        </Link>
                      </div>
                      <div className="text-center mt-3 font-weight-light">
                        Already got an account?{" "}
                        <Link to="/auth/signin" className="text-primary">
                          Sign In Here
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

const mapDispatchToProps = dispatch => {
  return {
    saveEmail: email => dispatch(saveEmail(email))
  };
};

export default connect(null, mapDispatchToProps)(ForgotPassword);
