import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import "./static/auth.css";
import Logo from "./static/wittyflow-logo.png";
import AnimatedCheckmark from "./static/check-animation.gif";
import Loader from '../Generic/Loader';
import { post } from "../../services/Transport";
import { toast } from "react-toastify";
import Status from "../Generic/Status";

class VerifyEmailPrompt extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            page_ready: false,
            tokenExpired: false,
            message: ""
        }
    }

  componentDidMount(){
    document.title = "Confirm Email Change - Wittyflow";
    const { user_id, email_token, new_email } = this.props.match.params;
    post('/profile/email/change',{
        user_id,
        new_email,
        email_token
    })
    .then(res =>{
        // alert(JSON.stringify(res));
        this.setState({ 
            page_ready: true,
            new_email:""
         })
    })
    .catch(err =>{
        // toast.error(err.response.data.message);
        this.setState({
            page_ready: true,
            tokenExpired: true,
            new_email,
            message:err.response.data.message
        });
    })

  }

  render() {
    const { email } = this.props.location.state || "";
    const { page_ready, tokenExpired}  = this.state;

    if(!page_ready){
        return (
          <div className="d-flex flex-column justify-content-center align-content-center">
              <Loader />
          </div>
        )
    }

    // if(tokenExpired){
    //     return <Redirect to="/auth/token-expired" />
    // }

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
                    {!tokenExpired&&<img
                      src={AnimatedCheckmark}
                      alt=""
                      width="180"
                      className="mb-5"
                      style={{ marginLeft: "30px" }}
                    />}
                    {tokenExpired&&<Status status="error" />}
                    <h4>
                     {tokenExpired? "Email Verified Unsuccessful." : "Email Verified Successfully."} &nbsp;
                      <small className="font-weight-light">
                        {/* -- replace the user's email with this */}
                        {this.state.new_email}
                      </small>{" "}
                      {!tokenExpired&&<p>{this.state.message}</p>}
                      {tokenExpired&&<p>{this.state.message}</p>}
                      {!tokenExpired&&<Link className="btn btn-light" to="/auth/signin">
                        {" "}
                        Sign In Now{" "}
                      </Link>}
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
