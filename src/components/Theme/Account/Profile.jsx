import React, { Component } from "react";
import { connect } from 'react-redux';
import Button, { ZOOM_IN } from "react-ladda";
import { validEmailRegex, validateForm } from '../../../Utilities/Validators';
import { Redirect } from 'react-router-dom';
import { post } from '../../../services/Transport';
import { toast } from 'react-toastify';
import Auth from '../../Auth/Auth';
import { updateUser } from '../carbonActions';
import {NotificationManager} from 'react-notifications';
import { Modal } from 'react-bootstrap';

class Profile extends Component {

  state = {
    nameModal: false,
    emailModal: false,
    passwordModal: false,
    phoneModal: false,
    email: this.props.user.user_email,
    password: "",
    name: this.props.user.user_name,
    phone: this.props.user.phone,
    new_email: "",
    new_phone:"0" + this.props.user.phone.slice(-9),
    new_password: "",
    old_password: "",
    confirm_password: "",
    form_errors: {
      password: " ",
      new_password: " ",
      confirm_password: " ",
    }
  }

  toggleNameModal = e => {
    this.setState({
      nameModal: !this.state.nameModal
    });
  };

  toggleEmailModal = e => {
    this.setState({
      emailModal: !this.state.emailModal
    });
  };

  togglePasswordModal = e => {
    this.setState({
      passwordModal: !this.state.passwordModal
    });
  };

  togglePhoneModal = e => {
    this.setState({
      phoneModal: !this.state.phoneModal
    });
  };



  handleChange = e => {
    const { name, value } = e.target;
    let form_errors = this.state.form_errors;
    switch (name) {
      case "new_password":
        form_errors.new_password =
          value.length < 10 ? "Password must be 10 characters long!" : "";
        break;
      case "password":
        form_errors.password =
          value.length < 10 ? "Password must be 10 characters long!" : "";
        break;

      case "confirm_password":
        form_errors.confirm_password =
          this.state.new_password !== value ? "Passwords must match" : "";
        break;
      default:
        break;
    }
    this.setState({
      form_errors,
      [e.target.name]: e.target.value
    });
  };

  handleChangeName = e => {
    e.preventDefault();
    this.setState({ loading: true });
    post("/profile/name/update", this.state)
      .then(res => {
        this.setState({ loading: false, nameModal: false });
        NotificationManager.success(res.data.message,"Success",2000);
        this.props.updateUser();
      })
      .catch(err => {
        if(err.response){
          if (err.response.status === 403) {
            Auth.signout();
            this.setState({
              unauthorized: true
            });
          }
        }
        this.setState({
          loading: false,
          nameModal: false
        });
      });
  };

  handleChangeEmail = e => {
    e.preventDefault();
    this.setState({ loading: true });
    post("/profile/email/update", this.state)
      .then(res => {
        NotificationManager.success(res.data.message,"Success");
        this.setState({ loading: false, emailModal: false, password: "" });
        this.props.updateUser();
      })
      .catch(err => {
        if (err.response.status === 403) {
          Auth.signout();
          this.setState({
            unauthorized: true
          });
        }
        toast.error(err.response.data.message);
        this.setState({
          loading: false,
          password: ""
        });
      });
  };


  handleChangePhone = e =>{
    e.preventDefault();
    this.setState({ loading: true });
    const phone = this.state.new_phone;
    post('/profile/phone/update',{
      phone: this.state.new_phone.slice(-9)
    }).then(res =>{
      NotificationManager.success(res.data.message,"Success");
      this.setState({
        loading: false,
        phoneModal: false,
        phone,
        new_phone:"",
      },()=>this.props.updateUser());
    }).catch(err =>{
      if (err.response.status === 403) {
        Auth.signout();
        this.setState({
          unauthorized: true
        });
      }
      
      if(err.response){
        NotificationManager.error(err.response.data.message);
      }
      this.setState({
        loading: false
      })
    })
  }

  handleChangePasswprd = e => {
    e.preventDefault();
    this.setState({ loading: true });
    post("/profile/password/update", {
      old_password: this.state.password,
      new_password: this.state.new_password
    })
      .then(res => {
        NotificationManager.success(res.data.message,"Success");
        this.setState({
          loading: false,
          passwordModal: false,
          password: "",
          new_password: "",
          confirm_password: ""
        });
        this.props.updateUser();
      })
      .catch(err => {
        if (err.response.status === 403) {
          Auth.signout();
          this.setState({
            unauthorized: true
          });
        }
        this.setState({
          loading: false,
          passwordModal: false,
          password: "",
          new_password: "",
          confirm_password: ""
        });
      });
  };

  render() {

    const passwordvalid = validateForm(this.state.form_errors);
    const { name, form_errors, unauthorized } = this.state;

    if (unauthorized) {
      return <Redirect to="/en/account/profile" />;
    }

    return (
      <>
        <div class="row">
          <div class="col-xl-12">
            <div class="kt-portlet">
              <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                  <h3 class="kt-portlet__head-title">
                    Personal Information{" "}
                    <small>update your personal information</small>
                  </h3>
                </div>
                <div class="kt-portlet__head-toolbar">
                  <div class="kt-portlet__head-wrapper">
                    <div class="dropdown dropdown-inline">
                      <button
                        type="button"
                        class="btn btn-label-brand btn-sm btn-icon btn-icon-md"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="flaticon2-gear"></i>
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <ul class="kt-nav">
                          <li class="kt-nav__section kt-nav__section--first">
                            <span class="kt-nav__section-text">
                              Export Tools
                            </span>
                          </li>
                          <li class="kt-nav__item">
                            <a href="#" class="kt-nav__link">
                              <i class="kt-nav__link-icon la la-print"></i>
                              <span class="kt-nav__link-text">Print</span>
                            </a>
                          </li>
                          <li class="kt-nav__item">
                            <a href="#" class="kt-nav__link">
                              <i class="kt-nav__link-icon la la-copy"></i>
                              <span class="kt-nav__link-text">Copy</span>
                            </a>
                          </li>
                          <li class="kt-nav__item">
                            <a href="#" class="kt-nav__link">
                              <i class="kt-nav__link-icon la la-file-excel-o"></i>
                              <span class="kt-nav__link-text">Excel</span>
                            </a>
                          </li>
                          <li class="kt-nav__item">
                            <a href="#" class="kt-nav__link">
                              <i class="kt-nav__link-icon la la-file-text-o"></i>
                              <span class="kt-nav__link-text">CSV</span>
                            </a>
                          </li>
                          <li class="kt-nav__item">
                            <a href="#" class="kt-nav__link">
                              <i class="kt-nav__link-icon la la-file-pdf-o"></i>
                              <span class="kt-nav__link-text">PDF</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <form class="kt-form kt-form--label-right">
                <div class="kt-portlet__body">
                  <div class="kt-section kt-section--first">
                    <div class="kt-section__body">
                      <div class="row">
                        <label class="col-xl-3"></label>
                        <div class="col-lg-9 col-xl-6">
                          <h3 class="kt-section__title kt-section__title-sm">
                            My Profile:
                          </h3>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label class="col-xl-3 col-lg-3 col-form-label">
                          Full Name
                        </label>
                        <div class="col-lg-9 col-xl-6">
                          <input
                            class="form-control"
                            type="text"
                            value={this.props.user.user_name}
                            readOnly
                          />
                          <button type="button" onClick={this.toggleNameModal} class="form-text btn btn-link text-primary">
                            Change Your Full Name
                          </button>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label class="col-xl-3 col-lg-3 col-form-label">
                          Account Password
                        </label>
                        <div class="col-lg-9 col-xl-6">
                          <input
                            class="form-control"
                            type="password"
                            value="01235456789"
                            readOnly
                          />
                          <button type="button" onClick={this.togglePasswordModal} class="form-text btn btn-link text-primary">
                            Update your password
                          </button>
                        </div>
                      </div>

                      <div class="row">
                        <label class="col-xl-3"></label>
                        <div class="col-lg-9 col-xl-6">
                          <h3 class="kt-section__title kt-section__title-sm">
                            Contact Info:
                          </h3>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-xl-3 col-lg-3 col-form-label">
                          Contact Phone
                        </label>
                        <div class="col-lg-9 col-xl-6">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="la la-phone"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              class="form-control"
                              value={this.state.phone}
                              placeholder="Phone"
                              aria-describedby="basic-addon1"
                              readOnly
                            />
                          </div>
                          <button type="button" onClick={this.togglePhoneModal} class="form-text btn btn-link text-primary">
                            Change Your Phone
                          </button>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-xl-3 col-lg-3 col-form-label">
                          Email Address
                        </label>
                        <div class="col-lg-9 col-xl-6">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="la la-at"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              class="form-control"
                              value={this.props.user.user_email}
                              placeholder="Email"
                              aria-describedby="basic-addon1"
                              readOnly
                            />
                          </div>

                          <button type="button" onClick={this.toggleEmailModal} class="form-text btn btn-link text-primary">
                            Change Your Email
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        
        <Modal show={this.state.phoneModal} onHide={this.togglePhoneModal}>
          <Modal.Header closeButton>
            Change Phone number
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>Phone</label>
              <input
                value={this.state.new_phone}
                name="new_phone"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            {(this.state.new_phone.length > 0 && this.state.new_phone.length < 10) && (
                <div className="form-error">
                  <span className="form-error-msg">
                    Phone number should be 10 digits
                  </span>
                </div>
              )}
          </Modal.Body>
          <Modal.Footer>
              <Button
                disabled={this.state.new_phone < 10}
                loading={this.state.loading}
                onClick={this.handleChangePhone}
                data-color="blue"
                data-style={ZOOM_IN}
                data-spinner-size={30}
                data-spinner-color="#ffffff"
                data-spinner-lines={12}
                className="ladda-button-primary"
                type="button"
              >
                Change
              </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.nameModal} onHide={this.toggleNameModal}>
          <Modal.Header closeButton>
              Change Name
          </Modal.Header>
          <Modal.Body>
          <form className="form">
            <div className="form-group">
              <label>Name</label>
              <input
                value={name}
                name="name"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
                loading={this.state.loading}
                onClick={this.handleChangeName}
                data-color="blue"
                data-style={ZOOM_IN}
                data-spinner-size={30}
                data-spinner-color="#ffffff"
                data-spinner-lines={12}
                className="ladda-button-primary"
                type="button"
              >
                Change
              </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.passwordModal} onHide={this.togglePasswordModal}>
          <Modal.Header closeButton>
            Change Password
          </Modal.Header>
          <Modal.Body>
          <form className="form">
            <div className="form-group">
              <label>Old Password</label>
              <input
                type="password"
                onChange={this.handleChange}
                value={this.state.password}
                name="password"
                className="form-control"
              />
              {this.state.form_errors.password.length > 0 && (
                <div className="form-error">
                  <span className="form-error-msg">
                    {this.state.form_errors.password}
                  </span>
                </div>
              )}
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                onChange={this.handleChange}
                type="password"
                value={this.state.new_password}
                name="new_password"
                className="form-control"
              />
              {form_errors.new_password.length > 0 && (
                <div className="form-error">
                  <span className="form-error-msg">
                    {form_errors.new_password}
                  </span>
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                onChange={this.handleChange}
                value={this.state.confirm_password}
                type="password"
                name="confirm_password"
                className="form-control"
              />
              {form_errors.confirm_password.length > 0 && (
                <div className="form-error">
                  <span className="form-error-msg">
                    {form_errors.confirm_password}
                  </span>
                </div>
              )}
            </div>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
                disabled={!passwordvalid}
                loading={this.state.loading}
                onClick={this.handleChangePasswprd}
                data-color="blue"
                data-style={ZOOM_IN}
                data-spinner-size={30}
                data-spinner-color="#ffffff"
                data-spinner-lines={12}
                className="ladda-button-primary"
                type="button"
              >
                Change
              </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.emailModal} onHide={this.toggleEmailModal}>
          <Modal.Header closeButton>
              Change Email
          </Modal.Header>
          <Modal.Body>
          <form className="form">
            <div className="form-group">
              <label>New Email</label>
              <input
                value={this.state.new_email}
                name="new_email"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                value={this.state.password}
                name="password"
                type="password"
                className="form-control"
                onChange={this.handleChange}
              />
              {this.state.form_errors.password.length > 0 && (
                <div className="form-error">
                  <span className="form-error-msg">
                    {this.state.form_errors.password}
                  </span>
                </div>
              )}
            </div>
          </form>
          </Modal.Body>
          <Modal.Footer>
           <Button
                disabled={
                  this.state.password.length < 10 &&
                  !validEmailRegex.test(this.state.new_email.length)
                }
                loading={this.state.loading}
                onClick={this.handleChangeEmail}
                data-color="blue"
                data-style={ZOOM_IN}
                data-spinner-size={30}
                data-spinner-color="#ffffff"
                data-spinner-lines={12}
                className="ladda-button-primary"
                type="button"
              >
                Change
              </Button>
          </Modal.Footer>
        </Modal>
            
      </>
    );
  }
}


const mapStateToProps = state =>{
  return {
    ...state.auth
  }
}

export default connect(mapStateToProps, { updateUser })(Profile);
