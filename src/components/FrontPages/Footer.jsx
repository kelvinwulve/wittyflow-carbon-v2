import React, { Component } from "react";

const current_year = new Date().getFullYear();
class Footer extends Component {
  render() {
    return (
      <>
        {/* <!-- ================ start footer Area ================= --> */}
        <footer class="footer-area">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
                <h4>Contact Info</h4>
                <div class="footer-address">
                  <p>Address : Ambassadorial Enclave, East Legon - Accra.</p>
                  <span>Phone : +233 244 096 590</span>
                  <span>Email : support@wittyflow.com</span>
                </div>
              </div>

              <div class="col-lg-3 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
                <h4>Services</h4>
                <ul>
                  <li>
                    <a href="#">Bulk Messaging</a>
                  </li>
                  <li>
                    <a href="#">Personalized/Excel Messaging</a>
                  </li>
                  <li>
                    <a href="#">Voice Messaging</a>
                  </li>
                  <li>
                    <a href="#">USSD</a>
                  </li>
                  <li>
                    <a href="#">2-Factor Authentication</a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-3 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
                <h4>Support</h4>
                <ul>
                  <li>
                    <a href="#">Terms of Service</a>
                  </li>
                  <li>
                    <a href="#">Anti Spam Policy</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">GDPR</a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-3 col-sm-6 mb-4 mb-xl-0 single-footer-widget">
                <h4>Developers</h4>
                <ul>
                  <li>
                    <a href="https://wittyflow.docs.apiary.io/#">
                      API Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#">API Reference</a>
                  </li>
                  <li>
                    <a href="#">Plugins &amp; SDKs</a>
                  </li>
                  <li>
                    <a href="#">Service Status</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="footer-bottom row align-items-center text-center text-lg-left no-gutters">
              <p class="footer-text m-0 col-lg-8 col-md-12">
                &copy; Copyright {current_year} Wittyflow Company Limited, All
                Rights Reserved.
              </p>
              <div class="col-lg-4 col-md-12 text-center text-lg-right footer-social">
                <a href="https://facebook.com/WittyflowHQ">
                  <i class="ti-facebook"></i>
                </a>
                <a href="https://twitter.com/WittyflowHQ">
                  <i class="ti-twitter-alt"></i>
                </a>

                <a href="https://linkedin.com/WittyflowHQ">
                  <i class="ti-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>
        {/* <!-- ================ End footer Area ================= --> */}
      </>
    );
  }
}

export default Footer;
