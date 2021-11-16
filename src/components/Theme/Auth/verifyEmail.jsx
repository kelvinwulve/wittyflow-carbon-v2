import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./static/auth.css";
import Logo from "./static/wittyflow-logo.png";
import AnimatedCheckmark from "./static/check-animation.gif";
import Loader from '../../Generic/Loader';
import { post } from '../../../services/Transport';
import { Redirect } from 'react-router-dom';

class VerifyEmailPrompt extends Component {
  state = {
    page_ready: false,
    tokenExpired: false,
    user_id: "",
    token: ""
  };

  componentDidMount() {
    const { user_id, token } = this.props.match.params;
    this.setState({ user_id, token });
    this.verifyToken(token, user_id);
    document.title = "Email verifiied- Wittyflow"
  }

  verifyToken = (token, user_id) => {
    post('/verify-email', { token, user_id }, null).then(res => {
      this.setState({
        page_ready: true
      });
    }).catch(err => {
      this.setState({
        tokenExpired: true,
        page_ready: true
      })
    });
  }

  render() {
    const { email } = this.props.location.state || "";
    const { page_ready, tokenExpired } = this.state;
    if (!page_ready) {
      return (
        <div className="d-flex flex-column justify-content-center align-content-center">
          <Loader />
        </div>
      )
    }

    if (tokenExpired) {
      return <Redirect to={{
        pathname: '"/auth/verify-email-prompt"',
        state: {
          email
        }
      }} />
    }

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
                  <div className="auth-form-light text-left py-5 px-4 px-sm-5 ">
                    <img
                      src={AnimatedCheckmark}
                      alt=""
                      width="180"
                      className="mb-5"
                      style={{ marginLeft: "30px" }}
                    />

                    <h4>
                      Email Verified Successfully. &nbsp;
                      <small className="font-weight-light">
                        {/* -- replace the user's email with this */}
                        {email}
                      </small>{" "}
                      <p>Welcome to the best side.</p>
                      <Link className="btn btn-light" to="/auth/signin">
                        {" "}
                        Sign In Now{" "}
                      </Link>
                    </h4>
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
