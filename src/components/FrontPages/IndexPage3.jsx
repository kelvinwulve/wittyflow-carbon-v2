import React, { Component } from "react";
import { Link } from "react-router-dom";

import sms_sample from "./static/img/sms-sample.png";
import "./static/css/bubble.css";
import $ from "jquery";

class IndexPage extends Component {
  componentDidMount() {
    document.title =
      "Wittyflow - Cloud Communication APIs for SMS Messaging, Voice Calls,Two-factor Authentication &amp; Payments";
  }
  componentWillMount() {
    var loadjs = require("loadjs");

    //this styles the select boxes
    loadjs("/external/js/sms-hero.js");
  }

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="container ">
            <div className="row hero-box">
              <div className="desc col-xs-12 col-sm-12 col-md-7 d-block">
                <h1 className="">
                  <span>
                    Engage your customers straight into their pockets.
                  </span>
                </h1>

                <h2 className="General__SubTitle-h8v8uz-2 General__HeroSubTitle-h8v8uz-3 eWSHEm">
                  <span>
                    One API for SMS Messaging, Voice Calls, two-factor
                    authentication and payments.
                  </span>
                </h2>

                <div className="col-12 no-padding">
                  <div className="row">
                    <Link
                      to="/auth/signup"
                      className="btn btn-primary mr-3 mb-3 col-md-4 col-sm-6 col-xs-6"
                    >
                      <span>Try it for Free</span>
                    </Link>
                    <a
                      href=""
                      className="btn btn-outline-dark mb-3 col-md-4 col-sm-6 col-xs-6"
                    >
                      <span>Talk to our Experts</span>
                    </a>
                  </div>
                </div>

                <span className="">
                  <span>Get free test credits. </span>
                  <span> No credit card required</span>
                </span>
              </div>

              <div className="col-md-1"></div>
              <div className="col-md-4 col-xs-12 col-sm-12 img hidden-sm-block hidden-xs-block  ">
                <div className="row bubble-margins">
                  <div className="col-md-7">
                    <div
                      className="smsbubbles__item js-smsbubble smsbubbles__item--3"
                      data-index="3"
                    >
                      <div
                        className="smsbubbles__insides js-smsbubble-insides smsbubbles__insides--revealed thesms"
                        id="bubble1"
                      >
                        <div className="smsbubbles__top">
                          <span className="smsbubbles__bold">SMS</span>
                          <span className="smsbubbles__light">Just now</span>
                        </div>
                        <div className="smsbubbles__content">
                          Your package is here!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row bubble-margins">
                  <div className="col-md-7">
                    <div
                      className="smsbubbles__item js-smsbubble smsbubbles__item--3"
                      data-index="3"
                    >
                      <div
                        className="smsbubbles__insides js-smsbubble-insides smsbubbles__insides--revealed thesms"
                        id="bubble2"
                      >
                        <div className="smsbubbles__top">
                          <span className="smsbubbles__bold">SMS</span>
                          <span className="smsbubbles__light">Just now</span>
                        </div>
                        <div className="smsbubbles__content">
                          Your taxi has arrived!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row bubble-margins">
                  <div className="col-md-7">
                    <div
                      className="smsbubbles__item js-smsbubble smsbubbles__item--3"
                      data-index="3"
                    >
                      <div
                        className="smsbubbles__insides js-smsbubble-insides smsbubbles__insides--revealed thesms"
                        id="bubble3"
                      >
                        <div className="smsbubbles__top">
                          <span className="smsbubbles__bold">SMS</span>
                          <span className="smsbubbles__light">Just now</span>
                        </div>
                        <div className="smsbubbles__content">
                          Your PIN code is 4912. It <br /> expires in 5 minutes.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row bubble-margins">
                  <div className="col-md-7">
                    <div
                      className="smsbubbles__item js-smsbubble smsbubbles__item--3"
                      data-index="3"
                    >
                      <div
                        className="smsbubbles__insides js-smsbubble-insides smsbubbles__insides--revealed thesms"
                        id="bubble4"
                      >
                        <div className="smsbubbles__top">
                          <span className="smsbubbles__bold">SMS</span>
                          <span className="smsbubbles__light">Just now</span>
                        </div>
                        <div className="smsbubbles__content">
                          Your credit card has expired. <br /> We've mailed you
                          a new one!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row bubble-margins">
                  <div className="col-md-7">
                    <div
                      className="smsbubbles__item js-smsbubble smsbubbles__item--3"
                      data-index="5"
                    >
                      <div
                        className="smsbubbles__insides js-smsbubble-insides smsbubbles__insides--revealed thesms"
                        id="bubble5"
                      >
                        <div className="smsbubbles__top">
                          <span className="smsbubbles__bold">SMS</span>
                          <span className="smsbubbles__light">Just now</span>
                        </div>
                        <div className="smsbubbles__content">
                          Season sale starts today! <br /> Everything 50% off!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid section-2">
          <div className="container ">
            <div className="skewer">
              <div className="row ">
                <div className="col-12 products-box">
                  <h3 className="General__SectionTag-h8v8uz-10 kImIJk">
                    <span>Our platform</span>
                  </h3>
                  <h2 className="General__SectionTitle-h8v8uz-11 sc-fOKMvo kTFSLk">
                    <span>
                      Engage customers on their preferred channels using a
                      single platform.
                    </span>
                  </h2>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6 col-sm-12 col-xs-12 pdct-bx mb-3">
                  <a href="sms">
                    <div className="pbox">
                      <img
                        src="static/img/icon-sms.svg"
                        alt=""
                        className="pimg"
                      />
                      <div>
                        <h5 className="">
                          <span>Programmable SMS</span>
                        </h5>
                        <span className="pdesc">
                          <span>
                            Reach any phone, anywhere, with our fast and
                            powerful APIs and global carrier network.
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12 pdct-bx mb-2">
                  <a href="sms">
                    <div className="pbox">
                      <img
                        src="static/img/icon-voice.svg"
                        alt=""
                        className="pimg"
                      />
                      <div>
                        <h5 className="">
                          <span>Programmable Voice</span>
                        </h5>
                        <span className="pdesc">
                          <span>
                            Reach Millions of people via voice in any language
                            of your choice.
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12 pdct-bx mb-3">
                  <a href="sms">
                    <div className="pbox">
                      <img
                        src="static/img/icon-email.svg"
                        alt=""
                        className="pimg"
                      />
                      <div>
                        <h5 className="">
                          <span>Programmable Email</span>
                        </h5>
                        <span className="pdesc">
                          <span>
                            Cut thorugh the noise and spam filters with our high
                            deliverability APIs.
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-6  col-sm-12 col-xs-12 pdct-bx">
                  <a href="sms">
                    <div className="pbox">
                      <img
                        src="static/img/icon-verify.svg"
                        alt=""
                        className="pimg"
                      />
                      <div>
                        <h5 className="">
                          <span>2-Factor authentication</span>
                        </h5>
                        <span className="pdesc">
                          <span>
                            Prevent Bots and Spam Accounts with our highly
                            secure Verification API.
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="container ">
            <div className="row code-section">
              <div className="col-md-6 col-xs-12 col-sm-12 col-lg-6 integrate-easily-box">
                <div className="">
                  <h2 className="">
                    <span>Integrate in minutes</span>
                  </h2>
                  <p className="">
                    <span>
                      A few lines of code that scale with startups to the
                      Fortune 500.
                    </span>
                  </p>
                  <ul className="">
                    <li className="">
                      <span>Extensive API documentation</span>
                    </li>
                    <li className="">
                      <span>Libraries for popular languages</span>
                    </li>
                    <li className="">
                      <span>Intuitive, easy-to-use tutorials</span>
                    </li>
                  </ul>
                  <div className="">
                    <a href="" className="">
                      <span>Explore documentation</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xs-12 col-sm-12 col-lg-6 code-smaple-box">
                <img
                  alt="Wittyflow hero image"
                  src={sms_sample}
                  className=""
                  width="600px"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid ">
          <div className="container ">
            <div className="skewer">
              <div className="row ">
                <div className="col-12 products-box">
                  <h3 className="General__SectionTag-h8v8uz-10 kImIJk">
                    <span>WHY WITTYFLOW</span>
                  </h3>
                  <h2 className="General__SectionTitle-h8v8uz-11 sc-fOKMvo kTFSLk">
                    <span>Trusted by over 7,000 businesses in Africa.</span>{" "}
                    <br />
                    <small className="text-muted">
                      {" "}
                      You should be the next..{" "}
                    </small>
                  </h2>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-md-4 col-xs-6 col-sm-6 col-lg-4 mb-5">
                  <div
                    width="1,0.5,0.3333333333333333"
                    className="sc-bdVaJa sc-kUaPvJ lfEhzY"
                  >
                    <div className="why-box">
                      <div width="24" className="why-img">
                        <img alt="" src="static/img/coverage.svg" />
                      </div>
                      <h5 className="why-title">
                        <span>Worldwide Delivery</span>
                      </h5>
                    </div>
                    <span className="General__Text-h8v8uz-19 gBFacf">
                      <span>
                        Improve your global delivery rates through our local
                        operator connections.
                      </span>
                    </span>
                  </div>
                </div>

                <div className="col-md-4 col-xs-6 col-sm-6 col-lg-4 mb-5">
                  <div
                    width="1,0.5,0.3333333333333333"
                    className="sc-bdVaJa sc-kUaPvJ lfEhzY"
                  >
                    <div className="why-box">
                      <div width="24" className="why-img">
                        <img alt="" src="static/img/reliability.svg" />
                      </div>
                      <h5 className="why-title">
                        <span>Multi-Channel Support</span>
                      </h5>
                    </div>
                    <span className="General__Text-h8v8uz-19 gBFacf">
                      <span>
                        SMS isn't enough? Reach your customers in any language
                        on our robust Voice API.
                      </span>
                    </span>
                  </div>
                </div>

                <div className="col-md-4 col-xs-6 col-sm-6 col-lg-4 mb-5">
                  <div
                    width="1,0.5,0.3333333333333333"
                    className="sc-bdVaJa sc-kUaPvJ lfEhzY"
                  >
                    <div className="why-box">
                      <div width="24" className="why-img">
                        <img alt="" src="static/img/compliance.svg" />
                      </div>
                      <h5 className="why-title">
                        <span>Regulatory compliance</span>
                      </h5>
                    </div>
                    <span className="General__Text-h8v8uz-19 gBFacf">
                      <span>
                        We help you comply with all applicable laws and
                        regulations, including GDPR.
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="row mb-30">
                <div className="col-md-4 col-xs-6 col-sm-6 col-lg-4 mb-5">
                  <div
                    width="1,0.5,0.3333333333333333"
                    className="sc-bdVaJa sc-kUaPvJ lfEhzY"
                  >
                    <div className="why-box">
                      <div width="24" className="why-img">
                        <img alt="" src="static/img/security.svg" />
                      </div>
                      <h5 className="why-title">
                        <span>Security first</span>
                      </h5>
                    </div>
                    <span className="General__Text-h8v8uz-19 gBFacf">
                      <span>
                        Receive enterprise-grade security for your products, as
                        a default.{" "}
                        <a href="#">
                          <span>Learn more</span>
                        </a>
                        .
                      </span>
                    </span>
                  </div>
                </div>

                <div className="col-md-4 col-xs-6 col-sm-6 col-lg-4 mb-5">
                  <div
                    width="1,0.5,0.3333333333333333"
                    className="sc-bdVaJa sc-kUaPvJ lfEhzY"
                  >
                    <div className="why-box">
                      <div width="24" className="why-img">
                        <img alt="" src="static/img/support.svg" />
                      </div>
                      <h5 className="why-title">
                        <span>World class support</span>
                      </h5>
                    </div>
                    <span className="General__Text-h8v8uz-19 gBFacf">
                      <span>
                        24/7 support for you and your team via Email, Calls &
                        Whatsapp.
                      </span>
                    </span>
                  </div>
                </div>
                <div className="col-md-4 col-xs-6 col-sm-6 col-lg-4 mb-5">
                  <div
                    width="1,0.5,0.3333333333333333"
                    className="sc-bdVaJa sc-kUaPvJ lfEhzY"
                  >
                    <div className="why-box">
                      <div width="24" className="why-img">
                        <img alt="" src="static/img/pricing.svg" />
                      </div>
                      <h5 className="why-title">
                        <span>Fair pricing practices</span>
                      </h5>
                    </div>
                    <span className="General__Text-h8v8uz-19 gBFacf">
                      <span>
                        The more you send, the less you pay.{" "}
                        <a href="#">
                          <span>Contact our sales team</span>
                        </a>{" "}
                        for a custom plan.
                      </span>
                    </span>
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

export default IndexPage;
