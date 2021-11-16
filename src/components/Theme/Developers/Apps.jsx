import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import "./static/apps.css";
import Button, { ZOOM_IN, S } from "react-ladda";
import { getDeveolperApps, updateUser } from "../carbonActions";
import { connect } from "react-redux";
import moment from "moment";
import ModalDialog from "../../Generic/ModalDialog";
import {
  addDeveloperApp,
  upateDeveloperApp,
  changeStatus,
  toggleAddModal,
  toggleUpdateModal,
  toggleDeleteMoal,
  deleteApp
} from "./actions";
import { Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

class Apps extends Component {
  state = {
    showModal: false,
    pageNumber: 1,
    appsMessage: "Getting Apps.....Please wait....",
    loading: false,
    apps: [],
    name: "",
    description: "",
    // whitelist: [],
    update: false,
    updateApp: null,
    update_name: "",
    update_description: "",
    // update_whitelist: [],
    delete_app: null
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  changePageNumber = number => {
    this.setState({ pageNumber: number }, () =>
      alert(`Page number clicked ${this.state.pageNumber}`)
    );
  };

  handleUpdateApp = app => {
    const whitelist = JSON.parse(app.whitelist);
    this.setState({
      update: true,
      updateApp: app,
      update_name: app.name,
      update_description: app.description,
      update_whitelist: whitelist ? whitelist : ""
    });
    this.props.updateModal();
  };

  handleShowDeleteModal = app => {
    // alert(JSON.stringify(app));
    // return
    this.setState({ delete_app: app });
    this.props.showRemoveApp();
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleChangeIp = e => {
    const { value, name } = e.target;
    const ips = value.split(",");
    this.setState({
      [name]: ips
    });
  };

  componentDidMount() {
    document.title = "Api Settings - Wittyflow";
    this.props.updateUser();
  }

  async componentWillMount() {
    if (!this.props.apps) {
      await this.props.getApps();
    }
  }

  handleCreateApp = e => {
    e.preventDefault();
    this.props.addApp(this.state);
    this.props.addModal();
  };

  handleDeleteApp = app => {
    // alert(JSON.stringify(this.state.delete_app));
    this.props.deleteApp(app);
  };

  updateApp = e => {
    e.preventDefault();
    const {
      update_name,
      update_description,
      update_whitelist,
      updateApp
    } = this.state;
    const app = {
      app_id: updateApp.app_id,
      name: update_name,
      description: update_description
      // whitelist: update_whitelist
    };
    this.props.updateApp(app);
  };

  render() {
    const {
      appsMessage,
      name,
      description,
      whitelist,
      update_description,
      update_name,
      update_whitelist
    } = this.state;
    return (
      <>
        {/*Begin::Row*/}
        <div className="row">
          <div className="col-xl-8 col-lg-8 order-lg-3 order-xl-1">
            {/*begin:: Widgets/Best Sellers*/}
            <div class="kt-portlet">
              <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                  <h3 class="kt-portlet__head-title">Developer Applications</h3>
                </div>
                <div class="kt-portlet__head-toolbar">
                  <div class="kt-portlet__head-actions">
                    <button
                      onClick={this.props.addModal}
                      class="btn btn-brand btn-icon-sm"
                    >
                      <i class="flaticon2-add-1"></i> Create an App
                    </button>
                  </div>
                </div>
              </div>
              <div class="kt-portlet__body">
                {this.props.loading_apps && (
                  <p className="text-center">{appsMessage}</p>
                )}
                {this.props.loading_error && (
                  <p className="text-center">{this.props.errorMsg}</p>
                )}
                <div class="kt-notification-v2">
                  {this.props.apps &&
                    this.props.apps.map((el, key) => {
                      let date = moment(el.created_at).format("LLLL");
                      return (
                        <div
                          href="#"
                          class="kt-notification-v2__item group-item"
                        >
                          <div class="kt-notification-v2__item-icon">
                            <i class="ti-infinite kt-font-success"></i>
                          </div>
                          <div class="kt-notification-v2__itek-wrapper">
                            <div class="kt-notification-v2__item-title">
                              <Link
                                to={`/v1/developers/apps/${el.app_id}/activity`}
                              >
                                {el.name}{" "}
                              </Link>
                            </div>
                            <div class="kt-notification-v2__item-desc">
                              <span className="text-dark app-id-text">
                                App ID:{" "}
                              </span>
                              <span className="app-id-value"> {el.app_id}</span>
                            </div>
                            <div class="kt-notification-v2__item-desc">
                              <span className="text-dark app-secret-text">
                                App Secret:{" "}
                              </span>{" "}
                              <span className="app-secret-value">
                                {" "}
                                <AppSecret data={el.app_secret} />
                              </span>
                            </div>
                            <div class="kt-notification-v2__item-desc">
                              <span className="">Date: </span>{" "}
                              <span className=""> {date} </span>
                            </div>
                          </div>

                          <div className="pull-right">
                            <span
                              data-tip="Edit App"
                              data-type="dark"
                              className="right-action-button"
                              onClick={e => this.handleUpdateApp(el)}
                            >
                              <i className="ti-pencil kt-font-primary"></i>
                            </span>
                            <span
                              data-tip="Delete App"
                              data-type="dark"
                              className="right-action-button"
                              onClick={e => this.handleShowDeleteModal(el)}
                            >
                              <i className="ti-trash kt-font-primary"></i>
                            </span>
                            <span
                              className="right-action-button"
                              onClick={() => this.props.changeStatus(el)}
                            >
                              <i
                                data-tip={
                                  el.status === "0"
                                    ? "Enable App"
                                    : "Disable App"
                                }
                                data-type="dark"
                                className={
                                  el.status === "0"
                                    ? "ti-power-off kt-font-success"
                                    : "ti-power-off kt-font-danger"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 order-lg-3 order-xl-1">
            {/*begin:: Widgets/Best Sellers*/}
            <div class="kt-portlet">
              <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                  <h3 class="kt-portlet__head-title">Quick Links</h3>
                </div>
              </div>
              <div class="kt-portlet__body">
                <div class="kt-notification-v2">
                  <div href="#" class="kt-notification-v2__item group-item">
                    <div class="kt-notification-v2__itek-wrapper">
                      <div class="kt-notification-v2__item-title">
                        <a
                          target="_blank"
                          href="https://www.wittyflow.com/sms/pricing"
                          className="kt-font-brand"
                        >
                          SMS Pricing & Calculator
                        </a>
                      </div>
                      <div class="kt-notification-v2__item-desc">
                        <span className="text-dark app-id-text">
                          Check out our current sms rate and calculate sms
                          pricing
                        </span>
                      </div>
                    </div>
                  </div>

                  <div href="#" class="kt-notification-v2__item group-item">
                    <div class="kt-notification-v2__itek-wrapper">
                      <div class="kt-notification-v2__item-title">
                        <a
                          href="https://wittyflow.docs.apiary.io/"
                          target="_blank"
                          className="kt-font-brand"
                        >
                          SMS API Documentation
                        </a>
                      </div>

                      <div class="kt-notification-v2__item-desc">
                        <span className="text-dark app-id-text">
                          Documentation on how to implement the API
                        </span>
                      </div>
                    </div>
                  </div>

                 {/* <div href="#" class="kt-notification-v2__item group-item">
                    <div class="kt-notification-v2__itek-wrapper">
                      <div class="kt-notification-v2__item-title">
                        <a target="_blank" href="#" className="kt-font-brand">
                          SMS API References
                        </a>
                      </div>
                      <div class="kt-notification-v2__item-desc">
                        <span className="text-dark app-id-text">
                          Dive into our full SMS API reference
                        </span>
                      </div>
                    </div>
                  </div>

                   <div href="#" class="kt-notification-v2__item group-item">
                    <div class="kt-notification-v2__itek-wrapper">
                      <div class="kt-notification-v2__item-title">
                        <a target="_blank" href="#" className="kt-font-brand">
                          SMS API Use Cases
                        </a>
                      </div>
                      <div class="kt-notification-v2__item-desc">
                        <span className="text-dark app-id-text">
                          Tutorials for common used cases
                        </span>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*End::Row*/}

        {/* delete modal here */}
        <Modal
          show={this.props.show_delete_modal}
          onHide={() => this.props.showRemoveApp()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete App</Modal.Title>
          </Modal.Header>
          <ModalBody>
            <p>
              Are you sure you want to delete{" "}
              <strong className="text-danger">
                {this.state.delete_app ? this.state.delete_app.name : ""}
              </strong>{" "}
              from apps ?{" "}
            </p>
            <button
              className="btn btn-primary"
              style={{ width: "120px" }}
              onClick={() => this.handleDeleteApp(this.state.delete_app)}
              disabled={this.props.deleting}
            >
              {this.props.deleting ? (
                <div class="spinner-border text-light" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Continue"
              )}
            </button>
          </ModalBody>
        </Modal>
        {/* end of delete modal */}

        {/* Start of update app modal */}
        <Modal
          onHide={() => this.props.updateModal()}
          show={this.props.show_update_modal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update App</Modal.Title>
          </Modal.Header>
          <ModalBody>
            <form onSubmit={this.updateApp}>
              <div className="form-group">
                <label for="selectgroup">Application Name:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="What will you like to call this app"
                  maxLength="100"
                  value={update_name}
                  name="update_name"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label for="selectgroup">Application Description</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="What is this app about"
                  maxLength="200"
                  name="update_description"
                  value={update_description}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div style={{ marginBottom: 10 }}>
                <Button
                  type="submit"
                  // onClick={this.handleCreateApp}
                  data-color="blue"
                  loading={this.props.updating}
                  data-style={ZOOM_IN}
                  data-size={S}
                  data-spinner-size={30}
                  data-spinner-color="#ffffff"
                  data-spinner-lines={12}
                  className="btn btn-warning ml-2"
                >
                  save details
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        {/* End of upate modal */}
        {/* Start of Add app modal */}
        <Modal
          onHide={() => this.props.addModal()}
          show={this.props.show_add_modal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New App</Modal.Title>
          </Modal.Header>
          <ModalBody>
            <form onSubmit={this.handleCreateApp}>
              <div className="form-group">
                <label for="selectgroup">Application Name:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="What will you like to call this app"
                  maxLength="100"
                  value={name}
                  name="name"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label for="selectgroup">Application Description</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="What is this app about"
                  maxLength="200"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <Button
                  type="submit"
                  // onClick={this.handleCreateApp}
                  data-color="blue"
                  loading={this.props.loading}
                  data-style={ZOOM_IN}
                  data-size={S}
                  data-spinner-size={30}
                  data-spinner-color="#ffffff"
                  data-spinner-lines={12}
                  className="ladda-button-primary"
                >
                  Create App
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        {/* End of add app modal */}
      </>
    );
  }
}

const AppSecret = props => {
  const [clicked, setclicked] = useState(false);
  const [key, setKey] = useState(props.data);
  if (clicked) {
    // alert(props.key)
    return (
      <>
        <span>{key}</span>
        <span
          onClick={() => setclicked(!clicked)}
          className="text-primary ml-2"
          style={{ cursor: "pointer" }}
        >
          hide
        </span>
      </>
    );
  }

  return (
    <>
      <span>&#x2217; &#x2217; &#x2217; &#x2217; </span>
      <span
        onClick={() => {
          setclicked(!clicked);
          setKey(props.data);
        }}
        className="text-primary ml-2"
        style={{ cursor: "pointer" }}
        data-tip="Show App Secret"
        data-type="dark"
      >
        Show
      </span>
    </>
  );
};

const mapStateToProps = state => {
  return {
    ...state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getApps: () => dispatch(getDeveolperApps()),
    addApp: app => dispatch(addDeveloperApp(app)),
    showRemoveApp: () => dispatch(toggleDeleteMoal()),
    addModal: () => dispatch(toggleAddModal()),
    updateModal: () => dispatch(toggleUpdateModal()),
    updateApp: app => dispatch(upateDeveloperApp(app)),
    changeStatus: app => dispatch(changeStatus(app)),
    deleteApp: app => dispatch(deleteApp(app)),
    updateUser: () => dispatch(updateUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Apps);
