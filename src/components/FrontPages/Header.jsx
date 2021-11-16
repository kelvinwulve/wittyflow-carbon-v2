import React, { Component } from "react";

// import "./static/css/style.css";
import Auth from "../Auth/Auth";
import { Link } from "react-router-dom";
import "./static/css/navbar.css";
import Logo from "./static/img/logo-light.png";

class Header extends Component {
  render() {
    const signin_or_dashboard = Auth.getAuth() ? (
      <li className="">
        <a href="/v1/" className="auth_btn">
          {" "}
          Go to Dashboard
        </a>
      </li>
    ) : (
      <>
        {" "}
        <li className="">
          <Link to="/auth/signup" className="auth_btn">
            {" "}
            Get Started for free
          </Link>{" "}
        </li>
      </>
    );

    const menu_arrow = {
      fontSize: "0.7em",
      marginLeft: "3px",
      marginTop: "-3px"
    };
    return (
      <>
        {/** start header Area **/}
        {/* <!--================Header Menu Area =================--> */}
        <header className="header_area">
          <div className="main_menu">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container">
                {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                <a className="navbar-brand logo_h" href="index.html">
                  <img src={Logo} width="130" alt="" />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                <div
                  className="collapse navbar-collapse offset"
                  id="navbarSupportedContent"
                >
                  <ul className="nav navbar-nav menu_nav ml-auto">
                    <li className="nav-item">
                      <a className="nav-link" href="price.html">
                        Pricing
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="price.html">
                        Developers
                      </a>
                    </li>
                    <li className="nav-item submenu dropdown">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Solutions
                        <i
                          className="ti-angle-down "
                          style={menu_arrow}
                        ></i>{" "}
                      </a>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <a className="nav-link" href="feature.html">
                            SMS Messaging
                          </a>
                          <div className="drop-detail">
                            <span>
                              Send business-critical SMS messages through our
                              API & Dashboard
                            </span>
                          </div>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="price.html">
                            Voice Calls
                          </a>
                          <div className="drop-detail">
                            <span>
                              Verify phone numbers and protect user accounts
                              with two-factor authentication
                            </span>
                          </div>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="element.html">
                            2-Factor Authentication
                          </a>
                          <div className="drop-detail">
                            <span>
                              Verify phone numbers and protect user accounts
                              with two-factor authentication
                            </span>
                          </div>
                        </li>
                      </ul>
                    </li>
                    {/* <li className="nav-item submenu dropdown">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Blog
                      </a>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <a className="nav-link" href="blog.html">
                            Blog
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="single-blog.html">
                            Blog Details
                          </a>
                        </li>
                      </ul>
                    </li>*/}
                    <li className="nav-item">
                      <a className="nav-link" href="contact.html">
                        Contact
                      </a>
                    </li>
                    <li className="nav-item" id="auth_btn_mobile">
                      <a className="nav-link" href="/v1/">
                        Go to Dashboard
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="right-button">
                  <ul>
                    {/* <li className="shop-icon"><a href="#"><i className="ti-shopping-cart-full"></i><span>0</span></a></li> */}
                    {/* <li><a className="sign_up" href="">Sign Up</a></li> */}
                    {signin_or_dashboard}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>

        {/* <!--================Header Menu Area =================--> */}
      </>
    );
  }
}

export default Header;
