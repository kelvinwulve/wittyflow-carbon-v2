import React from 'react';
import Logo from "./static/wittyflow-logo.png";
import AnimatedCheckmark from "./static/check-animation.gif";
import { Link } from 'react-router-dom';

const VerifyPhone = () => {

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
};


export default VerifyPhone;