import React, { Component } from "react";
import "./static/auth.css";
import { Link, withRouter } from "react-router-dom";
import Logo from "./static/wittyflow-logo.png";
import AnimatedEnvelope from './static/animated-envelope.gif';
import { post } from '../../../services/Transport';
import { connect } from 'react-redux';
import Loader from '../../Generic/Loader';
import Alert from '../../Generic/Alert';
import Auth from '../../Auth/Auth';

class VerifyEmailPrompt extends Component {
  state = { 
    email: "", 
    loading: false, 
    alreadyVerified: false, 
    error:"",
    from: ""
   };

  resendMail = e =>{
    e.preventDefault();
    this.setState({ loading: true })
    const { email } = this.state;
    const url = this.state.from ? 'send-password-reset-email': 'resend-verification-email';
    post(url,{ email },null)
    .then(res=>{
        const { data } = res;
        if(data.status == "success"){
          this.setState({ loading: false })
        }
      }).catch(error=>{
          if(error.response){
            const { data } = error.response;
            if(data.code == "4090"){
              this.setState({ 
                loading: false, 
                alreadyVerified: true,
                error: data.message
               })
            }
          }
        });
  }

  componentDidMount() {
    document.title = "Verify email - Wittyflow"
    // console.log(Auth.retrieveVerifyMail());
    const { history: { location: { state } } } = this.props;
    if(state != undefined){
      //console.log(state.from.pathname)
      this.setState({ email: this.props.location.state.email || Auth.retrieveVerifyMail() });
      this.setState({ from: state.from.pathname });
    }
  }


  render() {
    // const  email  = Auth.retrieveVerifyMail();
    const { loading, email, alreadyVerified, error } = this.state;
    if(loading){
      return <Loader isOpen={true} />
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
                    <div className="">
                    <img
                      src={AnimatedEnvelope}
                      alt=""
                      width="180"
                      className="mb-5"
                      style={{ marginLeft: "30px" }}
                    />

                    <h4>
                      We've sent a verification mail to &nbsp;
                      <small className="font-weight-light">
                        {/* -- replace the user's email with this */}
                        { this.state.email }
                      </small>{" "}
                      <p>Check and verify your email to continue.</p>
                      {!alreadyVerified&&<p>
                        {" "}
                        Didn't get verification mail ?{" "}
                        <a onClick={this.resendMail} className="text-primary text-link">
                          {" "}
                          Resend.{" "}
                        </a>
                      </p>}
                      {alreadyVerified&&<Alert type="warning" message={error} />}
                    </h4>
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


const mapStateToProps = (state) =>{
  const { auth: { email } } = state;
  return { email }
}

const EmailComponent = connect(mapStateToProps)(VerifyEmailPrompt);

export default withRouter(EmailComponent);
