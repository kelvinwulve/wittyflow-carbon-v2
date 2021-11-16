/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import "./static/css/base.css";
import Logo from "./static/img/logo-light.png";
import routes from "./../../routes";
import { connect } from "react-redux";
import { updateUser, getDeveolperApps, signOut } from "./carbonActions";
// import BillingProvider from "../../redux/BillingContext";

const current_year = new Date().getFullYear();

class Carbon extends Component {
  async componentDidMount() {
    await this.props.updateUser();
    this.props.getDeveolperApps();
  }

  state = {
    signedOut: false,
  };

  capitalizeFirstLetter = (s) => {
    if (typeof s !== "string") return "";
    const names = s.split(" ");
    if (names.length > 1) {
      return (
        names[0].charAt(0).toUpperCase() + "" + names[1].charAt(0).toUpperCase()
      );
    }
    return s.charAt(0).toUpperCase();
  };

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/v1") {
        // console.log(prop.layout + prop.path);
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      } else {
        return null;
      }
    });
  };

  handleSignout = (e) => {
    this.props.signOut();
  };

  render() {
    console.log("all user props",this.props)
    return !this.props.user ? (
      <Redirect
        to={{
          pathname: "/auth/signin",
          state: { message: "Nice having you... Wish to see you soon" },
        }}
      />
    ) : (
      <>
        {/* begin:: Page */}

        {/* begin:: Header Mobile */}
        <div
          id="kt_header_mobile"
          className="kt-header-mobile  kt-header-mobile--fixed "
        >
          <div className="kt-header-mobile__logo">
            <Link to="/v1/">
              <img alt="Logo" src={Logo} width="100" />
            </Link>
          </div>
          <div className="kt-header-mobile__toolbar">
            <button
              className="kt-header-mobile__toggler kt-header-mobile__toggler--left"
              id="kt_aside_mobile_toggler"
            >
              <span></span>
            </button>
            <button
              className="kt-header-mobile__toggler"
              id="kt_header_mobile_toggler"
            >
              <span></span>
            </button>
            <button
              className="kt-header-mobile__topbar-toggler"
              id="kt_header_mobile_topbar_toggler"
            >
              <i className="flaticon-more"></i>
            </button>
          </div>
        </div>

        {/* end:: Header Mobile */}
        <div className="kt-grid kt-grid--hor kt-grid--root">
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
            {/* begin:: Aside */}
            <button className="kt-aside-close " id="kt_aside_close_btn">
              <i className="la la-close"></i>
            </button>
            <div
              className="kt-aside  kt-aside--fixed  kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop"
              id="kt_aside"
            >
              {/* begin:: Aside */}
              <div
                className="kt-aside__brand kt-grid__item "
                id="kt_aside_brand"
              >
                <div className="kt-aside__brand-logo">
                  <a href="/">
                    <img alt="Logo" src={Logo} width="140" />
                  </a>
                </div>
                <div className="kt-aside__brand-tools">
                  <button
                    className="kt-aside__brand-aside-toggler"
                    id="kt_aside_toggler"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        className="kt-svg-icon"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                          <path
                            d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z"
                            id="Path-94"
                            fill="#000000"
                            fillRule="nonzero"
                            transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999) "
                          />
                          <path
                            d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z"
                            id="Path-94"
                            fill="#000000"
                            fillRule="nonzero"
                            opacity="0.3"
                            transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999) "
                          />
                        </g>
                      </svg>
                    </span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        className="kt-svg-icon"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                          <path
                            d="M12.2928955,6.70710318 C11.9023712,6.31657888 11.9023712,5.68341391 12.2928955,5.29288961 C12.6834198,4.90236532 13.3165848,4.90236532 13.7071091,5.29288961 L19.7071091,11.2928896 C20.085688,11.6714686 20.0989336,12.281055 19.7371564,12.675721 L14.2371564,18.675721 C13.863964,19.08284 13.2313966,19.1103429 12.8242777,18.7371505 C12.4171587,18.3639581 12.3896557,17.7313908 12.7628481,17.3242718 L17.6158645,12.0300721 L12.2928955,6.70710318 Z"
                            id="Path-94"
                            fill="#000000"
                            fillRule="nonzero"
                          />
                          <path
                            d="M3.70710678,15.7071068 C3.31658249,16.0976311 2.68341751,16.0976311 2.29289322,15.7071068 C1.90236893,15.3165825 1.90236893,14.6834175 2.29289322,14.2928932 L8.29289322,8.29289322 C8.67147216,7.91431428 9.28105859,7.90106866 9.67572463,8.26284586 L15.6757246,13.7628459 C16.0828436,14.1360383 16.1103465,14.7686056 15.7371541,15.1757246 C15.3639617,15.5828436 14.7313944,15.6103465 14.3242754,15.2371541 L9.03007575,10.3841378 L3.70710678,15.7071068 Z"
                            id="Path-94"
                            fill="#000000"
                            fillRule="nonzero"
                            opacity="0.3"
                            transform="translate(9.000003, 11.999999) rotate(-270.000000) translate(-9.000003, -11.999999) "
                          />
                        </g>
                      </svg>
                    </span>
                  </button>

                  {/*
                   */}
                </div>
              </div>

              {/* end:: Aside */}

              {/* WITTYFLOW_SIDEBAR_MENU */}

              {/* begin:: Aside Menu */}
              <div
                className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid"
                id="kt_aside_menu_wrapper"
              >
                <div
                  id="kt_aside_menu"
                  className="kt-aside-menu "
                  data-ktmenu-vertical="1"
                  data-ktmenu-scroll="1"
                  data-ktmenu-dropdown-timeout="100"
                >
                  <ul className="kt-menu__nav ">
                    <li className="kt-menu__item " aria-haspopup="true">
                      <Link to="/v1/" className="kt-menu__link ">
                        <span className="kt-menu__link-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                            className="kt-svg-icon"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <polygon points="0 0 24 0 24 24 0 24"></polygon>
                              <path
                                d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z"
                                fill="#000000"
                                fillRule="nonzero"
                              ></path>
                              <path
                                d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z"
                                fill="#000000"
                                opacity="0.3"
                              ></path>
                            </g>
                          </svg>
                        </span>

                        {/* <i className="kt-menu__link-icon flaticon-home"></i> */}
                        <span className="kt-menu__link-text">Dashboard</span>
                      </Link>
                    </li>
                    <li className="kt-menu__section ">
                      <h4 className="kt-menu__section-text">Messaging</h4>
                      <i className="kt-menu__section-icon flaticon-more-v2"></i>
                    </li>
                    <li
                      className="kt-menu__item  kt-menu__item--submenu"
                      aria-haspopup="true"
                      data-ktmenu-submenu-toggle="hover"
                    >
                      <a
                        href="javascript:;"
                        className="kt-menu__link kt-menu__toggle"
                      >
                        <i className="kt-menu__link-icon ti-comment sidemenu-icon"></i>
                        <span className="kt-menu__link-text">Messaging</span>
                        <i className="kt-menu__ver-arrow la la-angle-right"></i>
                      </a>
                      <div className="kt-menu__submenu ">
                        <span className="kt-menu__arrow"></span>
                        <ul className="kt-menu__subnav">
                          <li
                            className="kt-menu__item  kt-menu__item--parent"
                            aria-haspopup="true"
                          >
                            <span className="kt-menu__link">
                              <span className="kt-menu__link-text">
                                Messaging
                              </span>
                            </span>
                          </li>
                          <li className="kt-menu__item " aria-haspopup="true">
                            <Link
                              to="/v1/messaging/campaign/"
                              className="kt-menu__link "
                            >
                              <i className="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span className="kt-menu__link-text">
                                Campaign Builder
                              </span>
                            </Link>
                          </li>

                          <li className="kt-menu__item " aria-haspopup="true">
                            <Link
                              to="/v1/messaging/sms-overview/"
                              className="kt-menu__link "
                            >
                              <i className="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span className="kt-menu__link-text">
                                SMS Overview
                              </span>
                            </Link>
                          </li>                         
                        </ul>
                      </div>
                    </li>

                    <li className="kt-menu__item " aria-haspopup="true">
                      <Link to="/v1/groups" className="kt-menu__link ">
                        <i className="kt-menu__link-icon ti-server"></i>
                        <span className="kt-menu__link-text">
                          Contacts &amp; Groups
                        </span>
                      </Link>
                    </li>

                    <li className="kt-menu__item " aria-haspopup="true">
                      <Link
                        target="_self"
                        to="/v1/messaging/sendernames"
                        className="kt-menu__link "
                      >
                        <i className="kt-menu__link-icon ti-layers"></i>
                        <span className="kt-menu__link-text">Sendernames</span>
                      </Link>
                    </li>

                    <li className="kt-menu__item " aria-haspopup="true">
                      <Link
                        target="_self"
                        to="/v1/billing/recharge/history"
                        className="kt-menu__link "
                      >
                        <i className="kt-menu__link-icon ti-wallet"></i>
                        <span className="kt-menu__link-text">
                          Recharge History
                        </span>
                      </Link>
                    </li>

                    <li className="kt-menu__item " aria-haspopup="true">
                      <Link
                        target="_self"
                        to="/v1/developers/apps"
                        className="kt-menu__link "
                      >
                        <i className="kt-menu__link-icon ti-infinite"></i>
                        <span className="kt-menu__link-text">Developers</span>
                      </Link>
                    </li>
                    <li
                      className="kt-menu__item  kt-menu__item--submenu"
                      aria-haspopup="true"
                      data-ktmenu-submenu-toggle="hover"
                    >
                      <a
                        href="javascript:;"
                        className="kt-menu__link kt-menu__toggle"
                      >
                        <i className="kt-menu__link-icon ti-comment sidemenu-icon"></i>
                        <span className="kt-menu__link-text">USSD</span>
                        <i className="kt-menu__ver-arrow la la-angle-right"></i>
                      </a>
                      <div className="kt-menu__submenu ">
                        <span className="kt-menu__arrow"></span>
                        <ul className="kt-menu__subnav">
                          <li className="kt-menu__item " aria-haspopup="true">
                            <Link
                              to="/v1/ussd/home"
                              className="kt-menu__link "
                            >
                              <i className="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span className="kt-menu__link-text">
                                Registered Apps
                              </span>
                            </Link>
                          </li>

                          {/* <li className="kt-menu__item " aria-haspopup="true">
                            <Link
                              to="/v1/ussd/withdrawal"
                              className="kt-menu__link "
                            >
                              <i className="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                <span></span>
                              </i>
                              <span className="kt-menu__link-text">
                                Withdrawal History
                              </span>
                            </Link>
                          </li> */}
                        </ul>
                      </div>
                    </li>

                    {parseInt(this.props.user.role) > 1 && (
                      <>
                        <li className="kt-menu__section ">
                          <h4 className="kt-menu__section-text">
                            Administrative
                          </h4>
                          <i className="kt-menu__section-icon flaticon-more-v2"></i>
                        </li>
                        <li
                          className="kt-menu__item  kt-menu__item--submenu"
                          aria-haspopup="true"
                          data-ktmenu-submenu-toggle="hover"
                        >
                          <a
                            href="javascript:;"
                            className="kt-menu__link kt-menu__toggle"
                          >
                            <i className="kt-menu__link-icon ti-lock sidemenu-icon"></i>
                            <span className="kt-menu__link-text">Secure</span>
                            <i className="kt-menu__ver-arrow la la-angle-right"></i>
                          </a>
                          <div className="kt-menu__submenu ">
                            <span className="kt-menu__arrow"></span>
                            <ul className="kt-menu__subnav">
                              <li
                                className="kt-menu__item  kt-menu__item--parent"
                                aria-haspopup="true"
                              >
                                <span className="kt-menu__link">
                                  <span className="kt-menu__link-text">
                                    Secure
                                  </span>
                                </span>
                              </li>
                              <li
                                className="kt-menu__item "
                                aria-haspopup="true"
                              >
                                <Link
                                  to="/v1/secure/users/"
                                  className="kt-menu__link "
                                >
                                  <i className="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                    <span></span>
                                  </i>
                                  <span className="kt-menu__link-text">
                                    Users
                                  </span>
                                </Link>
                              </li>
                              <li
                                className="kt-menu__item "
                                aria-haspopup="true"
                              >
                                <Link
                                  to="/v1/secure/messages/"
                                  className="kt-menu__link "
                                >
                                  <i className="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                    <span></span>
                                  </i>
                                  <span className="kt-menu__link-text">
                                    Users Messages
                                  </span>
                                </Link>
                              </li>
                              <li
                                className="kt-menu__item "
                                aria-haspopup="true"
                              >
                                <Link
                                  to="/v1/secure/sendernames/"
                                  className="kt-menu__link "
                                >
                                  <i className="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                    <span></span>
                                  </i>
                                  <span className="kt-menu__link-text">
                                    Sendernames
                                  </span>
                                </Link>
                              </li>
                              <li
                                className="kt-menu__item "
                                aria-haspopup="true"
                              >
                                <Link
                                  to="/v1/secure/payments/"
                                  className="kt-menu__link "
                                >
                                  <i className="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                    <span></span>
                                  </i>
                                  <span className="kt-menu__link-text">
                                    Payments
                                  </span>
                                </Link>
                              </li>

                              <li
                                className="kt-menu__item "
                                aria-haspopup="true"
                              >
                                <Link
                                  to="/v1/secure/settings"
                                  className="kt-menu__link "
                                >
                                  <i className="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                    <span></span>
                                  </i>
                                  <span className="kt-menu__link-text">
                                    System Settings
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* end:: Aside Menu */}
              {/* END WITTYFLOW_SIDEBAR_MENU */}
            </div>

            {/* end:: Aside */}
            <div
              className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
              id="kt_wrapper"
            >
              {/* begin:: Header */}
              <div
                id="kt_header"
                className="kt-header kt-grid__item  kt-header--fixed "
              >
                {/* begin:: Header Menu */}
                <button
                  className="kt-header-menu-wrapper-close"
                  id="kt_header_menu_mobile_close_btn"
                >
                  <i className="la la-close"></i>
                </button>
                <div
                  className="kt-header-menu-wrapper"
                  id="kt_header_menu_wrapper"
                >
                  <div
                    id="kt_header_menu"
                    className="kt-header-menu kt-header-menu-mobile  kt-header-menu--layout-default "
                  ></div>
                </div>

                {/* end:: Header Menu */}

                {/* begin:: Header Topbar */}
                <div className="kt-header__topbar">
                  {/*begin: User Bar */}
                  <div className="kt-header__topbar-item kt-header__topbar-item--user">
                    <div
                      className="kt-header__topbar-wrapper"
                      data-toggle="dropdown"
                      data-offset="0px,0px"
                    >
                      <div className="kt-header__topbar-user">
                        <span className="kt-header__topbar-welcome kt-hidden-mobile">
                          Hi,
                        </span>
                        {this.props.user && (
                          <span className="kt-header__topbar-username kt-hidden-mobile">
                            {this.props.user.user_name}
                          </span>
                        )}

                        {/*use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) */}
                        <span className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold">
                          {this.props.user &&
                            this.capitalizeFirstLetter(
                              this.props.user.user_name
                            )}
                        </span>
                      </div>
                    </div>
                    <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
                      {/*begin: Head */}
                      <div
                        className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
                        style={{
                          backgroundImage:
                            "url(../../assets/media/misc/bg-1.jpg)",
                        }}
                      >
                        <div className="kt-user-card__avatar">
                          <img
                            className="kt-hidden"
                            alt="Pic"
                            src="../../assets/media/users/300_25.jpg"
                          />

                          {/*use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) */}
                          <span className="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-success">
                            {this.props.user &&
                              this.capitalizeFirstLetter(
                                this.props.user.user_name
                              )}
                          </span>
                        </div>
                        {this.props.user && (
                          <div className="kt-user-card__name">
                            {this.props.user.user_name}
                          </div>
                        )}
                        {/* <div class="kt-user-card__badge">
                          <span class="btn btn-success btn-sm btn-bold btn-font-md">
                            23 messages
                          </span>
                        </div> */}
                      </div>

                      {/*end: Head */}

                      {/*begin: Navigation */}
                      <div className="kt-notification">
                        <Link
                          to="/v1/account/profile"
                          className="kt-notification__item"
                        >
                          <div className="kt-notification__item-icon">
                            <i className="flaticon2-calendar-3 kt-font-success"></i>
                          </div>
                          <div className="kt-notification__item-details">
                            <div className="kt-notification__item-title kt-font-bold">
                              My Profile
                            </div>
                            <div className="kt-notification__item-time">
                              Account settings and more
                            </div>
                          </div>
                        </Link>
                        {/* <a href="#" className="kt-notification__item">
                          <div className="kt-notification__item-icon">
                            <i className="flaticon2-mail kt-font-warning"></i>
                          </div>
                          <div className="kt-notification__item-details">
                            <div className="kt-notification__item-title kt-font-bold">
                              My Messages
                            </div>
                            <div className="kt-notification__item-time">
                              Inbox and tasks
                            </div>
                          </div>
                        </a>
                        <a href="#" className="kt-notification__item">
                          <div className="kt-notification__item-icon">
                            <i className="flaticon2-rocket-1 kt-font-danger"></i>
                          </div>
                          <div className="kt-notification__item-details">
                            <div className="kt-notification__item-title kt-font-bold">
                              My Activities
                            </div>
                            <div className="kt-notification__item-time">
                              Logs and notifications
                            </div>
                          </div>
                        </a>
                        <a href="#" className="kt-notification__item">
                          <div className="kt-notification__item-icon">
                            <i className="flaticon2-hourglass kt-font-brand"></i>
                          </div>
                          <div className="kt-notification__item-details">
                            <div className="kt-notification__item-title kt-font-bold">
                              My Tasks
                            </div>
                            <div className="kt-notification__item-time">
                              latest tasks and projects
                            </div>
                          </div>
                        </a>*/}
                        <div className="kt-notification__custom">
                          <button
                            onClick={this.handleSignout}
                            className="btn btn-label-brand btn-sm btn-bold"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>

                      {/*end: Navigation */}
                    </div>
                  </div>

                  {/*end: User Bar */}
                </div>

                {/* end:: Header Topbar */}
              </div>

              {/* end:: Header */}
              <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
                {/* begin:: Subheader */}
                <div className="kt-subheader   kt-grid__item" id="kt_subheader">
                  <div className="kt-subheader__main">
                    <h3 className="kt-subheader__title">
                      Welcome,{" "}
                      {!!this.props.user &&
                        this.props.user.user_name.split(" ")[0]}
                      .
                      {/* Welcome, {this.props.user.user_name.split(" ")[0] || ""} ! */}
                    </h3>
                    <span className="kt-subheader__separator kt-hidden"></span>
                  </div>
                  <div className="kt-subheader__toolbar">
                    <div className="kt-subheader__wrapper">
                      <span className="btn kt-subheader__btn-secondary fw-400">
                        <i className="ti-credit-card"></i> Balance: &cent;{" "}
                        {this.props.user.balance}
                      </span>
                      <span className="btn kt-subheader__btn-secondary fw-400">
                        <i className="ti-comment"></i> SMS Credits:{" "}
                        {Math.ceil(
                          this.props.user.balance /
                            parseFloat(this.props.user.sms_rate)
                        )}
                      </span>
                      {/* <span className="btn kt-subheader__btn-secondary fw-400">
                        <i className="ti-bag"></i> Bundles: 0
                      </span> */}

                      <span className="btn kt-subheader__btn-secondary fw-400">
                        <i className="ti-light-bulb"></i> SMS Rate: &cent;{" "}
                        {this.props.user.sms_rate}
                      </span>
                      <Link
                        type="button"
                        className="btn kt-subheader__btn-secondary fw-400"
                        to="/v1/user/user_bundle_list"
                      >
                        <i className="ti-bag"></i> Bundles: {this.props.user_wallet_info.available_bundle_buckets ? this.props.user_wallet_info.available_bundle_buckets : 0 }
                      </Link>

                      <Link
                        type="button"
                        className="btn btn-primary btn-elevate btn-square"
                        //to="/v1/billing/recharge/payasyougo"
                        to="/v1/billing/recharge/choice"
                      >
                        <i className="ti-plus"></i> Recharge
                      </Link>
                      <div
                        className="dropdown dropdown-inline"
                        data-toggle="kt-tooltip"
                        title="Quick actions"
                        data-placement="left"
                      >
                        <a
                          href="#"
                          className="btn btn-icon"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                            className="kt-svg-icon kt-svg-icon--success kt-svg-icon--md"
                          >
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <polygon
                                id="Shape"
                                points="0 0 24 0 24 24 0 24"
                              />
                              <path
                                d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z"
                                id="Combined-Shape"
                                fill="#000000"
                                fillRule="nonzero"
                                opacity="0.3"
                              />
                              <path
                                d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z"
                                id="Combined-Shape"
                                fill="#000000"
                              />
                            </g>
                          </svg>

                 

                          {/* <i className="flaticon2-plus"></i> */}
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <ul className="kt-nav">
                            <li className="kt-nav__section kt-nav__section--first">
                              <span className="kt-nav__section-text">
                                Quick Links:
                              </span>
                            </li>

                            {/* <li className="kt-nav__item">
                              <a href="#" className="kt-nav__link">
                                <i className="kt-nav__link-icon ti-wallet"></i>
                                <Link
                                type="button"
                                //className="btn btn-primary btn-elevate btn-square"
                                to="/v1/billing/recharge/payasyougo"
                                //to="/v1/billing/recharge/choice"
                                >
                                <span className="kt-nav__link-text">
                                          Wallet Data
                                        </span>
                              </Link>
                               
                              </a>
                            </li> */}

                            
                            <li className="kt-nav__item">
                              <a href="#" className="kt-nav__link">
                                <i className="kt-nav__link-icon ti-comment"></i>
                                <Link
                                type="button"
                                to="/v1/messaging/campaign/"
                                >
                                  <span className="kt-nav__link-text">Send Messages</span>

                                </Link>
                              </a>
                            </li>
                            
                        
                            <li className="kt-nav__item">
                              <a href="#" className="kt-nav__link">
                                <i className="kt-nav__link-icon ti-light-bulb"></i>
                                <Link
                                type="button"
                                to="/v1/groups"
                                >
                                <span className="kt-nav__link-text">Create Group</span>
                                </Link>
                              </a>
                            </li>
                            <li className="kt-nav__item">
                              <a href="#" className="kt-nav__link">
                                <i className="kt-nav__link-icon ti-layers"></i>
                                <Link
                                type="button"
                                to="/v1/messaging/sendernames"
                                >
                                <span className="kt-nav__link-text">Add Sendername</span>

                                </Link>
                              </a>
                            </li>
                            <li className="kt-nav__item">
                              <a 
                              href="https://wittyflow.docs.apiary.io/" 
                              className="kt-nav__link">
                                <i className="kt-nav__link-icon ti-files"></i>
                                <span className="kt-nav__link-text">API Docs</span>
                              </a>
                            </li>

                            <li className="kt-nav__item">
                              <a href="#" className="kt-nav__link">
                                <i className="kt-nav__link-icon ti-infinite"></i>

                                <Link
                                type="button"
                                to="/v1/developers/apps"
                                >
                                 <span className="kt-nav__link-text">API  Keys</span>
                                </Link>
                              </a>
                            </li>

                            <li className="kt-nav__item">
                              <a href="https://wittyflow.com/support-2/" className="kt-nav__link">
                                <i className="kt-nav__link-icon ti-headphone-alt"></i>
                                <span className="kt-nav__link-text">Contact Support</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* end:: Subheader */}

                {/* begin:: Content */}
                <div
                  className="kt-content  kt-grid__item kt-grid__item--fluid"
                  id="kt_content"
                >
                  {/* WITTYFLOW_ALL_CONTENT AND ROUTES */}

                  <Switch>
                    {this.getRoutes(routes)}
                    <Redirect from="/v1/" to="/v1/index" />
                  </Switch>

                  {/* END WITTYFLOW_ALL_CONTENT AND ROUTES */}
                </div>

                {/* end:: Content */}
              </div>

              {/* begin:: Footer */}
              <div className="kt-footer kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop">
                <div className="kt-footer__copyright">
                  {current_year} &nbsp;&copy;&nbsp;
                  <a
                    href="http://www.wittyflow.com"
                    target="_self"
                    className="kt-link"
                  >
                    Wittyflow Company Limited
                  </a>
                </div>
                {/* <div className="kt-footer__menu">
                  <a
                    href="#"
                    target="_self"
                    className="kt-footer__menu-link kt-link"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    target="_self"
                    className="kt-footer__menu-link kt-link"
                  >
                    Team
                  </a>
                  <a
                    href="#"
                    target="_self"
                    className="kt-footer__menu-link kt-link"
                  >
                    Contact
                  </a>
                </div> */}
              </div>

              {/* end:: Footer */}
            </div>
          </div>
        </div>

        {/* end:: Page */}

        
        {/* end::Scrolltop */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: () => dispatch(updateUser()),
    getDeveolperApps: () => dispatch(getDeveolperApps()),
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carbon);
