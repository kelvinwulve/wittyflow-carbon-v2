import React, { Component } from "react";
import { Helmet } from "react-helmet";

class IndexPage extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>
            Wittyflow - Cloud Communications & Bulk SMS, SMS API in Ghana
          </title>
        </Helmet>

        {/**================Home Banner Area =================**/}
        <section class="home_banner_area">
          <div class="banner_inner d-flex align-items-center">
            <div class="overlay"></div>
            <div class="container">
              <div class="row">
                {/* <div class="col-lg-7 offset-lg-5 col-xl-6 offset-xl-6"> */}
                <div class="col-lg-7 col-xl-6">
                  <div class="banner_content">
                    <h3 style={{ textShadow: "2px 2px 1px #333333" }}>
                      SMS Messaging has
                      <br />
                      never been this Easier.
                    </h3>
                    <p
                      style={{
                        textShadow: "1px 1px 1px #666666",
                        fontSize: "2em"
                      }}
                    >
                      One Simple Dashboard &amp; API for SMS Messaging.
                    </p>
                    <a class="banner_btn" href="/auth/signup">
                      Get Started For Free<i class="ti-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/**================End Home Banner Area =================**/}

        {/**================Service  Area =================**/}
        <section class="service-area area-padding">
          <div class="container">
            <div className="row">
              <div className="col-12 section-header">
                <h4 style={{ color: "#1d1d1d", fontSize: "3em" }}>
                  Our Solutions
                </h4>
              </div>
            </div>
            <div class="row">
              {/** Single service **/}
              <div class="col-md-6 col-lg-4">
                <div class="single-service">
                  <div class="service-icon">
                    <i class="ti-comment"></i>
                  </div>
                  <div class="service-content">
                    <h5>Bulk &amp; Personalized SMS</h5>
                    <p>
                      With a simple yet intuitive dashboard, reach billions of
                      users right on their phones withone seconds. Our platform
                      offers you instant deliverability and complete control
                      over your messaging traffic in real-time.
                    </p>
                    <a href="https://wittyflow.com/products/sms/">Read More</a>
                  </div>
                </div>
              </div>

              {/** Single service **/}
              <div class="col-md-6 col-lg-4">
                <div class="single-service">
                  <div class="service-icon">
                    <i class="ti-mobile"></i>
                  </div>
                  <div class="service-content">
                    <h5>USSD Services</h5>
                    <p>
                      Wittyflow offers the most effective and efficient Long and
                      Short USSD Codes to Individuals and Enterprises alike. Get
                      your business of Wittyflow's USSD platform now.
                    </p>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>

              {/** Single service **/}
              <div class="col-md-6 col-lg-4">
                <div class="single-service">
                  <div class="service-icon">
                    <i class="ti-shield"></i>
                  </div>
                  <div class="service-content">
                    <h5>2-Factor Authentication</h5>
                    <p>
                      Verifying user identity and authenticity is a breeze with
                      Wittyflow's Time-based one-time passwords and SMS PIN
                      codes for 2FA in a single API
                    </p>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/**================Service Area end =================**/}

        {/**================About  Area =================**/}
        <section class="about-area area-padding-bottom">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <div class="area-heading">
                  <h4>
                    Built by Dvelopers
                    <br />
                    For Dvelopers.{" "}
                  </h4>
                  <h6>Secure & well defined cloud APIs </h6>

                  <p>
                    A few lines of code that scale from startups to Enterpirse
                    grade businesses.
                  </p>
                </div>
                <div class="row">
                  <div class="col-md-6 col-lg-6">
                    <div class="single-about">
                      <div class="about-icon">
                        <i class="ti-infinite"></i>
                      </div>
                      <div class="single-about-content">
                        <h5>Cloud based APIs</h5>
                        <p>
                          Wittyflow offers cloud based, clear cut and well
                          documented APIs that are super easy to integrated and
                          highly reliable for businesses of all sizes.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6">
                    <div class="single-about">
                      <div class="about-icon">
                        <i class="ti-archive"></i>
                      </div>
                      <div class="single-about-content">
                        <h5>Plugins & SDKs</h5>
                        <p>
                          With a suite of easy to integrated SDKs, connect your
                          applications to Wittyflow's plethora of accessible
                          APIs in your prefered programming languages for free.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/**================About Area End =================**/}

        {/**================Feature  Area =================**/}
        <section class="feature-area area-padding bg_one">
          <div class="container">
            <div class="row align-items-center">
              <div class="offset-lg-6 col-lg-6">
                <div class="area-heading light">
                  <h4>
                    Direct Connection to <br />
                    Mobile Networks
                  </h4>
                  <p>
                    There earth face earth behold. She'd stars made void two
                    given do and also. Our own grass days. Greater male Shall
                    There faced earth behold She star
                  </p>
                </div>
                <div class="row">
                  <div class="col-">
                    <div class="single-feature d-flex">
                      <div class="feature-icon">
                        <i class="ti-layers"></i>
                      </div>
                      <div class="single-feature-content">
                        <h5>Direct-to Carrier Network</h5>
                        <p>
                          We've established Direct connectivity to all local
                          networks and without roaming links and grey-routes
                          allowing us provide unparralled delivery of your
                          messages.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-">
                    <div class="single-feature d-flex">
                      <div class="feature-icon">
                        <i class="ti-layers"></i>
                      </div>
                      <div class="single-feature-content">
                        <h5>
                          Higher security for your business and your customers
                        </h5>
                        <p>
                          Improve security, speed and reliability at lower costs
                          through the world's largest direct-to-carrier network
                          all built in-house.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/**================Feature Area End =================**/}

        {/**================About  Area =================**/}
        <section class="statics-area area-padding">
          <div class="container">
            <div class="row">
              <div class="col-lg-5">
                <div class="image-box">
                  <img src="/front/img/banner/about3.png" alt="" />
                </div>
              </div>

              <div class="offset-lg-1 col-lg-6">
                <div class="area-heading">
                  <h4>
                    The best businesses, big and small,
                    <br />
                    trust Wittyflow for growth.
                  </h4>
                  <h6>
                    Wittyflow supports most of the best businesses in Ghana.{" "}
                  </h6>

                  <p>
                    There earth face earth behold. She'd stars made void two
                    given do and also. Our own grass days. Greater male Shall
                    There faced earth behold She star
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/**================About Area End =================**/}

        {/**================ Start Portfolio Area =================**/}
        <section class="pricing_area area-padding-top">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="area-heading">
                  <h4>Flexible &amp; Affordable Pricing</h4>
                  <p>Pay as you go, scalable prices just for your budget.</p>
                </div>
              </div>
              <div class="col-sm-6 col-lg-6">
                <div class="single-pricing">
                  <div class="pricing-icon">
                    <i class="ti-wallet"></i>
                  </div>
                  <div class="single-pricing-content">
                    <h5>Currently</h5>
                    <h4>
                      &cent; 0.035<span class="currency_line">/</span>
                      <span>per message to all Local Networks</span>
                    </h4>

                    <a href="/auth/signup">Get Started For Free</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/**================ End Pricing Area =================**/}

        {/**================ Start Brands Area =================**/}
        <section
          class="brands-area area-padding-bottom"
          style={{ display: "block" }}
        >
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <div class="owl-carousel brand-carousel">
                  {/** single-brand **/}
                  <div class="single-brand-item d-table">
                    <div class="d-table-cell">
                      <img src="/front/img/logo/1.png" alt="" />
                    </div>
                  </div>
                  {/** single-brand **/}
                  <div class="single-brand-item d-table">
                    <div class="d-table-cell">
                      <img src="/front/img/logo/2.png" alt="" />
                    </div>
                  </div>
                  {/** single-brand **/}
                  <div class="single-brand-item d-table">
                    <div class="d-table-cell">
                      <img src="/front/img/logo/3.png" alt="" />
                    </div>
                  </div>
                  {/** single-brand **/}
                  <div class="single-brand-item d-table">
                    <div class="d-table-cell">
                      <img src="/front/img/logo/4.png" alt="" />
                    </div>
                  </div>
                  {/** single-brand **/}
                  <div class="single-brand-item d-table">
                    <div class="d-table-cell">
                      <img src="/front/img/logo/5.png" alt="" />
                    </div>
                  </div>
                  {/** single-brand **/}
                  <div class="single-brand-item d-table">
                    <div class="d-table-cell">
                      <img src="/front/img/logo/3.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/**================ End Brands Area =================**/}
      </>
    );
  }
}

export default IndexPage;
